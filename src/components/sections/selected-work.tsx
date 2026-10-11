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
      className="relative py-16 sm:py-24 border-t border-[#E2DFD7] bg-transparent perspective-1200"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Animated Red Underline */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E2DFD7] mb-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-base sm:text-lg text-[#E5341B] tracking-widest uppercase font-extrabold">
              02
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
              Selected Work
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#666666] hidden sm:inline">
            ENGINEERED SYSTEMS & FULL-STACK PRODUCTS
          </span>
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
  const shouldReduceMotion = useReducedMotion();

  const yMotion = useMotionValue(0);
  const smoothY = useSpring(yMotion, {
    stiffness: 160,
    damping: 24,
    mass: 0.6,
  });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsFinePointer(!isTouch);
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
      {/* Shared Floating Preview Canvas (Desktop only) */}
      {isFinePointer && (
        <ProjectPreview
          activeProject={activeProject}
          y={shouldReduceMotion ? yMotion : smoothY}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />
      )}

      {/* Rows with 3D Flip entrance & hover lift */}
      <div className="divide-y divide-[#E2DFD7]">
        {projects.map((project, idx) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={idx}
            isHovered={hoveredIndex === idx}
            anyHovered={hoveredIndex !== null}
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
      className="absolute pointer-events-none z-20 hidden md:block w-[clamp(280px,28vw,440px)] aspect-[16/10] overflow-hidden bg-white rounded-md hard-shadow"
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
              <div className="w-full h-full flex items-center justify-center bg-[#F6F4EE] text-[#0A0A0A] font-mono text-xs font-bold">
                {activeProject.index}
              </div>
            )}
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
  onPointerEnter: () => void;
}

export function ProjectRow({
  project,
  index,
  isHovered,
  anyHovered,
  onPointerEnter,
}: ProjectRowProps) {
  const href = project.isExternal ? project.liveUrl || "#" : `/work/${project.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -25, y: 60 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative perspective-1200"
    >
      <Link
        href={href}
        onPointerEnter={onPointerEnter}
        onMouseEnter={onPointerEnter}
        style={{
          transform: isHovered ? "translate3d(0, -3px, 30px)" : "translate3d(0, 0, 0)",
          opacity: anyHovered && !isHovered ? 0.55 : 1,
        }}
        className={`group block py-7 sm:py-8 px-4 -mx-4 rounded-md transition-all duration-200 focus-visible:outline-none ${
          isHovered
            ? "bg-white hard-shadow"
            : "bg-transparent"
        }`}
      >
        {/* Desktop 5-Column Grid */}
        <div className="hidden md:flex items-baseline justify-between w-full">
          {/* Col 1: Index */}
          <div className="w-[84px] shrink-0 font-mono text-xs text-[#E5341B] font-bold">
            {project.index}
          </div>

          {/* Col 2: Title & Description */}
          <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl shrink-0">
            <h3
              className={`text-[24px] font-bold leading-[1.2] tracking-[-0.02em] transition-colors duration-200 ${
                isHovered ? "text-[#E5341B]" : "text-[#0A0A0A]"
              }`}
            >
              {project.title}
            </h3>
            <p className="text-[13px] leading-[1.55] text-[#555555] mt-2.5 line-clamp-3">
              {project.summary}
            </p>
          </div>

          {/* Col 3: Flexible Spacer */}
          <div className="flex-1 min-w-[20px]" />

          {/* Col 4: Category Sticker */}
          <div className="w-[180px] shrink-0 text-left">
            <span className="neo-sticker bg-[#F2ECE4] text-[#0A0A0A] font-semibold">
              {project.category}
            </span>
          </div>

          {/* Col 5: Year & Rotating Arrow at right edge */}
          <div className="w-[76px] shrink-0 flex items-center justify-end gap-1.5 font-mono text-xs text-[#666666]">
            <span>{project.year}</span>
            <ArrowUpRight
              className={`w-4 h-4 transition-transform duration-200 ${
                isHovered
                  ? "rotate-45 text-[#E5341B] scale-110"
                  : "text-[#666666]"
              }`}
            />
          </div>
        </div>

        {/* Mobile Layout (< 768px) */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between font-mono text-[11px] text-[#666666] mb-1.5">
            <span className="text-[#E5341B] font-bold">{project.index}</span>
            <div className="flex items-center gap-1">
              <span>{project.year}</span>
              <ArrowUpRight
                className={`w-3.5 h-3.5 transition-transform ${
                  isHovered ? "rotate-45 text-[#E5341B]" : ""
                }`}
              />
            </div>
          </div>

          <h3 className="text-xl font-bold leading-snug tracking-tight text-[#0A0A0A] mb-2 group-hover:text-[#E5341B] transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-sm text-[#555555] leading-relaxed mb-4 line-clamp-3">
            {project.summary}
          </p>

          <span className="neo-sticker bg-[#F2ECE4] text-[#0A0A0A] text-[10px]">
            {project.category}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
