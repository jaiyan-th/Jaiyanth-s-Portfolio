"use client";

import * as React from "react";
import { ABOUT } from "@/data/portfolio";
import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="relative bg-[#0B0C0E] border-b border-[#232323] px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-[#F5F3EF] bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 border-b border-[#232323] pb-8"
        >
          <span className="font-mono text-xs font-bold text-[#6D2932] tracking-widest uppercase block mb-2">
            01 —— ABOUT ORIENTATION
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#F5F3EF] leading-[1.08] tracking-tight uppercase">
            From <span className="italic font-serif text-[#6D2932]">signal</span> to{" "}
            <span className="italic font-serif text-[#6D2932]">system</span> to{" "}
            <span className="italic font-serif text-[#6D2932]">story.</span>
          </h2>
          <p className="font-sans text-sm text-[#9A958D] mt-2 font-normal">
            A short orientation to who I am, what I build, and how I work.
          </p>
        </motion.div>

        {/* Two-Column Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-sans font-bold text-lg sm:text-xl text-[#F5F3EF] leading-relaxed">
              {ABOUT.statement}
            </h3>

            <div className="space-y-4 font-sans text-sm text-[#9A958D] leading-relaxed font-normal">
              <p>{ABOUT.biography[0]}</p>
              <p>{ABOUT.biography[1]}</p>
              <p>{ABOUT.biography[2]}</p>
            </div>
          </div>

          {/* Right Column: Key Expertise List */}
          <div className="lg:col-span-5 border-l border-[#232323] pl-0 lg:pl-8 space-y-6">
            <div className="border-b border-[#232323] pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5F3EF]">
                CORE TECHNICAL COMPETENCIES
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {ABOUT.expertise.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs text-[#9A958D] hover:text-[#F5F3EF] px-3 py-1.5 border border-[#232323] bg-[#141619] transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
