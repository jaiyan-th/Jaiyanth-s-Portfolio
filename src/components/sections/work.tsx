"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/masked-heading";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { usePathname } from "next/navigation";

export function Work() {
  const pathname = usePathname();
  const [dialogSlug, setDialogSlug] = React.useState<string | null>(null);

  // Sync with route — if URL is /projects/[slug], open dialog
  React.useEffect(() => {
    const match = pathname?.match(/^\/projects\/([\w-]+)$/);
    if (match) {
      setDialogSlug(match[1]!);
    } else {
      setDialogSlug(null);
    }
  }, [pathname]);

  const closeDialog = React.useCallback(() => {
    setDialogSlug(null);
    // If we're on a project route, navigate back to /#work
    if (pathname?.startsWith("/projects/")) {
      window.history.pushState({}, "", "/#work");
      // Dispatch popstate so usePathname re-syncs
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, [pathname]);

  const openDialog = (slug: string) => {
    setDialogSlug(slug);
    window.history.pushState({}, "", `/projects/${slug}`);
  };

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative section-spacing border-t border-line"
    >
      <div className="container-editorial">
        <SectionHeader
          index="03"
          label="Selected Work"
          title="Three projects, three systems."
          supporting="Each one is a real artifact — built, debugged, and documented. Tap a project for the full case study."
        />

        <div className="mt-16 flex flex-col gap-24 md:gap-32">
          {PROJECTS.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              reversed={project.layout === "reversed"}
              cinematic={project.layout === "cinematic"}
              index={i}
              onOpen={() => openDialog(project.slug)}
            />
          ))}
        </div>
      </div>

      <ProjectDialog slug={dialogSlug} onClose={closeDialog} />
    </section>
  );
}

function ProjectRow({
  project,
  reversed,
  cinematic,
  index,
  onOpen,
}: {
  project: (typeof PROJECTS)[number];
  reversed: boolean;
  cinematic: boolean;
  index: number;
  onOpen: () => void;
}) {
  const visualCol = cinematic
    ? "lg:col-span-12"
    : reversed
      ? "lg:col-span-5 lg:col-start-8"
      : "lg:col-span-7";
  const contentCol = cinematic
    ? "lg:col-span-12"
    : reversed
      ? "lg:col-span-5 lg:col-start-1 lg:row-start-1"
      : "lg:col-span-5";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: DURATION.reveal, ease: EASE.primary }}
      className="grid gap-8 lg:grid-cols-12 lg:gap-12"
    >
      {/* Visual */}
      <div className={visualCol}>
        <div
          className="group relative aspect-[4/3] w-full overflow-hidden border border-line bg-grid"
          data-cursor="open"
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Open case study: ${project.title}`}
        >
          <ProjectVisual variant={project.visual as "evidence-network" | "career-layers" | "route-geometry"} />
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: "color-mix(in oklab, var(--canvas) 70%, transparent)",
            }}
          >
            <span className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono-label text-foreground">
              Open case study <ArrowUpRight className="h-3 w-3" aria-hidden />
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${contentCol} flex flex-col gap-5 ${cinematic ? "lg:flex-row lg:items-end lg:gap-16" : ""}`}>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="font-mono-label text-secondary">
              {project.number} / Selected Work
            </span>
            <span className="h-px w-12 bg-line" />
            <span className="font-mono-label text-secondary">{project.category}</span>
          </div>
          <h3 className="font-display text-project text-balance">
            {project.title}
          </h3>
          <p className="text-body text-secondary text-pretty">{project.summary}</p>
          <p className="text-[14px] text-foreground text-pretty">
            <span className="font-mono-label text-secondary">Engineering focus · </span>
            {project.engineeringFocus}
          </p>
        </div>

        <div className={`${cinematic ? "lg:flex-1" : ""} flex flex-col gap-5`}>
          <div>
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
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/projects/${project.slug}`}
              onClick={(e) => {
                // JS-enabled: open dialog instead of full navigation
                e.preventDefault();
                onOpen();
              }}
              data-cursor="view"
              className="btn-magnetic btn-primary !py-2.5 !px-5 !text-[13px]"
            >
              View case study
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="code"
              className="btn-magnetic btn-ghost !py-2.5 !px-5 !text-[13px]"
            >
              Repository
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
