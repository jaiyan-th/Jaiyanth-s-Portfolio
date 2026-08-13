"use client";

import * as React from "react";
import { FileText, MapPin, Calendar, Building2 } from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";
import { motion } from "motion/react";
import { Card3DTilt } from "@/components/ui/card-3d-tilt";

export function Research() {
  return (
    <section id="achievements" className="relative bg-[#0E0E10] border-b-2 border-white/10 px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-white overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <span className="font-mono text-[10px] font-bold text-[#FF4D4D] tracking-widest uppercase block mb-1">
            05 —— ACHIEVEMENTS
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white leading-[1.08] tracking-tight uppercase">
            IEEE research & key <span className="text-[#FF4D4D]">achievements.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-white/70 mt-2 font-semibold">
            Co-authored IEEE research accepted at ICETSIS 2026 along with key engineering accomplishments.
          </p>
        </motion.div>

        {/* Large Paper Card with 3D Tilt */}
        <Card3DTilt maxDegree={6} glowColor="rgba(255, 77, 77, 0.3)" className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#161619] border-2 border-white/20 p-6 sm:p-10 relative shadow-[6px_6px_0px_#FF4D4D] rounded-sm transition-all"
          >
            {/* Viewfinder corners */}
            <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
            <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#FF4D4D] pointer-events-none" />
            <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
            <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#FF4D4D] pointer-events-none" />

            {/* Header Row */}
            <div className="flex items-center justify-between border-b-2 border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2 text-[#FF4D4D]">
                <FileText className="w-4 h-4" />
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-white">
                  IEEE ICETSIS 2026
                </span>
              </div>
              <span className="border-2 border-white/40 bg-[#FF4D4D] text-white px-2.5 py-0.5 font-mono text-[9px] uppercase font-black tracking-wider shadow-[1px_1px_0px_#000]">
                CO-AUTHORED
              </span>
            </div>

            {/* Title */}
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white leading-[1.08] uppercase mb-6">
            {RESEARCH.title}
          </h3>

          {/* Abstract Box */}
          <div className="border-l-4 border-[#FF4D4D] pl-4 mb-8 bg-[#0E0E10] p-4 text-xs sm:text-sm text-white/90 font-sans leading-relaxed font-medium">
            <span className="font-mono text-[9px] font-black text-white/50 block mb-1 uppercase">ABSTRACT</span>
            "{RESEARCH.abstract}"
          </div>

          {/* Meta Grid (4 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t-2 border-b-2 border-white/15 py-4 mb-6 text-xs">
            <div>
              <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">
                VENUE
              </span>
              <span className="font-mono text-[10px] font-bold text-white">
                {RESEARCH.venue}
              </span>
            </div>

            <div>
              <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">
                LOCATION
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] text-white">
                <MapPin className="w-3.5 h-3.5 text-[#FF4D4D]" />
                <span className="font-bold">{RESEARCH.location}</span>
              </div>
            </div>

            <div>
              <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">
                DATE
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] text-white">
                <Calendar className="w-3.5 h-3.5 text-[#FF4D4D]" />
                <span className="font-bold">{RESEARCH.date}</span>
              </div>
            </div>

            <div>
              <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">
                ORGANISER
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] text-white">
                <Building2 className="w-3.5 h-3.5 text-[#FF4D4D]" />
                <span className="font-bold">{RESEARCH.organiser}</span>
              </div>
            </div>
          </div>

          {/* Core Concepts */}
          <div>
            <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-white/50 mb-3">
              CORE CONCEPTS
            </span>
            <div className="flex flex-wrap gap-2">
              {RESEARCH.concepts.map((concept) => (
                <motion.span
                  key={concept}
                  whileHover={{ y: -2 }}
                  className="font-mono text-[9px] font-black text-white px-2.5 py-1 border border-white/30 bg-[#0E0E10] shadow-[2px_2px_0px_#FF4D4D] cursor-default"
                >
                  {concept}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </Card3DTilt>

        {/* Achievement Highlights Section */}
        <div className="border-t-2 border-white/10 pt-8">
          <div className="grid md:grid-cols-3 gap-8">
            {RESEARCH_CONTEXT.highlights.map((item) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 3 }}
                className="space-y-2 p-4 border border-white/10 bg-[#141417] rounded-sm transition-all"
              >
                <span className="font-heading font-black text-3xl text-[#FF4D4D] block leading-[1.08]">
                  {item.index}
                </span>
                <h4 className="font-mono text-[10.5px] font-black text-white uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

