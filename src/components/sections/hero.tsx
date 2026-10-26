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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-5 select-none"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#111111]">
                Open to Opportunities
              </span>
            </motion.div>

            {/* Clean Simple Medium-Bold Heading that bridges the center gap */}
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-bold text-[clamp(32px,4vw,52px)] text-[#111111] leading-[1.1] tracking-[-0.03em] mb-4 sm:mb-5 select-none max-w-2xl"
            >
              Engineering that doesn’t break when it matters, by someone who’s broken everything first.
            </motion.h1>

            {/* Clean Punchy Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="font-sans text-[16px] sm:text-[18px] text-[#333333] leading-relaxed max-w-2xl mb-6 font-medium"
            >
              I’m Jaiyanth. Every failure I’ve debugged is why my AI products hold up today.
            </motion.p>

            {/* Varying Colored Neo-Brutalist Skill Tags */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="flex flex-wrap gap-2 mb-7 select-none"
            >
              <span className="px-2.5 py-1 rounded-md bg-[#FEF08A] text-[#111111] border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] font-mono text-[11px] font-bold uppercase tracking-wider">
                Production RAG
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#EDE9FE] text-[#111111] border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] font-mono text-[11px] font-bold uppercase tracking-wider">
                LangChain &amp; Vector DB
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#DCFCE7] text-[#111111] border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] font-mono text-[11px] font-bold uppercase tracking-wider">
                Next.js &amp; TS
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#E0F2FE] text-[#111111] border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] font-mono text-[11px] font-bold uppercase tracking-wider">
                Python &amp; FastAPI
              </span>
            </motion.div>

            {/* Actions: "LET'S TALK" Boxed Button + Doodle Arrow + Socials */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="flex flex-wrap items-center gap-4 sm:gap-5 relative"
            >
              {/* Boxed Neo-Brutalist "LET'S TALK" Button */}
              <div className="relative group">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-[#FFD13B] translate-x-1.5 translate-y-1.5 border-2 border-[#111111] transition-transform duration-200 group-hover:translate-x-2 group-hover:translate-y-2"
                />
                <a
                  href="/#contact"
                  className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white hover:bg-white text-[#111111] font-sans font-bold text-[14px] sm:text-[15px] tracking-wide uppercase border-2 border-[#111111] transition-all duration-200 active:translate-x-1 active:translate-y-1 select-none"
                >
                  LET&apos;S TALK
                </a>
              </div>

              {/* Doodle Arrow pointing playfully at the button */}
              <div className="hidden sm:block absolute -top-9 left-[150px] pointer-events-none">
                <DoodleArrow width={58} height={38} />
              </div>

              {/* Secondary Actions with Varying Colors */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <a
                  href="/#work"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#111111] font-sans text-[13px] font-bold border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
                >
                  <span>Explore Work</span>
                  <span className="text-[12px]">↓</span>
                </a>

                <a
                  href={IDENTITY.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#FEF08A] text-[#111111] font-sans text-[13px] font-bold border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={IDENTITY.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#111111] font-sans text-[13px] font-bold border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Playful Smiley Sticker Cluster (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center lg:items-center z-10 pt-4 lg:pt-0">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-sm border-2 border-[#111111] shadow-[6px_6px_0px_#111111]"
            >
              {/* Quote Top: Above Emoji */}
              <div className="mb-4 pb-3 border-b-2 border-[#111111]">
                <span className="font-mono text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-[#111111] block">
                  &ldquo;The best way to predict the future&rdquo;
                </span>
              </div>

              {/* The Smiley Cluster */}
              <SmileyCluster />

              {/* Quote Bottom: Below Emoji */}
              <div className="mt-4 pt-3 border-t-2 border-[#111111]">
                <span className="font-mono text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-[#111111] block">
                  &ldquo;...is to invent it.&rdquo;
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
