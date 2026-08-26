"use client";

import * as React from "react";
import { SKILL_GROUPS } from "@/data/portfolio";
import { motion } from "motion/react";

export function Skills() {
  return (
    <section id="skills" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-20 md:py-28 scroll-mt-[57px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="flex items-center gap-2.5 mb-3 flex-wrap">
            <span className="w-2.5 h-2.5 bg-[#8E0000] border border-black inline-block" />
            <span className="font-mono text-xs font-bold tracking-widest text-black uppercase">
              STACK
            </span>
            <span className="font-editorial-italic text-sm sm:text-base text-[#8E0000] font-semibold tracking-tight select-none">
              / tools of the trade
            </span>
          </div>
          <h2 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-black leading-[0.96] tracking-tight uppercase">
            TOOLS I <span className="font-editorial-italic normal-case text-[#8E0000] font-semibold tracking-tight">build</span> WITH.
          </h2>
        </motion.div>

        {/* Skill Categories Grid — karolbinkow.ski layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10"
        >
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="space-y-3">
              {/* Category Label */}
              <h3 className="font-display text-xl tracking-wider text-black uppercase">
                {group.title}
              </h3>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs font-semibold text-black px-3 py-1.5 border border-black bg-transparent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Footer credential line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-black/20"
        >
          <p className="font-mono text-xs font-semibold text-black/70 tracking-wide">
            IEEE Published · 3+ Production-Ready Projects Shipped
          </p>
        </motion.div>
      </div>
    </section>
  );
}
