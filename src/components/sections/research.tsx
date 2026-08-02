"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FileText, MapPin, Calendar, Building2, Quote, Sparkles } from "lucide-react";
import { RESEARCH } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/masked-heading";

export function Research() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Subtle parallax on the diagram
  const diagramY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      id="research"
      aria-labelledby="research-heading"
      className="relative section-spacing border-t border-line overflow-hidden"
    >
      {/* Ambient glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 70% 50%, var(--node-glow) 0%, transparent 70%)",
        }}
      />

      <div className="container-editorial relative">
        <SectionHeader
          index="05"
          label="IEEE Research"
          title="A preventive-healthcare AI framework."
          supporting="Co-authored research integrating image recognition and conversational AI, accepted at ICETSIS 2026."
        />

        {/* Three-zone layout: paper card (4 col) + framework diagram (8 col) */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: paper card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.reveal, ease: EASE.primary }}
            className="lg:col-span-4"
          >
            <PaperCard />
          </motion.div>

          {/* Right: framework diagram — wider, more prominent */}
          <motion.div
            style={{ y: diagramY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.12, duration: DURATION.reveal, ease: EASE.primary }}
            className="lg:col-span-8"
          >
            <FrameworkDiagram />
          </motion.div>
        </div>

        {/* Bottom: key contributions strip */}
        <KeyContributions />
      </div>
    </section>
  );
}

function PaperCard() {
  return (
    <div className="relative flex h-full flex-col border border-line overflow-hidden bg-elevated/40">
      {/* Top gradient accent bar */}
      <div
        aria-hidden
        className="h-0.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-warm))",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2">
          <FileText
            className="h-3.5 w-3.5"
            style={{ color: "var(--accent)" }}
            aria-hidden
          />
          <span className="font-mono-label text-secondary">Paper</span>
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 font-mono-label !text-[9px]"
          style={{
            background: "color-mix(in oklab, var(--accent) 14%, transparent)",
            color: "var(--accent)",
            border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
          }}
        >
          {RESEARCH.status}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-5 p-5">
        {/* Title */}
        <h3 className="font-display text-[clamp(17px,1.8vw,21px)] leading-snug tracking-tight text-balance">
          {RESEARCH.title}
        </h3>

        {/* Quote */}
        <blockquote
          className="relative pl-4 text-[12.5px] text-secondary text-pretty italic leading-relaxed"
          style={{ borderLeft: "2px solid var(--accent)" }}
        >
          {RESEARCH.abstract}
        </blockquote>

        {/* Metadata */}
        <dl className="grid grid-cols-2 gap-x-3 gap-y-3 pt-1">
          <MetaItem icon={Building2} label="Venue" value={RESEARCH.venue} />
          <MetaItem icon={MapPin} label="Location" value={RESEARCH.location} />
          <MetaItem icon={Calendar} label="Date" value={RESEARCH.date} />
          <MetaItem icon={Building2} label="Organiser" value={RESEARCH.organiser} />
        </dl>

        {/* Concept tags */}
        <div className="mt-auto pt-4 border-t border-line">
          <span className="font-mono-label text-secondary">Core concepts</span>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {RESEARCH.concepts.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: EASE.primary }}
                className="rounded-full border px-2.5 py-0.5 text-[11px]"
                style={{
                  borderColor: "color-mix(in oklab, var(--accent) 25%, var(--line))",
                  color: "var(--text-primary)",
                }}
              >
                {c}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="flex items-center gap-1 font-mono-label text-secondary !text-[9px]">
        <Icon className="h-2.5 w-2.5" aria-hidden />
        {label}
      </dt>
      <dd className="text-[12.5px] text-foreground leading-tight">{value}</dd>
    </div>
  );
}

