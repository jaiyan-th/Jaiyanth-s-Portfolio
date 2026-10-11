"use client";

import { motion } from "motion/react";
import { MapPin, Sparkles, Terminal } from "lucide-react";

const STACK_TAGS = [
  { name: "Python", highlight: true },
  { name: "Next.js", highlight: false },
  { name: "LangChain", highlight: true },
  { name: "FastAPI", highlight: false },
  { name: "SQL", highlight: false },
  { name: "TypeScript", highlight: false },
];

export function SnapshotCard() {
  const rowVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + custom * 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, boxShadow: "10px 10px 0px #0A0A0A" }}
      className="w-full rounded-2xl bg-white border-2 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] lg:shadow-[8px_8px_0px_#0A0A0A] overflow-hidden transition-all duration-200 select-none"
    >
      {/* Neo-Brutalist Window Header */}
      <div className="bg-[#FAF7F2] border-b-2 border-[#0A0A0A] px-5 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Terminal / Mac style window dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E5341B] border border-[#0A0A0A] inline-block shrink-0" />
            <span className="w-3 h-3 rounded-full bg-[#FFE45C] border border-[#0A0A0A] inline-block shrink-0" />
            <span className="w-3 h-3 rounded-full bg-[#1FB866] border border-[#0A0A0A] inline-block shrink-0" />
          </div>
          <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-extrabold tracking-wider text-xs px-2.5 py-0.5 border border-[#0A0A0A]">
            SYS.SNAPSHOT
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#888888] tracking-widest">// 2026</span>
        </div>
      </div>

      {/* Card Content with balanced, tight spacing */}
      <div className="p-5 sm:p-6 lg:p-7 flex flex-col gap-4 sm:gap-5 bg-white">
        {/* Row 1: LOCATION */}
        <motion.div
          custom={1}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="pb-3.5 border-b border-[#E2DFD7]/80"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#E5341B] shrink-0" />
            <span className="font-mono text-xs tracking-widest text-[#777777] uppercase font-bold">
              LOCATION
            </span>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-base sm:text-lg lg:text-xl font-extrabold text-[#0A0A0A] tracking-tight">
              Karur, Tamil Nadu, India
            </p>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 bg-[#FAF7F2] border border-[#E2DFD7] rounded text-[#666666]">
              UTC+5:30
            </span>
          </div>
        </motion.div>

        {/* Row 2: FOCUS */}
        <motion.div
          custom={2}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="pb-3.5 border-b border-[#E2DFD7]/80"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E5341B] shrink-0" />
            <span className="font-mono text-xs tracking-widest text-[#777777] uppercase font-bold">
              FOCUS
            </span>
          </div>
          <p className="text-base sm:text-lg lg:text-xl font-extrabold text-[#0A0A0A] tracking-tight leading-snug">
            Applied AI Systems & High-Assurance Architecture
          </p>
          <p className="text-xs sm:text-sm text-[#666666] font-medium mt-1">
            Production RAG · Agentic Workflows · Deterministic Invariants
          </p>
        </motion.div>

        {/* Row 3: CORE STACK - Neo-Brutalist Badges */}
        <motion.div
          custom={3}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="pb-3.5 border-b border-[#E2DFD7]/80"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <Terminal className="w-3.5 h-3.5 text-[#E5341B] shrink-0" />
            <span className="font-mono text-xs tracking-widest text-[#777777] uppercase font-bold">
              CORE STACK
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-0.5">
            {STACK_TAGS.map((tag) => (
              <span
                key={tag.name}
                className={`inline-flex items-center px-3 py-1.5 rounded-md font-mono text-xs sm:text-sm font-bold border border-[#0A0A0A] transition-all duration-150 cursor-default ${
                  tag.highlight
                    ? "bg-[#FFE45C] text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#0A0A0A]"
                    : "bg-[#FAF7F2] text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] hover:bg-[#FFE45C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#0A0A0A]"
                }`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Row 4: STATUS BANNER */}
        <motion.div
          custom={4}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between gap-3 p-3 sm:p-3.5 bg-[#EDFDF3] border-2 border-[#0A0A0A] rounded-xl shadow-[3px_3px_0px_#0A0A0A]"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FB866] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1FB866] border border-[#0A0A0A]" />
            </span>
            <span className="font-mono text-xs sm:text-sm font-extrabold text-[#065F46] tracking-wide truncate">
              Open to new opportunities
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center text-[11px] font-mono font-bold uppercase px-2 py-0.5 bg-white border border-[#0A0A0A] rounded shadow-[1.5px_1.5px_0px_#0A0A0A] text-[#0A0A0A] shrink-0">
            Available Q1/Q2
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
