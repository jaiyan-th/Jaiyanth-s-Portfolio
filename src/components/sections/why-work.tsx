"use client";

import { motion } from "motion/react";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { WHY_WORK_WITH_ME } from "@/data/content";

const CARD_METAS = [
  {
    stampBg: "bg-[#FFE600] text-[#0A0A0A]",
    tagline: "// 01 · PRODUCTION AI",
  },
  {
    stampBg: "bg-[#00E599] text-[#0A0A0A]",
    tagline: "// 02 · ARCHITECTURE",
  },
  {
    stampBg: "bg-[#00F0FF] text-[#0A0A0A]",
    tagline: "// 03 · RIGOUR & VELOCITY",
  },
];

export function WhyWork() {
  return (
    <section
      id="why-work"
      aria-label="05 Why work with me"
      className="relative py-14 sm:py-20 border-t border-[#E6E3DC] bg-transparent"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 sm:mb-12 pb-6 border-b border-[#E6E3DC]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-accent tracking-widest uppercase font-semibold">
              05
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A0A0A]">
              Why Work With Me?
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666] mt-2 sm:mt-0">
            Strategy & Craft
          </span>
        </motion.div>

        {/* Section Statement */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mb-14 sm:mb-16"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-tight mb-4 text-[#0A0A0A]">
            <RevealHeading
              lines={[
                { text: "Engineers who can hold both ends —" },
                { text: "", accent: "applied AI", afterAccent: " & full-stack systems," },
                { text: "are rare." },
              ]}
            />
          </h3>
          <p className="text-base sm:text-lg text-[#666666] font-normal leading-relaxed max-w-4xl">
            I work best where the stakes are real and the data is dense. My job is to remove the friction, so the next decision comes faster.
          </p>
        </motion.div>

        {/* Three Labeled Points (A, B, C) (Open, clean, no boxes, no borders) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {WHY_WORK_WITH_ME.map((point, index) => {
            const meta = CARD_METAS[index % CARD_METAS.length];
            return (
              <motion.div
                key={point.letter}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-mono text-base font-bold text-accent">
                      /{point.letter}
                    </span>
                    <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#666666]">
                      {meta.tagline}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A0A0A] leading-snug mb-3">
                    {point.title}
                  </h4>

                  <p className="text-sm sm:text-base text-[#525252] leading-relaxed font-normal mb-4">
                    {point.description}
                  </p>
                </div>

                <div className="text-xs font-mono text-[#888888] pt-2">
                  {point.tags.join(" · ")}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
