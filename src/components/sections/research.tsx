"use client";

import * as React from "react";
import { FileText, MapPin, Calendar, Building2 } from "lucide-react";
import { RESEARCH, RESEARCH_CONTEXT } from "@/data/portfolio";
import { motion } from "motion/react";
import { Card3DTilt } from "@/components/ui/card-3d-tilt";

export function Research() {
  return (
    <section id="achievements" className="relative bg-[#ECE5DD] border-b-2 border-black px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-black overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }}>
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

        {/* Large Paper Card with 3D Tilt */}
        <Card3DTilt maxDegree={6} glowColor="rgba(185, 28, 28, 0.25)" className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white border-2 border-black p-6 sm:p-10 relative shadow-[6px_6px_0px_#B91C1C] rounded-sm transition-all"
          >
            {/* Viewfinder corners */}
            <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#B91C1C] pointer-events-none" />
            <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#B91C1C] pointer-events-none" />
            <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#B91C1C] pointer-events-none" />
            <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#B91C1C] pointer-events-none" />

            {/* Header Row */}
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-4 mb-6">
              <div className="flex items-center gap-2 text-[#B91C1C]">
                <FileText className="w-4 h-4" />
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-black">
                  IEEE ICETSIS 2026
                </span>
              </div>
              <span className="border-2 border-black bg-[#B91C1C] text-white px-2.5 py-0.5 font-mono text-[9px] uppercase font-black tracking-wider shadow-[1px_1px_0px_#000]">
                CO-AUTHORED
              </span>
            </div>

            {/* Title */}
            <h3 className="font-heading font-black text-xl sm:text-2xl text-black leading-[1.08] uppercase mb-6">
              {RESEARCH.title}
            </h3>

            {/* Abstract Box */}
            <div className="border-l-4 border-[#B91C1C] border border-black/15 pl-4 mb-8 bg-[#FAF3EE] p-4 text-xs sm:text-sm text-black/90 font-sans leading-relaxed font-medium">
              <span className="font-mono text-[9px] font-black text-[#B91C1C] block mb-1 uppercase">ABSTRACT</span>
              "{RESEARCH.abstract}"
            </div>

            {/* Meta Grid (4 columns) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t-2 border-b-2 border-black/15 py-4 mb-6 text-xs">
              <div>
                <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-black/60 mb-1">
                  VENUE
                </span>
                <span className="font-mono text-[10px] font-bold text-black">
                  {RESEARCH.venue}
                </span>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-black/60 mb-1">
                  LOCATION
                </span>
                <div className="flex items-center gap-1 font-mono text-[10px] text-black">
                  <MapPin className="w-3.5 h-3.5 text-[#B91C1C]" />
                  <span className="font-bold">{RESEARCH.location}</span>
                </div>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-black/60 mb-1">
                  DATE
                </span>
                <div className="flex items-center gap-1 font-mono text-[10px] text-black">
                  <Calendar className="w-3.5 h-3.5 text-[#B91C1C]" />
                  <span className="font-bold">{RESEARCH.date}</span>
                </div>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-black/60 mb-1">
                  ORGANISER
                </span>
                <div className="flex items-center gap-1 font-mono text-[10px] text-black">
                  <Building2 className="w-3.5 h-3.5 text-[#B91C1C]" />
                  <span className="font-bold">{RESEARCH.organiser}</span>
                </div>
              </div>
            </div>

            {/* Core Concepts */}
            <div>
              <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-black/60 mb-3">
                CORE CONCEPTS
              </span>
              <div className="flex flex-wrap gap-2">
                {RESEARCH.concepts.map((concept) => (
                  <motion.span
                    key={concept}
                    whileHover={{ y: -2 }}
                    className="font-mono text-[9px] font-black text-black px-2.5 py-1 border border-black/30 bg-[#FAF3EE] shadow-[2px_2px_0px_#B91C1C] cursor-default"
                  >
                    {concept}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </Card3DTilt>

        {/* Achievement Highlights Section */}
        <div className="border-t-2 border-black/15 pt-8">
          <div className="grid md:grid-cols-3 gap-8">
            {RESEARCH_CONTEXT.highlights.map((item) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 3 }}
                className="space-y-2 p-5 border-2 border-black bg-white shadow-[4px_4px_0px_#000000] rounded-sm transition-all"
              >
                <span className="font-heading font-black text-3xl text-[#B91C1C] block leading-[1.08]">
                  {item.index}
                </span>
                <h4 className="font-mono text-[10.5px] font-black text-black uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
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
