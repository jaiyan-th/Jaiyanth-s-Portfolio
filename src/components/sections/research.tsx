"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  FileText,
  ArrowUpRight,
  ArrowRight,
  Award,
  Sparkles,
  CheckCircle2,
  Scan,
  MessageSquare,
  ClipboardCheck,
  ChevronRight,
  ShieldCheck,
  Activity,
  Layers,
} from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";

export function Research() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState<number>(0);

  const keywords = [
    "Image Recognition",
    "Conversational AI",
    "Preventive Healthcare",
    "Multimodal Fusion",
    "Clinical Invariants",
    "Explainable AI",
  ];

  const pipelineStages = [
    {
      step: "01",
      icon: Scan,
      title: "Visual Feature Intake",
      category: "Computer Vision",
      summary: "Non-invasive computer vision model normalizes input imagery into clinical indicator vectors.",
      metric: "Sub-Second Latency",
      detail: "Extracts key visual biomarkers without relying on uncalibrated deep-black-box classifiers.",
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Conversational Triage",
      category: "LLM + Deterministic Trees",
      summary: "Dynamic dialogue engine queries patient for structured context, pruning ambiguity.",
      metric: "Zero Hallucination",
      detail: "Strict clinical boundary checks prevent medical conjecture and enforce verifiable intake protocols.",
    },
    {
      step: "03",
      icon: ClipboardCheck,
      title: "Traceable Clinical Summary",
      category: "Explainability Layer",
      summary: "Outputs a physician-friendly referral dossier with bi-directional citations to dialogue and visual inputs.",
      metric: "100% Provenance",
      detail: "Directly bridges patient self-reporting with actionable diagnostic summaries for healthcare providers.",
    },
  ];

  const contributions = [
    {
      index: "01",
      title: "Multimodal Signal Capture",
      tag: "Computer Vision · Intake",
      description:
        "Input layer extracts visual wellness indicators from patient data, normalized for downstream clinical reasoning with strict signal thresholds.",
    },
    {
      index: "02",
      title: "Structured Conversational Triage",
      tag: "Deterministic Trees · LLM",
      description:
        "Deterministic dialogue trees and conversational AI ask targeted follow-up questions, eliminating ambiguity before care recommendations are surfaced.",
    },
    {
      index: "03",
      title: "Traceable Clinical Summaries",
      tag: "Explainable AI · Provenance",
      description:
        "Every output links directly to cited visual features and patient dialogue, generating explainable summaries tailored for healthcare practitioners.",
    },
  ];

  const credentials = [
    {
      icon: Award,
      badge: "IEEE BAHRAIN SECTION",
      title: "Peer-Reviewed Research Co-Author",
      venue: "ICETSIS 2026 · May 2026",
      desc: "Accepted at the International Conference on Emerging Trends in Smart Industry and Systems, technically sponsored by IEEE Bahrain Section.",
    },
    {
      icon: Sparkles,
      badge: "UNIVERSITY OF BAHRAIN",
      title: "Technical Paper Presentation",
      venue: "Sakhir, Bahrain · May 2026",
      desc: "Multimodal AI wellness triage paper accepted for technical presentation before international engineering and academic researchers.",
    },
    {
      icon: CheckCircle2,
      badge: "CLINICAL REASONING",
      title: "Explainable Healthcare Framework",
      venue: "Preventive AI Architecture",
      desc: "Integrates computer vision feature extraction with conversational symptom triage for calibrated clinical referral summaries.",
    },
  ];

  return (
    <section
      id="research"
      aria-label="04 Research, Publications & Achievements"
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
              04
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A0A0A]">
              Research & Publication
            </h2>
          </div>
          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent-tint text-accent-hover border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              IEEE ICETSIS 2026
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] hidden md:inline">
              Peer-Reviewed Academic Conference
            </span>
          </div>
        </motion.div>

        {/* Featured Publication Hero Card: Asymmetric Split */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-[#E6E3DC] bg-white shadow-sm overflow-hidden mb-12 transition-all duration-300 hover:border-[#0A0A0A]/30 hover:shadow-md"
        >
          {/* Card Top Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 sm:px-10 py-5 bg-[#FAF9F5] border-b border-[#E6E3DC]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-accent-hover">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                Accepted & Peer-Reviewed Research
              </span>
              <span className="text-[#6B6B6B] font-mono text-xs hidden sm:inline">·</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B]">
                Bahrain · May 2026
              </span>
            </div>

            {/* Direct Action CTAs */}
            <div className="flex items-center gap-3">
              {RESEARCH.certificateUrl && (
                <a
                  href={RESEARCH.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E6E3DC] bg-white text-xs font-mono text-[#0A0A0A] hover:border-accent hover:text-accent transition-colors shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span>Certificate</span>
                  <ArrowUpRight className="w-3 h-3 text-[#6B6B6B]" />
                </a>
              )}
              <Link
                href="/work/preventive-ai-paper"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0A0A] text-white text-xs font-mono font-medium hover:bg-accent-hover transition-colors shadow-2xs group"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Split Body: Narrative (Left) vs Interactive Pipeline Diagram (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-10 lg:p-12">
            {/* Left Column: Paper Meta & Narrative (~55%) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-accent-hover font-bold block mb-3">
                  Co-Authored Academic Paper
                </span>
                <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#0A0A0A] leading-tight mb-4">
                  {RESEARCH.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-[#6B6B6B] mb-6">
                  <span>Author: Jaiyanth B (Co-Author)</span>
                  <span>·</span>
                  <span>ICETSIS 2026</span>
                  <span>·</span>
                  <span>IEEE Bahrain</span>
                </div>

                {/* Editorial Blockquote Abstract */}
                <div className="relative pl-5 border-l-2 border-accent/70 my-6 bg-[#FAF9F5]/70 py-3.5 pr-4 rounded-r-xl">
                  <p className="text-sm sm:text-base text-[#4A4946] leading-relaxed italic">
                    &ldquo;{RESEARCH.abstract}&rdquo;
                  </p>
                </div>
              </div>

              {/* Research Keywords */}
              <div className="pt-4 border-t border-[#E6E3DC]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#6B6B6B] mr-2">
                    Focus:
                  </span>
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-md text-xs font-mono text-[#0A0A0A] bg-[#FAF9F5] border border-[#E6E3DC] hover:border-accent/40 transition-colors"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Multimodal Pipeline Architecture (~45%) */}
            <div className="lg:col-span-5 bg-[#FAF9F5] rounded-2xl border border-[#E6E3DC] p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6E3DC]">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent" />
                    <span className="text-xs font-mono uppercase font-bold tracking-wider text-[#0A0A0A]">
                      Multimodal Triage Pipeline
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#6B6B6B]">
                    Interactive Architecture
                  </span>
                </div>

                {/* Interactive Stage Selectors */}
                <div className="space-y-3">
                  {pipelineStages.map((stage, idx) => {
                    const Icon = stage.icon;
                    const isActive = activeStage === idx;
                    return (
                      <motion.div
                        key={stage.step}
                        onClick={() => setActiveStage(idx)}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                        className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border ${
                          isActive
                            ? "bg-white border-accent shadow-xs ring-1 ring-accent/20"
                            : "bg-white/60 border-[#E6E3DC] hover:bg-white hover:border-[#0A0A0A]/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                isActive
                                  ? "bg-accent text-white"
                                  : "bg-[#EDEAE3] text-[#0A0A0A]"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-accent-hover font-semibold block">
                                Stage {stage.step} · {stage.category}
                              </span>
                              <h4 className="text-sm font-medium text-[#0A0A0A]">
                                {stage.title}
                              </h4>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF9F5] text-[#6B6B6B] border border-[#E6E3DC]">
                            {stage.metric}
                          </span>
                        </div>

                        {isActive && (
                          <motion.div
                            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-3 pt-3 border-t border-[#E6E3DC]/60 text-xs text-[#6B6B6B] leading-relaxed"
                          >
                            <p className="mb-1 text-[#0A0A0A] font-medium">{stage.summary}</p>
                            <p className="text-[11px] text-[#6B6B6B]">{stage.detail}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Pipeline Guarantee Strip */}
              <div className="mt-5 pt-4 border-t border-[#E6E3DC] flex items-center justify-between text-[11px] font-mono text-[#6B6B6B]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Deterministic Guardrails
                </span>
                <span>Verified by IEEE Review</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 Key Research Contributions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B]">
              Core Framework Innovations
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              3 Methodological Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contributions.map((item, idx) => (
              <motion.div
                key={item.index}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                className="group p-6 rounded-2xl bg-white border border-[#E6E3DC] shadow-2xs hover:border-[#0A0A0A]/30 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-accent-hover font-bold">
                      {item.index}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF9F5] text-[#6B6B6B] border border-[#E6E3DC] group-hover:border-accent/30 group-hover:text-[#0A0A0A] transition-colors">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-medium text-base text-[#0A0A0A] mb-2 group-hover:text-accent-hover transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Institutional Credentials & Presentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <motion.div
                key={cred.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={shouldReduceMotion ? {} : { y: -3 }}
                className="p-6 sm:p-7 rounded-2xl bg-[#FAF9F5] border border-[#E6E3DC] shadow-2xs hover:bg-white hover:border-[#0A0A0A]/30 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-accent-hover font-semibold">
                      {cred.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E6E3DC] flex items-center justify-center text-[#0A0A0A] shadow-2xs">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-[#0A0A0A] mb-1">
                    {cred.title}
                  </h4>
                  <span className="text-xs font-mono text-[#6B6B6B] block mb-3">
                    {cred.venue}
                  </span>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {cred.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

