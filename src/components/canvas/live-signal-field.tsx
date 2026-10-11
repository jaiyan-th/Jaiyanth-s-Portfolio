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

  // 3D subtle tilt ref (< 12deg) - replace setTilt state with refs
  const tiltRef = useRef({ rotateX: 0, rotateY: 0, translateZ: 0 });

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

  // Subtle scroll recede (< 12deg tilt, no re-renders)
  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      tiltRef.current.translateZ = Math.max(-50, -scrollY * 0.15);
      if (canvasRef.current) {
        const { rotateX, rotateY, translateZ } = tiltRef.current;
        canvasRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldReduceMotion, isMobile]);

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

      // 3D subtle CSS tilt under 12deg applied directly via refs (no setTilt re-render)
      if (!isMobile && !shouldReduceMotion) {
        const tiltX = Math.max(-8, Math.min(8, (normY - 0.5) * -7));
        const tiltY = Math.max(-10, Math.min(10, (normX - 0.5) * 8));
        tiltRef.current.rotateX = tiltX;
        tiltRef.current.rotateY = tiltY;
        if (canvasRef.current) {
          canvasRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${tiltRef.current.translateZ}px)`;
        }
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
        tiltRef.current.rotateX = 0;
        tiltRef.current.rotateY = 0;
        if (canvasRef.current) {
          canvasRef.current.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(${tiltRef.current.translateZ}px)`;
        }
      }
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Render loop with canvas-internal 3D depth projection
    const render = () => {
      if (!isIntersectingRef.current) {
        animFrameRef.current = null;
        return;
      }

      // Lerp mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.16;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.16;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const centerX = width / 2;

      const numRows = Math.ceil(height / 28) + 2;
      const numCols = Math.ceil(width / baseSpacing) + 6;

      for (let r = 0; r < numRows; r++) {
        // Depth progress: 0 (horizon/top) to 1 (near foreground/bottom)
        const depthRatio = r / (numRows - 1);
        // Perspective foreshortening curve
        const zScale = 0.52 + 0.62 * Math.pow(depthRatio, 1.35);

        // Projected Y position
        const projY = height * (0.05 + 0.95 * Math.pow(depthRatio, 1.25));

        // Spacing scales by depth
        const rowSpacing = baseSpacing * zScale;
        const rowBaseRadius = baseRadius * zScale;
        const rowMaxRadius = maxRadius * zScale;

        for (let c = -numCols / 2; c <= numCols / 2; c++) {
          const projX = centerX + c * rowSpacing;

          if (projX < -40 || projX > width + 40 || projY < -20 || projY > height + 20) {
            continue;
          }

          // Compute cursor proximity against the PROJECTED positions so red highlight stays under cursor
          const dx = mx - projX;
          const dy = my - projY;
          const dist = Math.hypot(dx, dy);

          let radius = rowBaseRadius;
          let alpha = 0.12 * zScale;
          let isAccent = false;

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
  }, [isMobile, shouldReduceMotion]); // onPointerStats is stored in ref, not in deps!

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
