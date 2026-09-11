"use client";

import * as React from "react";
import { motion } from "motion/react";
import { MapPin, Target, Layers, Sparkles } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import { SectionContainer } from "@/components/layout/section-container";

export function Hero() {
  return (
    <section id="hero" className="relative bg-canvas text-foreground pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24 border-b-[3px] border-line scroll-mt-20 transition-colors">
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Hero Copy (Left 7-8 cols) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="lg:col-span-7 xl:col-span-8 space-y-7 sm:space-y-8"
          >
            {/* Rotated sticker badge near headline */}
            <div className="inline-block">
              <span className="sticker-badge bg-[#A3E635] text-[#0A0A0A] -rotate-2 text-xs sm:text-sm py-1.5 px-3">
                <span className="w-2 h-2 rounded-full bg-[#0A0A0A] animate-pulse" />
                AVAILABLE FOR NEW ROLES
              </span>
            </div>

            {/* Headline with ONE accent word (matters) in italic lime green */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.75rem] font-extrabold leading-[1.05] tracking-tight text-foreground">
              Engineering that doesn&apos;t break when it{" "}
              <span className="italic text-[#A3E635]">matters.</span>
            </h1>

            {/* Subhead */}
            <p className="font-body text-lg sm:text-xl lg:text-[1.3rem] text-text-secondary leading-relaxed max-w-2xl xl:max-w-3xl font-normal">
              Applied AI, full-stack systems, and structured APIs — built to actually work when someone else has to rely on them.
            </p>

            {/* CTAs */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="neo-btn-primary px-8 py-4 sm:px-9 sm:py-4.5 inline-flex items-center justify-center text-sm sm:text-base font-bold cursor-pointer"
              >
                GET IN TOUCH
              </a>
              <a
                href="#work"
                className="font-body text-base sm:text-lg font-semibold text-foreground underline underline-offset-4 decoration-2 decoration-foreground hover:text-[#A3E635] hover:decoration-[#A3E635] transition-colors inline-flex items-center gap-1.5"
              >
                See the work →
              </a>
            </div>
          </motion.div>

          {/* Asymmetrically Placed Stat Card (Right 5-4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 xl:col-span-4 w-full"
          >
            <div className="neo-card p-6 sm:p-7 lg:p-8 relative w-full">
              {/* Card top tape / tag */}
              <div className="flex items-center justify-between border-b-2 border-line pb-3.5">
                <span className="font-label-caps text-xs sm:text-[13px] tracking-wider text-text-secondary">
                  QUICK SNAPSHOT
                </span>
                <span className="sticker-badge bg-[#A3E635] text-[#0A0A0A] text-[11px] py-0.5 px-2.5 rotate-1">
                  2026
                </span>
              </div>

              {/* Field rows with identical vertical spacing and exact midpoint dividers */}
              <div className="divide-y-[1.5px] divide-line">
                {/* Location */}
                <div className="pt-4 pb-4 sm:pt-4.5 sm:pb-4.5">
                  <div className="flex items-center gap-1.5 font-label-caps text-[11px] sm:text-xs text-text-secondary mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>LOCATION</span>
                  </div>
                  <p className="font-body text-sm sm:text-base font-semibold text-foreground leading-snug">
                    Karur, Tamil Nadu, India
                  </p>
                </div>

                {/* Focus */}
                <div className="pt-4 pb-4 sm:pt-4.5 sm:pb-4.5">
                  <div className="flex items-center gap-1.5 font-label-caps text-[11px] sm:text-xs text-text-secondary mb-1.5">
                    <Target className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>FOCUS</span>
                  </div>
                  <p className="font-body text-sm sm:text-base font-semibold text-foreground leading-snug">
                    Applied AI · Full-Stack Engineering
                  </p>
                </div>

                {/* Stack */}
                <div className="pt-4 pb-4 sm:pt-4.5 sm:pb-4.5">
                  <div className="flex items-center gap-1.5 font-label-caps text-[11px] sm:text-xs text-text-secondary mb-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>STACK</span>
                  </div>
                  <p className="font-mono-code text-xs sm:text-sm font-bold text-foreground leading-relaxed">
                    Python · SQL · LangChain · LLM Integration
                  </p>
                </div>

                {/* Status */}
                <div className="pt-4 sm:pt-4.5">
                  <div className="flex items-center gap-1.5 font-label-caps text-[11px] sm:text-xs text-text-secondary mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>STATUS</span>
                  </div>
                  <div className="bg-surface-secondary border-[1.5px] border-line px-4 py-3">
                    <p className="font-body text-xs sm:text-sm font-semibold text-foreground leading-snug">
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
