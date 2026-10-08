import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/data/case-studies";
import { FloatingNav } from "@/components/layout/floating-nav";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Globe,
  Sparkles,
  Layers,
  ShieldCheck,
  Cpu,
} from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES[slug];
  if (!project) return { title: "Work · Jaiyanth B" };

  return {
    title: `${project.title} — Case Study · Jaiyanth B`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} — Engineering Case Study`,
      description: project.subtitle,
      type: "article",
    },
  };
}

export default async function WorkDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = CASE_STUDIES[slug];
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[#0A0A0A] transition-colors selection:bg-[#FF3355] selection:text-white">
      <SmoothScroll />
      <CustomCursor />
      <FloatingNav />

      <main className="pt-28 sm:pt-36 pb-20 overflow-x-clip">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
          {/* Breadcrumb / Back Navigation */}
          <div className="mb-10 sm:mb-14">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#6F6E6A] hover:text-[#0A0A0A] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to all work</span>
            </Link>
          </div>

          {/* ============================================================
              HERO / TITLE SECTION
              ============================================================ */}
          <header className="mb-16 sm:mb-24">
            {/* Tag / Category / Year Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white border border-[#E5E3DB] text-[#6F6E6A] shadow-2xs">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#6F6E6A]">
                {project.year}
              </span>
              <span className="text-xs font-mono text-[#6F6E6A] border-l border-[#E5E3DB] pl-3">
                {project.domain}
              </span>
            </div>

            {/* Massive Display Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#0A0A0A] mb-8 leading-[1.05]">
              {project.title}
            </h1>

            {/* Subtitle Statement */}
            <p className="text-lg sm:text-2xl text-[#6F6E6A] font-normal leading-relaxed max-w-4xl mb-12">
              {project.subtitle}
            </p>

            {/* 4-Column Meta Specification Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#6F6E6A] block mb-1">
                  Role
                </span>
                <span className="text-sm sm:text-base font-medium text-[#0A0A0A]">
                  {project.role}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#6F6E6A] block mb-1">
                  Duration
                </span>
                <span className="text-sm sm:text-base font-medium text-[#0A0A0A]">
                  {project.duration}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#6F6E6A] block mb-1">
                  Status
                </span>
                <span className="text-sm sm:text-base font-medium text-[#0A0A0A] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1FB46A]" />
                  {project.status}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#6F6E6A] block mb-1">
                  Project Links
                </span>
                <div className="flex flex-wrap items-center gap-3 pt-0.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono font-medium text-[#0A0A0A] hover:text-[#FF3355] transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono font-medium text-[#0A0A0A] hover:text-[#FF3355] transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* ============================================================
              01 CONTEXT
              ============================================================ */}
          <section className="py-16 sm:py-24 border-t border-[#E5E3DB]">
            {/* Section Number Header */}
            <div className="flex items-baseline gap-4 mb-10 pb-6 border-b border-[#E5E3DB]">
              <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase font-semibold">
                01
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A]">
                Context
              </h2>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl sm:text-2xl font-medium text-[#0A0A0A] mb-4">
                  {project.context.title}
                </h3>
                <p className="text-base sm:text-lg text-[#6F6E6A] font-normal leading-relaxed max-w-4xl">
                  {project.context.description}
                </p>
              </div>

              {/* 3 Characteristics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.context.characteristics.map((c, i) => (
                  <div
                    key={i}
                    className="p-6 sm:p-7 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="w-2 h-2 rounded-full bg-[#FF3355] block mb-4" />
                      <h4 className="text-base font-medium text-[#0A0A0A] mb-2">
                        {c.title}
                      </h4>
                      <p className="text-sm text-[#6F6E6A] font-normal leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlighted Problem Callout Box */}
              <div className="p-8 sm:p-10 rounded-2xl border border-[#E5E3DB] bg-[#F5F4F0] relative overflow-hidden">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF3355] block mb-3 font-semibold">
                  Highlighted Problem
                </span>
                <p className="text-lg sm:text-2xl font-medium text-[#0A0A0A] leading-snug">
                  "{project.context.highlightedProblem}"
                </p>
              </div>

              {/* My Role Breakdown (A 01 - A 04) */}
              <div>
                <h4 className="text-lg font-medium text-[#0A0A0A] mb-6">
                  My Role & Engineering Scope
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {project.context.roleScope.map((scope) => (
                    <div
                      key={scope.id}
                      className="p-6 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs"
                    >
                      <span className="font-mono text-xs font-semibold text-[#FF3355] block mb-3">
                        {scope.id}
                      </span>
                      <h5 className="text-base font-medium text-[#0A0A0A] mb-2">
                        {scope.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-[#6F6E6A] leading-relaxed">
                        {scope.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              02 USERS & PROBLEM
              ============================================================ */}
          <section className="py-16 sm:py-24 border-t border-[#E5E3DB]">
            <div className="flex items-baseline gap-4 mb-10 pb-6 border-b border-[#E5E3DB]">
              <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase font-semibold">
                02
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A]">
                Users & Problem
              </h2>
            </div>

            <div className="space-y-12">
              {/* The Core Question */}
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] block mb-3">
                  The Core Engineering Question
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#0A0A0A] leading-tight max-w-4xl">
                  {project.problem.question}
                </h3>
              </div>

              {/* Approach Heading & Detail */}
              <div className="p-8 sm:p-10 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF3355] block mb-3 font-semibold">
                  Approach
                </span>
                <h4 className="text-xl sm:text-2xl font-medium text-[#0A0A0A] mb-4">
                  {project.problem.approachHeading}
                </h4>
                <p className="text-base text-[#6F6E6A] leading-relaxed">
                  {project.problem.approachDetail}
                </p>
              </div>

              {/* Challenges Grid (02 A, 02 B, 02 C) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.problem.challenges.map((ch) => (
                  <div
                    key={ch.id}
                    className="p-6 sm:p-7 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs"
                  >
                    <span className="font-mono text-xs font-semibold text-[#FF3355] block mb-3">
                      {ch.id}
                    </span>
                    <h5 className="text-base font-medium text-[#0A0A0A] mb-2">
                      {ch.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#6F6E6A] leading-relaxed">
                      {ch.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Side-by-Side: Target Users & Key Challenges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="p-8 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs">
                  <h4 className="text-base font-medium text-[#0A0A0A] mb-4">
                    Target Users
                  </h4>
                  <ul className="space-y-3 text-sm text-[#6F6E6A]">
                    {project.problem.users.map((u, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#FF3355] font-bold select-none">・</span>
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs">
                  <h4 className="text-base font-medium text-[#0A0A0A] mb-4">
                    Key Challenges Solved
                  </h4>
                  <ul className="space-y-3 text-sm text-[#6F6E6A]">
                    {project.problem.keyChallenges.map((kc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{kc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              03 SYSTEM ARCHITECTURE & WORKFLOW
              ============================================================ */}
          <section className="py-16 sm:py-24 border-t border-[#E5E3DB]">
            <div className="flex items-baseline gap-4 mb-10 pb-6 border-b border-[#E5E3DB]">
              <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase font-semibold">
                03
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A]">
                System Architecture
              </h2>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0A0A0A] mb-3 leading-tight max-w-4xl">
                  {project.architecture.heading}
                </h3>
                <p className="text-base text-[#6F6E6A]">
                  {project.architecture.subheading}
                </p>
              </div>

              {/* 4 Pipeline Phases */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.architecture.phases.map((ph) => (
                  <div
                    key={ph.id}
                    className="p-6 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6E6A] block mb-2">
                      {ph.id}
                    </span>
                    <h5 className="text-base font-medium text-[#0A0A0A] mb-2">
                      {ph.title}
                    </h5>
                    <p className="text-xs text-[#6F6E6A] leading-relaxed">
                      {ph.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Sequential Steps (Step 01 - Step 05) */}
              <div className="p-8 sm:p-10 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs divide-y divide-[#E5E3DB]">
                <h4 className="text-lg font-medium text-[#0A0A0A] pb-6">
                  Execution Pipeline Walkthrough
                </h4>
                {project.architecture.steps.map((st) => (
                  <div
                    key={st.step}
                    className="py-6 first:pt-6 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
                  >
                    <div className="md:col-span-3">
                      <span className="font-mono text-xs font-semibold text-[#FF3355] block">
                        {st.step}
                      </span>
                      <h5 className="text-base font-medium text-[#0A0A0A] mt-1">
                        {st.title}
                      </h5>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-sm text-[#6F6E6A] leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================
              04 IMPLEMENTATION & SAFEGUARDS
              ============================================================ */}
          <section className="py-16 sm:py-24 border-t border-[#E5E3DB]">
            <div className="flex items-baseline gap-4 mb-10 pb-6 border-b border-[#E5E3DB]">
              <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase font-semibold">
                04
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A]">
                Implementation & Safeguards
              </h2>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0A0A0A] mb-3">
                  {project.implementation.heading}
                </h3>
                <p className="text-base text-[#6F6E6A]">
                  {project.implementation.subheading}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.implementation.pillars.map((pil, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-lg font-medium text-[#0A0A0A] mb-3">
                        {pil.title}
                      </h4>
                      <p className="text-sm text-[#6F6E6A] leading-relaxed mb-6">
                        {pil.desc}
                      </p>
                    </div>
                    <ul className="space-y-2 pt-4 border-t border-[#E5E3DB]">
                      {pil.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs font-mono text-[#0A0A0A] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3355]" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================
              05 IMPACT & LEARNINGS
              ============================================================ */}
          <section className="py-16 sm:py-24 border-t border-[#E5E3DB]">
            <div className="flex items-baseline gap-4 mb-10 pb-6 border-b border-[#E5E3DB]">
              <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase font-semibold">
                05
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A]">
                Impact & Learnings
              </h2>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0A0A0A] mb-8">
                  {project.impact.heading}
                </h3>

                {/* 3 Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                  {project.impact.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-8 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs text-center"
                    >
                      <p className="text-3xl sm:text-5xl font-medium text-[#0A0A0A] mb-2 tracking-tight">
                        {m.value}
                      </p>
                      <p className="text-xs font-mono text-[#6F6E6A] uppercase tracking-wider">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side-by-side: Outcomes & Architectural Learnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs">
                  <h4 className="text-lg font-medium text-[#0A0A0A] mb-4">
                    Key Production Outcomes
                  </h4>
                  <ul className="space-y-3.5 text-sm text-[#6F6E6A]">
                    {project.impact.outcomes.map((o, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 rounded-2xl border border-[#E5E3DB] bg-white shadow-2xs">
                  <h4 className="text-lg font-medium text-[#0A0A0A] mb-4">
                    Architectural Learnings
                  </h4>
                  <div className="space-y-4">
                    {project.impact.learnings.map((lrn, idx) => (
                      <div key={idx}>
                        <h5 className="text-sm font-medium text-[#0A0A0A] mb-1">
                          {lrn.title}
                        </h5>
                        <p className="text-xs text-[#6F6E6A] leading-relaxed">
                          {lrn.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              NEXT PROJECT CALLOUT CARD
              ============================================================ */}
          <section className="py-16 sm:py-24 border-t border-[#E5E3DB]">
            <Link
              href={`/work/${project.nextProject.slug}`}
              className="group block p-8 sm:p-14 rounded-2xl border border-[#E5E3DB] bg-white hover:border-[#0A0A0A] transition-all duration-300 shadow-2xs"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] block mb-3">
                Next Project
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl sm:text-4xl font-medium text-[#0A0A0A] group-hover:text-[#FF3355] transition-colors leading-tight mb-2">
                    {project.nextProject.title}
                  </h3>
                  <span className="text-xs font-mono text-[#6F6E6A]">
                    {project.nextProject.category}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#E5E3DB] bg-[#F5F4F0] flex items-center justify-center shrink-0 group-hover:bg-[#0A0A0A] group-hover:border-[#0A0A0A] group-hover:text-white transition-all duration-200">
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
