"use client";

import * as React from "react";
import { motion } from "motion/react";
import { FileText, MapPin, Calendar, Building2, Quote } from "lucide-react";
import { RESEARCH } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/masked-heading";

export function Research() {
  return (
    <section
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
            "radial-gradient(60% 50% at 30% 50%, var(--node-glow) 0%, transparent 70%)",
        }}
      />

      <div className="container-editorial relative">
        <SectionHeader
          index="05"
          label="IEEE Research"
          title="A preventive-healthcare AI framework."
          supporting="Co-authored research integrating image recognition and conversational AI — accepted at ICETSIS 2026."
        />

        {/* Layout: paper card (left, 5 col) + framework diagram (right, 7 col) */}
        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-12">
          {/* Left: paper card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.reveal, ease: EASE.primary }}
            className="md:col-span-5"
          >
            <PaperCard />
          </motion.div>

          {/* Right: interactive framework diagram */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.12, duration: DURATION.reveal, ease: EASE.primary }}
            className="md:col-span-7"
          >
            <FrameworkDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PaperCard() {
  return (
    <div className="relative flex h-full flex-col border border-line overflow-hidden">
      {/* Top accent bar */}
      <div
        aria-hidden
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-warm))",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <div className="flex items-center gap-2.5">
          <FileText className="h-4 w-4" style={{ color: "var(--accent)" }} aria-hidden />
          <span className="font-mono-label text-secondary">Paper</span>
        </div>
        <span
          className="rounded-full px-3 py-1 font-mono-label !text-[9.5px]"
          style={{
            background: "color-mix(in oklab, var(--accent) 16%, transparent)",
            color: "var(--accent)",
            border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
          }}
        >
          {RESEARCH.status}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-6 p-6 flex-1">
        {/* Title */}
        <h3 className="font-display text-[clamp(20px,2.4vw,28px)] leading-snug tracking-tight text-balance">
          {RESEARCH.title}
        </h3>

        {/* Quote */}
        <blockquote
          className="relative pl-5 py-1 text-[13.5px] text-secondary text-pretty italic"
          style={{ borderLeft: "2px solid var(--accent)" }}
        >
          <Quote
            className="absolute -left-0.5 -top-1 h-3 w-3 opacity-40"
            style={{ color: "var(--accent)" }}
            aria-hidden
          />
          An AI Intelligence Wellness Framework integrating image recognition and
          conversational AI for preventive healthcare.
        </blockquote>

        {/* Metadata grid */}
        <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
          <MetaItem icon={Building2} label="Venue" value={RESEARCH.venue} />
          <MetaItem icon={MapPin} label="Location" value={RESEARCH.location} />
          <MetaItem icon={Calendar} label="Date" value={RESEARCH.date} />
          <MetaItem icon={Building2} label="Organiser" value={RESEARCH.organiser} />
        </dl>

        {/* Abstract */}
        <div>
          <span className="font-mono-label text-secondary">Abstract</span>
          <p className="mt-2 text-[13.5px] text-secondary text-pretty leading-relaxed">
            {RESEARCH.abstract}
          </p>
        </div>

        {/* Concept tags */}
        <div className="mt-auto pt-4 border-t border-line">
          <span className="font-mono-label text-secondary">Core concepts</span>
          <ul className="mt-3 flex flex-wrap gap-2">
            {RESEARCH.concepts.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: EASE.primary }}
                className="rounded-full border border-line px-3 py-1 text-[12px]"
                style={{
                  borderColor: "color-mix(in oklab, var(--accent) 30%, var(--line))",
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
    <div className="flex flex-col gap-1.5">
      <dt className="flex items-center gap-1.5 font-mono-label text-secondary">
        <Icon className="h-3 w-3" aria-hidden />
        {label}
      </dt>
      <dd className="text-[13.5px] text-foreground">{value}</dd>
    </div>
  );
}

