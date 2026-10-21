"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SnapshotCard } from "./snapshot-card";
import { LiveSignalField } from "@/components/canvas/live-signal-field";

import { EyebrowPill } from "@/components/ui/eyebrow-pill";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const exploreBtnRef = useRef<HTMLAnchorElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleScroll = () => {
      const lenis = (window as unknown as { __lenis?: { scroll: number } }).__lenis;
      setScrollY(typeof lenis?.scroll === "number" ? lenis.scroll : window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void; off: (event: string, cb: () => void) => void } }).__lenis;
    if (lenis?.on) {
      lenis.on("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lenis?.off) {
        lenis.off("scroll", handleScroll);
      }
    };
  }, [shouldReduceMotion]);

  // Magnetic hover for "Explore Work" button
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile || shouldReduceMotion || !exploreBtnRef.current) return;
    const rect = exploreBtnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.28;
    const distanceY = (e.clientY - centerY) * 0.28;
    setBtnOffset({ x: distanceX, y: distanceY });
  };

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const headlineParallaxY = shouldReduceMotion || isMobile ? 0 : scrollY * 0.06;

  const lineVariants3D = {
    hidden: {
      opacity: 0,
      rotateX: shouldReduceMotion || isMobile ? 0 : -35,
      translateZ: shouldReduceMotion || isMobile ? 0 : -40,
      y: 28,
    },
    visible: (idx: number) => ({
      opacity: 1,
      rotateX: 0,
      translateZ: 0,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.08 + idx * 0.1,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      style={{
        paddingTop: "max(3.75rem, calc(3.25rem + env(safe-area-inset-top, 0px)))",
        paddingBottom: "max(2rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))",
      }}
      className="relative min-h-[100svh] flex flex-col justify-center bg-transparent overflow-hidden perspective-1200"
    >
      {/* Interactive 3D Dot-Grid Signal Field */}
      <LiveSignalField className="z-0" />

      {/* Ambient Atmospheric Lighting Highlights */}
      <div className="pointer-events-none absolute top-1/2 right-[5%] -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#E8472B]/6 via-[#E8472B]/3 to-transparent blur-3xl opacity-75" />
      <div className="pointer-events-none absolute top-1/4 left-[5%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-white/60 to-transparent blur-2xl opacity-60" />

      {/* Main Content Area */}
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_auto_0.9fr] gap-6 lg:gap-8 xl:gap-10 items-stretch">
          {/* Left Column: Badges, Headline, Subtitle, CTA buttons */}
          <div
            className="w-full flex flex-col items-start justify-between transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translate3d(0, ${headlineParallaxY}px, 0)`,
            }}
          >
            <div className="w-full flex flex-col items-start">
              {/* 1. Eyebrow Pill */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ marginBottom: "0.625rem" }}
              >
                <EyebrowPill accent="PORTFOLIO '26" text="APPLIED AI & FULL-STACK SYSTEMS" />
              </motion.div>

              {/* 2. H1: Inter bold 700 with Instrument Serif italic accent */}
              <h1
                style={{ marginBottom: "0.75rem" }}
                className="font-sans font-bold text-fluid-hero text-[#111111] select-none preserve-3d leading-[1.05] tracking-[-0.035em]"
              >
                <div className="overflow-visible perspective-1200">
                  <motion.div
                    custom={0}
                    variants={lineVariants3D}
                    initial="hidden"
                    animate="visible"
                    className="inline-block origin-bottom will-change-transform"
                  >
                    <span>Applied </span>
                    <em className="accent font-serif-italic italic text-accent font-normal">AI </em>
                  </motion.div>
                </div>
                <div className="overflow-visible perspective-1200">
                  <motion.div
                    custom={1}
                    variants={lineVariants3D}
                    initial="hidden"
                    animate="visible"
                    className="inline-block origin-bottom will-change-transform"
                  >
                    <em className="accent font-serif-italic italic text-accent font-normal accent-underline">
                      engineering
                    </em>
                  </motion.div>
                </div>
                <div className="overflow-visible perspective-1200">
                  <motion.div
                    custom={2}
                    variants={lineVariants3D}
                    initial="hidden"
                    animate="visible"
                    className="inline-block origin-bottom will-change-transform"
                  >
                    <span>for systems</span>
                  </motion.div>
                </div>
                <div className="overflow-visible perspective-1200">
                  <motion.div
                    custom={3}
                    variants={lineVariants3D}
                    initial="hidden"
                    animate="visible"
                    className="inline-block origin-bottom will-change-transform"
                  >
                    <span>that make sense</span>
                  </motion.div>
                </div>
              </h1>

              {/* 3. Subtitle / Intro blockquote style with 2px solid accent vertical line in Inter */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.38, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ marginBottom: "1rem" }}
                className="lead-intro font-sans"
              >
                <p>
                  I’m an engineer who makes complex things feel obvious — turning AI ideas into web apps people can actually use.
                </p>
              </motion.div>
            </div>

            {/* 4. Action Buttons (Inter 14px weight 500, gap 12px) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-2"
            >
              <a
                ref={exploreBtnRef}
                href="/#work"
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                style={{
                  transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                }}
                className="neo-black-btn min-h-[44px] px-[22px] py-[11px] font-sans text-[14px] font-medium gap-2 active:scale-[0.97] w-full sm:w-auto"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <a
                href="/#contact"
                className="neo-pill-btn min-h-[44px] px-[22px] py-[11px] font-sans text-[14px] font-medium gap-1.5 w-full sm:w-auto group"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          {/* Editorial Center Vertical Divider Line */}
          <div className="hidden lg:flex flex-col items-center justify-center self-stretch py-2">
            <div className="w-[1.5px] h-full bg-[#111111]/15 relative">
              <div className="absolute top-1/2 -translate-y-1/2 -left-[2.5px] w-1.5 h-1.5 rounded-full bg-[#E8472B]" />
            </div>
          </div>

          {/* Right Column: Profile Snapshot Card & Creative Professional Telemetry Console */}
          <div
            className="w-full flex flex-col justify-center items-stretch transition-transform duration-75 ease-out will-change-transform mt-6 lg:mt-0 gap-3"
            style={{
              transform: `translate3d(0, ${headlineParallaxY}px, 0)`,
            }}
          >
            {/* Above Snapshot Card: Clean, unboxed creative statement */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="px-1 text-left"
            >
              <p className="font-sans text-[13.5px] sm:text-[14px] text-[#4a4a4a] leading-relaxed">
                Bridging high-dimensional <em className="accent font-serif-italic italic text-accent font-normal">AI reasoning</em> with deterministic, low-latency production engineering.
              </p>
            </motion.div>

            {/* Core Snapshot Card */}
            <SnapshotCard />

            {/* Below Snapshot Card: Professional Quote */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="px-1 text-left"
            >
              <blockquote className="border-l-2 border-accent pl-3 py-0.5">
                <p className="font-sans text-[13px] sm:text-[13.5px] text-[#111111] leading-relaxed">
                  &ldquo;The best AI systems don&apos;t feel like magic — they feel like <em className="accent font-serif-italic italic text-accent font-normal">well-engineered</em> software.&rdquo;
                </p>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#888888] block mt-1">
                  — Architecture Invariant
                </span>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
