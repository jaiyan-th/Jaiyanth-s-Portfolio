"use client";

import { useEffect, useRef, useState } from "react";

interface DottedSphereProps {
  className?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  origX: number;
  origY: number;
  origZ: number;
  vx: number;
  vy: number;
  vz: number;
}

export function DottedSphere({ className = "" }: DottedSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamic visibility: visible when scrolling or moving cursor, disappears fully when idle
  const [isVisibleOnInteraction, setIsVisibleOnInteraction] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Geometry parameters: ~28 latitude rings x 56 longitude points
    const RINGS = 28;
    const SEGMENTS = 56;
    const RADIUS = 180;

    const points: Point3D[] = [];
    for (let r = 1; r < RINGS; r++) {
      const phi = (Math.PI * r) / RINGS;
      for (let s = 0; s < SEGMENTS; s++) {
        const theta = (2 * Math.PI * s) / SEGMENTS;
        const x = RADIUS * Math.sin(phi) * Math.cos(theta);
        const y = RADIUS * Math.cos(phi);
        const z = RADIUS * Math.sin(phi) * Math.sin(theta);
        points.push({
          x,
          y,
          z,
          origX: x,
          origY: y,
          origZ: z,
          vx: 0,
          vy: 0,
          vz: 0,
        });
      }
    }

    let animId: number | null = null;
    let width = container.clientWidth || 460;
    let height = container.clientHeight || 460;
    let lastTime = performance.now();

    // Mouse tracking for tilt & repulsion
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let mouseCanvasX = -9999;
    let mouseCanvasY = -9999;
    let rotationY = 0;

    // Setup canvas resolution using capped devicePixelRatio
    const updateSize = () => {
      width = container.clientWidth || 460;
      height = container.clientHeight || 460;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
      if (prefersReducedMotion) {
        drawFrame();
      }
    });
    resizeObserver.observe(container);

    // Interaction timer: visible on cursor move or scroll, disappears fully after 1.2s idle
    let idleTimer: NodeJS.Timeout | null = null;

    const triggerInteraction = () => {
      setIsVisibleOnInteraction(true);
      if (animId === null && !prefersReducedMotion) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsVisibleOnInteraction(false);
      }, 1200);
    };

    // Initial timeout: show briefly on load, then disappear if user does not interact
    idleTimer = setTimeout(() => {
      setIsVisibleOnInteraction(false);
    }, 2200);

    // Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      triggerInteraction();
      const rect = canvas.getBoundingClientRect();
      mouseCanvasX = e.clientX - rect.left;
      mouseCanvasY = e.clientY - rect.top;

      // Normalize [-1, 1] relative to center
      const nx = (mouseCanvasX - width / 2) / (width / 2);
      const ny = (mouseCanvasY - height / 2) / (height / 2);
      targetTiltX = Math.max(-0.35, Math.min(0.35, -ny * 0.25));
      targetTiltY = Math.max(-0.45, Math.min(0.45, nx * 0.35));
    };

    const handleMouseLeave = () => {
      mouseCanvasX = -9999;
      mouseCanvasY = -9999;
      targetTiltX = 0;
      targetTiltY = 0;
    };

    let lastScrollY = window.scrollY;
    const handleScrollOrWheel = () => {
      triggerInteraction();
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY;
      lastScrollY = currentScroll;
      // Add a slight spin impulse on scroll
      rotationY += delta * 0.0015;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("scroll", handleScrollOrWheel, { passive: true });
    window.addEventListener("wheel", triggerInteraction, { passive: true });
    window.addEventListener("touchmove", triggerInteraction, { passive: true });

    // Single Frame Render
    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 420;

      // Trigonometric cache for tilts
      const cosX = Math.cos(currentTiltX);
      const sinX = Math.sin(currentTiltX);
      const cosY = Math.cos(rotationY + currentTiltY);
      const sinY = Math.sin(rotationY + currentTiltY);

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // 1. Base rotation around Y
        const x1 = pt.origX * cosY - pt.origZ * sinY;
        const z1 = pt.origX * sinY + pt.origZ * cosY;
        const y1 = pt.origY;

        // 2. Tilt around X
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;
        const x2 = x1;

        // 3. Perspective projection
        const pz = z2 + 340;
        if (pz <= 10) continue;
        const scale = fov / pz;
        let projX = cx + x2 * scale;
        let projY = cy + y2 * scale;

        // 4. Cursor repulsion within 80px (gentle push and spring return)
        if (!prefersReducedMotion && mouseCanvasX > -1000) {
          const dx = projX - mouseCanvasX;
          const dy = projY - mouseCanvasY;
          const dist = Math.hypot(dx, dy);
          if (dist < 80 && dist > 0.01) {
            const push = (1 - dist / 80) * 18;
            projX += (dx / dist) * push;
            projY += (dy / dist) * push;
          }
        }

        // 5. Depth styling: front dots ~2.5px, back dots ~0.8px, max 45% opacity
        const depthNorm = Math.max(0, Math.min(1, (z2 + RADIUS) / (2 * RADIUS)));
        const radius = 0.8 + depthNorm * 1.7; // ~0.8px to 2.5px
        const alpha = 0.08 + depthNorm * 0.36; // up to ~44%

        // Edge fade
        const edgeDist = Math.hypot(x2, y2) / RADIUS;
        const edgeFade = Math.max(0.2, 1 - edgeDist * 0.25);
        const finalAlpha = Math.min(0.44, alpha * edgeFade);

        ctx.beginPath();
        ctx.arc(projX, projY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 59, 92, ${finalAlpha.toFixed(3)})`;
        ctx.fill();
      }
    };

    // Animation Loop
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Slow continuous Y rotation: ~0.15 rad/s
      rotationY += 0.15 * dt;

      // Lerp tilts (0.06)
      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;

      drawFrame();

      animId = requestAnimationFrame(render);
    };

    if (prefersReducedMotion) {
      drawFrame();
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      if (idleTimer) clearTimeout(idleTimer);
      resizeObserver.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScrollOrWheel);
      window.removeEventListener("wheel", triggerInteraction);
      window.removeEventListener("touchmove", triggerInteraction);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        opacity: isVisibleOnInteraction ? 1 : 0,
        transition: isVisibleOnInteraction
          ? "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
          : "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] lg:w-[480px] lg:h-[480px] pointer-events-none select-none ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
