"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { RESEARCH } from "@/data/portfolio";
import { motion } from "motion/react";

export function Achievements() {
  return (
    <section id="achievements" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00A8C6] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              ACHIEVEMENTS
            </span>
          </div>
        </motion.div>

        {/* Minimal Editorial Content — No Heavy Boxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Subheader & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4">
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              IEEE ICETSIS 2026 · CO-AUTHORED RESEARCH PAPER
            </span>
            <div className="flex items-center gap-3">
              <span className="bg-[#00B2D6] text-black px-2.5 py-1 font-mono text-[10px] uppercase font-black tracking-widest border border-black">
                ACCEPTED &amp; PUBLISHED
              </span>
              {RESEARCH.certificateUrl && (
                <a
                  href={RESEARCH.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent hover:bg-black hover:text-white text-black px-3 py-1 font-mono text-xs font-bold border border-black inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>VIEW CERTIFICATE</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              )}
            </div>
          </div>

          {/* Paper Title */}
          <h3 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-black leading-snug">
            {RESEARCH.title}
          </h3>

          {/* Metadata Row */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-black">
            <div>
              <span className="font-black text-black/50 block mb-0.5">CONFERENCE</span>
              <span className="font-bold">{RESEARCH.venue}</span>
            </div>
            <div>
              <span className="font-black text-black/50 block mb-0.5">LOCATION</span>
              <span className="font-bold">{RESEARCH.location}</span>
            </div>
            <div>
              <span className="font-black text-black/50 block mb-0.5">DATE</span>
              <span className="font-bold">{RESEARCH.date}</span>
            </div>
            <div>
              <span className="font-black text-black/50 block mb-0.5">ORGANISER</span>
              <span className="font-bold">{RESEARCH.organiser}</span>
            </div>
          </div>

          {/* Abstract */}
          <p className="font-sans text-sm sm:text-base text-black/80 font-semibold leading-relaxed max-w-4xl pt-2">
            &ldquo;{RESEARCH.abstract}&rdquo;
          </p>

          {/* Topics / Methodologies as clean pills (identical to Skills section) */}
          <div className="pt-4 space-y-3">
            <h4 className="font-mono text-xs font-black tracking-widest text-black uppercase">
              TOPICS &amp; DOMAINS
            </h4>
            <div className="flex flex-wrap gap-2">
              {RESEARCH.concepts.map((concept) => (
                <span
                  key={concept}
                  className="font-mono text-xs font-semibold text-black px-3 py-1.5 border border-black bg-transparent"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
