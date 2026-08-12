"use client";

import * as React from "react";
import { EXPERIENCE } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="relative bg-[#FAF3EE] border-b border-black/10 px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-black bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <div className="mb-12">
          <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest uppercase block mb-1">
            04 —— EXPERIENCE
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase">
            One <span className="text-[#B91C1C]">focused</span> AI internship.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-black/60 mt-2 font-semibold">
            Real engineering work — prototypes that had to run, with the debugging and testing discipline that implies.
          </p>
        </div>

        {/* Two Side-by-Side Blueprint Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Role Details */}
          <div className="blueprint-box p-6 sm:p-8 bg-white relative flex flex-col justify-between">
            {/* Viewfinder corners */}
            <span className="blueprint-corner blueprint-corner-tl" />
            <span className="blueprint-corner blueprint-corner-tr" />
            <span className="blueprint-corner blueprint-corner-bl" />
            <span className="blueprint-corner blueprint-corner-br" />

            <div>
              <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-4">
                <span className="font-mono text-[10px] font-bold text-black/70">
                  {EXPERIENCE.period}
                </span>
                <span className="border border-[#B91C1C]/45 text-[#B91C1C] px-2 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider">
                  STATUS: COMPLETED
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg sm:text-2xl text-black uppercase mb-1 leading-[1.08]">
                {EXPERIENCE.role}
              </h3>

              <a
                href="#"
                className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#B91C1C] hover:text-[#B91C1C]/80 transition-colors inline-block mb-6"
              >
                {EXPERIENCE.organisation}
              </a>

              <p className="font-sans text-xs sm:text-sm text-black/75 leading-relaxed">
                {EXPERIENCE.reflection}
              </p>
            </div>
          </div>

          {/* Right: Vertical Process Flow */}
          <div className="blueprint-box p-6 sm:p-8 bg-white relative">
            {/* Viewfinder corners */}
            <span className="blueprint-corner blueprint-corner-tl" />
            <span className="blueprint-corner blueprint-corner-tr" />
            <span className="blueprint-corner blueprint-corner-bl" />
            <span className="blueprint-corner blueprint-corner-br" />

            <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                WORKFLOW PIPELINE
              </span>
              <span className="font-mono text-[9px] text-black/60 uppercase">
                8 STAGES
              </span>
            </div>

            {/* vertical process line */}
            <div className="relative pl-6 space-y-4">
              {/* Vertical line connecting nodes */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-black/15" />

              {/* Checklist items as pipeline nodes */}
              {EXPERIENCE.work.map((item, idx) => {
                const stageNum = String(idx + 1).padStart(2, "0");
                return (
                  <div
                    key={item}
                    className="flex items-center justify-between relative"
                  >
                    <div className="flex items-center gap-3">
                      {/* Node point */}
                      <div className="absolute left-[-23px] w-2.5 h-2.5 rounded-full border border-black bg-white flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-black uppercase tracking-wider">
                        {item}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-black/45 font-bold">
                      {stageNum}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
