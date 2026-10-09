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
    category: "Applied AI · RAG Architecture",
    year: "2025–26",
    summary:
      "An autonomous fact-checking pipeline that retrieves semantically indexed news evidence from vector stores to score claims with strict source attribution and provenance.",
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
    ],
    image: "/images/projects/car-rent.jpg",
    liveUrl: "https://car-rent-main-fcdo.onrender.com/",
    repoUrl: "https://github.com/jaiyan-th/Car-Rent-Main",
  },
  {
    id: "secure-vault",
    index: "P. 04",
    title: "Secure Document Vault — Zero-Trust Cryptographic Storage",
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

/**
 * 02 Selected Work Section (Editorial List Layout)
 */
export function SelectedWork() {
  return (
    <section
      id="work"
      aria-label="02 Selected Work"
      className="relative py-20 sm:py-24 bg-transparent"
    >
      <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-8 xl:px-0">
        {/* Section label row with hairline */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E6E3DC]">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6F6E6A]">
            02 — SELECTED
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6F6E6A] hidden sm:inline">
            ENGINEERED SYSTEMS & FULL-STACK PRODUCTS
          </span>
        </div>

        {/* Editorial Projects List */}
        <ProjectsList projects={PROJECTS_DATA} />
      </div>
    </section>
  );
}

/**
 * ProjectsList Component
 * Handles container cursor tracking, shared floating preview positioning, and keyboard focus.
 */
