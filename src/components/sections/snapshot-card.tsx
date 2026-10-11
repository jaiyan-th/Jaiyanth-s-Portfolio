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
      whileHover={{ y: -2 }}
      className="w-full rounded-2xl bg-white border-2 border-[#0A0A0A] overflow-hidden transition-all duration-200 select-none"
    >
      {/* Clean Outline Window Header */}
      <div className="bg-[#FAF7F2] border-b-2 border-[#0A0A0A] px-6 sm:px-8 py-4 sm:py-4.5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {/* Terminal / Window dots */}
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#E5341B] border border-[#0A0A0A] inline-block shrink-0" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFE45C] border border-[#0A0A0A] inline-block shrink-0" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#1FB866] border border-[#0A0A0A] inline-block shrink-0" />
          </div>
          <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-extrabold tracking-wider text-xs sm:text-sm px-3 py-1 border-2 border-[#0A0A0A]">
            SYS.SNAPSHOT
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs sm:text-sm font-bold text-[#777777] tracking-widest">// 2026</span>
        </div>
      </div>

      {/* Enlarged Card Content with generous, balanced spacing */}
      <div className="p-6 sm:p-8 lg:p-9 flex flex-col gap-5 sm:gap-6 lg:gap-7 bg-white">
        {/* Row 1: LOCATION */}
        <motion.div
          custom={1}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="pb-4 sm:pb-5 border-b border-[#E2DFD7]"
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#E5341B] shrink-0" />
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#777777] uppercase font-bold">
              LOCATION
            </span>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2.5">
            <p className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
              Karur, Tamil Nadu, India
            </p>
            <span className="text-xs sm:text-sm font-mono font-bold px-2.5 py-1 bg-[#FAF7F2] border border-[#0A0A0A] rounded-md text-[#555555]">
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
          className="pb-4 sm:pb-5 border-b border-[#E2DFD7]"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#E5341B] shrink-0" />
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#777777] uppercase font-bold">
              FOCUS
            </span>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#0A0A0A] tracking-tight leading-snug">
            Applied AI Systems & High-Assurance Architecture
          </p>
          <p className="text-xs sm:text-sm lg:text-base text-[#555555] font-medium mt-1.5">
            Production RAG · Agentic Workflows · Deterministic Invariants
          </p>
        </motion.div>

        {/* Row 3: CORE STACK - Clean Outline Badges */}
        <motion.div
          custom={3}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="pb-4 sm:pb-5 border-b border-[#E2DFD7]"
        >
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-4 h-4 text-[#E5341B] shrink-0" />
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#777777] uppercase font-bold">
              CORE STACK
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5 pt-0.5">
            {STACK_TAGS.map((tag) => (
              <span
                key={tag.name}
                className={`inline-flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono text-xs sm:text-sm lg:text-base font-bold border-2 border-[#0A0A0A] transition-all duration-150 cursor-default ${
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
          className="flex items-center justify-between gap-3.5 p-4 sm:p-4.5 bg-[#EDFDF3] border-2 border-[#0A0A0A] rounded-xl"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="relative flex h-3.5 w-3.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FB866] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#1FB866] border border-[#0A0A0A]" />
            </span>
            <span className="font-mono text-xs sm:text-sm lg:text-base font-extrabold text-[#065F46] tracking-wide truncate">
              Open to new opportunities
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center text-xs sm:text-sm font-mono font-bold uppercase px-3 py-1 bg-white border border-[#0A0A0A] rounded-md text-[#0A0A0A] shrink-0">
            Available Q1/Q2
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
