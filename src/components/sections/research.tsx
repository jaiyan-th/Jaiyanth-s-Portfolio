"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { FileText, MapPin, Calendar, Building2, Sparkles, GitBranch, Target } from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/masked-heading";
import { WellnessVisual } from "@/components/projects/wellness-visual";

export function Research() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
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

        {/* Top row: paper card (4 col) + wellness particle visual (8 col) */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: paper card — content unchanged */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.reveal, ease: EASE.primary }}
            className="lg:col-span-4"
          >
            <PaperCard />
          </motion.div>

          {/* Right: wellness particle visual (replaces architecture diagram) */}
          <motion.div
            style={{ y: diagramY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.12, duration: DURATION.reveal, ease: EASE.primary }}
            className="lg:col-span-8"
          >
            <WellnessVisual />
          </motion.div>
        </div>

        {/* Expanded content row: highlights + methodology + outcomes */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Highlights — 3 cards */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: DURATION.reveal, ease: EASE.primary }}
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

          {/* Methodology + outcomes */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.15, duration: DURATION.reveal, ease: EASE.primary }}
              className="flex flex-col gap-8"
            >
              {/* Methodology */}
              <div>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} aria-hidden />
                  <span className="font-mono-label text-secondary">Methodology</span>
                </div>
                <ol className="mt-4 relative">
                  <span
                    aria-hidden
                    className="absolute left-[7px] top-2 bottom-2 w-px"
                    style={{ background: "var(--line)" }}
                  />
                  {RESEARCH_CONTEXT.methodology.map((step, i) => (
                    <motion.li
                      key={step}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.4, ease: EASE.primary }}
                      className="relative flex items-center gap-4 py-1.5 pl-8"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 -translate-y-1/2 grid h-3.5 w-3.5 place-items-center rounded-full"
                        style={{
                          background: "var(--elevated)",
                          border: "1.5px solid var(--accent)",
                        }}
                      />
                      <span className="text-[13.5px] text-foreground">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {/* Outcomes */}
              <div>
                <div className="flex items-center gap-2">
                  <Target className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} aria-hidden />
                  <span className="font-mono-label text-secondary">Outcomes</span>
                </div>
                <ul className="mt-4 flex flex-col gap-2">
                  {RESEARCH_CONTEXT.outcomes.map((o, i) => (
                    <motion.li
                      key={o}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: EASE.primary }}
                      className="flex items-start gap-2.5 text-[13.5px] text-secondary"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                      {o}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Paper card — content unchanged (only the layout wrapper) ────────────────
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
          <FileText className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} aria-hidden />
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
        <h3 className="font-display text-[clamp(17px,1.8vw,21px)] leading-snug tracking-tight text-balance">
          {RESEARCH.title}
        </h3>

        <blockquote
          className="relative pl-4 text-[12.5px] text-secondary text-pretty italic leading-relaxed"
          style={{ borderLeft: "2px solid var(--accent)" }}
        >
          {RESEARCH.abstract}
        </blockquote>

        <dl className="grid grid-cols-2 gap-x-3 gap-y-3 pt-1">
          <MetaItem icon={Building2} label="Venue" value={RESEARCH.venue} />
          <MetaItem icon={MapPin} label="Location" value={RESEARCH.location} />
          <MetaItem icon={Calendar} label="Date" value={RESEARCH.date} />
          <MetaItem icon={Building2} label="Organiser" value={RESEARCH.organiser} />
        </dl>

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
