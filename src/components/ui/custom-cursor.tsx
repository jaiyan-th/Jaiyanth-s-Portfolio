"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = React.useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = React.useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = React.useState(false);
  const [cursorText, setCursorText] = React.useState<string | null>(null);
  const [isPointer, setIsPointer] = React.useState(false);

  React.useEffect(() => {
    // Only run on desktop/fine pointers
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let animId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const render = () => {
      currentX = lerp(currentX, targetX, 0.18);
      currentY = lerp(currentY, targetY, 0.18);
      setTrailingPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target instanceof Element ? e.target : null;

      // Hide over matter.js bubble footer to avoid double cursor
      if (target && target.closest("[data-bubble-footer]")) {
        setIsVisible(false);
        return;
      }

      if (!isVisible) setIsVisible(true);

      if (!target) {
        setIsPointer(false);
        setCursorText(null);
        return;
      }

      // Check context labels
      const link = target.closest("a");
      const button = target.closest("button");

      if (link) {
        setIsPointer(true);
        const href = link.getAttribute("href") || "";
        if (href.startsWith("mailto:")) {
          setCursorText("EMAIL");
        } else if (href.includes("/work/") || href.startsWith("#work")) {
          setCursorText("VIEW");
        } else if (href.startsWith("http") || link.getAttribute("target") === "_blank") {
          setCursorText("OPEN");
        } else {
          setCursorText("VIEW");
        }
      } else if (button) {
        setIsPointer(true);
        setCursorText("CLICK");
      } else if (target.closest("[role='button'], input, textarea")) {
        setIsPointer(true);
        setCursorText(null);
      } else {
        setIsPointer(false);
        setCursorText(null);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible || shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
    >
      {/* 1. Trailing Ring with Context Label */}
      <div
        className="fixed top-0 left-0 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        <div
          className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 ${
            cursorText
              ? "w-12 h-12 bg-[#0A0A0A] text-white shadow-[2px_2px_0px_#E5341B]"
              : isPointer
              ? "w-8 h-8 rounded-full border border-[#E5341B] bg-[#FFE45C]/20"
              : "w-5 h-5 rounded-full border border-[#0A0A0A]/40"
          }`}
        >
          {cursorText && (
            <span className="text-[9px] font-mono tracking-widest font-bold uppercase text-white select-none">
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* 2. Direct Red Dot Centered at Cursor */}
      <div
        className="fixed top-0 left-0 will-change-transform"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E5341B]" />
      </div>
    </div>
  );
}
