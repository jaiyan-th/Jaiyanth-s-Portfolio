"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface LiveSignalFieldProps {
  className?: string;
  onPointerStats?: (stats: { x: number; y: number; events: number; speed: number }) => void;
}

export function LiveSignalField({ className = "", onPointerStats }: LiveSignalFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Store onPointerStats in a ref so the canvas effect does not re-run
  const onPointerStatsRef = useRef(onPointerStats);
  useEffect(() => {
    onPointerStatsRef.current = onPointerStats;
  });

  const [isMobile, setIsMobile] = useState(false);

  // 3D subtle tilt ref (< 12deg)
  const tiltRef = useRef({ rotateX: 0, rotateY: 0, targetRotateX: 0, targetRotateY: 0 });

  // Scroll state tracking for 60/120fps sync with Lenis and native scroll
  const scrollStateRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
  });

  // Pointer state in container coordinates
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    normalizedX: 0,
    normalizedY: 0,
    speed: 0,
    lastX: 0,
    lastY: 0,
    lastTime: performance.now(),
    isInside: false,
    events: 0,
  });

  const animFrameRef = useRef<number | null>(null);
  const isIntersectingRef = useRef(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Grid config
    const baseSpacing = 36;
    const baseRadius = 1.2;
    const maxRadius = 3.6;
    const proximity = 150;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const now = performance.now();
      const dt = Math.max(1, now - mouseRef.current.lastTime);
      const dx = currentX - mouseRef.current.lastX;
      const dy = currentY - mouseRef.current.lastY;
      const dist = Math.hypot(dx, dy);
      const instantaneousSpeed = dist / dt;

      mouseRef.current.speed = mouseRef.current.speed * 0.7 + instantaneousSpeed * 0.3;
      mouseRef.current.lastX = currentX;
      mouseRef.current.lastY = currentY;
      mouseRef.current.lastTime = now;
      mouseRef.current.targetX = currentX;
      mouseRef.current.targetY = currentY;
      mouseRef.current.isInside = true;
      mouseRef.current.events += 1;

      const normX = Math.max(0, Math.min(1, currentX / (width || 1)));
      const normY = Math.max(0, Math.min(1, currentY / (height || 1)));
      mouseRef.current.normalizedX = normX;
      mouseRef.current.normalizedY = normY;

      // 3D subtle CSS tilt target under 12deg
      if (!isMobile && !shouldReduceMotion) {
        tiltRef.current.targetRotateX = Math.max(-8, Math.min(8, (normY - 0.5) * -7));
        tiltRef.current.targetRotateY = Math.max(-10, Math.min(10, (normX - 0.5) * 8));
      }

      // Call onPointerStats via ref
      if (onPointerStatsRef.current) {
        onPointerStatsRef.current({
          x: normX,
          y: normY,
          events: mouseRef.current.events,
          speed: mouseRef.current.speed,
        });
      }
    };

    const onPointerLeave = () => {
      mouseRef.current.isInside = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
      if (!isMobile && !shouldReduceMotion) {
        tiltRef.current.targetRotateX = 0;
        tiltRef.current.targetRotateY = 0;
      }
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Render loop with canvas-internal 3D depth projection & scroll wave dynamics
    const render = () => {
      if (!isIntersectingRef.current) {
        animFrameRef.current = null;
        return;
      }

      // 1. Lerp mouse position
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.16;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.16;

      // 2. Track scroll position smoothly (syncing Lenis smooth scroll and native scroll)
      const lenis = (window as unknown as { __lenis?: { scroll: number; velocity: number } }).__lenis;
      const targetScroll = typeof lenis?.scroll === "number" ? lenis.scroll : window.scrollY;
      scrollStateRef.current.target = targetScroll;

      const prevScroll = scrollStateRef.current.current;
      scrollStateRef.current.current += (scrollStateRef.current.target - scrollStateRef.current.current) * 0.14;
      const deltaScroll = scrollStateRef.current.current - prevScroll;
      
      const currentVelocity = typeof lenis?.velocity === "number" 
        ? lenis.velocity 
        : deltaScroll;
      scrollStateRef.current.velocity = scrollStateRef.current.velocity * 0.75 + currentVelocity * 0.25;

      const scrollY = scrollStateRef.current.current;
      const scrollVel = scrollStateRef.current.velocity;

      // 3. Smooth canvas 3D transform combining mouse tilt and scroll recede
      if (!isMobile && !shouldReduceMotion && canvasRef.current) {
        tiltRef.current.rotateX += (tiltRef.current.targetRotateX - tiltRef.current.rotateX) * 0.12;
        tiltRef.current.rotateY += (tiltRef.current.targetRotateY - tiltRef.current.rotateY) * 0.12;

        const scrollPitch = Math.min(10, scrollY * 0.018);
        const scrollTranslateZ = Math.max(-100, -scrollY * 0.22);
        const curRotateX = tiltRef.current.rotateX - scrollPitch;
        const curRotateY = tiltRef.current.rotateY;

        canvasRef.current.style.transform = `rotateX(${curRotateX.toFixed(2)}deg) rotateY(${curRotateY.toFixed(2)}deg) translateZ(${scrollTranslateZ.toFixed(2)}px)`;
      }

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const centerX = width / 2;

      const numRows = Math.ceil(height / 28) + 2;
      const numCols = Math.ceil(width / baseSpacing) + 6;

      const now = performance.now();
      const wavePhase = scrollY * 0.007 + now * 0.0012;
      const waveIntensity = shouldReduceMotion ? 0 : Math.min(16, Math.abs(scrollVel) * 2.2 + 2.8);

      for (let r = 0; r < numRows; r++) {
        // Depth progress: 0 (horizon/top) to 1 (near foreground/bottom)
        const depthRatio = r / (numRows - 1);
        // Perspective foreshortening curve
        const zScale = 0.52 + 0.62 * Math.pow(depthRatio, 1.35);

        // Perspective Parallax shift with scroll: near rows move slightly more than distant horizon rows
        const scrollParallaxY = -scrollY * (0.08 + 0.16 * depthRatio);

        // Base projected Y position
        const baseProjY = height * (0.05 + 0.95 * Math.pow(depthRatio, 1.25)) + scrollParallaxY;

        // Spacing scales by depth
        const rowSpacing = baseSpacing * zScale;
        const rowBaseRadius = baseRadius * zScale;
        const rowMaxRadius = maxRadius * zScale;

        for (let c = -numCols / 2; c <= numCols / 2; c++) {
          let projX = centerX + c * rowSpacing;
          let projY = baseProjY;

          // Dynamic wave ripple that reacts to scroll motion
          if (!shouldReduceMotion) {
            const wave = Math.sin(depthRatio * 5.2 + c * 0.22 - wavePhase);
            const waveDisplacement = wave * waveIntensity * depthRatio;
            projY += waveDisplacement;
            projX += Math.cos(depthRatio * 4.2 + c * 0.25 - wavePhase * 0.8) * (waveDisplacement * 0.35);
          }

          if (projX < -40 || projX > width + 40 || projY < -30 || projY > height + 30) {
            continue;
          }

          // Compute cursor proximity against the PROJECTED positions
          const dx = mx - projX;
          const dy = my - projY;
          const dist = Math.hypot(dx, dy);

          let radius = rowBaseRadius;
          let alpha = 0.12 * zScale;
          let isAccent = false;

          // Subtle energy glimmer during active scrolling
          if (!shouldReduceMotion && Math.abs(scrollVel) > 0.4) {
            alpha += Math.min(0.14, Math.abs(scrollVel) * 0.018) * zScale;
          }

          if (dist < proximity) {
            const factor = 1 - dist / proximity;
            const ease = factor * factor;
            radius = rowBaseRadius + (rowMaxRadius - rowBaseRadius) * ease;
            alpha = 0.2 + ease * 0.75;
            if (ease > 0.4) isAccent = true;
          }

          ctx.beginPath();
          ctx.arc(projX, projY, radius, 0, Math.PI * 2);
          ctx.fillStyle = isAccent
            ? `rgba(229, 52, 27, ${Math.min(1, alpha)})`
            : `rgba(10, 10, 10, ${alpha})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    // Pause draw loop with IntersectionObserver when hero is off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!animFrameRef.current) {
            animFrameRef.current = requestAnimationFrame(render);
          }
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [isMobile, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-auto select-none overflow-hidden ${className}`}
      style={{
        perspective: isMobile || shouldReduceMotion ? "none" : "1000px",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block origin-center will-change-transform"
        style={{
          transform: "rotateX(0deg) rotateY(0deg) translateZ(0px)",
        }}
      />
    </div>
  );
}
