"use client";

import { motion } from "motion/react";
import { TECH_MARQUEE } from "@/data/content";

export function TechMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...TECH_MARQUEE, ...TECH_MARQUEE];

  return (
    <section
      id="tech"
      aria-label="06 Previously trusted by / Stack"
      className="relative py-14 sm:py-18 border-t border-[#E5E3DB] overflow-hidden bg-[var(--canvas)]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 mb-8 sm:mb-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-[#E5E3DB]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase font-semibold">
              06
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A0A0A]">
              Previously trusted by / Core Stack
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mt-2 sm:mt-0">
            Applied AI & Full-Stack Tooling
          </span>
        </motion.div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden group py-4"
      >
        {/* Edge Gradient Masks for Soft Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-[#ECEAE3] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-[#ECEAE3] to-transparent" />

        {/* Marquee Track with CSS animation pausing/slowing on hover */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="mx-3 sm:gap-3 flex items-center gap-3 px-5 py-3 rounded-full border border-[#E5E3DB] bg-white text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors duration-200 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF3355]" />
              <span className="font-medium text-sm sm:text-base tracking-tight whitespace-nowrap">
                {item.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6E6A] border-l border-[#E5E3DB] pl-2.5">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
