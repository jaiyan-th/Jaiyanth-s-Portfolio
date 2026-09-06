"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="relative bg-[#FAF3EE] text-[#111111] border-b-[3px] border-[#111111] py-16 md:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Eyebrow, Heading, Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUpVariants}
            className="lg:col-span-7 space-y-6"
          >
            {/* Rotated sticker label above headline */}
            <div className="inline-block">
              <span className="sticker-badge bg-[#111111] text-white -rotate-2">
                THE BACKGROUND
              </span>
            </div>

            {/* Section Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] leading-[1.12] tracking-tight">
              From signal to system to{" "}
              <span className="italic text-[#D9622B] font-black">story.</span>
            </h2>

            {/* Bio Copy */}
            <div className="space-y-4 font-body text-base sm:text-[17px] text-[#222222] leading-relaxed max-w-[620px]">
              <p>
                I&apos;m a final-year Computer Science &amp; Business Systems student focused on applied AI and full-stack engineering. My work sits between research and production — RAG pipelines, conversational systems, structured APIs, and end-to-end products that hold up under real use.
              </p>
              <p>
                I&apos;ve co-authored an IEEE research paper on preventive healthcare AI, completed an AI internship building production prototypes, and shipped four projects that anchor what I&apos;ve learned. I&apos;m currently open to applied-AI and full-stack roles where rigour and care for the user matter as much as the model.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Verified Metrics Card & Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Verified Metrics Card (one thick-bordered block, hard shadow, oversized numbers, small-caps labels) */}
            <div className="neo-card p-6 sm:p-7 bg-white space-y-5">
              <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3">
                <span className="font-label-caps text-xs text-[#111111] font-bold">
                  VERIFIED METRICS
                </span>
                <span className="font-mono-code text-[11px] font-bold text-[#B91C1C]">
                  RECORD
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="border-[1.5px] border-[#111111] p-3.5 bg-[#FAF3EE]">
                  <div className="font-heading text-3xl font-black text-[#111111]">1</div>
                  <div className="font-label-caps text-[10px] text-[#444444] mt-1 font-bold">
                    IEEE PAPER PUBLISHED
                  </div>
                </div>

                <div className="border-[1.5px] border-[#111111] p-3.5 bg-[#FAF3EE]">
                  <div className="font-heading text-3xl font-black text-[#111111]">4</div>
                  <div className="font-label-caps text-[10px] text-[#444444] mt-1 font-bold">
                    PROJECTS SHIPPED
                  </div>
                </div>

                <div className="border-[1.5px] border-[#111111] p-3.5 bg-[#FAF3EE]">
                  <div className="font-heading text-3xl font-black text-[#111111]">1</div>
                  <div className="font-label-caps text-[10px] text-[#444444] mt-1 font-bold">
                    AI INTERNSHIP
                  </div>
                </div>

                <div className="border-[1.5px] border-[#111111] p-3.5 bg-[#FAF3EE]">
                  <div className="font-heading text-3xl font-black text-[#111111]">4</div>
                  <div className="font-label-caps text-[10px] text-[#444444] mt-1 font-bold">
                    CERTIFICATIONS
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Photo Block (No rotation on primary container) */}
            <div className="neo-card p-3 bg-white">
              <div className="relative w-full aspect-[16/9] overflow-hidden border-2 border-[#111111] bg-[#FAF3EE]">
                <Image
                  src="/images/jaiyanth-profile.jpg"
                  alt="Jaiyanth B — AI & Full-Stack Engineer"
                  fill
                  className="object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                  sizes="(max-width: 1024px) 100vw, 360px"
                  priority
                  unoptimized
                />
              </div>
              <div className="pt-2.5 pb-0.5 px-1 flex items-center justify-between font-label-caps text-[11px] text-[#111111]">
                <span>JAIYANTH B</span>
                <span className="sticker-badge bg-[#B91C1C] text-white text-[9px] py-0.5 px-2">
                  ENGINEER
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
