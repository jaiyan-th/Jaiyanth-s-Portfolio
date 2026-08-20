"use client";

import * as React from "react";
import Image from "next/image";
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
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-[40px] text-black leading-[1.08] tracking-tight uppercase">
            ENGINEER &amp; BUILDER, <br />
            <span className="bg-[#00B2D6] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000] mt-1">
              SHIPPING END-TO-END.
            </span>
          </h2>
        </motion.div>

        {/* Two-Column Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
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

          {/* Right Column: Profile Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[400px] bg-white border-2 border-black shadow-[4px_4px_0px_#000000] overflow-hidden">
              <div className="bg-[#00B2D6] border-b-2 border-black px-3 py-2">
                <span className="font-mono text-[10px] font-black uppercase text-black tracking-widest block">
                  JAIYANTH B.
                </span>
              </div>
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/jaiyanth-profile.jpg"
                  alt="Jaiyanth B. — Software Engineer"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
