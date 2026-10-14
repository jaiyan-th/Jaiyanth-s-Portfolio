"use client";

import { motion } from "motion/react";
import { MapPin, Sparkles, Terminal } from "lucide-react";

const STACK_TAGS = [
  "Python",
  "LangChain",
  "Next.js",
  "FastAPI",
  "TypeScript",
  "SQL",
];

export function SnapshotCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full h-full rounded-2xl bg-white/95 backdrop-blur-sm border border-[#E5E5E5] hover:border-[#111111]/30 p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle Top Red Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8472B]/60 to-transparent group-hover:via-[#E8472B] transition-colors duration-300" />

      {/* Top Row: Live Status & Location */}
      <div className="flex items-center justify-between gap-2 pb-3.5 sm:pb-4 border-b border-[#E5E5E5]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-emerald-700">
            Available for roles
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.08em] text-[#555555]">
          <MapPin className="w-3.5 h-3.5 text-[#E8472B]" />
          <span>Karur, India (UTC+5:30)</span>
        </div>
      </div>

      {/* Focus Area */}
      <div className="py-4 sm:py-5 flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-1.5 mb-2 text-[11px] font-mono uppercase tracking-[0.08em] text-[#E8472B] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#E8472B]" />
          <span>Core Focus</span>
        </div>
        <h4 className="font-serif font-normal text-[22px] sm:text-[24px] lg:text-[26px] text-[#111111] leading-snug">
          Applied AI Systems &amp; High-Assurance{" "}
          <span className="font-serif italic text-accent font-normal">Architecture</span>
        </h4>
        <p className="font-sans text-[14px] text-[#555555] mt-2 leading-relaxed">
          Production RAG · Agentic Workflows · Deterministic Invariants
        </p>
      </div>

      {/* Core Stack */}
      <div className="py-4 sm:py-5 border-t border-[#E5E5E5]">
        <div className="flex items-center gap-1.5 mb-2.5 text-[11px] font-mono uppercase tracking-[0.08em] text-[#555555] font-medium">
          <Terminal className="w-3.5 h-3.5 text-[#E8472B]" />
          <span>Stack</span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {STACK_TAGS.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] font-medium bg-[#FAF8F5] text-[#111111] border border-[#E5E5E5] hover:border-[#111111]/40 hover:bg-white transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Verified Highlights */}
      <div className="grid grid-cols-2 gap-2.5 pt-3.5 sm:pt-4 border-t border-[#E5E5E5] mt-auto">
        <div className="px-3.5 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5E5E5]">
          <span className="font-mono text-[11px] text-[#555555] uppercase tracking-[0.08em] block mb-0.5 font-medium">
            Specialization
          </span>
          <span className="font-serif font-normal text-[15px] sm:text-base text-[#111111] block truncate">
            Production AI &amp;{" "}
            <span className="font-serif italic text-accent font-normal">Web</span>
          </span>
        </div>
        <div className="px-3.5 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5E5E5]">
          <span className="font-mono text-[11px] text-[#555555] uppercase tracking-[0.08em] block mb-0.5 font-medium">
            Publication
          </span>
          <span className="font-serif font-normal text-[15px] sm:text-base text-[#111111] block truncate">
            IEEE ICETSIS{" "}
            <span className="font-serif italic text-accent font-normal">&apos;26</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
