"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────────
   WellnessVisual (Hologram Edition)
   ────────────────────────────────────────────────────────────────────────────
   A compact Three.js holographic healthcare globe scene.
   Inspired by the reference image: a floating wireframe Earth globe
   with glowing "continents", orbital rings, floating medical icons,
   an ECG waveform, and connection lines — all with additive glow.

   Behaviour:
     • Slow rotating globe + counter-rotating orbital rings
     • Floating medical icons with staggered entrance + breathing scale
     • Travelling ECG heartbeat waveform
     • Pulsing connection lines between icons and the globe
     • Central glow halo that breathes softly
     • Hover intensifies rotation + glow + parallax
     • Reduced motion → static low-motion version
     • Touch devices → hover disabled
───────────────────────────────────────────────────────────────────────────── */

const StaticFallback = () => (
  <div
    aria-hidden
    className="absolute inset-0 flex items-center justify-center"
  >
    <svg viewBox="0 0 400 240" className="h-full w-full">
      <defs>
        <radialGradient id="wv-static-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="120" r="80" fill="url(#wv-static-glow)" />
      <circle cx="200" cy="120" r="40" fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="4 4" />
      <circle cx="200" cy="120" r="6" fill="var(--accent)" />
      <text
        x="200"
        y="116"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight="600"
        fontSize="11"
        fill="var(--text-primary)"
      >
        WELLNESS AI
      </text>
      <text
        x="200"
        y="132"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="7"
        letterSpacing="2"
        fill="var(--text-secondary)"
      >
        CORE
      </text>
    </svg>
  </div>
);

const HologramCanvas = dynamic(() => import("./hologram-canvas"), {
  ssr: false,
  loading: () => <StaticFallback />,
});

export function WellnessVisual() {
  const [webglOk, setWebglOk] = React.useState<boolean | null>(null);
  const [hovered, setHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
      setWebglOk(!!gl);
    } catch {
      setWebglOk(false);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-[360px] border border-line bg-grid overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header bar */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-line px-5 py-3.5 bg-elevated/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} aria-hidden />
          <span className="font-mono-label text-secondary">Wellness intelligence</span>
        </div>
        <span className="font-mono-label text-secondary !text-[9px]">
          LIVE
        </span>
      </div>

      {/* Coordinate labels */}
      <span
        aria-hidden
        className="absolute left-4 bottom-3 font-mono-label !text-[8px] text-secondary opacity-50 z-10"
      >
        FIG.01 / WELLNESS.CORE
      </span>
      <span
        aria-hidden
        className="absolute right-4 bottom-3 font-mono-label !text-[8px] text-secondary opacity-50 z-10"
      >
        ICETSIS / 2026
      </span>

      {/* WebGL canvas or static fallback */}
      <div className="absolute inset-0 pt-[52px] pb-[28px]">
        {webglOk === null ? (
          <StaticFallback />
        ) : webglOk ? (
          <HologramCanvas hovered={hovered} />
        ) : (
          <StaticFallback />
        )}
      </div>
    </div>
  );
}
