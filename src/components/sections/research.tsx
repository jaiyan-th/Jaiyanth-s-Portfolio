"use client";

import * as React from "react";
import { FileText, MapPin, Calendar, Building2 } from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";

export function Research() {
  return (
    <section id="achievements" className="relative bg-[#0E0E10] border-b border-white/10 px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-white overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <div className="mb-10">
          <span className="font-mono text-[10px] font-bold text-[#FF4D4D] tracking-widest uppercase block mb-1">
            05 —— ACHIEVEMENTS
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white leading-[1.08] tracking-tight uppercase">
            IEEE research & key <span className="text-[#FF4D4D]">achievements.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-white/70 mt-2 font-semibold">
            Co-authored IEEE research accepted at ICETSIS 2026 along with key engineering accomplishments.
          </p>
        </div>

        {/* Large Paper Card with Corner Brackets */}
        <div className="bg-[#161619] border border-white/15 p-6 sm:p-10 mb-12 relative shadow-2xl">
          {/* Viewfinder corners */}
          <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF4D4D] pointer-events-none" />
          <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
          <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF4D4D] pointer-events-none" />

          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2 text-[#FF4D4D]">
              <FileText className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                IEEE ICETSIS 2026
              </span>
            </div>
            <span className="border border-[#FF4D4D]/60 text-[#FF4D4D] px-2.5 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider">
              CO-AUTHORED
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-black text-xl sm:text-2xl text-white leading-[1.08] uppercase mb-6">
            {RESEARCH.title}
          </h3>

          {/* Abstract Box */}
          <div className="border-l-2 border-[#FF4D4D] pl-4 mb-8 bg-[#0E0E10] p-4 text-xs sm:text-sm text-white/90 font-sans leading-relaxed">
            <span className="font-mono text-[9px] font-bold text-white/50 block mb-1 uppercase">ABSTRACT</span>
            "{RESEARCH.abstract}"
          </div>

          {/* Meta Grid (4 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-b border-white/15 py-4 mb-6 text-xs">
            <div>
              <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">
                VENUE
              </span>
              <span className="font-mono text-[10px] font-bold text-white">
                {RESEARCH.venue}
              </span>
            </div>

            <div>
              <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">
                LOCATION
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] text-white">
                <MapPin className="w-3 h-3 text-white/60" />
                <span className="font-bold">{RESEARCH.location}</span>
              </div>
            </div>

            <div>
              <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">
                DATE
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] text-white">
                <Calendar className="w-3 h-3 text-white/60" />
                <span className="font-bold">{RESEARCH.date}</span>
              </div>
            </div>

            <div>
              <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">
                ORGANISER
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] text-white">
                <Building2 className="w-3 h-3 text-white/60" />
                <span className="font-bold">{RESEARCH.organiser}</span>
              </div>
            </div>
          </div>

          {/* Core Concepts */}
          <div>
            <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/50 mb-3">
              CORE CONCEPTS
            </span>
            <div className="flex flex-wrap gap-1.5">
              {RESEARCH.concepts.map((concept) => (
                <span
                  key={concept}
                  className="font-mono text-[9px] font-semibold text-white px-2 py-0.5 border border-white/20 bg-[#0E0E10]"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Achievement Highlights Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="grid md:grid-cols-3 gap-8">
            {RESEARCH_CONTEXT.highlights.map((item) => (
              <div key={item.index} className="space-y-2">
                <span className="font-heading font-black text-3xl text-[#FF4D4D] block leading-[1.08]">
                  {item.index}
                </span>
                <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
