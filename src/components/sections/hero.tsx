"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { IDENTITY } from "@/data/content";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";

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
            y: shouldReduceMotion ? 0 : [0, -4, 0],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
            },
            opacity: { duration: 0.65 },
            scale: { duration: 0.65 },
          }}
          style={{
            transform: shouldReduceMotion
              ? undefined
              : `perspective(1200px) rotateX(${-mouseTilt.y * 1.8}deg) rotateY(${mouseTilt.x * 1.8}deg) translate3d(${mouseTilt.x * 4}px, ${headlineParallaxY + mouseTilt.y * 4}px, 0)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative w-full rounded-2xl sm:rounded-3xl bg-white border-2 border-[#111111] shadow-[8px_8px_0px_#111111] hover:shadow-[12px_12px_0px_#111111] py-10 sm:py-14 md:py-16 px-5 sm:px-10 md:px-14 flex flex-col items-center text-center overflow-hidden transition-all duration-300 group"
        >
          {/* Top Red Indicator Accent Stripe (Signature Neo-Brutalist Element) */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E8472B] z-10" />

          {/* 1. Luminous Ambient Outer Glow for Live Border */}
          <div className="absolute -inset-[3px] rounded-[18px] sm:rounded-[26px] overflow-hidden pointer-events-none -z-20 blur-sm opacity-[0.08]">
            <div
              className="absolute inset-[-150%] animate-[spin_12s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 240deg, rgba(232,71,43,0.1) 290deg, rgba(255,107,74,0.25) 335deg, rgba(232,71,43,0.28) 360deg)",
              }}
            />
          </div>

          {/* 2. Crisp Sharp Traveling Laser Beam (3px Live Border) */}
          <div className="absolute -inset-[2.5px] rounded-[17px] sm:rounded-[25px] overflow-hidden pointer-events-none -z-10">
            <div
              className="absolute inset-[-150%] animate-[spin_12s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 180deg, rgba(232,71,43,0.25) 230deg, #FF6B4A 300deg, #E8472B 345deg, #111111 360deg)",
              }}
            />
          </div>

          {/* Hero Content Inside the Neo-Brutalist Card */}
          <div className="w-full flex flex-col items-center relative z-10">
            {/* 1. Eyebrow Pill */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 sm:mb-6"
            >
              <EyebrowPill accent="PORTFOLIO" text="SYSTEMS ARCHIVE" />
            </motion.div>

            {/* 2. Main Heading: Applied AI engineering for systems that make sense. */}
            <h1
              className="font-sans font-bold text-[clamp(32px,5.2vw,80px)] text-[#111111] select-none leading-[1.08] tracking-[-0.035em] mb-5 sm:mb-6 w-full max-w-5xl mx-auto"
            >
              <span className="block">Applied AI engineering for systems</span>
              <span className="block mt-1 sm:mt-1.5">
                that make{" "}
                <em className="accent font-serif-italic italic text-accent font-normal accent-underline">
                  sense.
                </em>
              </span>
            </h1>

            {/* 3. Subtitle Description */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-[15.5px] sm:text-[17.5px] md:text-[18.5px] text-[var(--body)] leading-relaxed max-w-2xl sm:max-w-3xl mx-auto mb-7 sm:mb-8 font-normal"
            >
              I&apos;m an engineer who makes complex things feel obvious — turning AI ideas into web apps people can actually use.
            </motion.p>
          </div>

          {/* 4. Neo-Brutalist Action Buttons & Social Links */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
            className="flex items-center justify-center flex-wrap sm:flex-nowrap gap-3.5 sm:gap-4 w-full relative z-10 pb-1 sm:pb-0"
          >
            {/* Primary Action */}
            <a
              ref={exploreBtnRef}
              href="/#work"
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              style={{
                transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
              }}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#111111] text-white border-2 border-[#111111] shadow-[4px_4px_0px_#E8472B] hover:shadow-[6px_6px_0px_#E8472B] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none font-sans text-[14px] font-medium transition-all shrink-0 whitespace-nowrap cursor-pointer"
            >
              <span>View Selected Work</span>
              <ArrowDown className="w-4 h-4 shrink-0" />
            </a>

            {/* Secondary Action */}
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white text-[#111111] border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none font-sans text-[14px] font-medium transition-all shrink-0 whitespace-nowrap cursor-pointer"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>

            {/* Social Links Chips */}
            <div className="flex items-center gap-2.5 sm:gap-3 ml-0 sm:ml-2 font-mono text-[12px] shrink-0 whitespace-nowrap">
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border-[1.5px] border-[#111111] shadow-[2.5px_2.5px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-[#111111] font-medium transition-all"
              >
                <span>GitHub</span>
                <span className="text-[11px] text-[#E8472B]">↗</span>
              </a>
              <a
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border-[1.5px] border-[#111111] shadow-[2.5px_2.5px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-[#111111] font-medium transition-all"
              >
                <span>LinkedIn</span>
                <span className="text-[11px] text-[#E8472B]">↗</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
