"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  FileText,
  ArrowUpRight,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { RESEARCH } from "@/data/portfolio";

export function Research() {
  const keywords = [
    "Image Recognition",
    "Conversational AI",
    "Preventive Healthcare",
    "Multimodal Fusion",
    "Clinical Safety Invariants",
    "Explainable AI",
  ];

  const highlights = [
    {
      index: "01",
      title: "Multimodal Signal Capture",
      description:
        "Computer-vision input layer extracts visual wellness indicators from patient data, normalized for downstream clinical reasoning.",
    },
    {
      index: "02",
      title: "Structured Conversational Triage",
      description:
        "Deterministic dialogue trees and conversational AI ask targeted follow-up questions, eliminating ambiguity before care recommendations.",
    },
    {
      index: "03",
      title: "Traceable Clinical Summaries",
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
              04
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A0A0A]">
              Research & Publication
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mt-2 sm:mt-0">
            Peer-Reviewed Academic Publication · IEEE ICETSIS 2026
          </span>
        </motion.div>

        {/* Featured Publication Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[#E5E3DB] bg-white p-6 sm:p-10 lg:p-12 shadow-sm mb-8 sm:mb-10 transition-all duration-300 hover:border-[#0A0A0A]/30 hover:shadow-md"
        >
          {/* Card Top Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E5E3DB]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-accent-tint text-accent-hover border border-accent/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Published & Peer-Reviewed
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A]">
                ICETSIS 2026 · IEEE Bahrain Section · May 2026
              </span>
            </div>

            {/* Direct Action Links */}
            <div className="flex flex-wrap items-center gap-3">
              {RESEARCH.certificateUrl && (
                <a
                  href={RESEARCH.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E3DB] bg-white text-xs font-mono font-medium text-[#0A0A0A] hover:border-accent hover:text-accent transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span>View Certificate</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              <Link
                href="/work/preventive-ai-paper"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0A0A] text-white text-xs font-mono font-medium hover:bg-accent-hover transition-colors"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Paper Title & Eyebrow */}
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-hover block mb-3 font-semibold">
              Co-Authored Research Paper
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#0A0A0A] leading-tight">
              {RESEARCH.title}
            </h3>
          </div>

          {/* Paper Abstract */}
          <div className="mb-10 text-base sm:text-lg text-[#6F6E6A] leading-relaxed max-w-4xl">
            <p>{RESEARCH.abstract}</p>
          </div>

          {/* 3 Research Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#E5E3DB] mb-10">
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
                  <p className="text-sm text-[#6F6E6A] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Research Domain Keywords */}
          <div className="pt-6 border-t border-[#E5E3DB] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mr-2">
              Keywords:
            </span>
            {keywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 rounded-full text-xs font-mono text-[#0A0A0A] bg-[#ECEAE3] border border-[#E5E3DB]"
              >
                {kw}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Supporting Credentials & Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <motion.div
                key={cred.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E5E3DB] shadow-xs hover:border-[#0A0A0A]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-accent-hover font-semibold">
                      {cred.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#ECEAE3] flex items-center justify-center text-[#0A0A0A]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-[#0A0A0A] mb-1">
                    {cred.title}
                  </h4>
                  <span className="text-xs font-mono text-[#6F6E6A] block mb-3">
                    {cred.venue}
                  </span>
                  <p className="text-sm text-[#6F6E6A] leading-relaxed">
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
