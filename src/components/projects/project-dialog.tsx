"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";
import { ProjectVisual } from "./project-visual";

interface ProjectDialogProps {
  slug: string | null;
  onClose: () => void;
}

export function ProjectDialog({ slug, onClose }: ProjectDialogProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const project = PROJECTS.find((p) => p.slug === slug);

  // Focus trap
  React.useEffect(() => {
    if (!project) return;
    const focusable = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex="0"]'
    ) as NodeListOf<HTMLElement>;

    if (focusable && focusable.length > 0) {
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      };

      // Focus close button initially
      closeBtnRef.current?.focus();

      window.addEventListener("keydown", handleTab);
      return () => window.removeEventListener("keydown", handleTab);
    }
  }, [project]);

  // Escape to close
  React.useEffect(() => {
    if (!project) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [project, onClose]);

  // Lock scroll
  React.useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          {/* Sheet */}
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`dialog-title-${project.slug}`}
            aria-describedby={`dialog-desc-${project.slug}`}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.99 }}
            transition={{ duration: DURATION.modal, ease: EASE.primary }}
            className="relative my-[4vh] h-[92vh] w-[94vw] max-w-[1180px] overflow-y-auto border border-white/20 bg-[#0E0E10] text-white shadow-2xl"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          >
            {/* Viewfinder corners */}
            <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
            <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#FF4D4D] pointer-events-none" />
            <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
            <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#FF4D4D] pointer-events-none" />

            {/* Sticky top bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0E0E10]/95 backdrop-blur-md px-6 py-4 md:px-10">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold text-[#FF4D4D] tracking-widest uppercase">
                  {project.number} / CASE STUDY
                </span>
                <span className="font-mono text-[10px] font-bold text-white/60 tracking-wider uppercase">
                  {project.category}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                data-cursor="close"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white transition-all hover:border-[#FF4D4D] hover:bg-[#FF4D4D]"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-8 md:px-10 md:py-12">
              <h2
                id={`dialog-title-${project.slug}`}
                className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight uppercase leading-[1.08]"
              >
                {project.title}
              </h2>
              <p
                id={`dialog-desc-${project.slug}`}
                className="mt-4 max-w-3xl font-sans text-xs sm:text-sm text-white/80 leading-relaxed"
              >
                {project.summary}
              </p>

              {/* Visual */}
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden border border-white/15 bg-black/60 shadow-2xl">
                {/* Viewfinder corners */}
                <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
                <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#FF4D4D] pointer-events-none" />
                <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#FF4D4D] pointer-events-none" />
                <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#FF4D4D] pointer-events-none" />

                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                  />
                ) : (
                  <ProjectVisual variant={project.visual as "evidence-network" | "career-layers" | "route-geometry"} />
                )}
              </div>

              {/* Meta grid */}
              <div className="mt-8 grid gap-6 md:grid-cols-12">
                <div className="md:col-span-4 bg-[#141417] border border-white/10 p-5">
                  <span className="font-mono text-[9px] font-bold text-[#FF4D4D] uppercase tracking-widest block mb-3">
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-white/20 px-2.5 py-1 text-[9px] font-mono font-bold bg-[#1A1A1D] text-white uppercase tracking-wider"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-8 bg-[#141417] border border-white/10 p-5">
                  <span className="font-mono text-[9px] font-bold text-[#FF4D4D] uppercase tracking-widest block mb-2">
                    ENGINEERING FOCUS
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed">
                    {project.engineeringFocus}
                  </p>
                </div>
              </div>

              {/* Body sections */}
              <div className="mt-8 grid gap-6 md:grid-cols-12">
                <CaseBlock label="Overview" index="01">
                  {project.caseStudy.overview}
                </CaseBlock>
                <CaseBlock label="Problem" index="02">
                  {project.caseStudy.problem}
                </CaseBlock>
                <CaseBlock label="Engineering approach" index="03">
                  {project.caseStudy.approach}
                </CaseBlock>
                <CaseBlock label="Architecture" index="04">
                  {project.caseStudy.architecture}
                </CaseBlock>
              </div>

              {/* Features */}
              <div className="mt-8 bg-[#141417] border border-white/10 p-6">
                <span className="font-mono text-[10px] font-bold text-[#FF4D4D] uppercase tracking-widest block mb-4">
                  05 / KEY FEATURES
                </span>
                <ul className="grid gap-3 md:grid-cols-2">
                  {project.caseStudy.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 border-l-2 border-[#FF4D4D] bg-[#1A1A1D] p-3 text-xs sm:text-sm text-white/90 font-medium"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF4D4D]"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges & Learnings */}
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <CaseBlock label="Challenges" index="06">
                  {project.caseStudy.challenges}
                </CaseBlock>
                <CaseBlock label="Learnings" index="07">
                  {project.caseStudy.learnings}
                </CaseBlock>
              </div>

              {/* Repository & Live Demo actions */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
                <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider">
                  STATUS: VERIFIED APPLICATION
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#B91C1C] hover:bg-[#FF4D4D] text-white font-mono text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 border border-white/20 transition-all inline-flex items-center gap-2 shadow-lg active:translate-y-0.5"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/30 text-white hover:bg-white/10 font-mono text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 transition-all inline-flex items-center gap-2"
                  >
                    <span>VIEW REPOSITORY</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface CaseBlockProps {
  label: string;
  index: string;
  children: React.ReactNode;
}

function CaseBlock({ label, index, children }: CaseBlockProps) {
  return (
    <div className="md:col-span-6 bg-[#141417] border border-white/10 p-5 sm:p-6 relative">
      <span className="font-mono text-[9px] font-bold text-[#FF4D4D] uppercase tracking-widest block mb-2">
        {index} / {label}
      </span>
      <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed">
        {children}
      </p>
    </div>
  );
}