function FrameworkDiagram() {
  return (
    <div className="relative h-full min-h-[460px] border border-line bg-grid overflow-hidden">
      {/* Coordinate labels — static */}
      <span
        aria-hidden
        className="absolute left-4 top-4 font-mono-label !text-[8px] text-secondary opacity-60"
      >
        FRAMEWORK.MAP / 03
      </span>
      <span
        aria-hidden
        className="absolute bottom-4 right-4 font-mono-label !text-[8px] text-secondary opacity-60"
      >
        PREVENTIVE.HEALTH / IEEE
      </span>

      <svg
        viewBox="0 0 600 480"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="AI wellness framework: image-recognition input → conversational-AI layer → preventive-health output, connected through a wellness core with animated data flow"
      >
        <defs>
          <radialGradient id="r-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="r-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="r-flow-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent-2)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer orbital rings — static */}
        <circle cx="300" cy="240" r="180" fill="none" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.3" />
        <circle cx="300" cy="240" r="140" fill="none" stroke="var(--line)" strokeWidth="0.6" strokeDasharray="1 3" opacity="0.25" />

        {/* Compass ticks around outer ring */}
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i / 36) * Math.PI * 2;
          const isMajor = i % 9 === 0;
          const inner = isMajor ? 174 : 177;
          const outer = 182;
          const x1 = 300 + Math.cos(angle) * inner;
          const y1 = 240 + Math.sin(angle) * inner;
          const x2 = 300 + Math.cos(angle) * outer;
          const y2 = 240 + Math.sin(angle) * outer;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--accent)"
              strokeWidth={isMajor ? "1" : "0.5"}
              opacity={isMajor ? 0.5 : 0.25}
            />
          );
        })}

        {/* Wellness core */}
        <g transform="translate(300,240)">
          <circle r="90" fill="url(#r-core)" />
          {/* Outer rotating ring */}
          <motion.circle
            r="72"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="8 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0px 0px" }}
          />
          {/* Inner counter-rotating ring */}
          <motion.circle
            r="56"
            fill="none"
            stroke="var(--accent-2)"
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0px 0px" }}
          />
          {/* Static inner circle */}
          <circle r="40" fill="none" stroke="var(--line)" strokeWidth="1" />
          <circle r="40" fill="var(--canvas)" opacity="0.4" />
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
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* Three pillars */}
        <FrameworkPillar
          x={100}
          y={110}
          label="IMAGE RECOGNITION"
          sublabel="Input layer"
          color="var(--accent-2)"
          delay={0.3}
        />
        <FrameworkPillar
          x={500}
          y={110}
          label="CONVERSATIONAL AI"
          sublabel="Interaction layer"
          color="var(--accent)"
          delay={0.5}
        />
        <FrameworkPillar
          x={300}
          y={410}
          label="PREVENTIVE HEALTH"
          sublabel="Output layer"
          color="var(--accent-warm)"
          delay={0.7}
        />

        {/* Data flow paths — animated beams */}
        {/* Image Recognition → Wellness Core */}
        <motion.path
          d="M 140 130 Q 200 170 240 210"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9, ease: EASE.primary }}
        />
        <motion.path
          d="M 140 130 Q 200 170 240 210"
          fill="none"
          stroke="url(#r-flow-2)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />

        {/* Conversational AI → Wellness Core */}
        <motion.path
          d="M 460 130 Q 400 170 360 210"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.0, ease: EASE.primary }}
        />
        <motion.path
          d="M 460 130 Q 400 170 360 210"
          fill="none"
          stroke="url(#r-flow)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        />

        {/* Wellness Core → Preventive Health */}
        <motion.path
          d="M 300 310 L 300 370"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.1, ease: EASE.primary }}
        />
        <motion.path
          d="M 300 310 L 300 370"
          fill="none"
          stroke="url(#r-flow)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.0 }}
        />

        {/* Flow direction arrows */}
        <motion.polygon
          points="238,208 244,212 240,216"
          fill="var(--accent-2)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.4 }}
        />
        <motion.polygon
          points="362,208 356,212 360,216"
          fill="var(--accent)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.8 }}
        />
        <motion.polygon
          points="296,368 300,376 304,368"
          fill="var(--accent)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2.2 }}
        />
      </svg>
    </div>
  );
}

function FrameworkPillar({
  x,
  y,
  label,
  sublabel,
  color,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  sublabel: string;
  color: string;
  delay: number;
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Glow behind pillar */}
      <circle r="40" fill={color} opacity="0.08" />
      {/* Pillar box */}
      <motion.rect
        x="-75"
        y="-28"
        width="150"
        height="56"
        rx="4"
        fill="var(--elevated)"
        stroke={color}
        strokeWidth="1.2"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: EASE.primary }}
      />
      {/* Corner accent */}
      <motion.rect
        x="-75"
        y="-28"
        width="6"
        height="56"
        fill={color}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      />
      {/* Status dot */}
      <motion.circle
        cx="60"
        cy="-18"
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
      <text
        textAnchor="middle"
        dy="-2"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="1.5"
        fill="var(--text-primary)"
      >
        {label}
      </text>
      <text
        textAnchor="middle"
        dy="14"
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="1.5"
        fill="var(--text-secondary)"
      >
        {sublabel}
      </text>
    </g>
  );
}
