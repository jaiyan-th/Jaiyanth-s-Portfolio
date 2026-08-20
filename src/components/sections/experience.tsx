"use client";

import * as React from "react";
import { EXPERIENCE } from "@/data/portfolio";
import { motion } from "motion/react";

export function Experience() {
  return (
    <section id="experience" className="relative bg-[#0B0C0E] border-b border-[#232323] px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-[#F5F3EF] bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 border-b border-[#232323] pb-8"
        >
          <span className="font-mono text-xs font-bold text-[#6D2932] tracking-widest uppercase block mb-1">
            04 —— EXPERIENCE TRACK
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#F5F3EF] leading-[1.08] tracking-tight uppercase">
            One <span className="text-[#6D2932]">focused</span> AI internship.
          </h2>
          <p className="font-sans text-sm text-[#9A958D] mt-2 font-normal">
            Real engineering work — prototypes that had to run, with the debugging and testing discipline that implies.
          </p>
        </motion.div>

        {/* Numbered Process & Impact Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Role Context */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-2 border-b border-[#232323] pb-4">
              <span className="font-mono text-xs font-bold text-[#6D2932] uppercase tracking-widest block">
                {EXPERIENCE.period} // STATUS: COMPLETED
              </span>
              <h3 className="font-heading font-black text-2xl text-[#F5F3EF] uppercase">
                {EXPERIENCE.role}
              </h3>
              <span className="font-mono text-xs font-bold text-[#9A958D] block uppercase">
                {EXPERIENCE.organisation}
              </span>
            </div>

            <p className="font-sans text-sm text-[#9A958D] leading-relaxed font-normal">
              {EXPERIENCE.reflection}
            </p>
          </motion.div>

          {/* Right: Numbered Workflow Steps (01–08 Style with Hairlines) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="border-b border-[#232323] pb-3 mb-6">
              <span className="font-mono text-xs font-bold text-[#F5F3EF] uppercase tracking-widest">
                WORKFLOW PIPELINE // 8 VERIFIED STAGES
              </span>
            </div>

            <div className="divide-y divide-[#232323]">
              {EXPERIENCE.work.map((item, idx) => {
                const stageNum = String(idx + 1).padStart(2, "0");
                return (
                  <div key={item} className="py-3.5 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-[#6D2932]">
                        {stageNum}
                      </span>
                      <span className="font-mono text-xs text-[#F5F3EF] uppercase tracking-wider group-hover:text-[#6D2932] transition-colors">
                        {item}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#9A958D] uppercase">
                      VERIFIED
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
