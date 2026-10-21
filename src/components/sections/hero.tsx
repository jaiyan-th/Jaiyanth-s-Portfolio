"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { IDENTITY } from "@/data/content";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const exploreBtnRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

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

  // Subtle 3D floating tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMouseTilt({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setBtnOffset({ x: 0, y: 0 });
  };

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        paddingTop: "max(5.5rem, calc(4.75rem + env(safe-area-inset-top, 0px)))",
        paddingBottom: "max(4rem, calc(3rem + env(safe-area-inset-bottom, 0px)))",
      }}
      className="relative min-h-svh flex flex-col justify-center bg-[var(--canvas)] overflow-hidden"
    >
      {/* Ambient background grid lines that harmonize with the floating frame */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35] [background-image:linear-gradient(to_right,#E5E0D8_1px,transparent_1px),linear-gradient(to_bottom,#E5E0D8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Main Content Area */}
      <div className="w-full px-3 sm:px-6 md:px-10 lg:px-14 relative z-10 max-w-7xl mx-auto">
        {/* LIVE FLOATING BORDER FRAME */}
        <motion.div
          ref={containerRef}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 16 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: shouldReduceMotion ? 0 : [0, -6, 0],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            },
            opacity: { duration: 0.65 },
            scale: { duration: 0.65 },
          }}
          style={{
            transform: shouldReduceMotion
              ? undefined
              : `perspective(1200px) rotateX(${-mouseTilt.y * 3.5}deg) rotateY(${mouseTilt.x * 3.5}deg) translate3d(${mouseTilt.x * 8}px, ${headlineParallaxY + mouseTilt.y * 8}px, 0)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative w-full rounded-[28px] sm:rounded-[36px] py-10 sm:py-14 md:py-16 px-5 sm:px-10 md:px-14 flex flex-col items-center text-center group"
        >
          {/* 1. Animated Running Light Beam (Live Traveling Border Effect) */}
          <div className="absolute -inset-[1.5px] rounded-[29.5px] sm:rounded-[37.5px] overflow-hidden pointer-events-none -z-10">
            <div
              className="absolute inset-[-150%] animate-[spin_10s_linear_infinite] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 280deg, rgba(232,71,43,0.9) 335deg, rgba(17,17,17,0.85) 360deg)",
              }}
            />
          </div>

          {/* 2. Glass Frame Backdrop with Dual Border Line */}
          <div className="absolute inset-0 rounded-[28px] sm:rounded-[36px] bg-[#FAF8F5]/80 backdrop-blur-md border border-[#E5E0D8] shadow-[0_12px_44px_rgba(0,0,0,0.035),0_1px_3px_rgba(0,0,0,0.02)] -z-10 transition-shadow duration-300 group-hover:shadow-[0_20px_56px_rgba(232,71,43,0.06),0_1px_4px_rgba(0,0,0,0.04)]" />

          {/* 3. Live Corner Brackets (Precision Crosshairs) */}
          {/* Top-Left */}
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] shadow-sm flex items-center justify-center font-mono text-[12px] font-bold text-[#E8472B] select-none pointer-events-none group-hover:scale-110 transition-transform">
            +
          </div>
          {/* Top-Right */}
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] shadow-sm flex items-center justify-center font-mono text-[12px] font-bold text-[#E8472B] select-none pointer-events-none group-hover:scale-110 transition-transform">
            +
          </div>
          {/* Bottom-Left */}
          <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] shadow-sm flex items-center justify-center font-mono text-[12px] font-bold text-[#E8472B] select-none pointer-events-none group-hover:scale-110 transition-transform">
            +
          </div>
          {/* Bottom-Right */}
          <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] shadow-sm flex items-center justify-center font-mono text-[12px] font-bold text-[#E8472B] select-none pointer-events-none group-hover:scale-110 transition-transform">
            +
          </div>

          {/* 4. Live Floating Badges Docked to the Border Perimeter */}
          {/* Top Border Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 sm:px-3.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] shadow-sm flex items-center gap-2 font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.08em] text-[#111111] select-none pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FB866] animate-pulse" />
            <span>SYS_ONLINE // LIVE AGENTIC ARCHIVE</span>
          </div>

          {/* Bottom Border Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 sm:px-3.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] shadow-sm hidden sm:flex items-center gap-2 font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.08em] text-[#666666] select-none pointer-events-none">
            <span>DETERMINISTIC RAG</span>
            <span className="text-[#E8472B] font-bold">•</span>
            <span>AUTONOMOUS AGENTS</span>
            <span className="text-[#E8472B] font-bold">•</span>
            <span>HIGH-CONCURRENCY</span>
          </div>

          {/* Floating Subtle Side Ticks */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 font-mono text-[9px] text-[#999999] select-none pointer-events-none">
            <span className="w-2.5 h-[1.5px] bg-[#E8472B]" />
            <span className="rotate-90 origin-center tracking-widest mt-2">SEC.01</span>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden lg:flex flex-col items-center gap-1 font-mono text-[9px] text-[#999999] select-none pointer-events-none">
            <span className="w-2.5 h-[1.5px] bg-[#E8472B]" />
            <span className="-rotate-90 origin-center tracking-widest mt-2">ARCHIVE</span>
          </div>

          {/* Hero Content Inside the Live Border */}
          <div className="w-full flex flex-col items-center">
            {/* 1. Eyebrow Pill */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 sm:mb-5"
            >
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FDF0ED] text-[#E8472B] font-mono text-[10.5px] uppercase tracking-[0.08em] font-medium select-none w-max leading-none border border-[#FADCD5]">
                PORTFOLIO &amp; SYSTEMS ARCHIVE
              </div>
            </motion.div>

            {/* 2. Main Heading: Applied AI engineering for systems that make sense. */}
            <h1
              className="font-sans font-bold text-[clamp(32px,5.2vw,80px)] text-[#111111] select-none leading-[1.08] tracking-[-0.035em] mb-5 sm:mb-6 w-full max-w-5xl mx-auto"
            >
              <span className="block">Applied AI engineering for systems</span>
              <span className="block mt-1 sm:mt-1.5">
                that make{" "}
                <em className="accent font-serif-italic italic text-accent font-normal">
                  sense.
                </em>
              </span>
            </h1>

            {/* 3. Subtitle Description */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-[15.5px] sm:text-[17.5px] md:text-[18.5px] text-[#555555] leading-relaxed max-w-2xl sm:max-w-3xl mx-auto mb-7 sm:mb-8 font-normal"
            >
              I&apos;m an engineer who makes complex things feel obvious — turning AI ideas into web apps people can actually use.
            </motion.p>
          </div>

          {/* 4. Action Buttons & Social Links */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
            className="flex items-center justify-center flex-wrap sm:flex-nowrap gap-3 sm:gap-3.5 w-full pb-1 sm:pb-0"
          >
            <a
              ref={exploreBtnRef}
              href="/#work"
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              style={{
                transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#111111] text-white font-sans text-[13.5px] sm:text-[14px] font-medium hover:bg-[#222222] transition-colors active:scale-[0.98] shrink-0 whitespace-nowrap shadow-sm"
            >
              <span>View Selected Work</span>
              <ArrowDown className="w-3.5 h-3.5 shrink-0" />
            </a>

            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-[8px] bg-white border border-[#E5E0D8] text-[#111111] font-sans text-[13.5px] sm:text-[14px] font-medium hover:border-[#111111] transition-colors active:scale-[0.98] shrink-0 whitespace-nowrap shadow-sm"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-3.5 sm:gap-4 ml-0 sm:ml-2 font-mono text-[12px] sm:text-[12.5px] text-[#777777] shrink-0 whitespace-nowrap">
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
        </motion.div>
      </div>
    </section>
  );
}
