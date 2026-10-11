"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "motion/react";

interface LiveSignalFieldProps {
  className?: string;
  onPointerStats?: (stats: { x: number; y: number; events: number; speed: number }) => void;
}

export function LiveSignalField({ className = "", onPointerStats }: LiveSignalFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // 3D tilt & scroll recede states
  const [tilt, setTilt] = useState({ rotateX: 55, rotateY: 0, translateZ: 0 });
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 3D Scroll recession & mouse tilt
  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Recede as user scrolls down
      const recedeZ = Math.max(-180, -scrollY * 0.4);
      setTilt((prev) => ({ ...prev, translateZ: recedeZ }));
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
    const spacing = 32;
    const baseRadius = 1.15;
    const maxRadius = 3.4;
    const proximity = 160;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
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

      // 3D subtle tilt toward cursor
      if (!isMobile && !shouldReduceMotion) {
        const tiltX = 55 + (normY - 0.5) * 8;
        const tiltY = (normX - 0.5) * 12;
        setTilt((prev) => ({ ...prev, rotateX: tiltX, rotateY: tiltY }));
      }

      if (onPointerStats) {
        onPointerStats({
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
        setTilt((prev) => ({ ...prev, rotateX: 55, rotateY: 0 }));
      }
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const render = () => {
      // Lerp mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.15;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;

          const dx = mx - x;
          const dy = my - y;
          const dist = Math.hypot(dx, dy);

          let radius = baseRadius;
          let alpha = 0.14;
          let isAccent = false;

          if (dist < proximity) {
            const factor = 1 - dist / proximity;
            const ease = factor * factor;
            radius = baseRadius + (maxRadius - baseRadius) * ease;
            alpha = 0.2 + ease * 0.7;
            if (ease > 0.45) isAccent = true;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = isAccent
            ? `rgba(229, 52, 27, ${Math.min(1, alpha)})`
            : `rgba(10, 10, 10, ${alpha})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [onPointerStats, isMobile, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-auto select-none overflow-hidden ${className}`}
      style={{
        perspective: isMobile || shouldReduceMotion ? "none" : "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block origin-center transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform:
            isMobile || shouldReduceMotion
              ? "none"
              : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(${tilt.translateZ}px) scale(1.15)`,
          transformOrigin: "center 40%",
        }}
      />
    </div>
  );
}
