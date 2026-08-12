import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { PROJECTS, SITE } from "@/data/portfolio";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ArrowUpRight, ExternalLink } from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `${SITE.url}/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} · Jaiyanth B`,
      description: project.summary,
      url: `${SITE.url}/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} · Jaiyanth B`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="container-editorial min-h-screen pb-24 pt-32">
      <div className="flex items-center gap-4">
        <a
          href="/#work"
          className="font-mono-label text-secondary transition-colors hover:text-foreground"
        >
          ← Back to work
        </a>
        <span className="h-px w-12 bg-line" />
        <span className="font-mono-label text-secondary">{project.number} / Case Study</span>
        <span className="font-mono-label text-secondary">{project.category}</span>
      </div>

      <h1 className="mt-10 font-display text-project text-balance">{project.title}</h1>
      <p className="mt-5 max-w-2xl text-body text-secondary text-pretty">{project.summary}</p>

      <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-grid">
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

      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="font-mono-label text-secondary">Stack</span>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1 text-[12px]">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-8">
          <span className="font-mono-label text-secondary">Engineering focus</span>
          <p className="mt-3 text-body text-foreground text-pretty">{project.engineeringFocus}</p>
        </div>
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-12">
        <CaseBlock label="Overview" index="01">{project.caseStudy.overview}</CaseBlock>
        <CaseBlock label="Problem" index="02">{project.caseStudy.problem}</CaseBlock>
        <CaseBlock label="Engineering approach" index="03">{project.caseStudy.approach}</CaseBlock>
        <CaseBlock label="Architecture" index="04">{project.caseStudy.architecture}</CaseBlock>
      </div>

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


      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <CaseBlock label="Challenges" index="06">{project.caseStudy.challenges}</CaseBlock>
        <CaseBlock label="Learnings" index="07">{project.caseStudy.learnings}</CaseBlock>
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-line pt-10">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic btn-primary"
          >
            Live Demo
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        )}
        <a
          href={project.repository}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-magnetic btn-secondary"
        >
          View repository
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
        <a href="/#work" className="btn-magnetic btn-ghost">
          Back to selected work
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </article>
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
