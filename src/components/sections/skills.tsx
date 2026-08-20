"use client";

import * as React from "react";
import { SKILL_GROUPS } from "@/data/portfolio";
import { motion } from "motion/react";

export function Skills() {
  return (
    <section id="skills" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-16 md:py-24">
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
            <span className="w-2.5 h-2.5 bg-[#00A8C6] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              SKILLS &amp; STACK MATRIX
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.04] tracking-tight uppercase">
            SIX EVIDENCE-BASED <br />
            <span className="bg-[#00B2D6] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000]">
              COMPETENCY DOMAINS.
            </span>
          </h2>
        </motion.div>

        {/* 2x3 Grid of Brutalist Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="bg-white border-2 border-black p-6 shadow-[5px_5px_0px_#000000] flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                  <span className="font-mono text-xs font-black text-[#00A8C6]">
                    {group.index} // {group.label}
                  </span>
                  <span className="font-mono text-[9px] font-black uppercase text-black bg-[#EFEFEA] px-2 py-0.5 border border-black">
                    {group.skills.length} UNITS
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl text-black uppercase mb-2">
                  {group.title}
                </h3>

                <p className="font-sans text-xs text-black/80 font-semibold leading-relaxed mb-4">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs font-bold text-black bg-[#EFEFEA] px-2.5 py-1 border border-black shadow-[1.5px_1.5px_0px_#000000]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {group.evidence && (
                <div className="border-t-2 border-black pt-3 font-mono text-[10.5px]">
                  <span className="font-black text-[#00A8C6] block mb-0.5 uppercase">EVIDENCE:</span>
                  <span className="font-bold text-black block">{group.evidence}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
