"use client";

import * as React from "react";

/**
 * TiltCard — mouse-tracked 3D perspective tilt wrapper.
 *
 * Adds a subtle `transform: perspective() rotateX() rotateY()` on hover,
 * tracking the cursor relative to the card centre. Resets smoothly on leave.
 *
 * - Fine-pointer devices only (disabled on touch)
 * - Respects prefers-reduced-motion (tilt skipped, children render flat)
 * - GPU-friendly: transform + opacity only, will-change: transform
 * - No layout shift: the wrapper takes the same space as its child
 * - Content/copy/layout inside is untouched — this is a pure visual wrapper
 */

type TiltCardProps = {
  children: React.ReactNode;
  /** Max tilt in degrees. Default 6°. */
  max?: number;
  /** Perspective in px. Default 800. */
  perspective?: number;
  /** Scale on hover. Default 1.02. */
  scale?: number;
  className?: string;
  /** Glare effect — subtle radial highlight that follows the cursor */
  glare?: boolean;
  /** Accent glow — soft box-shadow in the accent color on hover */
  glow?: boolean;
  /** Glow color (CSS color). Defaults to var(--accent) via JS. */
  glowColor?: string;
};

export function TiltCard({
  children,
  max = 6,
  perspective = 800,
  scale = 1.02,
  className,
  glare = true,
  glow = false,
  glowColor,
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [transform, setTransform] = React.useState("");
  const [glarePos, setGlarePos] = React.useState({ x: 50, y: 50, opacity: 0 });

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
    // Normalised -1..1
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    // rotateY follows horizontal, rotateX follows vertical (inverted for natural feel)
    const ry = dx * max;
    const rx = -dy * max;
    setTransform(
      `perspective(${perspective}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`
    );
    if (glare) {
      setGlarePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
        opacity: 0.15,
      });
    }
  };

  const handleEnter = () => setHovered(true);
  const reset = () => {
    setTransform("");
    setHovered(false);
    setGlarePos((g) => ({ ...g, opacity: 0 }));
  };

  // Resolve glow color from CSS var if not provided
  const resolvedGlowColor = React.useMemo(() => {
    if (glowColor) return glowColor;
    if (typeof window === "undefined") return "#ff6a3d";
    return getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim() || "#ff6a3d";
  }, [glowColor]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={reset}
      className={className}
      style={{
        transform,
        transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        transformStyle: "preserve-3d",
        position: "relative",
        boxShadow: enabled && glow && hovered
          ? `0 20px 60px -20px ${resolvedGlowColor}66, 0 0 30px -10px ${resolvedGlowColor}44`
          : "none",
      }}
    >
      {children}
      {enabled && glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, var(--node-glow), transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}
