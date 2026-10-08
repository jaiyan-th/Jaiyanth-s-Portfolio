"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Cpu, Database, Network } from "lucide-react";
import { FEATURED_CASE } from "@/data/content";

export function FeaturedCase() {
  return (
    <section
      id="featured-case"
      aria-label="01 Featured Case Study"
      className="relative py-24 sm:py-32 border-t border-[#E5E3DB] bg-[var(--canvas)]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header with Sandeep-style index numbering */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-12 sm:mb-16 pb-6 border-b border-[#E5E3DB]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase font-semibold">
              01
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A0A0A]">
              featured case
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mt-2 sm:mt-0">
            {FEATURED_CASE.tag}
          </span>
        </motion.div>

        {/* Sticky/Stacked Card Container */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-24 z-10 w-full rounded-2xl border border-[#E5E3DB] bg-white p-6 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 hover:border-[#0A0A0A]/40"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Details & Key Highlights */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Category Pill + Year */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#FF3355]/10 text-[#FF3355] border border-[#FF3355]/20">
                      Applied AI · RAG Architecture
                    </span>
                    <span className="text-xs font-mono text-[#6F6E6A]">
                      2025 – 2026
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#0A0A0A] mb-4 leading-tight">
                    {FEATURED_CASE.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-[#6F6E6A] text-base sm:text-lg mb-8 leading-relaxed font-normal">
                    {FEATURED_CASE.summary}
                  </p>

                  {/* Key Highlights List (3 short bullets) */}
                  <div className="mb-8">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mb-4">
                      Key Highlights
                    </h4>
                    <ul className="space-y-3 font-normal text-sm sm:text-base text-[#0A0A0A]">
                      {FEATURED_CASE.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-[#FF3355] font-bold select-none">・</span>
                          <span className="text-[#2A2A2A] leading-relaxed">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics Badges */}
                  <div className="grid grid-cols-3 gap-3 mb-8 pt-6 border-t border-[#E5E3DB]">
                    {FEATURED_CASE.metrics.map((metric, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[#F5F4F0] border border-[#E5E3DB]">
                        <p className="text-lg sm:text-xl font-medium text-[#0A0A0A] tracking-tight">
                          {metric.value}
                        </p>
                        <p className="text-[11px] font-mono text-[#6F6E6A] uppercase tracking-wider">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {FEATURED_CASE.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#F5F4F0] text-[#6F6E6A] border border-[#E5E3DB]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions: Read More + Source Repository */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E5E3DB]">
                  <a
                    href={FEATURED_CASE.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#FF3355] transition-colors group shadow-xs"
                  >
                    <span>Read More</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a
                    href={FEATURED_CASE.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#E5E3DB] bg-[#F5F4F0] text-[#0A0A0A] text-sm font-medium hover:border-[#FF3355] hover:text-[#FF3355] transition-colors"
                  >
                    <span>Source Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Frame (Schematic Graphic) */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] w-full rounded-xl border border-[#E5E3DB] bg-[#F5F4F0] p-6 overflow-hidden flex flex-col justify-between group shadow-2xs">
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF3355]/10 blur-3xl rounded-full pointer-events-none" />

                  {/* Window Bar */}
                  <div className="relative z-10 flex items-center justify-between pb-4 border-b border-[#E5E3DB]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[11px] font-mono text-[#6F6E6A]">
                      rag-fact-engine.py
                    </span>
                  </div>

                  {/* Schematic Node Representation */}
                  <div className="relative z-10 py-6 flex flex-col items-center justify-center space-y-4">
                    <div className="flex items-center gap-4 w-full justify-center">
                      <div className="p-3 rounded-lg border border-[#E5E3DB] bg-white flex items-center gap-2 text-xs font-mono text-[#0A0A0A] shadow-2xs">
                        <Network className="w-4 h-4 text-[#FF3355]" />
                        <span>Input Claim</span>
                      </div>
                      <div className="w-8 h-px bg-dashed border-t border-[#FF3355]/60" />
                      <div className="p-3 rounded-lg border border-[#FF3355]/40 bg-white flex items-center gap-2 text-xs font-mono text-[#0A0A0A] shadow-2xs">
                        <Cpu className="w-4 h-4 text-[#FF3355]" />
                        <span>Embedding</span>
                      </div>
                    </div>

                    <div className="w-px h-6 border-l border-[#E5E3DB]" />

                    <div className="p-3.5 rounded-xl border border-[#E5E3DB] bg-white w-4/5 text-center shadow-xs">
                      <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-700 mb-1 font-medium">
                        <Database className="w-3.5 h-3.5" />
                        <span>Semantic Vector Matching</span>
                      </div>
                      <p className="text-[11px] text-[#6F6E6A] font-mono">
                        Cosine Sim &gt; 0.88 · Qdrant Cloud
                      </p>
                    </div>

                    <div className="w-px h-6 border-l border-[#E5E3DB]" />

                    <div className="px-4 py-2 rounded-lg bg-[#FF3355]/10 border border-[#FF3355]/30 text-center">
                      <span className="text-xs font-mono text-[#FF3355] font-semibold">
                        Grounded Trust Verdict: Verified
                      </span>
                    </div>
                  </div>

                  {/* Bottom Output */}
                  <div className="relative z-10 pt-4 border-t border-[#E5E3DB] flex items-center justify-between text-[11px] font-mono text-[#6F6E6A]">
                    <span>Latency: 780ms</span>
                    <span className="text-emerald-700 font-medium">✓ Grounded</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
