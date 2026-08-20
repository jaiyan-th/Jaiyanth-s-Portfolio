"use client";

import * as React from "react";
import { SKILL_GROUPS } from "@/data/portfolio";
import { motion, AnimatePresence } from "motion/react";

export function Skills() {
  const [selectedId, setSelectedId] = React.useState<string>("languages");

  const categories = SKILL_GROUPS;
  const currentGroup = SKILL_GROUPS.find((g) => g.id === selectedId) || SKILL_GROUPS[0];

  return (
    <section id="skills" className="relative bg-[#F6F3EC] border-b-2 border-[#14231C] px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-[#14231C] bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="font-mono text-[10px] font-bold text-[#2F5D46] tracking-widest uppercase block mb-2">
            02 —— SKILLS SYSTEM
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#14231C] leading-[1.08] tracking-tight uppercase">
            Six <span className="italic text-[#2F5D46] font-serif">evidence-based</span> skill groups.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6B6459] mt-2 font-semibold">
            Every competency is tied directly to production deployments, research artifacts, or team contributions.
          </p>
        </motion.div>

        {/* Two Columns Layout - Spec-Card Grid Language */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Vertical Index Spec-Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white p-6 sm:p-8 border-2 border-[#14231C] shadow-[5px_5px_0px_#14231C] relative flex-1 flex flex-col justify-between rounded-sm">
              {/* Viewfinder corners */}
              <span className="blueprint-corner blueprint-corner-tl" />
              <span className="blueprint-corner blueprint-corner-tr" />
              <span className="blueprint-corner blueprint-corner-bl" />
              <span className="blueprint-corner blueprint-corner-br" />

              <div className="border-b-2 border-[#14231C] pb-3 mb-4">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#14231C]">
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
                          ? "border-[#14231C] bg-[#2F5D46] text-white shadow-[3px_3px_0px_#14231C]"
                          : "border-[#14231C]/20 bg-white text-[#14231C] hover:border-[#14231C]/60 hover:bg-[#14231C]/5"
                      }`}
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        <span className={`text-[10px] font-black ${isSelected ? "text-white/80" : "text-[#6B6459]"}`}>{cat.index}</span>
                        
                        <span className={`font-black ${isSelected ? "text-white" : "text-[#14231C] group-hover:text-[#2F5D46]"}`}>
                          {cat.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 relative z-10">
                        <span className={`text-[9px] font-bold ${isSelected ? "text-white/80" : "text-[#6B6459]"}`}>
                          {cat.skills.length} UNITS
                        </span>
                        <span
                          className={`w-2.5 h-2.5 rounded-full border border-[#14231C] transition-transform ${
                            isSelected ? "bg-white scale-125" : "bg-[#14231C]/20 group-hover:bg-[#2F5D46]"
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
            <div className="bg-white p-6 sm:p-8 border-2 border-[#14231C] shadow-[5px_5px_0px_#2F5D46] relative flex-1 flex flex-col rounded-sm">
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
                    <div className="flex items-center justify-between border-b-2 border-[#14231C] pb-4 mb-5">
                      <div className="font-mono text-[10px] font-black uppercase tracking-wider text-[#14231C]">
                        {currentGroup.index} · {currentGroup.label}
                      </div>
                      <span className="font-mono text-[9px] text-[#2F5D46] font-black uppercase tracking-widest bg-[#2F5D46]/10 border border-[#2F5D46]/30 px-2 py-0.5">
                        ACTIVE COMPETENCY
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-5">
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-[#14231C] uppercase mb-2">
                        {currentGroup.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#14231C]/85 leading-relaxed font-medium">
                        {currentGroup.description}
                      </p>
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="space-y-4 border-t-2 border-b-2 border-[#14231C] py-4 mt-2 mb-4">
                    <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px]">
                      <span className="text-[#6B6459] font-bold uppercase">DOMAIN:</span>
                      <span className="sm:col-span-2 text-[#14231C] font-black uppercase">{currentGroup.label}</span>
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px] items-start">
                      <span className="text-[#6B6459] font-bold uppercase">COMPETENCIES:</span>
                      <div className="sm:col-span-2 flex flex-wrap gap-2">
                        {currentGroup.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={{ y: -2, scale: 1.04, borderColor: "#B08D57" }}
                            className="px-3 py-1 border-2 border-[#14231C] bg-[#F6F3EC] text-[#14231C] text-[10px] font-black shadow-[2px_2px_0px_#2F5D46] cursor-default transition-colors"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px] items-start">
                      <span className="text-[#6B6459] font-bold uppercase">EVIDENCE:</span>
                      <span className="sm:col-span-2 text-[#14231C] text-[10px] font-semibold leading-normal">{currentGroup.evidence}</span>
                    </div>

                    {currentGroup.impact && (
                      <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px] items-start pt-1">
                        <span className="text-[#6B6459] font-bold uppercase">IMPACT:</span>
                        <span className="sm:col-span-2 text-[#B08D57] text-[10px] font-extrabold leading-normal">{currentGroup.impact}</span>
                      </div>
                    )}
                  </div>

                  {/* Production Status & Architecture Highlights Spec Card */}
                  <div className="p-4 border-2 border-[#14231C] bg-[#F6F3EC] shadow-[3px_3px_0px_#14231C] mt-auto">
                    <div className="flex items-center justify-between font-mono text-[9.5px] font-black uppercase text-[#14231C] border-b border-[#DCD5C4] pb-2 mb-2">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#2F5D46] animate-pulse" />
                        SYSTEM LAYER: {currentGroup.label.toUpperCase()}
                      </span>
                      <span className="text-[#2F5D46]">VERIFIED COMPETENCY</span>
                    </div>
                    <p className="font-mono text-[9.5px] text-[#6B6459] font-semibold leading-relaxed">
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
