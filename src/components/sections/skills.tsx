"use client";

import * as React from "react";
import { SKILL_GROUPS } from "@/data/portfolio";

export function Skills() {
  const [selectedId, setSelectedId] = React.useState<string>("languages");

  const categories = SKILL_GROUPS.slice(0, 6);
  const currentGroup = SKILL_GROUPS.find((g) => g.id === selectedId) || SKILL_GROUPS[0];

  return (
    <section id="skills" className="relative bg-[#FAF3EE] border-b border-black/10 px-4 py-12 md:px-8 md:py-20 text-black bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <div className="mb-12">
          <span className="font-mono text-[10px] font-bold text-[#D9622B] tracking-widest uppercase block mb-2">
            02 —— SKILLS SYSTEM
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase">
            Seven <span className="italic text-[#B91C1C] font-serif">evidence-based</span> skill groups.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-black/60 mt-2 font-semibold">
            Every competency is tied directly to production deployments, research artifacts, or team contributions.
          </p>
        </div>

        {/* Two Columns Layout - Perfectly Height-Matched (items-stretch) */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Vertical Index with Viewfinder Brackets & Balanced Spacing */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white p-6 sm:p-8 blueprint-box relative flex-1 flex flex-col justify-between">
              {/* Viewfinder corners */}
              <span className="blueprint-corner blueprint-corner-tl" />
              <span className="blueprint-corner blueprint-corner-tr" />
              <span className="blueprint-corner blueprint-corner-bl" />
              <span className="blueprint-corner blueprint-corner-br" />

              <div className="border-b border-black/10 pb-3 mb-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-black">
                  CATEGORIES · 06
                </span>
              </div>

              {/* Generous spacing (flex-1 flex flex-col justify-between) to match right panel height */}
              <div className="flex-1 flex flex-col justify-between space-y-3 py-1">
                {categories.map((cat) => {
                  const isSelected = cat.id === selectedId;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedId(cat.id)}
                      className="w-full text-left font-mono text-xs uppercase py-3.5 px-4 flex items-center justify-between group transition-all relative border border-black/10 hover:border-black/30"
                    >
                      {/* Active highlight background */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#B91C1C]/5 border border-[#B91C1C]/30" />
                      )}
                      
                      <div className="flex items-center gap-3 relative z-10">
                        <span className="text-black/45 text-[10px] font-bold">{cat.index}</span>
                        
                        <span className={`font-bold transition-colors ${isSelected ? "text-[#B91C1C]" : "text-black group-hover:text-[#B91C1C]"}`}>
                          {cat.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 relative z-10">
                        <span className="text-black/45 text-[9px] font-bold">
                          {cat.skills.length} UNITS
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full transition-transform ${
                            isSelected ? "bg-[#B91C1C] scale-125" : "bg-black/20 group-hover:bg-[#B91C1C]/50"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Spec Sheet Details Panel */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white p-6 sm:p-8 blueprint-box relative flex-1 flex flex-col justify-between">
              {/* Viewfinder corners */}
              <span className="blueprint-corner blueprint-corner-tl" />
              <span className="blueprint-corner blueprint-corner-tr" />
              <span className="blueprint-corner blueprint-corner-bl" />
              <span className="blueprint-corner blueprint-corner-br" />

              <div>
                {/* Spec Sheet Header */}
                <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-black">
                    {currentGroup.index} · {currentGroup.label}
                  </div>
                  <span className="font-mono text-[9px] text-[#B91C1C] font-bold uppercase tracking-widest">
                    ACTIVE COMPETENCY
                  </span>
                </div>

                {/* Title & Description */}
                <div className="mb-6">
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-black uppercase mb-2">
                    {currentGroup.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-black/75 leading-relaxed">
                    {currentGroup.description}
                  </p>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-4 border-t border-b border-black/15 py-4 my-6">
                <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px]">
                  <span className="text-black/50 uppercase">DOMAIN:</span>
                  <span className="sm:col-span-2 text-black font-bold uppercase">{currentGroup.label}</span>
                </div>
                
                <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px] items-start">
                  <span className="text-black/50 uppercase">COMPETENCIES:</span>
                  <div className="sm:col-span-2 flex flex-wrap gap-1.5">
                    {currentGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 border border-black/15 bg-[#FAF3EE] text-black text-[10px] font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px] items-start">
                  <span className="text-black/50 uppercase">EVIDENCE:</span>
                  <span className="sm:col-span-2 text-black text-[10px] leading-normal">{currentGroup.evidence}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
