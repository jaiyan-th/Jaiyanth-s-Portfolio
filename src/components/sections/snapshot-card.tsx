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
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.12 + custom * 0.06,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="w-full rounded-xl bg-white border border-[#0A0A0A] overflow-hidden transition-all duration-200 select-none shadow-none"
    >
      {/* Clean Outline Window Header */}
      <div className="bg-[#FAF7F2] border-b border-[#0A0A0A] px-4 sm:px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Terminal / Window dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5341B] border border-[#0A0A0A] inline-block shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFE45C] border border-[#0A0A0A] inline-block shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#1FB866] border border-[#0A0A0A] inline-block shrink-0" />
          </div>
          <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-extrabold tracking-wider text-[11px] px-2 py-0.5 border border-[#0A0A0A]">
            SYS.SNAPSHOT
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-[#777777] tracking-widest">// 2026</span>
        </div>
      </div>

      {/* Compact Card Content with Balanced Proportions */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 sm:gap-3.5 bg-white">
        {/* Row 1: LOCATION */}
        <motion.div
          custom={1}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="pb-2.5 sm:pb-3 border-b border-[#E2DFD7]"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#E5341B] shrink-0" />
            <span className="font-mono text-[11px] tracking-widest text-[#777777] uppercase font-bold">
              LOCATION
            </span>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm sm:text-base font-bold text-[#0A0A0A] tracking-tight">
              Karur, Tamil Nadu, India
            </p>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-[#FAF7F2] border border-[#0A0A0A] rounded text-[#555555]">
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
          className="pb-2.5 sm:pb-3 border-b border-[#E2DFD7]"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#E5341B] shrink-0" />
            <span className="font-mono text-[11px] tracking-widest text-[#777777] uppercase font-bold">
              FOCUS
            </span>
          </div>
          <p className="text-sm sm:text-base font-bold text-[#0A0A0A] tracking-tight leading-snug">
            Applied AI Systems & High-Assurance Architecture
          </p>
          <p className="text-[11px] sm:text-xs text-[#666666] font-medium mt-0.5">
            Production RAG · Agentic Workflows · Deterministic Invariants
          </p>
        </motion.div>

        {/* Row 3: CORE STACK - Clean Outline Badges */}
        <motion.div
          custom={3}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="pb-2.5 sm:pb-3 border-b border-[#E2DFD7]"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Terminal className="w-3.5 h-3.5 text-[#E5341B] shrink-0" />
            <span className="font-mono text-[11px] tracking-widest text-[#777777] uppercase font-bold">
              CORE STACK
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {STACK_TAGS.map((tag) => (
              <span
                key={tag.name}
                className={`inline-flex items-center px-2.5 py-1 rounded-md font-mono text-xs font-semibold border border-[#0A0A0A] transition-all duration-150 cursor-default ${
                  tag.highlight
                    ? "bg-[#FFE45C] text-[#0A0A0A]"
                    : "bg-[#FAF7F2] text-[#0A0A0A] hover:bg-[#FFE45C]"
                }`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Row 4: STATUS BANNER - Clean Outline */}
        <motion.div
          custom={4}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between gap-3 p-2.5 sm:p-3 bg-[#EDFDF3] border border-[#0A0A0A] rounded-lg"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FB866] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1FB866] border border-[#0A0A0A]" />
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-[#065F46] tracking-wide truncate">
              Open to new opportunities
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center text-[10px] sm:text-[11px] font-mono font-bold uppercase px-2 py-0.5 bg-white border border-[#0A0A0A] rounded text-[#0A0A0A] shrink-0">
            Available Q1/Q2
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
