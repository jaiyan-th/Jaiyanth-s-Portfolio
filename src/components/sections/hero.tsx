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

        {/* Right Column: Spec ID Card */}
        <motion.div variants={itemVariants} className="lg:col-span-5 relative flex flex-col items-center justify-center">
          <Card3DTilt maxDegree={6} glowColor="rgba(185, 28, 28, 0.25)" className="w-full max-w-[400px]">
            <div className="w-full bg-white relative z-10 border-2 border-black shadow-[6px_6px_0px_#000000] rounded-sm overflow-hidden">
              {/* Viewfinder corners */}
              <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#B91C1C] pointer-events-none z-20" />
              <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#B91C1C] pointer-events-none z-20" />
              <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#B91C1C] pointer-events-none z-20" />
              <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#B91C1C] pointer-events-none z-20" />

              {/* Header Strip */}
              <div className="bg-black px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B91C1C] animate-pulse" />
                  <span className="font-mono text-[9px] font-black uppercase text-white/90 tracking-widest">
                    JAIYANTH B — STATUS
                  </span>
                </div>
                <span className="font-mono text-[8px] font-bold text-[#B91C1C] uppercase tracking-wider">
                  2026
                </span>
              </div>

              {/* Spec Grid Body */}
              <div className="p-4 space-y-0 font-mono text-[10px]">
                {/* Row 1 */}
                <div className="grid grid-cols-[90px_1fr] border-b border-black/10 py-2">
                  <span className="text-black/50 font-bold uppercase tracking-wider">Location</span>
                  <span className="font-black text-black">Karur, TN, India</span>
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-[90px_1fr] border-b border-black/10 py-2">
                  <span className="text-black/50 font-bold uppercase tracking-wider">Status</span>
                  <span className="font-black text-black">Final-year CSBS</span>
                </div>
                {/* Row 3 */}
                <div className="grid grid-cols-[90px_1fr] border-b border-black/10 py-2">
                  <span className="text-black/50 font-bold uppercase tracking-wider">Available</span>
                  <span className="font-black text-black">Full-time / Internship</span>
                </div>
                {/* Row 4 */}
                <div className="grid grid-cols-[90px_1fr] border-b border-black/10 py-2">
                  <span className="text-black/50 font-bold uppercase tracking-wider">Focus</span>
                  <span className="font-black text-black">Backend Dev & Applied AI</span>
                </div>
                {/* Row 5 */}
                <div className="grid grid-cols-[90px_1fr] border-b border-black/10 py-2">
                  <span className="text-black/50 font-bold uppercase tracking-wider">Passion</span>
                  <span className="font-black text-[#B91C1C]">Building real-world software</span>
                </div>

                {/* Traits — Tag Row */}
                <div className="pt-3">
                  <span className="text-black/50 font-bold uppercase tracking-wider block mb-2 text-[9px]">Verified Traits</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "3 Projects",
                      "AI Intern",
                      "Auth Systems",
                      "Fast Learner",
                      "Team Player",
                    ].map((trait) => (
                      <span
                        key={trait}
                        className="font-mono text-[8px] font-black uppercase tracking-wider px-2 py-1 border-2 border-black bg-[#FAF3EE] text-black shadow-[2px_2px_0px_#B91C1C]"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Status Bar */}
              <div className="bg-[#FAF3EE] border-t-2 border-black px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                  <span className="font-mono text-[8px] font-black uppercase tracking-widest text-black/70">
                    OPEN_TO_WORK
                  </span>
                </div>
                <span className="font-mono text-[8px] font-bold text-black/40 tracking-wider">
                  v1.0 · LIVE
                </span>
              </div>
            </div>
          </Card3DTilt>
        </motion.div>
      </motion.div>
    </section>
  );
}
