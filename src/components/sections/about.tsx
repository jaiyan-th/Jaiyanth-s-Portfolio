"use client";

import * as React from "react";
import { motion } from "motion/react";
import { User, Cpu, ShieldCheck, Terminal } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import { SectionContainer } from "@/components/layout/section-container";

export function About() {
  return (
    <section id="about" className="relative bg-canvas text-foreground border-b-[3px] border-line min-h-[calc(100vh-5rem)] flex flex-col justify-center py-20 md:py-28 scroll-mt-20 transition-colors">
      <SectionContainer>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Eyebrow, Plain Black Headline, Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUpVariants}
            className="lg:col-span-7 space-y-6"
          >
            {/* Sticker Badge + Beside Subtitle */}
            <div className="flex items-center gap-2.5">
              <span className="sticker-badge bg-[#A3E635] text-[#0A0A0A] -rotate-1">
                <User className="w-3.5 h-3.5 text-[#0A0A0A]" />
                ABOUT
              </span>
              <span className="font-body italic text-[#A3E635] text-sm font-semibold">
                / the story so far
              </span>
            </div>

            {/* Section Headline with ONE italic accent word (story) */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-extrabold text-foreground leading-[1.08] tracking-tight">
              From signal to system to{" "}
              <span className="italic text-[#A3E635]">story.</span>
            </h2>

            {/* Bio Copy */}
            <div className="space-y-4 font-body text-base sm:text-lg lg:text-[1.15rem] text-text-secondary leading-relaxed max-w-2xl xl:max-w-3xl">
              <p>
                I&apos;m a final-year Computer Science &amp; Business Systems student focused on applied AI and full-stack engineering. My work sits between research and production — RAG pipelines, conversational systems, structured APIs, and end-to-end products that hold up under real use.
              </p>
              <p>
                I&apos;ve co-authored an IEEE research paper on preventive healthcare AI, completed an AI internship building production prototypes, and shipped four projects that anchor what I&apos;ve learned. I&apos;m currently open to applied-AI and full-stack roles where rigour and care for the user matter as much as the model.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Engineering Principles & Focus (replaces photo) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[440px] neo-card p-6 sm:p-7 space-y-5">
              {/* Card top tag */}
              <div className="flex items-center justify-between border-b-2 border-line pb-3.5">
                <span className="font-label-caps text-xs sm:text-[13px] tracking-wider text-text-secondary">
                  HOW I BUILD
                </span>
                <span className="sticker-badge bg-[#A3E635] text-[#0A0A0A] text-[11px] py-0.5 px-2.5 rotate-1">
                  PRINCIPLES
                </span>
              </div>

              {/* Principles list */}
              <div className="divide-y-[1.5px] divide-line">
                <div className="pt-3 pb-3.5">
                  <div className="flex items-center gap-2 font-label-caps text-xs text-foreground font-bold mb-1">
                    <Cpu className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>PRODUCTION-FIRST AI</span>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Grounded RAG pipelines, verifiable context retrieval, and defensive prompting built to handle ambiguous input and real user load.
                  </p>
                </div>

                <div className="pt-3 pb-3.5">
                  <div className="flex items-center gap-2 font-label-caps text-xs text-foreground font-bold mb-1">
                    <Terminal className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>END-TO-END ARCHITECTURE</span>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Bridging backend data pipelines, relational schemas, high-throughput APIs, and responsive, accessible interfaces.
                  </p>
                </div>

                <div className="pt-3 pb-3.5">
                  <div className="flex items-center gap-2 font-label-caps text-xs text-foreground font-bold mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>SECURITY &amp; RIGOUR</span>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Zero-trust data isolation, authenticated encryption, and deterministic logic where mission-critical accuracy matters.
                  </p>
                </div>

                <div className="pt-3.5">
                  <div className="flex items-center justify-between text-xs font-mono-code font-bold text-foreground">
                    <span>STATUS: 2026 GRADUATE</span>
                    <span className="text-[#A3E635]">OPEN TO ROLES</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}
