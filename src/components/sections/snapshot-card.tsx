"use client";

import { motion } from "motion/react";

export function SnapshotCard() {
  const rowVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + custom * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="w-full h-full flex flex-col justify-start lg:justify-between gap-3.5 lg:gap-0 select-none">
      {/* Header: Clean metadata tag with dividing line */}
      <motion.div
        custom={0}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between pb-2.5 lg:pb-3 border-b border-[#E2DFD7]"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E5341B] inline-block shrink-0" />
          <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-extrabold tracking-wider">
            SYS.SNAPSHOT
          </span>
        </div>
        <span className="text-fluid-mono text-[#888888] font-semibold">// 2026</span>
      </motion.div>

      {/* Row 1: LOCATION with dividing line */}
      <motion.div
        custom={1}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="pb-2.5 lg:pb-3 border-b border-[#E2DFD7]"
      >
        <span className="text-fluid-mono tracking-widest text-[#888888] uppercase block mb-1 font-bold">
          LOCATION
        </span>
        <p className="text-fluid-small font-bold text-[#0A0A0A] tracking-tight">
          Karur, Tamil Nadu, India
        </p>
      </motion.div>

      {/* Row 2: FOCUS with dividing line */}
      <motion.div
        custom={2}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="pb-2.5 lg:pb-3 border-b border-[#E2DFD7]"
      >
        <span className="text-fluid-mono tracking-widest text-[#888888] uppercase block mb-1 font-bold">
          FOCUS
        </span>
        <p className="text-fluid-small font-bold text-[#0A0A0A] tracking-tight">
          Applied AI Systems & High-Assurance Architecture
        </p>
      </motion.div>

      {/* Row 3: CORE STACK with dividing line */}
      <motion.div
        custom={3}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="pb-2.5 lg:pb-3 border-b border-[#E2DFD7]"
      >
        <span className="text-fluid-mono tracking-widest text-[#888888] uppercase block mb-1 font-bold">
          CORE STACK
        </span>
        <p className="text-fluid-mono text-[#0A0A0A] font-semibold leading-relaxed">
          Python · Next.js · LangChain · FastAPI · SQL
        </p>
      </motion.div>

      {/* Row 4: STATUS (aligned with left CTA buttons height) */}
      <motion.div
        custom={4}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-2 text-fluid-mono font-bold text-[#0A0A0A] min-h-[48px]"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FB866] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1FB866]" />
        </span>
        <span>Open to new opportunities</span>
      </motion.div>
    </div>
  );
}
