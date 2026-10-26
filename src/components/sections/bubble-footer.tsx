"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { ArrowUpRight, Mail } from "lucide-react";
import { IDENTITY, NAV_LINKS } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";

interface BubbleData {
  body: Matter.Body;
  radius: number;
  isPinker: boolean;
  baseOpacity: number;
  scaleProgress: number;
  targetScale: number;
  entryDelay: number;
}

export function BubbleFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const isSmallScreen = window.innerWidth < 768;
    const BUBBLE_COUNT = isSmallScreen ? 20 : 44;
    const bubbles: BubbleData[] = [];

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const radius = 16 + Math.random() * 32;
      const x = radius + Math.random() * (width - radius * 2);
      const y = radius + Math.random() * (height - radius * 2);

      const body = Bodies.circle(x, y, radius, {
        restitution: 0.6,
        frictionAir: 0.02,
        friction: 0.05,
        density: 0.001,
      });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 0.8,
        y: (Math.random() - 0.5) * 0.8,
      });

      const isPinker = Math.random() < 0.15;
      const baseOpacity = isPinker ? 0.95 : (Math.random() < 0.3 ? 0.8 : 0.92);

      bubbles.push({
        body,
        radius,
        isPinker,
        baseOpacity,
        scaleProgress: prefersReducedMotion ? 1 : 0,
        targetScale: 1,
        entryDelay: prefersReducedMotion ? 0 : (i / BUBBLE_COUNT) * 0.45,
      });

      World.add(world, body);
    }

    const updateSize = () => {
      width = container.clientWidth || 1000;
      height = container.clientHeight || 560;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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

    let hasTriggeredEntry = false;
    let entryStartTime = 0;

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

    const render = (time: number) => {
      if (!isVisible && !prefersReducedMotion) {
        animId = null;
        return;
      }

      if (!prefersReducedMotion) {
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

        for (const b of bubbles) {
          Body.applyForce(b.body, b.body.position, {
            x: (Math.random() - 0.5) * 0.00003,
            y: (Math.random() - 0.5) * 0.00003,
          });
        }

        Engine.update(engine, 1000 / 60);
      }

      ctx.clearRect(0, 0, width, height);

      const elapsed =
        entryStartTime > 0 ? Math.max(0, (time - entryStartTime) / 1000) : 0;

      for (const b of bubbles) {
        if (!prefersReducedMotion && b.scaleProgress < 1) {
          if (hasTriggeredEntry && elapsed > b.entryDelay) {
            const t = Math.min(1, Math.max(0, (elapsed - b.entryDelay) / 0.6));
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

        const zDepth = (b.radius - 16) / 32;
        const parallaxOffsetX =
          !prefersReducedMotion && !isSmallScreen && mouseX > -500
            ? (mouseX - width / 2) * zDepth * 0.04
            : 0;
        const parallaxOffsetY =
          !prefersReducedMotion && !isSmallScreen && mouseY > -500
            ? (mouseY - height / 2) * zDepth * 0.04
            : 0;

        ctx.save();
        ctx.translate(x + parallaxOffsetX, y + parallaxOffsetY);

        ctx.shadowColor = "rgba(100, 80, 80, 0.12)";
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 6;
        ctx.shadowOffsetX = 0;

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

        ctx.shadowColor = "transparent";

        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = b.isPinker ? "rgba(229, 52, 27, 0.25)" : "rgba(215, 205, 200, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, currentRadius - 1, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
        ctx.lineWidth = 1;
        ctx.stroke();

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
      className="site-container mb-12 sm:mb-16 scroll-mt-24"
    >
      {/* Bubble Physics Container: min-h-[360px] on phones so it's not squashed */}
      <div
        ref={containerRef}
        data-bubble-footer="true"
        className="relative w-full h-[55vh] min-h-[360px] sm:min-h-[460px] max-h-[660px] rounded-[24px] bg-[#EAE8E1]/50 border-2 border-[#111111] shadow-[5px_5px_0px_#111111] overflow-hidden select-none"
        style={{
          cursor: isMobile ? "auto" : "none",
        }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full block z-0"
        />

        {/* Ambient Center CTA Glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent/8 to-transparent blur-3xl opacity-75" />

        {/* Center CTA Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none perspective-1200">
          <Reveal className="max-w-2xl pointer-events-auto preserve-3d flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#6C47FF]" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#111111]">
                LET&apos;S TALK
              </span>
            </div>

            <h2 className="font-display font-extrabold text-[clamp(32px,5vw,64px)] text-[#111111] leading-[1.0] tracking-tight mb-6">
              Building something with AI?
              <br />
              <span className="text-[#6C47FF]">Let&apos;s build it together.</span>
            </h2>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 w-full">
              <a
                href={`mailto:${IDENTITY.email}`}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#111111] hover:bg-[#6C47FF] text-white font-sans text-sm font-bold border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Email Jaiyanth</span>
              </a>

              <a
                href={IDENTITY.bookingUrl}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#FFD13B] text-[#111111] font-sans text-sm font-bold border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none w-full sm:w-auto"
              >
                <span>Book a Discovery Call</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Accent Crosshair Cursor */}
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
            <div className="relative w-5 h-5 rounded-full border border-accent flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-accent" />
            </div>
          </div>
        )}
      </div>

      {/* Clean Footer Navigation & Links Row */}
      <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t-2 border-[#111111]/20 mt-6 sm:mt-8 text-center md:text-left">
        {/* Navigation Pages */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-[#111111] hover:text-accent transition-colors min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social / External Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <a
            href={IDENTITY.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-sm font-medium text-[#111111] hover:text-accent transition-colors min-h-[44px] flex items-center"
          >
            LinkedIn
          </a>
          <span className="hidden sm:inline select-none text-text-muted">·</span>
          <a
            href={IDENTITY.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-sm font-medium text-[#111111] hover:text-accent transition-colors min-h-[44px] flex items-center"
          >
            Resume
          </a>
          <span className="hidden sm:inline select-none text-text-muted">·</span>
          <a
            href={IDENTITY.github}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-sm font-medium text-[#111111] hover:text-accent transition-colors min-h-[44px] flex items-center"
          >
            GitHub
          </a>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted min-h-[44px]">
          <span className="w-2 h-2 rounded-full bg-[#1FB866] shrink-0" />
          <span>Replies within 2hrs</span>
        </div>
      </div>

      {/* Clean Copyright & Region Subline */}
      <div
        style={{
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))",
        }}
        className="pt-4 mt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#111111]/10 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted text-center sm:text-left"
      >
        <span>© 2026 {IDENTITY.name}</span>
        <span>Based in India · Working Worldwide</span>
      </div>
    </div>
  );
}
