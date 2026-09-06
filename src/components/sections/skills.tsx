"use client";

import * as React from "react";
import { SKILL_GROUPS } from "@/data/portfolio";
import { motion } from "motion/react";

export function Skills() {
  return (
    <section id="skills" className="relative bg-[#FCFBF9] text-[#1A1A1A] border-b border-[#E5E2DC] py-20 md:py-28 scroll-mt-20">
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
            02 / Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal leading-[1.15] tracking-tight">
            Technical foundation and <span className="italic text-[#2D5F4E]">stack</span>.
          </h2>
        </motion.div>

        {/* Plain Two-Column List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 border-t border-[#E5E2DC] pt-10">
          {SKILL_GROUPS.map((group, idx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 pb-6 border-b border-[#E5E2DC]"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-label text-xs tracking-[0.14em] uppercase text-[#1A1A1A] font-semibold">
                  {group.title}
                </h3>
                <span className="font-mono text-[11px] text-[#6B6B6B]">
                  0{idx + 1}
                </span>
              </div>
              <p className="font-sans text-sm sm:text-base text-[#6B6B6B] leading-relaxed">
                {group.skills.join(", ")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
