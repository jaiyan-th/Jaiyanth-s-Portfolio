"use client";

import * as React from "react";
import { motion } from "motion/react";
import { RESEARCH } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/masked-heading";

export function Research() {
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="relative section-spacing border-t border-line"
    >
      <div className="container-editorial">
        <SectionHeader
          index="05"
          label="IEEE Research"
          title="A preventive-healthcare AI framework."
          supporting="Co-authored research integrating image recognition and conversational AI."
        />

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: paper details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.reveal, ease: EASE.primary }}
            className="md:col-span-6 lg:col-span-5"
          >
            <div className="border border-line">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-mono-label text-secondary">Paper</span>
                <span
                  className="rounded-full px-3 py-1 font-mono-label !text-[9.5px]"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 16%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  {RESEARCH.status}
                </span>
              </div>
              <div className="flex flex-col gap-6 p-6">
                <h3 className="font-display text-[clamp(22px,2.6vw,30px)] leading-snug tracking-tight text-balance">
                  {RESEARCH.title}
                </h3>
                <dl className="grid grid-cols-2 gap-4">
                  <Meta label="Venue" value={RESEARCH.venue} />
                  <Meta label="Location" value={RESEARCH.location} />
                  <Meta label="Date" value={RESEARCH.date} />
                  <Meta label="Organiser" value={RESEARCH.organiser} />
                </dl>
                <p className="text-body text-secondary text-pretty">{RESEARCH.abstract}</p>
                <ul className="flex flex-wrap gap-2 pt-2">
                  {RESEARCH.concepts.map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-line px-3 py-1 text-[12px]"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 font-mono-label text-secondary">
              Note · Status is co-authored. Confirm acceptance, presentation, and publication
              before promoting to those states.
            </p>
          </motion.div>

          {/* Right: animated framework diagram */}
          <div className="md:col-span-6 lg:col-span-7">
            <FrameworkDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono-label text-secondary">{label}</dt>
      <dd className="mt-1 text-[14px] text-foreground">{value}</dd>
    </div>
  );
}

function FrameworkDiagram() {
  return (
    <svg
      viewBox="0 0 600 460"
      className="h-full w-full"
      role="img"
      aria-label="AI wellness framework: image-recognition input → conversational-AI layer → preventive-health output, connected through a wellness core"
    >
      <defs>
        <radialGradient id="r-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Wellness core */}
      <g transform="translate(300,230)">
        <circle r="80" fill="url(#r-core)" />
        <motion.circle
          r="60"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "0px 0px" }}
        />
        <circle r="46" fill="none" stroke="var(--line)" strokeWidth="1" />
        <text
          textAnchor="middle"
          dy="-4"
          fontFamily="var(--font-sans)"
          fontWeight="600"
          fontSize="14"
          fill="var(--text-primary)"
        >
          WELLNESS
        </text>
        <text
          textAnchor="middle"
          dy="14"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="2"
          fill="var(--text-secondary)"
        >
          CORE
        </text>
      </g>

      {/* Three pillars */}
      <FrameworkPillar
        x={90}
        y={110}
        label="IMAGE RECOGNITION"
        sublabel="Input layer"
        color="var(--accent-2)"
        delay={0.3}
      />
      <FrameworkPillar
        x={510}
        y={110}
        label="CONVERSATIONAL AI"
        sublabel="Interaction layer"
        color="var(--accent)"
        delay={0.5}
      />
      <FrameworkPillar
        x={300}
        y={420}
        label="PREVENTIVE HEALTH"
        sublabel="Output layer"
        color="var(--accent-warm)"
        delay={0.7}
      />

      {/* Connecting paths */}
      <motion.path
        d="M 130 130 Q 220 180 240 200"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.9, ease: EASE.primary }}
      />
      <motion.path
        d="M 470 130 Q 380 180 360 200"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.0, ease: EASE.primary }}
      />
      <motion.path
        d="M 300 380 L 300 290"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1"
        strokeDasharray="3 3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.1, ease: EASE.primary }}
      />
    </svg>
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
      <motion.rect
        x="-70"
        y="-26"
        width="140"
        height="52"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: EASE.primary }}
      />
      <motion.circle
        r="4"
        fill={color}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.2, ease: EASE.primary }}
      />
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
