"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = React.useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPointer, setIsPointer] = React.useState(false);
  const [isDrag, setIsDrag] = React.useState(false);
  const [activity, setActivity] = React.useState({
    code: "SIG-2026",
    status: "calibrated",
    metric: "0.00",
  });

  const lastPosRef = React.useRef({ x: 0, y: 0, time: performance.now() });

  React.useEffect(() => {
    // Only run on desktop/fine pointers
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let speedTimeout: NodeJS.Timeout | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const prev = lastPosRef.current;
      const dt = Math.max(1, now - prev.time);
      const dist = Math.hypot(e.clientX - prev.x, e.clientY - prev.y);
      const speed = (dist / dt) * 1000; // px/sec

      lastPosRef.current = { x: e.clientX, y: e.clientY, time: now };
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target instanceof Element ? e.target : null;

      // Hide over matter.js bubble footer to avoid interference
      if (target && target.closest("[data-bubble-footer]")) {
        setIsVisible(false);
        return;
      }

      if (!isVisible) setIsVisible(true);

      // Check if hovering over draggable element
      const draggable = target && target.closest("[data-draggable], .drag-target");
      if (draggable) {
        setIsDrag(true);
        setIsPointer(false);
      } else {
        setIsDrag(false);
        // Check if interactive link or button
        if (
          target &&
          (target.tagName === "A" ||
            target.tagName === "BUTTON" ||
            target.closest("a, button, input, textarea, [role='button']"))
        ) {
          setIsPointer(true);
        } else {
          setIsPointer(false);
        }
      }

      // Dynamic contextual telemetry status
      if (speed > 800) {
        setActivity({
          code: "SIG-9402",
          status: "skimming",
          metric: (Math.min(0.99, speed / 2500)).toFixed(2),
        });
      } else if (speed > 180) {
        setActivity({
          code: "SIG-3184",
          status: "reading closely",
          metric: (Math.min(0.85, speed / 1200)).toFixed(2),
        });
      } else {
        setActivity({
          code: "SIG-1048",
          status: "studying",
          metric: "0.24",
        });
      }

      if (speedTimeout) clearTimeout(speedTimeout);
      speedTimeout = setTimeout(() => {
        setActivity({
          code: "SIG-2026",
          status: "calibrated",
          metric: "0.00",
        });
      }, 700);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (speedTimeout) clearTimeout(speedTimeout);
    };
  }, [isVisible]);

  if (!isVisible || shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* 1. If in DRAG mode: Expanding circular "← DRAG →" pill badge */}
      {isDrag ? (
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-[#0A0A0A] text-white border border-[#E6E3DC]/30 shadow-lg">
          <span className="text-[10px] font-mono tracking-widest font-semibold uppercase text-accent-tint">
            DRAG
          </span>
        </div>
      ) : isPointer ? (
        /* 2. If hovering clickable element: Focused Accent Ring */
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-accent/70 bg-accent/10 transition-all duration-150 scale-110" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-accent" />
        </div>
      ) : (
        /* 3. Normal State: High-Tech Radar Reticle + Floating Dynamic Telemetry Badge */
        <div className="relative">
          {/* Center Crosshair Reticle */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            {/* Outer Subtle Radar Ring */}
            <div className="w-6 h-6 rounded-full border border-[#0A0A0A]/25 dark:border-white/25" />
            {/* Center Focus Dot */}
            <div className="absolute w-1 h-1 rounded-full bg-accent" />
          </div>

          {/* Floating Telemetry Tag (Offset top-right) */}
          <div className="absolute left-4 -top-8 flex flex-col gap-0.5 px-2.5 py-1 rounded-md bg-white/90 dark:bg-[#141414]/90 border border-[#E6E3DC] dark:border-white/10 shadow-xs backdrop-blur-xs select-none">
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#6B6B6B] dark:text-[#9A9892]">
              <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              <span>{activity.code}</span>
            </div>
            <div className="text-[10px] font-mono text-[#0A0A0A] dark:text-[#F0EDE6] tracking-tight whitespace-nowrap font-medium">
              <span>{activity.status}</span>
              <span className="text-accent-hover font-semibold"> · {activity.metric}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
