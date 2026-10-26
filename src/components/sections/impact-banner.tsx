"use client";

import { motion } from "motion/react";
import { GooglyEyes } from "@/components/ui/googly-eyes";

export function ImpactBanner() {
  return (
    <section
      aria-label="Impact Callout Banner"
      className="relative w-full bg-[#4DE07C] border-y-2 border-[#111111] py-14 sm:py-20 px-5 sm:px-8 overflow-hidden select-none"
    >
      <div className="site-container max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#111111]" />
          <span className="font-mono text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-[#111111]">
            ENGINEERING PHILOSOPHY
          </span>
        </div>

        {/* Simple Medium Headline with Googly Eyes */}
        <h2 className="font-sans font-extrabold uppercase text-[clamp(22px,3.2vw,36px)] text-[#111111] leading-tight tracking-tight max-w-4xl">
          LET&apos;S BUILD A
          <GooglyEyes size={36} />
          SYSTEM THAT MAKES AN IMPACT
        </h2>

        {/* Subtitle / Description */}
        <p className="font-sans text-[14.5px] sm:text-[16px] text-[#111111] max-w-xl mt-4 leading-relaxed font-medium">
          From deterministic vector retrieval to production-ready user interfaces — crafting reliable software where artificial intelligence delivers tangible value.
        </p>

        {/* Bottom CTA Pill */}
        <div className="mt-6">
          <a
            href="/#work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#FFD13B] text-[#111111] font-sans font-bold text-[13px] sm:text-[14px] uppercase tracking-wide border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>See The Case Studies</span>
            <span className="text-[14px]">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
