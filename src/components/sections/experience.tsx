"use client";

import * as React from "react";
import { EXPERIENCE } from "@/data/portfolio";
import { motion } from "motion/react";

export function Experience() {
  return (
    <section id="experience" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#9E0020] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              EXPERIENCE &amp; WORKFLOW
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-[40px] text-black leading-[1.08] tracking-tight uppercase">
            <span className="bg-[#9E0020] text-white px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000]">
              WHERE I&apos;VE WORKED.
            </span>
          </h2>
        </motion.div>

        {/* Two Columns: Context on Left, Numbered Pipeline on Right */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border-2 border-black p-6 shadow-[5px_5px_0px_#000000] space-y-3">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <span className="font-mono text-xs font-black text-black">
                  {EXPERIENCE.period}
                </span>
                <span className="bg-[#9E0020] text-white px-2.5 py-0.5 font-mono text-[9.5px] uppercase font-black border border-black shadow-[1.5px_1.5px_0px_#000000]">
                  COMPLETED
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl text-black uppercase">
                {EXPERIENCE.role}
              </h3>

              <span className="font-mono text-xs font-black text-black/70 block uppercase">
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
              <div className="bg-[#9E0020] text-white border-b-2 border-black -m-6 mb-2 p-3.5 flex items-center justify-between">
                <span className="font-mono text-xs font-black uppercase text-white tracking-widest">
                  WORKFLOW PIPELINE
                </span>
                <span className="font-mono text-xs font-black uppercase text-black bg-white px-2 py-0.5 border border-black">
                  8 STAGES
                </span>
              </div>

              <div className="divide-y-2 divide-black font-mono text-xs pt-2">
                {EXPERIENCE.work.map((item, idx) => {
                  const stageNum = String(idx + 1).padStart(2, "0");
                  return (
                    <div key={item} className="py-3 flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#9E0020] border border-black inline-block group-hover:bg-black transition-colors" />
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
