"use client";

import * as React from "react";
import { EXPERIENCE } from "@/data/portfolio";
import { motion } from "motion/react";

export function Experience() {
  return (
    <section id="experience" className="relative bg-[#FCFBF9] text-[#1A1A1A] border-b border-[#E5E2DC] py-20 md:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-16"
        >
          <span className="font-label text-[11px] tracking-[0.14em] uppercase text-[#6B6B6B] block">
            04 / Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal leading-[1.15] tracking-tight">
            Work history and engineering <span className="italic text-[#2D5F4E]">practice</span>.
          </h2>
        </motion.div>

        {/* Two Columns: Context on Left, Numbered Pipeline on Right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-[#E5E2DC] p-6 sm:p-8 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-4 text-xs font-label uppercase tracking-wider text-[#6B6B6B]">
                <span>{EXPERIENCE.period}</span>
                <span className="text-[#2D5F4E] font-medium">Internship Completed</span>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal">
                  {EXPERIENCE.role}
                </h3>
                <span className="font-label text-xs uppercase tracking-wider text-[#6B6B6B] block mt-1">
                  {EXPERIENCE.organisation}
                </span>
              </div>

              <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed pt-2">
                {EXPERIENCE.reflection}
              </p>
            </motion.div>
          </div>

          {/* Right Column: 8-Stage Numbered Workflow Grid */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-[#E5E2DC] p-6 sm:p-8"
            >
              <div className="border-b border-[#E5E2DC] pb-4 mb-2 flex items-center justify-between">
                <span className="font-label text-xs uppercase tracking-[0.14em] text-[#1A1A1A] font-semibold">
                  Engineering Workflow &amp; Deliverables
                </span>
                <span className="font-mono text-xs text-[#6B6B6B]">
                  8 stages
                </span>
              </div>

              <div className="divide-y divide-[#E5E2DC]">
                {EXPERIENCE.work.map((item, idx) => {
                  const stageNum = String(idx + 1).padStart(2, "0");
                  return (
                    <div key={item} className="py-3.5 flex items-center justify-between group">
                      <div className="flex items-baseline gap-4">
                        <span className="font-serif italic text-sm text-[#2D5F4E] font-normal w-5">
                          {stageNum}
                        </span>
                        <span className="font-sans text-sm text-[#1A1A1A] font-normal">
                          {item}
                        </span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5E2DC] group-hover:bg-[#2D5F4E] transition-colors" />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
