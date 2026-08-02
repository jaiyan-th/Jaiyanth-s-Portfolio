"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "./theme-provider";

const StaticFallback = () => {
  const nodes = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const x = Number((200 + Math.cos(angle) * 130).toFixed(3));
    const y = Number((200 + Math.sin(angle) * 130).toFixed(3));
    return (
      <g key={i}>
        <line
          x1="200"
          y1="200"
          x2={x}
          y2={y}
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="0.6"
        />
        <circle cx={x} cy={y} r="3.5" fill="var(--accent)" />
      </g>
    );
  });
  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full opacity-70"
        style={{ color: "var(--text-secondary)" }}
      >
        <defs>
          <radialGradient id="fallback-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="160" fill="url(#fallback-glow)" />
        {nodes}
        <circle cx="200" cy="200" r="8" fill="var(--accent-2)" />
      </svg>
    </div>
  );
};

const SculptureCanvas = dynamic(() => import("./sculpture-canvas"), {
  ssr: false,
  loading: () => <StaticFallback />,
});

export function SystemSculpture() {
  const [webglOk, setWebglOk] = React.useState<boolean | null>(null);
  const { theme } = useTheme();

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

  if (webglOk === null) return <StaticFallback />;
  if (webglOk === false) return <StaticFallback />;

  return <SculptureCanvas theme={theme} />;
}
