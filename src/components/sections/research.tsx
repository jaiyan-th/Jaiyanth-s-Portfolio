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
      desc: "Computer vision input layer extracts early wellness indicators, normalized for clinical reasoning.",
      rotateY: 8,
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Conversational Triage",
      desc: "Deterministic dialogue trees eliminate ambiguity before surfacing care recommendations.",
      rotateY: 0,
    },
    {
      step: "03",
      icon: ClipboardCheck,
      title: "Traceable Clinician Summaries",
      desc: "Every output links to cited visual features and dialogue turns for verifiable provenance.",
      rotateY: -8,
    },
  ];

  return (
    <section
      id="research"
      aria-label="04 Research, Publications & Achievements"
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t border-[#E2DFD7] bg-transparent scroll-mt-16 perspective-1200"
    >
      <div className="site-container">
        {/* Section Header: On phones stack right label under title */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-12 pb-5 border-b border-[#E2DFD7] gap-2">
          <div className="flex items-baseline gap-3 sm:gap-4">
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#E5341B]/10 border border-[#E5341B]/30 text-[#E5341B] font-mono text-xs font-bold tracking-wider">
              04
            </span>
            <h2 className="text-fluid-h2 font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
              Research & Publication
            </h2>
          </div>
          <span className="text-fluid-mono uppercase tracking-widest text-[#666666]">
            IEEE ICETSIS 2026 · Peer-Reviewed Conference
          </span>
        </Reveal>

        {/* Highlighted Academic Feature Card */}
        <div className="w-full rounded-2xl bg-white border border-[#E2DFD7] p-6 sm:p-10 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#0A0A0A]/20 preserve-3d">
          {/* Subtle Top Red Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E5341B] via-[#E5341B]/40 to-transparent" />

          {/* Top Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6">
            <div className="flex flex-wrap items-center gap-2.5 text-fluid-mono">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                <ShieldCheck className="w-4 h-4 text-[#E5341B] shrink-0" />
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E2DFD7] text-[#0A0A0A] font-mono text-xs font-semibold shadow-xs gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FB866] animate-ping" />
                  Published & Peer-Reviewed
                </span>
              </span>
              <span className="text-[#666666] font-medium">
                · ICETSIS 2026 · IEEE Bahrain Section
              </span>
            </div>

            {/* Allowed Outlined Pill Button + Black Pill Button */}
            <div className="flex flex-wrap items-center gap-3">
              {RESEARCH.certificateUrl && (
                <a
                  href={RESEARCH.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="neo-pill-btn h-10 px-4 text-fluid-mono font-bold gap-1.5 group"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E5341B] transition-transform duration-200 group-hover:scale-110" />
                  <span>Certificate</span>
                  <ArrowUpRight className="w-3 h-3 text-[#0A0A0A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              <Link
                href="/work/preventive-ai-paper"
                className="neo-black-btn h-10 px-4 text-fluid-mono font-bold gap-1.5 group"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Paper Title & Authorship */}
          <div className="mb-6">
            <span className="text-fluid-mono uppercase tracking-widest text-[#E5341B] font-bold block mb-2">
              Co-Authored Research Paper
            </span>
            <h3 className="text-fluid-h2 font-extrabold tracking-[-0.03em] text-[#0A0A0A] leading-tight mb-3">
              {RESEARCH.title}
            </h3>
            <p className="text-fluid-mono text-[#666666] font-medium">
              Co-Author: Jaiyanth B · University of Bahrain & IEEE Bahrain Section · Sakhir, Bahrain
            </p>
          </div>

          {/* Abstract Paragraph */}
          <p className="text-fluid-body text-[#555555] leading-relaxed mb-8 sm:mb-12 max-w-4xl font-normal">
            {RESEARCH.abstract}
          </p>

          {/* 3 Stat Cards: Stays 3 across on tablets, stacks on phones */}
          <div
            onMouseEnter={() => setIsGridHovered(true)}
            onMouseLeave={() => setIsGridHovered(false)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14 perspective-1200"
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
                  className="group p-6 rounded-xl bg-white border border-[#E2DFD7] hover:border-[#0A0A0A]/30 shadow-sm hover:shadow-lg flex flex-col justify-between transition-all duration-300 ease-out will-change-transform cursor-default"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] group-hover:bg-[#E5341B] group-hover:text-white flex items-center justify-center text-[#E5341B] transition-colors duration-200 shadow-xs">
                        <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                      </div>
                      <span className="font-mono text-xs text-[#E5341B] font-extrabold group-hover:scale-110 transition-transform">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="font-bold text-base sm:text-lg text-[#0A0A0A] group-hover:text-[#E5341B] transition-colors mb-2">
                      {item.title}
                    </h4>
                    <p className="text-fluid-small text-[#555555] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row: Domain Keywords & Deep Dive */}
          <div className="pt-6 sm:pt-8 border-t border-[#E2DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-fluid-mono text-[#0A0A0A]">
              <span className="text-[#888888] font-bold uppercase tracking-wider mr-1">
                DOMAIN:
              </span>
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-white border border-[#E2DFD7] hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-150 cursor-default"
                >
                  {kw}
                </span>
              ))}
            </div>

            <Link
              href="/work/preventive-ai-paper"
              className="inline-flex items-center gap-1.5 text-fluid-mono text-[#0A0A0A] hover:text-[#E5341B] font-bold group transition-colors min-h-[44px]"
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
