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
      className="relative py-14 sm:py-20 border-t-2 border-[#0A0A0A] bg-transparent"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 sm:mb-12 pb-6 border-b-2 border-[#0A0A0A]"
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
          className="max-w-4xl mb-14 sm:mb-16"
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
          <p className="text-base sm:text-lg text-[#666666] font-normal leading-relaxed max-w-3xl">
            I work best where the stakes are real and the data is dense. My job is to remove the friction, so the next decision comes faster.
          </p>
        </motion.div>

        {/* Three Labeled Points (A, B, C) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
                className="group flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  {/* Neo-Brutalist Stamp & Tagline Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E6E3DC]/80">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-mono font-black text-sm tracking-tight ${meta.stampBg}`}
                      >
                        {point.letter}
                      </span>
                      <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#0A0A0A]/60">
                        {meta.tagline}
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#E6E3DC] group-hover:bg-[#0A0A0A] transition-colors duration-200" />
                  </div>

                  {/* Point Title */}
                  <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A0A0A] leading-snug mb-3 group-hover:text-accent transition-colors">
                    {point.title}
                  </h4>

                  {/* Point Description */}
                  <p className="text-sm text-[#525252] leading-relaxed font-normal mb-6">
                    {point.description}
                  </p>
                </div>

                {/* Neo-Brutal Tag Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E6E3DC]/80">
                  {point.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-[#F5F3EE] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
