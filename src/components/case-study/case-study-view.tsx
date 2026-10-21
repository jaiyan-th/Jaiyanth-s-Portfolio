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
import { EyebrowPill } from "@/components/ui/eyebrow-pill";

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
    <div className="site-container perspective-1200 pt-24 sm:pt-28 pb-16">
      {/* Back Navigation */}
      <div className="mb-8 sm:mb-12">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted hover:text-accent transition-colors group min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-accent" />
          <span>Back to all work</span>
        </Link>
      </div>

      {/* ============================================================
          HERO / TITLE SECTION
          ============================================================ */}
      <header className="mb-10 sm:mb-14 preserve-3d">
        <EyebrowPill accent={project.category} text={`${project.year} · ${project.domain}`} className="mb-2.5 sm:mb-3" />

        {/* Display Title with overflow wrap */}
        <h1 className="font-sans font-bold text-fluid-hero text-[#111111] mb-3 leading-[1.05] tracking-[-0.035em] break-words">
          {project.title}
        </h1>

        {/* Subtitle Statement */}
        <p className="lead-intro font-sans text-base sm:text-lg text-[var(--body)] leading-relaxed max-w-[62ch] mb-6 sm:mb-8">
          {project.subtitle}
        </p>

        {/* Meta Strip: 4 columns >=1024px, 2 columns on tablets, 1 column on phones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow perspective-1200">
          {[
            { label: "Role", value: project.role },
            { label: "Duration", value: project.duration },
            {
              label: "Status",
              content: (
                <span className="font-sans text-sm sm:text-base font-medium text-[#111111] flex items-center gap-1.5">
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
                      className="font-mono text-[11px] uppercase tracking-[0.08em] font-medium text-[#111111] hover:text-accent transition-colors inline-flex items-center gap-1 group min-h-[44px]"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-accent" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[11px] uppercase tracking-[0.08em] font-medium text-[#111111] hover:text-accent transition-colors inline-flex items-center gap-1 group min-h-[44px]"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-accent" />
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
                  ? { opacity: 1 }
                  : { opacity: 0, rotateX: -60, y: -20 }
              }
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="preserve-3d pb-3 sm:pb-0 border-b sm:border-b-0 border-border-line last:border-b-0"
            >
              <span className="font-mono uppercase tracking-[0.08em] text-[var(--body)] block mb-1 font-medium text-[11px]">
                {item.label}
              </span>
              {item.content || (
                <span className="font-sans text-sm sm:text-base font-medium text-[#111111]">
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
      <section className="section-padding border-t border-border-line perspective-1200">
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b border-border-line gap-3">
          <div className="space-y-2.5">
            <EyebrowPill accent="01" text="CONTEXT & SCOPE" />
            <h2 className="font-sans font-bold text-fluid-h2 text-[#111111] leading-[1.05] tracking-[-0.035em]">
              Context &amp; <em className="accent font-serif-italic italic text-accent font-normal accent-underline">Scope</em>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-8 sm:space-y-10">
          <div>
            <h3 className="card-title font-sans font-bold text-2xl sm:text-3xl text-[#111111] mb-2 leading-snug">
              {project.context.title}
            </h3>
            <p className="font-sans text-base text-[var(--body)] font-normal leading-relaxed max-w-[62ch]">
              {project.context.description}
            </p>
          </div>

          {/* Context Cards: 3 cols >=1024px, 2 cols on tablets, 1 col on phones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 perspective-1200">
            {project.context.characteristics.map((c, i) => (
              <motion.div
                key={i}
                initial={
                  shouldReduceMotion || isMobile
                    ? { opacity: 1 }
                    : { opacity: 0, scale: 0.92, rotateY: -12 }
                }
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="w-2 h-2 rounded-full bg-accent block mb-2.5" />
                  <h4 className="card-title font-sans font-bold text-lg sm:text-xl text-[#111111] mb-1.5 leading-snug">
                    {c.title}
                  </h4>
                  <p className="font-sans text-sm text-[var(--body)] leading-relaxed font-normal">
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
                ? { opacity: 1 }
                : { opacity: 0, translateZ: -80, scale: 0.96 }
            }
            whileInView={{ opacity: 1, translateZ: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="p-5 sm:p-6 rounded-2xl bg-[#FAF3EE] relative overflow-hidden border border-border-line hard-shadow"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent block mb-1.5 font-medium">
              Highlighted Problem
            </span>
            <p className="lead-intro font-sans font-medium text-lg sm:text-xl text-[#111111] leading-snug">
              &ldquo;{project.context.highlightedProblem}&rdquo;
            </p>
          </motion.div>

          {/* Scope Cards: 4 cols >=1024px, 2 on tablets, 1 on phones */}
          <div>
            <h4 className="card-title font-sans font-bold text-2xl sm:text-3xl text-[#111111] mb-3 leading-snug">
              My Role &amp; Engineering Scope
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 perspective-1200">
              {project.context.roleScope.map((scope, idx) => (
                <motion.div
                  key={scope.id}
                  initial={
                    shouldReduceMotion || isMobile
                      ? { opacity: 1 }
                      : { opacity: 0, y: 24, rotateZ: (idx - 1.5) * 2 }
                  }
                  whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-medium text-accent bg-[#FFE8E5] px-2.5 py-0.5 rounded-full border border-accent/20 block mb-2.5 w-max">
                      {scope.id}
                    </span>
                    <h5 className="card-title font-sans font-bold text-base sm:text-lg text-[#111111] mb-1.5 leading-snug">
                      {scope.title}
                    </h5>
                    <p className="font-sans text-sm text-[var(--body)] leading-relaxed font-normal">
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
      <section className="section-padding border-t border-border-line perspective-1200">
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b border-border-line gap-3">
          <div className="space-y-2.5">
            <EyebrowPill accent="02" text="USERS & CHALLENGES" />
            <h2 className="font-sans font-bold text-fluid-h2 text-[#111111] leading-[1.05] tracking-[-0.035em]">
              Users &amp; <em className="accent font-serif-italic italic text-accent font-normal accent-underline">Problem</em>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-8 sm:space-y-10">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--body)] block mb-1.5 font-medium">
              The Core Engineering Question
            </span>
            <h3 className="card-title font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#111111] leading-tight max-w-[62ch]">
              {project.problem.question}
            </h3>
          </div>

          {/* Approach Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-border-line text-[var(--body)] font-mono text-[11px] uppercase tracking-[0.08em] font-medium block mb-2.5 w-max">
              Approach
            </span>
            <h4 className="card-title font-sans font-bold text-xl sm:text-2xl text-[#111111] mb-2 leading-snug">
              {project.problem.approachHeading}
            </h4>
            <p className="font-sans text-base text-[var(--body)] leading-relaxed font-normal max-w-[62ch]">
              {project.problem.approachDetail}
            </p>
          </div>

          {/* Challenges Grid: 3 cols >=1024px, 2 on tablets, 1 on phones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 perspective-1200">
            {project.problem.challenges.map((ch, idx) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-medium text-accent bg-[#FFE8E5] px-2.5 py-0.5 rounded-full border border-accent/20 block mb-2.5 w-max">
                  {ch.id}
                </span>
                <h5 className="card-title font-sans font-bold text-base sm:text-lg text-[#111111] mb-1.5 leading-snug">
                  {ch.title}
                </h5>
                <p className="font-sans text-sm text-[var(--body)] leading-relaxed font-normal">
                  {ch.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Target Users & Key Challenges: Stack on phones, 2 cols on >=768px */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow">
              <h4 className="card-title font-sans font-bold text-xl sm:text-2xl text-[#111111] mb-3 leading-snug">
                Target Users
              </h4>
              <ul className="space-y-2 font-sans text-sm text-[var(--body)]">
                {project.problem.users.map((u, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-accent font-medium select-none">・</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow">
              <h4 className="card-title font-sans font-bold text-xl sm:text-2xl text-[#111111] mb-3 leading-snug">
                Key Challenges Solved
              </h4>
              <ul className="space-y-2 font-sans text-sm text-[var(--body)]">
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
      <section className="section-padding border-t border-border-line perspective-1200">
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b border-border-line gap-3">
          <div className="space-y-2.5">
            <EyebrowPill accent="03" text="ARCHITECTURE & PIPELINE" />
            <h2 className="font-sans font-bold text-fluid-h2 text-[#111111] leading-[1.05] tracking-[-0.035em]">
              System <em className="accent font-serif-italic italic text-accent font-normal accent-underline">Architecture</em>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-8 sm:space-y-10">
          <div>
            <h3 className="card-title font-sans font-bold text-2xl sm:text-3xl text-[#111111] mb-2 leading-tight max-w-[62ch]">
              {project.architecture.heading}
            </h3>
            <p className="font-sans text-base text-[var(--body)] font-normal">
              {project.architecture.subheading}
            </p>
          </div>

          {/* 4 Pipeline Phases: 4 cols >=1024px, 2 on tablets, 1 on phones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 perspective-1200">
            {project.architecture.phases.map((ph, idx) => (
              <motion.div
                key={ph.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow"
              >
                <span className="font-mono uppercase tracking-[0.08em] text-[var(--body)] font-medium block mb-1.5 text-[11px]">
                  {ph.id}
                </span>
                <h5 className="card-title font-sans font-bold text-base sm:text-lg text-[#111111] mb-1.5 leading-snug">
                  {ph.title}
                </h5>
                <p className="font-sans text-sm text-[var(--body)] leading-relaxed font-normal">
                  {ph.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sequential Steps: 2 columns >=768px (step label | description), stacked on phones */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow divide-y divide-border-line perspective-1200">
            <h4 className="card-title font-sans font-bold text-2xl sm:text-3xl text-[#111111] pb-4 leading-snug">
              Execution Pipeline Walkthrough
            </h4>
            {project.architecture.steps.map((st, idx) => (
              <motion.div
                key={st.step}
                initial={
                  shouldReduceMotion || isMobile
                    ? { opacity: 1 }
                    : { opacity: 0, rotateX: -90, y: 24 }
                }
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="py-4 first:pt-4 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start origin-top preserve-3d"
              >
                <div className="md:col-span-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-medium text-accent bg-[#FFE8E5] px-2.5 py-0.5 rounded-full border border-accent/20 block w-max">
                    {st.step}
                  </span>
                  <h5 className="card-title font-sans font-bold text-base sm:text-lg text-[#111111] mt-1.5 leading-snug">
                    {st.title}
                  </h5>
                </div>
                <div className="md:col-span-8">
                  <p className="font-sans text-sm sm:text-base text-[var(--body)] leading-relaxed font-normal">
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
      <section className="section-padding border-t border-border-line perspective-1200">
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b border-border-line gap-3">
          <div className="space-y-2.5">
            <EyebrowPill accent="04" text="PILLARS & SAFEGUARDS" />
            <h2 className="font-sans font-bold text-fluid-h2 text-[#111111] leading-[1.05] tracking-[-0.035em]">
              Implementation &amp; <em className="accent font-serif-italic italic text-accent font-normal accent-underline">Safeguards</em>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-8 sm:space-y-10">
          <div>
            <h3 className="card-title font-sans font-bold text-2xl sm:text-3xl text-[#111111] mb-2 leading-snug">
              {project.implementation.heading}
            </h3>
            <p className="font-sans text-base text-[var(--body)] font-normal">
              {project.implementation.subheading}
            </p>
          </div>

          {/* Pillars: 3 cols >=1024px, 2 on tablets, 1 on phones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 perspective-1200">
            {project.implementation.pillars.map((pil, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -3 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow flex flex-col justify-between"
              >
                <div>
                  <h4 className="card-title font-sans font-bold text-xl sm:text-2xl text-[#111111] mb-2 leading-snug">
                    {pil.title}
                  </h4>
                  <p className="font-sans text-sm text-[var(--body)] leading-relaxed mb-4 font-normal">
                    {pil.desc}
                  </p>
                </div>
                <ul className="space-y-2 pt-3.5 border-t border-border-line">
                  {pil.points.map((pt, pIdx) => (
                    <li key={pIdx} className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#111111] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
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
      <section className="section-padding border-t border-border-line perspective-1200">
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b border-border-line gap-3">
          <div className="space-y-2.5">
            <EyebrowPill accent="05" text="RESULTS & METRICS" />
            <h2 className="font-sans font-bold text-fluid-h2 text-[#111111] leading-[1.05] tracking-[-0.035em]">
              Impact &amp; <em className="accent font-serif-italic italic text-accent font-normal accent-underline">Learnings</em>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-8 sm:space-y-10">
          <div>
            <h3 className="card-title font-sans font-bold text-2xl sm:text-3xl text-[#111111] mb-4 leading-snug">
              {project.impact.heading}
            </h3>

            {/* Metrics Cards: 3 cols >=768px, 1 col on phones */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 perspective-1200">
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
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow text-center"
                >
                  <p className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-[#111111] mb-1.5 tracking-tight">
                    {m.value}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--body)] font-medium">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Outcomes & Architectural Learnings: Stack below 1024px */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow">
              <h4 className="card-title font-sans font-bold text-2xl sm:text-3xl text-[#111111] mb-3 leading-snug">
                Key Production Outcomes
              </h4>
              <ul className="space-y-2.5 font-sans text-sm text-[var(--body)]">
                {project.impact.outcomes.map((o, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-border-line hard-shadow">
              <h4 className="card-title font-sans font-bold text-2xl sm:text-3xl text-[#111111] mb-3 leading-snug">
                Architectural Learnings
              </h4>
              <div className="space-y-3.5">
                {project.impact.learnings.map((lrn, idx) => (
                  <div key={idx}>
                    <h5 className="card-title font-sans font-bold text-base sm:text-lg text-[#111111] mb-1 leading-snug">
                      {lrn.title}
                    </h5>
                    <p className="font-sans text-sm text-[var(--body)] leading-relaxed font-normal">
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
      <section className="section-padding border-t border-border-line perspective-1200">
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
          className="group block p-5 sm:p-8 lg:p-10 rounded-2xl bg-white border border-border-line hard-shadow transition-transform duration-100 ease-out will-change-transform min-h-[48px]"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-medium text-[var(--body)] block mb-2 w-max">
            Next Project
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="card-title font-sans font-bold text-fluid-h2 text-[#111111] group-hover:text-accent transition-colors leading-tight mb-1.5 break-words">
                {project.nextProject.title}
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--body)]">
                {project.nextProject.category}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FAF3EE] border border-border-line flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:text-white transition-all duration-200">
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 animate-pulse" />
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
