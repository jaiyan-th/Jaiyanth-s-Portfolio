"use client";

import * as React from "react";
import { EXPERIENCE } from "@/data/portfolio";
import { motion } from "motion/react";

export function Experience() {
  return (
    <section id="experience" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-20 md:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center gap-2.5 mb-3 flex-wrap">
            <span className="w-2.5 h-2.5 bg-[#8E0000] border border-black inline-block" />
            <span className="font-mono text-xs font-bold tracking-widest text-black uppercase">
              EXPERIENCE &amp; WORKFLOW
            </span>
            <span className="font-editorial-italic text-sm sm:text-base text-[#8E0000] font-semibold tracking-tight select-none">
              / the journey
            </span>
          </div>
          <h2 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-black leading-[0.96] tracking-tight uppercase">
            WHERE I&apos;VE <span className="font-editorial-italic normal-case text-[#8E0000] font-semibold tracking-tight">worked.</span>
          </h2>
        </motion.div>

        {/* Two Columns: Context on Left, Numbered Pipeline on Right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_#000000] space-y-3">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <span className="font-mono text-xs font-bold text-black">
                  {EXPERIENCE.period}
                </span>
                <span className="bg-[#8E0000] text-white px-2.5 py-0.5 font-mono text-[9.5px] uppercase font-bold border border-black shadow-[1.5px_1.5px_0px_#000000]">
                  COMPLETED
                </span>
              </div>

              <h3 className="font-display text-3xl text-black uppercase">
                {EXPERIENCE.role}
              </h3>

              <span className="font-mono text-xs font-bold text-black/70 block uppercase">
                {EXPERIENCE.organisation}
              </span>

              <p className="font-sans text-sm text-black/90 font-semibold leading-relaxed pt-2">
                {EXPERIENCE.reflection}
              </p>
            </div>
          </div>

          {/* Right Column: 8-Stage Numbered Workflow Grid */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_#000000] space-y-4">
              <div className="bg-[#8E0000] text-white border-b-2 border-black -m-6 mb-2 p-3.5 flex items-center justify-between">
                <span className="font-display text-xl uppercase text-white tracking-wider">
                  WORKFLOW PIPELINE
                </span>
                <span className="font-mono text-xs font-bold uppercase text-black bg-white px-2 py-0.5 border border-black">
                  8 STAGES
                </span>
              </div>

              <div className="divide-y-2 divide-black font-mono text-xs pt-2">
                {EXPERIENCE.work.map((item, idx) => {
                  const stageNum = String(idx + 1).padStart(2, "0");
                  return (
                    <div key={item} className="py-3 flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#8E0000] border border-black inline-block group-hover:bg-black transition-colors" />
                        <span className="font-black text-black uppercase tracking-wider">
                          {item}
                        </span>
                      </div>
                      <span className="font-black text-black/50">
                        {stageNum}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
