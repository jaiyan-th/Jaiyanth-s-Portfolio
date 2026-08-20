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

  // Real proof numbers for stat strip
  const stats = [
    { number: "03", label: "Selected Projects Shipped", detail: "Fake News Detector · Up-Skill · Car-Rent" },
    { number: "01", label: "Focused AI Internship", detail: "Brainery Spot Technology · Jun–Jul 2025" },
    { number: "01", label: "IEEE Research Artifact", detail: "ICETSIS 2026 · Co-Authored Paper" },
    { number: "06", label: "Verified Skill Domains", detail: "Languages · Frontend · Backend · DB · AI · Tools" },
  ];

  // Inline Engineer Spec key-value pairs
  const specItems = [
    { label: "Based", value: "Karur, TN, India" },
    { label: "Mode", value: "Remote-ready / Open to roles" },
    { label: "Engage", value: "Full-time / Internship" },
    { label: "Stack", value: "Python, Next.js, React, Supabase, Flask" },
    { label: "Status", value: "Available 2026" },
  ];

  return (
    <section id="hero" className="relative bg-[#0B0C0E] text-[#F5F3EF] border-b border-[#232323] pt-12 pb-8 lg:pt-20 lg:pb-12 bg-grid">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        {/* Top Eyebrow Tag */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#6D2932] animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-widest text-[#9A958D] uppercase">
            SOFTWARE ENGINEER · BUILDER
          </span>
        </motion.div>

        {/* Punchy Conversational Headline (karolbinkow.ski two-beat style) */}
        <motion.div variants={itemVariants} className="max-w-4xl">
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl xl:text-[72px] text-[#F5F3EF] leading-[1.04] tracking-tight uppercase">
            YOU HAVE A PROBLEM. <br />
            I DESIGN THE <span className="italic font-serif text-[#6D2932]">SYSTEM.</span>
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-base sm:text-lg text-[#9A958D] leading-relaxed font-normal">
            I build applied AI workflows, full-stack products, structured APIs, and data-driven systems that turn complex requirements into clean, dependable software.
          </p>
        </motion.div>

        {/* Inline Engineer Spec List (Plain Label/Value Pairs, No Boxed Panel) */}
        <motion.div variants={itemVariants} className="border-y border-[#232323] py-6 my-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 font-mono text-xs">
            {specItems.map((item) => (
              <div key={item.label} className="space-y-1">
                <span className="text-[#9A958D] text-[10px] font-bold uppercase tracking-widest block">
                  {item.label}
                </span>
                <span className="text-[#F5F3EF] font-semibold text-[11.5px] block truncate">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 pt-2">
          <motion.a
            href="#work"
            whileHover={{ x: 3 }}
            className="bg-[#6D2932] hover:bg-[#582027] text-white font-mono text-xs font-bold uppercase tracking-widest px-6 py-3.5 border border-[#6D2932] inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>VIEW SELECTED WORK</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ x: 2 }}
            className="font-mono text-xs font-bold uppercase tracking-widest text-[#9A958D] hover:text-[#F5F3EF] transition-colors py-3.5"
          >
            START A CONVERSATION →
          </motion.a>
        </motion.div>

        {/* Proof, Not Adjectives Stat Strip */}
        <motion.div variants={itemVariants} className="pt-8">
          <div className="border-t border-[#232323] pt-8">
            <span className="font-mono text-[10px] font-bold text-[#9A958D] uppercase tracking-widest block mb-6">
              // PROOF OF EXECUTION
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((st) => (
                <div key={st.label} className="border-l-2 border-[#6D2932] pl-4 space-y-1">
                  <span className="font-heading font-black text-3xl sm:text-4xl text-[#F5F3EF] block leading-none">
                    {st.number}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#F5F3EF] uppercase tracking-wider block">
                    {st.label}
                  </span>
                  <span className="font-sans text-xs text-[#9A958D] block font-normal">
                    {st.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Horizontal Auto-Scrolling Marquee Ticker */}
      <div className="mt-14 border-t border-b border-[#232323] bg-[#0B0C0E]/80">
        <Marquee />
      </div>
    </section>
  );
}
