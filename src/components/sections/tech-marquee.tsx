"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { TECH_MARQUEE } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";

export function TechMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  const marqueeItems = [...TECH_MARQUEE, ...TECH_MARQUEE, ...TECH_MARQUEE, ...TECH_MARQUEE];

  const hoveredRef = useRef(false);

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

    const handleMouseEnter = () => { hoveredRef.current = true; };
    const handleMouseLeave = () => { hoveredRef.current = false; };
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = Math.max(1, now - lastScrollTime);
      const velocity = deltaY / deltaTime;

      lastScrollY = currentScrollY;
      lastScrollTime = now;

      const boost = 1 + Math.min(3.2, velocity * 2.2);
      targetSpeedBoost = Math.max(targetSpeedBoost, boost);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const render = () => {
      if (!isIntersecting) {
        animId = null;
        return;
      }

      currentSpeedBoost += (targetSpeedBoost - currentSpeedBoost) * 0.1;
      targetSpeedBoost += (1.0 - targetSpeedBoost) * 0.05;

      const hoverFactor = hoveredRef.current ? 0.3 : 1.0;
      const step = baseSpeed * currentSpeedBoost * hoverFactor;
      currentX -= step;

      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0 && Math.abs(currentX) >= halfWidth) {
        currentX += halfWidth;
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const halfContainerWidth = Math.max(1, containerRect.width / 2);

      for (let i = 0; i < itemsRef.current.length; i++) {
        const itemEl = itemsRef.current[i];
        if (!itemEl) continue;

        const itemRect = itemEl.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;

        if (itemRect.right < containerRect.left - 100 || itemRect.left > containerRect.right + 100) {
          continue;
        }

        const distFromCenter = Math.abs(itemCenterX - centerX) / halfContainerWidth;
        const normDist = Math.min(1, Math.max(0, distFromCenter));

        const scale = 1.08 - 0.28 * Math.pow(normDist, 1.4);
        const opacity = 1 - 0.35 * Math.pow(normDist, 2);

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
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      id="tech"
      aria-label="06 Previously trusted by / Stack"
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t-2 border-[#111111]/20 overflow-hidden bg-transparent scroll-mt-16 perspective-1200"
    >
      <div className="site-container mb-6 sm:mb-10">
        {/* Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b-[1.5px] border-[#111111]/20 gap-4">
          <div className="space-y-3">
            <EyebrowPill accent="CORE STACK" text="TRUSTED ARCHITECTURES & TOOLING" />
            <h2 className="font-serif font-bold text-fluid-h2 text-[#111111] leading-[1.02] tracking-[-0.03em]">
              Previously Trusted By / <em className="font-serif-italic italic text-accent font-normal accent-underline">Core Stack</em>
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
            Applied AI & Full-Stack Tooling
          </span>
        </Reveal>

        <p className="lead-intro font-sans text-base sm:text-lg text-text-muted leading-relaxed max-w-[60ch] mt-6">
          High-throughput vector search, deterministic pipeline execution, and reactive user interfaces built with battle-tested frameworks.
        </p>
      </div>

      {/* Highlighted Ribbon Marquee Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden group py-6 sm:py-8 select-none bg-white/80 backdrop-blur-sm border-y-2 border-[#111111] shadow-[0_2px_0px_#111111]"
      >
        {/* Edge Gradient Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 z-10 bg-gradient-to-r from-[var(--canvas)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 z-10 bg-gradient-to-l from-[var(--canvas)] to-transparent" />

        {/* Marquee Continuous Track */}
        <div
          ref={trackRef}
          className="flex w-max will-change-transform items-center"
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="mx-2 sm:mx-3.5 lg:mx-4 flex items-center gap-2 sm:gap-2.5 px-4 py-2 rounded-full bg-[#FAF8F5] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:bg-white cursor-default select-none will-change-transform origin-center transition-all duration-200 group/chip"
            >
              <span className="font-sans font-medium text-sm text-[#111111] group-hover/chip:text-accent transition-colors">
                {item.name}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                /{item.category}
              </span>
              <span className="text-accent/50 ml-2 group-hover/chip:text-accent group-hover/chip:rotate-90 font-mono text-xs select-none transition-transform duration-300">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
