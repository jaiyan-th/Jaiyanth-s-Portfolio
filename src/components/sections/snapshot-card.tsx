"use client";

import { motion } from "motion/react";
import { Sparkles, Terminal } from "lucide-react";

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
      className="group relative w-full rounded-[24px] bg-white border border-[#E5E0D8] p-6 lg:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all duration-300 text-left flex flex-col"
    >
      {/* Eyebrow & Focus Area */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.08em] text-[#E8472B] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#E8472B]" />
          <span>Core Focus</span>
        </div>
        <h3 className="card-title font-sans font-bold text-[20px] sm:text-[22px] lg:text-[24px] text-[#111111] leading-snug mt-2">
          Applied AI Systems &amp; High-Assurance{" "}
          <em className="accent font-serif-italic italic text-accent font-normal">
            Architecture
          </em>
        </h3>
        <p className="font-sans text-[14px] text-[#4a4a4a] mt-2 leading-relaxed">
          Production RAG · Agentic Workflows · Deterministic Invariants
        </p>
      </div>

      {/* Clean Divider Line */}
      <div className="my-3.5 border-t border-[#E5E0D8]" />

      {/* Core Stack */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5 text-[11px] font-mono uppercase tracking-[0.08em] text-[#111111] font-medium">
          <Terminal className="w-3.5 h-3.5 text-[#E8472B]" />
          <span>Stack</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {STACK_TAGS.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-[6px] font-mono text-[11px] uppercase tracking-[0.08em] font-medium bg-[#FAF8F5] text-[#111111] border border-[#E5E0D8] hover:bg-[#111111] hover:text-white transition-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Clean Divider Line */}
      <div className="my-3.5 border-t border-[#E5E0D8]" />

      {/* Quick Verified Highlights */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8]">
          <span className="font-mono text-[11px] text-[#4a4a4a] uppercase tracking-[0.08em] block mb-0.5 font-medium">
            Specialization
          </span>
          <span className="font-sans font-bold text-[14px] sm:text-[15px] text-[#111111] block truncate">
            Production AI &amp;{" "}
            <em className="accent font-serif-italic italic text-accent font-normal">Web</em>
          </span>
        </div>
        <div className="px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8]">
          <span className="font-mono text-[11px] text-[#4a4a4a] uppercase tracking-[0.08em] block mb-0.5 font-medium">
            Publication
          </span>
          <span className="font-sans font-bold text-[14px] sm:text-[15px] text-[#111111] block truncate">
            IEEE ICETSIS{" "}
            <em className="accent font-serif-italic italic text-accent font-normal">&apos;26</em>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
