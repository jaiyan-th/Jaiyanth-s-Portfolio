"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, Target, Layers, Sparkles } from "lucide-react";

export function SnapshotCard() {
  const rowVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + custom * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="w-full max-w-[420px] flex flex-col justify-center select-none">
      {/* Header: Clean unboxed metadata tag */}
      <motion.div
        custom={0}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-2.5 mb-7"
      >
        <span className="w-2 h-2 rounded-full bg-accent inline-block" />
        <span className="font-mono text-xs tracking-widest uppercase text-[#0A0A0A] font-bold">
          SYS.SNAPSHOT
        </span>
        <span className="font-mono text-xs text-[#888888] font-medium">// 2026</span>
      </motion.div>

      {/* Row 1: LOCATION */}
      <motion.div
        custom={1}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <span className="font-mono text-[11px] tracking-widest text-[#888888] uppercase block mb-1 font-semibold">
          LOCATION
        </span>
        <p className="text-base sm:text-lg font-semibold text-[#0A0A0A] tracking-tight">
          Karur, Tamil Nadu, India
        </p>
      </motion.div>

      {/* Row 2: FOCUS */}
      <motion.div
        custom={2}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <span className="font-mono text-[11px] tracking-widest text-[#888888] uppercase block mb-1 font-semibold">
          FOCUS
        </span>
        <p className="text-base sm:text-lg font-semibold text-[#0A0A0A] tracking-tight">
          Applied AI Systems & High-Assurance Architecture
        </p>
      </motion.div>

      {/* Row 3: STACK */}
      <motion.div
        custom={3}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <span className="font-mono text-[11px] tracking-widest text-[#888888] uppercase block mb-1 font-semibold">
          CORE STACK
        </span>
        <p className="font-mono text-sm text-[#0A0A0A] font-medium leading-relaxed">
          Python · Next.js · LangChain · FastAPI · SQL
        </p>
      </motion.div>

      {/* Row 4: STATUS (Clean inline text, no box, no border) */}
      <motion.div
        custom={4}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="pt-2 flex items-center gap-2.5 text-xs font-mono font-bold text-[#0A0A0A]"
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
