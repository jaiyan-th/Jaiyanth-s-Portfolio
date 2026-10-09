"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { IDENTITY } from "@/data/content";

export function About() {
  return (
    <section
      id="about"
      aria-label="01 About Jaiyanth B"
      className="relative py-14 sm:py-18 border-t border-[#E5E3DB] bg-transparent scroll-mt-20"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 sm:mb-12 pb-6 border-b border-[#E5E3DB]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase font-semibold">
              01
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A0A0A]">
              About
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mt-2 sm:mt-0">
            Background, Story & Engineering Values
          </span>
        </motion.div>

        {/* Main Content Grid: Left Narrative + Right Photo Centered */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Narrative & Principles */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              {/* Eyebrow */}
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF3355] block mb-3 font-semibold">
                Engineering Philosophy
              </span>

              {/* Large Headline */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#0A0A0A] leading-tight mb-8">
                Building systems where applied AI meets production reliability and verifiable data provenance.
              </h3>

              {/* Story Paragraphs */}
              <div className="space-y-5 text-base sm:text-lg text-[#6F6E6A] leading-relaxed font-normal mb-10">
                <p>
                  I&apos;m an Applied AI and Full-Stack Engineer who believes the most impactful software happens when you refuse to treat models as magic black boxes. Rather than wrapping raw LLM endpoints in thin veneers, I build the vector retrieval pipelines, context grounding layers, and strict database invariants that make AI trustworthy.
                </p>
                <p>
                  My engineering journey spans end-to-end systems: from architecting sub-second RAG fact-verification engines with Qdrant and LangChain, to multi-model agentic career platforms with Groq and Mistral, to high-assurance vaults backed by AES-256-GCM authenticated encryption and Argon2id memory-hard key derivation.
                </p>
                <p>
                  I also co-authored a peer-reviewed research paper accepted at IEEE ICETSIS 2026 Bahrain, focusing on multimodal diagnostic triage by uniting clinical computer vision with explainable conversational flows.
                </p>
              </div>

              {/* Education Credential Card */}
              <div className="p-4 sm:p-5 rounded-2xl border border-[#E5E3DB] bg-white flex items-start gap-4 mb-8 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#ECEAE3] flex items-center justify-center text-[#FF3355] shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#FF3355] font-semibold">
                      Education
                    </span>
                    <span className="font-mono text-xs text-[#6F6E6A]">
                      2022 – 2026
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-[#0A0A0A] mb-1">
                    B.Tech in Computer Science & Business Systems
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6F6E6A] leading-relaxed">
                    Specializing in Applied AI systems, full-stack product engineering, and secure data architectures.
                  </p>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#E5E3DB]">
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#E5E3DB] bg-white text-[#0A0A0A] text-sm font-medium hover:border-[#FF3355] hover:text-[#FF3355] transition-colors"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#E5E3DB] bg-white text-[#0A0A0A] text-sm font-medium hover:border-[#FF3355] hover:text-[#FF3355] transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Portrait Photograph (Centered) */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center w-full"
          >
            <div className="relative group w-full max-w-[420px] overflow-hidden rounded-2xl border border-[#E5E3DB] bg-white p-3 shadow-md transition-all duration-300 hover:border-[#0A0A0A]/40 hover:shadow-lg">
              <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-[#F5F4F0]">
                <Image
                  src="/images/jaiyanth-about.jpg"
                  alt="Jaiyanth B — Applied AI & Full-Stack Engineer"
                  fill
                  priority
                  className="object-cover object-center filter grayscale transition-all duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
