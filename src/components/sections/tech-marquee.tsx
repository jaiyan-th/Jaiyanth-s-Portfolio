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
      className="relative py-14 sm:py-20 border-t-2 border-[#0A0A0A] overflow-hidden bg-transparent"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 mb-8 sm:mb-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b-2 border-[#0A0A0A]"
        >
          <div className="flex items-baseline gap-4">
            <span className="neo-stamp px-2.5 py-0.5 rounded-md bg-[#FFE600] text-xs sm:text-sm text-[#0A0A0A] tracking-wider uppercase font-extrabold">
              06
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A0A0A]">
              Previously trusted by / Core Stack
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#525252] font-semibold mt-2 sm:mt-0">
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

        {/* Marquee Track with Neo-Brutalist Chips */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="mx-3.5 flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-[#0A0A0A] bg-white text-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] hover:bg-[#FFE600] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#0A0A0A] transition-all duration-150 cursor-default"
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-accent border border-black" />
              <span className="font-extrabold text-sm sm:text-base tracking-tight whitespace-nowrap">
                {item.name}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#525252] border-l-2 border-[#0A0A0A] pl-3">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
