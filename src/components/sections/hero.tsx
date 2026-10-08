"use client";

import { motion, type Variants } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Target,
  Layers,
  Sparkles,
} from "lucide-react";
import { IDENTITY } from "@/data/content";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const wordVariants: Variants = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const headlineWords = [
  "Applied",
  "AI",
  "engineering",
  "for",
  "complex",
  "systems",
  "that",
  "feel",
  "obvious",
];

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative pt-32 sm:pt-40 pb-20 md:pb-28 overflow-hidden bg-[var(--canvas)]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Main Hero Grid: Left Content + Right Quick Snapshot Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headlines, Pills, Subtext, CTAs */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start">
              {/* Pill Badge Row */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-8 sm:mb-10"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-[#E5E3DB] bg-white text-[#6F6E6A] shadow-2xs">
                  <span>Portfolio '26</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium border border-[#E5E3DB] bg-white text-[#0A0A0A] shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FB46A] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FB46A]" />
                  </span>
                  <span>Open to work</span>
                </div>
              </motion.div>

              {/* Large Headline Matching Sandeep Typography */}
              <h1 className="hero-headline text-[#0A0A0A] mb-6 sm:mb-8 font-normal tracking-tight">
                <span className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1">
                  {headlineWords.map((word, i) => {
                    const isAccent = word === "AI";
                    return (
                      <motion.span
                        key={`${word}-${i}`}
                        variants={wordVariants}
                        className={`inline-block ${
                          isAccent
                            ? "text-[#FF3355] font-medium"
                            : "text-[#0A0A0A]"
                        }`}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </span>
              </h1>

              {/* Subtext */}
              <motion.p
                variants={itemVariants}
                className="subtext-editorial max-w-2xl text-[#6F6E6A] mb-10 sm:mb-12 font-normal text-lg sm:text-xl leading-relaxed"
              >
                Engineering intelligent products from signal to system.
                Specializing in RAG pipelines, production LLM integration,
                Python, SQL, and resilient full-stack architectures.
              </motion.p>

              {/* Action Buttons: Primary Solid Black Pill + Text Link */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 sm:gap-6"
              >
                {/* Primary Button */}
                <a
                  href="#featured-case"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 bg-[#0A0A0A] text-white text-sm sm:text-base font-medium rounded-full hover:bg-[#FF3355] transition-all duration-200 group shadow-xs"
                >
                  <span>Explore Work</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                {/* Secondary Text Link */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 py-3 text-sm sm:text-base font-medium text-[#0A0A0A] hover:text-[#FF3355] transition-colors duration-200 group relative"
                >
                  <span>Get in touch</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="absolute bottom-1.5 left-0 right-0 h-px bg-[#E5E3DB] group-hover:bg-[#FF3355] transition-colors" />
                </a>
              </motion.div>
            </div>

            {/* Right Column: Quick Snapshot Card (Modeled 1:1 After User Image) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end w-full pt-6 lg:pt-0"
            >
              <div className="relative w-full max-w-[400px]">
                {/* Offset white border/backdrop line (editorial shadow layer) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-white border border-[#E5E3DB] pointer-events-none"
                />

                {/* Main Dark Card Surface */}
                <div className="relative rounded-xl border border-white/20 bg-[#141414] p-6 text-white shadow-xl">
                  {/* Card Header: QUICK SNAPSHOT + 2026 Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/15">
                    <span className="font-mono text-xs tracking-wider uppercase text-[#9E9E9E] font-semibold">
                      QUICK SNAPSHOT
                    </span>
                    <span className="px-2.5 py-0.5 rounded-[4px] bg-[#CCFF00] text-black font-mono font-bold text-xs">
                      2026
                    </span>
                  </div>

                  {/* LOCATION */}
                  <div className="py-4 border-b border-white/15">
                    <div className="flex items-center gap-2 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span className="font-mono text-[10px] tracking-widest text-[#CCFF00] font-semibold uppercase">
                        LOCATION
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[#EDEBE6] tracking-tight pl-5">
                      Karur, Tamil Nadu, India
                    </p>
                  </div>

                  {/* FOCUS */}
                  <div className="py-4 border-b border-white/15">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Target className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span className="font-mono text-[10px] tracking-widest text-[#CCFF00] font-semibold uppercase">
                        FOCUS
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[#EDEBE6] tracking-tight pl-5">
                      Applied AI · Full-Stack Engineering
                    </p>
                  </div>

                  {/* STACK */}
                  <div className="py-4 border-b border-white/15">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span className="font-mono text-[10px] tracking-widest text-[#CCFF00] font-semibold uppercase">
                        STACK
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#EDEBE6] pl-5 leading-relaxed font-normal">
                      Python · SQL · LangChain · LLM Integration
                    </p>
                  </div>

                  {/* STATUS */}
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span className="font-mono text-[10px] tracking-widest text-[#CCFF00] font-semibold uppercase">
                        STATUS
                      </span>
                    </div>
                    <div className="pl-5">
                      <div className="w-full px-3.5 py-2.5 rounded-md border border-white/30 bg-[#1F1F1F] text-xs font-medium text-[#EDEBE6] tracking-tight">
                        Open to full-time & internship roles
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Meta Footer Row */}
          <motion.div
            variants={itemVariants}
            className="w-full mt-16 sm:mt-24 pt-8 border-t border-[#E5E3DB] grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[#6F6E6A]"
          >
            <div>
              <p className="uppercase tracking-widest text-[10px] font-mono text-[#6F6E6A] mb-1">
                Domain
              </p>
              <p className="font-medium text-[#0A0A0A]">
                Applied AI · RAG · Full-Stack
              </p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-[10px] font-mono text-[#6F6E6A] mb-1">
                Core Stack
              </p>
              <p className="font-medium text-[#0A0A0A]">
                Python · Next.js · LangChain
              </p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-[10px] font-mono text-[#6F6E6A] mb-1">
                Location
              </p>
              <p className="font-medium text-[#0A0A0A]">{IDENTITY.location}</p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-[10px] font-mono text-[#6F6E6A] mb-1">
                Status
              </p>
              <p className="font-medium text-[#0A0A0A] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FB46A] inline-block" />
                Available for Roles
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
