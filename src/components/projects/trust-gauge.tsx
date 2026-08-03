"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * TrustGauge — animated circular gauge that fills to a target percentage
 * when scrolled into view.
 *
 * - Ring fills from 0° to target° (stroke-dashoffset animation)
 * - Number counts up from 0 to target (useMotionValue + animate)
 * - Pulsing center glow
 * - Respects prefers-reduced-motion (renders final state immediately)
 * - GPU-friendly: transform + opacity only
 */

const RADIUS = 62;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~389.56

export function TrustGauge({
  target = 83,
  label = "TRUST",
  size = 160,
}: {
  target?: number;
  label?: string;
  size?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [reduced, setReduced] = React.useState(false);

  // Motion value for the count-up
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}%`);

  // Stroke-dashoffset: starts at full circumference (empty), animates to
  // the portion representing (100 - target)% of the circle remaining.
  // offset = CIRCUMFERENCE * (1 - target/100)
  const targetOffset = CIRCUMFERENCE * (1 - target / 100);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  React.useEffect(() => {
    if (!inView) return;
    if (reduced) {
      count.set(target);
      return;
    }
    // Count up 0 → target over 1.4s, synced with the ring fill
    const controls = animate(count, target, {
      duration: 1.4,
      ease: EASE.primary,
      delay: 0.3,
    });
    return () => controls.stop();
  }, [inView, count, target, reduced]);

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        className="h-full w-full"
        role="img"
        aria-label={`Trust score: ${target} percent`}
      >
        <defs>
          <radialGradient id="trust-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft glow behind gauge */}
        <circle cx="80" cy="80" r="72" fill="url(#trust-glow)" />

        {/* Track (background ring) */}
        <circle
          cx="80"
          cy="80"
          r={RADIUS}
          fill="none"
          stroke="var(--line)"
          strokeWidth="2"
        />

        {/* Progress arc — rotates -90° so it starts at top */}
        <motion.circle
          cx="80"
          cy="80"
          r={RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={inView && !reduced ? { strokeDashoffset: targetOffset } : { strokeDashoffset: reduced ? targetOffset : CIRCUMFERENCE }}
          transition={{ duration: 1.4, ease: EASE.primary, delay: 0.3 }}
          transform="rotate(-90 80 80)"
          style={{ filter: "drop-shadow(0 0 6px var(--node-glow))" }}
        />

        {/* Tick marks around the gauge — subtle technical detail */}
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i / 48) * Math.PI * 2 - Math.PI / 2;
          const isMajor = i % 6 === 0;
          const inner = isMajor ? 68 : 70;
          const outer = 73;
          const x1 = 80 + Math.cos(angle) * inner;
          const y1 = 80 + Math.sin(angle) * inner;
          const x2 = 80 + Math.cos(angle) * outer;
          const y2 = 80 + Math.sin(angle) * outer;
          return (
            <line
              key={i}
              x1={Number(x1.toFixed(2))}
              y1={Number(y1.toFixed(2))}
              x2={Number(x2.toFixed(2))}
              y2={Number(y2.toFixed(2))}
              stroke="var(--accent)"
              strokeWidth={isMajor ? "1.2" : "0.5"}
              opacity={isMajor ? 0.4 : 0.2}
            />
          );
        })}
      </svg>

      {/* Center text — the counting number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.span
          className="font-sans font-semibold"
          style={{
            fontSize: 28,
            color: "var(--text-primary)",
            lineHeight: 1,
          }}
        >
          {display}
        </motion.span>
        <span
          className="font-mono mt-1"
          style={{
            fontSize: 10,
            letterSpacing: "2px",
            color: "var(--text-secondary)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
