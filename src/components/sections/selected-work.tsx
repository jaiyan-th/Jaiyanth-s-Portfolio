"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";

export interface SelectedProjectCard {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  highlights: string[];
  metrics: Array<{ label: string; value: string }>;
  stack: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  isExternal?: boolean;
}

export const PROJECTS_DATA: SelectedProjectCard[] = [
  {
    id: "sql-query-agent",
    index: "P. 01",
    title: "SQL Query Agent — Natural Language to SQL",
    category: "Applied AI · Text-to-SQL",
    year: "2026",
    summary:
      "Ask questions in plain English, inspect the answer alongside its generated SQL, and explore results as interactive tables or charts—backed by Groq tool-calling and sqlglot AST safety validation.",
    highlights: [
      "Multi-round Groq LLM tool-calling loop inspecting live schemas and executing read-only queries.",
      "AST-level SQL safety validation via sqlglot restricting operations to analytics queries with row caps and execution timeouts.",
      "Full-stack FastAPI and React + Recharts interface supporting SQLite, PostgreSQL, and MySQL.",
    ],
    metrics: [
      { label: "LLM Engine", value: "Groq Llama 3.3" },
      { label: "SQL Guardrails", value: "sqlglot AST" },
      { label: "DB Support", value: "Read-Only" },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Groq",
      "SQLAlchemy",
      "sqlglot",
      "React",
      "Recharts",
      "Tailwind CSS",
    ],
    repoUrl: "https://github.com/jaiyan-th/SQL-Query-Agent",
  },
  {
    id: "fake-news-detector",
    index: "P. 02",
    title: "AI News Verification System — Vector RAG Fact-Checking",
    category: "Applied AI · RAG Verification",
    year: "2025–26",
    summary:
      "An LLM + Vector RAG evidence verification system that extracts claims, retrieves real-time reporting from NewsAPI and Google News, and synthesizes transparent verdicts with FastEmbed semantic search.",
    highlights: [
      "Automated claim and entity extraction paired with targeted multi-angle search query generation via Groq LLM.",
      "Cross-publisher wire deduplication and in-memory semantic indexing using FastEmbed (BAAI/bge-small-en-v1.5).",
      "Stance evaluation (SUPPORT, CONTRADICT, NEUTRAL) synthesizing REAL, FALSE, MISLEADING, or UNVERIFIED verdicts.",
    ],
    metrics: [
      { label: "Embeddings", value: "FastEmbed" },
      { label: "Vector Dim", value: "384-dim" },
      { label: "Backend", value: "FastAPI" },
    ],
    stack: [
      "Python",
      "FastAPI",
      "FastEmbed",
      "Groq",
      "NewsAPI",
      "SerpAPI",
      "Vector RAG",
    ],
    image: "/images/projects/fake-news-detector.jpg",
    repoUrl: "https://github.com/jaiyan-th/AI-Powered-Fake-News-Detecter",
  },
  {
    id: "smarthire-ai",
    index: "P. 03",
    title: "SmartHire AI — Mock Interview & Assessment Platform",
    category: "Applied AI · Full-Stack",
    year: "2025–26",
    summary:
      "A production-grade AI mock interview and candidate assessment platform featuring multi-discipline interviews, ATS resume analysis, real-time webcam/audio telemetry, and a deterministic 4-pillar scoring engine.",
    highlights: [
      "Multi-discipline mock interviews (Technical, HR, Behavioral STAR, Quantitative) with real-time gaze and WPM cadence telemetry.",
      "ATS resume analyzer ingesting PDF/DOCX resumes to extract skills and compute job description alignment.",
      "Recruiter portal, admin diagnostics terminal, and certified tamper-resistant PDF dossier generation.",
    ],
    metrics: [
      { label: "Scoring Engine", value: "4-Pillar" },
      { label: "Backend", value: "Django 5.2" },
      { label: "LLM Stack", value: "Groq + GPT-4o" },
    ],
    stack: [
      "Python",
      "Django 5.2",
      "DRF",
      "Groq",
      "OpenAI",
      "PostgreSQL",
      "JavaScript",
      "Docker",
    ],
    repoUrl: "https://github.com/jaiyan-th/SmartHire-AI",
  },
];

