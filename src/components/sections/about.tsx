"use client";

import * as React from "react";
import { ABOUT } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="relative bg-[#FAF3EE] border-b border-black/10 px-4 py-12 md:px-8 md:py-20 text-black bg-grid">
      {/* Thin corner-bracket frame around the content section wrapper */}
      <div className="max-w-7xl mx-auto blueprint-box p-6 sm:p-10 relative">
        {/* Viewfinder corners around the section */}
        <span className="blueprint-corner blueprint-corner-tl blueprint-corner-orange" />
        <span className="blueprint-corner blueprint-corner-tr blueprint-corner-orange" />
        <span className="blueprint-corner blueprint-corner-bl blueprint-corner-orange" />
        <span className="blueprint-corner blueprint-corner-br blueprint-corner-orange" />

        {/* Section Headline with Eyebrow Tag */}
        <div className="mb-12">
          <span className="font-mono text-[10px] font-bold text-[#D9622B] tracking-widest uppercase block mb-2">
            01 —— ABOUT
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase">
            From <span className="italic font-serif text-[#D9622B]">signal</span> to{" "}
            <span className="italic font-serif text-[#D9622B]">system</span> to{" "}
            <span className="italic font-serif text-[#D9622B]">story.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-black/60 mt-2 font-semibold">
            A short orientation to who I am, what I build, and how I work.
          </p>
        </div>

        {/* Two-Column Grid: Copy + Metrics 2x2 Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-sans font-bold text-base sm:text-lg text-black leading-relaxed">
              {ABOUT.statement}
            </h3>

            <div className="space-y-4 font-sans text-sm text-black/75 leading-relaxed">
              <p>{ABOUT.biography[0]}</p>
              <p>{ABOUT.biography[1]}</p>
              <p>{ABOUT.biography[2]}</p>
            </div>
          </div>

          {/* Right Column: Metrics 2x2 card layout */}
          <div className="lg:col-span-5">
            <div className="blueprint-box p-6 relative bg-white">
              {/* Viewfinder corners */}
              <span className="blueprint-corner blueprint-corner-tl" />
              <span className="blueprint-corner blueprint-corner-tr" />
              <span className="blueprint-corner blueprint-corner-bl" />
              <span className="blueprint-corner blueprint-corner-br" />

              {/* Header row */}
              <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                  METRICS · 04
                </span>
                <span className="font-mono text-[9px] text-[#B91C1C] font-bold uppercase tracking-widest">
                  REAL ARTIFACTS
                </span>
              </div>

              {/* 2x2 Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {ABOUT.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="relative p-4 border border-black/10 bg-[#FAF3EE] blueprint-box"
                  >
                    {/* Inner viewfinder corners */}
                    <span className="blueprint-corner blueprint-corner-tl" />
                    <span className="blueprint-corner blueprint-corner-tr" />
                    <span className="blueprint-corner blueprint-corner-bl" />
                    <span className="blueprint-corner blueprint-corner-br" />

                    <span className="font-heading font-black text-3xl text-[#B91C1C] block mb-1">
                      {m.value}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-black uppercase tracking-wider block mb-1">
                      {m.label}
                    </span>
                    <span className="font-sans text-[9px] text-black/65 leading-normal block">
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
