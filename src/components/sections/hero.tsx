"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SnapshotCard } from "./snapshot-card";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldReduceMotion]);

  // Parallax calculations (clamped)
  const h1TranslateX = shouldReduceMotion ? 0 : Math.max(-60, -scrollY * 0.15);

  // 3 distinct lines for line-by-line reveal
  const headlineLines = [
    { text: "Applied ", hasAI: true, endText: " engineering" },
    { text: "for complex systems", hasAI: false, endText: "" },
    { text: "that feel obvious", hasAI: false, endText: "" },
  ];

  const badgeVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : custom * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  const lineVariants = {
    hidden: { y: "100%" },
    visible: (custom: number) => ({
      y: "0%",
      transition: {
        delay: shouldReduceMotion ? 0 : 0.16 + custom * 0.12,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : delay,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-[92vh] flex items-center pt-28 sm:pt-36 pb-12 sm:pb-16 bg-transparent"
    >
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (~58%) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* 1. Two Pill Badges (12px, white background, subtle shadow, 80ms stagger) */}
            <div className="flex flex-wrap items-center gap-2.5 mb-10">
              <motion.div
                custom={0}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#E6E3DC] bg-[#FFFFFF] text-[#0A0A0A] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <span>PORTFOLIO &apos;26</span>
              </motion.div>

              <motion.div
                custom={1}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium border border-[#E6E3DC] bg-[#FFFFFF] text-[#0A0A0A] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FB866] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FB866]" />
                </span>
                <span>Open to work</span>
              </motion.div>
            </div>

            {/* 2. H1: 3 lines, line-by-line reveal, clamp(44px, 5.2vw, 68px), font-weight 400-500, line-height 1.05 */}
            <h1
              style={{
                transform: `translate3d(${h1TranslateX}px, 0, 0)`,
              }}
              className="mb-7 tracking-[-0.025em] font-normal text-[#0A0A0A] transition-transform duration-75 ease-out select-none"
            >
              {headlineLines.map((line, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden leading-[1.08] text-[clamp(32px,5.2vw,68px)] sm:text-[clamp(44px,5.2vw,68px)]"
                >
                  <motion.div
                    custom={idx}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    <span>{line.text}</span>
                    {line.hasAI && (
                      <span className="text-[#FF3B5C] font-medium">AI</span>
                    )}
                    {line.endText && <span>{line.endText}</span>}
                  </motion.div>
                </div>
              ))}
            </h1>

            {/* 3. Paragraph: 20px, line-height 1.7, color #6B6B6B, max-width 560px */}
            <motion.p
              custom={0.55}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-[#6B6B6B] text-[20px] leading-[1.7] max-w-[560px] mb-10 font-normal"
            >
              Engineering intelligent products from signal to system.
              Specializing in RAG pipelines, production LLM integration, Python,
              SQL, and resilient full-stack architectures.
            </motion.p>

            {/* 4. Buttons: Black pill "Explore Work →" (52px height, padding 0 28px) + Text link */}
            <motion.div
              custom={0.68}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-5 sm:gap-6"
            >
              {/* Primary Black Pill */}
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2.5 h-[52px] px-[28px] rounded-full bg-[#0A0A0A] text-white text-[15px] font-medium transition-all duration-200 hover:scale-[1.02] hover:bg-[#FF3B5C] active:scale-[0.98] shadow-xs"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              {/* Secondary Text Link with animated underline from left */}
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-1.5 py-3 text-[15px] font-medium text-[#0A0A0A] hover:text-[#FF3B5C] transition-colors duration-200"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                {/* Thin Underline that grows from left */}
                <span className="absolute bottom-1.5 left-0 w-0 h-px bg-[#FF3B5C] transition-all duration-300 group-hover:w-full" />
              </a>
            </motion.div>
          </div>

          {/* Right Column (~38%): Quick Snapshot Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full pt-4 lg:pt-0">
            <SnapshotCard />
          </div>
        </div>
      </div>
    </section>
  );
}
