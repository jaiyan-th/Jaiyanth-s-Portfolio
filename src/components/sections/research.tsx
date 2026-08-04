"use client";

import * as React from "react";
import { motion } from "motion/react";
import { FileText, MapPin, Calendar, Building2 } from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/masked-heading";

export function Research() {
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="relative section-spacing border-t border-line overflow-hidden"
    >
      <div className="container-editorial relative">
        <SectionHeader
          index="05"
          label="IEEE Research"
          title="A preventive-healthcare AI framework."
          accentWords={["preventive"]}
          supporting="Co-authored research integrating image recognition and conversational AI, accepted at ICETSIS 2026."
        />

        {/* Paper card — full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DURATION.reveal, ease: EASE.primary }}
          className="mt-16"
        >
          <PaperCard />
        </motion.div>

        {/* Research highlights — 3 cards full width below */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: DURATION.reveal, ease: EASE.primary }}
          className="mt-16"
        >
          <span className="font-mono-label text-secondary">Research highlights</span>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {RESEARCH_CONTEXT.highlights.map((h, i) => (
              <motion.div
                key={h.index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: EASE.primary }}
                className="border border-line p-5 flex flex-col gap-2.5"
              >
                <span
                  className="font-display text-[28px] leading-none"
                  style={{ color: "var(--accent)" }}
                >
                  {h.index}
                </span>
                <h4 className="text-[14.5px] font-medium tracking-tight text-foreground">
                  {h.title}
                </h4>
                <p className="text-[12.5px] text-secondary text-pretty leading-snug">
                  {h.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Paper card — content unchanged, larger 5-column layout ────────────────
function PaperCard() {
  return (
    <div className="relative flex h-full flex-col border border-line overflow-hidden glass">
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
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" style={{ color: "var(--accent)" }} aria-hidden />
          <span className="font-mono-label text-secondary">Paper</span>
        </div>
        <span
          className="rounded-full px-3 py-1 font-mono-label !text-[9.5px]"
          style={{
            background: "color-mix(in oklab, var(--accent) 14%, transparent)",
            color: "var(--accent)",
            border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
          }}
        >
          {RESEARCH.status}
        </span>
      </div>

      {/* Body — larger padding to fill the 7-column slot */}
      <div className="flex flex-1 flex-col gap-6 p-7">
        <h3 className="font-display text-[clamp(20px,2.2vw,26px)] leading-snug tracking-tight text-balance">
          {RESEARCH.title}
        </h3>

        <blockquote
          className="relative pl-4 text-[14px] text-secondary text-pretty italic leading-relaxed"
          style={{ borderLeft: "2px solid var(--accent)" }}
        >
          {RESEARCH.abstract}
        </blockquote>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 pt-1">
          <MetaItem icon={Building2} label="Venue" value={RESEARCH.venue} />
          <MetaItem icon={MapPin} label="Location" value={RESEARCH.location} />
          <MetaItem icon={Calendar} label="Date" value={RESEARCH.date} />
          <MetaItem icon={Building2} label="Organiser" value={RESEARCH.organiser} />
        </dl>

        <div className="mt-auto pt-5 border-t border-line">
          <span className="font-mono-label text-secondary">Core concepts</span>
          <ul className="mt-3 flex flex-wrap gap-2">
            {RESEARCH.concepts.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: EASE.primary }}
                className="rounded-full border px-3 py-1 text-[12px]"
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
    <div className="flex flex-col gap-1.5">
      <dt className="flex items-center gap-1.5 font-mono-label text-secondary !text-[9.5px]">
        <Icon className="h-3 w-3" aria-hidden />
        {label}
      </dt>
      <dd className="text-[13.5px] text-foreground leading-tight">{value}</dd>
    </div>
  );
}
