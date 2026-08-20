"use client";

import * as React from "react";
import { FileText, MapPin, Calendar, Building2, CheckCircle2 } from "lucide-react";
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
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#00A8C6] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              ACHIEVEMENTS
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-[40px] text-black leading-[1.08] tracking-tight uppercase">
            RESEARCH &amp; ACADEMIC <br />
            <span className="bg-[#00B2D6] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000] mt-1">
              MILESTONES.
            </span>
          </h2>
        </motion.div>

        {/* Featured IEEE Research Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white border-2 border-black p-6 sm:p-10 shadow-[6px_6px_0px_#000000] space-y-6"
        >
          {/* Header Strip */}
          <div className="bg-[#00B2D6] border-b-2 border-black -m-6 sm:-m-10 mb-2 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-black" />
              <span className="font-mono text-xs sm:text-sm font-black uppercase text-black tracking-wider">
                IEEE ICETSIS 2026 · CO-AUTHORED RESEARCH PAPER
              </span>
            </div>
            <span className="bg-black text-white px-3 py-1 font-mono text-[10px] uppercase font-black tracking-widest border border-black shadow-[1.5px_1.5px_0px_#00B2D6] inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00B2D6]" />
              ACCEPTED &amp; PUBLISHED
            </span>
          </div>

          {/* Paper Title */}
          <div className="pt-2">
            <span className="font-mono text-[10.5px] font-black uppercase tracking-widest text-[#00A8C6] block mb-2">
              PAPER TITLE
            </span>
            <h3 className="font-heading font-black text-xl sm:text-3xl text-black leading-tight">
              {RESEARCH.title}
            </h3>
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y-2 border-black py-4 font-mono text-xs text-black">
            <div>
              <span className="font-black text-[#00A8C6] block mb-0.5">CONFERENCE</span>
              <span className="font-bold">{RESEARCH.venue}</span>
            </div>
            <div>
              <span className="font-black text-[#00A8C6] block mb-0.5">LOCATION</span>
              <span className="font-bold inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {RESEARCH.location}
              </span>
            </div>
            <div>
              <span className="font-black text-[#00A8C6] block mb-0.5">DATE</span>
              <span className="font-bold inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {RESEARCH.date}
              </span>
            </div>
            <div>
              <span className="font-black text-[#00A8C6] block mb-0.5">ORGANISER</span>
              <span className="font-bold inline-flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                {RESEARCH.organiser}
              </span>
            </div>
          </div>

          {/* Vision & Abstract */}
          <div className="border-l-4 border-[#00A8C6] bg-[#EFEFEA] p-5 border border-black shadow-[3px_3px_0px_#000000] space-y-2">
            <span className="font-mono text-[10px] font-black text-[#00A8C6] block uppercase tracking-widest">
              RESEARCH VISION &amp; ABSTRACT
            </span>
            <p className="font-sans text-sm sm:text-base text-black/90 leading-relaxed font-semibold">
              &ldquo;{RESEARCH.abstract}&rdquo;
            </p>
          </div>

          {/* Research Concepts */}
          <div className="pt-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-black/60 block mb-2">
              CORE TOPICS &amp; METHODOLOGY
            </span>
            <div className="flex flex-wrap gap-2">
              {RESEARCH.concepts.map((concept) => (
                <span
                  key={concept}
                  className="font-mono text-xs font-bold text-black bg-[#EFEFEA] px-3 py-1 border border-black shadow-[1.5px_1.5px_0px_#000000]"
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
