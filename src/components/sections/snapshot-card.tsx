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
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-xl bg-white border border-[#E2DFD7] p-5 sm:p-6 shadow-xs text-left flex flex-col justify-between"
    >
      {/* Top Row: Live Status & Location */}
      <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-[#E2DFD7]/80">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-semibold text-emerald-700">
            Available for roles
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#666666]">
          <MapPin className="w-3.5 h-3.5 text-[#E5341B]" />
          <span>Karur, India (UTC+5:30)</span>
        </div>
      </div>

      {/* Focus Area */}
      <div className="py-3.5">
        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#E5341B]" />
          <span>Core Focus</span>
        </div>
        <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A] leading-snug">
          Applied AI Systems & High-Assurance Architecture
        </h4>
        <p className="text-xs sm:text-sm text-[#666666] mt-1 leading-relaxed">
          Production RAG · Agentic Workflows · Deterministic Invariants
        </p>
      </div>

      {/* Core Stack */}
      <div className="py-3.5 border-t border-[#E2DFD7]/80">
        <div className="flex items-center gap-1.5 mb-2 text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold">
          <Terminal className="w-3.5 h-3.5 text-[#E5341B]" />
          <span>Stack</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STACK_TAGS.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-md font-mono text-xs font-medium bg-[#FAF8F5] text-[#333333] border border-[#E2DFD7]/80 hover:border-[#0A0A0A]/40 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Verified Highlights */}
      <div className="grid grid-cols-2 gap-2.5 pt-3.5 border-t border-[#E2DFD7]/80">
        <div className="px-3 py-2 rounded-lg bg-[#FAF8F5] border border-[#E2DFD7]/80">
          <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider block mb-0.5 font-semibold">
            Specialization
          </span>
          <span className="text-xs font-bold text-[#0A0A0A] block truncate">
            Production AI & Web
          </span>
        </div>
        <div className="px-3 py-2 rounded-lg bg-[#FAF8F5] border border-[#E2DFD7]/80">
          <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider block mb-0.5 font-semibold">
            Publication
          </span>
          <span className="text-xs font-bold text-[#0A0A0A] block truncate">
            IEEE ICETSIS &apos;26
          </span>
        </div>
      </div>
    </motion.div>
  );
}
