"use client";

import { motion } from "motion/react";
import { Briefcase, CheckCircle2, Terminal, Code2, Cpu } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";

export function Experience() {
  const highlights = [
    {
      index: "01",
      title: "Production RAG Pipelines",
      description:
        "Engineered end-to-end vector retrieval pipelines uniting dense embeddings with grounded vector storage for fast, reliable context querying.",
    },
    {
      index: "02",
      title: "LLM Reasoning & Chains",
      description:
        "Structured multi-turn reasoning workflows with deterministic JSON schema validation, retry policies, and guardrails against drift.",
    },
    {
      index: "03",
      title: "RESTful Microservice APIs",
      description:
        "Integrated backend endpoints with strict contract validation, defensive exception handling, and comprehensive unit tests.",
    },
    {
      index: "04",
      title: "Engineering Habits",
      description:
        "Practiced collaborative version control, automated testing, peer code reviews, and iterative prompt benchmarking.",
    },
  ];

  const tools = [
    "Python",
    "LangChain",
    "RAG Architectures",
    "FastAPI",
    "Vector Stores",
    "Prompt Engineering",
    "REST APIs",
    "Git & GitHub",
    "Automated Testing",
  ];

  return (
    <section
      id="experience"
      aria-label="03 Work Experience & Internship"
      className="relative py-14 sm:py-18 border-t border-[#E5E3DB] bg-transparent scroll-mt-20"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 sm:mb-12 pb-6 border-b border-[#E5E3DB]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-accent-hover tracking-widest uppercase font-semibold">
              03
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A0A0A]">
              Experience
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mt-2 sm:mt-0">
            Production Applied AI & Industry Internship
          </span>
        </motion.div>

        {/* Featured Internship Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[#E5E3DB] bg-white p-6 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 hover:border-[#0A0A0A]/30 hover:shadow-md"
        >
          {/* Card Top Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E5E3DB]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-accent-tint text-accent-hover border border-accent/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Industry Internship
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A]">
                {EXPERIENCE.period} · Coimbatore, India
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border border-[#E5E3DB] bg-[#ECEAE3] text-[#0A0A0A]">
              <Briefcase className="w-3.5 h-3.5 text-accent" />
              <span>Full-Stack & Applied AI</span>
            </div>
          </div>

          {/* Role & Company Headline */}
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-hover block mb-3 font-semibold">
              {EXPERIENCE.organisation}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#0A0A0A] leading-tight">
              {EXPERIENCE.role}
            </h3>
          </div>

          {/* Narrative Summary */}
          <div className="mb-10 text-base sm:text-lg text-[#6F6E6A] leading-relaxed max-w-4xl">
            <p>
              Built applied-AI prototypes that needed to work reliably in production environments, not just in demos. Shipped vector RAG pipelines, fine-tuned LLM reasoning workflows, integrated third-party REST APIs cleanly, and practiced the core engineering habits — debugging, testing, prompt iteration, and team feedback — that make AI systems dependable.
            </p>
          </div>

          {/* 4 Impact Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-8 border-t border-[#E5E3DB] mb-10">
            {highlights.map((item) => (
              <div
                key={item.index}
                className="p-5 rounded-xl bg-[#FBFBFA] border border-[#E5E3DB]/80 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-accent-hover font-bold block mb-2">
                    {item.index}
                  </span>
                  <h4 className="font-medium text-base text-[#0A0A0A] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6F6E6A] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tools & Technologies */}
          <div className="pt-6 border-t border-[#E5E3DB] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mr-2">
              Focus & Tools:
            </span>
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-full text-xs font-mono text-[#0A0A0A] bg-[#ECEAE3] border border-[#E5E3DB]"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
