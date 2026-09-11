"use client";

import * as React from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { RESEARCH } from "@/data/portfolio";
import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/motion";
import { SectionContainer } from "@/components/layout/section-container";

export function Research() {
  const keywords = [
    "Image recognition",
    "Conversational AI",
    "Preventive healthcare",
    "Research collaboration",
    "Technical presentation",
  ];

  return (
    <section id="achievements" className="relative bg-[#0A0A0A] text-[#F5F5F0] border-b-[3px] border-white/20 py-16 md:py-24 scroll-mt-20">
      <SectionContainer className="space-y-12">
        {/* Section Header: Plain bold headline, no italic, no color */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpVariants}
          className="space-y-4"
        >
          {/* Sticker Badge + Beside Subtitle */}
          <div className="flex items-center gap-2.5">
            <span className="sticker-badge bg-[#A3E635] text-[#0A0A0A] -rotate-1">
              <FileText className="w-3.5 h-3.5 text-[#0A0A0A]" />
              RESEARCH
            </span>
            <span className="font-body italic text-[#A3E635] text-sm font-semibold">
              / peer-reviewed
            </span>
          </div>

          {/* Section Headline with ONE italic accent word (print) */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-extrabold text-[#F5F5F0] leading-[1.08] tracking-tight">
            Research that made it to{" "}
            <span className="italic text-[#A3E635]">print.</span>
          </h2>
        </motion.div>

        {/* Large Thick-Bordered Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
          className="neo-card p-6 sm:p-10 lg:p-12 bg-[#141414] relative space-y-7"
        >
          {/* Rotated sticker badge in corner: "PUBLISHED" */}
          <div className="absolute -top-3.5 right-6">
            <span className="sticker-badge bg-[#A3E635] text-[#0A0A0A] rotate-2 text-xs sm:text-sm py-1 px-3.5">
              PUBLISHED
            </span>
          </div>

          {/* Details line (small caps) */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-white/20 pb-4">
            <span className="font-label-caps text-xs sm:text-[13px] text-[#9CA3AF]">
              ICETSIS 2026 · BAHRAIN · MAY 2026 · IEEE BAHRAIN SECTION
            </span>
            {RESEARCH.certificateUrl && (
              <a
                href={RESEARCH.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-caps text-xs sm:text-[13px] text-[#F5F5F0] hover:text-[#A3E635] hover:underline inline-flex items-center gap-1 font-bold"
              >
                <span>VIEW CERTIFICATE</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Relocated original detail: small caps line above paper title */}
          <div>
            <span className="font-label-caps text-xs sm:text-[13px] text-[#9CA3AF] block mb-2">
              CO-AUTHORED IEEE PAPER · PEER-REVIEWED AND ACCEPTED
            </span>
            {/* Paper Title (bold headline) */}
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F0] leading-tight">
              An AI Intelligence Wellness Framework Integrating Image Recognition and Conversational AI for Preventive Healthcare
            </h3>
          </div>

          {/* Abstract (body text) */}
          <p className="font-body text-base sm:text-lg lg:text-[1.15rem] text-[#9CA3AF] leading-relaxed max-w-4xl">
            A preventive-healthcare framework that combines image recognition with a conversational AI layer to surface early wellness signals, guide users through structured follow-up questions, and route them toward appropriate care — emphasizing explainability, low-friction interaction, and clinician-friendly summaries.
          </p>

          {/* Keywords as plain text list */}
          <div className="border-t-2 border-white/15 pt-4 text-xs sm:text-sm font-mono-code text-[#9CA3AF]">
            <span className="font-label-caps text-[10px] text-[#F5F5F0] font-bold mr-2 uppercase">
              KEYWORDS:
            </span>
            {keywords.join(", ")}
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
