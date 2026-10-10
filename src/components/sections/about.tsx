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
      className="relative py-14 sm:py-20 border-t-2 border-[#0A0A0A] bg-transparent scroll-mt-20"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 sm:mb-12 pb-6 border-b-2 border-[#0A0A0A]"
        >
          <div className="flex items-baseline gap-4">
            <span className="neo-stamp px-2.5 py-0.5 rounded-md bg-[#FFE600] text-xs sm:text-sm text-[#0A0A0A] tracking-wider uppercase font-extrabold">
              01
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A0A0A]">
              About
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#525252] font-semibold mt-2 sm:mt-0">
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
              <span className="inline-block px-2.5 py-1 rounded bg-[#0A0A0A] text-[#FFE600] text-xs font-mono uppercase tracking-wider mb-3 font-bold">
                Engineering Philosophy
              </span>

              {/* Large Headline */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A0A0A] leading-tight mb-8">
                Building systems where applied AI meets production reliability and verifiable data provenance.
              </h3>

              {/* Story Paragraphs */}
              <div className="space-y-5 text-base sm:text-lg text-[#404040] leading-relaxed font-normal mb-10">
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
              <div className="p-5 sm:p-6 rounded-xl border-2 border-[#0A0A0A] bg-white flex items-start gap-4 mb-8 shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#0A0A0A] transition-all">
                <div className="w-12 h-12 rounded-lg bg-[#FFE600] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] flex items-center justify-center text-[#0A0A0A] shrink-0 mt-0.5">
                  <GraduationCap className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#0A0A0A] font-extrabold bg-[#00E599]/30 px-2 py-0.5 rounded border border-[#0A0A0A]">
                      Education
                    </span>
                    <span className="font-mono text-xs font-bold text-[#525252]">
                      2022 – 2026
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A] mb-1">
                    B.Tech in Computer Science & Business Systems
                  </h4>
                  <p className="text-xs sm:text-sm text-[#525252] leading-relaxed font-medium">
                    Specializing in Applied AI systems, full-stack product engineering, and secure data architectures.
                  </p>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t-2 border-[#0A0A0A]">
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer"
                className="neo-btn px-5 py-2.5 rounded-xl bg-white text-[#0A0A0A] text-sm font-bold gap-2 hover:bg-[#FFE600]"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer"
                className="neo-btn px-5 py-2.5 rounded-xl bg-white text-[#0A0A0A] text-sm font-bold gap-2 hover:bg-[#FFE600]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Portrait Photograph */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center w-full"
          >
            <div className="relative group w-full max-w-[420px] rounded-2xl border-2 border-[#0A0A0A] bg-white p-3.5 shadow-[7px_7px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#0A0A0A] transition-all duration-200">
              <div className="relative w-full aspect-square overflow-hidden rounded-xl border-2 border-[#0A0A0A] bg-[#F6F4EE]">
                <Image
                  src="/images/jaiyanth-about.jpg"
                  alt="Jaiyanth B — Applied AI & Full-Stack Engineer"
                  fill
                  priority
                  className="object-cover object-center filter grayscale contrast-110 transition-all duration-700 group-hover:scale-[1.02]"
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
