"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Briefcase } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import { SectionContainer } from "@/components/layout/section-container";

const PIPELINE_STAGES = [
  { num: "01", text: "Python AI workflows" },
  { num: "02", text: "Prompt engineering" },
  { num: "03", text: "Debugging" },
  { num: "04", text: "Testing" },
  { num: "05", text: "REST API integration" },
  { num: "06", text: "RAG and LLM prototypes" },
  { num: "07", text: "Git collaboration" },
  { num: "08", text: "Team feedback" },
];

export function Experience() {
  return (
    <section id="experience" className="relative bg-[#FAF3EE] text-[#111111] border-b-[3px] border-[#111111] py-16 md:py-24 scroll-mt-20">
      <SectionContainer className="space-y-12">
        {/* Section Header: Plain bold black headline, no italic, no color */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpVariants}
          className="space-y-4"
        >
          {/* Sticker Badge + Beside Subtitle */}
          <div className="flex items-center gap-2.5">
            <span className="sticker-badge bg-[#111111] text-white -rotate-1">
              <Briefcase className="w-3.5 h-3.5 text-[#FFFFFF]" />
              EXPERIENCE
            </span>
            <span className="font-body italic text-[#D9622B] text-sm font-semibold">
              / on the job
            </span>
          </div>

          {/* Section Headline with ONE italic accent word (worked) */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-extrabold text-[#111111] leading-[1.08] tracking-tight">
            Where I&apos;ve{" "}
            <span className="italic text-[#D9622B]">worked.</span>
          </h2>
        </motion.div>

        {/* One Thick-Bordered Block */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
          className="neo-card p-6 sm:p-10 lg:p-12 bg-white space-y-8"
        >
          {/* Header Line */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#111111] pb-4">
            <div className="flex items-center gap-3">
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111]">
                AI Intern — Brainery Spot Technology
              </h3>
            </div>
            <span className="sticker-badge bg-[#FAF3EE] text-[#111111] border-[1.5px] text-xs sm:text-[13px] py-1 px-3.5">
              Jun–Jul 2025 · Completed
            </span>
          </div>

          {/* Role Copy */}
          <p className="font-body text-base sm:text-lg lg:text-[1.15rem] text-[#333333] leading-relaxed max-w-4xl">
            Built applied-AI prototypes that needed to work, not just demo. Shipped RAG and LLM workflows, integrated third-party REST APIs cleanly, and practiced the unglamorous engineering habits — debugging, testing, prompt iteration, team feedback — that make AI systems dependable in production.
          </p>

          {/* 8-Stage Pipeline with Numerals in Black */}
          <div className="border-t-2 border-[#111111] pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-xs sm:text-[13px] text-[#111111] font-bold">
                ENGINEERING PIPELINE
              </span>
              <span className="font-mono-code text-xs sm:text-[13px] font-bold text-[#6B6B6B]">
                8 STAGES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              {PIPELINE_STAGES.map((stage) => (
                <div
                  key={stage.num}
                  className="border-[1.5px] border-[#111111] p-4 bg-[#FAF3EE] flex items-center gap-4"
                >
                  {/* Numeral in Black (#111111), not red */}
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111111]">
                    {stage.num}
                  </span>
                  <span className="font-body text-xs sm:text-sm font-semibold text-[#111111] leading-snug">
                    {stage.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
