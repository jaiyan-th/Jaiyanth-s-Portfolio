"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
          className="flex flex-col items-start max-w-5xl"
        >
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
                      isAccent ? "text-[#FF3355] font-medium" : "text-[#0A0A0A]"
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
            Engineering intelligent products from signal to system. Specializing in RAG pipelines, production LLM integration, Python, SQL, and resilient full-stack architectures.
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

          {/* Quick Meta Footer Row */}
          <motion.div
            variants={itemVariants}
            className="w-full mt-16 sm:mt-24 pt-8 border-t border-[#E5E3DB] grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[#6F6E6A]"
          >
            <div>
              <p className="uppercase tracking-widest text-[10px] font-mono text-[#6F6E6A] mb-1">
                Domain
              </p>
              <p className="font-medium text-[#0A0A0A]">Applied AI · RAG · Full-Stack</p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-[10px] font-mono text-[#6F6E6A] mb-1">
                Core Stack
              </p>
              <p className="font-medium text-[#0A0A0A]">Python · Next.js · LangChain</p>
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
