"use client";

import * as React from "react";
import { SKILL_GROUPS } from "@/data/portfolio";
import { motion } from "motion/react";

export function Skills() {
  return (
    <section id="skills" className="relative bg-[#0B0C0E] border-b border-[#232323] px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-[#F5F3EF] bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 border-b border-[#232323] pb-8"
        >
          <span className="font-mono text-xs font-bold text-[#6D2932] tracking-widest uppercase block mb-2">
            02 —— SKILLS MATRIX
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#F5F3EF] leading-[1.08] tracking-tight uppercase">
            Six <span className="italic text-[#6D2932] font-serif">evidence-based</span> skill groups.
          </h2>
          <p className="font-sans text-sm text-[#9A958D] mt-2 font-normal">
            Every competency is tied directly to production deployments, research artifacts, or team contributions.
          </p>
        </motion.div>

        {/* Simplified Editorial List-Based Layout */}
        <div className="space-y-10">
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="border-b border-[#232323] pb-8 grid lg:grid-cols-12 gap-6 items-start"
            >
              {/* Category Name & Index */}
              <div className="lg:col-span-4 space-y-1">
                <span className="font-mono text-xs text-[#6D2932] font-bold tracking-wider uppercase block">
                  {group.index} // {group.label}
                </span>
                <h3 className="font-heading font-bold text-xl text-[#F5F3EF] uppercase">
                  {group.title}
                </h3>
              </div>

              {/* Skill Items & Impact */}
              <div className="lg:col-span-8 space-y-4">
                <p className="font-sans text-sm text-[#9A958D] leading-relaxed font-normal">
                  {group.description}
                </p>

                {/* Comma-Separated / Minimal Inline Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs text-[#F5F3EF] bg-[#141619] border border-[#232323] px-3 py-1 hover:border-[#6D2932] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {group.evidence && (
                  <p className="font-mono text-xs text-[#9A958D] pt-1">
                    <span className="text-[#F5F3EF] font-bold">EVIDENCE:</span> {group.evidence}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
