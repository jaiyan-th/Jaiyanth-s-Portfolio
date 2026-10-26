"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

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
}

export const PROJECTS_DATA: SelectedProjectCard[] = [
  {
    id: "fake-news-detector",
    index: "01",
    title: "Fake News Detector — Grounded RAG Fact Verification",
    category: "Applied AI · RAG Architecture",
    year: "2025–26",
    summary:
      "An autonomous fact-checking pipeline that retrieves semantically indexed news evidence from vector stores to score claims with strict source attribution and provenance.",
    highlights: [
      "Grounded RAG pipeline cross-referencing incoming claims against vectorized news evidence with zero hallucination.",
      "High-throughput semantic retrieval layer using embeddings and vector search for sub-second claim resolution.",
      "Full-stack architecture backed by Flask and Supabase with traceable provenance and confidence calibration.",
    ],
    metrics: [
      { label: "Resolution Latency", value: "< 850ms" },
      { label: "Verification Precision", value: "94.2%" },
      { label: "Vector Search", value: "Qdrant" },
    ],
    stack: ["Python", "Flask", "LangChain", "Qdrant", "RAG", "Supabase"],
    image: "/images/projects/fake-news-detector.jpg",
    liveUrl: "https://fake-news-detecter-kopi.onrender.com/",
    repoUrl: "https://github.com/jaiyan-th/Fake-News-Detecter",
  },
  {
    id: "up-skill",
    index: "02",
    title: "Up-Skill — AI Career & Interview Intelligence",
    category: "Applied AI · Career Intelligence",
    year: "2025",
    summary:
      "A multi-stage agentic career platform that runs ATS resume parsing, real-time conversational interview simulations, and calibrated skill-gap roadmaps.",
    highlights: [
      "Dual-LLM orchestration pairing Groq (Llama-3 70B) for sub-second dialogue with Mistral for deep reasoning.",
      "ATS resume parsing matching candidate skill graphs against job requirements with calibrated match scoring.",
      "Real-time conversational mock interview simulator operating under 600ms latency.",
    ],
    metrics: [
      { label: "Response Latency", value: "< 600ms" },
      { label: "ATS Match Accuracy", value: "91.8%" },
      { label: "Model Pipeline", value: "Dual-LLM" },
    ],
    stack: ["Python", "Flask", "LangChain", "Groq", "Mistral", "Supabase"],
    image: "/images/projects/up-skill.jpg",
    liveUrl: "https://upskill-ai-personalized-skill-and-career-w0px.onrender.com/",
    repoUrl:
      "https://github.com/jaiyan-th/UpSkill-AI-Personalized-Skill-and-Career-Assistant",
  },
  {
    id: "car-rent",
    index: "03",
    title: "Car-Rent — Full-Stack Rental Platform",
    category: "Full-Stack · Web Platform",
    year: "2025",
    summary:
      "Full-stack automotive reservation platform engineered with concurrency-safe booking timelines, JWT/OAuth authentication, and Prisma relational modeling.",
    highlights: [
      "Concurrency-safe reservation engine preventing vehicle double-booking via atomic database transactions.",
      "End-to-end type safety using TypeScript, NestJS controllers, Prisma ORM, and PostgreSQL schemas.",
      "Dynamic date-range validation and vehicle availability engine resolving overlapping bookings in < 40ms.",
    ],
    metrics: [
      { label: "Booking Overlap", value: "0%" },
      { label: "API Query Latency", value: "< 40ms" },
      { label: "Relational Store", value: "PostgreSQL" },
    ],
    stack: ["Next.js", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Tailwind"],
    image: "/images/projects/car-rent.jpg",
    liveUrl: "https://car-rent-iota-six.vercel.app/",
    repoUrl: "https://github.com/jaiyan-th/Car-Rent",
  },
  {
    id: "document-vault",
    index: "04",
    title: "Secure Digital Document Vault — Cryptographic Storage",
    category: "Full-Stack · Cybersecurity",
    year: "2025",
    summary:
      "High-assurance document store featuring AES-256-GCM authenticated encryption, Argon2id key derivation, chunked streaming, and immutable audit trails.",
    highlights: [
      "End-to-end AES-256-GCM encryption ensuring zero plaintext stored at rest or exposed during transfer.",
      "Argon2id memory-hard key derivation protecting master keys against hardware brute-force attacks.",
      "Streaming cryptographic pipeline handling multi-gigabyte file transfers within a strict 25MB RAM envelope.",
    ],
    metrics: [
      { label: "Cipher Standard", value: "AES-256-GCM" },
      { label: "Server Exposure", value: "0 Plaintext" },
      { label: "RAM Envelope", value: "< 25MB" },
    ],
    stack: ["FastAPI", "Python", "SQLAlchemy", "PostgreSQL", "AES-256", "Argon2"],
    image: "/images/projects/document-vault.jpg",
    liveUrl: "https://jaiy-vault.onrender.com",
    repoUrl: "https://github.com/jaiyan-th/Secure-Digital-Document-Vault",
  },
];

// Curated varying neo-brutalist palette for each project card
const PROJECT_THEMES: Record<
  string,
  {
    headerBg: string;
    badgeBg: string;
    badgeText: string;
    cardBg: string;
    metricBg: string;
    tagBg: string;
    accentHex: string;
  }
> = {
  "fake-news-detector": {
    headerBg: "bg-[#FEF08A]", // Sunny Yellow
    badgeBg: "bg-[#FACC15]",
    badgeText: "text-[#111111]",
    cardBg: "bg-[#FFFDF5]",
    metricBg: "bg-[#FEF9C3]/80",
    tagBg: "bg-[#FEF08A]/70",
    accentHex: "#CA8A04",
  },
  "up-skill": {
    headerBg: "bg-[#EDE9FE]", // Lavender / Violet
    badgeBg: "bg-[#8B5CF6]",
    badgeText: "text-white",
    cardBg: "bg-[#FAF8FF]",
    metricBg: "bg-[#F5F3FF]/80",
    tagBg: "bg-[#EDE9FE]/80",
    accentHex: "#7C3AED",
  },
  "car-rent": {
    headerBg: "bg-[#DCFCE7]", // Mint Green
    badgeBg: "bg-[#4ADE80]",
    badgeText: "text-[#111111]",
    cardBg: "bg-[#F7FEFA]",
    metricBg: "bg-[#F0FDF4]/80",
    tagBg: "bg-[#DCFCE7]/70",
    accentHex: "#16A34A",
  },
  "document-vault": {
    headerBg: "bg-[#E0F2FE]", // Sky Blue
    badgeBg: "bg-[#38BDF8]",
    badgeText: "text-[#111111]",
    cardBg: "bg-[#F4FAFF]",
    metricBg: "bg-[#F0F9FF]/80",
    tagBg: "bg-[#E0F2FE]/70",
    accentHex: "#0284C7",
  },
};

export function SelectedWork() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="work"
      aria-label="02 Selected Work"
      className="relative min-h-screen py-16 sm:py-24 px-5 sm:px-8 bg-[#F5F0E6] scroll-mt-20 border-t-2 border-[#111111]"
    >
      <div className="site-container max-w-7xl mx-auto">
        {/* Section Header: Simple Font, Medium Size */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-5 mb-10 sm:mb-12 border-b-2 border-[#111111] gap-4">
          <div className="flex flex-col gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#6C47FF]" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#111111]">
                CASE STUDIES · 2024–2026
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(24px,3.2vw,36px)] text-[#111111] leading-tight tracking-[-0.02em]">
              Selected Work &amp; Systems.
            </h2>
          </div>
          <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#444444] max-w-md font-normal leading-relaxed">
            Applied AI systems, deterministic RAG pipelines, and verified production platforms built with strict performance budgets.
          </p>
        </div>

        {/* 2-Column Neo-Brutalist Mockup Grid with Varying Color Themes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-8">
          {PROJECTS_DATA.map((project, idx) => {
            const theme = PROJECT_THEMES[project.id] || {
              headerBg: "bg-[#FAF8F5]",
              badgeBg: "bg-white",
              badgeText: "text-[#111111]",
              cardBg: "bg-white",
              metricBg: "bg-[#FAF8F5]",
              tagBg: "bg-[#FAF8F5]",
              accentHex: "#111111",
            };

            return (
              <motion.div
                key={project.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`group flex flex-col rounded-2xl ${theme.cardBg} border-2 border-[#111111] shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#111111] transition-all duration-200 overflow-hidden`}
              >
                {/* Browser / Device Mockup Window Header with Signature Color */}
                <div className={`flex items-center justify-between px-4 py-3 ${theme.headerBg} border-b-2 border-[#111111]`}>
                  {/* 3 Window Control Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D4D] border border-[#111111]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFD13B] border border-[#111111]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3EE07A] border border-[#111111]" />
                  </div>

                  {/* Window URL Pill */}
                  <span className="font-mono text-[10.5px] font-bold text-[#333333] px-2.5 py-0.5 rounded-full bg-white/90 border border-[#111111]/40">
                    {project.id}.ai
                  </span>

                  {/* Index Pill with Theme Accent */}
                  <span className={`font-mono text-[11px] font-bold ${theme.badgeBg} ${theme.badgeText} px-2 py-0.5 rounded-md border border-[#111111]`}>
                    P.{project.index}
                  </span>
                </div>

                {/* Project Image Frame */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EAE7DF] border-b-2 border-[#111111]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top filter grayscale contrast-105 group-hover:scale-105 group-hover:filter-none transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-5">
                  <div>
                    {/* Category Pill */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                        {project.category}
                      </span>
                      <span className="text-[#888888]">·</span>
                      <span className="font-mono text-[11px] text-[#555555]">
                        {project.year}
                      </span>
                    </div>

                    {/* Title: Simple Font, Medium Size */}
                    <h3 className="font-sans font-bold text-[18px] sm:text-[19.5px] text-[#111111] leading-snug group-hover:text-[#6C47FF] transition-colors">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="font-sans text-[14px] text-[#444444] mt-2 leading-relaxed font-normal">
                      {project.summary}
                    </p>

                    {/* Key Metrics Banner with Varying Tint */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#111111]/15">
                      {project.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className={`${theme.metricBg} p-2 rounded-lg border border-[#111111]/25`}>
                          <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#555555] block font-medium">
                            {metric.label}
                          </span>
                          <span className="font-sans font-bold text-[13px] text-[#111111] block mt-0.5">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className={`px-2.5 py-1 rounded-md ${theme.tagBg} text-[#111111] border border-[#111111]/30 font-mono text-[10.5px] uppercase tracking-wider font-semibold`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Live Demo + GitHub */}
                  <div className="flex items-center gap-2.5 pt-4 border-t-2 border-[#111111]">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#111111] text-white hover:bg-[#6C47FF] font-sans text-[12.5px] sm:text-[13px] font-bold border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
                      >
                        <span>Live System</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#111111] hover:bg-[#FFD13B] font-sans text-[12.5px] sm:text-[13px] font-bold border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
