"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const innerRingRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    // Hide native cursor with cursor:none only for (pointer: fine) devices
    if (typeof window === "undefined") return;
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    if (!finePointerQuery.matches) {
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    let animId: number;
    let isInitialized = false;
    let targetX = -1000;
    let targetY = -1000;
    let ringX = -1000;
    let ringY = -1000;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const render = () => {
      if (isInitialized) {
        ringX = lerp(ringX, targetX, 0.22);
        ringY = lerp(ringY, targetY, 0.22);

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const updateContextStyle = (label: string | null, isPointer: boolean) => {
      const inner = innerRingRef.current;
      const lbl = labelRef.current;
      if (!inner || !lbl) return;

      if (label) {
        lbl.textContent = label;
        lbl.style.display = "inline";
        inner.className =
          "relative -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-150 w-12 h-12 bg-[#0A0A0A] text-white shadow-[2px_2px_0px_#E5341B]";
      } else if (isPointer) {
        lbl.textContent = "";
        lbl.style.display = "none";
        inner.className =
          "relative -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-150 w-8 h-8 rounded-full border border-[#E5341B] bg-[#FFE45C]/20";
      } else {
        lbl.textContent = "";
        lbl.style.display = "none";
        inner.className =
          "relative -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-150 w-5 h-5 rounded-full border border-[#0A0A0A]/40";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Initialize ring at the first mousemove position so it never flies in from the corner
      if (!isInitialized) {
        isInitialized = true;
        ringX = e.clientX;
        ringY = e.clientY;
      }

      targetX = e.clientX;
      targetY = e.clientY;

      const target = e.target instanceof Element ? e.target : null;

      // Keep the data-bubble-footer exception: hide custom cursor over bubble footer
      if (target && target.closest("[data-bubble-footer]")) {
        if (containerRef.current) {
          containerRef.current.style.opacity = "0";
        }
        return;
      }

      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }

      if (!target) {
        updateContextStyle(null, false);
        return;
      }

      // Check context labels
      const link = target.closest("a");
      const button = target.closest("button");

      if (link) {
        const href = link.getAttribute("href") || "";
        if (href.startsWith("mailto:")) {
          updateContextStyle("EMAIL", true);
        } else if (href.includes("/work/") || href.startsWith("#work")) {
          updateContextStyle("VIEW", true);
        } else if (href.startsWith("http") || link.getAttribute("target") === "_blank") {
          updateContextStyle("OPEN", true);
        } else {
          updateContextStyle("VIEW", true);
        }
      } else if (button) {
        updateContextStyle("CLICK", true);
      } else if (target.closest("[role='button'], input, textarea")) {
        updateContextStyle(null, true);
      } else {
        updateContextStyle(null, false);
      }
    };

    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cancelAnimationFrame(animId);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [shouldReduceMotion]); // No isVisible in dependencies!

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ opacity: 0, transition: "opacity 150ms ease" }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
    >
      {/* 1. Trailing Ring with Context Label (no CSS transition on transform) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 will-change-transform"
      >
        <div
          ref={innerRingRef}
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-150 w-5 h-5 border border-[#0A0A0A]/40"
        >
          <span
            ref={labelRef}
            style={{ display: "none" }}
            className="text-[9px] font-mono tracking-widest font-bold uppercase text-white select-none"
          />
        </div>
      </div>

      {/* 2. Direct Red Dot Centered at Cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 will-change-transform"
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E5341B]" />
      </div>
    </div>
  );
}
