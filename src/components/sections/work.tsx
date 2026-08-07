"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectDialog } from "@/components/projects/project-dialog";

export function Work() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

  return (
    <section id="work" className="relative bg-[#FAF3EE] border-b border-black/10 px-4 py-12 md:px-8 md:py-20 text-black bg-grid">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-[10px] font-bold text-[#D9622B] tracking-widest uppercase block mb-1">
            03 —— SELECTED WORK
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-black leading-[1.08] tracking-tight uppercase">
            THREE PROJECTS, <br />
            <span className="text-[#B91C1C]">THREE SYSTEMS.</span>
          </h2>
          <div className="mt-4 border-l border-[#B91C1C] pl-4">
            <p className="font-sans text-xs sm:text-sm text-black/60 font-semibold">
              Each project represents a fully realized, debugged, and integrated software artifact.
            </p>
          </div>
        </div>

        {/* Project Rows */}
        <div className="space-y-24">
          {/* Project 1: Fake News Detector */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Image Left */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full blueprint-box overflow-hidden bg-black/5">
                {/* Viewfinder corners */}
                <span className="blueprint-corner blueprint-corner-tl" />
                <span className="blueprint-corner blueprint-corner-tr" />
                <span className="blueprint-corner blueprint-corner-bl" />
                <span className="blueprint-corner blueprint-corner-br" />

                <Image
                  src="/images/projects/fake-news-detector.jpg"
                  alt="Fake News Detector project screenshot"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details Right */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest">
                  PROJECT 01 / SELECTED WORK
                </span>
                <div className="h-[1px] flex-1 bg-black/10" />
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-black tracking-tight uppercase leading-[1.08]">
                FAKE NEWS DETECTOR
              </h3>

              <p className="font-sans text-xs sm:text-sm text-black/75 leading-relaxed">
                A RAG-powered fact-checking pipeline that cross-references incoming articles against a curated evidence base and surfaces a retrieval-grounded trust verdict.
              </p>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/55 mb-1">
                  ENGINEERING SPEC
                </span>
                <p className="font-mono text-[10px] text-black">
                  Retrieval-augmented generation pipeline • semantic-search evidence layer
                </p>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/55 mb-1.5">
                  STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["PYTHON", "FLASK", "SUPABASE", "VECTOR DB", "LLM"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-black/15 bg-white text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSlug("fake-news-detector")}
                  className="border border-black font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-black/5 transition-all inline-flex items-center gap-2 relative"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://github.com/jaiyanth-b/fake-news-detector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black/30 font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-black/5 transition-all inline-flex items-center gap-2"
                >
                  <span>REPOSITORY</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Project 2: Up-Skill */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Details Left */}
            <div className="lg:col-span-6 space-y-4 lg:order-1 order-2">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold text-[#D9622B] tracking-widest">
                  PROJECT 02 / SELECTED WORK
                </span>
                <div className="h-[1px] flex-1 bg-black/10" />
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-black tracking-tight uppercase leading-[1.08]">
                UP-SKILL
              </h3>

              <p className="font-sans text-xs sm:text-sm text-black/75 leading-relaxed">
                An AI career assistant that scores resumes ATS-style, runs mock interviews, maps skill gaps, and proposes personalized learning paths.
              </p>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/55 mb-1">
                  ENGINEERING SPEC
                </span>
                <p className="font-mono text-[10px] text-black">
                  Multi-stage LLM workflow • profile intelligence • skill-gap analysis
                </p>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/55 mb-1.5">
                  STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["FLASK", "SUPABASE", "NLP", "MISTRAL"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-black/15 bg-white text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSlug("up-skill")}
                  className="border border-black font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-black/5 transition-all inline-flex items-center gap-2 relative"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://github.com/jaiyanth-b/up-skill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black/30 font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-black/5 transition-all inline-flex items-center gap-2"
                >
                  <span>REPOSITORY</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Image Right */}
            <div className="lg:col-span-6 lg:order-2 order-1">
              <div className="relative aspect-[4/3] w-full blueprint-box overflow-hidden bg-black/5">
                {/* Viewfinder corners */}
                <span className="blueprint-corner blueprint-corner-tl" />
                <span className="blueprint-corner blueprint-corner-tr" />
                <span className="blueprint-corner blueprint-corner-bl" />
                <span className="blueprint-corner blueprint-corner-br" />

                <Image
                  src="/images/projects/up-skill.jpg"
                  alt="Up-Skill project screenshot"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Project 3: Car-Rent */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Image Left */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full blueprint-box overflow-hidden bg-black/5">
                {/* Viewfinder corners */}
                <span className="blueprint-corner blueprint-corner-tl" />
                <span className="blueprint-corner blueprint-corner-tr" />
                <span className="blueprint-corner blueprint-corner-bl" />
                <span className="blueprint-corner blueprint-corner-br" />

                <Image
                  src="/images/projects/car-rent.jpg"
                  alt="Car-Rent project screenshot"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details Right */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold text-[#B91C1C] tracking-widest">
                  PROJECT 03 / SELECTED WORK
                </span>
                <div className="h-[1px] flex-1 bg-black/10" />
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-black tracking-tight uppercase leading-[1.08]">
                CAR-RENT
              </h3>

              <p className="font-sans text-xs sm:text-sm text-black/75 leading-relaxed">
                A full-stack rental platform covering vehicle discovery, booking, reviews, payments, and secure authentication, with REST APIs and relational data modeling.
              </p>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/55 mb-1">
                  ENGINEERING SPEC
                </span>
                <p className="font-mono text-[10px] text-black">
                  Full-stack platform • secure auth • relational modeling
                </p>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-black/55 mb-1.5">
                  STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["NEXT.JS", "REACT", "TYPESCRIPT", "PRISMA", "REST API"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-black/15 bg-white text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSlug("car-rent")}
                  className="border border-black font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-black/5 transition-all inline-flex items-center gap-2 relative"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://github.com/jaiyanth-b/car-rent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black/30 font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-black/5 transition-all inline-flex items-center gap-2"
                >
                  <span>REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Dialog Modal */}
      <ProjectDialog slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
    </section>
  );
}
