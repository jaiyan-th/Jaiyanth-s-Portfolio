"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Marquee } from "@/components/ui/marquee";

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

  const specRows = [
    { label: "BASED", value: "Karur, TN, India" },
    { label: "MODE", value: "Remote · Intl" },
    { label: "ENGAGE", value: "Full-time / Internship" },
    { label: "STACK", value: "Python · Next.js · Supabase" },
    { label: "STATUS", value: "● Available" },
  ];

  return (
    <section id="hero" className="relative bg-[#EFEFEA] text-black border-b-2 border-black pt-12 pb-10 lg:pt-16 lg:pb-14">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        {/* Top Grid: Headline on Left, Spec Card on Right */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline & Subtext */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow: ■ SOFTWARE ENGINEER · BUILDER */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00A8C6] border border-black inline-block" />
              <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
                SOFTWARE ENGINEER · BUILDER
              </span>
            </motion.div>

            {/* Display Headline (karolbinkow.ski proportions) */}
            <motion.div variants={itemVariants}>
              <h1 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl xl:text-[52px] text-black leading-[1.08] tracking-tight uppercase">
                YOU HAVE A PROBLEM. <br />
                <span className="bg-[#00B2D6] text-black px-2.5 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000] mt-1.5">
                  I HAVE THE SOLUTION.
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p variants={itemVariants} className="max-w-lg font-sans text-sm sm:text-base text-black/80 leading-relaxed font-semibold">
              I work across full-stack architecture, applied AI workflows, structured APIs, and intuitive interfaces to turn complex engineering problems into dependable, production-ready solutions.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 pt-2">
              <motion.a
                href="#work"
                whileHover={{ y: -2, x: -1, boxShadow: "5px 5px 0px #000000" }}
                whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                className="bg-[#00B2D6] hover:bg-[#0092B0] text-black font-mono text-xs font-black tracking-wider uppercase px-6 py-3.5 border-2 border-black shadow-[4px_4px_0px_#000000] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2, x: -1, boxShadow: "5px 5px 0px #000000" }}
                whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                className="bg-white hover:bg-[#EFEFEA] text-black font-mono text-xs font-black tracking-wider uppercase px-6 py-3.5 border-2 border-black shadow-[4px_4px_0px_#000000] transition-all cursor-pointer"
              >
                GET IN TOUCH
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: ENGINEER SPEC Card */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[380px] bg-white border-2 border-black shadow-[5px_5px_0px_#000000]">
              {/* Header */}
              <div className="bg-[#00B2D6] border-b-2 border-black p-3.5">
                <span className="font-mono text-xs font-black uppercase text-black tracking-widest block">
                  ENGINEER SPEC
                </span>
              </div>

              {/* Rows */}
              <div className="divide-y-2 divide-black font-mono text-xs">
                {specRows.map((row) => (
                  <div key={row.label} className="p-3 flex items-center justify-between">
                    <span className="font-black text-black/60 tracking-wider">
                      {row.label}
                    </span>
                    <span className={`font-black ${row.label === "STATUS" ? "text-emerald-700 font-extrabold" : "text-black"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Horizontal Auto-Scrolling Marquee Ticker */}
      <div className="mt-12 border-t-2 border-b-2 border-black bg-white">
        <Marquee />
      </div>
    </section>
  );
}
