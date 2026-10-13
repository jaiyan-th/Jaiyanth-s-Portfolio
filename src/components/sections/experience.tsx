"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Briefcase, Cpu, Terminal, Code2 } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  // Count-up stats
  const [stat1, setStat1] = useState(0);
  const [stat2, setStat2] = useState(0);
  const [stat3, setStat3] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t border-[#E2DFD7] bg-[#ECE9E1]/35 scroll-mt-16 perspective-1200 transition-colors"
    >
      <div className="site-container">
        {/* Section Header: On phones stack right label under title */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-12 pb-5 border-b border-[#E2DFD7] gap-2">
          <div className="flex items-baseline gap-3 sm:gap-4">
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#E5341B]/10 border border-[#E5341B]/30 text-[#E5341B] font-mono text-xs font-bold tracking-wider">
              03
            </span>
            <h2 className="text-fluid-h2 font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
              Experience
            </h2>
          </div>
          <span className="text-fluid-mono uppercase tracking-widest text-[#666666]">
            Applied AI & Industry Internship
          </span>
        </Reveal>

        {/* Experience Content wrapped in elevated Stage Card */}
        <div className="w-full rounded-2xl bg-white border border-[#E2DFD7] p-6 sm:p-10 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#0A0A0A]/20 preserve-3d">
          {/* Subtle Top Red Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E5341B] via-[#E5341B]/40 to-transparent" />

          {/* Card Top: Company, Role, Period & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-[#E5341B] shrink-0" />
                <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E2DFD7] text-[#0A0A0A] font-mono text-xs font-semibold">
                  {EXPERIENCE.organisation}
                </span>
                <span className="text-[#666666] text-fluid-mono font-medium">· Coimbatore, India</span>
              </div>
              <h3 className="text-fluid-h3 font-extrabold tracking-[-0.02em] text-[#0A0A0A]">
                {EXPERIENCE.role}
              </h3>
            </div>

            <div className="flex items-center gap-4 text-fluid-mono">
              <span className="text-[#666666] font-medium">
                {EXPERIENCE.period}
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                <span className="w-2 h-2 rounded-full bg-[#1FB866] animate-pulse" />
                Completed
              </span>
            </div>
          </div>

          {/* Narrative */}
          <p className="text-fluid-body text-[#555555] leading-relaxed mb-8 sm:mb-10 max-w-4xl font-normal">
            Shipped applied-AI prototypes that needed to work reliably in production environments, not just in demos. Focused on vector RAG pipelines, multi-turn reasoning workflows with strict JSON validation, and clean RESTful API integrations.
          </p>

          {/* 3 Skill Columns: 1 column on phones, 3 columns on tablet/desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14 perspective-1200">
            {focusAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={
                    shouldReduceMotion || isMobile
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
                  whileHover={shouldReduceMotion || isMobile ? {} : { y: -5, scale: 1.015 }}
                  className="group p-6 rounded-xl bg-white border border-[#E2DFD7] hover:border-[#0A0A0A]/30 shadow-sm hover:shadow-lg flex flex-col justify-between transition-all duration-300 cursor-default"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] group-hover:bg-[#E5341B] group-hover:text-white flex items-center justify-center text-[#E5341B] shrink-0 transition-colors duration-200 shadow-xs">
                        <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[#888888] group-hover:text-[#E5341B] tracking-widest uppercase transition-colors">
                        0{idx + 1} // FOCUS
                      </span>
                    </div>
                    <h4 className="font-bold text-base sm:text-lg text-[#0A0A0A] group-hover:text-[#E5341B] transition-colors mb-2">
                      {area.title}
                    </h4>
                    <p className="text-fluid-small text-[#555555] leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E2DFD7]/60 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#888888] font-medium">Production Verified</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1FB866] animate-pulse" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stats Row & Stack: Stays 3 across down to 360px */}
          <div
            ref={statsRef}
            className="pt-6 sm:pt-8 border-t border-[#E2DFD7] flex flex-col lg:flex-row lg:items-center justify-between gap-6 perspective-1200"
          >
            {/* 3 Stats: Stays 3 across even on 360px phones with auto spacing */}
            <div className="grid grid-cols-3 gap-3 sm:gap-8 max-w-lg">
              {/* Stat 1 */}
              <motion.div
                initial={
                  shouldReduceMotion || isMobile
                    ? { opacity: 0, y: 10 }
                    : { opacity: 0, rotateX: -45, y: 20 }
                }
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group flex flex-col cursor-default"
              >
                <div className="font-mono text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0A0A0A] group-hover:text-[#E5341B] transition-colors">
                  {stat1}+
                </div>
                <div className="text-fluid-mono uppercase tracking-wider text-[#666666] font-semibold text-[11px] sm:text-xs">
                  Prototypes Shipped
                </div>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={
                  shouldReduceMotion || isMobile
                    ? { opacity: 0, y: 10 }
                    : { opacity: 0, rotateX: -45, y: 20 }
                }
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group flex flex-col cursor-default"
              >
                <div className="font-mono text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0A0A0A] group-hover:text-[#E5341B] transition-colors">
                  &lt; {stat2}ms
                </div>
                <div className="text-fluid-mono uppercase tracking-wider text-[#666666] font-semibold text-[11px] sm:text-xs">
                  Retrieval Latency
                </div>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                initial={
                  shouldReduceMotion || isMobile
                    ? { opacity: 0, y: 10 }
                    : { opacity: 0, rotateX: -45, y: 20 }
                }
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group flex flex-col cursor-default"
              >
                <div className="font-mono text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0A0A0A] group-hover:text-[#E5341B] transition-colors">
                  {stat3}%
                </div>
                <div className="text-fluid-mono uppercase tracking-wider text-[#666666] font-semibold text-[11px] sm:text-xs">
                  Contract Safety
                </div>
              </motion.div>
            </div>

            {/* Stack Line */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-fluid-mono text-[#0A0A0A]">
              <span className="text-[#888888] font-bold text-[11px] sm:text-xs uppercase tracking-wider mr-1">
                STACK:
              </span>
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-white border border-[#E2DFD7] hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-150 cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
