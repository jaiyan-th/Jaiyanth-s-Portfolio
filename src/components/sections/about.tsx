"use client";

import * as React from "react";
import { ABOUT } from "@/data/portfolio";
import { motion } from "motion/react";
import { Card3DTilt } from "@/components/ui/card-3d-tilt";

export function About() {
  return (
    <section id="about" className="relative bg-[#F6F3EC] border-b-2 border-[#14231C] px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-[#14231C] overflow-hidden bg-grid">
      {/* Corner-bracket frame around the content section wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto border-2 border-[#14231C] p-6 sm:p-10 relative bg-white shadow-[8px_8px_0px_#14231C]"
      >
        {/* Viewfinder corners around the section */}
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#2F5D46] pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#2F5D46] pointer-events-none" />
        <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#2F5D46] pointer-events-none" />
        <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#2F5D46] pointer-events-none" />

        {/* Section Headline with Eyebrow Tag */}
        <div className="mb-12">
          <span className="font-mono text-[10px] font-bold text-[#2F5D46] tracking-widest uppercase block mb-2">
            01 —— ABOUT
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#14231C] leading-[1.08] tracking-tight uppercase">
            From <span className="italic font-serif text-[#2F5D46]">signal</span> to{" "}
            <span className="italic font-serif text-[#2F5D46]">system</span> to{" "}
            <span className="italic font-serif text-[#2F5D46]">story.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6B6459] mt-2 font-semibold">
            A short orientation to who I am, what I build, and how I work.
          </p>
        </div>

        {/* Two-Column Grid: Copy + Metrics 2x2 Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-sans font-extrabold text-base sm:text-lg text-[#14231C] leading-relaxed">
              {ABOUT.statement}
            </h3>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-[#14231C]/85 leading-relaxed font-medium">
              <p>{ABOUT.biography[0]}</p>
              <p>{ABOUT.biography[1]}</p>
              <p>{ABOUT.biography[2]}</p>
            </div>
          </div>

          {/* Right Column: Metrics 2x2 card layout */}
          <div className="lg:col-span-5">
            <div className="border-2 border-[#14231C] p-6 relative bg-[#F6F3EC] shadow-[5px_5px_0px_#14231C]">
              {/* Viewfinder corners */}
              <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#2F5D46] pointer-events-none" />
              <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#2F5D46] pointer-events-none" />
              <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#2F5D46] pointer-events-none" />
              <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#2F5D46] pointer-events-none" />

              {/* Header row */}
              <div className="flex items-center justify-between border-b-2 border-[#DCD5C4] pb-3 mb-5">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#14231C]">
                  METRICS · 04
                </span>
                <span className="font-mono text-[9px] text-[#2F5D46] font-black uppercase tracking-widest">
                  REAL ARTIFACTS
                </span>
              </div>

              {/* 2x2 Grid with 3D tilt */}
              <div className="grid sm:grid-cols-2 gap-4">
                {ABOUT.metrics.map((m, idx) => (
                  <Card3DTilt key={idx} maxDegree={8} glowColor="rgba(47, 93, 70, 0.2)">
                    <div className="relative p-4 border-2 border-[#14231C] bg-white shadow-[3px_3px_0px_#2F5D46] transition-all cursor-default hover:border-[#2F5D46]">
                      {/* Inner viewfinder corners */}
                      <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-[#B08D57] pointer-events-none" />
                      <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-[#B08D57] pointer-events-none" />
                      <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-[#B08D57] pointer-events-none" />
                      <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-[#B08D57] pointer-events-none" />

                      <span className="font-heading font-black text-3xl text-[#2F5D46] block mb-1">
                        {m.value}
                      </span>
                      <span className="font-mono text-[9.5px] font-black text-[#14231C] uppercase tracking-wider block mb-1">
                        {m.label}
                      </span>
                      <span className="font-sans text-[9px] text-[#6B6459] leading-normal block font-semibold">
                        {m.detail}
                      </span>
                    </div>
                  </Card3DTilt>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
