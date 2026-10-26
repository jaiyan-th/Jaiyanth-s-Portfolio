"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { IDENTITY } from "@/data/content";
import { SmileyCluster } from "@/components/ui/smiley-cluster";
import { DoodleArrow } from "@/components/ui/doodle-arrow";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-[92vh] flex flex-col justify-center bg-[#F5F0E6] pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 overflow-hidden"
    >
      <div className="site-container max-w-7xl mx-auto w-full px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Big Bold Typography & CTA (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Status Pill Badge */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-6 select-none"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#4DE07C] animate-pulse" />
              <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider font-bold text-[#111111]">
                AI &amp; Full-Stack Engineer · Chennai, IN
              </span>
            </motion.div>

            {/* Giant Ultra-Bold Condensed Agency Headline */}
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold text-[clamp(40px,6.8vw,88px)] text-[#111111] leading-[0.98] tracking-[-0.035em] mb-6 sm:mb-7 select-none"
            >
              Engineering applied AI in the production age.
            </motion.h1>

            {/* Clean Punchy Subtitle Description */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-[16px] sm:text-[18px] text-[#333333] leading-relaxed max-w-xl mb-8 sm:mb-9 font-medium"
            >
              Driving product impact through production RAG architectures, deterministic agent workflows, and verified full-stack applications built to scale.
            </motion.p>

            {/* Actions: "LET'S TALK" Boxed Button + Doodle Arrow + Socials */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-5 sm:gap-6 relative"
            >
              {/* Boxed Neo-Brutalist "LET'S TALK" Button with Double Outline */}
              <div className="relative group">
                {/* Hand-drawn sketch offset background frame */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-[#FFD13B] translate-x-1.5 translate-y-1.5 border-2 border-[#111111] transition-transform duration-200 group-hover:translate-x-2 group-hover:translate-y-2"
                />
                <a
                  href="/#contact"
                  className="relative inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white hover:bg-white text-[#111111] font-display font-extrabold text-[15px] sm:text-[16px] tracking-wide uppercase border-2 border-[#111111] transition-all duration-200 active:translate-x-1 active:translate-y-1 select-none"
                >
                  LET&apos;S TALK
                </a>
              </div>

              {/* Doodle Arrow pointing playfully at the button */}
              <div className="hidden sm:block absolute -top-10 left-[165px] pointer-events-none">
                <DoodleArrow width={64} height={42} />
              </div>

              {/* Secondary Actions: View Work & Socials */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <a
                  href="/#work"
                  className="inline-flex items-center gap-1.5 px-4 sm:px-4.5 py-2.5 rounded-xl bg-white hover:bg-[#F0ECE1] text-[#111111] font-sans text-[13px] sm:text-[14px] font-bold border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
                >
                  <span>Explore Work</span>
                  <span className="text-[12px]">↓</span>
                </a>

                <a
                  href={IDENTITY.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#F0ECE1] text-[#111111] font-sans text-[13px] sm:text-[14px] font-bold border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={IDENTITY.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#F0ECE1] text-[#111111] font-sans text-[13px] sm:text-[14px] font-bold border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Playful Smiley Sticker Cluster (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center lg:items-end z-10 pt-4 lg:pt-0">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-sm border-2 border-[#111111] shadow-[6px_6px_0px_#111111]"
            >
              {/* Fun Category Badge on Card */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#111111]">
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#111111]">
                  AI CREATIVE ENGINE
                </span>
                <span className="font-mono text-[11px] font-bold text-[#6C47FF] bg-[#ECE7FF] px-2 py-0.5 rounded-md border border-[#111111]">
                  ✦ 2026 EDITION
                </span>
              </div>

              {/* The Smiley Cluster */}
              <SmileyCluster />

              {/* Bottom Quote / Tagline */}
              <div className="mt-4 pt-3 border-t-2 border-[#111111] flex items-center justify-between">
                <span className="font-sans font-extrabold text-[12px] sm:text-[13px] text-[#111111]">
                  Human-centered · High-assurance
                </span>
                <span className="font-mono text-[11px] text-[#555555]">
                  94.2% Verified
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
