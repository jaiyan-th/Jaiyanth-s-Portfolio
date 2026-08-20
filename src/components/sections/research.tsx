"use client";

import * as React from "react";
import { FileText, MapPin, Calendar, Building2, Award } from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";
import { motion } from "motion/react";

export function Research() {
  return (
    <section id="achievements" className="relative bg-[#F6F3EC] border-b-2 border-[#14231C] px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-[#14231C] overflow-hidden bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <span className="font-mono text-[10px] font-bold text-[#2F5D46] tracking-widest uppercase block mb-1">
            05 —— ACHIEVEMENTS
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#14231C] leading-[1.08] tracking-tight uppercase">
            IEEE research &amp; key <span className="text-[#2F5D46]">achievements.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6B6459] mt-2 font-semibold">
            Co-authored IEEE research accepted at ICETSIS 2026 along with key engineering accomplishments.
          </p>
        </motion.div>

        {/* Featured Research Paper Card — Highlighted Distinct Visual Callout */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="bg-white border-2 border-[#14231C] shadow-[8px_8px_0px_#2F5D46] rounded-sm relative overflow-hidden">
            {/* Top Distinct Feature Strip */}
            <div className="bg-[#2F5D46] text-white px-6 py-3 border-b-2 border-[#14231C] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#B08D57]" />
                <span className="font-mono text-xs font-black uppercase tracking-wider">
                  FEATURED RESEARCH · IEEE ICETSIS 2026
                </span>
              </div>
              <span className="border border-white/40 bg-white/10 text-white px-2.5 py-0.5 font-mono text-[9px] uppercase font-black tracking-widest rounded-sm">
                CO-AUTHORED
              </span>
            </div>

            <div className="p-6 sm:p-8 relative">
              {/* Viewfinder corners */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#2F5D46] pointer-events-none" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#2F5D46] pointer-events-none" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#2F5D46] pointer-events-none" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#2F5D46] pointer-events-none" />

              {/* Title — Italic Serif */}
              <h3 className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#14231C] leading-snug mb-5">
                {RESEARCH.title}
              </h3>

              {/* Abstract Callout Box */}
              <div className="border-l-4 border-[#B08D57] pl-4 mb-6 bg-[#F6F3EC] p-4 text-xs sm:text-sm text-[#14231C]/90 font-sans leading-relaxed font-medium rounded-r-sm">
                <span className="font-mono text-[9px] font-black text-[#B08D57] block mb-1 uppercase tracking-widest">ABSTRACT</span>
                &ldquo;{RESEARCH.abstract}&rdquo;
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t-2 border-b-2 border-[#DCD5C4] py-3 mb-5 text-xs">
                <div>
                  <span className="block font-mono text-[8px] font-black uppercase tracking-widest text-[#6B6459] mb-0.5">VENUE</span>
                  <span className="font-mono text-[10px] font-bold text-[#14231C]">{RESEARCH.venue}</span>
                </div>
                <div>
                  <span className="block font-mono text-[8px] font-black uppercase tracking-widest text-[#6B6459] mb-0.5">LOCATION</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#2F5D46]" />
                    <span className="font-mono text-[10px] font-bold text-[#14231C]">{RESEARCH.location}</span>
                  </div>
                </div>
                <div>
                  <span className="block font-mono text-[8px] font-black uppercase tracking-widest text-[#6B6459] mb-0.5">DATE</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#2F5D46]" />
                    <span className="font-mono text-[10px] font-bold text-[#14231C]">{RESEARCH.date}</span>
                  </div>
                </div>
                <div>
                  <span className="block font-mono text-[8px] font-black uppercase tracking-widest text-[#6B6459] mb-0.5">ORGANISER</span>
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-[#2F5D46]" />
                    <span className="font-mono text-[10px] font-bold text-[#14231C]">{RESEARCH.organiser}</span>
                  </div>
                </div>
              </div>

              {/* Core Concepts */}
              <div>
                <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-[#6B6459] mb-2">
                  CORE CONCEPTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {RESEARCH.concepts.map((concept) => (
                    <motion.span
                      key={concept}
                      whileHover={{ y: -2, scale: 1.05, borderColor: "#B08D57" }}
                      className="font-mono text-[9px] font-black text-[#14231C] px-2.5 py-1 border-2 border-[#14231C] bg-[#F6F3EC] shadow-[2px_2px_0px_#2F5D46] cursor-default transition-colors"
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
        <div className="grid md:grid-cols-3 gap-5">
          {RESEARCH_CONTEXT.highlights.map((item, i) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: "6px 6px 0px #2F5D46" }}
              className="p-5 border-2 border-[#14231C] bg-white shadow-[4px_4px_0px_#14231C] rounded-sm transition-all relative group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-black text-xl text-[#2F5D46] leading-none">
                  {item.index}
                </span>
                <Award className="w-4 h-4 text-[#B08D57] transition-colors" />
              </div>
              <h4 className="font-mono text-[10px] font-black text-[#14231C] uppercase tracking-wider mb-1.5">
                {item.title}
              </h4>
              <p className="font-sans text-xs text-[#14231C]/85 leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
