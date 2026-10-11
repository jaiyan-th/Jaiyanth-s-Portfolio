"use client";

import { motion } from "motion/react";
import { HOW_I_WORK } from "@/data/content";

export function HowIWork() {
  return (
    <section
      id="process"
      aria-label="04 How I work"
      className="relative py-24 sm:py-32 border-t border-[#E2DFD7] bg-[var(--canvas)] perspective-1200"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-6 border-b border-[#E2DFD7]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-base sm:text-lg text-[#E5341B] tracking-widest uppercase font-extrabold">
              04
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
              How I work?
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666] mt-2 sm:mt-0">
            Process & Delivery
          </span>
        </motion.div>

        {/* Section Subhead & Supporting Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14 sm:mb-16"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0A0A0A] tracking-[-0.02em] mb-3">
            What working together actually looks like.
          </h3>
          <p className="text-base sm:text-lg text-[#555555] font-normal leading-relaxed">
            I work closely with teams when there’s a team, and own the process end-to-end when working independently, staying close to the product, constraints, and engineering decisions.
          </p>
        </motion.div>

        {/* Four Steps Grid (H. 01 – H. 04): 3D Perspective Flip */}
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
              className="group p-6 sm:p-7 rounded-md bg-white hard-shadow flex flex-col justify-between"
            >
              <div>
                {/* Step Marker */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E2DFD7]">
                  <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-bold">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono text-[#666666] uppercase font-semibold">
                    Stage 0{index + 1}
                  </span>
                </div>

                {/* Step Title */}
                <h4 className="text-base sm:text-lg font-bold tracking-tight text-[#0A0A0A] mb-3 group-hover:text-[#E5341B] transition-colors">
                  {item.title}
                </h4>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-normal mb-6">
                  {item.description}
                </p>
              </div>

              {/* Concrete Deliverable */}
              <div className="pt-4 border-t border-[#E2DFD7]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] font-bold block mb-1">
                  Deliverable
                </span>
                <span className="text-xs font-mono text-[#0A0A0A] font-semibold">
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
