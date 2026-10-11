"use client";

import { motion, useReducedMotion } from "motion/react";
import { Briefcase, Cpu, Terminal, Code2 } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";

export function Experience() {
  const shouldReduceMotion = useReducedMotion();

  const metrics = [
    { label: "Prototypes Shipped", value: "3+" },
    { label: "Retrieval Latency", value: "< 800ms" },
    { label: "Contract Safety", value: "100%" },
  ];

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
      className="relative py-16 sm:py-20 border-t border-[#E6E3DC] bg-transparent scroll-mt-20"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 pb-5 border-b border-[#E6E3DC]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-accent tracking-widest uppercase font-semibold">
              03
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A]">
              Experience
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666] mt-2 sm:mt-0">
            Applied AI & Industry Internship
          </span>
        </motion.div>

        {/* Unboxed Open Layout: No outer card border or content boxes */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {/* Card Top: Company, Role, Period & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Briefcase className="w-4 h-4 text-accent" />
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                  {EXPERIENCE.organisation}
                </span>
                <span className="text-[#666666] text-xs font-mono font-medium">· Coimbatore, India</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A]">
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
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed mb-8 max-w-4xl font-normal">
            Shipped applied-AI prototypes that needed to work reliably in production environments, not just in demos. Focused on vector RAG pipelines, multi-turn reasoning workflows with strict JSON validation, and clean RESTful API integrations.
          </p>

          {/* 3 Core Focus Pillars (Completely unboxed, no cards, no borders) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-12">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.title} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-accent shrink-0" />
                    <h4 className="font-bold text-base text-[#0A0A0A]">
                      {area.title}
                    </h4>
                  </div>
                  <p className="text-sm text-[#666666] leading-relaxed">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: Metrics & Stack */}
          <div className="pt-6 border-t border-[#E6E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* 3 Metrics */}
            <div className="flex items-center gap-6 sm:gap-10">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-mono text-xl font-black text-[#0A0A0A]">
                    {m.value}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666] font-semibold">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Stack Tags (Clean inline typography, no boxes) */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#0A0A0A]">
              <span className="text-[#888888] font-bold text-[11px] uppercase tracking-wider mr-1">
                STACK:
              </span>
              <span className="font-medium text-[#0A0A0A]">
                {tools.join(" · ")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
