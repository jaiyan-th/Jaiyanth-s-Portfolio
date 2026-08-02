"use client";

import * as React from "react";
import { motion } from "motion/react";
import { EXPERIENCE } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/masked-heading";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative section-spacing border-t border-line"
    >
      <div className="container-editorial">
        <SectionHeader
          index="04"
          label="Experience"
          title="One focused AI internship."
          supporting="Real engineering work — prototypes that had to run, with the debugging and testing discipline that implies."
        />

        {/* Two-column: role (left, 5 col) + workflow pipeline (right, 7 col) */}
        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: role + reflection card */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DURATION.reveal, ease: EASE.primary }}
              className="flex h-full flex-col gap-5 border border-line p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-label text-secondary">
                  {EXPERIENCE.period}
                </span>
                <span
                  className="rounded-full px-3 py-1 font-mono-label !text-[9.5px]"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 16%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  Completed
                </span>
              </div>
              <h3 className="font-display text-[clamp(26px,3.2vw,40px)] leading-tight tracking-tight text-balance">
                {EXPERIENCE.role}
              </h3>
              <p className="text-[15px] text-foreground">
                {EXPERIENCE.organisation}
              </p>
              <p className="text-body text-secondary text-pretty">
                {EXPERIENCE.reflection}
              </p>
            </motion.div>
          </div>

          {/* Right: workflow pipeline inside a bordered card */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1, duration: DURATION.reveal, ease: EASE.primary }}
              className="border border-line p-7 h-full"
            >
              <div className="flex items-center justify-between pb-5 mb-2 border-b border-line">
                <span className="font-mono-label text-secondary">Workflow pipeline</span>
                <span className="font-mono-label text-secondary">
                  {String(EXPERIENCE.work.length).padStart(2, "0")} stages
                </span>
              </div>
              <PipelineStages work={EXPERIENCE.work} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PipelineStages({ work }: { work: string[] }) {
  return (
    <ol className="relative flex flex-col">
      {/* Vertical line */}
      <span
        aria-hidden
        className="absolute left-[7px] top-3 bottom-3 w-px"
        style={{ background: "var(--line)" }}
      />
      {work.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            delay: i * 0.05,
            duration: DURATION.reveal,
            ease: EASE.primary,
          }}
          className="relative flex items-center gap-5 py-2.5 pl-8"
        >
          <span
            aria-hidden
            className="absolute left-0 top-1/2 -translate-y-1/2 grid h-3.5 w-3.5 place-items-center rounded-full"
            style={{
              background: "var(--elevated)",
              border: "2px solid var(--accent)",
            }}
          >
            <motion.span
              className="h-1 w-1 rounded-full"
              style={{ background: "var(--accent)" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: EASE.secondary,
              }}
            />
          </span>
          <span className="flex-1 text-[15px] text-foreground">{item}</span>
          <span className="font-mono-label text-secondary">
            {String(i + 1).padStart(2, "0")}
          </span>
        </motion.li>
      ))}
    </ol>
  );
}
