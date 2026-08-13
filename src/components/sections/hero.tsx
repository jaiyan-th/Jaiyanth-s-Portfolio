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
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative bg-[#FAF3EE] border-b-2 border-black px-4 sm:px-6 lg:px-8 py-10 lg:py-16 min-h-[calc(100vh-56px)] flex flex-col justify-center overflow-hidden bg-grid"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto"
      >
        {/* Left Column: Headlines & Call-to-Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Top Eyebrow Badges */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10.5px] font-bold text-[#B91C1C] tracking-widest uppercase">
              00 —— AVAILABLE FOR ROLES
            </span>
            <div className="h-[1px] flex-1 bg-black/15 relative">
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#B91C1C] rounded-full"
              />
            </div>
          </motion.div>

          {/* Scaled Display Headline */}
          <motion.div variants={itemVariants} className="relative inline-block mb-3">
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] text-black leading-[1.02] tracking-tight uppercase">
              EVERY PROBLEM IS A SYSTEM <br className="hidden sm:inline" />
              WAITING TO BE DESIGNED.
            </h1>
          </motion.div>

          {/* Highlighter-Stroke Badge */}
          <motion.div variants={itemVariants} className="mb-4">
            <motion.span
              whileHover={{ rotate: 0, scale: 1.04 }}
              className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-white bg-[#B91C1C] border-2 border-black px-3.5 py-1.5 rounded-[2px_8px_3px_7px] shadow-[3px_3px_0px_#000000] -rotate-1 inline-block cursor-default"
            >
              BUILT, NOT JUST DEMOED.
            </motion.span>
          </motion.div>

          {/* FROM SIGNAL TO SYSTEM -> Inline node diagram */}
          <motion.div variants={itemVariants} className="my-4">
            <div className="flex items-center gap-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#B91C1C]">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#B91C1C] flex items-center justify-center bg-white shadow-[1px_1px_0px_#000]">
                  <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
                </div>
                <span className="mt-1 text-black/80 text-[9px] sm:text-[10px] font-black">SIGNAL</span>
              </div>
              
              <div className="w-10 sm:w-14 h-[2px] bg-[#B91C1C] relative flex items-center justify-end">
                <div className="w-1.5 h-2.5 border-t-4 border-b-4 border-l-4 border-transparent border-l-[#B91C1C]" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#B91C1C] flex items-center justify-center bg-white shadow-[1px_1px_0px_#000]">
                  <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
                </div>
                <span className="mt-1 text-black/80 text-[9px] sm:text-[10px] font-black">SYSTEM</span>
              </div>

              <div className="w-10 sm:w-14 h-[2px] bg-[#B91C1C] relative flex items-center justify-end">
                <div className="w-1.5 h-2.5 border-t-4 border-b-4 border-l-4 border-transparent border-l-[#B91C1C]" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#B91C1C] flex items-center justify-center bg-[#B91C1C]/15 shadow-[1px_1px_0px_#000]">
                  <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
                </div>
                <span className="mt-1 text-black/80 text-[9px] sm:text-[10px] font-black">STORY</span>
              </div>
            </div>
          </motion.div>

          {/* Supporting Description */}
          <motion.p variants={itemVariants} className="max-w-xl font-sans text-xs sm:text-sm text-black/85 leading-relaxed mb-6 font-medium">
            I work across the full stack — AI workflows, backend architecture, structured APIs, and interfaces — to turn messy, real-world problems into software that actually works.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#work"
              whileHover={{ y: -3, x: -2, boxShadow: "5px 5px 0px #000000" }}
              whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
              className="border-2 border-black font-mono text-xs font-black uppercase tracking-widest px-6 py-3.5 inline-flex items-center gap-2 relative bg-white shadow-[3px_3px_0px_#000000] text-black group"
            >
              <span>VIEW SELECTED WORK</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ y: -3, x: -2, boxShadow: "5px 5px 0px #B91C1C" }}
              whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #B91C1C" }}
              className="border-2 border-black font-mono text-xs font-black uppercase tracking-widest px-6 py-3.5 bg-white text-black shadow-[3px_3px_0px_#B91C1C]"
            >
              START A CONVERSATION
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column: macOS Style Terminal Window */}
        <motion.div variants={itemVariants} className="lg:col-span-5 relative flex flex-col items-center justify-center">
          <Card3DTilt maxDegree={6} glowColor="rgba(185, 28, 28, 0.25)" className="w-full max-w-[460px] lg:max-w-[490px]">
            {/* macOS Window Frame */}
            <div className="w-full bg-[#1E1E2E] text-slate-200 relative z-10 border-2 border-black shadow-[6px_6px_0px_#000000] rounded-lg overflow-hidden">
              
              {/* macOS Window Titlebar */}
              <div className="bg-[#2B2B3B] border-b-2 border-black px-4 py-2.5 flex items-center justify-between select-none">
                {/* Traffic Light Buttons */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-inner inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-inner inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-inner inline-block" />
                </div>

                {/* macOS Title */}
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-slate-300">
                  <span className="text-slate-400">⚡</span>
                  <span>jaiyanth — zsh — 80×24</span>
                </div>

                {/* Status indicator badge */}
                <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 border border-emerald-500/30 rounded">
                  LIVE
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-4 sm:p-5 font-mono text-xs text-slate-200 space-y-3 bg-[#1E1E2E] leading-relaxed">
                {/* Shell Prompt Line */}
                <div className="flex items-center gap-2 pb-1 border-b border-slate-700/50 text-[11px]">
                  <span className="text-emerald-400 font-bold">jaiyanth@macbook</span>
                  <span className="text-slate-400">:</span>
                  <span className="text-sky-400 font-bold">~</span>
                  <span className="text-slate-200 font-bold">$</span>
                  <span className="text-amber-300 font-semibold">./status.sh</span>
                </div>

                {/* Output Details */}
                <div className="space-y-2 text-[11px] sm:text-xs">
                  {/* Location */}
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold select-none">&gt;</span>
                    <div>
                      <span className="text-slate-400 font-semibold uppercase tracking-wider">LOCATION:</span>{" "}
                      <span className="text-white font-medium">Karur, TN, India</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold select-none">&gt;</span>
                    <div>
                      <span className="text-slate-400 font-semibold uppercase tracking-wider">STATUS:</span>{" "}
                      <span className="text-white font-medium">Final-year CSBS · Available for Full-time / Internship roles</span>
                    </div>
                  </div>

                  {/* Passion */}
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold select-none">&gt;</span>
                    <div>
                      <span className="text-slate-400 font-semibold uppercase tracking-wider">PASSION:</span>{" "}
                      <span className="text-[#FF6B6B] font-bold">Building reliable, real-world software products</span>
                    </div>
                  </div>

                  {/* Focus */}
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold select-none">&gt;</span>
                    <div>
                      <span className="text-slate-400 font-semibold uppercase tracking-wider">FOCUS:</span>{" "}
                      <span className="text-sky-300 font-medium">Backend Development &amp; Applied AI</span>
                    </div>
                  </div>

                  {/* Core Traits */}
                  <div className="pt-1">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-emerald-400 font-bold select-none">&gt;</span>
                      <span className="text-slate-400 font-semibold uppercase tracking-wider">CORE TRAITS:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-4">
                      {[
                        "3 PROJECTS SHIPPED",
                        "AI INTERN EXPERIENCE",
                        "SECURE AUTH SYSTEMS",
                        "FAST LEARNER",
                        "TEAM PLAYER",
                      ].map((trait) => (
                        <span
                          key={trait}
                          className="font-mono text-[9.5px] font-bold px-2 py-0.5 rounded border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 shadow-sm"
                        >
                          [ {trait} ]
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Command Status */}
                <div className="pt-2.5 border-t border-slate-700/50 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-semibold">MODE:</span>
                    <span className="text-emerald-400 font-bold">OPEN_TO_WORK</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 text-[10px]">zsh</span>
                    <span className="inline-block w-2 h-3.5 bg-emerald-400 animate-pulse align-middle" />
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
