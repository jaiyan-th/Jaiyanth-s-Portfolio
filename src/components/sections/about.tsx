"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IDENTITY } from "@/data/content";

export function About() {
  return (
    <section
      id="about"
      aria-label="01 About Jaiyanth B"
      className="relative py-24 sm:py-32 border-t border-[#E5E3DB] bg-[var(--canvas)] scroll-mt-20"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-16 sm:mb-20 pb-6 border-b border-[#E5E3DB]"
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

        {/* Main Content Grid: Left Narrative + Right Vertically Centered Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Narrative & Principles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
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

              {/* 3 Core Values / Pillars */}
              <div className="space-y-4 mb-10 pt-8 border-t border-[#E5E3DB]">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#0A0A0A] font-semibold mb-4">
                  How I Approach Systems
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-[#E5E3DB] shadow-2xs">
                    <span className="font-mono text-xs text-[#FF3355] font-bold block mb-1">
                      01
                    </span>
                    <h5 className="font-medium text-sm text-[#0A0A0A] mb-1.5">
                      Grounded Provenance
                    </h5>
                    <p className="text-xs text-[#6F6E6A] leading-relaxed">
                      Zero hallucination tolerance. Every verdict cross-references verified sources with cited URLs.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E5E3DB] shadow-2xs">
                    <span className="font-mono text-xs text-[#FF3355] font-bold block mb-1">
                      02
                    </span>
                    <h5 className="font-medium text-sm text-[#0A0A0A] mb-1.5">
                      Sub-Second Latency
                    </h5>
                    <p className="text-xs text-[#6F6E6A] leading-relaxed">
                      High-throughput vector search and streaming memory footprints capped under 25MB.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E5E3DB] shadow-2xs">
                    <span className="font-mono text-xs text-[#FF3355] font-bold block mb-1">
                      03
                    </span>
                    <h5 className="font-medium text-sm text-[#0A0A0A] mb-1.5">
                      Full-Stack Invariants
                    </h5>
                    <p className="text-xs text-[#6F6E6A] leading-relaxed">
                      Atomic transactions, row-level locks, and type-safe schemas across Python, Next.js, and SQL.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs & External Links */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#E5E3DB]">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 bg-[#0A0A0A] text-white text-sm font-medium rounded-full hover:bg-[#FF3355] transition-colors group shadow-xs"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href={IDENTITY.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-[#E5E3DB] bg-white text-[#0A0A0A] text-sm font-medium hover:border-[#FF3355] hover:text-[#FF3355] transition-colors"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={IDENTITY.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-[#E5E3DB] bg-white text-[#0A0A0A] text-sm font-medium hover:border-[#FF3355] hover:text-[#FF3355] transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Portrait Photograph (Vertically Centered From Top and Bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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

                {/* Live Status Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FB46A] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FB46A]" />
                    </span>
                    <span className="font-medium text-[11px] text-[#EDEBE6]">
                      Open to full-time roles
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-gray-300">
                    2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