function FrameworkDiagram() {
  return (
    <div className="relative h-full min-h-[480px] border border-line bg-grid overflow-hidden">
      {/* Header bar */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-line px-5 py-3.5 bg-elevated/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles
            className="h-3.5 w-3.5"
            style={{ color: "var(--accent)" }}
            aria-hidden
          />
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

      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="AI wellness framework: image-recognition input and conversational-AI layer feed into a wellness core, which outputs to preventive health"
      >
        <defs>
          <radialGradient id="r-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="r-flow-a" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent-2)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="r-flow-b" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="r-flow-c" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-warm)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent-warm)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent-warm)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer orbital rings — static, decorative */}
        <circle cx="400" cy="270" r="200" fill="none" stroke="var(--line)" strokeWidth="0.6" strokeDasharray="2 5" opacity="0.3" />
        <circle cx="400" cy="270" r="155" fill="none" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="1 4" opacity="0.25" />

        {/* Compass ticks around outer ring */}
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i / 48) * Math.PI * 2;
          const isMajor = i % 12 === 0;
          const inner = isMajor ? 193 : 197;
          const outer = 205;
          const x1 = 400 + Math.cos(angle) * inner;
          const y1 = 270 + Math.sin(angle) * inner;
          const x2 = 400 + Math.cos(angle) * outer;
          const y2 = 270 + Math.sin(angle) * outer;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--accent)"
              strokeWidth={isMajor ? "1.2" : "0.5"}
              opacity={isMajor ? 0.6 : 0.25}
            />
          );
        })}

        {/* ════════ WELLNESS CORE ════════ */}
        <g transform="translate(400,270)">
          {/* Glow halo */}
          <circle r="100" fill="url(#r-core-glow)" />

          {/* Outer rotating ring */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <circle r="80" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="10 6" />
            {/* Orbiting dot on outer ring */}
            <circle cx="80" cy="0" r="3" fill="var(--accent)" />
          </motion.g>

          {/* Inner counter-rotating ring */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <circle r="62" fill="none" stroke="var(--accent-2)" strokeWidth="1" strokeDasharray="4 4" />
            {/* Orbiting dot on inner ring */}
            <circle cx="0" cy="-62" r="2.5" fill="var(--accent-2)" />
          </motion.g>

          {/* Static inner circle with background fill for text legibility */}
          <circle r="46" fill="var(--canvas)" opacity="0.85" />
          <circle r="46" fill="none" stroke="var(--line)" strokeWidth="1" />

          {/* Center text */}
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

          {/* Pulsing center dot */}
          <motion.circle
            r="3"
            fill="var(--accent)"
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* ════════ PILLARS ════════ */}
        <Pillar
          x={140}
          y={120}
          label="IMAGE RECOGNITION"
          sublabel="Input layer"
          color="var(--accent-2)"
          delay={0.3}
          flowId="flow-a"
        />
        <Pillar
          x={660}
          y={120}
          label="CONVERSATIONAL AI"
          sublabel="Interaction layer"
          color="var(--accent)"
          delay={0.5}
          flowId="flow-b"
        />
        <Pillar
          x={400}
          y={440}
          label="PREVENTIVE HEALTH"
          sublabel="Output layer"
          color="var(--accent-warm)"
          delay={0.7}
          flowId="flow-c"
          isOutput
        />

        {/* ════════ STATIC CONNECTION PATHS ════════ */}
        <motion.path
          d="M 200 140 Q 280 180 340 230"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9, ease: EASE.primary }}
        />
        <motion.path
          d="M 600 140 Q 520 180 460 230"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.0, ease: EASE.primary }}
        />
        <motion.path
          d="M 400 340 L 400 400"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.1, ease: EASE.primary }}
        />

        {/* ════════ ANIMATED DATA FLOW BEAMS ════════ */}
        {/* Image Recognition → Core */}
        <motion.path
          d="M 200 140 Q 280 180 340 230"
          fill="none"
          stroke="url(#r-flow-a)"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        {/* Conversational AI → Core */}
        <motion.path
          d="M 600 140 Q 520 180 460 230"
          fill="none"
          stroke="url(#r-flow-b)"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
        />
        {/* Core → Preventive Health */}
        <motion.path
          d="M 400 340 L 400 400"
          fill="none"
          stroke="url(#r-flow-c)"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
        />

        {/* ════════ DATA PACKETS — small dots traveling along paths ════════ */}
        <motion.circle
          r="3"
          fill="var(--accent-2)"
          animate={{
            cx: [200, 280, 340],
            cy: [140, 180, 230],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        <motion.circle
          r="3"
          fill="var(--accent)"
          animate={{
            cx: [600, 520, 460],
            cy: [140, 180, 230],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
        />
        <motion.circle
          r="3"
          fill="var(--accent-warm)"
          animate={{
            cx: [400, 400],
            cy: [340, 400],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
        />

        {/* Flow direction arrows */}
        <motion.polygon
          points="338,228 346,232 340,238"
          fill="var(--accent-2)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 1.5 }}
        />
        <motion.polygon
          points="462,228 454,232 460,238"
          fill="var(--accent)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 2.1 }}
        />
        <motion.polygon
          points="396,398 400,406 404,398"
          fill="var(--accent-warm)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 2.7 }}
        />
      </svg>
    </div>
  );
}

function Pillar({
  x,
  y,
  label,
  sublabel,
  color,
  delay,
  isOutput = false,
}: {
  x: number;
  y: number;
  label: string;
  sublabel: string;
  color: string;
  delay: number;
  flowId?: string;
  isOutput?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Glow behind pillar */}
      <circle r="45" fill={color} opacity="0.1" />

      {/* Pillar box */}
      <motion.rect
        x="-85"
        y="-30"
        width="170"
        height="60"
        rx="6"
        fill="var(--elevated)"
        stroke={color}
        strokeWidth="1.5"
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: EASE.primary }}
      />

      {/* Left accent stripe */}
      <motion.rect
        x="-85"
        y="-30"
        width="5"
        height="60"
        rx="2"
        fill={color}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      />

      {/* Status dot — pulsing */}
      <motion.circle
        cx="68"
        cy="-20"
        r="3"
        fill={color}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.2, ease: EASE.primary }}
      >
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="1.8s"
          begin={`${delay + 0.5}s`}
          repeatCount="indefinite"
        />
      </motion.circle>

      {/* Output arrow indicator */}
      {isOutput && (
        <motion.path
          d="M 0 -32 L -5 -38 L 5 -38 Z"
          fill={color}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4 }}
        />
      )}

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
        {label}
      </text>
      <text
        textAnchor="middle"
        dy="14"
        fontFamily="var(--font-mono)"
        fontSize="8.5"
        letterSpacing="1.5"
        fill="var(--text-secondary)"
      >
        {sublabel}
      </text>
    </g>
  );
}

function KeyContributions() {
  const contributions = [
    {
      title: "Image Recognition",
      description:
        "Visual input layer that surfaces early wellness signals from image data.",
      icon: Sparkles,
    },
    {
      title: "Conversational AI",
      description:
        "Structured follow-up questions that guide users toward appropriate care.",
      icon: FileText,
    },
    {
      title: "Preventive Healthcare",
      description:
        "Clinician-friendly summaries that route users to timely intervention.",
      icon: Building2,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.3, duration: DURATION.reveal, ease: EASE.primary }}
      className="mt-10 grid gap-4 sm:grid-cols-3"
    >
      {contributions.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: EASE.primary }}
          className="border border-line p-5 flex flex-col gap-2"
        >
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-7 w-7 place-items-center rounded-full"
              style={{
                background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                color: "var(--accent)",
              }}
            >
              <c.icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="font-mono-label text-secondary !text-[9px]">
              0{i + 1}
            </span>
          </div>
          <h4 className="text-[15px] font-medium tracking-tight text-foreground">
            {c.title}
          </h4>
          <p className="text-[13px] text-secondary text-pretty leading-snug">
            {c.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
