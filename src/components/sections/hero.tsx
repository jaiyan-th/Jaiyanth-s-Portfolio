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
    <section id="hero" className="relative bg-[#EFEFEA] text-black border-b-2 border-black pt-8 lg:pt-10 pb-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-10"
      >
        {/* Two-Column Grid: Left Column & Right Card Vertically Aligned Top */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="w-2.5 h-2.5 bg-[#8E0000] border border-black inline-block" />
              <span className="font-mono text-xs font-bold tracking-widest text-black uppercase">
                SOFTWARE ENGINEER • BUILDER
              </span>
              <span className="font-editorial-italic text-sm sm:text-base text-[#8E0000] font-semibold tracking-tight select-none">
                / building for production
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="mb-3">
              <h1 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] text-black leading-[1.02] tracking-tight uppercase">
                I DON&apos;T JUST CODE. <br />
                <span className="text-black">I </span>
                <span className="font-editorial-italic normal-case text-[#8E0000] font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] tracking-tight">
                  solve.
                </span>
              </h1>
              {/* Red Tagline Banner */}
              <div className="bg-[#8E0000] text-white px-3 py-1 sm:px-3.5 sm:py-1.5 inline-flex items-center gap-1.5 flex-wrap border-2 border-black shadow-[3px_3px_0px_#000000] mt-2 text-lg sm:text-xl lg:text-2xl font-display">
                <span>THINK IT. BUILD IT.</span>
                <span className="font-editorial-italic normal-case text-white font-bold tracking-tight">
                  solve it.
                </span>
              </div>
            </motion.div>

            {/* Subtext Paragraph */}
            <motion.p variants={itemVariants} className="max-w-lg font-mono text-xs sm:text-sm text-black/85 leading-relaxed font-normal mb-4">
              I work across full-stack architecture, applied AI workflows, structured APIs, and intuitive interfaces to turn complex engineering problems into dependable, production-ready solutions.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <motion.a
                href="#contact"
                whileHover={{ y: -2, x: -1, boxShadow: "5px 5px 0px #000000" }}
                whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                className="bg-[#8E0000] hover:bg-[#700000] text-white font-display text-base sm:text-lg tracking-wider uppercase px-6 py-2 border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>GET IN TOUCH →</span>
              </motion.a>

              <motion.a
                href="#work"
                whileHover={{ y: -2, x: -1, boxShadow: "5px 5px 0px #000000" }}
                whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                className="bg-white hover:bg-[#EFEFEA] text-black font-display text-base sm:text-lg tracking-wider uppercase px-6 py-2 border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>SEE THE WORK ↓</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: ENGINEER SPEC Card */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-start">
            <div className="w-full max-w-[380px] bg-white border-2 border-black shadow-[5px_5px_0px_#000000]">
              {/* Header */}
              <div className="bg-[#8E0000] border-b-2 border-black px-3.5 py-2 flex items-center justify-between">
                <span className="font-display text-xl text-white tracking-wider block uppercase">
                  ENGINEER SPEC
                </span>
                <span className="font-editorial-italic text-sm text-white/90 font-medium tracking-tight">
                  verified
                </span>
              </div>

              {/* Rows: Tightly packed with minimal, equal padding */}
              <div className="divide-y-2 divide-black font-mono text-xs">
                <div className="py-2 px-3.5 flex items-center justify-between">
                  <span className="font-bold text-black/70 uppercase tracking-wider">BASED</span>
                  <span className="font-semibold text-black">Karur, TN, India</span>
                </div>
                <div className="py-2 px-3.5 flex items-center justify-between">
                  <span className="font-bold text-black/70 uppercase tracking-wider">MODE</span>
                  <span className="font-semibold text-black">Remote • Intl</span>
                </div>
                <div className="py-2 px-3.5 flex items-center justify-between">
                  <span className="font-bold text-black/70 uppercase tracking-wider">ENGAGE</span>
                  <span className="font-semibold text-black">Full-time / Internship</span>
                </div>
                <div className="py-2 px-3.5 flex items-center justify-between">
                  <span className="font-bold text-black/70 uppercase tracking-wider">STACK</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    <span className="border border-black bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold text-black shadow-[1px_1px_0px_#000000]">Python</span>
                    <span className="border border-black bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold text-black shadow-[1px_1px_0px_#000000]">Next.js</span>
                    <span className="border border-black bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold text-black shadow-[1px_1px_0px_#000000]">Supabase</span>
                  </div>
                </div>
                <div className="py-2 px-3.5 flex items-center justify-between">
                  <span className="font-bold text-black/70 uppercase tracking-wider">STATUS</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                    Available
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee Strip: Directly touches hero with no dead space */}
      <div className="border-t-2 border-black bg-white">
        <Marquee />
      </div>
    </section>
  );
}
