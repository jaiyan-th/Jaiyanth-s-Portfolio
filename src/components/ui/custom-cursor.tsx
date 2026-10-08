"use client";

import * as React from "react";

export function CustomCursor() {
  const [position, setPosition] = React.useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPointer, setIsPointer] = React.useState(false);

  React.useEffect(() => {
    // Only run on non-touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a, button, input, textarea"))) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
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

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      {/* 4-point sparkle / star icon */}
      <svg
        width={isPointer ? "22" : "16"}
        height={isPointer ? "22" : "16"}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`transition-all duration-150 ease-out text-[#0A0A0A] drop-shadow-[0_0_8px_rgba(255,51,85,0.3)] ${
          isPointer ? "rotate-45 scale-125 text-[#FF3355]" : "rotate-0 scale-100"
        }`}
      >
        <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
      </svg>
    </div>
  );
}
