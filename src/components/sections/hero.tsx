"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SnapshotCard } from "./snapshot-card";
import { LiveSignalField } from "@/components/canvas/live-signal-field";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const exploreBtnRef = useRef<HTMLAnchorElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
  const infoParallaxY = shouldReduceMotion || isMobile ? 0 : -scrollY * 0.08;

  const headlineLines = [
    { text: "Applied ", hasAI: true, endText: " engineering" },
    { text: "for systems", hasAI: false, endText: "" },
    { text: "that make sense", hasAI: false, endText: "" },
  ];

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
        paddingTop: "max(4.5rem, calc(3.5rem + env(safe-area-inset-top, 0px)))",
        paddingBottom: "var(--space-3)",
      }}
      className="relative min-h-[100svh] flex flex-col justify-between bg-transparent overflow-hidden perspective-1200"
    >
      {/* Interactive 3D Dot-Grid Signal Field */}
      <LiveSignalField onPointerStats={handlePointerStats} className="z-0" />

      {/* Main Content Area Vertically Centered */}
      <div className="site-container relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column (~60-65%): Badges, Headline, Subtitle, CTA buttons */}
          <div
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translate3d(0, ${headlineParallaxY}px, 0)`,
            }}
          >
            {/* 1. Flat Stickers with animated entry */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: "var(--space-3)" }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-bold">
                PORTFOLIO &apos;26
              </span>
              <span className="text-[#888888] font-mono text-xs">/</span>
              <div className="neo-sticker neo-sticker-alt bg-[#E8E5DD] text-[#0A0A0A] font-semibold gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FB866] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FB866]" />
                </span>
                <span>Open to work</span>
              </div>
            </motion.div>

            {/* 2. H1: Fluid Headline with tight leading & no overflow */}
            <h1
              style={{ marginBottom: "var(--space-3)" }}
              className="text-fluid-hero font-extrabold tracking-[-0.035em] text-[#0A0A0A] select-none preserve-3d"
            >
              {headlineLines.map((line, idx) => (
                <div
                  key={idx}
                  className="overflow-visible perspective-1200"
                >
                  <motion.div
                    custom={idx}
                    variants={lineVariants3D}
                    initial="hidden"
                    animate="visible"
                    className="inline-block origin-bottom will-change-transform"
                  >
                    <span className="break-words">{line.text}</span>
                    {line.hasAI && (
                      <span className="marker-highlight in-view font-extrabold mx-1">
                        AI
                      </span>
                    )}
                    {line.endText && <span className="break-words">{line.endText}</span>}
                  </motion.div>
                </div>
              ))}
            </h1>

            {/* 3. Subtitle with editorial layout indicator and fluid lead typography */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: "var(--space-4)" }}
              className="border-l-2 border-[#E5341B]/80 pl-3.5 sm:pl-4 max-w-2xl"
            >
              <p className="text-fluid-lead text-[#555555] font-normal">
                I’m an engineer who makes complex things feel obvious.
              </p>
            </motion.div>

            {/* 4. Action Buttons (min 48px height, wrap on mobile) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-5 w-full sm:w-auto"
            >
              <a
                ref={exploreBtnRef}
                href="/#work"
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                style={{
                  transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                }}
                className="neo-black-btn min-h-[48px] px-7 sm:px-8 text-sm sm:text-base font-semibold gap-2.5 active:scale-[0.97] w-full sm:w-auto"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <a
                href="/#contact"
                className="group relative inline-flex items-center justify-center min-h-[48px] px-4 text-sm sm:text-base font-semibold text-[#0A0A0A] hover:text-[#E5341B] transition-colors duration-200"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute bottom-2 left-4 right-4 h-[2px] bg-[#E5341B] scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Snapshot Card aligned to headline top on desktop, stacks below buttons on mobile */}
          <div
            className="lg:col-span-5 xl:col-span-5 w-full flex justify-start lg:justify-end lg:self-start transition-transform duration-75 ease-out will-change-transform mt-4 lg:mt-0"
            style={{
              transform: `translate3d(0, ${infoParallaxY}px, 0)`,
            }}
          >
            <SnapshotCard />
          </div>
        </div>

        {/* Live Signal Telemetry Footer Strip (Single row on desktop, 2 rows on mobile) */}
        <div
          style={{ marginTop: "var(--space-4)" }}
          className="pt-4 border-t border-[#E2DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-fluid-mono text-[#666666]"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-[#0A0A0A]">
              FIG. 01 · LIVE SIGNAL FIELD
            </span>
            <span className="text-[#888888]">|</span>
            <span className="text-[#666666] hidden md:inline">
              MOVE YOUR CURSOR. THAT&apos;S A SIGNAL.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#0A0A0A]">
            <span>
              X: <strong className="font-mono text-[#E5341B]">{pointerStats.x.toFixed(3)}</strong>
            </span>
            <span>
              Y: <strong className="font-mono text-[#E5341B]">{pointerStats.y.toFixed(3)}</strong>
            </span>
            <span className="text-[#666666]">
              EVENTS:{" "}
              <strong className="font-mono text-[#0A0A0A]">
                {String(pointerStats.events).padStart(6, "0")}
              </strong>
            </span>
            <span className="inline-flex items-center gap-1.5 pl-2.5 border-l border-[#0A0A0A] text-[11px] uppercase tracking-wider text-[#E5341B] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5341B] animate-pulse" />
              PROCESSED LOCALLY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
