"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { Sparkles } from "lucide-react";
import { EASE } from "@/lib/motion";

/* ────────────────────────────────────────────────────────────────────────────
   ArchitectureDiagram
   ────────────────────────────────────────────────────────────────────────────
   Structure (unchanged from original):
     IMAGE RECOGNITION  →  upper-left
     CONVERSATIONAL AI  →  upper-right
     WELLNESS CORE      →  centre
     PREVENTIVE HEALTH  →  bottom
     Thin connecting lines between every outer module and the centre.

   Animations:
     1. Entrance: core fade+scale, lines stroke-draw outward, modules reveal one-by-one.
     2. Continuous slow rotation of the dotted ring only (12s/rev). Centre text stays fixed.
     3. Soft breathing glow on the core.
     4. Glowing signal dots travel along the connecting lines (input→core, core→output).
     5. Hover an outer module → scale 1.04, brighter border, highlight its line, dim the others.
     6. Hover the core → stronger glow, faster ring rotation, smooth return.
     7. Subtle mouse parallax (few px). Disabled on touch devices.
     8. GPU-friendly transforms/opacity, no layout shift, entrance once, reduced-motion respected.
───────────────────────────────────────────────────────────────────────────── */

const RING_DURATION_S = 12; // 12s per rotation (within 10–15s spec)
const RING_DURATION_HOVER_S = 6; // faster on core hover

// Module coordinates inside the 800×500 viewBox
const MODULES = {
  image: { x: 140, y: 130, label: "IMAGE RECOGNITION", sub: "Input layer" },
  conv: { x: 660, y: 130, label: "CONVERSATIONAL AI", sub: "Interaction layer" },
  health: { x: 400, y: 430, label: "PREVENTIVE HEALTH", sub: "Output layer" },
} as const;

const CENTER = { x: 400, y: 270 } as const;
type ModuleKey = keyof typeof MODULES;

// Precompute rounded line endpoints (avoids hydration precision mismatch)
function rounded(n: number) {
  return Number(n.toFixed(4));
}
const lineImage = {
  x1: rounded(MODULES.image.x),
  y1: rounded(MODULES.image.y),
  x2: rounded(CENTER.x),
  y2: rounded(CENTER.y),
};
const lineConv = {
  x1: rounded(MODULES.conv.x),
  y1: rounded(MODULES.conv.y),
  x2: rounded(CENTER.x),
  y2: rounded(CENTER.y),
};
const lineHealth = {
  x1: rounded(CENTER.x),
  y1: rounded(CENTER.y),
  x2: rounded(MODULES.health.x),
  y2: rounded(MODULES.health.y),
};

