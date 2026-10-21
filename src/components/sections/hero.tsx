"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { SnapshotCard } from "./snapshot-card";
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

  // Magnetic hover for "View Selected Work" button
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

  const headlineParallaxY = shouldReduceMotion || isMobile ? 0 : scrollY * 0.05;

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      style={{
        paddingTop: "max(5rem, calc(4.25rem + env(safe-area-inset-top, 0px)))",
        paddingBottom: "max(3.5rem, calc(2.5rem + env(safe-area-inset-bottom, 0px)))",
      }}
      className="relative min-h-[90svh] flex flex-col justify-center bg-[var(--canvas)] overflow-hidden"
    >
      {/* Main Content Area */}
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.24fr_0.76fr] xl:grid-cols-[1.28fr_0.72fr] gap-8 lg:gap-10 xl:gap-14 items-center">
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
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FDF0ED] text-[#E8472B] font-mono text-[10.5px] uppercase tracking-[0.08em] font-medium select-none w-max leading-none">
                  PORTFOLIO &amp; SYSTEMS ARCHIVE
                </div>
              </motion.div>

              {/* 2. H1: Applied AI & Full-Stack Systems Engineer. (2 Lines Exact) */}
              <h1
                className="font-sans font-bold text-[34px] sm:text-[42px] md:text-[48px] lg:text-[46px] xl:text-[54px] text-[#111111] select-none leading-[1.06] tracking-[-0.035em] mb-4 sm:mb-5"
              >
                <span className="block whitespace-nowrap">Applied AI &amp; Full-Stack</span>
                <span className="block mt-0.5">
                  Systems{" "}
                  <em className="accent font-serif-italic italic text-accent font-normal">
                    Engineer.
                  </em>
                </span>
              </h1>

              {/* 3. Subtitle Description */}
              <motion.p
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-sans text-[15px] sm:text-[16px] text-[#555555] leading-relaxed max-w-[560px] mb-6 sm:mb-7 font-normal"
              >
                Building deterministic RAG pipelines, autonomous agentic systems, and high-concurrency web applications that make complex intelligence intuitive.
              </motion.p>
            </div>

            {/* 4. Action Buttons & Social Links */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.55 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 w-full"
            >
              <a
                ref={exploreBtnRef}
                href="/#work"
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                style={{
                  transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#111111] text-white font-sans text-[13.5px] sm:text-[14px] font-medium hover:bg-[#222222] transition-colors active:scale-[0.98] w-full sm:w-auto"
              >
                <span>View Selected Work</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-[8px] bg-white border border-[#E5E0D8] text-[#111111] font-sans text-[13.5px] sm:text-[14px] font-medium hover:border-[#111111] transition-colors active:scale-[0.98] w-full sm:w-auto"
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
                  <span className="text-[11px] text-[#999999]">↗</span>
                </a>
                <a
                  href={IDENTITY.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#111111] transition-colors"
                >
                  <span>LinkedIn</span>
                  <span className="text-[11px] text-[#999999]">↗</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Profile Snapshot Card */}
          <div
            className="w-full flex flex-col justify-center items-stretch transition-transform duration-75 ease-out will-change-transform mt-8 lg:mt-0 max-w-[440px] xl:max-w-[460px] mx-auto lg:ml-auto"
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
