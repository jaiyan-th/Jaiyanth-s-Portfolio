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
            className="fixed inset-0 bg-[#561C24]/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: DURATION.modal, ease: EASE.primary }}
            className="relative z-10 my-auto flex max-h-[90vh] w-full max-w-4xl flex-col border-2 border-[#561C24] bg-[#E8D8C4] p-6 sm:p-8 shadow-[8px_8px_0px_#561C24] rounded-sm overflow-hidden"
          >
            {/* Viewfinder corners */}
            <span className="blueprint-corner blueprint-corner-tl" />
            <span className="blueprint-corner blueprint-corner-tr" />
            <span className="blueprint-corner blueprint-corner-bl" />
            <span className="blueprint-corner blueprint-corner-br" />

            {/* Header bar */}
            <div className="flex items-center justify-between border-b-2 border-[#561C24] pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-black uppercase text-[#6D2932]">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-[#561C24]/40">•</span>
                <span className="font-mono text-xs font-bold text-[#561C24]/70">
                  PROJECT {project.number}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-8 w-8 items-center justify-center border-2 border-[#561C24] bg-white text-[#561C24] shadow-[2px_2px_0px_#561C24] hover:bg-[#6D2932] hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="mt-6 flex-1 overflow-y-auto pr-1">
              <h2 id="dialog-title" className="font-heading text-2xl font-black uppercase text-[#561C24] sm:text-3xl">
                {project.title}
              </h2>
              <p className="mt-2 font-sans text-xs text-[#561C24]/80 font-semibold sm:text-sm">
                {project.summary}
              </p>

              {/* Visual */}
              <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden border-2 border-[#561C24] bg-white shadow-[5px_5px_0px_#6D2932]">
                {/* Viewfinder corners */}
                <span className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#6D2932] pointer-events-none" />
                <span className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#6D2932] pointer-events-none" />
                <span className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#6D2932] pointer-events-none" />
                <span className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#6D2932] pointer-events-none" />

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
                <div className="md:col-span-4 bg-white border-2 border-[#561C24] p-5 shadow-[4px_4px_0px_#561C24]">
                  <span className="font-mono text-[9px] font-black text-[#6D2932] uppercase tracking-widest block mb-3">
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-[#561C24]/30 px-2.5 py-1 text-[9px] font-mono font-black bg-[#E8D8C4] text-[#561C24] uppercase tracking-wider shadow-[1px_1px_0px_#6D2932]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-8 bg-white border-2 border-[#561C24] p-5 shadow-[4px_4px_0px_#561C24]">
                  <span className="font-mono text-[9px] font-black text-[#6D2932] uppercase tracking-widest block mb-2">
                    ENGINEERING FOCUS
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#561C24]/90 leading-relaxed font-semibold">
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
              <div className="mt-6 bg-white border-2 border-[#561C24] p-6 shadow-[4px_4px_0px_#561C24]">
                <span className="font-mono text-[10px] font-black text-[#6D2932] uppercase tracking-widest block mb-4">
                  05 / KEY FEATURES
                </span>
                <ul className="grid gap-3 md:grid-cols-2">
                  {project.caseStudy.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 border-l-4 border-[#6D2932] bg-[#E8D8C4] border border-[#561C24]/10 p-3 text-xs sm:text-sm text-[#561C24]/90 font-semibold"
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
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-[#561C24]/20 pt-6">
                <span className="font-mono text-[10px] text-[#561C24]/70 font-black uppercase tracking-wider">
                  STATUS: VERIFIED APPLICATION
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-[#561C24] bg-white px-4 py-2 font-mono text-[10px] font-black uppercase text-[#561C24] shadow-[2px_2px_0px_#561C24] hover:bg-[#561C24]/5 transition-colors"
                    >
                      GitHub Repo
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-[#561C24] bg-[#6D2932] px-4 py-2 font-mono text-[10px] font-black uppercase text-white shadow-[2px_2px_0px_#561C24] hover:bg-[#582027] transition-colors inline-flex items-center gap-1.5"
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
    <div className="md:col-span-6 bg-white border-2 border-[#561C24] p-5 shadow-[4px_4px_0px_#561C24]">
      <div className="flex items-center justify-between border-b border-[#561C24]/15 pb-2 mb-3">
        <span className="font-mono text-[10px] font-black text-[#6D2932] uppercase tracking-wider">
          {index} / {label}
        </span>
      </div>
      <p className="font-sans text-xs text-[#561C24]/85 leading-relaxed font-medium">
        {children}
      </p>
    </div>
  );
}
