"use client";

import { motion } from "motion/react";
import { HOW_I_WORK } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

export function HowIWork() {
  return (
    <section
      id="process"
      aria-label="04 How I work"
      className="relative section-padding border-t border-[#0A0A0A]/18 bg-[var(--canvas)] perspective-1200"
    >
      <div className="site-container">
        {/* Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-12 pb-5 border-b border-[#0A0A0A]/18 gap-2">
          <div className="flex items-baseline gap-3 sm:gap-4">
            <span className="text-fluid-mono text-[#E5341B] tracking-widest uppercase font-extrabold">
              04
            </span>
            <h2 className="text-fluid-h2 font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
              How I work?
            </h2>
          </div>
          <span className="text-fluid-mono uppercase tracking-widest text-[#666666]">
            Process & Delivery
          </span>
        </Reveal>

        {/* Section Subhead & Supporting Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <h3 className="text-fluid-h3 font-extrabold text-[#0A0A0A] tracking-[-0.02em] mb-3">
            What working together actually looks like.
          </h3>
          <p className="text-fluid-lead text-[#555555] font-normal leading-relaxed">
            I work closely with teams when there’s a team, and own the process end-to-end when working independently, staying close to the product, constraints, and engineering decisions.
          </p>
        </motion.div>

        {/* Four Steps Grid (H. 01 – H. 04): 4 cols >=1024px, 2 cols on tablets, 1 on phones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1200">
          {HOW_I_WORK.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 28, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="p-6 rounded-xl bg-white border border-[#0A0A0A]/18 hover:border-[#0A0A0A]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FFE8E5] text-[#E5341B] font-mono text-xs font-bold mb-4 w-max">
                  {item.step}
                </span>
                <h4 className="text-base font-bold text-[#0A0A0A] mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-fluid-small text-[#555555] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/16">
                <span className="text-fluid-mono uppercase tracking-wider text-[#888888] font-bold block text-[11px] mb-1">
                  Deliverable
                </span>
                <span className="text-xs font-semibold text-[#0A0A0A]">
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
