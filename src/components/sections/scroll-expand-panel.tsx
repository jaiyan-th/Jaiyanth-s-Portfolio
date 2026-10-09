"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";

interface ScrollExpandPanelProps {
  /**
   * Background color of the expandable panel.
   * Defaults to near-black (#111111).
   */
  color?: string;
  /**
   * Additional CSS classes for the outer container.
   */
  className?: string;
}

export function ScrollExpandPanel({
  color = "#111111",
  className = "",
}: ScrollExpandPanelProps) {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track progress of the section across viewport scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll progress using spring physics (stiffness: 120, damping: 30, mass: 0.3)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Map progress to width (using percentage of stage to avoid scrollbar overflow)
  const width = useTransform(
    smoothProgress,
    [0, 0.08, 0.32, 0.78, 1],
    ["50%", "50%", "100%", "100%", "94%"]
  );

  // Map progress to height (using percentage of 100dvh stage)
  const height = useTransform(
    smoothProgress,
    [0, 0.08, 0.32, 0.78, 1],
    ["50%", "50%", "100%", "100%", "90%"]
  );

  // Map progress to border-radius (12px -> 0px -> 24px)
  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.08, 0.32, 0.78, 1],
    ["12px", "12px", "0px", "0px", "24px"]
  );

  // Exit y offset as the panel unpins and scrolls away
  const y = useTransform(
    smoothProgress,
    [0, 0.08, 0.32, 0.78, 1],
    ["0px", "0px", "0px", "0px", "-40px"]
  );

  // Accessibility: In reduced-motion mode, render statically at full size with 100dvh runway
  if (shouldReduceMotion) {
    return (
      <section
        className={`relative h-[100dvh] w-full flex items-center justify-center overflow-hidden ${className}`}
        aria-hidden="true"
        role="presentation"
      >
        <div
          className="w-full h-full"
          style={{ backgroundColor: color }}
        />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className={`relative h-[400dvh] w-full ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* Sticky viewport-height stage */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div
          style={{
            width,
            height,
            borderRadius,
            y,
            backgroundColor: color,
            willChange: "width, height, border-radius, transform",
          }}
          className="pointer-events-auto"
        />
      </div>
    </section>
  );
}
