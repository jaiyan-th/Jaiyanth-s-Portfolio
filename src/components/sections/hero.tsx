"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SnapshotCard } from "./snapshot-card";
import { LiveSignalField } from "@/components/canvas/live-signal-field";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);
  const [pointerStats, setPointerStats] = useState({
    x: 0.172,
    y: 0.091,
    events: 599,
    speed: 0,
  });

  const handlePointerStats = useCallback(
    (stats: { x: number; y: number; events: number; speed: number }) => {
      setPointerStats(stats);
    },
    []
  );

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

  const headlineLines = [
    { text: "Applied ", hasAI: true, endText: " engineering" },
    { text: "for systems", hasAI: false, endText: "" },
    { text: "that make sense", hasAI: false, endText: "" },
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
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 pb-10 sm:pb-14 bg-transparent overflow-hidden"
    >
      {/* Interactive Dot-Grid Signal Field */}
      <LiveSignalField onPointerStats={handlePointerStats} className="z-0" />

      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (~58%) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* 1. Clean Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <motion.div
                custom={0}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#0A0A0A] bg-white text-[#0A0A0A]"
              >
                <span>PORTFOLIO &apos;26</span>
              </motion.div>

              <motion.div
                custom={1}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium border border-[#0A0A0A] bg-white text-[#0A0A0A]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FB866] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FB866]" />
                </span>
                <span>Open to work</span>
              </motion.div>
            </div>

            {/* 2. H1: Clean, powerful typography */}
            <h1
              style={{
                transform: `translate3d(${h1TranslateX}px, 0, 0)`,
              }}
              className="mb-7 tracking-[-0.03em] font-normal text-[#0A0A0A] transition-transform duration-75 ease-out select-none"
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
                      <span className="text-accent font-medium">AI</span>
                    )}
                    {line.endText && <span>{line.endText}</span>}
                  </motion.div>
                </div>
              ))}
            </h1>

            {/* 3. Paragraph */}
            <motion.p
              custom={0.55}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-[#666666] text-[20px] leading-[1.65] max-w-[560px] mb-10 font-normal"
            >
              I’m an engineer who makes complex things feel obvious.
            </motion.p>

            {/* 4. Action Buttons */}
            <motion.div
              custom={0.68}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-5 sm:gap-6"
            >
              {/* Primary Outer Neo-Brutalist Button */}
              <a
                href="#work"
                className="neo-btn h-[52px] px-8 rounded-full bg-[#0A0A0A] text-white text-[15px] font-medium gap-2.5 hover:bg-accent hover:border-accent"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary Clean Text Link */}
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-1.5 py-3 text-[15px] font-medium text-[#0A0A0A] hover:text-accent transition-colors duration-200"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute bottom-1.5 left-0 w-0 h-[2px] bg-[#0A0A0A] transition-all duration-300 group-hover:w-full" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Snapshot Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full pt-4 lg:pt-0">
            <SnapshotCard />
          </div>
        </div>

        {/* Live Signal Telemetry Footer Strip */}
        <motion.div
          custom={0.8}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-14 sm:mt-16 pt-5 border-t-2 border-[#0A0A0A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-[#666666]"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-semibold uppercase tracking-wider text-[#0A0A0A]">
              FIG. 01 · LIVE SIGNAL FIELD
            </span>
            <span className="hidden sm:inline text-[#0A0A0A]">|</span>
            <span className="hidden md:inline text-[#666666]">
              MOVE YOUR CURSOR. THAT&apos;S A SIGNAL.
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[#0A0A0A]">
            <span>
              X: <strong className="font-mono text-accent">{pointerStats.x.toFixed(3)}</strong>
            </span>
            <span>
              Y: <strong className="font-mono text-accent">{pointerStats.y.toFixed(3)}</strong>
            </span>
            <span className="text-[#666666]">
              EVENTS:{" "}
              <strong className="font-mono text-[#0A0A0A]">
                {String(pointerStats.events).padStart(6, "0")}
              </strong>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 pl-2.5 border-l border-[#0A0A0A] text-[10px] uppercase tracking-wider text-accent font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              PROCESSED LOCALLY
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
