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

  // Parallax calculations (Headline slower, Info faster)
  const headlineParallaxY = shouldReduceMotion || isMobile ? 0 : scrollY * 0.08;
  const infoParallaxY = shouldReduceMotion || isMobile ? 0 : -scrollY * 0.12;

  const headlineLines = [
    { text: "Applied ", hasAI: true, endText: " engineering" },
    { text: "for systems", hasAI: false, endText: "" },
    { text: "that make sense", hasAI: false, endText: "" },
  ];

  // 3D Staggered line entrance: rotateX(-60deg) -> 0, translateZ(-80px) -> 0
  const lineVariants3D = {
    hidden: {
      opacity: 0,
      rotateX: -60,
      translateZ: -80,
      y: 40,
    },
    visible: (idx: number) => ({
      opacity: 1,
      rotateX: 0,
      translateZ: 0,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.12 + idx * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 pb-10 sm:pb-14 bg-transparent overflow-hidden perspective-1200"
    >
      {/* Interactive 3D Dot-Grid Signal Field */}
      <LiveSignalField onPointerStats={handlePointerStats} className="z-0" />

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-center">
          {/* Left Column (~65%): Headline with Parallax depth */}
          <div
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translate3d(0, ${headlineParallaxY}px, 0)`,
            }}
          >
            {/* 1. Flat Stickers (No borders, 1.5deg rotation) */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
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
            </div>

            {/* 2. H1: 3D Staggered Flip Entrance (Weight 700-800, tight letter-spacing) */}
            <h1
              className="mb-7 tracking-[-0.035em] font-extrabold text-[#0A0A0A] select-none preserve-3d"
            >
              {headlineLines.map((line, idx) => (
                <div
                  key={idx}
                  className="overflow-visible leading-[1.06] text-[clamp(34px,5.4vw,76px)] sm:text-[clamp(44px,5.4vw,76px)] perspective-1200"
                >
                  <motion.div
                    custom={idx}
                    variants={lineVariants3D}
                    initial="hidden"
                    animate="visible"
                    className="inline-block origin-bottom will-change-transform"
                  >
                    <span>{line.text}</span>
                    {line.hasAI && (
                      <span className="marker-highlight font-extrabold">
                        AI
                      </span>
                    )}
                    {line.endText && <span>{line.endText}</span>}
                  </motion.div>
                </div>
              ))}
            </h1>

            {/* 3. Subtitle Paragraph */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
              className="text-[#555555] text-[20px] leading-[1.6] max-w-2xl mb-10 font-normal"
            >
              I’m an engineer who makes complex things feel obvious.
            </motion.p>

            {/* 4. Action Buttons (Magnetic "Explore Work" + Clean Link) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.6 }}
              className="flex flex-wrap items-center gap-5 sm:gap-6"
            >
              {/* Primary Black Pill with Magnetic Hover + Press Effect */}
              <a
                ref={exploreBtnRef}
                href="/#work"
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                style={{
                  transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                }}
                className="neo-black-btn h-[52px] px-8 rounded-full text-[15px] font-semibold gap-2.5 active:scale-[0.96]"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary Clean Text Link */}
              <a
                href="/#contact"
                className="group relative inline-flex items-center gap-1.5 py-3 text-[15px] font-semibold text-[#0A0A0A] hover:text-[#E5341B] transition-colors duration-200"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute bottom-1.5 left-0 w-0 h-[2px] bg-[#E5341B] transition-all duration-300 group-hover:w-full" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Snapshot Metadata (Parallax faster speed, unboxed) */}
          <div
            className="lg:col-span-5 xl:col-span-5 flex justify-start lg:justify-end w-full pt-6 lg:pt-0 transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translate3d(0, ${infoParallaxY}px, 0)`,
            }}
          >
            <SnapshotCard />
          </div>
        </div>

        {/* Live Signal Telemetry Footer Strip (Real-time cursor coordinates intact) */}
        <div
          className="mt-14 sm:mt-16 pt-5 border-t border-[#E2DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-[#666666]"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-bold uppercase tracking-wider text-[#0A0A0A]">
              FIG. 01 · LIVE SIGNAL FIELD
            </span>
            <span className="hidden sm:inline text-[#0A0A0A]">|</span>
            <span className="hidden md:inline text-[#666666]">
              MOVE YOUR CURSOR. THAT&apos;S A SIGNAL.
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[#0A0A0A]">
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
            <span className="hidden sm:inline-flex items-center gap-1.5 pl-2.5 border-l border-[#0A0A0A] text-[10px] uppercase tracking-wider text-[#E5341B] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5341B] animate-pulse" />
              PROCESSED LOCALLY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
