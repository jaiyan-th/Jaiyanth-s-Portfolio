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

        {/* Right Column: Professional Technical System Console Card */}
        <motion.div variants={itemVariants} className="lg:col-span-5 relative flex flex-col items-center justify-center">
          <Card3DTilt maxDegree={6} glowColor="rgba(185, 28, 28, 0.25)" className="w-full max-w-[520px] lg:max-w-[560px]">
            {/* Bordered Spec Panel */}
            <div className="w-full bg-white relative z-10 border-2 border-black shadow-[8px_8px_0px_#B91C1C] rounded-sm overflow-hidden transition-shadow duration-300">
              
              {/* Blueprint Viewfinder Corner Accents */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#B91C1C] z-20 pointer-events-none" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#B91C1C] z-20 pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#B91C1C] z-20 pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#B91C1C] z-20 pointer-events-none" />

              {/* Technical Header Bar */}
              <div className="bg-black px-5 py-3 flex items-center justify-between border-b-2 border-black">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C] animate-pulse" />
                  <span className="font-mono text-xs font-black uppercase text-white tracking-wider">
                    SYSTEM_STATUS // JAIYANTH B
                  </span>
                </div>
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#B91C1C] bg-white px-2 py-0.5 border border-black shadow-[1px_1px_0px_#B91C1C]">
                  LIVE 2026
                </span>
              </div>

              {/* Card Body - Generous spacing & bold typography */}
              <div className="p-6 sm:p-7 font-mono text-xs sm:text-sm text-black space-y-4 bg-white leading-relaxed">
                
                {/* Location Line */}
                <div className="flex items-start gap-3 border-b border-black/10 pb-3">
                  <span className="text-[#B91C1C] font-black text-sm select-none">&gt;</span>
                  <div className="flex-1">
                    <span className="text-black/50 font-bold uppercase tracking-wider text-[11px] block">LOCATION</span>
                    <span className="font-black text-black text-sm sm:text-base">Karur, TN, India</span>
                  </div>
                </div>

                {/* Status Line */}
                <div className="flex items-start gap-3 border-b border-black/10 pb-3">
                  <span className="text-[#B91C1C] font-black text-sm select-none">&gt;</span>
                  <div className="flex-1">
                    <span className="text-black/50 font-bold uppercase tracking-wider text-[11px] block">STATUS</span>
                    <span className="font-black text-black text-sm">Final-year CSBS · Available for Full-time / Internship roles</span>
                  </div>
                </div>

                {/* Passion Line */}
                <div className="flex items-start gap-3 border-b border-black/10 pb-3">
                  <span className="text-[#B91C1C] font-black text-sm select-none">&gt;</span>
                  <div className="flex-1">
                    <span className="text-black/50 font-bold uppercase tracking-wider text-[11px] block">PASSION</span>
                    <span className="font-black text-[#B91C1C] text-sm sm:text-base">Building reliable, real-world software products</span>
                  </div>
                </div>

                {/* Focus Line */}
                <div className="flex items-start gap-3 border-b border-black/10 pb-3">
                  <span className="text-[#B91C1C] font-black text-sm select-none">&gt;</span>
                  <div className="flex-1">
                    <span className="text-black/50 font-bold uppercase tracking-wider text-[11px] block">FOCUS</span>
                    <span className="font-black text-black text-sm">Backend Development &amp; Applied AI</span>
                  </div>
                </div>

                {/* Core Traits Section */}
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[#B91C1C] font-black text-sm select-none">&gt;</span>
                    <span className="text-black/60 font-bold uppercase tracking-wider text-xs">CORE TRAITS</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-4">
                    {[
                      "3 PROJECTS SHIPPED",
                      "AI INTERN EXPERIENCE",
                      "SECURE AUTH SYSTEMS",
                      "FAST LEARNER",
                      "TEAM PLAYER",
                    ].map((trait) => (
                      <motion.span
                        key={trait}
                        whileHover={{ scale: 1.04, y: -1 }}
                        className="font-mono text-[10px] sm:text-[10.5px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-black bg-[#FAF3EE] text-black shadow-[2px_2px_0px_#B91C1C] cursor-default"
                      >
                        [ {trait} ]
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Console Footer */}
                <div className="pt-3 mt-2 border-t-2 border-black/15 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-black/60 font-bold">MODE:</span>
                    <span className="font-black text-black tracking-wider bg-[#FAF3EE] px-2 py-0.5 border border-black/30">
                      OPEN_TO_WORK
                    </span>
                  </div>
                  <span className="inline-block w-2.5 h-3.5 bg-[#B91C1C] animate-pulse" />
                </div>
              </div>
            </div>
          </Card3DTilt>
        </motion.div>
      </motion.div>
    </section>
  );
}