export function SelectedWork() {
  return (
    <section
      id="work"
      aria-label="02 Selected Work"
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t-2 border-[#111111]/20 bg-transparent scroll-mt-16 perspective-1200"
    >
      <div className="site-container">
        {/* Section Header with Eyebrow Pill and Instrument Serif H2 */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b-[1.5px] border-[#111111]/20 mb-6 gap-3">
          <div className="flex flex-col gap-2.5">
            <EyebrowPill accent="SELECTED WORK" text="2024–26" />
            <h2 className="font-sans font-bold text-fluid-h2 text-[#111111] leading-[1.05] tracking-[-0.035em]">
              Selected{" "}
              <em className="accent font-serif-italic italic text-accent font-normal accent-underline">
                Work
              </em>
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#555555]">
            Engineered Systems &amp; Full-Stack Products
          </span>
        </Reveal>

        {/* Section Intro Paragraph with 2px solid accent left vertical line */}
        <div className="lead-intro mb-6">
          <p>
            Natural-language SQL agents, vector RAG fact-verification pipelines, and AI-powered candidate assessment platforms.
          </p>
        </div>

        {/* Editorial 3D Projects List */}
        <ProjectsList projects={PROJECTS_DATA} />

        {/* Other Projects -> Explore GitHub CTA */}
        <Reveal className="mt-8 pt-6 border-t-2 border-[#111111]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#E8472B] font-bold">
              More Projects &amp; Experiments
            </span>
            <p className="font-sans text-[14px] sm:text-[15px] text-[var(--body)]">
              Want to see my other repositories, full-stack builds, and AI prototypes?
            </p>
          </div>
          <a
            href="https://github.com/jaiyan-th"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#111111] text-white font-mono text-[12px] uppercase tracking-[0.08em] font-bold border-2 border-[#111111] shadow-[4px_4px_0px_#FFD13B] hover:bg-[#FFD13B] hover:text-[#111111] hover:shadow-[4px_4px_0px_#111111] transition-all duration-200 shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>Explore GitHub for my work</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

interface ProjectsListProps {
  projects: SelectedProjectCard[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const yMotion = useMotionValue(0);
  const smoothY = useSpring(yMotion, {
    stiffness: 160,
    damping: 24,
    mass: 0.6,
  });

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsFinePointer(!isTouch && window.innerWidth >= 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cursorY = e.clientY - rect.top;
    const previewHeight = 220;
    const clampedY = Math.max(
      0,
      Math.min(rect.height - previewHeight, cursorY - previewHeight / 2)
    );
    yMotion.set(clampedY);
  };

  const activeProject = hoveredIndex !== null ? projects[hoveredIndex] : null;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onMouseMove={handlePointerMove}
      onPointerLeave={() => setHoveredIndex(null)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative w-full preserve-3d"
    >
      {/* Floating Preview Canvas (Desktop >=1024px only) */}
      {isFinePointer && (
        <ProjectPreview
          activeProject={activeProject}
          y={shouldReduceMotion ? yMotion : smoothY}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />
      )}

      {/* Rows with 3D Flip entrance, hover lift & dimming siblings */}
      <div className="divide-y-2 divide-[#111111]/15">
        {projects.map((project, idx) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={idx}
            isHovered={hoveredIndex === idx}
            anyHovered={hoveredIndex !== null}
            isMobile={isMobile}
            shouldReduceMotion={Boolean(shouldReduceMotion)}
            onPointerEnter={() => isFinePointer && setHoveredIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectPreviewProps {
  activeProject: SelectedProjectCard | null;
  y: any;
  shouldReduceMotion: boolean;
}

export function ProjectPreview({
  activeProject,
  y,
  shouldReduceMotion,
}: ProjectPreviewProps) {
  const isVisible = activeProject !== null;

  return (
    <motion.div
      style={{
        top: 0,
        y,
        left: "52%",
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : shouldReduceMotion ? 1 : 0.96,
      }}
      transition={{
        duration: isVisible ? 0.35 : 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute pointer-events-none z-20 hidden lg:block w-[clamp(280px,26vw,440px)] aspect-[16/10] overflow-hidden bg-white rounded-md hard-shadow"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0.25,
              scale: 0.96,
              transition: { duration: 0.25 },
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full border-2 border-[#111111] rounded-xl overflow-hidden bg-white shadow-[6px_6px_0px_#111111]"
          >
            {activeProject.image ? (
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                sizes="(max-width: 1200px) 26vw, 440px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex flex-col justify-between p-5 bg-[#FAF8F5] text-[#111111]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#E8472B]">
                    {activeProject.index}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#555555]">
                    GitHub Repository
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="font-sans font-bold text-lg leading-snug text-[#111111]">
                    {activeProject.title}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white border border-[#111111]/20 font-mono text-[10px] uppercase tracking-[0.06em]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="h-6" />
              </div>
            )}
            {/* Overlay badge with project stack */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
              <span className="backdrop-blur-md bg-white text-[#111111] font-mono font-medium text-[11px] uppercase tracking-[0.08em] px-2.5 py-0.5 rounded-full border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111]">
                {activeProject.category}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-medium text-white bg-[#111111] border-[1.5px] border-[#111111] px-2.5 py-0.5 rounded-full shadow-[1.5px_1.5px_0px_#111111]">
                {activeProject.year}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface ProjectRowProps {
  project: SelectedProjectCard;
  index: number;
  isHovered: boolean;
  anyHovered: boolean;
  isMobile: boolean;
  shouldReduceMotion: boolean;
  onPointerEnter: () => void;
}

function renderProjectTitle(id: string, defaultTitle: string) {
  if (id === "sql-query-agent") {
    return (
      <>
        SQL Query Agent — Natural Language to{" "}
        <em className="accent font-serif-italic italic text-accent font-normal">SQL</em>
      </>
    );
  }
  if (id === "fake-news-detector") {
    return (
      <>
        AI News Verification System — Vector RAG{" "}
        <em className="accent font-serif-italic italic text-accent font-normal">Fact-Checking</em>
      </>
    );
  }
  if (id === "smarthire-ai") {
    return (
      <>
        SmartHire AI — Mock Interview &amp;{" "}
        <em className="accent font-serif-italic italic text-accent font-normal">Assessment</em>
      </>
    );
  }
  return defaultTitle;
}

function getProjectBadgeStyle(id: string) {
  switch (id) {
    case "sql-query-agent":
      return "bg-[#E0F2FE] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]";
    case "fake-news-detector":
      return "bg-[#FEF08A] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]";
    case "smarthire-ai":
      return "bg-[#EDE9FE] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]";
    default:
      return "bg-[#FEF9C3] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]";
  }
}

export function ProjectRow({
  project,
  index,
  isHovered,
  anyHovered,
  isMobile,
  shouldReduceMotion,
  onPointerEnter,
}: ProjectRowProps) {
  const href = project.isExternal ? project.liveUrl || "#" : `/work/${project.id}`;
  const badgeStyle = getProjectBadgeStyle(project.id);

  return (
    <motion.div
      initial={{
        opacity: 0,
        rotateX: isMobile || shouldReduceMotion ? 0 : -20,
        y: 36,
      }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative perspective-1200"
    >
      <Link
        href={href}
        onPointerEnter={onPointerEnter}
        onMouseEnter={onPointerEnter}
        style={{
          transform:
            isHovered && !isMobile && !shouldReduceMotion
              ? "translate3d(0, -3px, 20px)"
              : "translate3d(0, 0, 0)",
          opacity: anyHovered && !isHovered ? 0.4 : 1,
        }}
        className={`group block py-6 sm:py-7 lg:py-8 px-4 sm:px-5 -mx-4 sm:-mx-5 rounded-2xl transition-all duration-200 focus-visible:outline-none min-h-[64px] border-2 ${
          isHovered
            ? "bg-white border-[#111111] shadow-[5px_5px_0px_#111111]"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Desktop Layout (>=1024px): number | title + description | category | year/arrow */}
        <div className="hidden lg:flex items-start justify-between w-full gap-4">
          <div className="w-[72px] shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] font-bold flex items-center gap-1.5 transition-colors duration-200 text-[#111111]">
            <span className={`w-2 h-2 rounded-full bg-[#E8472B] transition-all duration-200 ${isHovered ? "scale-125 opacity-100" : "scale-75 opacity-70"}`} />
            <span className={isHovered ? "translate-x-1 transition-transform text-[#E8472B]" : "transition-transform"}>
              {project.index}
            </span>
          </div>

          <div className="max-w-xl xl:max-w-2xl flex-1 min-w-0">
            <h3
              className={`card-title font-sans font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-snug tracking-[-0.025em] transition-all duration-200 ${
                isHovered ? "text-[#E8472B] translate-x-1.5" : "text-[#111111]"
              }`}
            >
              {renderProjectTitle(project.id, project.title)}
            </h3>
            <p className="font-sans text-[14px] text-[var(--body)] mt-1.5 line-clamp-2 leading-relaxed max-w-prose">
              {project.summary}
            </p>
          </div>

          <div className="flex-1 min-w-[16px]" />

          <div className="w-[190px] xl:w-[220px] shrink-0 text-left">
            <span className={`inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] font-bold transition-all duration-200 ${badgeStyle} ${
              isHovered ? "scale-105" : ""
            }`}>
              {project.category}
            </span>
          </div>

          <div className="w-[84px] shrink-0 flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#111111] font-bold">
            <span>{project.year}</span>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 border-2 border-[#111111] ${
              isHovered
                ? "bg-[#FFD13B] text-[#111111] shadow-[2px_2px_0px_#111111] scale-110"
                : "bg-white text-[#111111] shadow-[1.5px_1.5px_0px_#111111]"
            }`}>
              <ArrowUpRight
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isHovered ? "rotate-45" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Tablet Layout (640px to 1023px) */}
        <div className="hidden sm:block lg:hidden">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex items-start gap-3 min-w-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#E8472B] font-bold shrink-0 pt-1">
                {project.index}
              </span>
              <h3 className="card-title font-sans font-bold text-[20px] sm:text-[22px] text-[#111111] group-hover:text-[#E8472B] transition-colors leading-snug">
                {renderProjectTitle(project.id, project.title)}
              </h3>
            </div>
            <ArrowUpRight className="w-4 h-4 shrink-0 text-[#111111] group-hover:text-[#E8472B] group-hover:rotate-45 transition-transform mt-1.5" />
          </div>

          <p className="font-sans text-[14px] text-[var(--body)] mb-2.5 line-clamp-2 leading-relaxed">
            {project.summary}
          </p>

          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-[#111111] font-bold">
            <span className={`inline-flex items-center px-3 py-1 rounded-full ${badgeStyle}`}>
              {project.category}
            </span>
            <span>{project.year}</span>
          </div>
        </div>

        {/* Mobile Phones Layout (< 640px) */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-[#111111] mb-1.5">
            <span className="text-[#E8472B] font-bold">{project.index}</span>
            <div className="flex items-center gap-1.5 font-bold">
              <span>{project.year}</span>
              <ArrowUpRight className="w-4 h-4 text-[#E8472B]" />
            </div>
          </div>

          <h3 className="card-title font-sans font-bold text-[18px] sm:text-[20px] leading-snug text-[#111111] mb-2 group-hover:text-[#E8472B] transition-colors">
            {renderProjectTitle(project.id, project.title)}
          </h3>

          <p className="font-sans text-[13px] text-[var(--body)] leading-relaxed mb-2.5 line-clamp-2">
            {project.summary}
          </p>

          <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${badgeStyle} font-mono text-[11px] uppercase tracking-[0.08em]`}>
            {project.category}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
