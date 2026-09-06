"use client";

import * as React from "react";
import Image from "next/image";
import { ABOUT } from "@/data/portfolio";
import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="relative bg-[#FCFBF9] text-[#1A1A1A] border-b border-[#E5E2DC] py-20 md:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, Heading & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <span className="font-label text-[11px] tracking-[0.14em] uppercase text-[#6B6B6B] block">
                01 / Background
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal leading-[1.15] tracking-tight">
                Engineering at the intersection of{" "}
                <span className="italic text-[#2D5F4E]">models</span> and production.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-base text-[#1A1A1A] font-medium leading-relaxed pt-1"
            >
              {ABOUT.statement}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 font-sans text-sm sm:text-base text-[#6B6B6B] leading-relaxed max-w-[640px]"
            >
              <p>{ABOUT.biography[0]}</p>
              <p>{ABOUT.biography[1]}</p>
              <p>{ABOUT.biography[2]}</p>
            </motion.div>
          </div>

          {/* Right Column: Profile Photo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-start lg:pt-6"
          >
            <div className="w-full max-w-[360px] mx-auto lg:ml-auto border border-[#E5E2DC] bg-white p-2">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F7F6F2]">
                <Image
                  src="/images/jaiyanth-profile.jpg"
                  alt="Jaiyanth B — AI & Full-Stack Engineer"
                  fill
                  className="object-cover object-top filter grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 360px"
                  priority
                  unoptimized
                />
              </div>
              <div className="pt-3 pb-1 px-1 flex items-center justify-between text-[11px] font-label text-[#6B6B6B] tracking-wider uppercase">
                <span>Jaiyanth B</span>
                <span className="text-[#2D5F4E]">Engineer</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
