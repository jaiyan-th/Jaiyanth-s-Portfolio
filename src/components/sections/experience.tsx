"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Briefcase, Cpu, Terminal, Code2 } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";

export function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  // Count-up stats hook
  const [stat1, setStat1] = useState(0);
  const [stat2, setStat2] = useState(0);
  const [stat3, setStat3] = useState(0);

  useEffect(() => {
    if (!isStatsInView || shouldReduceMotion) {
      if (shouldReduceMotion) {
        setStat1(3);
        setStat2(800);
        setStat3(100);
      }
      return;
    }

    let start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const elapsed = Math.min(duration, now - start);
      const progress = elapsed / duration;
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setStat1(Math.floor(ease * 3));
      setStat2(Math.floor(ease * 800));
      setStat3(Math.floor(ease * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setStat1(3);
        setStat2(800);
        setStat3(100);
      }
    };

    requestAnimationFrame(tick);
  }, [isStatsInView, shouldReduceMotion]);

  const focusAreas = [
    {
      icon: Cpu,
      title: "RAG & Vector Retrieval",
      description:
        "Engineered end-to-end vector retrieval pipelines for fast, grounded semantic querying with sub-second latency budgets.",
    },
    {
      icon: Terminal,
      title: "LLM Reasoning & Chains",
      description:
        "Structured multi-turn reasoning workflows with deterministic JSON schema validation, retry policies, and guardrails.",
    },
    {
      icon: Code2,
      title: "Production REST APIs",
      description:
        "Integrated backend endpoints with strict contract validation, defensive exception handling, and automated test suites.",
    },
  ];

  const tools = [
    "Python",
    "LangChain",
    "RAG",
    "FastAPI",
    "Vector Databases",
    "Prompt Engineering",
    "Git",
  ];

  return (
    <section
      id="experience"
      aria-label="03 Work Experience & Internship"
      className="relative py-16 sm:py-24 border-t border-[#E2DFD7] bg-transparent scroll-mt-20 perspective-1200"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Animated Red Underline */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-12 pb-6 border-b border-[#E2DFD7]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-base sm:text-lg text-[#E5341B] tracking-widest uppercase font-extrabold">
              03
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
              Experience
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666] mt-2 sm:mt-0">
            Applied AI & Industry Internship
          </span>
        </motion.div>

        {/* Experience Content */}
        <div className="w-full preserve-3d">
          {/* Card Top: Company, Role, Period & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-[#E5341B]" />
                <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-bold">
                  {EXPERIENCE.organisation}
                </span>
                <span className="text-[#666666] text-xs font-mono font-medium">· Coimbatore, India</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-[#0A0A0A]">
                {EXPERIENCE.role}
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-[#666666] font-medium">
                {EXPERIENCE.period}
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                <span className="w-2 h-2 rounded-full bg-[#1FB866] animate-pulse" />
                Completed
              </span>
            </div>
          </div>

          {/* Simple, Punchy Narrative */}
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-10 max-w-4xl font-normal">
            Shipped applied-AI prototypes that needed to work reliably in production environments, not just in demos. Focused on vector RAG pipelines, multi-turn reasoning workflows with strict JSON validation, and clean RESTful API integrations.
          </p>

          {/* 3 Skill Columns: Slide in with rotateY(15deg) -> 0 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-14 perspective-1200">
            {focusAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, rotateY: 15, x: 24 }
                  }
                  whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="p-6 rounded-md bg-white hard-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-md bg-[#FAF3EE] flex items-center justify-center text-[#E5341B]">
                        <Icon className="w-4 h-4 text-[#E5341B]" />
                      </div>
                      <h4 className="font-bold text-base text-[#0A0A0A]">
                        {area.title}
                      </h4>
                    </div>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stats Row & Stack: Count up with 3D Flip-in */}
          <div
            ref={statsRef}
            className="pt-8 border-t border-[#E2DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-6 perspective-1200"
          >
            {/* 3 Stats with Count-Up & 3D Flip-in */}
            <div className="flex items-center gap-8 sm:gap-12">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, rotateX: -45, y: 20 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col"
              >
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
                  {stat1}+
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666] font-semibold">
                  Prototypes Shipped
                </div>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, rotateX: -45, y: 20 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col"
              >
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
                  &lt; {stat2}ms
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666] font-semibold">
                  Retrieval Latency
                </div>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, rotateX: -45, y: 20 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col"
              >
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
                  {stat3}%
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666] font-semibold">
                  Contract Safety
                </div>
              </motion.div>
            </div>

            {/* Stack Line: Staggered Fade In Left to Right */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#0A0A0A]">
              <span className="text-[#888888] font-bold text-[11px] uppercase tracking-wider mr-1">
                STACK:
              </span>
              {tools.map((tool, idx) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + idx * 0.06 }}
                  className="font-medium text-[#0A0A0A]"
                >
                  {tool}
                  {idx < tools.length - 1 && (
                    <span className="text-[#BBBBBB] ml-2">·</span>
                  )}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
