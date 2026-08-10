"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectDialog } from "@/components/projects/project-dialog";

export function Work() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

  return (
    <section id="work" className="relative bg-[#0E0E10] border-b border-white/10 px-4 py-12 md:px-8 md:py-20 text-white overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-[10px] font-bold text-[#D9622B] tracking-widest uppercase block mb-1">
            03 —— SELECTED WORK
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white leading-[1.08] tracking-tight uppercase">
            FOUR PROJECTS, <br />
            <span className="text-[#FF4D4D]">FOUR SYSTEMS.</span>
          </h2>
          <div className="mt-4 border-l-2 border-[#FF4D4D] pl-4">
            <p className="font-sans text-xs sm:text-sm text-white/70 font-semibold">
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
              <div className="relative aspect-[4/3] w-full border border-white/15 overflow-hidden bg-black/40 shadow-2xl">
                {/* Viewfinder corners */}
                <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
                <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF4D4D] pointer-events-none" />
                <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
                <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF4D4D] pointer-events-none" />

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
                <span className="font-mono text-[10px] font-bold text-[#FF4D4D] tracking-widest">
                  PROJECT 01 / SELECTED WORK
                </span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-[1.08]">
                FAKE NEWS DETECTOR
              </h3>

              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                A RAG-powered fact-checking pipeline that cross-references incoming articles against a curated evidence base and surfaces a retrieval-grounded trust verdict.
              </p>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1">
                  ENGINEERING SPEC
                </span>
                <p className="font-mono text-[10px] text-white">
                  Retrieval-augmented generation pipeline • semantic-search evidence layer
                </p>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1.5">
                  STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["PYTHON", "FLASK", "SUPABASE", "VECTOR DB", "LLM"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-white/20 bg-[#1A1A1D] text-white"
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
                  className="bg-[#B91C1C] hover:bg-[#FF4D4D] border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 transition-all inline-flex items-center gap-2 relative"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://github.com/jaiyanth-b/fake-news-detector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/30 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-white/10 transition-all inline-flex items-center gap-2"
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
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-[1.08]">
                UP-SKILL
              </h3>

              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                An AI career assistant that scores resumes ATS-style, runs mock interviews, maps skill gaps, and proposes personalized learning paths.
              </p>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1">
                  ENGINEERING SPEC
                </span>
                <p className="font-mono text-[10px] text-white">
                  Multi-stage LLM workflow • profile intelligence • skill-gap analysis
                </p>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1.5">
                  STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["FLASK", "SUPABASE", "NLP", "MISTRAL"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-white/20 bg-[#1A1A1D] text-white"
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
                  className="bg-[#B91C1C] hover:bg-[#FF4D4D] border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 transition-all inline-flex items-center gap-2 relative"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://github.com/jaiyanth-b/up-skill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/30 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-white/10 transition-all inline-flex items-center gap-2"
                >
                  <span>REPOSITORY</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Image Right */}
            <div className="lg:col-span-6 lg:order-2 order-1">
              <div className="relative aspect-[4/3] w-full border border-white/15 overflow-hidden bg-black/40 shadow-2xl">
                {/* Viewfinder corners */}
                <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#D9622B] pointer-events-none" />
                <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#D9622B] pointer-events-none" />
                <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#D9622B] pointer-events-none" />
                <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#D9622B] pointer-events-none" />

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
              <div className="relative aspect-[4/3] w-full border border-white/15 overflow-hidden bg-black/40 shadow-2xl">
                {/* Viewfinder corners */}
                <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
                <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF4D4D] pointer-events-none" />
                <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
                <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF4D4D] pointer-events-none" />

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
                <span className="font-mono text-[10px] font-bold text-[#FF4D4D] tracking-widest">
                  PROJECT 03 / SELECTED WORK
                </span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-[1.08]">
                CAR-RENT
              </h3>

              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                A full-stack rental platform covering vehicle discovery, booking, reviews, payments, and secure authentication, with REST APIs and relational data modeling.
              </p>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1">
                  ENGINEERING SPEC
                </span>
                <p className="font-mono text-[10px] text-white">
                  Full-stack platform • secure auth • relational modeling
                </p>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1.5">
                  STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["NEXT.JS", "REACT", "TYPESCRIPT", "PRISMA", "REST API"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-white/20 bg-[#1A1A1D] text-white"
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
                  className="bg-[#B91C1C] hover:bg-[#FF4D4D] border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 transition-all inline-flex items-center gap-2 relative"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://github.com/jaiyanth-b/car-rent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/30 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-white/10 transition-all inline-flex items-center gap-2"
                >
                  <span>REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Project 4: SQL Query Agent */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Details Left */}
            <div className="lg:col-span-6 space-y-4 lg:order-1 order-2">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold text-[#D9622B] tracking-widest">
                  PROJECT 04 / SELECTED WORK
                </span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-[1.08]">
                SQL QUERY AGENT
              </h3>

              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                A production-ready SQL Query Agent (QueryGen AI) that converts natural language questions into valid SQLite queries using schema-aware RAG, Qdrant Cloud vector indexing, and LLM reasoning with safe query execution.
              </p>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1">
                  ENGINEERING SPEC
                </span>
                <p className="font-mono text-[10px] text-white">
                  Schema-aware RAG • vector-indexed SQL generation • safe query execution
                </p>
              </div>

              <div>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1.5">
                  STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["PYTHON", "RAG", "QDRANT", "SQLITE", "GROQ", "VECTOR SEARCH"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-white/20 bg-[#1A1A1D] text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSlug("sql-query-agent")}
                  className="bg-[#D9622B] hover:bg-[#FF4D4D] border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 transition-all inline-flex items-center gap-2 relative"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://github.com/jaiyan-th/SQL-Query-Agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/30 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-white/10 transition-all inline-flex items-center gap-2"
                >
                  <span>REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Image Right */}
            <div className="lg:col-span-6 lg:order-2 order-1">
              <div className="relative aspect-[4/3] w-full border border-white/15 overflow-hidden bg-black/40 shadow-2xl flex items-center justify-center p-8 bg-grid">
                {/* Viewfinder corners */}
                <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#D9622B] pointer-events-none" />
                <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#D9622B] pointer-events-none" />
                <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#D9622B] pointer-events-none" />
                <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#D9622B] pointer-events-none" />

                <div className="w-full bg-[#161619] border border-white/10 p-5 font-mono text-xs text-white space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] text-[#D9622B] font-bold uppercase">SQL QUERY AGENT // QUERYGEN AI</span>
                    <span className="w-2 h-2 rounded-full bg-[#D9622B] animate-pulse" />
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <p className="text-white/60">$ query_agent --input "Show top 5 sales in Q3"</p>
                    <p className="text-[#FF4D4D] font-bold">&gt; [Qdrant] Schema retrieved: sales_data (4 tables)</p>
                    <p className="text-white font-medium">&gt; SELECT customer_id, SUM(amount) FROM sales WHERE quarter='Q3' GROUP BY customer_id ORDER BY SUM(amount) DESC LIMIT 5;</p>
                    <p className="text-emerald-400 font-bold">&gt; Query Status: 200 OK (5 rows returned)</p>
                  </div>
                </div>
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
