"use client";

import { motion } from "motion/react";

export function SnapshotCard() {
  const rowVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.25 + custom * 0.1,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="w-full max-w-[440px] flex flex-col justify-center select-none">
      {/* Header: Clean metadata tag with dividing line */}
      <motion.div
        custom={0}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between pb-4 mb-5 border-b border-[#E2DFD7]"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E5341B] inline-block" />
          <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-extrabold tracking-wider">
            SYS.SNAPSHOT
          </span>
        </div>
        <span className="font-mono text-xs text-[#888888] font-semibold">// 2026</span>
      </motion.div>

      {/* Row 1: LOCATION with dividing line */}
      <motion.div
        custom={1}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="pb-5 mb-5 border-b border-[#E2DFD7]"
      >
        <span className="font-mono text-[11px] tracking-widest text-[#888888] uppercase block mb-1.5 font-bold">
          LOCATION
        </span>
        <p className="text-base sm:text-lg font-bold text-[#0A0A0A] tracking-tight">
          Karur, Tamil Nadu, India
        </p>
      </motion.div>

      {/* Row 2: FOCUS with dividing line */}
      <motion.div
        custom={2}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="pb-5 mb-5 border-b border-[#E2DFD7]"
      >
        <span className="font-mono text-[11px] tracking-widest text-[#888888] uppercase block mb-1.5 font-bold">
          FOCUS
        </span>
        <p className="text-base sm:text-lg font-bold text-[#0A0A0A] tracking-tight">
          Applied AI Systems & High-Assurance Architecture
        </p>
      </motion.div>

      {/* Row 3: CORE STACK with dividing line */}
      <motion.div
        custom={3}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="pb-5 mb-5 border-b border-[#E2DFD7]"
      >
        <span className="font-mono text-[11px] tracking-widest text-[#888888] uppercase block mb-1.5 font-bold">
          CORE STACK
        </span>
        <p className="font-mono text-sm text-[#0A0A0A] font-semibold leading-relaxed">
          Python · Next.js · LangChain · FastAPI · SQL
        </p>
      </motion.div>

      {/* Row 4: STATUS (Clean inline text, no box) */}
      <motion.div
        custom={4}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="pt-1 flex items-center gap-2.5 text-xs font-mono font-bold text-[#0A0A0A]"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FB866] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1FB866]" />
        </span>
        <span>Open to full-time & internship roles</span>
      </motion.div>
    </div>
  );
}
