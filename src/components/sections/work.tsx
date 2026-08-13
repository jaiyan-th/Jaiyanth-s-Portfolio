"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { Card3DTilt } from "@/components/ui/card-3d-tilt";
import { motion } from "motion/react";

export function Work() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

  return (
    <section id="work" className="relative bg-[#E2D9CE] border-b-2 border-black py-12 md:py-20 text-black overflow-hidden grid-scan" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)", backgroundSize: "48px 48px" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest uppercase block mb-1">
            03 —— SELECTED WORK
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase">
            THREE PROJECTS, <br />
            <span className="text-[#B91C1C]">THREE SYSTEMS.</span>
          </h2>
          <div className="mt-4 border-l-2 border-[#B91C1C] pl-4">
            <p className="font-sans text-xs sm:text-sm text-black/75 font-semibold">
              Each project represents a fully realized, debugged, and integrated software artifact.
            </p>
          </div>
        </motion.div>

        {/* Project Rows */}
        <div className="space-y-24">
          {/* Project 1: Fake News Detector */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid lg:grid-cols-12 gap-8 items-center"
          >
            {/* Image Left */}
            <div className="lg:col-span-6">
              <Card3DTilt glowColor="rgba(185, 28, 28, 0.25)">
                <div className="relative aspect-[4/3] w-full border-2 border-black overflow-hidden bg-white shadow-[6px_6px_0px_#B91C1C] group rounded-sm">
                  {/* Top Glowing Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#B91C1C] z-20" />
                  
                  {/* Viewfinder corners */}
                  <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#B91C1C] z-30 pointer-events-none" />
                  <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#B91C1C] z-30 pointer-events-none" />
                  <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#B91C1C] z-30 pointer-events-none" />
                  <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#B91C1C] z-30 pointer-events-none" />

                  <Image
                    src="/images/projects/fake-news-detector.jpg"
                    alt="Fake News Detector project screenshot"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Card3DTilt>
            </div>

            {/* Details Right */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest">
                  PROJECT 01 / SELECTED WORK
                </span>
                <div className="h-[1px] flex-1 bg-black/15" />
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-black tracking-tight uppercase leading-[1.08]">
                FAKE NEWS DETECTOR
              </h3>

              <p className="font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                A RAG-powered fact-checking pipeline that cross-references incoming articles against a curated evidence base and surfaces a retrieval-grounded trust verdict.
              </p>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/60 mb-1">
                  ENGINEERING SPEC
                </span>
                <p className="font-mono text-[10px] text-black font-extrabold">
                  Retrieval-augmented generation pipeline • semantic-search evidence layer
                </p>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/60 mb-1.5">
                  STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {["PYTHON", "FLASK", "SUPABASE", "VECTOR DB", "LLM"].map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ y: -2 }}
                      className="font-mono text-[9px] font-black uppercase tracking-wider px-2.5 py-1 border border-black/30 bg-white text-black shadow-[2px_2px_0px_#B91C1C]"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <motion.button
                  type="button"
                  onClick={() => setSelectedSlug("fake-news-detector")}
                  whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #000000" }}
                  whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                  className="bg-[#B91C1C] hover:bg-[#A11818] border-2 border-black text-white font-mono text-[10px] font-black uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 relative shadow-[2px_2px_0px_#000000] group"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.a
                  href="https://fake-news-detecter-eyvz.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #B91C1C" }}
                  whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #B91C1C" }}
                  className="bg-white hover:bg-black/5 border-2 border-black text-black font-mono text-[10px] font-black uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 relative shadow-[2px_2px_0px_#B91C1C]"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>

                <motion.a
                  href="https://github.com/jaiyan-th/Fake-News-Detecter"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #000000" }}
                  whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                  className="bg-white hover:bg-black/5 border-2 border-black text-black font-mono text-[10px] font-black uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 shadow-[2px_2px_0px_#000000]"
                >
                  <span>REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Project 2: Up-Skill */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid lg:grid-cols-12 gap-8 items-center"
          >
            {/* Details Left */}
            <div className="lg:col-span-6 space-y-4 lg:order-1 order-2">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest">
                  PROJECT 02 / SELECTED WORK
                </span>
                <div className="h-[1px] flex-1 bg-black/15" />
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-black tracking-tight uppercase leading-[1.08]">
                UP-SKILL
              </h3>

              <p className="font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                An AI career assistant that scores resumes ATS-style, runs mock interviews, maps skill gaps, and proposes personalized learning paths.
              </p>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/60 mb-1">
                  ENGINEERING SPEC
                </span>
                <p className="font-mono text-[10px] text-black font-extrabold">
                  Multi-stage LLM workflow • profile intelligence • skill-gap analysis
                </p>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/60 mb-1.5">
                  STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {["FLASK", "SUPABASE", "NLP", "MISTRAL"].map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ y: -2 }}
                      className="font-mono text-[9px] font-black uppercase tracking-wider px-2.5 py-1 border border-black/30 bg-white text-black shadow-[2px_2px_0px_#B91C1C]"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <motion.button
                  type="button"
                  onClick={() => setSelectedSlug("up-skill")}
                  whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #000000" }}
                  whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                  className="bg-[#B91C1C] hover:bg-[#A11818] border-2 border-black text-white font-mono text-[10px] font-black uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 relative shadow-[2px_2px_0px_#000000] group"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.a
                  href="https://upskill-ai-personalized-skill-and-career.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #B91C1C" }}
                  whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #B91C1C" }}
                  className="bg-white hover:bg-black/5 border-2 border-black text-black font-mono text-[10px] font-black uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 relative shadow-[2px_2px_0px_#B91C1C]"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>

                <motion.a
                  href="https://github.com/jaiyan-th/UpSkill-AI-Personalized-Skill-and-Career-Assistant"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #000000" }}
                  whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                  className="bg-white hover:bg-black/5 border-2 border-black text-black font-mono text-[10px] font-black uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 shadow-[2px_2px_0px_#000000]"
                >
                  <span>REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </div>

            {/* Image Right */}
            <div className="lg:col-span-6 lg:order-2 order-1">
              <Card3DTilt glowColor="rgba(185, 28, 28, 0.25)">
                <div className="relative aspect-[4/3] w-full border-2 border-black overflow-hidden bg-white shadow-[6px_6px_0px_#B91C1C] group rounded-sm">
                  {/* Top Glowing Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#B91C1C] z-20" />

                  {/* Viewfinder corners */}
                  <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#B91C1C] z-30 pointer-events-none" />
                  <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#B91C1C] z-30 pointer-events-none" />
                  <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#B91C1C] z-30 pointer-events-none" />
                  <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#B91C1C] z-30 pointer-events-none" />

                  <Image
                    src="/images/projects/up-skill.jpg"
                    alt="Up-Skill project screenshot"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Card3DTilt>
            </div>
          </motion.div>

          {/* Project 3: Car-Rent */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid lg:grid-cols-12 gap-8 items-center"
          >
            {/* Image Left */}
            <div className="lg:col-span-6">
              <Card3DTilt glowColor="rgba(185, 28, 28, 0.25)">
                <div className="relative aspect-[4/3] w-full border-2 border-black overflow-hidden bg-white shadow-[6px_6px_0px_#B91C1C] group rounded-sm">
                  {/* Top Glowing Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#B91C1C] z-20" />

                  {/* Viewfinder corners */}
                  <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#B91C1C] z-30 pointer-events-none" />
                  <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#B91C1C] z-30 pointer-events-none" />
                  <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#B91C1C] z-30 pointer-events-none" />
                  <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#B91C1C] z-30 pointer-events-none" />

                  <Image
                    src="/images/projects/car-rent.jpg"
                    alt="Car-Rent project screenshot"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Card3DTilt>
            </div>

            {/* Details Right */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest">
                  PROJECT 03 / SELECTED WORK
                </span>
                <div className="h-[1px] flex-1 bg-black/15" />
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-black tracking-tight uppercase leading-[1.08]">
                CAR-RENT
              </h3>

              <p className="font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                A full-stack rental platform covering vehicle discovery, booking, reviews, payments, and secure authentication, with REST APIs and relational data modeling.
              </p>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/60 mb-1">
                  ENGINEERING SPEC
                </span>
                <p className="font-mono text-[10px] text-black font-extrabold">
                  Full-stack platform • secure auth • relational modeling
                </p>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/60 mb-1.5">
                  STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {["NEXT.JS", "REACT", "TYPESCRIPT", "PRISMA", "REST API"].map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ y: -2 }}
                      className="font-mono text-[9px] font-black uppercase tracking-wider px-2.5 py-1 border border-black/30 bg-white text-black shadow-[2px_2px_0px_#B91C1C]"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <motion.button
                  type="button"
                  onClick={() => setSelectedSlug("car-rent")}
                  whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #000000" }}
                  whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                  className="bg-[#B91C1C] hover:bg-[#A11818] border-2 border-black text-white font-mono text-[10px] font-black uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 relative shadow-[2px_2px_0px_#000000] group"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.a
                  href="https://car-rent-main.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #B91C1C" }}
                  whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #B91C1C" }}
                  className="bg-white hover:bg-black/5 border-2 border-black text-black font-mono text-[10px] font-black uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 relative shadow-[2px_2px_0px_#B91C1C]"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>

                <motion.a
                  href="https://github.com/jaiyan-th/Car-Rent-Main"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #000000" }}
                  whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                  className="bg-white hover:bg-black/5 border-2 border-black text-black font-mono text-[10px] font-black uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 shadow-[2px_2px_0px_#000000]"
                >
                  <span>REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Case Study Dialog Modal */}
      <ProjectDialog slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
    </section>
  );
}
