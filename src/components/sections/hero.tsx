"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Marquee } from "@/components/ui/marquee";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="hero" className="relative bg-[#EFEFEA] text-black pt-10 lg:pt-14 pb-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14"
      >
        {/* Two-Column Grid: Left Column & Right Card Vertically Aligned Top */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-2.5 mb-3 flex-wrap">
              <span className="w-2.5 h-2.5 bg-[#8E0000] border border-black inline-block" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-black uppercase">
                SOFTWARE ENGINEER • BUILDER
              </span>
              <span className="font-editorial-italic text-sm sm:text-base text-[#8E0000] font-semibold tracking-tight select-none">
                / building for production
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="mb-4">
              <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] text-black leading-[0.96] tracking-tight uppercase">
                I DON&apos;T JUST CODE. <br />
                <span className="text-black">I </span>
                <span className="font-editorial-italic normal-case text-[#8E0000] font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] tracking-tight">
                  solve.
                </span>
              </h1>
              {/* Red Tagline Banner */}
              <div className="bg-[#8E0000] text-white px-4 py-2 inline-flex items-center gap-2 flex-wrap border-2 border-black shadow-[4px_4px_0px_#000000] mt-3 text-xl sm:text-2xl lg:text-3xl font-display">
                <span>THINK IT. BUILD IT.</span>
                <span className="font-editorial-italic normal-case text-white font-bold tracking-tight">
                  solve it.
                </span>
              </div>
            </motion.div>

            {/* Subtext Paragraph */}
            <motion.p variants={itemVariants} className="max-w-xl font-mono text-sm sm:text-base text-black/90 leading-relaxed font-normal mb-6">
              I work across full-stack architecture, applied AI workflows, structured APIs, and intuitive interfaces to turn complex engineering problems into dependable, production-ready solutions.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <motion.a
                href="#contact"
                whileHover={{ y: -2, x: -1, boxShadow: "6px 6px 0px #000000" }}
                whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                className="bg-[#8E0000] hover:bg-[#700000] text-white font-display text-lg sm:text-xl tracking-wider uppercase px-7 py-3 border-2 border-black shadow-[4px_4px_0px_#000000] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>GET IN TOUCH →</span>
              </motion.a>

              <motion.a
                href="#work"
                whileHover={{ y: -2, x: -1, boxShadow: "6px 6px 0px #000000" }}
                whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                className="bg-white hover:bg-[#EFEFEA] text-black font-display text-lg sm:text-xl tracking-wider uppercase px-7 py-3 border-2 border-black shadow-[4px_4px_0px_#000000] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>SEE THE WORK ↓</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: ENGINEER SPEC Card & Live System Metrics */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-start w-full max-w-[420px]">
            {/* Main Spec Card */}
            <div className="w-full bg-white border-2 border-black shadow-[6px_6px_0px_#000000]">
              {/* Header */}
              <div className="bg-[#8E0000] border-b-2 border-black px-4 py-2.5 flex items-center justify-between">
                <span className="font-display text-2xl text-white tracking-wider block uppercase">
                  ENGINEER SPEC
                </span>
                <span className="font-editorial-italic text-sm text-white/90 font-medium tracking-tight">
                  verified
                </span>
              </div>

              {/* Spec Rows */}
              <div className="divide-y-2 divide-black font-mono text-xs sm:text-[13px]">
                <div className="py-2.5 px-4 flex items-center justify-between">
                  <span className="font-bold text-black/70 uppercase tracking-wider">BASED</span>
                  <span className="font-semibold text-black">Karur, TN, India</span>
                </div>
                <div className="py-2.5 px-4 flex items-center justify-between">
                  <span className="font-bold text-black/70 uppercase tracking-wider">MODE</span>
                  <span className="font-semibold text-black">Remote • Intl</span>
                </div>
                <div className="py-2.5 px-4 flex items-center justify-between">
                  <span className="font-bold text-black/70 uppercase tracking-wider">FOCUS</span>
                  <span className="font-semibold text-black">Full-Stack &amp; Applied AI</span>
                </div>
                <div className="py-2.5 px-4 flex items-center justify-between">
                  <span className="font-bold text-black/70 uppercase tracking-wider">STACK</span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    <span className="border border-black bg-white px-2 py-0.5 font-mono text-xs font-bold text-black shadow-[1px_1px_0px_#000000]">Python</span>
                    <span className="border border-black bg-white px-2 py-0.5 font-mono text-xs font-bold text-black shadow-[1px_1px_0px_#000000]">Next.js</span>
                    <span className="border border-black bg-white px-2 py-0.5 font-mono text-xs font-bold text-black shadow-[1px_1px_0px_#000000]">Supabase</span>
                  </div>
                </div>
                <div className="py-2.5 px-4 flex items-center justify-between">
                  <span className="font-bold text-black/70 uppercase tracking-wider">STATUS</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block animate-pulse" />
                    Available for Work
                  </span>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="bg-black text-white px-4 py-2 border-t-2 border-black font-mono text-[11px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">LIVE TELEMETRY</span>
                </div>
                <span className="text-white/80 font-semibold uppercase">SHIPPING READY</span>
              </div>
            </div>

            {/* Sub-Card Stats to perfectly fill vertical space */}
            <div className="mt-3.5 grid grid-cols-2 gap-3.5 w-full">
              <div className="bg-white border-2 border-black p-3 px-4 shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform">
                <div className="font-display text-2xl sm:text-3xl text-black">3+ SYSTEMS</div>
                <div className="font-mono text-[11px] text-black/70 uppercase font-bold tracking-wider">PRODUCTION READY</div>
              </div>
              <div className="bg-white border-2 border-black p-3 px-4 shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform">
                <div className="font-display text-2xl sm:text-3xl text-[#8E0000]">IEEE PAPER</div>
                <div className="font-mono text-[11px] text-black/70 uppercase font-bold tracking-wider">PEER-REVIEWED</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee Strip: Directly touches hero with no dead space */}
      <Marquee />
    </section>
  );
}
