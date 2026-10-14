"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { WHY_WORK_WITH_ME } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";

const CARD_METAS = [
  {
    stampBg: "bg-[#111111] text-white",
    tagline: "// 01 · PRODUCTION AI",
    speedFactor: 0.08,
  },
  {
    stampBg: "bg-[#EAE7DF] text-[#111111]",
    tagline: "// 02 · ARCHITECTURE",
    speedFactor: 0.14,
  },
  {
    stampBg: "bg-[#FFE8E5] text-accent",
    tagline: "// 03 · RIGOUR & VELOCITY",
    speedFactor: 0.20,
  },
];

const renderCardTitle = (title: string, index: number) => {
  if (index === 0) {
    return (
      <>
        Production-First AI Systems, Not Just{" "}
        <span className="font-serif italic text-accent font-normal">Demos</span>
      </>
    );
  }
  if (index === 1) {
    return (
      <>
        Systems First, Screens Second: End-to-End{" "}
        <span className="font-serif italic text-accent font-normal">Ownership</span>
      </>
    );
  }
  return (
    <>
      Density Is Not the Enemy:{" "}
      <span className="font-serif italic text-accent font-normal">Rigour</span> & Velocity
    </>
  );
};

export function WhyWork() {
  const shouldReduceMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsLargeDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !isLargeDesktop) return;
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldReduceMotion, isLargeDesktop]);

  return (
    <section
      id="why-work"
      aria-label="05 Why work with me"
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t border-border-line bg-[#ECE9E1]/35 scroll-mt-16 perspective-1200 transition-colors"
    >
      <div className="site-container">
        {/* Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-12 pb-5 border-b border-border-line gap-4">
          <div className="space-y-3">
            <EyebrowPill accent="SKILLS" text="WHAT I USE" />
            <h2 className="font-serif font-normal text-fluid-h2 text-[#111111] leading-[1.05] tracking-[-0.02em]">
              Why Work <span className="font-serif italic text-accent font-normal accent-underline">With Me</span>?
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
            Strategy & Craft
          </span>
        </Reveal>

        {/* Section Statement */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-10 sm:mb-14"
        >
          <h3 className="font-serif font-normal text-fluid-h2 tracking-[-0.02em] leading-tight mb-5 text-[#111111]">
            <RevealHeading
              lines={[
                { text: "Engineers who can hold both ends —" },
                { text: "", accent: "applied AI", afterAccent: " & full-stack systems," },
                { text: "are rare." },
              ]}
            />
          </h3>
          <p className="lead-intro font-sans text-base sm:text-lg text-text-muted leading-relaxed max-w-[60ch]">
            I work best where the stakes are real and the data is dense. My job is to remove the friction, so the next decision comes faster.
          </p>
        </motion.div>

        {/* /A /B /C Columns: Become 1 column below 1024px, 3 columns on >=1024px */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 perspective-1200">
          {WHY_WORK_WITH_ME.map((point, index) => {
            const meta = CARD_METAS[index % CARD_METAS.length];
            const colParallaxY =
              shouldReduceMotion || !isLargeDesktop ? 0 : -scrollY * meta.speedFactor * 0.12;

            return (
                <motion.div
                  key={point.letter}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.015 }}
                  style={{
                    transform: `translate3d(0, ${colParallaxY}px, 0)`,
                  }}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-border-line hover:border-[#111111]/40 shadow-sm hover:shadow-xl flex flex-col justify-between transition-all duration-300 ease-out will-change-transform overflow-hidden"
                >
                  {/* Top Red Indicator stripe */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-accent transition-colors duration-200" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-2xl font-normal text-accent group-hover:scale-110 transition-transform origin-left inline-block">
                        /{point.letter}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] font-medium ${meta.tagline}`}>
                        {meta.tagline}
                      </span>
                    </div>

                    <h4 className="font-serif font-normal text-2xl sm:text-[28px] text-[#111111] group-hover:text-accent leading-snug mb-3 transition-colors duration-200">
                      {renderCardTitle(point.title, index)}
                    </h4>

                    <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed font-normal mb-6">
                      {point.description}
                    </p>
                  </div>

                  {/* Refined Tags */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-border-line">
                    {point.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] bg-[#F2ECE4]/70 text-text-muted border border-border-line hover:bg-[#111111] hover:text-white transition-colors duration-150 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
