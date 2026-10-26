"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { WHY_WORK_WITH_ME } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";

const CARD_METAS = [
  {
    bg: "bg-[#FEF9C3]",
    stripe: "bg-[#FFD13B]",
    stampBg: "bg-white text-[#111111]",
    tagline: "// 01 · PRODUCTION AI",
    speedFactor: 0.08,
  },
  {
    bg: "bg-[#EDE9FE]",
    stripe: "bg-[#8B5CF6]",
    stampBg: "bg-white text-[#111111]",
    tagline: "// 02 · ARCHITECTURE",
    speedFactor: 0.14,
  },
  {
    bg: "bg-[#DCFCE7]",
    stripe: "bg-[#4ADE80]",
    stampBg: "bg-white text-[#111111]",
    tagline: "// 03 · RIGOUR & VELOCITY",
    speedFactor: 0.20,
  },
];

const renderCardTitle = (title: string, index: number) => {
  if (index === 0) {
    return (
      <>
        Production-First AI Systems, Not Just{" "}
        <span className="underline decoration-[#FFD13B] decoration-4 underline-offset-4">Demos</span>
      </>
    );
  }
  if (index === 1) {
    return (
      <>
        Systems First, Screens Second: End-to-End{" "}
        <span className="underline decoration-[#8B5CF6] decoration-4 underline-offset-4">Ownership</span>
      </>
    );
  }
  return (
    <>
      Density Is Not the Enemy:{" "}
      <span className="underline decoration-[#4ADE80] decoration-4 underline-offset-4">Rigour</span> &amp; Velocity
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
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t-2 border-[#111111] bg-[#F5F0E6] scroll-mt-20 transition-colors"
    >
      <div className="site-container max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b-2 border-[#111111] gap-3">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#6C47FF]" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#111111]">
                CORE ADVANTAGES
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(24px,3.2vw,36px)] text-[#111111] leading-tight tracking-tight">
              Why Work With Me?
            </h2>
          </div>
          <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-[#555555]">
            Strategy, Execution &amp; Reliability
          </span>
        </Reveal>

        {/* Section Statement */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-8"
        >
          <h3 className="font-sans font-bold text-[clamp(20px,2.6vw,28px)] tracking-tight leading-snug mb-3 text-[#111111]">
            Engineers who can hold both ends — applied AI &amp; production full-stack systems — are rare.
          </h3>
          <p className="lead-intro font-sans font-medium text-sm sm:text-base text-[#444444] leading-relaxed max-w-[62ch]">
            I work best where the stakes are real and the data is dense. My job is to remove the friction, so the next decision comes faster.
          </p>
        </motion.div>

        {/* /A /B /C Columns with Varying Neo-Brutalist Colors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
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
                  whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.015 }}
                  style={{
                    transform: `translate3d(0, ${colParallaxY}px, 0)`,
                  }}
                  className={`group relative p-6 sm:p-7 rounded-3xl ${meta.bg} border-2 border-[#111111] shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#111111] flex flex-col justify-between transition-all duration-300 ease-out will-change-transform overflow-hidden h-full`}
                >
                  {/* Top Indicator stripe */}
                  <div className={`absolute top-0 left-0 right-0 h-2 ${meta.stripe}`} />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-sans font-black text-2xl text-[#111111] group-hover:scale-110 transition-transform origin-left inline-block">
                        /{point.letter}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider font-extrabold border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] ${meta.stampBg}`}>
                        {meta.tagline}
                      </span>
                    </div>

                    <h4 className="card-title font-sans font-bold text-lg sm:text-xl text-[#111111] leading-snug mb-2.5 transition-colors duration-200">
                      {renderCardTitle(point.title, index)}
                    </h4>

                    <p className="font-sans text-[13px] sm:text-[14px] text-[#333333] leading-relaxed font-medium mb-4">
                      {point.description}
                    </p>
                  </div>

                  {/* Refined Tags */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t-2 border-[#111111]/20">
                    {point.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider font-extrabold bg-white text-[#111111] border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] hover:bg-[#111111] hover:text-white transition-colors duration-150 cursor-default"
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
