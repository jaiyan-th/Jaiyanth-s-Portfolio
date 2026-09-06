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
    <main className="min-h-screen bg-[#FCFBF9] text-[#1A1A1A]">
      {/* 1. Header & Navigation */}
      <header className="border-b border-[#E5E2DC] px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-label uppercase tracking-wider text-[#6B6B6B]">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[#1A1A1A] hover:text-[#2D5F4E] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to selected work</span>
          </Link>

          <div className="flex items-center gap-4">
            <span>{project.number} / {String(PROJECTS.length).padStart(2, "0")}</span>
            <span>·</span>
            <span className="text-[#2D5F4E] font-semibold">{project.category}</span>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="px-6 py-16 md:py-24 border-b border-[#E5E2DC]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <span className="font-label text-xs uppercase tracking-[0.14em] text-[#6B6B6B] block">
              Case Study
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] font-normal leading-[1.1] tracking-tight">
              {project.title}
            </h1>
          </div>

          <p className="font-sans text-lg sm:text-xl text-[#6B6B6B] leading-relaxed max-w-[760px]">
            {project.summary}
          </p>

          {/* Metadata Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#E5E2DC] text-xs">
            <div>
              <span className="font-label uppercase tracking-wider text-[#6B6B6B] block mb-1">Focus</span>
              <span className="text-[#1A1A1A] font-medium">{project.engineeringFocus}</span>
            </div>
            <div>
              <span className="font-label uppercase tracking-wider text-[#6B6B6B] block mb-1">Category</span>
              <span className="text-[#1A1A1A] font-medium">{project.category}</span>
            </div>
            <div>
              <span className="font-label uppercase tracking-wider text-[#6B6B6B] block mb-1">Status</span>
              <span className="text-[#2D5F4E] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5F4E]" />
                Live in Production
              </span>
            </div>
            <div>
              <span className="font-label uppercase tracking-wider text-[#6B6B6B] block mb-1">Year</span>
              <span className="text-[#1A1A1A] font-medium">2025 – 2026</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-xs tracking-[0.14em] uppercase px-6 py-3 bg-[#2D5F4E] text-white hover:bg-[#234b3d] transition-colors inline-flex items-center gap-2"
              >
                <span>View Live Application</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-xs tracking-[0.14em] uppercase px-6 py-3 border border-[#E5E2DC] text-[#1A1A1A] hover:border-[#2D5F4E] hover:text-[#2D5F4E] transition-colors inline-flex items-center gap-2 bg-white"
              >
                <span>Source Repository</span>
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 3. Main Showcase Image */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-white border border-[#E5E2DC]">
          <Image
            src={project.image || "/images/projects/fake-news-detector.jpg"}
            alt={`${project.title} Interface Preview`}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* 4. Case Study Body */}
      <section className="px-6 pb-24 max-w-5xl mx-auto space-y-16">
        {/* Context & Problem */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-[#E5E2DC] pt-12">
          <div className="md:col-span-4">
            <span className="font-label text-xs uppercase tracking-wider text-[#6B6B6B] block mb-2">
              01 / Context
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
              Overview &amp; Problem
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed">
              {project.caseStudy.overview}
            </p>
            <div className="bg-white border border-[#E5E2DC] p-6 space-y-2">
              <span className="font-label text-[10px] tracking-wider uppercase text-[#2D5F4E] font-semibold block">
                Core Challenge
              </span>
              <p className="font-sans text-sm text-[#1A1A1A] leading-relaxed font-medium">
                {project.caseStudy.problem}
              </p>
            </div>
          </div>
        </div>

        {/* Architecture & Engineering */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-[#E5E2DC] pt-12">
          <div className="md:col-span-4">
            <span className="font-label text-xs uppercase tracking-wider text-[#6B6B6B] block mb-2">
              02 / Engineering
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
              Architecture &amp; Pipeline
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed">
              {project.caseStudy.approach}
            </p>
            <div className="bg-white border border-[#E5E2DC] p-6 space-y-2">
              <span className="font-label text-[10px] tracking-wider uppercase text-[#2D5F4E] font-semibold block">
                Execution Model
              </span>
              <p className="font-sans text-sm text-[#1A1A1A] leading-relaxed font-medium">
                {project.caseStudy.architecture}
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-[#E5E2DC] pt-12">
          <div className="md:col-span-4">
            <span className="font-label text-xs uppercase tracking-wider text-[#6B6B6B] block mb-2">
              03 / Features
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
              Key Capabilities
            </h2>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.caseStudy.features.map((feature, idx) => (
                <div
                  key={feature}
                  className="bg-white border border-[#E5E2DC] p-4 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2D5F4E] mt-0.5 shrink-0" />
                  <span className="font-sans text-xs sm:text-sm text-[#1A1A1A]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges & Learnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#E5E2DC] pt-12">
          <div className="bg-white border border-[#E5E2DC] p-6 sm:p-8 space-y-3">
            <span className="font-label text-xs uppercase tracking-wider text-[#6B6B6B] block">
              04 / Trade-offs &amp; Hurdles
            </span>
            <h3 className="font-serif text-xl text-[#1A1A1A] font-normal">
              Technical Challenges
            </h3>
            <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
              {project.caseStudy.challenges}
            </p>
          </div>

          <div className="bg-white border border-[#E5E2DC] p-6 sm:p-8 space-y-3">
            <span className="font-label text-xs uppercase tracking-wider text-[#2D5F4E] block">
              05 / Takeaways
            </span>
            <h3 className="font-serif text-xl text-[#1A1A1A] font-normal">
              Engineering Learnings
            </h3>
            <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
              {project.caseStudy.learnings}
            </p>
          </div>
        </div>

        {/* Stack */}
        <div className="border-t border-[#E5E2DC] pt-12">
          <span className="font-label text-xs uppercase tracking-wider text-[#6B6B6B] block mb-3">
            06 / Technology Stack
          </span>
          <p className="font-sans text-sm sm:text-base text-[#1A1A1A]">
            {project.stack.join(" · ")}
          </p>
        </div>

        {/* Next Project Footer */}
        <div className="border-t border-[#E5E2DC] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/#work"
            className="font-label text-xs uppercase tracking-wider text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All projects</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-flex items-center gap-4 bg-white border border-[#E5E2DC] hover:border-[#2D5F4E] p-4 sm:p-6 transition-colors"
          >
            <div>
              <span className="font-label text-[10px] uppercase tracking-wider text-[#6B6B6B] block">
                Next Case Study
              </span>
              <span className="font-serif text-lg sm:text-xl text-[#1A1A1A] font-normal group-hover:text-[#2D5F4E] transition-colors">
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#2D5F4E] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
