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
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t-2 border-[#111111]/20 bg-transparent scroll-mt-16 perspective-1200"
    >
      <div className="site-container">
        {/* Section Header with Eyebrow Pill and Instrument Serif H2 */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b-[1.5px] border-[#111111]/20 gap-3">
          <div className="flex flex-col gap-2.5">
            <EyebrowPill accent="PUBLICATIONS" text="IEEE ICETSIS '26" />
            <h2 className="font-sans font-bold text-fluid-h2 text-[#111111] leading-[1.05] tracking-[-0.035em]">
              Research &amp;{" "}
              <em className="accent font-serif-italic italic text-accent font-normal accent-underline">
                Publication
              </em>
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#555555]">
            IEEE ICETSIS 2026 · Peer-Reviewed Conference
          </span>
        </Reveal>

        {/* Section Intro Paragraph with 2px solid accent left vertical line */}
        <div className="lead-intro mb-6">
          <p>
            Co-authored peer-reviewed research accepted at IEEE ICETSIS 2026 Bahrain, focusing on multimodal diagnostic triage by uniting clinical computer vision with explainable conversational agentic flows.
          </p>
        </div>

        {/* Highlighted Academic Feature Card */}
        <div className="w-full rounded-2xl bg-white border-2 border-[#111111] p-5 sm:p-6 shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#111111] relative overflow-hidden transition-all duration-300 preserve-3d">
          {/* Subtle Top Red Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#E8472B]" />

          {/* Top Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 mb-4 border-b-[1.5px] border-[#111111]/20">
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.08em]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#111111]">
                <ShieldCheck className="w-4 h-4 text-[#E8472B] shrink-0" />
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] text-[#111111] font-mono text-[11px] uppercase tracking-[0.08em] font-medium gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FB866] animate-ping" />
                  Published &amp; Peer-Reviewed
                </span>
              </span>
              <span className="text-[#555555] font-medium">
                · ICETSIS 2026 · IEEE Bahrain Section
              </span>
            </div>

            {/* Allowed Outlined Pill Button + Black Pill Button (Inter, padding 11px 22px, gap 12px) */}
            <div className="flex flex-wrap items-center gap-2.5">
              {RESEARCH.certificateUrl && (
                <a
                  href={RESEARCH.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="neo-pill-btn px-[22px] py-[11px] font-sans text-[14px] font-medium gap-1.5 group"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E8472B] transition-transform duration-200 group-hover:scale-110" />
                  <span>Certificate</span>
                  <ArrowUpRight className="w-3 h-3 text-[#111111] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              <Link
                href="/work/preventive-ai-paper"
                className="neo-black-btn px-[22px] py-[11px] font-sans text-[14px] font-medium gap-1.5 group"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Paper Title & Authorship */}
          <div className="mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#E8472B] font-medium block mb-1.5">
              Co-Authored Research Paper
            </span>
            <h3 className="card-title font-sans font-bold text-xl sm:text-2xl lg:text-3xl text-[#111111] leading-tight mb-2">
              Multimodal Diagnostic Triage: Bridging Clinical Vision and{" "}
              <em className="accent font-serif-italic italic text-accent font-normal">
                Conversational AI
              </em>
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#555555]">
              Co-Author: Jaiyanth B · University of Bahrain &amp; IEEE Bahrain Section · Sakhir, Bahrain
            </p>
          </div>

          {/* Abstract Paragraph */}
          <p className="font-sans text-[15px] text-[var(--body)] leading-relaxed mb-5 max-w-4xl font-normal">
            {RESEARCH.abstract}
          </p>

          {/* 3 Pillar Cards */}
          <div
            onMouseEnter={() => setIsGridHovered(true)}
            onMouseLeave={() => setIsGridHovered(false)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 perspective-1200"
          >
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              const activeRotateY =
                isGridHovered || shouldReduceMotion || isMobile ? 0 : item.rotateY;

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
                  className="group p-5 rounded-xl bg-white border-[1.5px] border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111] flex flex-col justify-between transition-all duration-300 ease-out will-change-transform cursor-default min-h-[180px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#111111]/20 group-hover:border-[#E8472B] group-hover:bg-[#E8472B] group-hover:text-white flex items-center justify-center text-[#E8472B] transition-colors duration-200">
                        <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#E8472B] font-medium group-hover:scale-110 transition-transform">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="card-title font-sans font-bold text-lg sm:text-xl text-[#111111] group-hover:text-[#E8472B] transition-colors mb-1.5 leading-snug">
                      {item.renderTitle()}
                    </h4>
                    <p className="font-sans text-[14px] text-[var(--body)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row: Domain Keywords & Deep Dive */}
          <div className="pt-4 sm:pt-5 border-t-[1.5px] border-[#111111]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#111111]">
              <span className="text-[#555555] font-medium mr-1">
                DOMAIN:
              </span>
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] font-medium bg-white border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] hover:bg-[#111111] hover:text-white transition-all duration-150 cursor-default"
                >
                  {kw}
                </span>
              ))}
            </div>

            <Link
              href="/work/preventive-ai-paper"
              className="inline-flex items-center gap-1.5 font-sans text-[14px] text-[#111111] hover:text-[#E8472B] font-medium group transition-colors min-h-[44px]"
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
