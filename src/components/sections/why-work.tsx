"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { WHY_WORK_WITH_ME } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

const CARD_METAS = [
  {
    stampBg: "bg-[#FFE45C] text-[#0A0A0A]",
    tagline: "// 01 · PRODUCTION AI",
    speedFactor: 0.08, // Parallax depth factor A
  },
  {
    stampBg: "bg-[#E8E5DD] text-[#0A0A0A]",
    tagline: "// 02 · ARCHITECTURE",
    speedFactor: 0.14, // Parallax depth factor B
  },
  {
    stampBg: "bg-[#FFE3E0] text-[#0A0A0A]",
    tagline: "// 03 · RIGOUR & VELOCITY",
    speedFactor: 0.20, // Parallax depth factor C
  },
];

export function WhyWork() {
  const shouldReduceMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldReduceMotion, isMobile]);

  return (
    <section
      id="why-work"
      aria-label="05 Why work with me"
      className="relative py-16 sm:py-24 border-t border-[#E2DFD7] bg-transparent perspective-1200"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Reusable Reveal & Animated Red Underline */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-12 pb-6 border-b border-[#E2DFD7]">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-base sm:text-lg text-[#E5341B] tracking-widest uppercase font-extrabold">
              05
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
              Why Work With Me?
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666] mt-2 sm:mt-0">
            Strategy & Craft
          </span>
        </Reveal>

        {/* Section Statement */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-14 sm:mb-16"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-tight mb-4 text-[#0A0A0A]">
            <RevealHeading
              lines={[
                { text: "Engineers who can hold both ends —" },
                { text: "", accent: "applied AI", afterAccent: " & full-stack systems," },
                { text: "are rare." },
              ]}
            />
          </h3>
          <p className="text-base sm:text-lg text-[#555555] font-normal leading-relaxed max-w-4xl">
            I work best where the stakes are real and the data is dense. My job is to remove the friction, so the next decision comes faster.
          </p>
        </motion.div>

        {/* /A /B /C Columns rising at different depth parallax speeds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 perspective-1200">
          {WHY_WORK_WITH_ME.map((point, index) => {
            const meta = CARD_METAS[index % CARD_METAS.length];
            const colParallaxY =
              shouldReduceMotion || isMobile ? 0 : -scrollY * meta.speedFactor * 0.15;

            return (
              <motion.div
                key={point.letter}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                style={{
                  transform: `translate3d(0, ${colParallaxY}px, 0)`,
                }}
                className="p-6 rounded-md bg-white hard-shadow flex flex-col justify-between transition-transform duration-75 ease-out will-change-transform"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-extrabold text-[#E5341B]">
                      /{point.letter}
                    </span>
                    <span className={`neo-sticker ${meta.stampBg} font-bold`}>
                      {meta.tagline}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-extrabold tracking-[-0.02em] text-[#0A0A0A] leading-snug mb-3">
                    {point.title}
                  </h4>

                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-normal mb-6">
                    {point.description}
                  </p>
                </div>

                {/* Sticker Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E2DFD7]/60">
                  {point.tags.map((tag, tIdx) => (
                    <span
                      key={tag}
                      className={`neo-sticker text-[10px] ${
                        tIdx % 2 === 0
                          ? "bg-[#F2ECE4] text-[#0A0A0A]"
                          : "neo-sticker-alt bg-[#FAF3EE] text-[#555555]"
                      }`}
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
