"use client";

import * as React from "react";
import { FileText, MapPin, Calendar, Building2 } from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";

export function Research() {
  return (
    <section id="achievements" className="relative bg-[#FAF3EE] border-b border-black/10 px-4 py-12 md:px-8 md:py-20 text-black bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <div className="mb-10">
          <span className="font-mono text-[10px] font-bold text-[#D9622B] tracking-widest uppercase block mb-1">
            05 —— ACHIEVEMENTS
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase">
            IEEE research & key <span className="text-[#D9622B]">achievements.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-black/60 mt-2 font-semibold">
            Co-authored IEEE research accepted at ICETSIS 2026 along with key engineering accomplishments.
          </p>
        </div>

        {/* Large Paper Card with Corner Brackets */}
        <div className="bg-white p-6 sm:p-10 blueprint-box mb-12 relative">
          {/* Viewfinder corners */}
          <span className="blueprint-corner blueprint-corner-tl" />
          <span className="blueprint-corner blueprint-corner-tr" />
          <span className="blueprint-corner blueprint-corner-bl" />
          <span className="blueprint-corner blueprint-corner-br" />

          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
            <div className="flex items-center gap-2 text-[#D9622B]">
              <FileText className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-black">
                IEEE ICETSIS 2026
              </span>
            </div>
            <span className="border border-[#B91C1C]/45 text-[#B91C1C] px-2.5 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider">
              CO-AUTHORED
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-black text-xl sm:text-2xl text-black leading-[1.08] uppercase mb-6">
            {RESEARCH.title}
          </h3>

          {/* Abstract Box */}
          <div className="border-l border-[#D9622B] pl-4 mb-8 bg-[#FAF3EE] p-4 text-xs sm:text-sm text-black/80 font-sans leading-relaxed">
            <span className="font-mono text-[9px] font-bold text-black/45 block mb-1 uppercase">ABSTRACT</span>
            "{RESEARCH.abstract}"
          </div>

          {/* Meta Grid (4 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-b border-black/15 py-4 mb-6 text-xs">
            <div>
              <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/50 mb-1">
                VENUE
              </span>
              <span className="font-mono text-[10px] font-bold text-black">
                {RESEARCH.venue}
              </span>
            </div>

            <div>
              <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/50 mb-1">
                LOCATION
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] text-black">
                <MapPin className="w-3 h-3 text-black/60" />
                <span className="font-bold">{RESEARCH.location}</span>
              </div>
            </div>

            <div>
              <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/50 mb-1">
                DATE
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] text-black">
                <Calendar className="w-3 h-3 text-black/60" />
                <span className="font-bold">{RESEARCH.date}</span>
              </div>
            </div>

            <div>
              <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/50 mb-1">
                ORGANISER
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] text-black">
                <Building2 className="w-3 h-3 text-black/60" />
                <span className="font-bold">{RESEARCH.organiser}</span>
              </div>
            </div>
          </div>

          {/* Core Concepts */}
          <div>
            <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/50 mb-3">
              CORE CONCEPTS
            </span>
            <div className="flex flex-wrap gap-1.5">
              {RESEARCH.concepts.map((concept) => (
                <span
                  key={concept}
                  className="font-mono text-[9px] font-semibold text-black px-2 py-0.5 border border-black/15 bg-[#FAF3EE]"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Achievement Highlights Section */}
        <div className="border-t border-black/10 pt-8">
          <div className="grid md:grid-cols-3 gap-8">
            {RESEARCH_CONTEXT.highlights.map((item) => (
              <div key={item.index} className="space-y-2">
                <span className="font-heading font-black text-3xl text-[#B91C1C] block leading-[1.08]">
                  {item.index}
                </span>
                <h4 className="font-mono text-[10px] font-bold text-black uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-black/75 leading-relaxed">
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
