"use client";

import * as React from "react";
import { ABOUT } from "@/data/portfolio";
import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#00A8C6] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              WHO YOU'D BE WORKING WITH
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.04] tracking-tight uppercase">
            ENGINEER &amp; BUILDER, <br />
            <span className="bg-[#00B2D6] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000]">
              SHIPPING END-TO-END.
            </span>
          </h2>
        </motion.div>

        {/* Two-Column Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-sans font-black text-lg sm:text-xl text-black leading-relaxed">
              {ABOUT.statement}
            </h3>

            <div className="space-y-4 font-sans text-sm sm:text-base text-black/90 leading-relaxed font-semibold">
              <p>{ABOUT.biography[0]}</p>
              <p>{ABOUT.biography[1]}</p>
              <p>{ABOUT.biography[2]}</p>
            </div>
          </div>

          {/* Right Column: Expertise Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-black p-6 shadow-[5px_5px_0px_#000000] space-y-4">
              <div className="bg-[#00B2D6] border-b-2 border-black -m-6 mb-2 p-3.5">
                <span className="font-mono text-xs font-black uppercase text-black tracking-widest block">
                  TECHNICAL COMPETENCIES
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {ABOUT.expertise.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs font-bold text-black bg-[#EFEFEA] px-3 py-1 border border-black shadow-[1.5px_1.5px_0px_#000000]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
