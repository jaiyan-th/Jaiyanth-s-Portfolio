"use client";

import { useEffect, useRef, useState, useId } from "react";
import Matter from "matter-js";
import { ArrowUpRight, Mail } from "lucide-react";
import { IDENTITY, NAV_LINKS } from "@/data/content";

interface BubbleData {
  body: Matter.Body;
  radius: number;
  isPinker: boolean;
  baseOpacity: number;
  scaleProgress: number; // For entry scale animation 0 -> 1
  targetScale: number;
  entryDelay: number;
}

export function BubbleFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Custom Cursor state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isInside, setIsInside] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    let isVisible = true;
    let animId: number | null = null;
    let width = container.clientWidth || 1000;
    let height = container.clientHeight || 560;

    // Matter.js Engine & World (safe extraction across ESM/CJS)
    const matterModule = (Matter as any).default || Matter;
    const { Engine, World, Bodies, Body, Vector } = matterModule;
    if (!Engine || !World || !Bodies) {
      console.error("Matter.js failed to load properly", matterModule);
      return;
    }
    const engine = Engine.create({
      gravity: { x: 0, y: 0.0001, scale: 0.001 },
    });
    const world = engine.world;

    // Boundary walls
    const WALL_THICKNESS = 100;
    let ground = Bodies.rectangle(
      width / 2,
      height + WALL_THICKNESS / 2,
      width * 2,
      WALL_THICKNESS,
      { isStatic: true, friction: 0 }
    );
    let ceiling = Bodies.rectangle(
      width / 2,
      -WALL_THICKNESS / 2,
      width * 2,
      WALL_THICKNESS,
      { isStatic: true, friction: 0 }
    );
    let leftWall = Bodies.rectangle(
      -WALL_THICKNESS / 2,
      height / 2,
      WALL_THICKNESS,
      height * 2,
      { isStatic: true, friction: 0 }
    );
    let rightWall = Bodies.rectangle(
      width + WALL_THICKNESS / 2,
      height / 2,
      WALL_THICKNESS,
      height * 2,
      { isStatic: true, friction: 0 }
    );

    World.add(world, [ground, ceiling, leftWall, rightWall]);

    // Create bubbles
    const isSmallScreen = window.innerWidth < 768;
    const BUBBLE_COUNT = isSmallScreen ? 25 : 48;
    const bubbles: BubbleData[] = [];

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const radius = 16 + Math.random() * 32; // 16px to 48px
      const x = radius + Math.random() * (width - radius * 2);
      const y = radius + Math.random() * (height - radius * 2);

      const body = Bodies.circle(x, y, radius, {
        restitution: 0.6,
        frictionAir: 0.02,
        friction: 0.05,
        density: 0.001,
      });

      // Random gentle initial drift velocity
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 0.8,
        y: (Math.random() - 0.5) * 0.8,
      });

      // 15% are slightly pinker
      const isPinker = Math.random() < 0.15;
      const baseOpacity = isPinker ? 0.95 : (Math.random() < 0.3 ? 0.8 : 0.92);

      bubbles.push({
        body,
        radius,
        isPinker,
        baseOpacity,
        scaleProgress: prefersReducedMotion ? 1 : 0, // Starts at 0, animates 0 -> 1 on scroll into view
        targetScale: 1,
        entryDelay: prefersReducedMotion ? 0 : (i / BUBBLE_COUNT) * 0.45,
      });

      World.add(world, body);
    }

    // Set resolution with devicePixelRatio capped at 2
    const updateSize = () => {
      width = container.clientWidth || 1000;
      height = container.clientHeight || 560;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Reposition walls
      Body.setPosition(ground, { x: width / 2, y: height + WALL_THICKNESS / 2 });
      Body.setPosition(ceiling, { x: width / 2, y: -WALL_THICKNESS / 2 });
      Body.setPosition(leftWall, { x: -WALL_THICKNESS / 2, y: height / 2 });
      Body.setPosition(rightWall, { x: width + WALL_THICKNESS / 2, y: height / 2 });
    };
    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Mouse coordinates in container
    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = x;
      mouseY = y;
      setCursorPos({ x, y });
    };

    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => {
      setIsInside(false);
      mouseX = -9999;
      mouseY = -9999;
      setCursorPos({ x: -100, y: -100 });
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Entry scaling animation triggers upon scrolling into view
    let hasTriggeredEntry = false;
    let entryStartTime = 0;

    // IntersectionObserver to pause physics when offscreen and trigger entry scale on view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible = true;
          if (!hasTriggeredEntry) {
            hasTriggeredEntry = true;
            entryStartTime = performance.now();
          }
          if (animId === null && !prefersReducedMotion) {
            animId = requestAnimationFrame(render);
          }
        } else {
          isVisible = false;
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Render loop
    const render = (time: number) => {
      if (!isVisible && !prefersReducedMotion) {
        animId = null;
        return;
      }

      // Step Matter.js physics if not reduced motion
      if (!prefersReducedMotion) {
        // Cursor repulsion within 120px
        if (mouseX > -500 && mouseY > -500) {
          const REPEL_RADIUS = 120;
          for (const b of bubbles) {
            const dx = b.body.position.x - mouseX;
            const dy = b.body.position.y - mouseY;
            const dist = Math.hypot(dx, dy);

            if (dist < REPEL_RADIUS && dist > 1) {
              const forceMagnitude = (1 - dist / REPEL_RADIUS) * 0.0035;
              const force = Vector.mult(
                Vector.normalise({ x: dx, y: dy }),
                forceMagnitude
              );
              Body.applyForce(b.body, b.body.position, force);
            }
          }
        }

        // Slight Brownian drift
        for (const b of bubbles) {
          Body.applyForce(b.body, b.body.position, {
            x: (Math.random() - 0.5) * 0.00003,
            y: (Math.random() - 0.5) * 0.00003,
          });
        }

        Engine.update(engine, 1000 / 60);
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Draw Bubbles
      const elapsed =
        entryStartTime > 0 ? Math.max(0, (time - entryStartTime) / 1000) : 0;

      for (const b of bubbles) {
        // Scale entry progression
        if (!prefersReducedMotion && b.scaleProgress < 1) {
          if (hasTriggeredEntry && elapsed > b.entryDelay) {
            const t = Math.min(1, Math.max(0, (elapsed - b.entryDelay) / 0.6));
            // easeOutBack formula
            const c1 = 1.70158;
            const c3 = c1 + 1;
            b.scaleProgress =
              1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
          }
        } else {
          b.scaleProgress = 1;
        }

        const scaleVal = Math.min(1.15, Math.max(0.1, b.scaleProgress));
        const currentRadius = Math.max(4, b.radius * scaleVal);
        const { x, y } = b.body.position;

        ctx.save();
        ctx.translate(x, y);

        // 1. Soft Shadow
        ctx.shadowColor = "rgba(100, 80, 80, 0.12)";
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 6;
        ctx.shadowOffsetX = 0;

        // 2. Bubble Body with Radial Gradient
        const r0 = Math.max(0.1, currentRadius * 0.05);
        const r1 = Math.max(r0 + 1, currentRadius);
        const grad = ctx.createRadialGradient(
          -currentRadius * 0.25,
          -currentRadius * 0.25,
          r0,
          0,
          0,
          r1
        );

        if (b.isPinker) {
          grad.addColorStop(0, `rgba(255, 255, 255, ${b.baseOpacity})`);
          grad.addColorStop(0.6, `rgba(253, 229, 224, ${b.baseOpacity * 0.85})`);
          grad.addColorStop(1, `rgba(229, 52, 27, ${b.baseOpacity * 0.25})`);
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${b.baseOpacity})`);
          grad.addColorStop(0.65, `rgba(245, 238, 235, ${b.baseOpacity * 0.85})`);
          grad.addColorStop(1, `rgba(230, 218, 215, ${b.baseOpacity * 0.65})`);
        }

        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // 3. Reset shadow for inner elements & outline
        ctx.shadowColor = "transparent";

        // Subtle outer border
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = b.isPinker ? "rgba(229, 52, 27, 0.25)" : "rgba(215, 205, 200, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // 4. Thin white inner rim
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius - 1, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // 5. Specular highlight ellipse (at upper-left)
        const specX = -currentRadius * 0.38;
        const specY = -currentRadius * 0.42;
        const specRx = Math.max(1, currentRadius * 0.24);
        const specRy = Math.max(0.5, currentRadius * 0.14);

        ctx.beginPath();
        ctx.ellipse(specX, specY, specRx, specRy, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fill();

        ctx.restore();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render(performance.now());
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      observer.disconnect();
      resizeObserver.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div
      id="contact"
      className="w-full max-w-[1100px] mx-auto px-6 sm:px-8 xl:px-0 mb-16 scroll-mt-24"
    >
      {/* 70vh Rounded Bubble Physics Container */}
      <div
        ref={containerRef}
        data-bubble-footer="true"
        className="relative w-full h-[65vh] min-h-[500px] max-h-[680px] rounded-[24px] bg-white border-2 border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] overflow-hidden select-none"
        style={{
          cursor: isMobile ? "auto" : "none",
        }}
      >
        {/* Physics Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full block z-0"
        />

        {/* Center CTA Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto">
            {/* Header */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.035em] text-[#0A0A0A] leading-tight mb-8">
              Building something with{" "}
              <span className="inline-block px-2.5 py-0.5 mx-1.5 bg-[#FFE600] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] text-[#0A0A0A] rounded-lg -rotate-1 font-extrabold">
                AI
              </span>
              ?<br />
              Let&apos;s talk.
            </h2>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Primary Neo-Brutalist Button */}
              <a
                href={`mailto:${IDENTITY.email}`}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                className="neo-btn h-[52px] px-8 rounded-xl bg-[#FFE600] text-[#0A0A0A] text-[15px] font-bold gap-2 hover:bg-[#FFF58A]"
              >
                <Mail className="w-4 h-4 stroke-[2.5]" />
                <span>Email me</span>
              </a>

              {/* Secondary Neo-Brutalist Button */}
              <a
                href={IDENTITY.bookingUrl}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                className="neo-btn h-[52px] px-8 rounded-xl bg-white text-[#0A0A0A] text-[15px] font-bold gap-2 hover:bg-[#FFE600]"
              >
                <span>Hire me</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>

        {/* Custom Accent Crosshair Cursor */}
        {!isMobile && isInside && (
          <div
            aria-hidden="true"
            className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              transform: `translate(-50%, -50%) scale(${isBtnHovered ? 1.8 : 1})`,
              position: "absolute",
            }}
          >
            <div className="relative w-6 h-6 rounded-full border-2 border-[#0A0A0A] bg-[#FFE600]/40 flex items-center justify-center shadow-[1.5px_1.5px_0px_#0A0A0A]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent border border-black" />
            </div>
          </div>
        )}
      </div>

      {/* Neo-Brutalist Footer Link Row */}
      <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#525252] border-t-2 border-[#0A0A0A] mt-8">
        {/* Navigation Pages */}
        <div className="flex flex-wrap items-center gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="neo-badge px-2.5 py-1 rounded bg-white text-[#0A0A0A] hover:bg-[#FFE600] transition-colors uppercase tracking-[0.04em] font-bold"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social / External Links */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={IDENTITY.linkedin}
            target="_blank"
            rel="noreferrer"
            className="neo-badge px-2.5 py-1 rounded bg-white text-[#0A0A0A] hover:bg-[#FFE600] transition-colors font-bold"
          >
            LinkedIn
          </a>
          <a
            href={IDENTITY.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="neo-badge px-2.5 py-1 rounded bg-white text-[#0A0A0A] hover:bg-[#FFE600] transition-colors font-bold"
          >
            Resume
          </a>
          <a
            href={IDENTITY.github}
            target="_blank"
            rel="noreferrer"
            className="neo-badge px-2.5 py-1 rounded bg-white text-[#0A0A0A] hover:bg-[#FFE600] transition-colors font-bold"
          >
            GitHub
          </a>
        </div>

        {/* Status / Reply Badge */}
        <div className="neo-badge px-2.5 py-1 rounded bg-[#00E599]/30 text-[#0A0A0A] flex items-center gap-2 font-bold shadow-[1.5px_1.5px_0px_#0A0A0A]">
          <span className="w-2 h-2 rounded-full bg-[#00E599] border border-black" />
          <span>Replies within 2hrs</span>
        </div>
      </div>
    </div>
  );
}
