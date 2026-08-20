"use client";

import * as React from "react";
import { EXPERIENCE } from "@/data/portfolio";
import { motion } from "motion/react";

export function Experience() {
  return (
    <section id="experience" className="relative bg-[#F6F3EC] border-b-2 border-[#14231C] px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-[#14231C] bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="font-mono text-[10px] font-bold text-[#2F5D46] tracking-widest uppercase block mb-1">
            04 —— EXPERIENCE
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#14231C] leading-[1.08] tracking-tight uppercase">
            One <span className="text-[#2F5D46]">focused</span> AI internship.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6B6459] mt-2 font-semibold">
            Real engineering work — prototypes that had to run, with the debugging and testing discipline that implies.
          </p>
        </motion.div>

        {/* Two Side-by-Side Spec Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Role Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4, x: -2, boxShadow: "6px 6px 0px #14231C" }}
            className="border-2 border-[#14231C] p-6 sm:p-8 bg-white shadow-[4px_4px_0px_#14231C] relative flex flex-col justify-between rounded-sm"
          >
            {/* Viewfinder corners */}
            <span className="blueprint-corner blueprint-corner-tl" />
            <span className="blueprint-corner blueprint-corner-tr" />
            <span className="blueprint-corner blueprint-corner-bl" />
            <span className="blueprint-corner blueprint-corner-br" />

            <div>
              <div className="flex items-center justify-between border-b-2 border-[#14231C] pb-4 mb-4">
                <span className="font-mono text-[10px] font-black text-[#14231C]">
                  {EXPERIENCE.period}
                </span>
                <span className="border-2 border-[#14231C] bg-[#2F5D46] text-white px-2.5 py-0.5 font-mono text-[9px] uppercase font-black tracking-wider shadow-[1px_1px_0px_#14231C]">
                  STATUS: COMPLETED
                </span>
              </div>

              <h3 className="font-heading font-black text-lg sm:text-2xl text-[#14231C] uppercase mb-1 leading-[1.08]">
                {EXPERIENCE.role}
              </h3>

              <span className="font-mono text-[11px] uppercase tracking-wider font-black text-[#2F5D46] inline-block mb-6">
                {EXPERIENCE.organisation}
              </span>

              <p className="font-sans text-xs sm:text-sm text-[#14231C]/85 leading-relaxed font-medium">
                {EXPERIENCE.reflection}
              </p>
            </div>
          </motion.div>

          {/* Right: Vertical Process Flow */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4, x: -2, boxShadow: "6px 6px 0px #2F5D46" }}
            className="border-2 border-[#14231C] p-6 sm:p-8 bg-white shadow-[4px_4px_0px_#2F5D46] relative rounded-sm"
          >
            {/* Viewfinder corners */}
            <span className="blueprint-corner blueprint-corner-tl" />
            <span className="blueprint-corner blueprint-corner-tr" />
            <span className="blueprint-corner blueprint-corner-bl" />
            <span className="blueprint-corner blueprint-corner-br" />

            <div className="flex items-center justify-between border-b-2 border-[#14231C] pb-4 mb-6">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#14231C]">
                WORKFLOW PIPELINE
              </span>
              <span className="font-mono text-[9px] text-[#B08D57] font-black uppercase bg-[#F6F3EC] px-2 py-0.5 border border-[#14231C]/30 shadow-[1px_1px_0px_#14231C]">
                8 STAGES
              </span>
            </div>

            {/* Vertical process line */}
            <div className="relative pl-6 space-y-3.5">
              {/* Vertical line connecting nodes */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#14231C]/20" />

              {/* Checklist items as pipeline nodes */}
              {EXPERIENCE.work.map((item, idx) => {
                const stageNum = String(idx + 1).padStart(2, "0");
                return (
                  <motion.div
                    key={item}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between relative group cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      {/* Node point */}
                      <div className="absolute left-[-23px] w-3 h-3 rounded-full border-2 border-[#14231C] bg-white flex items-center justify-center group-hover:bg-[#2F5D46] transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D46] group-hover:bg-white" />
                      </div>
                      <span className="font-mono text-[10px] font-black text-[#14231C] uppercase tracking-wider group-hover:text-[#2F5D46] transition-colors">
                        {item}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-[#6B6459] font-black">
                      {stageNum}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
