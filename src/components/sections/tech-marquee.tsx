"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { TECH_MARQUEE } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

export function TechMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  // Quadruple items to ensure seamless infinite looping on ultra-wide screens
  const marqueeItems = [...TECH_MARQUEE, ...TECH_MARQUEE, ...TECH_MARQUEE, ...TECH_MARQUEE];

  useEffect(() => {
    if (shouldReduceMotion) return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let animId: number | null = null;
    let isIntersecting = true;
    let currentX = 0;
    const baseSpeed = 1.0;
    let currentSpeedBoost = 1.0;
    let targetSpeedBoost = 1.0;

    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();

    // IntersectionObserver to pause loop when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !animId) {
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Scroll velocity speedup: speed increases with scroll velocity, then eases back to 1
    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = Math.max(1, now - lastScrollTime);
      const velocity = deltaY / deltaTime; // px per ms

      lastScrollY = currentScrollY;
      lastScrollTime = now;

      // Boost scales with velocity up to 4.2x
      const boost = 1 + Math.min(3.2, velocity * 2.2);
      targetSpeedBoost = Math.max(targetSpeedBoost, boost);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Render loop: true curved look (items scale by distance from center) & velocity easing
    const render = () => {
      if (!isIntersecting) {
        animId = null;
        return;
      }

      // Smoothly ease boost toward target, then decay target toward 1.0
      currentSpeedBoost += (targetSpeedBoost - currentSpeedBoost) * 0.1;
      targetSpeedBoost += (1.0 - targetSpeedBoost) * 0.05;

      const step = baseSpeed * currentSpeedBoost;
      currentX -= step;

      // Reset when half of track has cycled
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0 && Math.abs(currentX) >= halfWidth) {
        currentX += halfWidth;
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;

      // Curved look: scale items based on distance from viewport center
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const halfContainerWidth = Math.max(1, containerRect.width / 2);

      for (let i = 0; i < itemsRef.current.length; i++) {
        const itemEl = itemsRef.current[i];
        if (!itemEl) continue;

        const itemRect = itemEl.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;

        // Skip calculations if completely off-screen
        if (itemRect.right < containerRect.left - 100 || itemRect.left > containerRect.right + 100) {
          continue;
        }

        const distFromCenter = Math.abs(itemCenterX - centerX) / halfContainerWidth;
        const normDist = Math.min(1, Math.max(0, distFromCenter));

        // Center items are 1.08x, edges scale down to 0.78x (curved cylinder depth)
        const scale = 1.08 - 0.3 * Math.pow(normDist, 1.4);
        const opacity = 1 - 0.4 * Math.pow(normDist, 2);

        itemEl.style.transform = `scale(${scale.toFixed(3)})`;
        itemEl.style.opacity = opacity.toFixed(3);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      id="tech"
      aria-label="06 Previously trusted by / Stack"
      className="relative py-16 sm:py-24 border-t border-[#E2DFD7] overflow-hidden bg-transparent perspective-1200"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 mb-8 sm:mb-12">
        {/* Section Header with Reusable Reveal & Animated Red Underline */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-[#E2DFD7]">
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
        </Reveal>
      </div>

      {/* True Curved Marquee Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden group py-8 select-none"
      >
        {/* Edge Gradient Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-10 bg-gradient-to-r from-[var(--canvas)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-10 bg-gradient-to-l from-[var(--canvas)] to-transparent" />

        {/* Marquee Continuous Track */}
        <div
          ref={trackRef}
          className="flex w-max will-change-transform"
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="mx-6 sm:mx-8 flex items-baseline gap-3 cursor-default select-none will-change-transform origin-center transition-transform duration-75"
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
