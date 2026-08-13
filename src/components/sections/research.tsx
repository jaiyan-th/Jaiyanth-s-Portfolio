"use client";

import * as React from "react";
import { FileText, MapPin, Calendar, Building2, Award } from "lucide-react";
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
          className="mb-10"
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

        {/* Research Paper Card — Clean White Layout */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="bg-white border-2 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000000] rounded-sm relative">
            {/* Viewfinder corners */}
            <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#B91C1C] pointer-events-none" />
            <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#B91C1C] pointer-events-none" />
            <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#B91C1C] pointer-events-none" />
            <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#B91C1C] pointer-events-none" />

            {/* Header Row */}
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#B91C1C]" />
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-black">
                  IEEE ICETSIS 2026
                </span>
              </div>
              <span className="border-2 border-black bg-[#B91C1C] text-white px-2.5 py-0.5 font-mono text-[9px] uppercase font-black tracking-wider shadow-[1px_1px_0px_#000]">
                CO-AUTHORED
              </span>
            </div>

            {/* Title — Italic Serif */}
            <h3 className="font-serif italic text-lg sm:text-xl lg:text-2xl text-black leading-snug mb-5">
              {RESEARCH.title}
            </h3>

            {/* Abstract */}
            <div className="border-l-4 border-[#B91C1C] pl-4 mb-6 bg-[#FAF3EE] p-4 text-xs sm:text-sm text-black/90 font-sans leading-relaxed font-medium">
              <span className="font-mono text-[9px] font-black text-[#B91C1C] block mb-1 uppercase">ABSTRACT</span>
              &ldquo;{RESEARCH.abstract}&rdquo;
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t-2 border-b-2 border-black/10 py-3 mb-5 text-xs">
              <div>
                <span className="block font-mono text-[8px] font-black uppercase tracking-widest text-black/50 mb-0.5">VENUE</span>
                <span className="font-mono text-[10px] font-bold text-black">{RESEARCH.venue}</span>
              </div>
              <div>
                <span className="block font-mono text-[8px] font-black uppercase tracking-widest text-black/50 mb-0.5">LOCATION</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#B91C1C]" />
                  <span className="font-mono text-[10px] font-bold text-black">{RESEARCH.location}</span>
                </div>
              </div>
              <div>
                <span className="block font-mono text-[8px] font-black uppercase tracking-widest text-black/50 mb-0.5">DATE</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#B91C1C]" />
                  <span className="font-mono text-[10px] font-bold text-black">{RESEARCH.date}</span>
                </div>
              </div>
              <div>
                <span className="block font-mono text-[8px] font-black uppercase tracking-widest text-black/50 mb-0.5">ORGANISER</span>
                <div className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#B91C1C]" />
                  <span className="font-mono text-[10px] font-bold text-black">{RESEARCH.organiser}</span>
                </div>
              </div>
            </div>

            {/* Core Concepts */}
            <div>
              <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-black/60 mb-2">
                CORE CONCEPTS
              </span>
              <div className="flex flex-wrap gap-2">
                {RESEARCH.concepts.map((concept) => (
                  <motion.span
                    key={concept}
                    whileHover={{ y: -2, scale: 1.05 }}
                    className="font-mono text-[9px] font-black text-black px-2.5 py-1 border-2 border-black bg-[#FAF3EE] shadow-[2px_2px_0px_#B91C1C] cursor-default"
                  >
                    {concept}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievement Highlights — Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {RESEARCH_CONTEXT.highlights.map((item, i) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: "6px 6px 0px #B91C1C" }}
              className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_#000000] rounded-sm transition-all relative group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-black text-xl text-[#B91C1C] leading-none">
                  {item.index}
                </span>
                <Award className="w-3.5 h-3.5 text-black/30 group-hover:text-[#B91C1C] transition-colors" />
              </div>
              <h4 className="font-mono text-[10px] font-black text-black uppercase tracking-wider mb-1.5">
                {item.title}
              </h4>
              <p className="font-sans text-xs text-black/85 leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
