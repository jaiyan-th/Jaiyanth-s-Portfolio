"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
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

export function SelectedWork() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="work"
      aria-label="02 Selected Work"
      className="relative min-h-screen py-20 sm:py-28 px-5 sm:px-8 bg-[#F5F0E6] scroll-mt-20 border-t-2 border-[#111111]"
    >
      <div className="site-container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-12 sm:mb-16 border-b-2 border-[#111111] gap-4">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#6C47FF]" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#111111]">
                CASE STUDIES · 2024–2026
              </span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(34px,5.5vw,72px)] text-[#111111] leading-[1.0] tracking-tight">
              Selected Work &amp; Systems.
            </h2>
          </div>
          <p className="font-sans text-[15px] sm:text-[16px] text-[#444444] max-w-md font-medium leading-relaxed">
            Applied AI systems, deterministic RAG pipelines, and verified production platforms built with strict performance budgets.
          </p>
        </div>

        {/* 2-Column Neo-Brutalist Mockup Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS_DATA.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col rounded-3xl bg-white border-2 border-[#111111] shadow-[6px_6px_0px_#111111] hover:shadow-[10px_10px_0px_#111111] transition-all duration-200 overflow-hidden"
            >
              {/* Browser / Device Mockup Window Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#FAF8F5] border-b-2 border-[#111111]">
                {/* 3 Window Control Dots */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF4D4D] border border-[#111111]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFD13B] border border-[#111111]" />
                  <span className="w-3 h-3 rounded-full bg-[#3EE07A] border border-[#111111]" />
                </div>

                {/* Window URL Pill */}
                <span className="font-mono text-[11px] font-bold text-[#555555] px-3 py-0.5 rounded-full bg-white border border-[#111111]/40">
                  {project.id}.ai
                </span>

                {/* Index Pill */}
                <span className="font-display font-extrabold text-[13px] text-[#6C47FF] bg-[#ECE7FF] px-2.5 py-0.5 rounded-md border border-[#111111]">
                  P.{project.index}
                </span>
              </div>

              {/* Project Image Frame */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EBE5D8] border-b-2 border-[#111111]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top filter grayscale contrast-105 group-hover:scale-105 group-hover:filter-none transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
                <div>
                  {/* Category Pill */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#6C47FF]">
                      {project.category}
                    </span>
                    <span className="text-[#888888]">·</span>
                    <span className="font-mono text-[11px] text-[#555555]">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-[22px] sm:text-[25px] text-[#111111] leading-snug group-hover:text-[#6C47FF] transition-colors">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-sans text-[14.5px] text-[#444444] mt-2.5 leading-relaxed font-normal">
                    {project.summary}
                  </p>

                  {/* Key Metrics Banner */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#111111]/15">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#111111]/20">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#666666] block font-medium">
                          {metric.label}
                        </span>
                        <span className="font-display font-extrabold text-[14px] text-[#111111] block mt-0.5">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#FAF8F5] text-[#111111] border border-[#111111]/30 font-mono text-[11px] uppercase tracking-wider font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions: Live Demo + GitHub */}
                <div className="flex items-center gap-3 pt-4 border-t-2 border-[#111111]">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-[#6C47FF] font-sans text-[13px] font-bold border-2 border-[#111111] shadow-[2.5px_2.5px_0px_#111111] hover:shadow-[3.5px_3.5px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
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
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#111111] hover:bg-[#FFD13B] font-sans text-[13px] font-bold border-2 border-[#111111] shadow-[2.5px_2.5px_0px_#111111] hover:shadow-[3.5px_3.5px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
