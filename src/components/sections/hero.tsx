"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HERO_CONTENT, IDENTITY } from "@/data/content";

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
  hidden: { y: 36, opacity: 0 },
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
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative pt-32 sm:pt-40 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-12">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-[var(--border-line)] bg-[var(--surface-muted)]/50 text-[var(--text-muted)]">
              <span>{HERO_CONTENT.badgeYear}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-[var(--border-line)] bg-[var(--surface-muted)]/50 text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3355] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3355]" />
              </span>
              <span>{HERO_CONTENT.badgeStatus}</span>
            </div>
          </motion.div>

          {/* Large Headline with Staggered Word Fade-Up */}
          <h1 className="hero-headline text-foreground mb-6 sm:mb-8 font-normal tracking-tight">
            <span className="flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-1">
              {HERO_CONTENT.headlineWords.map((word, i) => {
                const isAccent = word.includes("AI");
                return (
                  <motion.span
                    key={`${word}-${i}`}
                    variants={wordVariants}
                    className={`inline-block ${
                      isAccent ? "text-[#FF3355] font-medium" : "text-foreground"
                    }`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </span>
          </h1>

          {/* 2-line Subtext */}
          <motion.p
            variants={itemVariants}
            className="subtext-editorial max-w-2xl text-[var(--text-muted)] mb-10 sm:mb-12 font-light text-lg sm:text-xl leading-relaxed"
          >
            {HERO_CONTENT.subtext}
          </motion.p>

          {/* Action Buttons: Primary + Text Link */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* Primary Button */}
            <a
              href={HERO_CONTENT.ctaPrimary.href}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 bg-foreground text-background text-sm sm:text-base font-medium rounded-full hover:bg-[#FF3355] hover:text-white transition-all duration-200 group shadow-sm"
            >
              <span>{HERO_CONTENT.ctaPrimary.label}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            {/* Secondary Text Link Button */}
            <a
              href={HERO_CONTENT.ctaSecondary.href}
              className="inline-flex items-center gap-1.5 py-3 text-sm sm:text-base font-medium text-foreground hover:text-[#FF3355] transition-colors duration-200 group relative"
            >
              <span>{HERO_CONTENT.ctaSecondary.label}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute bottom-1.5 left-0 right-0 h-px bg-[var(--border-line)] group-hover:bg-[#FF3355] transition-colors" />
            </a>
          </motion.div>

          {/* Quick Meta Footer Row */}
          <motion.div
            variants={itemVariants}
            className="w-full mt-16 sm:mt-24 pt-8 border-t border-[var(--border-line)] grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[var(--text-muted)]"
          >
            <div>
              <p className="uppercase tracking-widest text-[10px] font-mono text-[var(--text-muted)] mb-1">
                Domain
              </p>
              <p className="font-medium text-foreground">Applied AI · RAG · Full-Stack</p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-[10px] font-mono text-[var(--text-muted)] mb-1">
                Core Stack
              </p>
              <p className="font-medium text-foreground">Python · Next.js · LangChain</p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-[10px] font-mono text-[var(--text-muted)] mb-1">
                Location
              </p>
              <p className="font-medium text-foreground">{IDENTITY.location}</p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-[10px] font-mono text-[var(--text-muted)] mb-1">
                Status
              </p>
              <p className="font-medium text-[#FF3355] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3355] inline-block" />
                Available for Roles
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
