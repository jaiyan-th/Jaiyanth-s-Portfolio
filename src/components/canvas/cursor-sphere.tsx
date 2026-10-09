"use client";

import { useEffect, useRef } from "react";

interface Point3D {
  origX: number;
  origY: number;
  origZ: number;
}

export function CursorSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check pointer capabilities - disable on touch/coarse devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    // Prefers-reduced-motion check
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = motionQuery.matches;

    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    if (prefersReducedMotion) return;

    // Sphere Geometry Setup
    // Radius 170px (~340px diameter), 28 rings x 56 segments
    const RINGS = 28;
    const SEGMENTS = 56;
    const RADIUS = 170;

    const points: Point3D[] = [];
    for (let r = 1; r < RINGS; r++) {
      const phi = (Math.PI * r) / RINGS;
      for (let s = 0; s < SEGMENTS; s++) {
        const theta = (2 * Math.PI * s) / SEGMENTS;
        const x = RADIUS * Math.sin(phi) * Math.cos(theta);
        const y = RADIUS * Math.cos(phi);
        const z = RADIUS * Math.sin(phi) * Math.sin(theta);
        points.push({ origX: x, origY: y, origZ: z });
      }
    }

    // State & Coordinates declared upfront before any helper functions
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let hasMoved = false;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let sphereX = width / 2;
    let sphereY = height / 2;
    let prevSphereX = sphereX;
    let prevSphereY = sphereY;

    let rotationY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    let currentOpacity = 0;
    let targetOpacity = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    let hasDrawnPrev = false;
    let prevBoxX = 0;
    let prevBoxY = 0;
    const DIRTY_PADDING = 310;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      hasDrawnPrev = false;
    };
    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", resizeCanvas);

    // Colors & Theme tracking
    const getBaseAccentRGB = (): [number, number, number] => {
      const computed = getComputedStyle(document.documentElement)
        .getPropertyValue("--sphere-color")
        .trim();
      if (computed.startsWith("#") && computed.length === 7) {
        const r = parseInt(computed.slice(1, 3), 16);
        const g = parseInt(computed.slice(3, 5), 16);
        const b = parseInt(computed.slice(5, 7), 16);
        return [r, g, b];
      }
      return [255, 59, 92]; // #FF3B5C
    };

    let [baseR, baseG, baseB] = getBaseAccentRGB();
    let curR = baseR;
    let curG = baseG;
    let curB = baseB;
    let targetR = baseR;
    let targetG = baseG;
    let targetB = baseB;

    let isDarkTheme = false;
    let lastThemeCheck = 0;

    const checkThemeUnderCursor = () => {
      if (!hasMoved) return;
      const elem = document.elementFromPoint(targetMouseX, targetMouseY);
      const darkElem = elem?.closest('[data-cursor-theme="dark"]');
      const shouldBeDark = Boolean(darkElem);

      if (shouldBeDark !== isDarkTheme) {
        isDarkTheme = shouldBeDark;
        if (isDarkTheme) {
          targetR = 255;
          targetG = 255;
          targetB = 255;
          canvas.style.mixBlendMode = "normal";
        } else {
          [baseR, baseG, baseB] = getBaseAccentRGB();
          targetR = baseR;
          targetG = baseG;
          targetB = baseB;
          canvas.style.mixBlendMode = "multiply";
        }
      }
    };

    canvas.style.mixBlendMode = "multiply";

    let animId: number | null = null;
    let lastTime = performance.now();

    const startAnimation = () => {
      if (animId === null && !prefersReducedMotion && document.visibilityState === "visible") {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        sphereX = targetMouseX;
        sphereY = targetMouseY;
        prevSphereX = sphereX;
        prevSphereY = sphereY;
      }

      targetOpacity = 1.0;
      startAnimation();

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        targetOpacity = 0.35;
      }, 1500);
    };

    const handlePointerLeave = () => {
      targetOpacity = 0;
      if (idleTimer) clearTimeout(idleTimer);
    };

    const handleScroll = () => {
      checkThemeUnderCursor();
      startAnimation();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (animId !== null) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      } else {
        startAnimation();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = (time: number) => {
      if (prefersReducedMotion) {
        ctx.clearRect(0, 0, width, height);
        animId = null;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      currentOpacity += (targetOpacity - currentOpacity) * 0.08;

      if (currentOpacity < 0.005 && targetOpacity === 0) {
        ctx.clearRect(0, 0, width, height);
        hasDrawnPrev = false;
        animId = null;
        return;
      }

      prevSphereX = sphereX;
      prevSphereY = sphereY;
      sphereX += (targetMouseX - sphereX) * 0.08;
      sphereY += (targetMouseY - sphereY) * 0.08;

      const vx = sphereX - prevSphereX;
      const vy = sphereY - prevSphereY;
      const targetTiltX = Math.max(-0.35, Math.min(0.35, -vy * 0.03));
      const targetTiltY = Math.max(-0.45, Math.min(0.45, vx * 0.03));
      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;

      rotationY += 0.15 * dt;

      if (time - lastThemeCheck > 100) {
        lastThemeCheck = time;
        checkThemeUnderCursor();
      }

      curR += (targetR - curR) * 0.1;
      curG += (targetG - curG) * 0.1;
      curB += (targetB - curB) * 0.1;

      if (hasDrawnPrev) {
        ctx.clearRect(
          prevBoxX - DIRTY_PADDING,
          prevBoxY - DIRTY_PADDING,
          DIRTY_PADDING * 2,
          DIRTY_PADDING * 2
        );
      }

      const CAMERA_DIST = 680;
      const FOCAL_LENGTH = 680;

      const cosX = Math.cos(currentTiltX);
      const sinX = Math.sin(currentTiltX);
      const cosY = Math.cos(rotationY + currentTiltY);
      const sinY = Math.sin(rotationY + currentTiltY);

      const colorPrefix = `rgba(${Math.round(curR)}, ${Math.round(curG)}, ${Math.round(curB)}, `;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        const x1 = pt.origX * cosY - pt.origZ * sinY;
        const z1 = pt.origX * sinY + pt.origZ * cosY;
        const y1 = pt.origY;

        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;
        const x2 = x1;

        const pz = z2 + CAMERA_DIST;
        if (pz <= 10) continue;
        const scale = FOCAL_LENGTH / pz;
        let projX = sphereX + x2 * scale;
        let projY = sphereY + y2 * scale;

        const dx = projX - targetMouseX;
        const dy = projY - targetMouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 60 && dist > 0.01) {
          const push = (1 - dist / 60) * 16;
          projX += (dx / dist) * push;
          projY += (dy / dist) * push;
        }

        const depthNorm = Math.max(0, Math.min(1, (z2 + RADIUS) / (2 * RADIUS)));
        const dotRadius = 0.8 + depthNorm * 1.4;

        const baseAlpha = 0.06 + depthNorm * 0.34;
        const edgeDist = Math.hypot(x2, y2) / RADIUS;
        const edgeFade = Math.max(0.15, 1 - edgeDist * 0.28);
        const finalAlpha = Math.min(0.4, baseAlpha * edgeFade) * currentOpacity;

        if (finalAlpha < 0.02) continue;

        ctx.beginPath();
        ctx.arc(projX, projY, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${colorPrefix}${finalAlpha.toFixed(3)})`;
        ctx.fill();
      }

      prevBoxX = sphereX;
      prevBoxY = sphereY;
      hasDrawnPrev = true;

      animId = requestAnimationFrame(render);
    };

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      if (idleTimer) clearTimeout(idleTimer);
      motionQuery.removeEventListener("change", onMotionChange);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-cursor-sphere="true"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-30 select-none"
    />
  );
}
