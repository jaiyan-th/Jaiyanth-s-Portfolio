"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  FileText,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Scan,
  MessageSquare,
  ClipboardCheck,
} from "lucide-react";
import { RESEARCH } from "@/data/portfolio";

export function Research() {
  const shouldReduceMotion = useReducedMotion();

  const keywords = [
    "Image Recognition",
    "Conversational AI",
    "Preventive Healthcare",
    "Multimodal Fusion",
    "Explainable AI",
  ];

  const pillars = [
    {
      step: "01",
      icon: Scan,
      title: "Multimodal Signal Capture",
      desc: "Computer vision input layer extracts early wellness indicators, normalized for clinical reasoning.",
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Conversational Triage",
      desc: "Deterministic dialogue trees eliminate ambiguity before surfacing care recommendations.",
    },
    {
      step: "03",
      icon: ClipboardCheck,
      title: "Traceable Clinician Summaries",
      desc: "Every output links to cited visual features and dialogue turns for verifiable provenance.",
    },
  ];

  return (
    <section
      id="research"
      aria-label="04 Research, Publications & Achievements"
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
              04
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A]">
              Research & Publication
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666] mt-2 sm:mt-0">
            IEEE ICETSIS 2026 · Peer-Reviewed Conference
          </span>
        </motion.div>

        {/* Unboxed Open Layout: No content boxes */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {/* Top Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Published & Peer-Reviewed
              </span>
              <span className="text-[#666666] font-medium">
                · ICETSIS 2026 · IEEE Bahrain Section
              </span>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              {RESEARCH.certificateUrl && (
                <a
                  href={RESEARCH.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="neo-btn h-9 px-4 rounded-full bg-white text-xs font-mono font-bold text-[#0A0A0A] gap-1.5 hover:bg-[#FFE600]"
                >
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span>Certificate</span>
                  <ArrowUpRight className="w-3 h-3 text-[#0A0A0A]" />
                </a>
              )}
              <Link
                href="/work/preventive-ai-paper"
                className="neo-btn h-9 px-4 rounded-full bg-[#0A0A0A] text-white text-xs font-mono font-bold gap-1.5 hover:bg-accent"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Paper Title & Authorship */}
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold block mb-2">
              Co-Authored Research Paper
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A] leading-tight mb-3">
              {RESEARCH.title}
            </h3>
            <p className="text-xs font-mono text-[#666666] font-medium">
              Co-Author: Jaiyanth B · University of Bahrain & IEEE Bahrain Section · Sakhir, Bahrain
            </p>
          </div>

          {/* Concise Summary */}
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed mb-8 max-w-4xl font-normal">
            {RESEARCH.abstract}
          </p>

          {/* 3 Core Highlights (Open, clean, no boxes, no borders) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-12">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-accent shrink-0" />
                    <h4 className="font-bold text-base text-[#0A0A0A]">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-sm text-[#666666] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: Keywords & Deep Dive Link */}
          <div className="pt-6 border-t border-[#E6E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#0A0A0A]">
              <span className="text-[#888888] font-bold text-[11px] uppercase tracking-wider mr-1">
                DOMAIN:
              </span>
              <span className="font-medium text-[#0A0A0A]">
                {keywords.join(" · ")}
              </span>
            </div>

            <Link
              href="/work/preventive-ai-paper"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0A0A0A] hover:text-accent font-bold group transition-colors"
            >
              <span>See full architecture & clinical pipeline inside case study</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-accent" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