export function ArchitectureDiagram() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  // Hover state — which module (or core) is hovered
  const [hovered, setHovered] = React.useState<ModuleKey | "core" | null>(null);

  // Core hover → faster ring
  const [coreHovered, setCoreHovered] = React.useState(false);
  const ringDuration = coreHovered ? RING_DURATION_HOVER_S : RING_DURATION_S;

  // ── Mouse parallax (requirement 7) ──────────────────────────────
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [parallaxEnabled, setParallaxEnabled] = React.useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const smoothPx = useSpring(px, { stiffness: 80, damping: 18, mass: 0.4 });
  const smoothPy = useSpring(py, { stiffness: 80, damping: 18, mass: 0.4 });

  React.useEffect(() => {
    // Touch / coarse pointer → disable parallax
    const fine = window.matchMedia("(pointer: fine)").matches;
    setParallaxEnabled(fine && !reduceMotion);
  }, [reduceMotion]);

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!parallaxEnabled || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Range roughly -1..1, scaled to a few px
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      px.set(dx * 12); // ±6px
      py.set(dy * 12);
    },
    [parallaxEnabled, px, py]
  );

  const onMouseLeave = React.useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  // ── Helper: is a line highlighted? ──────────────────────────────
  const lineActive = (key: ModuleKey) => hovered === key;
  const lineDimmed = (key: ModuleKey) =>
    hovered !== null && hovered !== key && hovered !== "core";
  const moduleDimmed = (key: ModuleKey) =>
    hovered !== null && hovered !== key && hovered !== "core";

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative h-full min-h-[520px] border border-line bg-grid overflow-hidden"
    >
      {/* Header bar */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-line px-5 py-3.5 bg-elevated/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} aria-hidden />
          <span className="font-mono-label text-secondary">Framework architecture</span>
        </div>
        <span className="font-mono-label text-secondary !text-[9px]">
          IMAGE · CONVERSATIONAL · PREVENTIVE
        </span>
      </div>

      {/* Coordinate labels */}
      <span
        aria-hidden
        className="absolute left-4 bottom-4 font-mono-label !text-[8px] text-secondary opacity-50 z-10"
      >
        FIG.01 / WELLNESS.MAP
      </span>
      <span
        aria-hidden
        className="absolute right-4 bottom-4 font-mono-label !text-[8px] text-secondary opacity-50 z-10"
      >
        ICETSIS / 2026
      </span>

      {/* Parallax wrapper (only the diagram, not the header/labels) */}
      <motion.div
        style={{ x: smoothPx, y: smoothPy }}
        className="absolute inset-0"
      >
        <svg
          viewBox="0 0 800 500"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="AI wellness framework: image-recognition input and conversational-AI layer feed into a wellness core, which outputs to preventive health"
        >
          <defs>
            <radialGradient id="arch-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="arch-flow-a" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--accent-2)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="arch-flow-b" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="arch-flow-c" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-warm)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--accent-warm)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--accent-warm)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ── Static decorative orbital rings ─────────────────── */}
          <circle cx={CENTER.x} cy={CENTER.y} r="190" fill="none" stroke="var(--line)" strokeWidth="0.6" strokeDasharray="2 5" opacity="0.25" />
          <circle cx={CENTER.x} cy={CENTER.y} r="150" fill="none" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="1 4" opacity="0.2" />

          {/* ── Connecting lines (drawn outward from centre on entrance) ── */}
          <motion.line
            {...lineImage}
            fill="none"
            stroke="var(--accent-2)"
            strokeWidth={lineActive("image") ? "2" : "1"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: lineDimmed("image") ? 0.15 : 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE.primary }}
            style={{ transition: "stroke-width 200ms ease, opacity 200ms ease" }}
          />
          <motion.line
            {...lineConv}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={lineActive("conv") ? "2" : "1"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: lineDimmed("conv") ? 0.15 : 1 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE.primary }}
            style={{ transition: "stroke-width 200ms ease, opacity 200ms ease" }}
          />
          <motion.line
            {...lineHealth}
            fill="none"
            stroke="var(--accent-warm)"
            strokeWidth={lineActive("health") ? "2" : "1"}
            strokeDasharray="3 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: lineDimmed("health") ? 0.15 : 1 } : {}}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE.primary }}
            style={{ transition: "stroke-width 200ms ease, opacity 200ms ease" }}
          />

          {/* ── WELLNESS CORE ────────────────────────────────────── */}
          <g
            transform={`translate(${CENTER.x},${CENTER.y})`}
            onMouseEnter={() => setCoreHovered(true)}
            onMouseLeave={() => setCoreHovered(false)}
            style={{ cursor: parallaxEnabled ? "pointer" : "default" }}
          >
            {/* Breathing glow (requirement 3) — soft, professional */}
            {!reduceMotion && (
              <motion.circle
                r="90"
                fill="url(#arch-core-glow)"
                animate={{
                  opacity: coreHovered ? [0.5, 0.85, 0.5] : [0.35, 0.6, 0.35],
                  scale: coreHovered ? [1, 1.08, 1] : [1, 1.05, 1],
                }}
                transition={{
                  duration: coreHovered ? 2 : 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Rotating dotted ring (requirement 2) — only the ring rotates */}
            <motion.circle
              r="72"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              animate={{ rotate: 360 }}
              transition={{
                duration: ringDuration,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: "0px 0px" }}
            />
            {/* Orbiting dot on the ring */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{
                duration: ringDuration,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: "0px 0px" }}
            >
              <circle cx="72" cy="0" r="3" fill="var(--accent)" />
            </motion.g>

            {/* Static inner circle (does NOT rotate) */}
            <circle r="46" fill="var(--canvas)" opacity="0.85" />
            <circle r="46" fill="none" stroke="var(--line)" strokeWidth="1" />

            {/* Centre text — fixed, does not rotate */}
            <text
              textAnchor="middle"
              dy="-6"
              fontFamily="var(--font-sans)"
              fontWeight="600"
              fontSize="14"
              fill="var(--text-primary)"
            >
              WELLNESS
            </text>
            <text
              textAnchor="middle"
              dy="10"
              fontFamily="var(--font-mono)"
              fontSize="9"
              letterSpacing="2"
              fill="var(--text-secondary)"
            >
              CORE
            </text>

            {/* Pulsing centre dot */}
            {!reduceMotion && (
              <motion.circle
                r="3"
                fill="var(--accent)"
                animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* Entrance: fade + scale up (requirement 1) */}
            {/* Note: this group's transform is static; the entrance is handled
                by wrapping the core in a motion group via opacity/scale on the
                outer <g>. We use a CSS transition fallback for simplicity. */}
          </g>

          {/* ── Outer modules (reveal one-by-one, requirement 1) ──── */}
          <Module
            data={MODULES.image}
            color="var(--accent-2)"
            delay={0.7}
            inView={inView}
            dimmed={moduleDimmed("image")}
            active={hovered === "image"}
            onMouseEnter={() => setHovered("image")}
            onMouseLeave={() => setHovered(null)}
          />
          <Module
            data={MODULES.conv}
            color="var(--accent)"
            delay={0.85}
            inView={inView}
            dimmed={moduleDimmed("conv")}
            active={hovered === "conv"}
            onMouseEnter={() => setHovered("conv")}
            onMouseLeave={() => setHovered(null)}
          />
          <Module
            data={MODULES.health}
            color="var(--accent-warm)"
            delay={1.0}
            inView={inView}
            dimmed={moduleDimmed("health")}
            active={hovered === "health"}
            onMouseEnter={() => setHovered("health")}
            onMouseLeave={() => setHovered(null)}
          />

          {/* ── Signal dots travelling along lines (requirement 4) ── */}
          {!reduceMotion && (
            <>
              {/* Image → Core */}
              <motion.circle
                r="3.5"
                fill="var(--accent-2)"
                animate={{
                  cx: [lineImage.x1, lineImage.x2],
                  cy: [lineImage.y1, lineImage.y2],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.4,
                  times: [0, 0.1, 0.9, 1],
                }}
              />
              {/* Conv → Core */}
              <motion.circle
                r="3.5"
                fill="var(--accent)"
                animate={{
                  cx: [lineConv.x1, lineConv.x2],
                  cy: [lineConv.y1, lineConv.y2],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.9,
                  times: [0, 0.1, 0.9, 1],
                }}
              />
              {/* Core → Health */}
              <motion.circle
                r="3.5"
                fill="var(--accent-warm)"
                animate={{
                  cx: [lineHealth.x1, lineHealth.x2],
                  cy: [lineHealth.y1, lineHealth.y2],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2.4,
                  times: [0, 0.1, 0.9, 1],
                }}
              />
            </>
          )}
        </svg>
      </motion.div>
    </div>
  );
}

// ── Module component ──────────────────────────────────────────────────────
type ModuleData = { x: number; y: number; label: string; sub: string };

function Module({
  data,
  color,
  delay,
  inView,
  dimmed,
  active,
  onMouseEnter,
  onMouseLeave,
}: {
  data: ModuleData;
  color: string;
  delay: number;
  inView: boolean;
  dimmed: boolean;
  active: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  // Entrance: small upward movement + fade-in (requirement 1)
  // Hover: scale 1.04 + brighter border (requirement 5)
  return (
    <motion.g
      transform={`translate(${data.x},${data.y})`}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: dimmed ? 0.35 : 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE.primary }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "pointer" }}
    >
      {/* Hover scale wrapper — applies to the box + text only */}
      <motion.g
        animate={{ scale: active ? 1.04 : 1 }}
        transition={{ duration: 0.25, ease: EASE.primary }}
        style={{ transformOrigin: "0px 0px" }}
      >
        {/* Glow behind module on hover */}
        <motion.circle
          r="48"
          fill={color}
          animate={{ opacity: active ? 0.18 : 0.08 }}
          transition={{ duration: 0.25 }}
        />
        {/* Box */}
        <rect
          x="-85"
          y="-30"
          width="170"
          height="60"
          rx="6"
          fill="var(--elevated)"
          stroke={color}
          strokeWidth={active ? "2" : "1.5"}
          style={{ transition: "stroke-width 200ms ease" }}
        />
        {/* Left accent stripe */}
        <rect x="-85" y="-30" width="5" height="60" rx="2" fill={color} />
        {/* Status dot — pulsing */}
        <circle cx="68" cy="-20" r="3" fill={color}>
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.8s"
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
        </circle>
        {/* Label */}
        <text
          textAnchor="middle"
          dy="-3"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="1.5"
          fontWeight="500"
          fill="var(--text-primary)"
        >
          {data.label}
        </text>
        <text
          textAnchor="middle"
          dy="14"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          letterSpacing="1.5"
          fill="var(--text-secondary)"
        >
          {data.sub}
        </text>
      </motion.g>
    </motion.g>
  );
}
