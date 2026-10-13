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
      className="group relative w-full h-full rounded-2xl bg-white/95 backdrop-blur-sm border border-[#0A0A0A]/30 hover:border-[#0A0A0A]/55 p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle Top Red Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5341B]/60 to-transparent group-hover:via-[#E5341B] transition-colors duration-300" />
      {/* Top Row: Live Status & Location */}
      <div className="flex items-center justify-between gap-2 pb-3.5 sm:pb-4 border-b border-[#0A0A0A]/18">
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
      <div className="py-4 sm:py-5 flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#E5341B]" />
          <span>Core Focus</span>
        </div>
        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-[#0A0A0A] leading-snug">
          Applied AI Systems & High-Assurance Architecture
        </h4>
        <p className="text-xs sm:text-sm text-[#666666] mt-1.5 leading-relaxed">
          Production RAG · Agentic Workflows · Deterministic Invariants
        </p>
      </div>

      {/* Core Stack */}
      <div className="py-4 sm:py-5 border-t border-[#0A0A0A]/18">
        <div className="flex items-center gap-1.5 mb-2.5 text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold">
          <Terminal className="w-3.5 h-3.5 text-[#E5341B]" />
          <span>Stack</span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {STACK_TAGS.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-md font-mono text-xs font-medium bg-[#FAF8F5] text-[#222222] border border-[#0A0A0A]/22 hover:border-[#0A0A0A]/60 hover:bg-white transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Verified Highlights */}
      <div className="grid grid-cols-2 gap-2.5 pt-3.5 sm:pt-4 border-t border-[#0A0A0A]/18 mt-auto">
        <div className="px-3.5 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#0A0A0A]/22">
          <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider block mb-0.5 font-semibold">
            Specialization
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] block truncate">
            Production AI & Web
          </span>
        </div>
        <div className="px-3.5 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#0A0A0A]/22">
          <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider block mb-0.5 font-semibold">
            Publication
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] block truncate">
            IEEE ICETSIS &apos;26
          </span>
        </div>
      </div>
    </motion.div>
  );
}
