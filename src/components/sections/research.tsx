"use client";

import * as React from "react";
import { FileText, MapPin, Calendar, Building2, Award, Sparkles } from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";
import { motion } from "motion/react";

export function Research() {
  return (
    <section id="achievements" className="relative bg-[#D4C8B8] border-b-2 border-black px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-black overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.07) 1px, transparent 1px)", backgroundSize: "48px 48px" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest uppercase block mb-1">
            05 —— ACHIEVEMENTS
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase">
            IEEE research &amp; key <span className="text-[#B91C1C]">achievements.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-black/75 mt-2 font-semibold">
            Co-authored IEEE research accepted at ICETSIS 2026 along with key engineering accomplishments.
          </p>
        </motion.div>

        {/* Research Paper — Two-Column Editorial Layout */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="grid lg:grid-cols-12 gap-0 border-2 border-black bg-white shadow-[6px_6px_0px_#000000] rounded-sm overflow-hidden">
            
            {/* Left Column — Paper Title & Status */}
            <div className="lg:col-span-5 bg-[#B91C1C] text-white p-6 sm:p-8 flex flex-col justify-between relative">
              {/* Viewfinder corners */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/40 pointer-events-none" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/40 pointer-events-none" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/40 pointer-events-none" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/40 pointer-events-none" />

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-white/80" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-white/90">
                    IEEE ICETSIS 2026
                  </span>
                </div>

                {/* Title — Italic, Sentence Case */}
                <h3 className="font-serif italic text-lg sm:text-xl lg:text-2xl text-white leading-snug mb-6">
                  {RESEARCH.title}
                </h3>

                <span className="inline-block border-2 border-white bg-white/15 text-white px-3 py-1 font-mono text-[9px] uppercase font-black tracking-wider backdrop-blur-none">
                  CO-AUTHORED · ACCEPTED
                </span>
              </div>

              {/* Meta Row */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/20">
                <div>
                  <span className="block font-mono text-[8px] font-bold uppercase tracking-widest text-white/60 mb-1">LOCATION</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-white/70" />
                    <span className="font-mono text-[10px] font-bold text-white">{RESEARCH.location}</span>
                  </div>
                </div>
                <div>
                  <span className="block font-mono text-[8px] font-bold uppercase tracking-widest text-white/60 mb-1">DATE</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-white/70" />
                    <span className="font-mono text-[10px] font-bold text-white">{RESEARCH.date}</span>
                  </div>
                </div>
                <div>
                  <span className="block font-mono text-[8px] font-bold uppercase tracking-widest text-white/60 mb-1">VENUE</span>
                  <span className="font-mono text-[10px] font-bold text-white">{RESEARCH.venue}</span>
                </div>
                <div>
                  <span className="block font-mono text-[8px] font-bold uppercase tracking-widest text-white/60 mb-1">ORGANISER</span>
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-white/70" />
                    <span className="font-mono text-[10px] font-bold text-white">{RESEARCH.organiser}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Abstract, Concepts */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col">
              {/* Abstract */}
              <div className="mb-6">
                <span className="font-mono text-[9px] font-black text-[#B91C1C] block mb-2 uppercase tracking-widest">ABSTRACT</span>
                <p className="font-sans text-sm sm:text-base text-black/90 leading-relaxed font-medium">
                  &ldquo;{RESEARCH.abstract}&rdquo;
                </p>
              </div>

              {/* Core Concepts */}
              <div className="mt-auto pt-6 border-t-2 border-black/10">
                <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-black/60 mb-3">
                  CORE CONCEPTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {RESEARCH.concepts.map((concept) => (
                    <motion.span
                      key={concept}
                      whileHover={{ y: -2, scale: 1.05 }}
                      className="font-mono text-[9px] font-black text-black px-3 py-1.5 border-2 border-black bg-[#FAF3EE] shadow-[2px_2px_0px_#B91C1C] cursor-default"
                    >
                      {concept}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievement Highlights — Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {RESEARCH_CONTEXT.highlights.map((item, i) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: "6px 6px 0px #B91C1C" }}
              className="p-5 border-2 border-black bg-white shadow-[4px_4px_0px_#000000] rounded-sm transition-all relative group"
            >
              {/* Index badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-black text-2xl text-[#B91C1C] leading-none">
                  {item.index}
                </span>
                <Award className="w-4 h-4 text-black/30 group-hover:text-[#B91C1C] transition-colors" />
              </div>
              <h4 className="font-mono text-[10.5px] font-black text-black uppercase tracking-wider mb-2">
                {item.title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
