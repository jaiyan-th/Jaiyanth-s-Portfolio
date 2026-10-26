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

        {/* Giant Condensed Headline with Googly Eyes */}
        <h2 className="font-impact font-normal uppercase text-[clamp(36px,7.5vw,94px)] text-[#111111] leading-[0.94] tracking-tight max-w-5xl">
          LET&apos;S BUILD A
          <GooglyEyes size={58} />
          SYSTEM THAT MAKES AN IMPACT
        </h2>

        {/* Subtitle / Description */}
        <p className="font-sans font-bold text-[16px] sm:text-[19px] text-[#111111] max-w-2xl mt-6 leading-relaxed">
          From deterministic vector retrieval to production-ready user interfaces — crafting reliable software where artificial intelligence delivers tangible value.
        </p>

        {/* Bottom CTA Pill */}
        <div className="mt-8">
          <a
            href="/#work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#FFD13B] text-[#111111] font-display font-extrabold text-[14px] sm:text-[15px] uppercase tracking-wide border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>See The Case Studies</span>
            <span className="text-[16px]">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
