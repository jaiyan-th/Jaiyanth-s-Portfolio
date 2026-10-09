"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Briefcase,
  CheckCircle2,
  Terminal,
  Code2,
  Cpu,
  Layers,
  ArrowUpRight,
  Sparkles,
  GitBranch,
} from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";

export function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const highlights = [
    {
      index: "01",
      icon: Cpu,
      title: "Production RAG Pipelines",
      tag: "Vector Search · Latency Budget",
      description:
        "Engineered end-to-end vector retrieval pipelines uniting dense embeddings with grounded vector storage for fast, sub-second context querying with zero hallucination.",
    },
    {
      index: "02",
      icon: Terminal,
      title: "LLM Reasoning & Chains",
      tag: "Schema Validation · Guardrails",
      description:
        "Structured multi-turn reasoning workflows with deterministic JSON schema validation, retry policies, and guardrails against model drift and token overflow.",
    },
    {
      index: "03",
      icon: Code2,
      title: "RESTful Microservice APIs",
      tag: "Contract Safety · FastAPI",
      description:
        "Integrated backend endpoints with strict Pydantic/TypeScript contract validation, defensive exception handling, and comprehensive automated test suites.",
    },
    {
      index: "04",
      icon: CheckCircle2,
      title: "Engineering Habits & Quality",
      tag: "CI/CD · Prompt Benchmarking",
      description:
        "Practiced collaborative Git workflows, automated testing, peer code reviews, and systematic prompt benchmarking across production model iterations.",
    },
  ];

  const tools = [
    { name: "Python", category: "Core" },
    { name: "LangChain", category: "Orchestration" },
    { name: "RAG Architecture", category: "AI System" },
    { name: "FastAPI", category: "Backend" },
    { name: "Vector Stores", category: "Retrieval" },
    { name: "Prompt Engineering", category: "Evaluation" },
    { name: "REST APIs", category: "Integration" },
    { name: "Git & GitHub", category: "Workflow" },
    { name: "Automated Testing", category: "QA" },
  ];

  const metrics = [
    { label: "Prototypes Shipped", value: "3+", detail: "Production AI systems" },
    { label: "Retrieval Latency", value: "< 800ms", detail: "Vector store queries" },
    { label: "Contract Safety", value: "100%", detail: "Schema validated" },
  ];

  return (
    <section
      id="experience"
      aria-label="03 Work Experience & Internship"
      className="relative py-16 sm:py-24 border-t border-[#E6E3DC] bg-transparent scroll-mt-20 overflow-hidden"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-12 pb-6 border-b border-[#E6E3DC]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-accent-hover tracking-widest uppercase font-semibold">
              03
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A0A0A]">
              Experience
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] mt-2 sm:mt-0">
            Production Applied AI & Industry Internship
          </span>
        </motion.div>

        {/* Asymmetric Split Layout: Left Anchor (Overview) + Right Grid (Pillars) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-10">
          {/* Left Column: Organization, Role, Narrative, and Telemetry (~42%) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#E6E3DC] bg-white p-7 sm:p-9 shadow-xs hover:border-[#0A0A0A]/30 transition-all duration-300"
          >
            <div>
              {/* Status Badge & Period */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-[#E6E3DC]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent-tint text-accent-hover border border-accent/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  <span>Completed & Evaluated</span>
                </div>
                <span className="text-xs font-mono text-[#6B6B6B]">
                  {EXPERIENCE.period}
                </span>
              </div>

              {/* Organization & Role */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-3.5 h-3.5 text-accent" />
                  <span className="font-mono text-xs uppercase tracking-widest text-accent-hover font-semibold">
                    {EXPERIENCE.organisation}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A] leading-tight mb-3">
                  {EXPERIENCE.role}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#6B6B6B]">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#F5F3EE] border border-[#E6E3DC]">
                    Coimbatore, India
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#F5F3EE] border border-[#E6E3DC]">
                    Full-Stack & Applied AI
                  </span>
                </div>
              </div>

              {/* Editorial Narrative */}
              <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed mb-8">
                Built applied-AI prototypes that needed to work reliably in
                production environments, not just in demos. Shipped vector RAG
                pipelines, fine-tuned LLM reasoning workflows, integrated
                third-party REST APIs cleanly, and practiced the core
                engineering habits that make AI systems dependable.
              </p>
            </div>

            {/* Live Telemetry / Mini Stat Strip */}
            <div className="pt-6 border-t border-[#E6E3DC] grid grid-cols-3 gap-3">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 rounded-xl bg-[#F5F3EE] border border-[#E6E3DC]/80 flex flex-col justify-between"
                >
                  <span className="text-base sm:text-lg font-mono font-bold text-[#0A0A0A] tracking-tight">
                    {m.value}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B6B] mt-0.5">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 4 Interactive Engineering Milestone Cards (~58%) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredCard === idx;
              return (
                <motion.div
                  key={item.index}
                  initial={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: shouldReduceMotion ? 0 : idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative p-6 sm:p-7 rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md ${
                    isHovered
                      ? "border-accent/40 -translate-y-1"
                      : "border-[#E6E3DC] hover:border-[#0A0A0A]/30"
                  }`}
                >
                  <div>
                    {/* Header: Index + Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs font-bold text-accent-hover tracking-wider">
                        MILESTONE {item.index}
                      </span>
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isHovered
                            ? "bg-accent text-white scale-110 shadow-xs"
                            : "bg-[#F5F3EE] text-[#0A0A0A]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Milestone Title */}
                    <h4 className="text-lg font-medium text-[#0A0A0A] tracking-tight mb-2 group-hover:text-accent transition-colors duration-200">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-6 font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Micro Tag Footer */}
                  <div className="pt-4 border-t border-[#E6E3DC] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#6B6B6B]">
                      {item.tag}
                    </span>
                    <Sparkles
                      className={`w-3.5 h-3.5 transition-opacity duration-200 ${
                        isHovered ? "opacity-100 text-accent" : "opacity-0"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Tooling Ribbon */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="p-5 sm:p-6 rounded-2xl border border-[#E6E3DC] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
        >
          <div className="flex items-center gap-2 shrink-0">
            <Layers className="w-4 h-4 text-accent" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#0A0A0A] font-semibold">
              Core Tooling & Stack
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {tools.map((t) => (
              <span
                key={t.name}
                className="group/pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#F5F3EE] text-[#0A0A0A] border border-[#E6E3DC] hover:border-accent hover:text-accent transition-all duration-150 cursor-default"
              >
                <span>{t.name}</span>
                <span className="text-[9px] uppercase tracking-wider text-[#6B6B6B] border-l border-[#E6E3DC] pl-1.5 group-hover/pill:text-accent-hover">
                  {t.category}
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
