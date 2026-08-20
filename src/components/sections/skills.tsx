"use client";

import * as React from "react";
import { SKILL_GROUPS } from "@/data/portfolio";
import { motion, AnimatePresence } from "motion/react";

export function Skills() {
  const [selectedId, setSelectedId] = React.useState<string>("languages");

  const categories = SKILL_GROUPS;
  const currentGroup = SKILL_GROUPS.find((g) => g.id === selectedId) || SKILL_GROUPS[0];

  return (
    <section id="skills" className="relative bg-[#E8D8C4] border-b-2 border-[#561C24] px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-[#561C24] bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="font-mono text-[10px] font-bold text-[#6D2932] tracking-widest uppercase block mb-2">
            02 —— SKILLS SYSTEM
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#561C24] leading-[1.08] tracking-tight uppercase">
            Six <span className="italic text-[#6D2932] font-serif">evidence-based</span> skill groups.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#561C24]/75 mt-2 font-semibold">
            Every competency is tied directly to production deployments, research artifacts, or team contributions.
          </p>
        </motion.div>

        {/* Two Columns Layout - Spec-Card Grid Language */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Vertical Index Spec-Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white p-6 sm:p-8 border-2 border-[#561C24] shadow-[5px_5px_0px_#561C24] relative flex-1 flex flex-col justify-between rounded-sm">
              {/* Viewfinder corners */}
              <span className="blueprint-corner blueprint-corner-tl" />
              <span className="blueprint-corner blueprint-corner-tr" />
              <span className="blueprint-corner blueprint-corner-bl" />
              <span className="blueprint-corner blueprint-corner-br" />

              <div className="border-b-2 border-[#561C24] pb-3 mb-4">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#561C24]">
                  CATEGORIES · 06
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-3 py-1">
                {categories.map((cat) => {
                  const isSelected = cat.id === selectedId;
                  return (
                    <motion.button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedId(cat.id)}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left font-mono text-xs uppercase py-3.5 px-4 flex items-center justify-between group transition-all relative border-2 ${
                        isSelected
                          ? "border-[#561C24] bg-[#6D2932] text-white shadow-[3px_3px_0px_#561C24]"
                          : "border-[#561C24]/20 bg-white text-[#561C24] hover:border-[#561C24]/60 hover:bg-[#561C24]/5"
                      }`}
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        <span className={`text-[10px] font-black ${isSelected ? "text-white/80" : "text-[#561C24]/65"}`}>{cat.index}</span>
                        
                        <span className={`font-black ${isSelected ? "text-white" : "text-[#561C24] group-hover:text-[#6D2932]"}`}>
                          {cat.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 relative z-10">
                        <span className={`text-[9px] font-bold ${isSelected ? "text-white/80" : "text-[#561C24]/65"}`}>
                          {cat.skills.length} UNITS
                        </span>
                        <span
                          className={`w-2.5 h-2.5 rounded-full border border-[#561C24] transition-transform ${
                            isSelected ? "bg-white scale-125" : "bg-[#561C24]/20 group-hover:bg-[#6D2932]"
                          }`}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Spec Sheet Details Panel */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white p-6 sm:p-8 border-2 border-[#561C24] shadow-[5px_5px_0px_#6D2932] relative flex-1 flex flex-col rounded-sm">
              {/* Viewfinder corners */}
              <span className="blueprint-corner blueprint-corner-tl" />
              <span className="blueprint-corner blueprint-corner-tr" />
              <span className="blueprint-corner blueprint-corner-bl" />
              <span className="blueprint-corner blueprint-corner-br" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGroup.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex-1 flex flex-col justify-start"
                >
                  <div>
                    {/* Spec Sheet Header */}
                    <div className="flex items-center justify-between border-b-2 border-[#561C24] pb-4 mb-5">
                      <div className="font-mono text-[10px] font-black uppercase tracking-wider text-[#561C24]">
                        {currentGroup.index} · {currentGroup.label}
                      </div>
                      <span className="font-mono text-[9px] text-[#6D2932] font-black uppercase tracking-widest bg-[#6D2932]/10 border border-[#6D2932]/30 px-2 py-0.5">
                        ACTIVE COMPETENCY
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-5">
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-[#561C24] uppercase mb-2">
                        {currentGroup.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#561C24]/85 leading-relaxed font-medium">
                        {currentGroup.description}
                      </p>
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="space-y-4 border-t-2 border-b-2 border-[#561C24] py-4 mt-2 mb-4">
                    <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px]">
                      <span className="text-[#561C24]/65 font-bold uppercase">DOMAIN:</span>
                      <span className="sm:col-span-2 text-[#561C24] font-black uppercase">{currentGroup.label}</span>
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px] items-start">
                      <span className="text-[#561C24]/65 font-bold uppercase">COMPETENCIES:</span>
                      <div className="sm:col-span-2 flex flex-wrap gap-2">
                        {currentGroup.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={{ y: -2, scale: 1.04, borderColor: "#6D2932" }}
                            className="px-3 py-1 border-2 border-[#561C24] bg-[#E8D8C4] text-[#561C24] text-[10px] font-black shadow-[2px_2px_0px_#6D2932] cursor-default transition-colors"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px] items-start">
                      <span className="text-[#561C24]/65 font-bold uppercase">EVIDENCE:</span>
                      <span className="sm:col-span-2 text-[#561C24] text-[10px] font-semibold leading-normal">{currentGroup.evidence}</span>
                    </div>

                    {currentGroup.impact && (
                      <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px] items-start pt-1">
                        <span className="text-[#561C24]/65 font-bold uppercase">IMPACT:</span>
                        <span className="sm:col-span-2 text-[#6D2932] text-[10px] font-extrabold leading-normal">{currentGroup.impact}</span>
                      </div>
                    )}
                  </div>

                  {/* Production Status & Architecture Highlights Spec Card */}
                  <div className="p-4 border-2 border-[#561C24] bg-[#E8D8C4] shadow-[3px_3px_0px_#561C24] mt-auto">
                    <div className="flex items-center justify-between font-mono text-[9.5px] font-black uppercase text-[#561C24] border-b border-[#561C24]/15 pb-2 mb-2">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#6D2932] animate-pulse" />
                        SYSTEM LAYER: {currentGroup.label.toUpperCase()}
                      </span>
                      <span className="text-[#6D2932]">VERIFIED COMPETENCY</span>
                    </div>
                    <p className="font-mono text-[9.5px] text-[#561C24]/80 font-semibold leading-relaxed">
                      Integrated into real-world projects, research benchmarks, and production-ready applications.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
