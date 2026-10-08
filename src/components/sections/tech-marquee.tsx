"use client";

import { motion } from "motion/react";
import { TECH_MARQUEE } from "@/data/content";

export function TechMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...TECH_MARQUEE, ...TECH_MARQUEE];

  return (
    <section
      id="tech"
      aria-label="05 Tech / Stack"
      className="relative py-24 sm:py-32 border-t border-[var(--border-line)] overflow-hidden"
    >
      <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-12 mb-12 sm:mb-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-[var(--border-line)]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase">
              05
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              Tech & Tooling
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mt-2 sm:mt-0">
            Applied AI · Full-Stack Stack
          </span>
        </motion.div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden group py-4">
        {/* Edge Gradient Masks for Soft Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-[var(--canvas)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-[var(--canvas)] to-transparent" />

        {/* Marquee Track with CSS animation pausing/slowing on hover */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="mx-3 sm:mx-4 flex items-center gap-3 px-5 py-3 rounded-full border border-[var(--border-line)] bg-[var(--surface)] hover:border-[#FF3355] transition-colors duration-200"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF3355]" />
              <span className="font-medium text-sm sm:text-base text-foreground tracking-tight whitespace-nowrap">
                {item.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] border-l border-[var(--border-line)] pl-2.5">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
