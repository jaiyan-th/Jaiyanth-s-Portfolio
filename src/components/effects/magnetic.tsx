"use client";

import * as React from "react";

/**
 * Magnetic wrapper — pulls its child slightly toward the pointer.
 * Fine-pointer only. Disabled for touch and reduced motion.
 * Uses transform only (no layout shift).
 */
type MagneticProps = {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  as?: "span" | "div" | "a" | "button";
};

export function Magnetic({
  children,
  strength = 0.25,
  radius = 80,
  className,
  as = "span",
}: MagneticProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduce);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const maxDist = radius + Math.max(rect.width, rect.height) / 2;
    if (dist > maxDist) {
      ref.current.style.transform = "translate3d(0,0,0)";
      return;
    }
    ref.current.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  const style: React.CSSProperties = {
    display: "inline-block",
    willChange: "transform",
    transition: "transform 360ms cubic-bezier(0.16,1,0.3,1)",
  };

  if (as === "a") {
    return (
      <a
        ref={(el) => {
          ref.current = el;
        }}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }
  if (as === "button") {
    return (
      <button
        type="button"
        ref={(el) => {
          ref.current = el;
        }}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={className}
        style={style}
      >
        {children}
      </button>
    );
  }
  if (as === "div") {
    return (
      <div
        ref={(el) => {
          ref.current = el;
        }}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={className}
        style={style}
      >
        {children}
      </div>
    );
  }
  return (
    <span
      ref={(el) => {
        ref.current = el;
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={style}
    >
      {children}
    </span>
  );
}
