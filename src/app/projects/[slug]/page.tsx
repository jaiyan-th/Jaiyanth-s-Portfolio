import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, SITE } from "@/data/portfolio";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, CheckCircle2 } from "lucide-react";

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
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0]">
      {/* 1. Header & Navigation */}
      <header className="border-b-[3px] border-white/20 px-6 py-6 bg-[#141414]">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 font-label-caps text-xs">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[#F5F5F0] hover:text-[#A3E635] transition-colors font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO WORK</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="sticker-badge bg-[#A3E635] text-[#0A0A0A] text-[10px] -rotate-1">
              {project.category}
            </span>
            <span className="font-mono-code font-bold text-xs text-[#9CA3AF]">
              0{project.number} / 0{PROJECTS.length}
            </span>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="px-6 py-12 md:py-20 border-b-[3px] border-white/20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="font-label-caps text-xs text-[#9CA3AF] font-bold block">
              ENGINEERING CASE STUDY
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#F5F5F0] font-extrabold leading-tight tracking-tight">
              {project.title}
            </h1>
          </div>

          <p className="font-body text-lg sm:text-xl text-[#E5E5E0] leading-relaxed max-w-[760px]">
            {project.summary}
          </p>

          {/* Metadata Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t-2 border-white/20">
            <div className="border-[1.5px] border-white/20 p-3.5 bg-[#141414] shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
              <span className="font-label-caps text-[10px] text-[#9CA3AF] block mb-1">FOCUS</span>
              <span className="font-body text-xs sm:text-sm text-[#F5F5F0] font-bold">{project.engineeringFocus}</span>
            </div>
            <div className="border-[1.5px] border-white/20 p-3.5 bg-[#141414] shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
              <span className="font-label-caps text-[10px] text-[#9CA3AF] block mb-1">CATEGORY</span>
              <span className="font-body text-xs sm:text-sm text-[#F5F5F0] font-bold">{project.category}</span>
            </div>
            <div className="border-[1.5px] border-white/20 p-3.5 bg-[#141414] shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
              <span className="font-label-caps text-[10px] text-[#9CA3AF] block mb-1">STATUS</span>
              <span className="font-body text-xs sm:text-sm text-[#F5F5F0] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A3E635]" />
                Production Live
              </span>
            </div>
            <div className="border-[1.5px] border-white/20 p-3.5 bg-[#141414] shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
              <span className="font-label-caps text-[10px] text-[#9CA3AF] block mb-1">YEAR</span>
              <span className="font-mono-code text-xs sm:text-sm text-[#F5F5F0] font-bold">2025–2026</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-primary px-6 py-3 text-xs inline-flex items-center gap-2 cursor-pointer font-bold"
              >
                <span>VIEW LIVE SITE</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-secondary px-6 py-3 text-xs inline-flex items-center gap-2 cursor-pointer font-bold"
              >
                <span>SOURCE REPO</span>
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 3. Main Showcase Image */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <div className="relative aspect-[16/9] w-full overflow-hidden neo-card bg-[#141414] p-2">
          <div className="relative w-full h-full border-2 border-white/20">
            <Image
              src={project.image || "/images/projects/fake-news-detector.jpg"}
              alt={`${project.title} Interface Preview`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 960px"
            />
          </div>
        </div>
      </section>

      {/* 4. Case Study Body */}
      <section className="px-6 pb-24 max-w-5xl mx-auto space-y-12">
        {/* Context & Problem */}
        <div className="neo-card p-6 sm:p-8 bg-[#141414] space-y-5">
          <div className="flex items-center justify-between border-b-2 border-white/20 pb-3">
            <span className="font-label-caps text-xs text-[#F5F5F0] font-bold">
              01 · OVERVIEW &amp; PROBLEM
            </span>
            <span className="font-mono-code text-xs text-[#9CA3AF] font-bold">CONTEXT</span>
          </div>
          <p className="font-body text-base sm:text-lg text-[#E5E5E0] leading-relaxed">
            {project.caseStudy.overview}
          </p>
          <div className="border-[1.5px] border-white/20 bg-[#1A1A1A] p-5 space-y-1.5">
            <span className="font-label-caps text-xs text-[#F5F5F0] font-bold block">
              CORE CHALLENGE
            </span>
            <p className="font-body text-sm sm:text-base text-[#F5F5F0] leading-relaxed font-semibold">
              {project.caseStudy.problem}
            </p>
          </div>
        </div>

        {/* Architecture & Engineering */}
        <div className="neo-card p-6 sm:p-8 bg-[#141414] space-y-5">
          <div className="flex items-center justify-between border-b-2 border-white/20 pb-3">
            <span className="font-label-caps text-xs text-[#F5F5F0] font-bold">
              02 · ARCHITECTURE &amp; PIPELINE
            </span>
            <span className="font-mono-code text-xs text-[#9CA3AF] font-bold">ENGINEERING</span>
          </div>
          <p className="font-body text-base sm:text-lg text-[#E5E5E0] leading-relaxed">
            {project.caseStudy.approach}
          </p>
          <div className="border-[1.5px] border-white/20 bg-[#1A1A1A] p-5 space-y-1.5">
            <span className="font-label-caps text-xs text-[#F5F5F0] font-bold block">
              EXECUTION MODEL
            </span>
            <p className="font-body text-sm sm:text-base text-[#F5F5F0] leading-relaxed font-semibold">
              {project.caseStudy.architecture}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="neo-card p-6 sm:p-8 bg-[#141414] space-y-5">
          <div className="flex items-center justify-between border-b-2 border-white/20 pb-3">
            <span className="font-label-caps text-xs text-[#F5F5F0] font-bold">
              03 · KEY CAPABILITIES
            </span>
            <span className="font-mono-code text-xs text-[#9CA3AF] font-bold">FEATURES</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.caseStudy.features.map((feature) => (
              <div
                key={feature}
                className="border-[1.5px] border-white/20 bg-[#1A1A1A] p-4 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#A3E635] mt-0.5 shrink-0" />
                <span className="font-body text-xs sm:text-sm text-[#F5F5F0] font-semibold">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges & Learnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="neo-card p-6 sm:p-8 bg-[#141414] space-y-3">
            <div className="border-b-2 border-white/20 pb-2">
              <span className="font-label-caps text-xs text-[#9CA3AF] font-bold">
                04 · TRADE-OFFS &amp; HURDLES
              </span>
            </div>
            <h3 className="font-heading text-xl font-bold text-[#F5F5F0]">
              Technical Challenges
            </h3>
            <p className="font-body text-sm sm:text-base text-[#E5E5E0] leading-relaxed">
              {project.caseStudy.challenges}
            </p>
          </div>

          <div className="neo-card p-6 sm:p-8 bg-[#141414] space-y-3">
            <div className="border-b-2 border-white/20 pb-2">
              <span className="font-label-caps text-xs text-[#F5F5F0] font-bold">
                05 · TAKEAWAYS
              </span>
            </div>
            <h3 className="font-heading text-xl font-bold text-[#F5F5F0]">
              Engineering Learnings
            </h3>
            <p className="font-body text-sm sm:text-base text-[#E5E5E0] leading-relaxed">
              {project.caseStudy.learnings}
            </p>
          </div>
        </div>

        {/* Next Project Footer */}
        <div className="neo-card p-6 sm:p-8 bg-[#141414] flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/#work"
            className="font-label-caps text-xs text-[#F5F5F0] hover:text-[#A3E635] hover:underline transition-all inline-flex items-center gap-2 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ALL PROJECTS</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="neo-btn-secondary px-5 py-3 text-xs inline-flex items-center gap-3 font-bold"
          >
            <div>
              <span className="text-[9px] text-[#9CA3AF] block">NEXT CASE STUDY</span>
              <span className="text-sm font-extrabold text-[#F5F5F0]">{nextProject.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#F5F5F0]" />
          </Link>
        </div>
      </section>
    </main>
  );
}
