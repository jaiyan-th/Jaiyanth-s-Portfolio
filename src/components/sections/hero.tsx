"use client";

import * as React from "react";
import { motion } from "motion/react";
import { MapPin, Target, Layers, Sparkles } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import { SectionContainer } from "@/components/layout/section-container";

export function Hero() {
  return (
    <section id="hero" className="relative bg-[#FAF3EE] text-[#111111] pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24 border-b-[3px] border-[#111111] scroll-mt-20">
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Main Hero Copy (Left 8 cols) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="lg:col-span-8 space-y-7 sm:space-y-8"
          >
            {/* Rotated sticker badge near headline */}
            <div className="inline-block">
              <span className="sticker-badge bg-[#111111] text-white -rotate-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                AVAILABLE FOR NEW ROLES
              </span>
            </div>

            {/* Headline with ONE accent word (matters) in italic orange */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[3.65rem] xl:text-[4rem] font-extrabold leading-[1.08] tracking-tight text-[#111111]">
              Engineering that doesn&apos;t break when it{" "}
              <span className="italic text-[#D9622B]">matters.</span>
            </h1>

            {/* Subhead */}
            <p className="font-body text-base sm:text-xl lg:text-[1.25rem] text-[#333333] leading-relaxed max-w-[560px] font-normal">
              Applied AI, full-stack systems, and structured APIs — built to actually work when someone else has to rely on them.
            </p>

            {/* CTAs */}
            <div className="pt-2 sm:pt-5 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="neo-btn-primary px-7 py-3.5 sm:px-8 sm:py-4 inline-flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                GET IN TOUCH
              </a>
              <a
                href="#work"
                className="font-body text-base font-semibold text-[#111111] underline underline-offset-4 decoration-2 decoration-[#111111] hover:opacity-75 transition-opacity inline-flex items-center gap-1"
              >
                See the work →
              </a>
            </div>
          </motion.div>

          {/* Asymmetrically Placed Stat Card (Right 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-4"
          >
            <div className="neo-card p-5 sm:p-6 lg:p-7 relative bg-white">
              {/* Card top tape / tag */}
              <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3.5">
                <span className="font-label-caps text-[11px] tracking-wider text-[#555555]">
                  QUICK SNAPSHOT
                </span>
                <span className="sticker-badge bg-[#111111] text-white text-[10px] py-0.5 px-2 rotate-1">
                  2026
                </span>
              </div>

              {/* Field rows with identical vertical spacing and exact midpoint dividers */}
              <div className="divide-y-[1.5px] divide-[#111111]/15">
                {/* Location */}
                <div className="pt-3.5 pb-3.5 sm:pt-4 sm:pb-4">
                  <div className="flex items-center gap-1.5 font-label-caps text-[10px] sm:text-[11px] text-[#777777] mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#111111]" />
                    <span>LOCATION</span>
                  </div>
                  <p className="font-body text-sm sm:text-[15px] font-semibold text-[#111111] leading-snug">
                    Karur, Tamil Nadu, India
                  </p>
                </div>

                {/* Focus */}
                <div className="pt-3.5 pb-3.5 sm:pt-4 sm:pb-4">
                  <div className="flex items-center gap-1.5 font-label-caps text-[10px] sm:text-[11px] text-[#777777] mb-1.5">
                    <Target className="w-3.5 h-3.5 text-[#111111]" />
                    <span>FOCUS</span>
                  </div>
                  <p className="font-body text-sm sm:text-[15px] font-semibold text-[#111111] leading-snug">
                    Applied AI · Full-Stack Engineering
                  </p>
                </div>

                {/* Stack */}
                <div className="pt-3.5 pb-3.5 sm:pt-4 sm:pb-4">
                  <div className="flex items-center gap-1.5 font-label-caps text-[10px] sm:text-[11px] text-[#777777] mb-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#111111]" />
                    <span>STACK</span>
                  </div>
                  <p className="font-mono-code text-xs sm:text-[13px] font-bold text-[#111111] leading-relaxed">
                    Python · SQL · LangChain · LLM Integration
                  </p>
                </div>

                {/* Status */}
                <div className="pt-3.5 sm:pt-4">
                  <div className="flex items-center gap-1.5 font-label-caps text-[10px] sm:text-[11px] text-[#777777] mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
                    <span>STATUS</span>
                  </div>
                  <div className="bg-[#FAF3EE] border-[1.5px] border-[#111111] px-3.5 py-2.5 sm:px-4 sm:py-2.5">
                    <p className="font-body text-xs sm:text-[13px] font-semibold text-[#111111] leading-snug">
                      Open to full-time &amp; internship roles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}
