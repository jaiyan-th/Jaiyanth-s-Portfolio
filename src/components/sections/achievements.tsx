"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { RESEARCH } from "@/data/portfolio";
import { motion } from "motion/react";

export function Achievements() {
  return (
    <section id="achievements" className="relative bg-[#FCFBF9] text-[#1A1A1A] border-b border-[#E5E2DC] py-20 md:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-16"
        >
          <span className="font-label text-[11px] tracking-[0.14em] uppercase text-[#6B6B6B] block">
            05 / Research &amp; Publications
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal leading-[1.15] tracking-tight">
            Peer-reviewed and accepted at <span className="italic text-[#2D5F4E]">IEEE</span>.
          </h2>
        </motion.div>

        {/* Paper Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-[#E5E2DC] p-6 sm:p-10 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E2DC] pb-4 text-xs font-label uppercase tracking-wider text-[#6B6B6B]">
            <span className="text-[#1A1A1A] font-semibold">IEEE ICETSIS 2026 · Co-Authored Paper</span>
            {RESEARCH.certificateUrl && (
              <a
                href={RESEARCH.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2D5F4E] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>View Certificate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-normal leading-snug">
            {RESEARCH.title}
          </h3>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-sans text-[#6B6B6B] border-y border-[#E5E2DC] py-3">
            <span><strong className="font-label text-[#1A1A1A] mr-1">Venue:</strong> {RESEARCH.venue}, {RESEARCH.location}</span>
            <span><strong className="font-label text-[#1A1A1A] mr-1">Date:</strong> {RESEARCH.date}</span>
            <span><strong className="font-label text-[#1A1A1A] mr-1">Organiser:</strong> {RESEARCH.organiser}</span>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#6B6B6B] leading-relaxed max-w-[720px]">
            {RESEARCH.abstract}
          </p>

          <div className="pt-2 text-xs font-sans text-[#6B6B6B]">
            <span className="font-label text-[10px] tracking-wider uppercase text-[#1A1A1A] font-semibold mr-2">
              Focus Areas:
            </span>
            {RESEARCH.concepts.join(" · ")}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
