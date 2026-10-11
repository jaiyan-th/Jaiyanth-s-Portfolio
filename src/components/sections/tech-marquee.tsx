"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TECH_MARQUEE } from "@/data/content";

export function TechMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const marqueeItems = [...TECH_MARQUEE, ...TECH_MARQUEE];
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(performance.now());

  // Scroll velocity responds: speed increases with scroll velocity, then eases back to normal
  useEffect(() => {
    if (shouldReduceMotion) return;

    let decayTimer: NodeJS.Timeout;

    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollY.current);
      const deltaTime = Math.max(1, now - lastScrollTime.current);
      const velocity = deltaY / deltaTime; // px per ms

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;

      // Calculate speed boost (clamped)
      const boost = Math.min(3.5, 1 + velocity * 1.8);
      setSpeedMultiplier(boost);

      clearTimeout(decayTimer);
      decayTimer = setTimeout(() => {
        setSpeedMultiplier(1);
      }, 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(decayTimer);
    };
  }, [shouldReduceMotion]);

  // Duration scales inversely with speedMultiplier (normal = 32s)
  const duration = (32 / speedMultiplier).toFixed(2);

  return (
    <section
      id="tech"
      aria-label="06 Previously trusted by / Stack"
      className="relative py-16 sm:py-24 border-t border-[#E2DFD7] overflow-hidden bg-transparent perspective-1200"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 mb-8 sm:mb-12">
        {/* Section Header with Animated Red Underline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-[#E2DFD7]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-base sm:text-lg text-[#E5341B] tracking-widest uppercase font-extrabold">
              06
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
              Previously trusted by / Core Stack
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666] mt-2 sm:mt-0">
            Applied AI & Full-Stack Tooling
          </span>
        </motion.div>
      </div>

      {/* 3D Cylinder Curve Marquee Container */}
      <div className="relative w-full overflow-hidden group py-6 marquee-cylinder">
        {/* Edge Gradient Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-10 bg-gradient-to-r from-[var(--canvas)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-10 bg-gradient-to-l from-[var(--canvas)] to-transparent" />

        {/* Marquee Track with Dynamic Velocity Speed */}
        <div
          className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
          style={{
            animationDuration: `${duration}s`,
          }}
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="mx-6 sm:mx-8 flex items-baseline gap-3 cursor-default select-none transition-transform duration-200 hover:scale-105"
            >
              <span className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight text-[#0A0A0A]">
                {item.name}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#888888] font-medium">
                /{item.category}
              </span>
              <span className="text-[#E5341B]/40 ml-6 sm:ml-8 font-mono text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
