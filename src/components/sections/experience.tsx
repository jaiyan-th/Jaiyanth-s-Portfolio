"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Briefcase, Cpu, Terminal, Code2, ArrowRight } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";

import { EyebrowPill } from "@/components/ui/eyebrow-pill";

export function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t-2 border-[#111111] bg-[#F5F0E6] scroll-mt-20 transition-colors"
    >
      <div className="site-container max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b-2 border-[#111111] gap-3">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#6C47FF]" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#111111]">
                WHERE I&apos;VE BUILT
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(24px,3.2vw,36px)] text-[#111111] leading-tight tracking-tight">
              Work Experience.
            </h2>
          </div>
          <span className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-[#555555]">
            Applied AI &amp; Industry Internship
          </span>
        </Reveal>

        {/* Experience Content wrapped in elevated Stage Card */}
        <div className="w-full rounded-3xl bg-white border-2 border-[#111111] p-6 sm:p-8 shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#111111] relative overflow-hidden transition-all duration-300">
          {/* Top Violet Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#6C47FF]" />

          {/* Card Top: Company, Role, Period & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b-2 border-[#111111]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Briefcase className="w-4 h-4 text-[#6C47FF] shrink-0" />
                <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#EDE9FE] border-2 border-[#111111] text-[#111111] font-mono text-[11px] uppercase tracking-wider font-extrabold">
                  {EXPERIENCE.organisation}
                </span>
                <span className="text-[#555555] font-mono text-[11px] uppercase tracking-wider font-semibold">
                  · Coimbatore, India
                </span>
              </div>
              <h3 className="card-title font-sans font-bold text-xl sm:text-2xl text-[#111111] leading-snug">
                Artificial Intelligence Intern
              </h3>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
              <span className="text-[#555555] font-semibold">
                {EXPERIENCE.period}
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-[#111111] px-2.5 py-1 rounded-full bg-[#DCFCE7] border border-[#111111]">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                Completed
              </span>
            </div>
          </div>

          {/* Concise Role Mission */}
          <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#333333] leading-relaxed mb-6 max-w-4xl font-normal">
            Shipped applied-AI prototypes built for production reliability. Engineered vector RAG retrieval pipelines, multi-turn reasoning workflows with deterministic JSON schema validation, and verified RESTful API backends.
          </p>

          {/* Flagship Internship Project Feature: Fake News Detector */}
          <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-[#FFFDF5] border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#FFD13B]" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FEF08A] border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] font-mono text-[10.5px] font-extrabold text-[#111111] uppercase tracking-wider">
                    INTERNSHIP FLAGSHIP PROJECT
                  </span>
                  <span className="text-[#888888]">·</span>
                  <span className="font-mono text-[11px] font-bold text-[#6C47FF]">
                    RAG FACT-CHECKING
                  </span>
                </div>
                <h4 className="font-sans font-bold text-lg sm:text-xl text-[#111111] leading-snug mb-1.5">
                  Fake News Detector — Grounded RAG Fact Verification
                </h4>
                <p className="font-sans text-[13.5px] sm:text-[14px] text-[#444444] leading-relaxed max-w-2xl font-normal">
                  Engineered during the internship at Brainery Spot Technology: an autonomous RAG fact-verification pipeline with Qdrant vector indexing, sub-second claim resolution (&lt;850ms), and 94.2% verified precision with zero hallucination.
                </p>
              </div>

              <Link
                href="/work/fake-news-detector"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD13B] hover:bg-[#FACC15] text-[#111111] font-sans text-[13px] font-extrabold border-2 border-[#111111] shadow-[2.5px_2.5px_0px_#111111] hover:shadow-[3.5px_3.5px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all select-none shrink-0"
              >
                <span>Read Internship Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3 Skill Columns with Varying Neo-Brutalist Color Backgrounds */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 perspective-1200">
            {focusAreas.map((area, idx) => {
              const Icon = area.icon;
              const cardThemes = [
                { bg: "bg-[#FEF9C3]", accent: "#CA8A04", tag: "// 01 · VECTOR RAG" },
                { bg: "bg-[#EDE9FE]", accent: "#7C3AED", tag: "// 02 · REASONING" },
                { bg: "bg-[#DCFCE7]", accent: "#16A34A", tag: "// 03 · REST APIS" },
              ];
              const cardTheme = cardThemes[idx % cardThemes.length];

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
                  whileHover={shouldReduceMotion || isMobile ? {} : { y: -4, scale: 1.01 }}
                  className={`group p-4 sm:p-5 rounded-2xl ${cardTheme.bg} border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111] flex flex-col justify-between transition-all duration-200 cursor-default min-h-[160px]`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-white border-2 border-[#111111] flex items-center justify-center text-[#111111] shrink-0 shadow-[1.5px_1.5px_0px_#111111]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[#111111] tracking-wider uppercase">
                        {cardTheme.tag}
                      </span>
                    </div>
                    <h4 className="card-title font-sans font-bold text-[16.5px] sm:text-[17.5px] text-[#111111] mb-1.5 leading-snug">
                      {area.title}
                    </h4>
                    <p className="font-sans text-[13.5px] text-[#444444] leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t-2 border-[#111111]/15 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#555555] uppercase tracking-[0.08em]">
                      Production Verified
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1FB866] animate-pulse" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tech Stack */}
          <div className="pt-4 sm:pt-5 border-t-2 border-[#111111]/15 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#111111]">
            <span className="text-[#555555] font-bold mr-1">
              TECH STACK:
            </span>
            {tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] font-bold bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#111111] hover:text-white transition-all duration-150 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
