"use client";

import * as React from "react";
import { motion } from "motion/react";
import { EASE, DURATION } from "@/lib/motion";
import { TrustGauge } from "./trust-gauge";

type Variant = "evidence-network" | "career-layers" | "route-geometry";

export function ProjectVisual({ variant }: { variant: Variant }) {
  switch (variant) {
    case "evidence-network":
      return <EvidenceNetwork />;
    case "career-layers":
      return <CareerLayers />;
    case "route-geometry":
      return <RouteGeometry />;
  }
}

function EvidenceNetwork() {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 600 420"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Animated evidence-source network for the Fake News Detector"
      >
        <defs>
          <radialGradient id="fn-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fn-beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="600" height="420" fill="url(#fn-glow)" opacity="0.6" />

        {/* Source nodes */}
        {[
          { x: 80, y: 80, label: "SRC-01" },
          { x: 520, y: 80, label: "SRC-02" },
          { x: 80, y: 340, label: "SRC-03" },
          { x: 520, y: 340, label: "SRC-04" },
          { x: 300, y: 60, label: "SRC-05" },
          { x: 300, y: 360, label: "SRC-06" },
        ].map((n, i) => (
          <g key={i} transform={`translate(${n.x},${n.y})`}>
            <motion.line
              x1="0"
              y1="0"
              x2={300 - n.x}
              y2={210 - n.y}
              stroke="var(--line)"
              strokeWidth="0.6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: EASE.primary }}
            />
            <motion.circle
              r="4"
              fill="var(--accent-2)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08, ease: EASE.primary }}
            />
            <text
              textAnchor="middle"
              dy="22"
              fontFamily="var(--font-mono)"
              fontSize="8"
              letterSpacing="1"
              fill="var(--text-secondary)"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Semantic-search beam */}
        <motion.line
          x1="20"
          y1="210"
          x2="580"
          y2="210"
          stroke="url(#fn-beam)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: [0, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: EASE.secondary }}
        />
      </svg>

      {/* Animated trust gauge — centered, overlays the SVG */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <TrustGauge target={83} label="TRUST" size={160} />
      </div>
    </div>
  );
}

function CareerLayers() {
  return (
    <svg
      viewBox="0 0 600 420"
      className="h-full w-full"
      role="img"
      aria-label="Animated career assistant layers for Up-Skill"
    >
      <defs>
        <linearGradient id="us-bar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>

      {/* Resume analysis layers */}
      {[60, 110, 160, 210].map((y, i) => (
        <motion.rect
          key={i}
          x="50"
          y={y}
          width={i === 3 ? 480 : 480 - i * 60}
          height="28"
          rx="4"
          fill="none"
          stroke="var(--line)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
        />
      ))}

      {/* Skill gap bars */}
      {[
        { x: 50, w: 320, label: "PYTHON" },
        { x: 50, w: 280, label: "RAG" },
        { x: 50, w: 220, label: "TYPESCRIPT" },
        { x: 50, w: 180, label: "DEPLOYMENT" },
      ].map((b, i) => (
        <g key={i} transform={`translate(${b.x},${260 + i * 30})`}>
          <text
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="1.5"
            fill="var(--text-secondary)"
            y="-6"
          >
            {b.label}
          </text>
          <rect width="500" height="6" fill="var(--line)" rx="3" />
          <motion.rect
            width={b.w}
            height="6"
            fill="url(#us-bar)"
            rx="3"
            initial={{ width: 0 }}
            whileInView={{ width: b.w }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: EASE.primary }}
          />
        </g>
      ))}

      {/* Orbiting profile node */}
      <g transform="translate(460,80)">
        <circle r="34" fill="none" stroke="var(--line)" />
        <motion.circle
          r="34"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "0px 0px" }}
        />
        <circle r="6" fill="var(--accent)" />
        <text
          textAnchor="middle"
          dy="52"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="1.5"
          fill="var(--text-secondary)"
        >
          PROFILE INTELLIGENCE
        </text>
      </g>
    </svg>
  );
}

function RouteGeometry() {
  return (
    <svg
      viewBox="0 0 600 420"
      className="h-full w-full"
      role="img"
      aria-label="Animated route geometry and booking timeline for Car-Rent"
    >
      <defs>
        <linearGradient id="cr-route" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>

      {/* Route geometry — curved path */}
      <motion.path
        d="M 50 320 C 180 320, 180 100, 300 100 S 420 320, 550 320"
        fill="none"
        stroke="var(--line)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <motion.path
        d="M 50 320 C 180 320, 180 100, 300 100 S 420 320, 550 320"
        fill="none"
        stroke="url(#cr-route)"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE.primary, delay: 0.3 }}
      />

      {/* Waypoints */}
      {[
        { x: 50, y: 320, label: "PICKUP" },
        { x: 300, y: 100, label: "TRANSIT" },
        { x: 550, y: 320, label: "DROPOFF" },
      ].map((w, i) => (
        <g key={i} transform={`translate(${w.x},${w.y})`}>
          <motion.circle
            r="10"
            fill="var(--canvas)"
            stroke="var(--accent)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.4, ease: EASE.primary }}
          />
          <text
            textAnchor="middle"
            dy="-20"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="1.5"
            fill="var(--text-secondary)"
          >
            {w.label}
          </text>
        </g>
      ))}

      {/* Booking timeline */}
      <g transform="translate(50,200)">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${i * 110},0)`}>
            <motion.rect
              width="90"
              height="44"
              fill="none"
              stroke="var(--line)"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: EASE.primary }}
            />
            <text
              x="45"
              y="20"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="8"
              letterSpacing="1"
              fill="var(--text-secondary)"
            >
              STAGE {i + 1}
            </text>
            <text
              x="45"
              y="34"
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontSize="10"
              fill="var(--text-primary)"
            >
              {["SEARCH", "BOOK", "PAY", "REVIEW", "CONFIRM"][i]}
            </text>
          </g>
        ))}
      </g>

      {/* Auth indicator */}
      <g transform="translate(490,80)">
        <rect
          x="-60"
          y="-14"
          width="120"
          height="28"
          rx="14"
          fill="none"
          stroke="var(--accent)"
        />
        <text
          textAnchor="middle"
          dy="4"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="1.5"
          fill="var(--accent)"
        >
          JWT · OAUTH
        </text>
      </g>
    </svg>
  );
}
