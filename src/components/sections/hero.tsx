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

  // Proof, Not Adjectives Real Numbers Grid
  const proofItems = [
    { title: "03", underline: "projects", desc: "Selected production-ready applications built and shipped.", tag: "FAKE NEWS · UP-SKILL · CAR-RENT" },
    { title: "01", underline: "internship", desc: "Full-stack & applied AI engineering work in real deployment environment.", tag: "BRAINERY SPOT TECH · 2025" },
    { title: "01", underline: "ieee paper", desc: "Co-authored medical AI triage research accepted at ICETSIS 2026.", tag: "ICETSIS 2026 · BAHRAIN" },
    { title: "06", underline: "domains", desc: "Verified skill groups across languages, frontend, backend, databases, & AI.", tag: "LANGS · FE · BE · DB · AI · TOOLS" },
  ];

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

            {/* Display Headline (karolbinkow.ski cyan block highlight style) */}
            <motion.div variants={itemVariants}>
              <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl xl:text-[72px] text-black leading-[1.02] tracking-tight uppercase">
                YOU HAVE A PROBLEM. <br />
                <span className="bg-[#00B2D6] text-black px-3 py-0.5 inline-block border-2 border-black shadow-[4px_4px_0px_#000000] mt-1">
                  I HAVE THE SOLUTION.
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p variants={itemVariants} className="max-w-xl font-sans text-base text-black/80 leading-relaxed font-semibold">
              I work across full-stack architecture, applied AI workflows, structured APIs, and intuitive interfaces to turn complex engineering problems into dependable, production-ready solutions.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 pt-2">
              <motion.a
                href="#work"
                whileHover={{ y: -2, x: -1, boxShadow: "5px 5px 0px #000000" }}
                whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                className="bg-black text-white hover:bg-black/90 font-mono text-xs font-black uppercase tracking-widest px-6 py-3.5 border-2 border-black shadow-[3px_3px_0px_#00B2D6] inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>VIEW SELECTED WORK</span>
                <ArrowRight className="w-4 h-4 text-[#00B2D6]" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ x: 2 }}
                className="font-mono text-xs font-black uppercase tracking-widest text-black hover:text-[#00A8C6] transition-colors py-3.5"
              >
                START A CONVERSATION →
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: ENGINEER SPEC Card (Exact karolbinkow.ski visual spec card) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[420px] bg-white border-2 border-black shadow-[6px_6px_0px_#000000]">
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

        {/* PROOF, NOT ADJECTIVES Grid (Exact karolbinkow.ski 4-Column Grid) */}
        <motion.div variants={itemVariants} className="pt-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-[#00A8C6] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              PROOF, NOT ADJECTIVES
            </span>
          </div>

          {/* Grid Container */}
          <div className="border-2 border-black bg-white shadow-[6px_6px_0px_#000000]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
              {proofItems.map((item) => (
                <div key={item.title} className="p-6 space-y-3">
                  {/* Huge Number Title with Cyan Underline */}
                  <div>
                    <h3 className="font-heading font-black text-5xl text-black inline-block leading-none border-b-4 border-[#00A8C6] pb-1">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-black/90 font-semibold leading-relaxed">
                    {item.desc}
                  </p>

                  <span className="font-mono text-[9.5px] font-black text-black/60 uppercase tracking-wider block pt-2 border-t border-black/10">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-ticker Strip */}
          <div className="mt-4 font-mono text-[10.5px] font-black uppercase text-black/70 tracking-widest text-center py-2 border-t border-b border-black">
            CSBS GRAD 2026 · AI &amp; FULL STACK · IEEE PUBLISHED · OPEN SOURCE CONTRIBUTOR
          </div>
        </motion.div>
      </motion.div>

      {/* Horizontal Auto-Scrolling Marquee Ticker */}
      <div className="mt-12 border-t-2 border-b-2 border-black bg-white">
        <Marquee />
      </div>
    </section>
  );
}
