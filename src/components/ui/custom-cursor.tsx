"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = React.useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPointer, setIsPointer] = React.useState(false);
  const [isDrag, setIsDrag] = React.useState(false);

  React.useEffect(() => {
    // Only run on desktop/fine pointers
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
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
        /* 3. Normal State: Clean Radar Reticle */
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border border-[#0A0A0A]/25 dark:border-white/25" />
          <div className="absolute w-1 h-1 rounded-full bg-accent" />
        </div>
      )}
    </div>
  );
}

