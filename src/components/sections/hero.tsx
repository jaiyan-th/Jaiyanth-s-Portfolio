"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { IDENTITY } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="hero" className="relative bg-[#FCFBF9] text-[#1A1A1A] py-20 md:py-28 lg:py-36 border-b border-[#E5E2DC] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Single Quiet Masthead Line */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 pb-12 mb-12 border-b border-[#E5E2DC] text-[#6B6B6B] font-label text-[11px] tracking-[0.14em] uppercase"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5F4E]" />
            <span>{IDENTITY.location} — Available for Roles</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline text-[#6B6B6B]">Applied AI · Full-Stack</span>
            <a
              href="#work"
              className="text-[#1A1A1A] hover:text-[#2D5F4E] transition-colors inline-flex items-center gap-1"
            >
              <span>Selected Work</span>
              <ArrowDownRight className="w-3.5 h-3.5 text-[#2D5F4E]" />
            </a>
          </div>
        </motion.div>

        {/* Main Editorial Statement & Lead */}
        <div className="max-w-4xl space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal leading-[1.08] tracking-[-0.02em] text-[#1A1A1A]"
          >
            Engineering intelligent products from{" "}
            <span className="italic text-[#2D5F4E]">signal</span> to system.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg text-[#6B6B6B] leading-relaxed max-w-[640px] font-normal"
          >
            {IDENTITY.heroSupporting}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 flex flex-wrap items-center gap-6 text-sm"
          >
            <a
              href="#contact"
              className="font-label text-xs tracking-[0.14em] uppercase px-5 py-2.5 bg-[#2D5F4E] text-white hover:bg-[#234b3d] transition-colors"
            >
              Get in touch
            </a>
            <a
              href="#about"
              className="font-label text-xs tracking-[0.14em] uppercase text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-1.5"
            >
              <span>About background</span>
              <span className="text-[#2D5F4E]">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
