"use client";

import * as React from "react";
import { ABOUT } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="relative bg-[#0E0E10] border-b border-white/10 px-4 py-12 md:px-8 md:py-20 text-white overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }}>
      {/* Thin corner-bracket frame around the content section wrapper */}
      <div className="max-w-7xl mx-auto border border-white/15 p-6 sm:p-10 relative bg-[#141416]/90 shadow-2xl">
        {/* Viewfinder corners around the section */}
        <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#D9622B] pointer-events-none" />
        <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#D9622B] pointer-events-none" />
        <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#D9622B] pointer-events-none" />
        <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#D9622B] pointer-events-none" />

        {/* Section Headline with Eyebrow Tag */}
        <div className="mb-12">
          <span className="font-mono text-[10px] font-bold text-[#D9622B] tracking-widest uppercase block mb-2">
            01 —— ABOUT
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white leading-[1.08] tracking-tight uppercase">
            From <span className="italic font-serif text-[#FF4D4D]">signal</span> to{" "}
            <span className="italic font-serif text-[#FF4D4D]">system</span> to{" "}
            <span className="italic font-serif text-[#FF4D4D]">story.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-white/70 mt-2 font-semibold">
            A short orientation to who I am, what I build, and how I work.
          </p>
        </div>

        {/* Two-Column Grid: Copy + Metrics 2x2 Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-sans font-bold text-base sm:text-lg text-white leading-relaxed">
              {ABOUT.statement}
            </h3>

            <div className="space-y-4 font-sans text-sm text-white/80 leading-relaxed">
              <p>{ABOUT.biography[0]}</p>
              <p>{ABOUT.biography[1]}</p>
              <p>{ABOUT.biography[2]}</p>
            </div>
          </div>

          {/* Right Column: Metrics 2x2 card layout */}
          <div className="lg:col-span-5">
            <div className="border border-white/15 p-6 relative bg-[#1B1B1E] shadow-xl">
              {/* Viewfinder corners */}
              <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
              <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-[#FF4D4D] pointer-events-none" />
              <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
              <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-[#FF4D4D] pointer-events-none" />

              {/* Header row */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                  METRICS · 04
                </span>
                <span className="font-mono text-[9px] text-[#FF4D4D] font-bold uppercase tracking-widest">
                  REAL ARTIFACTS
                </span>
              </div>

              {/* 2x2 Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {ABOUT.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="relative p-4 border border-white/10 bg-[#0E0E10]"
                  >
                    {/* Inner viewfinder corners */}
                    <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-[#FF4D4D] pointer-events-none" />
                    <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r border-[#FF4D4D] pointer-events-none" />
                    <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l border-[#FF4D4D] pointer-events-none" />
                    <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-[#FF4D4D] pointer-events-none" />

                    <span className="font-heading font-black text-3xl text-[#FF4D4D] block mb-1">
                      {m.value}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-white uppercase tracking-wider block mb-1">
                      {m.label}
                    </span>
                    <span className="font-sans text-[9px] text-white/70 leading-normal block">
                      {m.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
