"use client";

import { motion } from "motion/react";
import {
  MapPin,
  Sparkles,
  Terminal,
  Cpu,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const STACK_TAGS = [
  { name: "Python", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "FastAPI", category: "ai" },
  { name: "Next.js", category: "web" },
  { name: "TypeScript", category: "web" },
  { name: "PostgreSQL", category: "web" },
];

const SIGNALS = [
  { label: "Vector RAG", val: "Qdrant" },
  { label: "Crypto Vault", val: "AES-256" },
  { label: "Type Safety", val: "Zod / TS" },
];

export function SnapshotCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full h-full rounded-2xl bg-white/95 backdrop-blur-sm border border-[#E2DFD7] hover:border-[#0A0A0A]/30 p-5 sm:p-6 lg:p-6 shadow-sm hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle Top Red Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5341B]/70 to-transparent group-hover:via-[#E5341B] transition-colors duration-300" />

      {/* Top Header: Live Status & Location Badge */}
      <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-[#E2DFD7]/80">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-semibold text-emerald-800">
            Available for roles
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#666666]">
          <MapPin className="w-3.5 h-3.5 text-[#E5341B]" />
          <span>Karur, India (UTC+5:30)</span>
        </div>
      </div>

      {/* Core Focus Area with Inner Highlight Card */}
      <div className="my-2.5 p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DFD7]/80 group-hover:border-[#E2DFD7] transition-colors">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#E5341B]" />
            <span>Core Focus</span>
          </div>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white border border-[#E2DFD7] text-[#666]">
            SYSTEMS
          </span>
        </div>

        <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A] leading-snug">
          Applied AI Systems & High-Assurance Architecture
        </h4>
        <p className="text-xs text-[#666666] mt-1 leading-relaxed">
          Production RAG · Agentic Workflows · Deterministic Invariants
        </p>

        {/* Telemetry Architecture Signals */}
        <div className="grid grid-cols-3 gap-1.5 mt-3 pt-2.5 border-t border-[#E2DFD7]/70">
          {SIGNALS.map((sig) => (
            <div
              key={sig.label}
              className="px-2 py-1 rounded bg-white border border-[#E2DFD7]/60 text-center"
            >
              <div className="text-[9px] font-mono uppercase text-[#888888] font-medium leading-tight truncate">
                {sig.label}
              </div>
              <div className="text-[11px] font-mono font-bold text-[#0A0A0A] leading-tight truncate">
                {sig.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Stack */}
      <div className="py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold">
            <Terminal className="w-3.5 h-3.5 text-[#E5341B]" />
            <span>Verified Stack</span>
          </div>
          <span className="text-[10px] font-mono text-[#888888]">6 CORE TOOLS</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STACK_TAGS.map((tag) => (
            <span
              key={tag.name}
              className={`inline-flex items-center px-2.5 py-1 rounded-md font-mono text-xs font-medium transition-all duration-150 cursor-default ${
                tag.category === "ai"
                  ? "bg-[#FAF8F5] text-[#0A0A0A] border border-[#E2DFD7] hover:border-[#E5341B]/40 hover:bg-white"
                  : "bg-white text-[#333333] border border-[#E2DFD7] hover:border-[#0A0A0A]/40"
              }`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Verified Highlights Grid */}
      <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-[#E2DFD7]/80">
        <div className="p-3 rounded-xl bg-white border border-[#E2DFD7] hover:border-[#0A0A0A]/30 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider font-semibold">
              Specialization
            </span>
            <Cpu className="w-3.5 h-3.5 text-[#E5341B]" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] block truncate">
            Production AI & Web
          </span>
          <span className="text-[10px] font-mono text-[#888] block mt-0.5">
            Full-Stack + Agents
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-[#E2DFD7] hover:border-[#0A0A0A]/30 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider font-semibold">
              Publication
            </span>
            <BookOpen className="w-3.5 h-3.5 text-[#E5341B]" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] block truncate">
            IEEE ICETSIS &apos;26
          </span>
          <span className="text-[10px] font-mono text-[#888] block mt-0.5">
            Peer-Reviewed Paper
          </span>
        </div>
      </div>

      {/* Bottom Live Signal Footer */}
      <div className="mt-2.5 pt-2 border-t border-[#E2DFD7]/60 flex items-center justify-between text-[11px] font-mono text-[#777]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E5341B]" />
          <span>Deterministic Invariants</span>
        </div>
        <a
          href="/#work"
          className="inline-flex items-center gap-1 text-[#0A0A0A] hover:text-[#E5341B] font-semibold transition-colors"
        >
          <span>View Work</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}
