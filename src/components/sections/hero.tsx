"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Card3DTilt } from "@/components/ui/card-3d-tilt";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative bg-[#FAF3EE] border-b-2 border-black px-4 sm:px-6 lg:px-8 py-8 lg:py-14 min-h-[calc(100vh-60px)] flex flex-col justify-center overflow-hidden bg-grid"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto"
      >
        {/* Left Column: Headlines & Call-to-Actions (Matching Mockup) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
          
          {/* Top Eyebrow: 00 -- [ AVAILABLE FOR ROLES ] */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-black/60 tracking-wider">
              00 ——
            </span>
            <div className="border border-black/30 bg-white/80 px-3 py-1 rounded-sm shadow-[1.5px_1.5px_0px_#000] flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B91C1C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B91C1C]" />
              </span>
              <span className="font-mono text-[10.5px] font-black text-black tracking-widest uppercase">
                AVAILABLE FOR ROLES
              </span>
            </div>
          </motion.div>

          {/* Large Display Headline with Red Accent Block Period */}
          <motion.div variants={itemVariants} className="relative inline-block">
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] text-black leading-[1.02] tracking-tight uppercase">
              EVERY PROBLEM <br />
              IS A SYSTEM <br />
              WAITING TO BE <br />
              DESIGNED<span className="inline-block w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#B91C1C] ml-2.5 align-baseline shadow-[1px_1px_0px_#000]" />
            </h1>
          </motion.div>

          {/* Sub-badge: BUILT, NOT JUST DEMOED. */}
          <motion.div variants={itemVariants}>
            <span className="font-mono text-[10.5px] font-extrabold uppercase tracking-widest text-[#B91C1C] border border-[#B91C1C]/40 bg-[#B91C1C]/5 px-3.5 py-1.5 inline-block rounded-sm">
              BUILT, NOT JUST DEMOED.
            </span>
          </motion.div>

          {/* Monospace Supporting Description */}
          <motion.p variants={itemVariants} className="max-w-xl font-mono text-xs sm:text-[13px] text-black/80 leading-relaxed font-medium">
            I work across the full stack — AI workflows, backend architecture, structured APIs, and interfaces — to turn messy, real-world problems into software that actually works.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 pt-2">
            <motion.a
              href="#work"
              whileHover={{ y: -3, x: -2, boxShadow: "5px 5px 0px #000000" }}
              whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
              className="border-2 border-black font-mono text-xs font-black uppercase tracking-widest px-6 py-3.5 inline-flex items-center gap-2 relative bg-black text-white shadow-[3px_3px_0px_#B91C1C] group"
            >
              <span>VIEW SELECTED WORK</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ y: -2, x: -1 }}
              whileTap={{ y: 1, x: 1 }}
              className="font-mono text-xs font-black uppercase tracking-widest text-black/80 hover:text-[#B91C1C] transition-colors py-3.5"
            >
              START A CONVERSATION
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column: Semi-Transparent System Diagnostics HUD Dashboard */}
        <motion.div variants={itemVariants} className="lg:col-span-5 relative flex flex-col items-center justify-center my-auto">
          <Card3DTilt maxDegree={6} glowColor="rgba(185, 28, 28, 0.25)" className="w-full max-w-[480px] lg:max-w-[500px]">
            {/* Bordered Spec Panel with side watermark label & backdrop transparency */}
            <div className="w-full bg-white/85 backdrop-blur-md relative z-10 border-2 border-black shadow-[8px_8px_0px_#B91C1C] rounded-sm overflow-hidden transition-shadow duration-300">
              
              {/* Vertical Side Watermark Label */}
              <div className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[8.5px] font-bold text-black/20 uppercase tracking-widest rotate-90 origin-center pointer-events-none select-none z-20">
                SYS_CFG_01
              </div>

              {/* Viewfinder Corner Brackets */}
              <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#B91C1C] z-20 pointer-events-none" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#B91C1C] z-20 pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#B91C1C] z-20 pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#B91C1C] z-20 pointer-events-none" />

              {/* HUD Header Bar */}
              <div className="bg-[#FAF3EE]/90 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-black uppercase text-black tracking-wider">
                    SYSTEM DIAGNOSTICS
                  </span>
                </div>
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#B91C1C]">
                  SYS_ON
                </span>
              </div>

              {/* Grid Info Blocks */}
              <div className="p-4 space-y-3 font-mono">
                {/* Row 1: Two Grid Blocks */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-black/20 bg-white/70 backdrop-blur-xs p-2.5 rounded-sm">
                    <span className="text-[9px] font-bold text-black/50 uppercase tracking-widest block mb-1">LOC_01</span>
                    <span className="text-[11px] font-black text-black block tracking-tight">KARUR, TN, IN</span>
                  </div>
                  <div className="border border-black/20 bg-white/70 backdrop-blur-xs p-2.5 rounded-sm">
                    <span className="text-[9px] font-bold text-black/50 uppercase tracking-widest block mb-1">SYS_02</span>
                    <span className="text-[11px] font-black text-black block tracking-tight">FINAL-YEAR CSBS</span>
                  </div>
                </div>

                {/* Row 2: Single Full Block */}
                <div className="border border-black/20 bg-white/70 backdrop-blur-xs p-2.5 rounded-sm">
                  <span className="text-[9px] font-bold text-black/50 uppercase tracking-widest block mb-1">PSN_03</span>
                  <span className="text-[11px] font-black text-black block tracking-tight">RELIABLE, REAL-WORLD SOFTWARE</span>
                </div>

                {/* Row 3: Highlighted Core Focus Box */}
                <div className="border-2 border-black bg-white/90 p-3 rounded-sm shadow-[2px_2px_0px_#B91C1C]">
                  <span className="text-[9px] font-black text-[#B91C1C] uppercase tracking-widest block mb-1">CORE_FOCUS</span>
                  <span className="text-xs font-black text-black uppercase tracking-wider block">
                    BACKEND &amp; APPLIED AI
                  </span>
                </div>

                {/* Telemetry Log Terminal at Bottom */}
                <div className="pt-2 text-[9.5px] font-mono text-black/75 space-y-1 border-t border-black/10">
                  <div className="text-[#B91C1C] font-semibold flex items-center gap-1">
                    <span className="select-none">&gt;</span>
                    <span>####: Fast traffic detected on GPU node</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#B91C1C] font-bold select-none">&gt;</span>
                    <span>SGN_LNK: Allocating new nodes...</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#B91C1C] font-bold select-none">&gt;</span>
                    <span>SYS_INIT: Boot sequence started...</span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[#B91C1C] font-bold select-none">&gt;</span>
                      <span>DB_LATENCY: 12ms (Stable)</span>
                    </div>
                    <span className="inline-block w-1.5 h-3 bg-[#B91C1C] animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </Card3DTilt>
        </motion.div>
      </motion.div>
    </section>
  );
}
