"use client";

import * as React from "react";
import { ABOUT } from "@/data/portfolio";
import { motion } from "motion/react";
import { Card3DTilt } from "@/components/ui/card-3d-tilt";

export function About() {
  return (
    <section id="about" className="relative bg-[#C2B5A3] border-b-2 border-black px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-black overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.07) 1px, transparent 1px)", backgroundSize: "48px 48px" }}>
      {/* Corner-bracket frame around the content section wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto border-2 border-black p-6 sm:p-10 relative bg-white shadow-[8px_8px_0px_#000000]"
      >
        {/* Viewfinder corners around the section */}
        <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#B91C1C] pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#B91C1C] pointer-events-none" />
        <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#B91C1C] pointer-events-none" />
        <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#B91C1C] pointer-events-none" />

        {/* Section Headline with Eyebrow Tag */}
        <div className="mb-12">
          <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest uppercase block mb-2">
            01 —— ABOUT
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase">
            From <span className="italic font-serif text-[#B91C1C]">signal</span> to{" "}
            <span className="italic font-serif text-[#B91C1C]">system</span> to{" "}
            <span className="italic font-serif text-[#B91C1C]">story.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-black/70 mt-2 font-semibold">
            A short orientation to who I am, what I build, and how I work.
          </p>
        </div>

        {/* Two-Column Grid: Copy + Metrics 2x2 Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-sans font-extrabold text-base sm:text-lg text-black leading-relaxed">
              {ABOUT.statement}
            </h3>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
              <p>{ABOUT.biography[0]}</p>
              <p>{ABOUT.biography[1]}</p>
              <p>{ABOUT.biography[2]}</p>
            </div>
          </div>

          {/* Right Column: Metrics 2x2 card layout */}
          <div className="lg:col-span-5">
            <div className="border-2 border-black p-6 relative bg-[#FAF3EE] shadow-[5px_5px_0px_#000000]">
              {/* Viewfinder corners */}
              <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#B91C1C] pointer-events-none" />
              <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#B91C1C] pointer-events-none" />
              <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#B91C1C] pointer-events-none" />
              <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#B91C1C] pointer-events-none" />

              {/* Header row */}
              <div className="flex items-center justify-between border-b-2 border-black/10 pb-3 mb-5">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-black">
                  METRICS · 04
                </span>
                <span className="font-mono text-[9px] text-[#B91C1C] font-black uppercase tracking-widest">
                  REAL ARTIFACTS
                </span>
              </div>

              {/* 2x2 Grid with 3D tilt */}
              <div className="grid sm:grid-cols-2 gap-4">
                {ABOUT.metrics.map((m, idx) => (
                  <Card3DTilt key={idx} maxDegree={8} glowColor="rgba(185, 28, 28, 0.2)">
                    <div className="relative p-4 border-2 border-black bg-white shadow-[3px_3px_0px_#B91C1C] transition-all cursor-default">
                      {/* Inner viewfinder corners */}
                      <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-[#B91C1C] pointer-events-none" />
                      <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-[#B91C1C] pointer-events-none" />
                      <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-[#B91C1C] pointer-events-none" />
                      <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-[#B91C1C] pointer-events-none" />

                      <span className="font-heading font-black text-3xl text-[#B91C1C] block mb-1">
                        {m.value}
                      </span>
                      <span className="font-mono text-[9.5px] font-black text-black uppercase tracking-wider block mb-1">
                        {m.label}
                      </span>
                      <span className="font-sans text-[9px] text-black/70 leading-normal block font-semibold">
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
