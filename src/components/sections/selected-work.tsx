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
import { ArrowUpRight } from "lucide-react";
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
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  isExternal?: boolean;
}

export const PROJECTS_DATA: SelectedProjectCard[] = [
  {
    id: "fake-news-detector",
    index: "P. 01",
    title: "Fake News Detector — Grounded RAG Fact Verification",
    category: "AI Internship · Brainery Spot",
    year: "2025–26",
    summary:
      "Engineered during AI Internship at Brainery Spot Technology: an autonomous fact-checking pipeline retrieving semantically indexed evidence from Qdrant vector stores to score claims with strict source attribution and zero hallucination.",
    highlights: [
      "Grounded RAG pipeline cross-referencing incoming claims against vectorized news evidence with zero model hallucination.",
      "High-throughput semantic retrieval layer using embeddings and vector search for sub-second claim resolution.",
      "Full-stack architecture backed by Flask and Supabase with traceable provenance, cited URLs, and confidence calibration.",
    ],
    metrics: [
      { label: "Resolution Latency", value: "< 850ms" },
      { label: "Verification Precision", value: "94.2%" },
      { label: "Vector Search", value: "Qdrant" },
    ],
    stack: [
      "Python",
      "Flask",
      "LangChain",
      "Qdrant Vector DB",
      "RAG",
      "Supabase",
      "News API",
      "Embeddings",
    ],
    image: "/images/projects/fake-news-detector.jpg",
    liveUrl: "https://fake-news-detecter-kopi.onrender.com/",
    repoUrl: "https://github.com/jaiyan-th/Fake-News-Detecter",
  },
  {
    id: "up-skill",
    index: "P. 02",
    title: "Up-Skill — AI Career & Interview Intelligence",
    category: "Applied AI · Career Intelligence",
    year: "2025",
    summary:
      "A multi-stage agentic career platform that runs ATS resume parsing, real-time conversational interview simulations, and calibrated skill-gap roadmaps.",
    highlights: [
      "Dual-LLM orchestration pairing Groq (Llama-3 70B) for sub-second conversational interview dialogue with Mistral for deep reasoning.",
      "ATS resume parsing pipeline matching candidate skill graphs against job requirements with calibrated match scoring.",
      "Real-time conversational mock interview simulator operating under 600ms latency with persistent session context.",
    ],
    metrics: [
      { label: "Response Latency", value: "< 600ms" },
      { label: "ATS Match Accuracy", value: "91.8%" },
      { label: "Model Pipeline", value: "Dual-LLM" },
    ],
    stack: [
      "Python",
      "Flask",
      "LangChain",
      "Groq",
      "Mistral",
      "Supabase",
      "Embeddings",
    ],
    image: "/images/projects/up-skill.jpg",
    liveUrl: "https://upskill-ai-personalized-skill-and-career-w0px.onrender.com/",
    repoUrl:
      "https://github.com/jaiyan-th/UpSkill-AI-Personalized-Skill-and-Career-Assistant",
  },
  {
    id: "car-rent",
    index: "P. 03",
    title: "Car-Rent — Full-Stack Rental Platform",
    category: "Full-Stack · Web Platform",
    year: "2025",
    summary:
      "Full-stack automotive reservation platform engineered with concurrency-safe booking timelines, JWT/OAuth authentication, and Prisma relational modeling.",
    highlights: [
      "Concurrency-safe reservation engine preventing vehicle double-booking via atomic database transactions and row-level locks.",
      "End-to-end type safety using TypeScript, NestJS controllers, Prisma ORM, and normalized PostgreSQL schemas.",
      "Dynamic date-range validation and vehicle availability engine resolving complex overlapping bookings in < 40ms.",
    ],
    metrics: [
      { label: "Double-Booking Overlap", value: "0%" },
      { label: "API Query Latency", value: "< 40ms" },
      { label: "Relational Store", value: "PostgreSQL" },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Prisma ORM",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    image: "/images/projects/car-rent.jpg",
    liveUrl: "https://car-rent-iota-six.vercel.app/",
    repoUrl: "https://github.com/jaiyan-th/Car-Rent",
  },
  {
    id: "document-vault",
    index: "P. 04",
    title: "Secure Digital Document Vault — Cryptographic Storage",
    category: "Full-Stack · Cybersecurity",
    year: "2025",
    summary:
      "High-assurance document store featuring AES-256-GCM authenticated encryption, Argon2id key derivation, chunked streaming, and immutable audit trails.",
    highlights: [
      "End-to-end AES-256-GCM authenticated encryption ensuring zero plaintext stored at rest or exposed during transfer.",
      "Argon2id memory-hard key derivation protecting master keys against GPU and ASIC hardware brute-force attacks.",
      "Streaming cryptographic pipeline handling multi-gigabyte file transfers within a strict 25MB RAM envelope.",
    ],
    metrics: [
      { label: "Cipher Standard", value: "AES-256-GCM" },
      { label: "Server Exposure", value: "0 Plaintext" },
      { label: "RAM Envelope", value: "< 25MB" },
    ],
    stack: [
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "PostgreSQL",
      "AES-256-GCM",
      "Argon2",
    ],
    image: "/images/projects/document-vault.jpg",
    liveUrl: "https://jaiy-vault.onrender.com",
    repoUrl: "https://github.com/jaiyan-th/Secure-Digital-Document-Vault",
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
            Autonomous fact-verification pipelines, dual-LLM agentic career platforms, concurrency-safe reservation engines, and cryptographic vaults.
          </p>
        </div>

        {/* Editorial 3D Projects List */}
        <ProjectsList projects={PROJECTS_DATA} />
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
              <div className="w-full h-full flex items-center justify-center bg-[#F6F4EE] text-[#0A0A0A] font-mono text-xs font-bold">
                {activeProject.index}
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
  if (id === "fake-news-detector") {
    return (
      <>
        Fake News Detector — Grounded RAG{" "}
        <em className="accent font-serif-italic italic text-accent font-normal">Verification</em>
      </>
    );
  }
  if (id === "up-skill") {
    return (
      <>
        Up-Skill — AI Career &amp; Interview{" "}
        <em className="accent font-serif-italic italic text-accent font-normal">Intelligence</em>
      </>
    );
  }
  if (id === "car-rent") {
    return (
      <>
        Car-Rent — Full-Stack Rental{" "}
        <em className="accent font-serif-italic italic text-accent font-normal">Platform</em>
      </>
    );
  }
  if (id === "document-vault") {
    return (
      <>
        Secure Digital Document Vault — Cryptographic{" "}
        <em className="accent font-serif-italic italic text-accent font-normal">Storage</em>
      </>
    );
  }
  return defaultTitle;
}

function getProjectBadgeStyle(id: string) {
  switch (id) {
    case "fake-news-detector":
      return "bg-[#FEF08A] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]";
    case "up-skill":
      return "bg-[#EDE9FE] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]";
    case "car-rent":
      return "bg-[#DCFCE7] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]";
    case "document-vault":
      return "bg-[#E0F2FE] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]";
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
