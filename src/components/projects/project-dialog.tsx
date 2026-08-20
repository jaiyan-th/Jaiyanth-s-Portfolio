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

  // Prevent background scroll when dialog open
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

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.micro, ease: EASE.primary }}
            className="fixed inset-0 bg-[#0B0C0E]/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: DURATION.modal, ease: EASE.primary }}
            className="relative z-10 my-auto flex max-h-[90vh] w-full max-w-4xl flex-col border border-[#232323] bg-[#0B0C0E] p-6 sm:p-8 shadow-2xl text-[#F5F3EF] rounded-sm overflow-hidden"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-[#232323] pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase text-[#6D2932]">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-[#9A958D]">•</span>
                <span className="font-mono text-xs font-bold text-[#9A958D]">
                  PROJECT {project.number}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-8 w-8 items-center justify-center border border-[#232323] bg-[#141619] text-[#F5F3EF] hover:bg-[#6D2932] hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="mt-6 flex-1 overflow-y-auto pr-1">
              <h2 id="dialog-title" className="font-heading text-2xl font-black uppercase text-[#F5F3EF] sm:text-3xl">
                {project.title}
              </h2>
              <p className="mt-2 font-sans text-xs text-[#9A958D] font-normal sm:text-sm">
                {project.summary}
              </p>

              {/* Visual */}
              <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden border border-[#232323] bg-[#141619]">
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
                <div className="md:col-span-4 bg-[#141619] border border-[#232323] p-5">
                  <span className="font-mono text-[9px] font-bold text-[#6D2932] uppercase tracking-widest block mb-3">
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-[#232323] px-2.5 py-1 text-[9px] font-mono font-bold bg-[#0B0C0E] text-[#F5F3EF] uppercase tracking-wider"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-8 bg-[#141619] border border-[#232323] p-5">
                  <span className="font-mono text-[9px] font-bold text-[#6D2932] uppercase tracking-widest block mb-2">
                    ENGINEERING FOCUS
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#F5F3EF] leading-relaxed font-normal">
                    {project.engineeringFocus}
                  </p>
                </div>
              </div>

              {/* Body sections */}
              <div className="mt-6 grid gap-6 md:grid-cols-12">
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
              <div className="mt-6 bg-[#141619] border border-[#232323] p-6">
                <span className="font-mono text-[10px] font-bold text-[#6D2932] uppercase tracking-widest block mb-4">
                  05 / KEY FEATURES
                </span>
                <ul className="grid gap-3 md:grid-cols-2">
                  {project.caseStudy.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 border-l-2 border-[#6D2932] bg-[#0B0C0E] border border-[#232323] p-3 text-xs sm:text-sm text-[#F5F3EF] font-normal"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#6D2932]"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges & Learnings */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <CaseBlock label="Challenges" index="06">
                  {project.caseStudy.challenges}
                </CaseBlock>
                <CaseBlock label="Learnings" index="07">
                  {project.caseStudy.learnings}
                </CaseBlock>
              </div>

              {/* Repository & Live Demo actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#232323] pt-6">
                <span className="font-mono text-[10px] text-[#9A958D] font-bold uppercase tracking-wider">
                  STATUS: VERIFIED APPLICATION
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#232323] bg-[#141619] px-4 py-2 font-mono text-[10px] font-bold uppercase text-[#F5F3EF] hover:border-[#6D2932] transition-colors"
                    >
                      GitHub Repo
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#6D2932] bg-[#6D2932] px-4 py-2 font-mono text-[10px] font-bold uppercase text-white hover:bg-[#582027] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="h-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CaseBlock({ label, index, children }: { label: string; index: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-6 bg-[#141619] border border-[#232323] p-5">
      <div className="flex items-center justify-between border-b border-[#232323] pb-2 mb-3">
        <span className="font-mono text-[10px] font-bold text-[#6D2932] uppercase tracking-wider">
          {index} / {label}
        </span>
      </div>
      <p className="font-sans text-xs text-[#9A958D] leading-relaxed font-normal">
        {children}
      </p>
    </div>
  );
}
