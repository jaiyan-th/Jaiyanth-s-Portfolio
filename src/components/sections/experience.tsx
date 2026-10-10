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
      <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-8 xl:px-0">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 pb-5 border-b border-[#E6E3DC]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-accent-hover tracking-widest uppercase font-semibold">
              03
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A]">
              Experience
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] mt-2 sm:mt-0">
            Applied AI & Industry Internship
          </span>
        </motion.div>

        {/* Clean Unified Experience Card */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[#E6E3DC] bg-white p-7 sm:p-10 shadow-xs hover:border-[#0A0A0A]/30 hover:shadow-md transition-all duration-300"
        >
          {/* Card Top: Company, Role, Period & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E6E3DC]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Briefcase className="w-4 h-4 text-accent" />
                <span className="font-mono text-xs uppercase tracking-widest text-accent-hover font-semibold">
                  {EXPERIENCE.organisation}
                </span>
                <span className="text-[#6B6B6B] text-xs font-mono">· Coimbatore, India</span>
              </div>
              <h3 className="text-2xl font-medium tracking-tight text-[#0A0A0A]">
                {EXPERIENCE.role}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#6B6B6B] bg-[#F5F3EE] px-3 py-1 rounded-full border border-[#E6E3DC]">
                {EXPERIENCE.period}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent-tint text-accent-hover border border-accent/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Completed
              </span>
            </div>
          </div>

          {/* Simple, Punchy Narrative */}
          <p className="text-base text-[#6B6B6B] leading-relaxed mb-8 max-w-3xl">
            Shipped applied-AI prototypes that needed to work reliably in production environments, not just in demos. Focused on vector RAG pipelines, multi-turn reasoning workflows with strict JSON validation, and clean RESTful API integrations.
          </p>

          {/* 3 Core Focus Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {focusAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  data-draggable="true"
                  className="p-5 rounded-xl bg-[#FAF9F5] border border-[#E6E3DC] hover:border-accent/30 hover:bg-white transition-all duration-200 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#E6E3DC] flex items-center justify-center text-[#0A0A0A]">
                      <Icon className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <h4 className="font-medium text-sm text-[#0A0A0A]">
                      {area.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: Metrics & Stack */}
          <div className="pt-6 border-t border-[#E6E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* 3 Metrics */}
            <div className="flex items-center gap-6 sm:gap-8">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-mono text-lg font-bold text-[#0A0A0A]">
                    {m.value}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#6B6B6B]">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Stack Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-md text-xs font-mono text-[#0A0A0A] bg-[#FAF9F5] border border-[#E6E3DC]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

