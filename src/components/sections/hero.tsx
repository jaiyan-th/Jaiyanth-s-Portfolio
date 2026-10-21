"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { SnapshotCard } from "./snapshot-card";
import { LiveSignalField } from "@/components/canvas/live-signal-field";
import { IDENTITY } from "@/data/content";

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
        <div className="grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Eyebrow, Headline, Subtitle, CTA buttons & Social Links */}
          <div
            className="w-full flex flex-col items-start transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translate3d(0, ${headlineParallaxY}px, 0)`,
            }}
          >
            <div className="w-full flex flex-col items-start">
              {/* 1. Eyebrow Pill */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4 sm:mb-5"
              >
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FDECE8] text-[#E8472B] font-mono text-[11px] uppercase tracking-[0.08em] font-medium select-none w-max leading-none">
                  PORTFOLIO &amp; SYSTEMS ARCHIVE
                </div>
              </motion.div>

              {/* 2. H1: Applied AI & Full-Stack Systems Engineer. */}
              <h1
                className="font-sans font-bold text-fluid-hero text-[#111111] select-none leading-[1.05] tracking-[-0.035em] mb-4 sm:mb-5"
              >
                Applied AI &amp; Full-Stack
                <br />
                Systems{" "}
                <em className="accent font-serif-italic italic text-accent font-normal">
                  Engineer.
                </em>
              </h1>

              {/* 3. Subtitle Description */}
              <motion.p
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-sans text-base sm:text-[17px] text-[#4a4a4a] leading-relaxed max-w-[58ch] mb-6 sm:mb-8 font-normal"
              >
                Building deterministic RAG pipelines, autonomous agentic systems, and high-concurrency web applications that make complex intelligence intuitive.
              </motion.p>
            </div>

            {/* 4. Action Buttons & Social Links */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 w-full pt-1"
            >
              <a
                ref={exploreBtnRef}
                href="/#work"
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                style={{
                  transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg sm:rounded-full bg-[#111111] text-white font-sans text-sm font-medium hover:bg-[#222222] transition-colors active:scale-[0.98] w-full sm:w-auto"
              >
                <span>View Selected Work</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg sm:rounded-full bg-white border border-[#E5E0D8] text-[#111111] font-sans text-sm font-medium hover:border-[#111111] transition-colors active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              {/* Social Links on Right */}
              <div className="flex items-center gap-4 sm:ml-2 font-mono text-xs sm:text-[13px] text-[#777777] pt-2 sm:pt-0">
                <a
                  href={IDENTITY.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#111111] transition-colors"
                >
                  <span>GitHub</span>
                  <span className="text-[11px]">↗</span>
                </a>
                <a
                  href={IDENTITY.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#111111] transition-colors"
                >
                  <span>LinkedIn</span>
                  <span className="text-[11px]">↗</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Profile Snapshot Card */}
          <div
            className="w-full flex flex-col justify-center items-stretch transition-transform duration-75 ease-out will-change-transform mt-8 lg:mt-0"
            style={{
              transform: `translate3d(0, ${headlineParallaxY}px, 0)`,
            }}
          >
            <SnapshotCard />
          </div>
        </div>
      </div>
    </section>
  );
}
