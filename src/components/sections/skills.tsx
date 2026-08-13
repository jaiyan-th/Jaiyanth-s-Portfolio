"use client";

import * as React from "react";
import { SKILL_GROUPS } from "@/data/portfolio";
import { motion, AnimatePresence } from "motion/react";

export function Skills() {
  const [selectedId, setSelectedId] = React.useState<string>("languages");

  const categories = SKILL_GROUPS;
  const currentGroup = SKILL_GROUPS.find((g) => g.id === selectedId) || SKILL_GROUPS[0];

  return (
    <section id="skills" className="relative bg-[#FAF3EE] border-b-2 border-black px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-black bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest uppercase block mb-2">
            02 —— SKILLS SYSTEM
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase">
            Six <span className="italic text-[#B91C1C] font-serif">evidence-based</span> skill groups.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-black/70 mt-2 font-semibold">
            Every competency is tied directly to production deployments, research artifacts, or team contributions.
          </p>
        </motion.div>

        {/* Two Columns Layout - Perfectly Height-Matched (items-stretch) */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Vertical Index with Viewfinder Brackets & Balanced Spacing */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white p-6 sm:p-8 border-2 border-black shadow-[5px_5px_0px_#000000] relative flex-1 flex flex-col justify-between rounded-sm">
              {/* Viewfinder corners */}
              <span className="blueprint-corner blueprint-corner-tl" />
              <span className="blueprint-corner blueprint-corner-tr" />
              <span className="blueprint-corner blueprint-corner-bl" />
              <span className="blueprint-corner blueprint-corner-br" />

              <div className="border-b-2 border-black pb-3 mb-4">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-black">
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
                          ? "border-black bg-[#B91C1C] text-white shadow-[3px_3px_0px_#000000]"
                          : "border-black/20 bg-white text-black hover:border-black/60 hover:bg-black/5"
                      }`}
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        <span className={`text-[10px] font-black ${isSelected ? "text-white/80" : "text-black/50"}`}>{cat.index}</span>
                        
                        <span className={`font-black ${isSelected ? "text-white" : "text-black group-hover:text-[#B91C1C]"}`}>
                          {cat.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 relative z-10">
                        <span className={`text-[9px] font-bold ${isSelected ? "text-white/80" : "text-black/50"}`}>
                          {cat.skills.length} UNITS
                        </span>
                        <span
                          className={`w-2.5 h-2.5 rounded-full border border-black transition-transform ${
                            isSelected ? "bg-white scale-125" : "bg-black/20 group-hover:bg-[#B91C1C]"
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
            <div className="bg-white p-6 sm:p-8 border-2 border-black shadow-[5px_5px_0px_#B91C1C] relative flex-1 flex flex-col justify-between rounded-sm">
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
                  className="flex-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Spec Sheet Header */}
                    <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
                      <div className="font-mono text-[10px] font-black uppercase tracking-wider text-black">
                        {currentGroup.index} · {currentGroup.label}
                      </div>
                      <span className="font-mono text-[9px] text-[#B91C1C] font-black uppercase tracking-widest bg-[#B91C1C]/10 border border-[#B91C1C]/30 px-2 py-0.5">
                        ACTIVE COMPETENCY
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-6">
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-black uppercase mb-2">
                        {currentGroup.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-medium">
                        {currentGroup.description}
                      </p>
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="space-y-4 border-t-2 border-b-2 border-black py-4 my-6">
                    <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px]">
                      <span className="text-black/60 font-bold uppercase">DOMAIN:</span>
                      <span className="sm:col-span-2 text-black font-black uppercase">{currentGroup.label}</span>
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px] items-start">
                      <span className="text-black/60 font-bold uppercase">COMPETENCIES:</span>
                      <div className="sm:col-span-2 flex flex-wrap gap-2">
                        {currentGroup.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={{ y: -2, scale: 1.05 }}
                            className="px-3 py-1 border-2 border-black bg-[#FAF3EE] text-black text-[10px] font-black shadow-[2px_2px_0px_#000000] cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-2 font-mono text-[10px] items-start">
                      <span className="text-black/60 font-bold uppercase">EVIDENCE:</span>
                      <span className="sm:col-span-2 text-black text-[10px] font-semibold leading-normal">{currentGroup.evidence}</span>
                    </div>
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

