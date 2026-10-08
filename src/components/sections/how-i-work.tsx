"use client";

import { motion } from "motion/react";
import { HOW_I_WORK } from "@/data/content";

export function HowIWork() {
  return (
    <section
      id="process"
      aria-label="04 How I work"
      className="relative py-24 sm:py-32 border-t border-[var(--border-line)]"
    >
      <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-12 sm:mb-16 pb-6 border-b border-[var(--border-line)]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase">
              04
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              How I Work
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mt-2 sm:mt-0">
            Methodology & Execution Pipeline
          </span>
        </motion.div>

        {/* Four Steps Grid (H. 01 – H. 04) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {HOW_I_WORK.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group p-6 sm:p-8 rounded-xl border border-[var(--border-line)] bg-[var(--surface)] hover:border-[#FF3355]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step Marker */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--border-line)]">
                  <span className="font-mono text-sm font-semibold text-[#FF3355]">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    Stage 0{index + 1}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-medium tracking-tight text-foreground mb-3 group-hover:text-[#FF3355] transition-colors">
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-light mb-6">
                  {item.description}
                </p>
              </div>

              {/* Concrete Deliverable */}
              <div className="pt-4 border-t border-[var(--border-line)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                  Deliverable
                </span>
                <span className="text-xs font-mono text-foreground font-medium">
                  {item.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
