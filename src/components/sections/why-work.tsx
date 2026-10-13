"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { WHY_WORK_WITH_ME } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

const CARD_METAS = [
  {
    stampBg: "bg-[#0A0A0A] text-white",
    tagline: "// 01 · PRODUCTION AI",
    speedFactor: 0.08,
  },
  {
    stampBg: "bg-[#EAE7DF] text-[#0A0A0A]",
    tagline: "// 02 · ARCHITECTURE",
    speedFactor: 0.14,
  },
  {
    stampBg: "bg-[#FFE8E5] text-[#E5341B]",
    tagline: "// 03 · RIGOUR & VELOCITY",
    speedFactor: 0.20,
  },
];

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
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t border-[#E2DFD7] bg-transparent scroll-mt-16 perspective-1200"
    >
      <div className="site-container">
        {/* Section Header: On phones stack right label under title */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-12 pb-5 border-b border-[#E2DFD7] gap-2">
          <div className="flex items-baseline gap-3 sm:gap-4">
            <span className="text-fluid-mono text-[#E5341B] tracking-widest uppercase font-extrabold">
              05
            </span>
            <h2 className="text-fluid-h2 font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
              Why Work With Me?
            </h2>
          </div>
          <span className="text-fluid-mono uppercase tracking-widest text-[#666666]">
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
          <h3 className="text-fluid-h2 font-extrabold tracking-[-0.03em] leading-tight mb-4 text-[#0A0A0A]">
            <RevealHeading
              lines={[
                { text: "Engineers who can hold both ends —" },
                { text: "", accent: "applied AI", afterAccent: " & full-stack systems," },
                { text: "are rare." },
              ]}
            />
          </h3>
          <p className="text-fluid-lead text-[#555555] font-normal leading-relaxed max-w-4xl">
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
                  className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-[#E2DFD7] hover:border-[#0A0A0A]/30 shadow-sm hover:shadow-xl flex flex-col justify-between transition-all duration-300 ease-out will-change-transform overflow-hidden"
                >
                  {/* Top Red Indicator stripe */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#E5341B] transition-colors duration-200" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xl font-extrabold text-[#E5341B] group-hover:scale-110 transition-transform origin-left inline-block">
                        /{point.letter}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full font-mono text-xs font-semibold ${meta.stampBg}`}>
                        {meta.tagline}
                      </span>
                    </div>

                    <h4 className="text-fluid-h3 font-extrabold tracking-[-0.02em] text-[#0A0A0A] group-hover:text-[#E5341B] leading-snug mb-3 transition-colors duration-200">
                      {point.title}
                    </h4>

                    <p className="text-fluid-body text-[#555555] leading-relaxed font-normal mb-6">
                      {point.description}
                    </p>
                  </div>

                  {/* Refined Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E2DFD7]/60">
                    {point.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[11px] bg-[#F2ECE4] text-[#555555] hover:bg-[#0A0A0A] hover:text-white transition-colors duration-150 cursor-default"
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
