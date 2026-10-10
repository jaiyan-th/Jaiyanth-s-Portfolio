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
  const isIdleRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdle = useCallback(() => {
    isIdleRef.current = false;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      isIdleRef.current = true;
    }, 2500);
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
    const spacing = 28;
    const baseRadius = 1.25;
    const maxRadius = 3.2;
    const proximity = 150; // px radius of light influence

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
      drawStatic();
    };

    // Static draw for reduced motion or idle initial state
    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(10, 10, 10, 0.12)";

      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + (spacing / 2);
          const y = j * spacing + (spacing / 2);
          ctx.beginPath();
          ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const now = performance.now();
      const dt = Math.max(1, now - mouseRef.current.lastTime);
      const distMoved = Math.hypot(currentX - mouseRef.current.lastX, currentY - mouseRef.current.lastY);
      const calculatedSpeed = (distMoved / dt) * 1000; // px/sec

      mouseRef.current.targetX = currentX;
      mouseRef.current.targetY = currentY;
      mouseRef.current.speed = calculatedSpeed;
      mouseRef.current.lastX = currentX;
      mouseRef.current.lastY = currentY;
      mouseRef.current.lastTime = now;
      mouseRef.current.isInside = true;
      mouseRef.current.events += 1;

      const normX = Math.max(0, Math.min(1, currentX / (width || 1)));
      const normY = Math.max(0, Math.min(1, currentY / (height || 1)));
      mouseRef.current.normalizedX = normX;
      mouseRef.current.normalizedY = normY;

      if (onPointerStats) {
        onPointerStats({
          x: normX,
          y: normY,
          events: mouseRef.current.events,
          speed: calculatedSpeed,
        });
      }

      resetIdle();
    };

    const handlePointerLeave = () => {
      mouseRef.current.isInside = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
      resetIdle();
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    container.addEventListener("mouseleave", handlePointerLeave);

    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(container);
    resize();

    // Animation Loop
    const render = () => {
      if (shouldReduceMotion) {
        drawStatic();
        return;
      }

      // Smooth lerp pointer tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const baseAlpha = isDark ? 0.12 : 0.13;
      const baseR = baseRadius;

      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      const mx = mouse.x;
      const my = mouse.y;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const originX = i * spacing + (spacing / 2);
          const originY = j * spacing + (spacing / 2);

          const dx = originX - mx;
          const dy = originY - my;
          const dist = Math.hypot(dx, dy);

          let r = baseR;
          let alpha = baseAlpha;
          let drawX = originX;
          let drawY = originY;
          let isAccent = false;

          if (dist < proximity) {
            const proximityFactor = 1 - dist / proximity; // 0 to 1
            const eased = proximityFactor * proximityFactor; // quadratic ease

            // Scale & Opacity Ramp
            r = baseR + eased * (maxRadius - baseR);
            alpha = baseAlpha + eased * (0.9 - baseAlpha);

            // Subtle magnetic wave displacement outwards
            const push = eased * 4.5;
            const angle = Math.atan2(dy, dx);
            drawX += Math.cos(angle) * push;
            drawY += Math.sin(angle) * push;

            // Highlight core dots directly nearest the pointer with accent color (#E5341B)
            if (dist < proximity * 0.42) {
              isAccent = true;
            }
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, r, 0, Math.PI * 2);

          if (isAccent) {
            ctx.fillStyle = `rgba(229, 52, 27, ${Math.min(1, alpha + 0.15)})`;
          } else if (dist < proximity) {
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(10, 10, 10, ${alpha})`;
          } else {
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${baseAlpha})`
              : `rgba(10, 10, 10, ${baseAlpha})`;
          }

          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      observer.disconnect();
    };
  }, [shouldReduceMotion, resetIdle, onPointerStats]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
