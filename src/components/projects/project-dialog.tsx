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
            className="fixed inset-0 bg-[#111111]/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: DURATION.modal, ease: EASE.primary }}
            className="relative z-10 my-auto flex max-h-[90vh] w-full max-w-4xl flex-col border-[3px] border-[#111111] bg-[#FAF3EE] p-6 sm:p-10 shadow-[8px_8px_0px_#111111] text-[#111111] overflow-hidden"
          >
            {/* Header bar */}
            <div className="border-b-[3px] border-[#111111] -m-6 sm:-m-10 mb-6 p-6 sm:px-10 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <span className="sticker-badge bg-[#111111] text-white -rotate-1 text-[10px]">
                  {project.category}
                </span>
                <span className="font-mono-code text-xs font-bold text-[#555555]">
                  PROJECT 0{project.number}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-8 w-8 items-center justify-center border-2 border-[#111111] bg-white text-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer font-bold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="mt-2 flex-1 overflow-y-auto pr-2 space-y-8">
              <div>
                <h2 id="dialog-title" className="font-heading text-3xl sm:text-4xl text-[#111111] tracking-tight font-extrabold leading-tight">
                  {project.title}
                </h2>
                <p className="mt-3 font-body text-base text-[#333333] leading-relaxed max-w-2xl">
                  {project.summary}
                </p>
              </div>

              {/* Visual */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border-2 border-[#111111] bg-white">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <ProjectVisual variant={project.visual as "evidence-network" | "career-layers" | "route-geometry"} />
                )}
              </div>

              {/* Meta grid */}
              <div className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-4 neo-card p-5 bg-white space-y-3">
                  <span className="font-label-caps text-xs text-[#111111] font-bold block">
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="skill-pill bg-[#FAF3EE]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-8 neo-card p-5 bg-white space-y-2">
                  <span className="font-label-caps text-xs text-[#111111] font-bold block">
                    ENGINEERING FOCUS
                  </span>
                  <p className="font-body text-sm text-[#333333] leading-relaxed font-semibold">
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
              <div className="neo-card p-6 bg-white space-y-4">
                <span className="font-label-caps text-xs text-[#111111] font-bold block">
                  05 · KEY CAPABILITIES
                </span>
                <ul className="grid gap-3 md:grid-cols-2">
                  {project.caseStudy.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 border-[1.5px] border-[#111111] bg-[#FAF3EE] p-3 text-xs sm:text-sm text-[#111111] font-semibold"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-2 w-2 flex-shrink-0 bg-[#111111]"
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
              <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-[#111111] pt-6">
                <span className="font-label-caps text-xs text-[#555555] font-bold">
                  VERIFIED APPLICATION
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn-secondary px-4 py-2 font-label-caps text-xs bg-white text-[#111111]"
                    >
                      SOURCE CODE
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn-primary px-4 py-2 font-label-caps text-xs inline-flex items-center gap-1.5 font-bold"
                    >
                      <span>LAUNCH SITE</span>
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
    <div className="md:col-span-6 neo-card p-6 bg-white space-y-2">
      <div className="flex items-center justify-between border-b-2 border-[#111111] pb-2 mb-2">
        <span className="font-label-caps text-xs text-[#111111] font-bold">
          {index} · {label}
        </span>
      </div>
      <p className="font-body text-sm text-[#333333] leading-relaxed">
        {children}
      </p>
    </div>
  );
}
