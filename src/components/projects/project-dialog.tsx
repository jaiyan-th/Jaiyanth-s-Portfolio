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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: DURATION.modal, ease: EASE.primary }}
            className="relative z-10 my-auto flex max-h-[90vh] w-full max-w-4xl flex-col border border-[#E5E2DC] bg-[#FCFBF9] p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] text-[#1A1A1A] overflow-hidden"
          >
            {/* Header bar */}
            <div className="border-b border-[#E5E2DC] -m-6 sm:-m-10 mb-6 p-6 sm:px-10 flex items-center justify-between bg-[#FCFBF9]">
              <div className="flex items-center gap-3">
                <span className="font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#6B6B6B]">
                  {project.category}
                </span>
                <span className="text-[#E5E2DC]">•</span>
                <span className="font-serif italic text-xs text-[#6B6B6B]">
                  No. {project.number}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-8 w-8 items-center justify-center border border-[#E5E2DC] bg-white text-[#6B6B6B] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="mt-2 flex-1 overflow-y-auto pr-2 space-y-8">
              <div>
                <h2 id="dialog-title" className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] tracking-tight font-normal leading-snug">
                  {project.title}
                </h2>
                <p className="mt-3 font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-2xl">
                  {project.summary}
                </p>
              </div>

              {/* Visual */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#E5E2DC] bg-[#F7F5F0]">
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
              <div className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-4 bg-[#F7F5F0] border border-[#E5E2DC] p-5">
                  <span className="font-sans text-[10px] font-medium text-[#6B6B6B] uppercase tracking-[0.16em] block mb-3">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-[#E5E2DC] px-2 py-0.5 text-[10px] font-mono bg-white text-[#1A1A1A]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-8 bg-[#F7F5F0] border border-[#E5E2DC] p-5">
                  <span className="font-sans text-[10px] font-medium text-[#6B6B6B] uppercase tracking-[0.16em] block mb-2">
                    Core Focus
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                    {project.engineeringFocus}
                  </p>
                </div>
              </div>

              {/* Body sections */}
              <div className="grid gap-6 md:grid-cols-12">
                <CaseBlock label="Overview" index="01">
                  {project.caseStudy.overview}
                </CaseBlock>
                <CaseBlock label="Problem" index="02">
                  {project.caseStudy.problem}
                </CaseBlock>
                <CaseBlock label="Engineering Approach" index="03">
                  {project.caseStudy.approach}
                </CaseBlock>
                <CaseBlock label="Architecture" index="04">
                  {project.caseStudy.architecture}
                </CaseBlock>
              </div>

              {/* Features */}
              <div className="bg-[#F7F5F0] border border-[#E5E2DC] p-6">
                <span className="font-sans text-[10px] font-medium text-[#6B6B6B] uppercase tracking-[0.16em] block mb-4">
                  05 · Key Capabilities
                </span>
                <ul className="grid gap-3 md:grid-cols-2">
                  {project.caseStudy.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 bg-white border border-[#E5E2DC] p-3 text-xs text-[#1A1A1A] leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-[#2D5F4E]"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges & Learnings */}
              <div className="grid gap-6 md:grid-cols-2">
                <CaseBlock label="Engineering Challenges" index="06">
                  {project.caseStudy.challenges}
                </CaseBlock>
                <CaseBlock label="Key Insights" index="07">
                  {project.caseStudy.learnings}
                </CaseBlock>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E2DC] pt-6">
                <span className="font-sans text-[11px] text-[#6B6B6B] tracking-wider uppercase">
                  Verified Application
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#E5E2DC] bg-white px-4 py-2 font-sans text-xs text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                    >
                      Source Code
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1A1A1A] text-white px-4 py-2 font-sans text-xs hover:bg-[#2D5F4E] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Launch Site</span>
                      <ExternalLink className="h-3.5 w-3.5" />
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
    <div className="md:col-span-6 bg-[#F7F5F0] border border-[#E5E2DC] p-6">
      <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-2 mb-3">
        <span className="font-sans text-[10px] font-medium text-[#6B6B6B] uppercase tracking-[0.16em]">
          {index} · {label}
        </span>
      </div>
      <p className="font-sans text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
        {children}
      </p>
    </div>
  );
}
