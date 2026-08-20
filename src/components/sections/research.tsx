"use client";

import * as React from "react";
import { FileText, MapPin, Calendar, Building2, Award, ArrowRight, Activity, Cpu, ShieldCheck } from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";
import { motion } from "motion/react";

export function Research() {
  // 3-Step Pipeline Flow Nodes for IEEE Research Paper
  const pipelineSteps = [
    {
      step: "01",
      title: "Multimodal Signal Capture",
      tag: "INTAKE & SENSING",
      desc: "Captures physiological signals and symptom telemetry across distributed client interfaces.",
      icon: Activity,
    },
    {
      step: "02",
      title: "Structured Conversational Triage",
      tag: "LLM REASONING",
      desc: "Executes clinical decision trees and diagnostic triage via constrained conversational intelligence.",
      icon: Cpu,
    },
    {
      step: "03",
      title: "Explainable Preventive Routing",
      tag: "DISPATCH & AUDIT",
      desc: "Outputs deterministic risk scoring and explainable referral pathways for preventive care.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="achievements" className="relative bg-[#F5EFE6] border-b-2 border-[#561C24] px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-[#561C24] overflow-hidden bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="font-mono text-[10px] font-bold text-[#6D2932] tracking-widest uppercase block mb-1">
            05 —— FEATURED ACHIEVEMENTS
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#561C24] leading-[1.08] tracking-tight uppercase">
            IEEE RESEARCH &amp; KEY <span className="text-[#6D2932]">ACCOMPLISHMENTS.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#561C24]/80 mt-2 font-semibold">
            Co-authored IEEE research accepted at ICETSIS 2026 along with verified engineering achievements.
          </p>
        </motion.div>

        {/* Primary Feature Container — Distinct Elevated Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="bg-white border-2 border-[#561C24] shadow-[8px_8px_0px_#561C24] rounded-sm relative overflow-hidden">
            
            {/* Wide Achievement Banner Header Strip */}
            <div className="bg-[#6D2932] text-white px-6 py-4 border-b-2 border-[#561C24] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#F5EFE6]" />
                <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-widest text-[#F5EFE6]">
                  IEEE ICETSIS 2026 · CO-AUTHORED RESEARCH PAPER
                </span>
              </div>
              <span className="border-2 border-[#561C24] bg-[#561C24] text-white px-3 py-1 font-mono text-[10px] uppercase font-black tracking-widest shadow-[2px_2px_0px_#F5EFE6]">
                ACCEPTED &amp; PUBLISHED
              </span>
            </div>

            <div className="p-6 sm:p-10 relative bg-[#FFFFFF]/90 backdrop-blur-sm">
              {/* Viewfinder corner brackets */}
              <span className="blueprint-corner blueprint-corner-tl" />
              <span className="blueprint-corner blueprint-corner-tr" />
              <span className="blueprint-corner blueprint-corner-bl" />
              <span className="blueprint-corner blueprint-corner-br" />

              {/* Eyebrow Label & Headline Title */}
              <div className="mb-6">
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#6D2932] block mb-2">
                  RESEARCH TITLE
                </span>
                <h3 className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#561C24] leading-tight font-bold">
                  {RESEARCH.title}
                </h3>
              </div>

              {/* Compact Horizontal Meta-Row (Icons + Labels) */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 border-y-2 border-[#E5DCD0] py-3.5 mb-8 font-mono text-xs text-[#561C24]">
                <div className="flex items-center gap-2 bg-[#F5EFE6] px-3 py-1.5 border border-[#E5DCD0] rounded-sm">
                  <span className="font-bold text-[#6D2932]">VENUE:</span>
                  <span className="font-black">{RESEARCH.venue}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#F5EFE6] px-3 py-1.5 border border-[#E5DCD0] rounded-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#6D2932]" />
                  <span className="font-black">{RESEARCH.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#F5EFE6] px-3 py-1.5 border border-[#E5DCD0] rounded-sm">
                  <Calendar className="w-3.5 h-3.5 text-[#6D2932]" />
                  <span className="font-black">{RESEARCH.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#F5EFE6] px-3 py-1.5 border border-[#E5DCD0] rounded-sm">
                  <Building2 className="w-3.5 h-3.5 text-[#6D2932]" />
                  <span className="font-black">{RESEARCH.organiser}</span>
                </div>
              </div>

              {/* Abstract Pull-Quote Style Block */}
              <div className="relative border-l-4 border-[#6D2932] pl-6 py-4 pr-4 bg-[#F5EFE6] mb-10 shadow-[3px_3px_0px_#561C24] border-t border-r border-b border-[#E5DCD0] rounded-r-sm">
                <span className="font-mono text-[10px] font-black text-[#6D2932] block mb-2 uppercase tracking-widest">
                  // EXECUTIVE ABSTRACT
                </span>
                <p className="font-serif italic text-sm sm:text-base text-[#561C24] leading-relaxed font-semibold">
                  &ldquo;{RESEARCH.abstract}&rdquo;
                </p>
              </div>

              {/* Horizontal 3-Step Process Pipeline Row */}
              <div className="mb-10">
                <div className="flex items-center justify-between border-b-2 border-[#561C24] pb-3 mb-6">
                  <span className="font-mono text-[11px] font-black uppercase tracking-widest text-[#561C24]">
                    RESEARCH FRAMEWORK PIPELINE · 3 STAGES
                  </span>
                  <span className="font-mono text-[9.5px] font-black text-[#6D2932] bg-[#F5EFE6] px-2.5 py-1 border border-[#E5DCD0] shadow-[1px_1px_0px_#561C24]">
                    SYSTEM DESIGN
                  </span>
                </div>

                {/* 3-Step Horizontal Row with Connecting Arrows */}
                <div className="grid md:grid-cols-3 gap-6 relative">
                  {pipelineSteps.map((step, idx) => {
                    const StepIcon = step.icon;
                    const isLast = idx === pipelineSteps.length - 1;

                    return (
                      <div key={step.step} className="relative flex flex-col justify-between border-2 border-[#561C24] bg-[#F5EFE6] p-5 shadow-[4px_4px_0px_#6D2932] rounded-sm group hover:shadow-[6px_6px_0px_#561C24] transition-all">
                        <div>
                          {/* Step Top Bar */}
                          <div className="flex items-center justify-between border-b border-[#E5DCD0] pb-2 mb-3">
                            <span className="font-mono text-xs font-black text-[#6D2932] tracking-wider">
                              STAGE {step.step}
                            </span>
                            <span className="font-mono text-[8.5px] font-bold text-[#561C24]/70 bg-white px-2 py-0.5 border border-[#E5DCD0]">
                              {step.tag}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-sm bg-[#6D2932] text-white flex items-center justify-center border border-[#561C24] shadow-[1px_1px_0px_#561C24]">
                              <StepIcon className="w-4 h-4" />
                            </div>
                            <h4 className="font-heading font-black text-sm text-[#561C24] uppercase leading-tight">
                              {step.title}
                            </h4>
                          </div>

                          <p className="font-sans text-xs text-[#561C24]/85 leading-relaxed font-medium mt-2">
                            {step.desc}
                          </p>
                        </div>

                        {/* Connecting Arrow for Desktop */}
                        {!isLast && (
                          <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#561C24] text-white items-center justify-center border-2 border-white shadow-[2px_2px_0px_#6D2932]">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Core Concept Tags Cluster */}
              <div>
                <span className="block font-mono text-[10px] font-black uppercase tracking-widest text-[#561C24]/80 mb-3">
                  CORE CONCEPT DOMAINS
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {RESEARCH.concepts.map((concept) => (
                    <motion.span
                      key={concept}
                      whileHover={{ y: -2, scale: 1.04, borderColor: "#561C24" }}
                      className="font-mono text-[10px] font-black text-[#561C24] px-3.5 py-1.5 border-2 border-[#6D2932] bg-[#F5EFE6] shadow-[2px_2px_0px_#561C24] cursor-default transition-colors"
                    >
                      {concept}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievement Highlights — 3 Key Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {RESEARCH_CONTEXT.highlights.map((item, i) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: "6px 6px 0px #6D2932" }}
              className="p-5 border-2 border-[#561C24] bg-white shadow-[4px_4px_0px_#561C24] rounded-sm transition-all relative group"
            >
              <div className="flex items-center justify-between mb-3 border-b border-[#E5DCD0] pb-2">
                <span className="font-heading font-black text-xl text-[#6D2932] leading-none">
                  {item.index}
                </span>
                <Award className="w-4 h-4 text-[#6D2932] transition-colors" />
              </div>
              <h4 className="font-mono text-[11px] font-black text-[#561C24] uppercase tracking-wider mb-2">
                {item.title}
              </h4>
              <p className="font-sans text-xs text-[#561C24]/85 leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
