"use client";

import * as React from "react";
import { ExternalLink, FileText, CheckCircle2 } from "lucide-react";
import { RESEARCH } from "@/data/portfolio";
import { motion } from "motion/react";

export function Achievements() {
  return (
    <section id="achievements" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header — Identical to STACK/Skills */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#FFC000] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              RESEARCH &amp; ACHIEVEMENTS
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-[40px] text-black leading-[1.08] tracking-tight uppercase">
            CO-AUTHORED IEEE PAPER, <br />
            <span className="bg-[#FFC000] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000] mt-1">
              PEER-REVIEWED &amp; ACCEPTED.
            </span>
          </h2>
        </motion.div>

        {/* Single Clean Box Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white border-2 border-black p-6 sm:p-8 shadow-[4px_4px_0px_#000000] space-y-6"
        >
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-black" />
              <span className="font-mono text-xs font-black uppercase text-black tracking-wider">
                IEEE ICETSIS 2026 · CO-AUTHORED RESEARCH PAPER
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="bg-[#FFC000] text-black px-2.5 py-1 font-mono text-[10px] uppercase font-black tracking-widest border border-black inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ACCEPTED &amp; PUBLISHED
              </span>
              {RESEARCH.certificateUrl && (
                <a
                  href={RESEARCH.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-[#FFC000] hover:text-black text-white px-3 py-1 font-mono text-[10px] uppercase font-black tracking-widest border border-black inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>VIEW CERTIFICATE</span>
                  <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                </a>
              )}
            </div>
          </div>

          {/* Paper Title */}
          <h3 className="font-heading font-bold text-lg sm:text-xl lg:text-2xl text-black leading-snug">
            {RESEARCH.title}
          </h3>

          {/* Details Row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-black/70 font-semibold border-y border-black/15 py-3">
            <span><strong className="text-black font-black">VENUE:</strong> {RESEARCH.venue} · {RESEARCH.location}</span>
            <span><strong className="text-black font-black">DATE:</strong> {RESEARCH.date}</span>
            <span><strong className="text-black font-black">ORGANISER:</strong> {RESEARCH.organiser}</span>
          </div>

          {/* Vision / Abstract */}
          <p className="font-sans text-sm text-black/85 font-semibold leading-relaxed">
            &ldquo;{RESEARCH.abstract}&rdquo;
          </p>

          {/* Concepts Pills — matching Skills section */}
          <div className="flex flex-wrap gap-2 pt-1">
            {RESEARCH.concepts.map((concept) => (
              <span
                key={concept}
                className="font-mono text-xs font-semibold text-black px-3 py-1.5 border border-black bg-transparent"
              >
                {concept}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
