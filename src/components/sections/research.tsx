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
      rotateY: 8, // Carousel side card tilt
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Conversational Triage",
      desc: "Deterministic dialogue trees eliminate ambiguity before surfacing care recommendations.",
      rotateY: 0, // Carousel center card straight
    },
    {
      step: "03",
      icon: ClipboardCheck,
      title: "Traceable Clinician Summaries",
      desc: "Every output links to cited visual features and dialogue turns for verifiable provenance.",
      rotateY: -8, // Carousel side card tilt
    },
  ];

  return (
    <section
      id="research"
      aria-label="04 Research, Publications & Achievements"
      className="relative py-16 sm:py-24 border-t border-[#E2DFD7] bg-transparent scroll-mt-20 perspective-1200"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Reusable Reveal & Animated Red Underline */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-12 pb-6 border-b border-[#E2DFD7]">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-base sm:text-lg text-[#E5341B] tracking-widest uppercase font-extrabold">
              04
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
              Research & Publication
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#666666] mt-2 sm:mt-0">
            IEEE ICETSIS 2026 · Peer-Reviewed Conference
          </span>
        </Reveal>

        {/* Unboxed Layout */}
        <div className="w-full preserve-3d">
          {/* Top Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                <ShieldCheck className="w-4 h-4 text-[#E5341B]" />
                <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-bold">
                  Published & Peer-Reviewed
                </span>
              </span>
              <span className="text-[#666666] font-medium">
                · ICETSIS 2026 · IEEE Bahrain Section
              </span>
            </div>

            {/* Allowed Outlined Pill Button + Black Pill Button */}
            <div className="flex items-center gap-3">
              {RESEARCH.certificateUrl && (
                <a
                  href={RESEARCH.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="neo-pill-btn h-9 px-4 text-xs font-mono font-bold gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E5341B]" />
                  <span>Certificate</span>
                  <ArrowUpRight className="w-3 h-3 text-[#0A0A0A]" />
                </a>
              )}
              <Link
                href="/work/preventive-ai-paper"
                className="neo-black-btn h-9 px-4 text-xs font-mono font-bold gap-1.5"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Paper Title & Authorship */}
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E5341B] font-bold block mb-2">
              Co-Authored Research Paper
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] leading-tight mb-3">
              {RESEARCH.title}
            </h3>
            <p className="text-xs font-mono text-[#666666] font-medium">
              Co-Author: Jaiyanth B · University of Bahrain & IEEE Bahrain Section · Sakhir, Bahrain
            </p>
          </div>

          {/* Abstract Paragraph */}
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-10 max-w-4xl font-normal">
            {RESEARCH.abstract}
          </p>

          {/* 3 Stat / Highlight Cards: 3D Carousel Feel (Side cards tilted, hover straightens all; disabled on mobile/reduced motion) */}
          <div
            onMouseEnter={() => setIsGridHovered(true)}
            onMouseLeave={() => setIsGridHovered(false)}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-14 perspective-1200"
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
                  whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                  style={{
                    transform: `rotateY(${activeRotateY}deg)`,
                  }}
                  className="p-6 rounded-md bg-white hard-shadow flex flex-col justify-between transition-transform duration-300 ease-out will-change-transform"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-md bg-[#FAF3EE] flex items-center justify-center text-[#E5341B]">
                        <Icon className="w-4 h-4 text-[#E5341B]" />
                      </div>
                      <span className="font-mono text-xs text-[#E5341B] font-bold">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-[#0A0A0A] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row: Domain Keywords & Deep Dive */}
          <div className="pt-8 border-t border-[#E2DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0A0A0A] hover:text-[#E5341B] font-bold group transition-colors"
            >
              <span>See full architecture & clinical pipeline inside case study</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#E5341B]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
