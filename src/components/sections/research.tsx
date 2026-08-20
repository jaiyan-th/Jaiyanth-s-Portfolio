"use client";

import * as React from "react";
import { FileText, MapPin, Calendar, Building2, Award } from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";
import { motion } from "motion/react";

export function Research() {
  const concepts = [
    {
      num: "01",
      title: "Multimodal Signal Capture",
      desc: "Captures physiological signals and symptom telemetry across distributed client interfaces.",
    },
    {
      num: "02",
      title: "Structured Conversational Triage",
      desc: "Executes clinical decision trees and diagnostic triage via constrained conversational intelligence.",
    },
    {
      num: "03",
      title: "Explainable Preventive Routing",
      desc: "Outputs deterministic risk scoring and explainable referral pathways for preventive care.",
    },
  ];

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
              FEATURED ACHIEVEMENTS
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.04] tracking-tight uppercase">
            IEEE RESEARCH &amp; KEY <br />
            <span className="bg-[#00B2D6] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000]">
              ACCOMPLISHMENTS.
            </span>
          </h2>
        </motion.div>

        {/* Featured IEEE Research Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 bg-white border-2 border-black p-6 sm:p-10 shadow-[6px_6px_0px_#000000] space-y-8"
        >
          {/* Header Strip */}
          <div className="bg-[#00B2D6] border-b-2 border-black -m-6 sm:-m-10 mb-2 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-black" />
              <span className="font-mono text-xs sm:text-sm font-black uppercase text-black tracking-wider">
                IEEE ICETSIS 2026 · CO-AUTHORED RESEARCH PAPER
              </span>
            </div>
            <span className="bg-black text-white px-3 py-1 font-mono text-[10px] uppercase font-black tracking-widest border border-black shadow-[1.5px_1.5px_0px_#00B2D6]">
              ACCEPTED &amp; PUBLISHED
            </span>
          </div>

          {/* Paper Title */}
          <h3 className="font-serif italic text-2xl sm:text-4xl text-black leading-tight font-bold pt-4">
            {RESEARCH.title}
          </h3>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 border-y-2 border-black py-3.5 font-mono text-xs text-black">
            <div className="flex items-center gap-2">
              <span className="font-black text-[#00A8C6]">VENUE:</span>
              <span className="font-bold">{RESEARCH.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#00A8C6]" />
              <span className="font-bold">{RESEARCH.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#00A8C6]" />
              <span className="font-bold">{RESEARCH.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#00A8C6]" />
              <span className="font-bold">{RESEARCH.organiser}</span>
            </div>
          </div>

          {/* Abstract Callout */}
          <div className="border-l-4 border-[#00A8C6] bg-[#EFEFEA] p-4 border border-black shadow-[3px_3px_0px_#000000]">
            <span className="font-mono text-[10px] font-black text-[#00A8C6] block mb-1 uppercase tracking-widest">
              EXECUTIVE ABSTRACT PULL-QUOTE
            </span>
            <p className="font-serif italic text-sm sm:text-base text-black leading-relaxed font-semibold">
              &ldquo;{RESEARCH.abstract}&rdquo;
            </p>
          </div>

          {/* Pipeline Stages */}
          <div className="space-y-4 pt-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black block">
              RESEARCH FRAMEWORK PIPELINE // 3 STAGES
            </span>
            <div className="grid md:grid-cols-3 gap-4">
              {concepts.map((c) => (
                <div key={c.num} className="bg-[#EFEFEA] border-2 border-black p-4 shadow-[3px_3px_0px_#000000] space-y-2">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2">
                    <span className="font-mono text-xs font-black text-[#00A8C6]">STAGE {c.num}</span>
                  </div>
                  <h4 className="font-heading font-black text-sm text-black uppercase">{c.title}</h4>
                  <p className="font-sans text-xs text-black/80 font-semibold leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Concept Tags */}
          <div className="pt-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-black/60 block mb-2">
              CORE CONCEPT DOMAINS
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

        {/* 3 Key Highlights Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {RESEARCH_CONTEXT.highlights.map((item) => (
            <div
              key={item.index}
              className="p-5 border-2 border-black bg-white shadow-[4px_4px_0px_#000000] space-y-2"
            >
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <span className="font-mono text-xs font-black text-[#00A8C6]">{item.index}</span>
                <Award className="w-4 h-4 text-black" />
              </div>
              <h4 className="font-mono text-xs font-black text-black uppercase tracking-wider">{item.title}</h4>
              <p className="font-sans text-xs text-black/80 font-semibold leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
