"use client";

import * as React from "react";
import { FileText, MapPin, Calendar, Building2, Award } from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";
import { motion } from "motion/react";

export function Research() {
  const concepts = [
    {
      num: "01",
      title: "Multimodal Signal Capture",
      desc: "Captures physiological signals and symptom telemetry across distributed client interfaces.",
    },
    {
      num: "02",
      title: "Structured Conversational Triage",
      desc: "Executes clinical decision trees and diagnostic triage via constrained conversational intelligence.",
    },
    {
      num: "03",
      title: "Explainable Preventive Routing",
      desc: "Outputs deterministic risk scoring and explainable referral pathways for preventive care.",
    },
  ];

  return (
    <section id="achievements" className="relative bg-[#0B0C0E] border-b border-[#232323] px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-[#F5F3EF] bg-grid">
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
            05 —— FEATURED ACHIEVEMENTS
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#F5F3EF] leading-[1.08] tracking-tight uppercase">
            IEEE RESEARCH &amp; KEY <span className="text-[#6D2932]">ACCOMPLISHMENTS.</span>
          </h2>
          <p className="font-sans text-sm text-[#9A958D] mt-2 font-normal">
            Co-authored IEEE research accepted at ICETSIS 2026 along with verified engineering achievements.
          </p>
        </motion.div>

        {/* Featured Research Paper Container in #141619 Surface */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 bg-[#141619] border border-[#232323] p-8 sm:p-12 relative"
        >
          <div className="space-y-8">
            {/* Header & Eyebrow */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#232323] pb-6">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#6D2932]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#6D2932]">
                  IEEE ICETSIS 2026 · CO-AUTHORED
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#9A958D] uppercase px-3 py-1 border border-[#232323] bg-[#0B0C0E]">
                IEEE BAHRAIN SECTION
              </span>
            </div>

            {/* Paper Title */}
            <h3 className="font-serif italic text-2xl sm:text-4xl text-[#F5F3EF] leading-tight font-bold">
              {RESEARCH.title}
            </h3>

            {/* Compact Horizontal Meta-Row */}
            <div className="flex flex-wrap items-center gap-6 border-y border-[#232323] py-4 font-mono text-xs text-[#9A958D]">
              <div className="flex items-center gap-2">
                <span className="text-[#6D2932] font-bold">VENUE:</span>
                <span className="text-[#F5F3EF]">{RESEARCH.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#6D2932]" />
                <span className="text-[#F5F3EF]">{RESEARCH.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#6D2932]" />
                <span className="text-[#F5F3EF]">{RESEARCH.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#6D2932]" />
                <span className="text-[#F5F3EF]">{RESEARCH.organiser}</span>
              </div>
            </div>

            {/* Abstract Pull-Quote Block */}
            <div className="border-l-2 border-[#6D2932] pl-6 py-2 bg-[#0B0C0E]/60 p-4">
              <span className="font-mono text-[10px] font-bold text-[#6D2932] block mb-2 uppercase tracking-widest">
                ABSTRACT PULL-QUOTE
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#F5F3EF] leading-relaxed font-normal">
                &ldquo;{RESEARCH.abstract}&rdquo;
              </p>
            </div>

            {/* Core Concepts Numbered List */}
            <div className="space-y-4 pt-4 border-t border-[#232323]">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5F3EF] block mb-4">
                CORE SYSTEM PIPELINE // 03 STAGES
              </span>
              <div className="divide-y divide-[#232323]">
                {concepts.map((c) => (
                  <div key={c.num} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs font-bold text-[#6D2932] mt-0.5">
                        {c.num}
                      </span>
                      <div>
                        <h4 className="font-heading font-bold text-base text-[#F5F3EF] uppercase">
                          {c.title}
                        </h4>
                        <p className="font-sans text-xs text-[#9A958D] leading-relaxed mt-1 font-normal">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Concept Tag Pills */}
            <div className="pt-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#9A958D] block mb-3">
                DOMAIN TAGS
              </span>
              <div className="flex flex-wrap gap-2">
                {RESEARCH.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="font-mono text-xs text-[#F5F3EF] px-3 py-1 border border-[#6D2932] bg-[#0B0C0E]"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 Key Highlights List */}
        <div className="grid md:grid-cols-3 gap-6">
          {RESEARCH_CONTEXT.highlights.map((item, i) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-6 border border-[#232323] bg-[#141619] space-y-2 hover:border-[#6D2932] transition-colors"
            >
              <div className="flex items-center justify-between border-b border-[#232323] pb-2">
                <span className="font-mono text-xs font-bold text-[#6D2932]">
                  {item.index}
                </span>
                <Award className="w-4 h-4 text-[#9A958D]" />
              </div>
              <h4 className="font-mono text-xs font-bold text-[#F5F3EF] uppercase tracking-wider">
                {item.title}
              </h4>
              <p className="font-sans text-xs text-[#9A958D] leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
