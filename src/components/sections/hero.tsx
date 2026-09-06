"use client";

import * as React from "react";
import { motion } from "motion/react";
import { MapPin, Layers, Sparkles } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";

export function Hero() {
  return (
    <section id="hero" className="relative bg-[#FAF3EE] text-[#111111] py-16 md:py-24 border-b-[3px] border-[#111111] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Main Hero Copy (Left 8 cols) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="lg:col-span-8 space-y-6"
          >
            {/* Rotated sticker badge near headline */}
            <div className="inline-block">
              <span className="sticker-badge bg-[#D9622B] text-white -rotate-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                AVAILABLE FOR ROLES
              </span>
            </div>

            {/* Headline with marker highlight */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight text-[#111111]">
              I turn ambiguous problems into production-ready{" "}
              <span className="marker-highlight inline-block text-[#111111] font-extrabold border-b-[3px] border-[#B91C1C]">
                software.
              </span>
            </h1>

            {/* Subhead (2 lines max) */}
            <p className="font-body text-lg sm:text-xl text-[#333333] leading-relaxed max-w-[620px] font-normal">
              I build applied-AI workflows, full-stack products, and structured APIs that hold up in production — not just in a demo.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="neo-btn-primary px-7 py-3.5 inline-flex items-center justify-center text-sm cursor-pointer"
              >
                GET IN TOUCH
              </a>
              <a
                href="#work"
                className="font-body text-base font-semibold text-[#111111] underline underline-offset-4 decoration-2 decoration-[#B91C1C] hover:text-[#B91C1C] transition-colors inline-flex items-center gap-1"
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
            className="lg:col-span-4 lg:mt-4"
          >
            <div className="neo-card p-6 space-y-5 relative bg-white">
              {/* Card top tape / tag */}
              <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3">
                <span className="font-label-caps text-[10px] text-[#555555]">
                  QUICK SNAPSHOT
                </span>
                <span className="sticker-badge bg-[#111111] text-white text-[9px] py-0.5 px-2 rotate-1">
                  2026
                </span>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-label-caps text-[10px] text-[#777777]">
                  <MapPin className="w-3.5 h-3.5 text-[#B91C1C]" />
                  <span>LOCATION</span>
                </div>
                <p className="font-body text-sm font-semibold text-[#111111]">
                  Karur, Tamil Nadu, India
                </p>
              </div>

              {/* Stack */}
              <div className="space-y-1 border-t-[1.5px] border-[#111111]/20 pt-3">
                <div className="flex items-center gap-1.5 font-label-caps text-[10px] text-[#777777]">
                  <Layers className="w-3.5 h-3.5 text-[#D9622B]" />
                  <span>STACK</span>
                </div>
                <p className="font-mono-code text-xs font-bold text-[#111111]">
                  Python · Next.js · Supabase
                </p>
              </div>

              {/* Status */}
              <div className="space-y-1 border-t-[1.5px] border-[#111111]/20 pt-3">
                <div className="flex items-center gap-1.5 font-label-caps text-[10px] text-[#777777]">
                  <Sparkles className="w-3.5 h-3.5 text-[#B91C1C]" />
                  <span>STATUS</span>
                </div>
                <p className="font-body text-xs font-semibold text-[#111111] bg-[#FAF3EE] border-[1.5px] border-[#111111] p-2">
                  Open to full-time &amp; internship roles
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
