"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * SectionProgressTrail — a fixed vertical progress trail on the left edge
 * that fills as the user scrolls through the page.
 *
 * Shows numbered section markers (01–06) that brighten as their section
 * enters the viewport, connected by a thin progress line.
 *
 * - Hidden on mobile (< lg)
 * - Respects prefers-reduced-motion (renders static, no progress fill animation)
 * - Uses useScroll on the document body — no layout shift, GPU-friendly
 * - Sits at z-40 so it's above section content but below nav (z-70) and dialog (z-120)
 */

const SECTIONS = [
  { index: "01", id: "about", label: "About" },
  { index: "02", id: "skills", label: "Skills" },
  { index: "03", id: "work", label: "Work" },
  { index: "04", id: "experience", label: "Experience" },
  { index: "05", id: "research", label: "Research" },
  { index: "06", id: "contact", label: "Contact" },
];

export function SectionProgressTrail() {
  const [reduced, setReduced] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("about");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Track which section is in view
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setActiveSection(s.id);
          }
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, []);

  if (reduced) return null;

  return (
    <SectionTrailInner activeSection={activeSection} />
  );
}

function SectionTrailInner({ activeSection }: { activeSection: string }) {
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Position the trail vertically — centered group of 6 markers
  // Each marker is spaced ~56px apart, total height ~336px → centered
  return (
    <motion.nav
      aria-label="Section progress"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-0"
    >
      {/* Track background */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full"
        style={{ background: "var(--line)" }}
      />
      {/* Progress fill */}
      <motion.div
        aria-hidden
        style={{ height: lineHeight }}
        className="absolute left-1/2 top-0 -translate-x-1/2 w-px"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, var(--accent), color-mix(in oklab, var(--accent) 40%, transparent))",
          }}
        />
      </motion.div>

      {/* Section markers */}
      <div className="relative flex flex-col items-center gap-[44px] py-2">
        {SECTIONS.map((s) => {
          const isActive = activeSection === s.id;
          const activeIndex = SECTIONS.findIndex((x) => x.id === activeSection);
          const myIndex = SECTIONS.findIndex((x) => x.id === s.id);
          const isPassed = myIndex < activeIndex;
          return (
            <a
              key={s.id}
              href={`/#${s.id}`}
              className="group flex items-center gap-3 -ml-16"
              aria-label={`Jump to ${s.label}`}
            >
              {/* Number label — fades in when active or passed */}
              <span
                className={`font-mono-label !text-[9px] transition-all duration-500 ${
                  isActive || isPassed
                    ? "opacity-100"
                    : "opacity-30 group-hover:opacity-70"
                }`}
                style={{
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  transform: isActive ? "translateX(2px)" : "none",
                }}
              >
                {s.index}
              </span>
              {/* Dot */}
              <span className="relative grid place-items-center">
                {/* Active pulse ring */}
                {isActive && (
                  <motion.span
                    layoutId="trail-active"
                    className="absolute h-4 w-4 rounded-full"
                    style={{
                      background:
                        "color-mix(in oklab, var(--accent) 20%, transparent)",
                      border: "1px solid var(--accent)",
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span
                  className="h-2 w-2 rounded-full transition-all duration-500"
                  style={{
                    background: isActive
                      ? "var(--accent)"
                      : isPassed
                        ? "color-mix(in oklab, var(--accent) 50%, transparent)"
                        : "var(--line)",
                    transform: isActive ? "scale(1.3)" : "scale(1)",
                  }}
                />
              </span>
              {/* Label — only visible on hover or when active */}
              <span
                className={`absolute left-12 whitespace-nowrap font-mono-label !text-[9px] transition-all duration-300 ${
                  isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-60"
                }`}
                style={{ color: "var(--text-secondary)" }}
              >
                {s.label}
              </span>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
