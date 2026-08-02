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

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: role + reflection */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DURATION.reveal, ease: EASE.primary }}
              className="flex flex-col gap-6"
            >
              <span className="font-mono-label text-secondary">
                {EXPERIENCE.period}
              </span>
              <h3 className="font-display text-[clamp(28px,3.6vw,46px)] leading-tight tracking-tight text-balance">
                {EXPERIENCE.role}
              </h3>
              <p className="text-body text-secondary">
                <span className="text-foreground">{EXPERIENCE.organisation}</span>
              </p>
              <p className="text-body text-secondary text-pretty">
                {EXPERIENCE.reflection}
              </p>
            </motion.div>
          </div>

          {/* Right: workflow pipeline */}
          <div className="md:col-span-7">
            <PipelineStages work={EXPERIENCE.work} />
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
        className="absolute left-[7px] top-2 bottom-2 w-px"
        style={{ background: "var(--line)" }}
      />
      {work.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            delay: i * 0.06,
            duration: DURATION.reveal,
            ease: EASE.primary,
          }}
          className="relative flex items-start gap-6 py-4 pl-8"
        >
          <span
            aria-hidden
            className="absolute left-0 top-5 grid h-3.5 w-3.5 place-items-center rounded-full"
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
          <div className="flex w-full items-center justify-between gap-4">
            <span className="text-body text-foreground">{item}</span>
            <span className="font-mono-label text-secondary">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
