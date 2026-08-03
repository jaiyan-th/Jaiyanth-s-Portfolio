"use client";

import * as React from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { X, ExternalLink, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";
import { ProjectVisual } from "./project-visual";

export function ProjectDialog({
  slug,
  onClose,
}: {
  slug: string | null;
  onClose: () => void;
}) {
  const project = slug ? PROJECTS.find((p) => p.slug === slug) : null;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);

  // Open / close + focus trap + scroll lock + ESC + history back
  React.useEffect(() => {
    if (!project) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const node = containerRef.current;
    if (!node) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const handlePop = () => onClose();
    document.addEventListener("keydown", handleKey);
    window.addEventListener("popstate", handlePop);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("popstate", handlePop);
      previouslyFocused.current?.focus();
    };
  }, [project, onClose]);

  return (
    <LayoutGroup>
      <AnimatePresence>
        {project && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-stretch justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.modal, ease: EASE.primary }}
            aria-hidden={false}
          >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "color-mix(in oklab, var(--canvas) 80%, transparent)" }}
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
            className="relative my-[5vh] h-[90vh] w-[92vw] max-w-[1180px] overflow-y-auto border border-line"
            style={{ background: "var(--elevated)" }}
          >
            {/* Sticky top bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line px-6 py-4 backdrop-blur-md md:px-10"
              style={{ background: "color-mix(in oklab, var(--elevated) 88%, transparent)" }}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono-label text-secondary">
                  {project.number} / Case Study
                </span>
                <motion.span
                  layoutId={`project-category-${project.slug}`}
                  className="font-mono-label text-secondary"
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
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-foreground transition-colors hover:border-accent"
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
                className="font-display text-project text-balance"
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
              <div className="mt-10 aspect-[16/9] w-full overflow-hidden border border-line bg-grid">
                <ProjectVisual variant={project.visual as "evidence-network" | "career-layers" | "route-geometry"} />
              </div>

              {/* Meta grid */}
              <div className="mt-10 grid gap-8 md:grid-cols-12">
                <div className="md:col-span-4">
                  <span className="font-mono-label text-secondary">Stack</span>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line px-3 py-1 text-[12px]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-8">
                  <span className="font-mono-label text-secondary">Engineering focus</span>
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
              <div className="mt-12 border-t border-line pt-10">
                <span className="font-mono-label text-secondary">[ 05 ] Features</span>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {project.caseStudy.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 border-l-2 border-line pl-4 text-body text-foreground text-pretty"
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
              <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-line pt-10">
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="code"
                  className="btn-magnetic btn-primary"
                >
                  View repository
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={`/projects/${project.slug}`}
                  className="btn-magnetic btn-ghost"
                  data-cursor="view"
                >
                  Permalink
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

function CaseBlock({
  label,
  index,
  children,
}: {
  label: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="md:col-span-6">
      <span className="font-mono-label text-secondary">[ {index} ] {label}</span>
      <p className="mt-4 text-body text-foreground text-pretty">{children}</p>
    </div>
  );
}
