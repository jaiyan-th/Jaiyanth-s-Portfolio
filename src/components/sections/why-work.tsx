"use client";

import { motion } from "motion/react";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { WHY_WORK_WITH_ME } from "@/data/content";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
          {WHY_WORK_WITH_ME.map((point, index) => (
            <motion.div
              key={point.letter}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col justify-between p-7 sm:p-8 rounded-2xl border-2 border-[#0A0A0A] bg-white shadow-[5px_5px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#0A0A0A] transition-all duration-200"
            >
              <div>
                {/* Labeled Letter Identifier */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E6E3DC]">
                  <span className="font-mono text-2xl font-bold text-accent">
                    {point.letter}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#E6E3DC] group-hover:bg-accent transition-colors" />
                </div>

                {/* Point Title */}
                <h4 className="text-lg sm:text-xl font-medium tracking-tight text-[#0A0A0A] mb-3 group-hover:text-accent transition-colors">
                  {point.title}
                </h4>

                {/* Point Description */}
                <p className="text-sm text-[#666666] leading-relaxed font-normal mb-6">
                  {point.description}
                </p>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E6E3DC]">
                {point.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#FAF9F5] text-[#666666] border border-[#E6E3DC]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
