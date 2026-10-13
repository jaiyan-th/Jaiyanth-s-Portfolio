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
      className="w-full rounded-xl bg-white border border-[#E2DFD7] p-4 sm:p-5 shadow-xs text-left"
    >
      {/* Top Row: Live Status & Location */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#E2DFD7]/80">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-semibold text-emerald-700">
            Available for roles
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-mono text-[#666666]">
          <MapPin className="w-3 h-3 text-[#E5341B]" />
          <span>Karur, India (UTC+5:30)</span>
        </div>
      </div>

      {/* Focus Area */}
      <div className="py-2.5">
        <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold">
          <Sparkles className="w-3 h-3 text-[#E5341B]" />
          <span>Core Focus</span>
        </div>
        <h4 className="text-sm sm:text-base font-bold text-[#0A0A0A] leading-snug">
          Applied AI Systems & High-Assurance Architecture
        </h4>
        <p className="text-xs text-[#666666] mt-0.5">
          Production RAG · Agentic Workflows · Deterministic Invariants
        </p>
      </div>

      {/* Core Stack */}
      <div className="pt-2.5 border-t border-[#E2DFD7]/80">
        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold">
          <Terminal className="w-3 h-3 text-[#E5341B]" />
          <span>Stack</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STACK_TAGS.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-md font-mono text-xs font-medium bg-[#FAF8F5] text-[#333333] border border-[#E2DFD7]/80 hover:border-[#0A0A0A]/40 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
