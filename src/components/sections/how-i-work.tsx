"use client";

import { motion } from "motion/react";
import { HOW_I_WORK } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";

export function HowIWork() {
  return (
    <section
      id="process"
      aria-label="04 How I work"
      className="relative section-padding border-t border-border-line bg-[var(--canvas)] perspective-1200"
    >
      <div className="site-container">
        {/* Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b border-border-line gap-3">
          <div className="space-y-2.5">
            <EyebrowPill accent="PROCESS" text="HOW I WORK & DELIVER" />
            <h2 className="font-sans font-bold text-fluid-h2 text-[#111111] leading-[1.05] tracking-[-0.035em]">
              How I <em className="accent font-serif-italic italic text-accent font-normal accent-underline">Work</em>
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
            Process & Delivery
          </span>
        </Reveal>

        {/* Section Subhead & Supporting Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-6"
        >
          <p className="lead-intro font-sans text-base sm:text-lg text-text-muted leading-relaxed max-w-[62ch]">
            What working together actually looks like — staying close to the product, constraints, and engineering decisions from signal discovery to production release.
          </p>
        </motion.div>

        {/* Four Steps Grid (H. 01 – H. 04): gap 16px, padding 20px */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 perspective-1200">
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
              className="p-5 rounded-2xl bg-white border border-border-line hover:border-[#111111]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FFE8E5] text-accent font-mono text-[11px] uppercase tracking-[0.08em] font-medium mb-3 w-max border border-accent/20">
                  {item.step}
                </span>
                <h3 className="card-title font-sans font-bold text-lg sm:text-xl text-[#111111] mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-[var(--body)] leading-relaxed mb-4 font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border-line">
                <span className="font-mono uppercase tracking-[0.08em] text-text-muted font-medium block text-[11px] mb-1">
                  Deliverable
                </span>
                <span className="font-sans text-xs sm:text-sm font-medium text-[#111111]">
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
