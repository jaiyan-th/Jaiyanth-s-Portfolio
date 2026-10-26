"use client";

import { useState, useEffect } from "react";
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
import { Reveal } from "@/components/ui/reveal";

import { EyebrowPill } from "@/components/ui/eyebrow-pill";

export function Research() {
  const shouldReduceMotion = useReducedMotion();
  const [isGridHovered, setIsGridHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      renderTitle: () => (
        <>
          Multimodal Signal{" "}
          <em className="accent font-serif-italic italic text-accent font-normal">Capture</em>
        </>
      ),
      desc: "Computer vision input layer extracts early wellness indicators, normalized for clinical reasoning.",
      rotateY: 8,
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Conversational Triage",
      renderTitle: () => (
        <>
          Conversational{" "}
          <em className="accent font-serif-italic italic text-accent font-normal">Triage</em>
        </>
      ),
      desc: "Deterministic dialogue trees eliminate ambiguity before surfacing care recommendations.",
      rotateY: 0,
    },
    {
      step: "03",
      icon: ClipboardCheck,
      title: "Traceable Clinician Summaries",
      renderTitle: () => (
        <>
          Traceable Clinician{" "}
          <em className="accent font-serif-italic italic text-accent font-normal">Summaries</em>
        </>
      ),
      desc: "Every output links to cited visual features and dialogue turns for verifiable provenance.",
      rotateY: -8,
    },
  ];

  return (
    <section
      id="research"
      aria-label="04 Research, Publications & Achievements"
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t-2 border-[#111111] bg-[#F5F0E6] scroll-mt-20"
    >
      <div className="site-container max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b-2 border-[#111111] gap-3">
          <div className="flex flex-col gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#3EE07A]" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#111111]">
                IEEE ICETSIS &apos;26
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(24px,3.2vw,36px)] text-[#111111] leading-tight tracking-tight">
              Research &amp; Publication.
            </h2>
          </div>
          <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-[#555555]">
            IEEE ICETSIS 2026 · Peer-Reviewed Conference
          </span>
        </Reveal>

        {/* Section Intro Paragraph */}
        <div className="lead-intro mb-8">
          <p className="font-sans font-medium text-[15px] sm:text-[16px] text-[#444444] leading-relaxed max-w-4xl">
            Co-authored peer-reviewed research accepted at IEEE ICETSIS 2026 Bahrain, focusing on multimodal diagnostic triage by uniting clinical computer vision with explainable conversational agentic flows.
          </p>
        </div>

        {/* Highlighted Academic Feature Card */}
        <div className="w-full rounded-3xl bg-white border-2 border-[#111111] p-6 sm:p-8 shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#111111] relative overflow-hidden transition-all duration-300">
          {/* Top Yellow Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FFD13B]" />

          {/* Top Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-5 mb-5 border-b-2 border-[#111111]">
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#111111]">
                <ShieldCheck className="w-4 h-4 text-[#3EE07A] shrink-0" />
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAF8F5] border-2 border-[#111111] text-[#111111] font-mono text-[11px] uppercase tracking-wider font-extrabold gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3EE07A] animate-pulse" />
                  Published &amp; Peer-Reviewed
                </span>
              </span>
              <span className="text-[#555555] font-semibold">
                · ICETSIS 2026 · IEEE Bahrain Section
              </span>
            </div>

            {/* Neo-Brutalist Outlined Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              {RESEARCH.certificateUrl && (
                <a
                  href={RESEARCH.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#FFD13B] text-[#111111] font-sans text-[13px] font-bold border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E8472B] transition-transform duration-200 group-hover:scale-110" />
                  <span>Certificate</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#111111]" />
                </a>
              )}
              <Link
                href="/work/preventive-ai-paper"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#6C47FF] text-white font-sans text-[13px] font-bold border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Paper Title & Authorship */}
          <div className="mb-6">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#6C47FF] font-extrabold block mb-2">
              Co-Authored Research Paper
            </span>
            <h3 className="card-title font-sans font-bold text-xl sm:text-2xl text-[#111111] leading-snug mb-2">
              Multimodal Diagnostic Triage: Bridging Clinical Vision and Conversational AI
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#555555] font-semibold">
              Co-Author: Jaiyanth B · University of Bahrain &amp; IEEE Bahrain Section · Sakhir, Bahrain
            </p>
          </div>

          {/* Abstract Paragraph */}
          <p className="font-sans text-[14px] sm:text-[15px] text-[#444444] leading-relaxed mb-6 max-w-4xl font-normal">
            {RESEARCH.abstract}
          </p>

          {/* 3 Pillar Cards with Varying Neo-Brutalist Colors */}
          <div
            onMouseEnter={() => setIsGridHovered(true)}
            onMouseLeave={() => setIsGridHovered(false)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 perspective-1200"
          >
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              const activeRotateY =
                isGridHovered || shouldReduceMotion || isMobile ? 0 : item.rotateY;
              
              // Varying pastel themes for the 3 pillars
              const pillarThemes = [
                {
                  bg: "bg-[#DCFCE7]", // mint
                  badgeBg: "bg-white",
                  accentColor: "text-[#166534]",
                },
                {
                  bg: "bg-[#EDE9FE]", // lavender
                  badgeBg: "bg-white",
                  accentColor: "text-[#5B21B6]",
                },
                {
                  bg: "bg-[#FEF9C3]", // sunny yellow
                  badgeBg: "bg-white",
                  accentColor: "text-[#854D0E]",
                },
              ];
              const theme = pillarThemes[idx % pillarThemes.length];

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={shouldReduceMotion || isMobile ? {} : { y: -5, scale: 1.015 }}
                  style={{
                    transform: `rotateY(${activeRotateY}deg)`,
                  }}
                  className={`group p-5 rounded-2xl ${theme.bg} border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111] flex flex-col justify-between transition-all duration-300 ease-out will-change-transform cursor-default min-h-[180px]`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-9 h-9 rounded-lg ${theme.badgeBg} border-2 border-[#111111] flex items-center justify-center text-[#111111] shadow-[1.5px_1.5px_0px_#111111]`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#111111] font-extrabold px-2 py-0.5 rounded-full bg-white border border-[#111111]">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="card-title font-sans font-bold text-base sm:text-lg text-[#111111] mb-1.5 leading-snug">
                      {item.renderTitle()}
                    </h4>
                    <p className="font-sans text-[13px] sm:text-[14px] text-[#333333] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row: Domain Keywords & Deep Dive */}
          <div className="pt-4 sm:pt-5 border-t-2 border-[#111111]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#111111]">
              <span className="text-[#555555] font-bold mr-1">
                DOMAIN:
              </span>
              {keywords.map((kw, kwIdx) => {
                const kwColors = [
                  "bg-[#FEF08A]",
                  "bg-[#EDE9FE]",
                  "bg-[#DCFCE7]",
                  "bg-[#E0F2FE]",
                  "bg-[#FFE4E6]",
                ];
                return (
                  <span
                    key={kw}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[11px] uppercase tracking-wider font-extrabold ${kwColors[kwIdx % kwColors.length]} border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] hover:-translate-y-0.5 transition-all duration-150 cursor-default`}
                  >
                    {kw}
                  </span>
                );
              })}
            </div>

            <Link
              href="/work/preventive-ai-paper"
              className="inline-flex items-center gap-1.5 font-sans text-[13px] sm:text-[14px] text-[#111111] hover:text-[#6C47FF] font-bold group transition-colors min-h-[44px]"
            >
              <span>Explore Research Paper</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
