"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Briefcase, Cpu, Terminal, Code2 } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";

import { EyebrowPill } from "@/components/ui/eyebrow-pill";

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
      renderTitle: () => (
        <>
          RAG &amp; Vector{" "}
          <em className="accent font-serif-italic italic text-accent font-normal">Retrieval</em>
        </>
      ),
      description:
        "Engineered end-to-end vector retrieval pipelines for fast, grounded semantic querying with sub-second latency budgets.",
    },
    {
      icon: Terminal,
      title: "LLM Reasoning & Chains",
      renderTitle: () => (
        <>
          LLM Reasoning &amp;{" "}
          <em className="accent font-serif-italic italic text-accent font-normal">Chains</em>
        </>
      ),
      description:
        "Structured multi-turn reasoning workflows with deterministic JSON schema validation, retry policies, and guardrails.",
    },
    {
      icon: Code2,
      title: "Production REST APIs",
      renderTitle: () => (
        <>
          Production REST{" "}
          <em className="accent font-serif-italic italic text-accent font-normal">APIs</em>
        </>
      ),
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
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t-2 border-[#111111]/20 bg-[#ECE9E1]/35 scroll-mt-16 perspective-1200 transition-colors"
    >
      <div className="site-container">
        {/* Section Header with Eyebrow Pill and Instrument Serif H2 */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b-[1.5px] border-[#111111]/20 gap-3">
          <div className="flex flex-col gap-2.5">
            <EyebrowPill accent="EXPERIENCE" text="WHERE I'VE BUILT" />
            <h2 className="font-sans font-bold text-fluid-h2 text-[#111111] leading-[1.05] tracking-[-0.035em]">
              Work{" "}
              <em className="accent font-serif-italic italic text-accent font-normal accent-underline">
                Experience
              </em>
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#555555]">
            Applied AI &amp; Industry Internship
          </span>
        </Reveal>

        {/* Section Intro Paragraph with 2px solid accent left vertical line */}
        <div className="lead-intro mb-6">
          <p>
            Shipped applied-AI prototypes that needed to work reliably in production environments, not just in demos. Focused on vector RAG pipelines, multi-turn reasoning workflows with strict JSON validation, and clean RESTful API integrations.
          </p>
        </div>

        {/* Experience Content wrapped in elevated Stage Card */}
        <div className="w-full rounded-2xl bg-white border-2 border-[#111111] p-5 sm:p-6 shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#111111] relative overflow-hidden transition-all duration-300 preserve-3d">
          {/* Subtle Top Red Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#E8472B]" />

          {/* Card Top: Company, Role, Period & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b-[1.5px] border-[#111111]/20">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Briefcase className="w-4 h-4 text-[#E8472B] shrink-0" />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] text-[#111111] font-mono text-[11px] uppercase tracking-[0.08em] font-medium">
                  {EXPERIENCE.organisation}
                </span>
                <span className="text-[#555555] font-mono text-[11px] uppercase tracking-[0.08em]">
                  · Coimbatore, India
                </span>
              </div>
              <h3 className="card-title font-sans font-bold text-xl sm:text-2xl text-[#111111] leading-snug">
                Artificial Intelligence Intern — Brainery Spot{" "}
                <em className="accent font-serif-italic italic text-accent font-normal">Technology</em>
              </h3>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.08em]">
              <span className="text-[#555555]">
                {EXPERIENCE.period}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[#111111]">
                <span className="w-2 h-2 rounded-full bg-[#1FB866] animate-pulse" />
                Completed
              </span>
            </div>
          </div>

          {/* Narrative */}
          <p className="font-sans text-[15px] text-[var(--body)] leading-relaxed mb-5 max-w-4xl font-normal">
            Shipped applied-AI prototypes that needed to work reliably in production environments, not just in demos. Focused on vector RAG pipelines, multi-turn reasoning workflows with strict JSON validation, and clean RESTful API integrations.
          </p>

          {/* 3 Skill Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 perspective-1200">
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
                  className="group p-5 rounded-xl bg-white border-[1.5px] border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111] flex flex-col justify-between transition-all duration-300 cursor-default min-h-[160px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#111111]/20 group-hover:border-[#E8472B] group-hover:bg-[#E8472B] group-hover:text-white flex items-center justify-center text-[#E8472B] shrink-0 transition-colors duration-200">
                        <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                      </div>
                      <span className="font-mono text-[10px] font-medium text-[#888888] group-hover:text-[#E8472B] tracking-[0.08em] uppercase transition-colors">
                        0{idx + 1} // FOCUS
                      </span>
                    </div>
                    <h4 className="card-title font-sans font-bold text-lg sm:text-xl text-[#111111] group-hover:text-[#E8472B] transition-colors mb-1.5 leading-snug">
                      {area.renderTitle()}
                    </h4>
                    <p className="font-sans text-[14px] text-[var(--body)] leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t-[1.5px] border-[#111111]/20 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#555555] uppercase tracking-[0.08em]">
                      Production Verified
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1FB866] animate-pulse" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stats Row & Stack */}
          <div
            ref={statsRef}
            className="pt-4 sm:pt-5 border-t-[1.5px] border-[#111111]/20 flex flex-col lg:flex-row lg:items-center justify-between gap-5 perspective-1200"
          >
            {/* 3 Stats: Bold sans numbers with Mono captions */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 min-w-0">
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
                <div className="font-sans font-bold text-3xl sm:text-4xl text-[#111111] group-hover:text-[#E8472B] transition-colors leading-none">
                  {stat1}+
                </div>
                <div className="font-mono uppercase tracking-[0.08em] text-[#555555] text-[10px] sm:text-[11px] mt-1">
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
                <div className="font-sans font-bold text-3xl sm:text-4xl text-[#111111] group-hover:text-[#E8472B] transition-colors leading-none">
                  &lt; {stat2}ms
                </div>
                <div className="font-mono uppercase tracking-[0.08em] text-[#555555] text-[10px] sm:text-[11px] mt-1">
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
                <div className="font-sans font-bold text-3xl sm:text-4xl text-[#111111] group-hover:text-[#E8472B] transition-colors leading-none">
                  {stat3}%
                </div>
                <div className="font-mono uppercase tracking-[0.08em] text-[#555555] text-[10px] sm:text-[11px] mt-1">
                  Contract Safety
                </div>
              </motion.div>
            </div>

            {/* Stack Line */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#111111]">
              <span className="text-[#555555] font-medium mr-1">
                STACK:
              </span>
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] font-medium bg-white border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] hover:bg-[#111111] hover:text-white transition-all duration-150 cursor-default"
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
