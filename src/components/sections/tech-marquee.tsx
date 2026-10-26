"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const MARQUEE_ITEMS = [
  "APPLIED AI",
  "RAG ARCHITECTURE",
  "FULL-STACK WEB",
  "NEXT.JS & TYPESCRIPT",
  "PYTHON & FASTAPI",
  "DETERMINISTIC AGENTS",
  "SUPABASE & SQL",
  "LANGCHAIN & VECTOR DB",
  "IEEE RESEARCH",
  "PRODUCTION SYSTEMS",
];

export function TechMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const track = trackRef.current;
    if (!track) return;

    let animId: number;
    let currentX = 0;
    const speed = 1.2;

    const animate = () => {
      currentX -= speed;
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(currentX) >= halfWidth) {
        currentX = 0;
      }
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [shouldReduceMotion]);

  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      aria-label="Technology Marquee Banner"
      className="relative w-full bg-[#6C47FF] border-y-2 border-[#111111] py-4 sm:py-5 overflow-hidden select-none z-20"
    >
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        {items.map((item, idx) => {
          const bulletColors = ["#FFD13B", "#4ADE80", "#38BDF8", "#FF4D4D", "#EDE9FE"];
          const bulletColor = bulletColors[idx % bulletColors.length];
          return (
            <div key={idx} className="flex items-center gap-5 sm:gap-7 mx-3 sm:mx-4">
              <span className="font-sans font-bold text-[14.5px] sm:text-[16px] md:text-[17px] text-white tracking-wide uppercase">
                {item}
              </span>
              {/* Cute Colored Smiley Bullet */}
              <span
                style={{ backgroundColor: bulletColor }}
                className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] shrink-0"
              >
                <span className="text-[12px] leading-none text-[#111111]">☻</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
