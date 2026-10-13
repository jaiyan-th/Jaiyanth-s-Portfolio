"use client";

import { useEffect, useState, useRef } from "react";
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
  const infoParallaxY = shouldReduceMotion || isMobile ? 0 : -scrollY * 0.08;

  const headlineLines = [
    { text: "Applied ", hasAI: true, endText: "" },
    { text: "engineering", hasAI: false, endText: "" },
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
        paddingTop: "max(3.25rem, calc(2.75rem + env(safe-area-inset-top, 0px)))",
        paddingBottom: "var(--section-y)",
      }}
      className="relative min-h-[100svh] flex flex-col justify-start bg-transparent overflow-hidden perspective-1200"
    >
      {/* Interactive 3D Dot-Grid Signal Field */}
      <LiveSignalField className="z-0" />

      {/* Main Content Area */}
      <div className="site-container relative z-10 w-full mt-1 sm:mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 xl:gap-10 items-start lg:items-center">
          {/* Left Column (~60-65%): Badges, Headline, Subtitle, CTA buttons */}
          <div
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translate3d(0, ${headlineParallaxY}px, 0)`,
            }}
          >
            {/* 1. Refined Badges with animated entry */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: "0.5rem" }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E2DFD7] text-[#0A0A0A] font-mono text-xs font-semibold shadow-xs">
                PORTFOLIO &apos;26
              </span>
              <span className="text-[#888888] font-mono text-xs">/</span>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E2DFD7] text-[#0A0A0A] font-mono text-xs font-semibold gap-2 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FB866] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FB866]" />
                </span>
                <span>Open to work</span>
              </div>
            </motion.div>

            {/* 2. H1: Proportionally scaled Headline matching other pages */}
            <h1
              style={{ marginBottom: "0.75rem" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.75rem] font-extrabold tracking-[-0.04em] text-[#0A0A0A] select-none preserve-3d leading-[1.02]"
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

            {/* 3. Subtitle with editorial layout indicator and clean typography */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: "1rem" }}
              className="border-l-2 border-[#E5341B]/80 pl-3.5 sm:pl-4 max-w-xl"
            >
              <p className="text-sm sm:text-base md:text-lg text-[#555555] font-normal leading-relaxed">
                I’m an engineer who makes complex things feel obvious — turning AI ideas into web apps people can actually use.
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

          {/* Right Column: Profile Snapshot Card */}
          <div
            className="lg:col-span-5 xl:col-span-5 w-full flex flex-col justify-center transition-transform duration-75 ease-out will-change-transform mt-4 lg:mt-0"
            style={{
              transform: `translate3d(0, ${infoParallaxY}px, 0)`,
            }}
          >
            <SnapshotCard />
          </div>
        </div>
      </div>
    </section>
  );
}