interface ProjectsListProps {
  projects: SelectedProjectCard[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  // Motion value for vertical cursor position
  const yMotion = useMotionValue(0);
  const smoothY = useSpring(yMotion, {
    stiffness: 150,
    damping: 22,
    mass: 0.6,
  });

  // Check fine pointer (desktop) vs touch device
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsFinePointer(!isTouch);
  }, []);

  // Update cursor position inside list container
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cursorY = e.clientY - rect.top;

    // Approximate preview height = width / (16/10) ~ 220px
    const previewHeight = 220;
    const clampedY = Math.max(
      0,
      Math.min(rect.height - previewHeight, cursorY - previewHeight / 2)
    );
    yMotion.set(clampedY);
  };

  const handlePointerLeave = () => {
    setHoveredIndex(null);
  };

  const handleRowFocus = (index: number, rowEl: HTMLElement) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const rowRect = rowEl.getBoundingClientRect();
    const rowCenterY = rowRect.top - containerRect.top + rowRect.height / 2;
    const previewHeight = 220;
    const clampedY = Math.max(
      0,
      Math.min(containerRect.height - previewHeight, rowCenterY - previewHeight / 2)
    );
    yMotion.set(clampedY);
    setHoveredIndex(index);
  };

  const handleRowBlur = () => {
    setHoveredIndex(null);
  };

  const activeProject = hoveredIndex !== null ? projects[hoveredIndex] : null;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onMouseMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseLeave={handlePointerLeave}
      className="relative w-full"
    >
      {/* Hidden Preloader for all preview images */}
      <div className="hidden" aria-hidden="true">
        {projects.map((p) => (
          <Image
            key={p.id}
            src={p.image}
            alt=""
            width={440}
            height={275}
            priority
          />
        ))}
      </div>

      {/* Shared Floating Preview Canvas (Desktop only) */}
      {isFinePointer && (
        <ProjectPreview
          activeProject={activeProject}
          y={shouldReduceMotion ? yMotion : smoothY}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />
      )}

      {/* Rows */}
      <div className="divide-y divide-[#E6E3DC]">
        {projects.map((project, idx) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={idx}
            isHovered={hoveredIndex === idx}
            onPointerEnter={() => isFinePointer && setHoveredIndex(idx)}
            onFocus={(el) => handleRowFocus(idx, el)}
            onBlur={handleRowBlur}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * ProjectPreview Component
 * A single shared floating canvas that smoothly trails cursor Y,
 * scales on entry/exit, and cross-fades images between active projects.
 */
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
        left: "51%",
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
      className="absolute pointer-events-none z-20 hidden md:block w-[clamp(280px,28vw,440px)] aspect-[16/10] overflow-hidden bg-[#E6E3DC] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[#E6E3DC]"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0.25,
              transition: { duration: 0.3 },
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full"
          >
            {activeProject.image ? (
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                sizes="(max-width: 1200px) 28vw, 440px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#E6E3DC] text-[#6F6E6A] font-mono text-xs">
                {activeProject.index}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * ProjectRow Component
 * Editorial 5-column layout on desktop, stacked on mobile with inline image.
 */
interface ProjectRowProps {
  project: SelectedProjectCard;
  index: number;
  isHovered: boolean;
  onPointerEnter: () => void;
  onFocus: (el: HTMLElement) => void;
  onBlur: () => void;
}

export function ProjectRow({
  project,
  index,
  isHovered,
  onPointerEnter,
  onFocus,
  onBlur,
}: ProjectRowProps) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const href = project.isExternal ? project.liveUrl || "#" : `/work/${project.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* Animated Hairline Draw-in */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E6E3DC] origin-left pointer-events-none"
      />

      <Link
        ref={rowRef}
        href={href}
        onPointerEnter={onPointerEnter}
        onMouseEnter={onPointerEnter}
        onFocus={() => rowRef.current && onFocus(rowRef.current)}
        onBlur={onBlur}
        className="group block py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors duration-150"
      >
        {/* Desktop 5-Column Grid */}
        <div className="hidden md:flex items-baseline justify-between w-full">
          {/* Col 1: Index (~84px) */}
          <div className="w-[84px] shrink-0 font-mono text-[12px] text-[#6F6E6A]">
            {project.index}
          </div>

          {/* Col 2: Title & Description (max-width ~440px) */}
          <div className="max-w-[440px] shrink-0">
            <h3
              className={`text-[25px] font-normal leading-[1.2] tracking-[-0.01em] transition-colors duration-200 ${
                isHovered ? "text-accent" : "text-[#0A0A0A]"
              }`}
            >
              {project.title}
            </h3>
            <p className="text-[13px] leading-[1.5] text-[#6B6B6B] mt-2.5 line-clamp-3">
              {project.summary}
            </p>
          </div>

          {/* Col 3: Flexible Spacer (Where floating hover preview appears) */}
          <div className="flex-1 min-w-[20px]" />

          {/* Col 4: Category label (~160px from the right) */}
          <div className="w-[160px] shrink-0 text-left text-[12px] uppercase tracking-[0.04em] text-[#6F6E6A]">
            {project.category}
          </div>

          {/* Col 5: Year & Arrow at far right edge */}
          <div className="w-[76px] shrink-0 flex items-center justify-end gap-1.5 text-[13px] text-[#6F6E6A]">
            <span>{project.year}</span>
            <ArrowUpRight
              className={`w-3 h-3 transition-all duration-200 ${
                isHovered
                  ? "translate-x-[3px] -translate-y-[3px] text-[#0A0A0A]"
                  : "text-[#6F6E6A]"
              }`}
            />
          </div>
        </div>

        {/* Mobile Layout (< 768px): Stacked with inline image */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between font-mono text-[11px] text-[#6F6E6A] mb-1.5">
            <span>{project.index}</span>
            <div className="flex items-center gap-1">
              <span>{project.year}</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          <h3 className="text-xl font-normal leading-snug tracking-tight text-[#0A0A0A] mb-2 group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-xs leading-relaxed text-[#6B6B6B] mb-3">
            {project.summary}
          </p>

          {/* Mobile Inline Image */}
          {project.image && (
            <div className="relative w-full aspect-[16/10] overflow-hidden mb-3 border border-[#E6E3DC] bg-[#E6E3DC]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          )}

          <div className="text-[11px] uppercase tracking-wider text-[#6F6E6A]">
            {project.category}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
