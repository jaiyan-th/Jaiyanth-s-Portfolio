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
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full max-w-[420px] lg:max-w-[430px] rounded-xl bg-white border-2 border-[#111111] p-4 sm:p-5 shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#111111] transition-all duration-200 text-left flex flex-col overflow-hidden"
    >
      {/* Subtle Top Red Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-[#E8472B]" />

      {/* Top Row: Live Status & Location */}
      <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b-2 border-[#111111]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] font-semibold text-emerald-700">
            Available for roles
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.08em] text-[#555555]">
          <MapPin className="w-3.5 h-3.5 text-[#E8472B]" />
          <span>Karur, India (UTC+5:30)</span>
        </div>
      </div>

      {/* Focus Area */}
      <div className="py-3 sm:py-3.5 flex flex-col justify-center">
        <div className="flex items-center gap-1.5 mb-1.5 text-[10.5px] font-mono uppercase tracking-[0.08em] text-[#E8472B] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#E8472B]" />
          <span>Core Focus</span>
        </div>
        <h4 className="font-serif font-normal text-[20px] sm:text-[22px] text-[#111111] leading-snug">
          Applied AI Systems &amp; High-Assurance{" "}
          <span className="font-serif italic text-accent font-normal">Architecture</span>
        </h4>
        <p className="font-sans text-[13px] text-[#555555] mt-1.5 leading-relaxed">
          Production RAG · Agentic Workflows · Deterministic Invariants
        </p>
      </div>

      {/* Core Stack */}
      <div className="py-3 sm:py-3.5 border-t-2 border-[#111111]">
        <div className="flex items-center gap-1.5 mb-2 text-[10.5px] font-mono uppercase tracking-[0.08em] text-[#111111] font-semibold">
          <Terminal className="w-3.5 h-3.5 text-[#E8472B]" />
          <span>Stack</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STACK_TAGS.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-[4px] font-mono text-[10.5px] uppercase tracking-[0.08em] font-medium bg-[#FAF8F5] text-[#111111] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none hover:bg-[#111111] hover:text-white transition-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Verified Highlights */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t-2 border-[#111111]">
        <div className="px-3 py-2 rounded-md bg-[#FAF8F5] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
          <span className="font-mono text-[10px] text-[#555555] uppercase tracking-[0.08em] block mb-0.5 font-semibold">
            Specialization
          </span>
          <span className="font-serif font-normal text-[14px] sm:text-[15px] text-[#111111] block truncate">
            Production AI &amp;{" "}
            <span className="font-serif italic text-accent font-normal">Web</span>
          </span>
        </div>
        <div className="px-3 py-2 rounded-md bg-[#FAF8F5] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
          <span className="font-mono text-[10px] text-[#555555] uppercase tracking-[0.08em] block mb-0.5 font-semibold">
            Publication
          </span>
          <span className="font-serif font-normal text-[14px] sm:text-[15px] text-[#111111] block truncate">
            IEEE ICETSIS{" "}
            <span className="font-serif italic text-accent font-normal">&apos;26</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
