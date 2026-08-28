import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, SITE } from "@/data/portfolio";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Sparkles, CheckCircle2, Layers, Cpu, ShieldCheck } from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study · Jaiyanth B`,
    description: project.summary,
    alternates: { canonical: `${SITE.url}/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Engineering Case Study`,
      description: project.summary,
      url: `${SITE.url}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = PROJECTS[projectIndex];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <main className="min-h-screen bg-[#EFEFEA] text-black">
      {/* ============================================================ */}
      {/* 1. IMMERSIVE HERO SECTION (Matching Reference Design)        */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] lg:min-h-[92vh] w-full bg-[#0C0B0A] text-white flex flex-col justify-between overflow-hidden border-b-2 border-black">
        {/* Background Project Image with Dark Cinematic Gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image || "/images/projects/fake-news-detector.jpg"}
            alt={project.title}
            fill
            className="object-cover opacity-25 scale-105 filter blur-[1px]"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/85 to-[#0C0B0A]/70" />
        </div>

        {/* Top Breadcrumb & Metadata Navigation Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-28 sm:pt-32">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase">
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 text-white/75 hover:text-[#C9971C] transition-colors py-1 font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK TO WORK</span>
              </Link>
              <span className="text-white/30">/</span>
              <span className="inline-flex items-center gap-1.5 text-[#C9971C]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9971C] inline-block animate-pulse" />
                {project.category} — 2025
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-white/50 uppercase">
              <span>{project.number} / {String(PROJECTS.length).padStart(2, "0")} PROJECTS</span>
              <Link
                href="/#work"
                className="hidden sm:inline-block px-3 py-1 rounded-full border border-white/20 hover:border-[#C9971C] hover:text-[#C9971C] transition-colors text-[11px]"
              >
                ALL WORK →
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Title & Executive Lead */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 py-10 lg:py-14 my-auto">
          <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] text-white leading-[0.92] tracking-tight uppercase max-w-4xl">
            {project.title}
          </h1>

          <p className="mt-6 font-editorial-italic text-xl sm:text-2xl md:text-3xl text-white/90 max-w-3xl leading-relaxed tracking-tight font-normal">
            {project.summary}
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#C9971C] text-black font-display text-sm tracking-wider uppercase border-2 border-black shadow-[4px_4px_0px_#000000] hover:bg-white hover:text-black transition-colors"
              >
                <span>VIEW PROJECT</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-black text-white font-display text-sm tracking-wider uppercase border-2 border-white/40 shadow-[4px_4px_0px_#C9971C] hover:border-[#C9971C] hover:text-[#C9971C] transition-colors"
              >
                <span>SOURCE CODE</span>
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Metadata Spec Bar (Client / Year / Focus / Role) */}
        <div className="relative z-10 border-t border-white/15 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                PROJECT TYPE
              </span>
              <p className="font-mono text-xs sm:text-sm font-bold text-white uppercase">
                Production / Open Source
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                TIMELINE & YEAR
              </span>
              <p className="font-mono text-xs sm:text-sm font-bold text-[#C9971C] uppercase">
                2025 · 6 WEEKS
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                ROLE & OWNERSHIP
              </span>
              <p className="font-mono text-xs sm:text-sm font-bold text-white uppercase">
                End-to-End Architecture
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                STATUS
              </span>
              <p className="font-mono text-xs sm:text-sm font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Live on Render
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. CASE STUDY BODY CONTENT                                   */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-24">
        {/* Full Image Showcase Frame */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-white border-2 border-black shadow-[8px_8px_0px_#000000] mb-20">
          <Image
            src={project.image || "/images/projects/fake-news-detector.jpg"}
            alt={`${project.title} Interface Preview`}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white border border-black font-mono text-[10px] uppercase tracking-widest px-3 py-1">
            System Interface Preview
          </div>
        </div>

        {/* Narrative Grid: Overview & Problem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-b-2 border-black pb-16">
          <div className="lg:col-span-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9971C] block mb-2">
              01 / CONTEXT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-black uppercase tracking-tight">
              OVERVIEW &<br />MOTIVATION
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="font-mono text-sm sm:text-base text-black/85 leading-relaxed">
              {project.caseStudy.overview}
            </p>
            <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/50 block mb-2">
                CORE PROBLEM STATEMENT
              </span>
              <p className="font-mono text-xs sm:text-sm text-black leading-relaxed font-bold">
                {project.caseStudy.problem}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Approach & Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start py-16 border-b-2 border-black">
          <div className="lg:col-span-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9971C] block mb-2">
              02 / ENGINEERING
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-black uppercase tracking-tight">
              ARCHITECTURE &<br />DATA PIPELINE
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="font-mono text-sm sm:text-base text-black/85 leading-relaxed">
              {project.caseStudy.approach}
            </p>
            <div className="bg-[#0C0B0A] text-white border-2 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#C9971C]">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9971C] mb-3">
                <Cpu className="w-4 h-4" />
                <span>End-to-End Pipeline Execution</span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-white/90 leading-relaxed font-bold">
                {project.caseStudy.architecture}
              </p>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="py-16 border-b-2 border-black">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9971C] block mb-1">
                03 / CAPABILITIES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-black uppercase tracking-tight">
                KEY FEATURES & WORKFLOWS
              </h2>
            </div>
            <span className="font-mono text-xs text-black/60 uppercase">
              {project.caseStudy.features.length} SYSTEM MODULES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.caseStudy.features.map((feature, idx) => (
              <div
                key={feature}
                className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_#000000] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#C9971C]">
                    [ 0{idx + 1} ]
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-black/40" />
                </div>
                <p className="font-mono text-sm font-bold text-black leading-snug">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges & Learnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 border-b-2 border-black">
          <div className="bg-white border-2 border-black p-8 shadow-[6px_6px_0px_#000000]">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9971C] block mb-2">
              04 / TRADE-OFFS & HURDLES
            </span>
            <h3 className="font-display text-2xl text-black uppercase tracking-tight mb-4">
              TECHNICAL CHALLENGES
            </h3>
            <p className="font-mono text-xs sm:text-sm text-black/80 leading-relaxed">
              {project.caseStudy.challenges}
            </p>
          </div>

          <div className="bg-[#0C0B0A] text-white border-2 border-black p-8 shadow-[6px_6px_0px_#C9971C]">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9971C] block mb-2">
              05 / TAKEAWAYS
            </span>
            <h3 className="font-display text-2xl text-white uppercase tracking-tight mb-4">
              ENGINEERING LEARNINGS
            </h3>
            <p className="font-mono text-xs sm:text-sm text-white/80 leading-relaxed">
              {project.caseStudy.learnings}
            </p>
          </div>
        </div>

        {/* Technology Stack Pill Collection */}
        <div className="py-16 border-b-2 border-black">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9971C] block mb-2">
            06 / TECH STACK
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-black uppercase tracking-tight mb-6">
            TECHNOLOGIES & FRAMEWORKS
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs font-bold text-black bg-white px-4 py-2 border-2 border-black shadow-[2px_2px_0px_#000000]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Next Project Footer Bar */}
        <div className="pt-16 flex flex-col sm:flex-row items-center justify-between gap-8">
          <Link
            href="/#work"
            className="font-display text-sm uppercase tracking-wider text-black hover:text-[#C9971C] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL PROJECTS</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-flex items-center gap-4 bg-white border-2 border-black p-4 sm:p-6 shadow-[6px_6px_0px_#000000] hover:bg-[#0C0B0A] hover:text-white transition-colors"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9971C] block">
                NEXT CASE STUDY →
              </span>
              <span className="font-display text-xl sm:text-2xl uppercase tracking-tight block mt-1">
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="w-6 h-6 text-[#C9971C] group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </div>
      </section>
    </main>
  );
}
