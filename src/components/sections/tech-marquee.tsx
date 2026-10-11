"use client";

import { motion } from "motion/react";
import { TECH_MARQUEE } from "@/data/content";

export function TechMarquee() {
  const marqueeItems = [...TECH_MARQUEE, ...TECH_MARQUEE];

  return (
    <section
      id="tech"
      aria-label="06 Previously trusted by / Stack"
      className="relative py-14 sm:py-20 border-t border-[#E6E3DC] overflow-hidden bg-transparent"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 mb-8 sm:mb-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-[#E6E3DC]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-accent tracking-widest uppercase font-semibold">
              06
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A0A0A]">
              Previously trusted by / Core Stack
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666] mt-2 sm:mt-0">
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
        {/* Edge Gradient Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-[var(--canvas)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-[var(--canvas)] to-transparent" />

        {/* Marquee Track with Typographic Flow (No boxes, no borders) */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="mx-6 sm:mx-8 flex items-baseline gap-2.5 cursor-default select-none"
            >
              <span className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight text-[#0A0A0A]">
                {item.name}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#888888] font-medium">
                /{item.category}
              </span>
              <span className="text-[#CCCCCC] ml-6 sm:ml-8 font-mono text-sm">✦</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
