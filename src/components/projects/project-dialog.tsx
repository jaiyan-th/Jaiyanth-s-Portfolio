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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
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
            className="relative my-[5vh] h-[90vh] w-[92vw] max-w-[1180px] overflow-y-auto border border-black/10 bg-[#FAF3EE] text-black blueprint-box"
          >
            {/* Viewfinder corners */}
            <span className="blueprint-corner blueprint-corner-tl" />
            <span className="blueprint-corner blueprint-corner-tr" />
            <span className="blueprint-corner blueprint-corner-bl" />
            <span className="blueprint-corner blueprint-corner-br" />

            {/* Sticky top bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-[#FAF3EE] px-6 py-4 md:px-10">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold text-secondary">
                  {project.number} / Case Study
                </span>
                <motion.span
                  layoutId={`project-category-${project.slug}`}
                  className="font-mono text-[10px] font-bold text-secondary"
                  layout
                  transition={{ duration: 0.5, ease: EASE.primary }}
                >
                  {project.category}
                </motion.span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                data-cursor="close"
                className="grid h-10 w-10 place-items-center rounded-full border border-black/15 text-black transition-colors hover:border-[#B91C1C]"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-10 md:px-10 md:py-16">
              <motion.h2
                id={`dialog-title-${project.slug}`}
                layoutId={`project-title-${project.slug}`}
                layout
                transition={{ duration: 0.5, ease: EASE.primary }}
                className="font-heading text-project text-balance uppercase"
              >
                {project.title}
              </motion.h2>
              <p
                id={`dialog-desc-${project.slug}`}
                className="mt-5 max-w-2xl text-body text-secondary text-pretty"
              >
                {project.summary}
              </p>

              {/* Visual */}
              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden border border-black/10 bg-grid blueprint-box">
                {/* Viewfinder corners */}
                <span className="blueprint-corner blueprint-corner-tl" />
                <span className="blueprint-corner blueprint-corner-tr" />
                <span className="blueprint-corner blueprint-corner-bl" />
                <span className="blueprint-corner blueprint-corner-br" />

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
              <div className="mt-10 grid gap-8 md:grid-cols-12">
                <div className="md:col-span-4">
                  <span className="font-mono text-[9px] font-bold text-secondary uppercase tracking-widest">Stack</span>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className="border border-black/15 px-3 py-1 text-[10px] font-mono font-bold bg-white"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-8">
                  <span className="font-mono text-[9px] font-bold text-secondary uppercase tracking-widest">Engineering focus</span>
                  <p className="mt-3 text-body text-foreground text-pretty">
                    {project.engineeringFocus}
                  </p>
                </div>
              </div>

              {/* Body sections */}
              <div className="mt-12 grid gap-12 md:grid-cols-12">
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
              <div className="mt-12 border-t border-black/10 pt-10">
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">05 / Features</span>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {project.caseStudy.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 border-l-2 border-[#D9622B] pl-4 text-body text-foreground text-pretty"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>


              {/* Challenges & Learnings */}
              <div className="mt-12 grid gap-12 md:grid-cols-2">
                <CaseBlock label="Challenges" index="06">
                  {project.caseStudy.challenges}
                </CaseBlock>
                <CaseBlock label="Learnings" index="07">
                  {project.caseStudy.learnings}
                </CaseBlock>
              </div>

              {/* Repository action */}
              <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-black/10 pt-10">
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black font-mono text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-black/5 transition-all inline-flex items-center gap-2"
                >
                  <span>VIEW REPOSITORY</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
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
    <div className="md:col-span-6">
      <span className="font-mono text-[9px] font-bold text-secondary uppercase tracking-widest">
        {index} / {label}
      </span>
      <p className="mt-3 text-body text-foreground leading-relaxed text-pretty">
        {children}
      </p>
    </div>
  );
}
