"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import type { CaseStudyItem } from "@/data/case-studies";
import { Reveal } from "@/components/ui/reveal";

interface CaseStudyViewProps {
  project: CaseStudyItem;
}

export function CaseStudyView({ project }: CaseStudyViewProps) {
  const shouldReduceMotion = useReducedMotion();
  const nextCardRef = useRef<HTMLAnchorElement>(null);
  const [nextTilt, setNextTilt] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleNextMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile || shouldReduceMotion || !nextCardRef.current) return;
    const rect = nextCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setNextTilt({ x: -y * 8, y: x * 8 });
  };

  const handleNextMouseLeave = () => {
    setNextTilt({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 perspective-1200">
      {/* Back Navigation */}
      <div className="mb-10 sm:mb-14">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666666] hover:text-[#E5341B] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#E5341B]" />
          <span>Back to all work</span>
        </Link>
      </div>

      {/* ============================================================
          HERO / TITLE SECTION
          ============================================================ */}
      <header className="mb-16 sm:mb-24 preserve-3d">
        {/* Stickers Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-bold">
            {project.category}
          </span>
          <span className="text-xs font-mono text-[#666666] font-semibold">
            {project.year}
          </span>
          <span className="text-xs font-mono text-[#666666] border-l border-[#E2DFD7] pl-3">
            {project.domain}
          </span>
        </div>

        {/* Display Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] text-[#0A0A0A] mb-8 leading-[1.05]">
          {project.title}
        </h1>

        {/* Subtitle Statement */}
        <p className="text-lg sm:text-2xl text-[#555555] font-normal leading-relaxed max-w-4xl mb-12">
          {project.subtitle}
        </p>

        {/* Meta Strip: Items Drop In with Staggered 3D Flip (disabled on mobile / reduced motion) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-md bg-white hard-shadow perspective-1200">
          {[
            { label: "Role", value: project.role },
            { label: "Duration", value: project.duration },
            {
              label: "Status",
              content: (
                <span className="text-sm sm:text-base font-semibold text-[#0A0A0A] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1FB866] animate-pulse" />
                  {project.status}
                </span>
              ),
            },
            {
              label: "Project Links",
              content: (
                <div className="flex flex-wrap items-center gap-3 pt-0.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono font-bold text-[#0A0A0A] hover:text-[#E5341B] transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#E5341B]" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono font-bold text-[#0A0A0A] hover:text-[#E5341B] transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#E5341B]" />
                    </a>
                  )}
                </div>
              ),
            },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={
                shouldReduceMotion || isMobile
                  ? { opacity: 0, y: 12 }
                  : { opacity: 0, rotateX: -60, y: -20 }
              }
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="preserve-3d"
            >
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#888888] block mb-1 font-semibold">
                {item.label}
              </span>
              {item.content || (
                <span className="text-sm sm:text-base font-semibold text-[#0A0A0A]">
                  {item.value}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </header>

      {/* ============================================================
          01 CONTEXT
          ============================================================ */}
      <section className="py-16 sm:py-24 border-t border-[#E2DFD7] perspective-1200">
        <Reveal className="flex items-baseline gap-4 mb-10 pb-6 border-b border-[#E2DFD7]">
          <span className="font-mono text-base sm:text-lg text-[#E5341B] tracking-widest uppercase font-extrabold">
            01
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
            Context
          </h2>
        </Reveal>

        <div className="space-y-12">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-4">
              {project.context.title}
            </h3>
            <p className="text-base sm:text-lg text-[#555555] font-normal leading-relaxed max-w-4xl">
              {project.context.description}
            </p>
          </div>

          {/* Context Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1200">
            {project.context.characteristics.map((c, i) => (
              <motion.div
                key={i}
                initial={
                  shouldReduceMotion || isMobile
                    ? { opacity: 0, y: 20 }
                    : { opacity: 0, scale: 0.92, rotateY: -12 }
                }
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                className="p-6 sm:p-7 rounded-md bg-white hard-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="w-2 h-2 rounded-full bg-[#E5341B] block mb-4" />
                  <h4 className="text-base font-bold text-[#0A0A0A] mb-2">
                    {c.title}
                  </h4>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Highlighted Problem Quote */}
          <motion.div
            initial={
              shouldReduceMotion || isMobile
                ? { opacity: 0, y: 24 }
                : { opacity: 0, translateZ: -80, scale: 0.96 }
            }
            whileInView={{ opacity: 1, translateZ: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 sm:p-10 rounded-md bg-[#FAF3EE] relative overflow-hidden hard-shadow"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#E5341B]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#E5341B] block mb-3 font-bold">
              Highlighted Problem
            </span>
            <p className="text-lg sm:text-2xl font-bold text-[#0A0A0A] leading-snug">
              &ldquo;{project.context.highlightedProblem}&rdquo;
            </p>
          </motion.div>

          {/* Scope Cards: Stacked Reveal */}
          <div>
            <h4 className="text-lg font-bold text-[#0A0A0A] mb-6">
              My Role & Engineering Scope
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1200">
              {project.context.roleScope.map((scope, idx) => (
                <motion.div
                  key={scope.id}
                  initial={
                    shouldReduceMotion || isMobile
                      ? { opacity: 0, y: 20 }
                      : { opacity: 0, y: 30, rotateZ: (idx - 1.5) * 2 }
                  }
                  whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                  className="p-6 rounded-md bg-white hard-shadow flex flex-col justify-between"
                >
                  <div>
                    <span className="neo-sticker bg-[#F2ECE4] text-[#E5341B] font-bold block mb-3 w-max">
                      {scope.id}
                    </span>
                    <h5 className="text-base font-bold text-[#0A0A0A] mb-2">
                      {scope.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {scope.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          02 USERS & PROBLEM
          ============================================================ */}
      <section className="py-16 sm:py-24 border-t border-[#E2DFD7] perspective-1200">
        <Reveal className="flex items-baseline gap-4 mb-10 pb-6 border-b border-[#E2DFD7]">
          <span className="font-mono text-base sm:text-lg text-[#E5341B] tracking-widest uppercase font-extrabold">
            02
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
            Users & Problem
          </h2>
        </Reveal>

        <div className="space-y-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#888888] block mb-3 font-semibold">
              The Core Engineering Question
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0A] leading-tight max-w-4xl">
              {project.problem.question}
            </h3>
          </div>

          {/* Approach Card */}
          <div className="p-8 sm:p-10 rounded-md bg-white hard-shadow">
            <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-bold block mb-3 w-max">
              Approach
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-4">
              {project.problem.approachHeading}
            </h4>
            <p className="text-base text-[#555555] leading-relaxed">
              {project.problem.approachDetail}
            </p>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1200">
            {project.problem.challenges.map((ch, idx) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                className="p-6 sm:p-7 rounded-md bg-white hard-shadow"
              >
                <span className="neo-sticker bg-[#F2ECE4] text-[#E5341B] font-bold block mb-3 w-max">
                  {ch.id}
                </span>
                <h5 className="text-base font-bold text-[#0A0A0A] mb-2">
                  {ch.title}
                </h5>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {ch.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Target Users & Key Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="p-8 rounded-md bg-white hard-shadow">
              <h4 className="text-base font-bold text-[#0A0A0A] mb-4">
                Target Users
              </h4>
              <ul className="space-y-3 text-sm text-[#555555]">
                {project.problem.users.map((u, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#E5341B] font-bold select-none">・</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-md bg-white hard-shadow">
              <h4 className="text-base font-bold text-[#0A0A0A] mb-4">
                Key Challenges Solved
              </h4>
              <ul className="space-y-3 text-sm text-[#555555]">
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
      <section className="py-16 sm:py-24 border-t border-[#E2DFD7] perspective-1200">
        <Reveal className="flex items-baseline gap-4 mb-10 pb-6 border-b border-[#E2DFD7]">
          <span className="font-mono text-base sm:text-lg text-[#E5341B] tracking-widest uppercase font-extrabold">
            03
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
            System Architecture
          </h2>
        </Reveal>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3 leading-tight max-w-4xl">
              {project.architecture.heading}
            </h3>
            <p className="text-base text-[#666666]">
              {project.architecture.subheading}
            </p>
          </div>

          {/* 4 Pipeline Phases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1200">
            {project.architecture.phases.map((ph, idx) => (
              <motion.div
                key={ph.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                className="p-6 rounded-md bg-white hard-shadow"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] font-bold block mb-2">
                  {ph.id}
                </span>
                <h5 className="text-base font-bold text-[#0A0A0A] mb-2">
                  {ph.title}
                </h5>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {ph.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sequential Steps (01 to 05): Unfolds in 3D (rotateX -90deg -> 0, disabled on mobile/reduced motion) */}
          <div className="p-8 sm:p-10 rounded-md bg-white hard-shadow divide-y divide-[#E2DFD7] perspective-1200">
            <h4 className="text-lg font-bold text-[#0A0A0A] pb-6">
              Execution Pipeline Walkthrough
            </h4>
            {project.architecture.steps.map((st, idx) => (
              <motion.div
                key={st.step}
                initial={
                  shouldReduceMotion || isMobile
                    ? { opacity: 0, y: 16 }
                    : { opacity: 0, rotateX: -90, y: 30 }
                }
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="py-6 first:pt-6 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-start origin-top preserve-3d"
              >
                <div className="md:col-span-3">
                  <span className="neo-sticker bg-[#F2ECE4] text-[#E5341B] font-bold block w-max">
                    {st.step}
                  </span>
                  <h5 className="text-base font-bold text-[#0A0A0A] mt-2">
                    {st.title}
                  </h5>
                </div>
                <div className="md:col-span-9">
                  <p className="text-sm text-[#555555] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          04 IMPLEMENTATION & SAFEGUARDS
          ============================================================ */}
      <section className="py-16 sm:py-24 border-t border-[#E2DFD7] perspective-1200">
        <Reveal className="flex items-baseline gap-4 mb-10 pb-6 border-b border-[#E2DFD7]">
          <span className="font-mono text-base sm:text-lg text-[#E5341B] tracking-widest uppercase font-extrabold">
            04
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
            Implementation & Safeguards
          </h2>
        </Reveal>

        <div className="space-y-10">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3">
              {project.implementation.heading}
            </h3>
            <p className="text-base text-[#666666]">
              {project.implementation.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1200">
            {project.implementation.pillars.map((pil, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                className="p-8 rounded-md bg-white hard-shadow flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-3">
                    {pil.title}
                  </h4>
                  <p className="text-sm text-[#555555] leading-relaxed mb-6">
                    {pil.desc}
                  </p>
                </div>
                <ul className="space-y-2 pt-4 border-t border-[#E2DFD7]">
                  {pil.points.map((pt, pIdx) => (
                    <li key={pIdx} className="text-xs font-mono text-[#0A0A0A] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5341B]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          05 IMPACT & LEARNINGS
          ============================================================ */}
      <section className="py-16 sm:py-24 border-t border-[#E2DFD7] perspective-1200">
        <Reveal className="flex items-baseline gap-4 mb-10 pb-6 border-b border-[#E2DFD7]">
          <span className="font-mono text-base sm:text-lg text-[#E5341B] tracking-widest uppercase font-extrabold">
            05
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
            Impact & Learnings
          </h2>
        </Reveal>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-8">
              {project.impact.heading}
            </h3>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 perspective-1200">
              {project.impact.metrics.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={
                    shouldReduceMotion || isMobile
                      ? { opacity: 0, y: 16 }
                      : { opacity: 0, rotateX: -30, y: 20 }
                  }
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                  className="p-8 rounded-md bg-white hard-shadow text-center"
                >
                  <p className="text-3xl sm:text-5xl font-extrabold text-[#0A0A0A] mb-2 tracking-tight">
                    {m.value}
                  </p>
                  <p className="text-xs font-mono text-[#666666] uppercase tracking-wider font-semibold">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Outcomes & Architectural Learnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-md bg-white hard-shadow">
              <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">
                Key Production Outcomes
              </h4>
              <ul className="space-y-3.5 text-sm text-[#555555]">
                {project.impact.outcomes.map((o, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-md bg-white hard-shadow">
              <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">
                Architectural Learnings
              </h4>
              <div className="space-y-4">
                {project.impact.learnings.map((lrn, idx) => (
                  <div key={idx}>
                    <h5 className="text-sm font-bold text-[#0A0A0A] mb-1">
                      {lrn.title}
                    </h5>
                    <p className="text-xs text-[#555555] leading-relaxed">
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
          NEXT PROJECT CALLOUT CARD: 3D Tilt toward Cursor + Pulsing Arrow
          ============================================================ */}
      <section className="py-16 sm:py-24 border-t border-[#E2DFD7] perspective-1200">
        <Link
          ref={nextCardRef}
          href={`/work/${project.nextProject.slug}`}
          onMouseMove={handleNextMouseMove}
          onMouseLeave={handleNextMouseLeave}
          style={{
            transform:
              isMobile || shouldReduceMotion
                ? "none"
                : `rotateX(${nextTilt.x}deg) rotateY(${nextTilt.y}deg)`,
          }}
          className="group block p-8 sm:p-14 rounded-md bg-white hard-shadow transition-transform duration-100 ease-out will-change-transform"
        >
          <span className="neo-sticker bg-[#F2ECE4] text-[#666666] font-bold block mb-3 w-max">
            Next Project
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0A0A0A] group-hover:text-[#E5341B] transition-colors leading-tight mb-2">
                {project.nextProject.title}
              </h3>
              <span className="text-xs font-mono text-[#666666]">
                {project.nextProject.category}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FAF3EE] flex items-center justify-center shrink-0 group-hover:bg-[#0A0A0A] group-hover:text-white transition-all duration-200">
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 animate-pulse" />
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
