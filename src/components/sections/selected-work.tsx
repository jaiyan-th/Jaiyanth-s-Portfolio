"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Calendar,
  CheckCircle2,
  Cpu,
  Database,
  FileText,
  Key,
  Layers,
  Lock,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface SelectedProjectCard {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  highlights: string[];
  metrics: Array<{ label: string; value: string }>;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  isExternal?: boolean;
  visualType: "fakenews" | "upskill" | "carrent" | "vault" | "paper";
}

const PROJECTS_DATA: SelectedProjectCard[] = [
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
    liveUrl: "https://fake-news-detecter-kopi.onrender.com/",
    repoUrl: "https://github.com/jaiyan-th/Fake-News-Detecter",
    visualType: "fakenews",
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
    liveUrl: "https://upskill-ai-personalized-skill-and-career-w0px.onrender.com/",
    repoUrl:
      "https://github.com/jaiyan-th/UpSkill-AI-Personalized-Skill-and-Career-Assistant",
    visualType: "upskill",
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
    liveUrl: "https://car-rent-main-fcdo.onrender.com/",
    repoUrl: "https://github.com/jaiyan-th/Car-Rent-Main",
    visualType: "carrent",
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
    liveUrl: "https://jaiy-vault.onrender.com",
    repoUrl: "https://github.com/jaiyan-th/Secure-Digital-Document-Vault",
    visualType: "vault",
  },
];

export function SelectedWork() {
  return (
    <section
      id="work"
      aria-label="02 Selected Work"
      className="relative py-14 sm:py-18 border-t border-[#E5E3DB] bg-transparent"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 sm:mb-12 pb-6 border-b border-[#E5E3DB]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase font-semibold">
              02
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A0A0A]">
              Selected
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mt-2 sm:mt-0">
            Engineered Systems & Full-Stack Products
          </span>
        </motion.div>

        {/* Rich Featured-Case Style Cards for All Selected Projects */}
        <div className="space-y-8 sm:space-y-10">
          {PROJECTS_DATA.map((item, index) => {
            const projectLink = item.isExternal
              ? item.liveUrl || "#"
              : `/work/${item.id}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full rounded-2xl border border-[#E5E3DB] bg-white p-6 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 hover:border-[#0A0A0A]/40"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Details, Highlights, Metrics, Stack, CTAs */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Category Pill + Index + Year */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#FF3355]/10 text-[#FF3355] border border-[#FF3355]/20 font-semibold">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-[#0A0A0A] font-semibold">
                          {item.index}
                        </span>
                        <span className="text-xs font-mono text-[#6F6E6A]">
                          {item.year}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A] mb-4 leading-tight">
                        {item.isExternal ? (
                          <a
                            href={projectLink}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#FF3355] transition-colors inline-flex items-center gap-2"
                          >
                            <span>{item.title}</span>
                            <ArrowUpRight className="w-5 h-5 text-[#6F6E6A]" />
                          </a>
                        ) : (
                          <Link
                            href={projectLink}
                            className="hover:text-[#FF3355] transition-colors"
                          >
                            {item.title}
                          </Link>
                        )}
                      </h3>

                      {/* Summary */}
                      <p className="text-[#6F6E6A] text-base sm:text-lg mb-8 leading-relaxed font-normal">
                        {item.summary}
                      </p>

                      {/* Key Highlights List */}
                      <div className="mb-8">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mb-4">
                          Key Highlights
                        </h4>
                        <ul className="space-y-3 font-normal text-sm sm:text-base text-[#0A0A0A]">
                          {item.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="text-[#FF3355] font-bold select-none">
                                ・
                              </span>
                              <span className="text-[#2A2A2A] leading-relaxed">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Metrics Badges */}
                      <div className="grid grid-cols-3 gap-3 mb-8 pt-6 border-t border-[#E5E3DB]">
                        {item.metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-[#F5F4F0] border border-[#E5E3DB]"
                          >
                            <p className="text-base sm:text-lg font-medium text-[#0A0A0A] tracking-tight truncate">
                              {metric.value}
                            </p>
                            <p className="text-[11px] font-mono text-[#6F6E6A] uppercase tracking-wider">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#F5F4F0] text-[#6F6E6A] border border-[#E5E3DB]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions: Primary CTA + Source Repository / Live Demo */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E5E3DB]">
                      {item.isExternal ? (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#FF3355] transition-colors group shadow-xs"
                        >
                          <span>Read Research Paper</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <Link
                          href={projectLink}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#FF3355] transition-colors group shadow-xs"
                        >
                          <span>Read Case Study</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      )}

                      {item.liveUrl && !item.isExternal && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#E5E3DB] bg-[#F5F4F0] text-[#0A0A0A] text-sm font-medium hover:border-[#FF3355] hover:text-[#FF3355] transition-colors"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {item.repoUrl && !item.isExternal && (
                        <a
                          href={item.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#E5E3DB] bg-[#F5F4F0] text-[#0A0A0A] text-sm font-medium hover:border-[#FF3355] hover:text-[#FF3355] transition-colors"
                        >
                          <span>Source Repository</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Architectural Visual Diagram */}
                  <div className="lg:col-span-5 flex items-center justify-center">
                    <div className="w-full h-full min-h-[340px] sm:min-h-[400px] rounded-xl border border-[#E5E3DB] bg-[#F5F4F0] p-6 flex flex-col justify-between relative overflow-hidden">
                      {/* Background grid accent */}
                      <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                          backgroundImage: `radial-gradient(#0A0A0A 1px, transparent 1px)`,
                          backgroundSize: "16px 16px",
                        }}
                      />

                      {/* Top Bar of the Visual Box */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DB] z-10">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#1FB46A]" />
                          <span className="font-mono text-[11px] text-[#6F6E6A] uppercase tracking-wider">
                            {item.visualType === "fakenews" && "Grounded RAG Pipeline"}
                            {item.visualType === "upskill" && "Agent Routing Graph"}
                            {item.visualType === "carrent" && "Reservation Timeline Engine"}
                            {item.visualType === "vault" && "Cryptographic Stream"}
                            {item.visualType === "paper" && "Multimodal Triage Matrix"}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#0A0A0A] font-semibold">
                          SYS · {item.index}
                        </span>
                      </div>

                      {/* Center Node Visuals Tailored Per Project */}
                      <div className="my-auto py-6 z-10 flex flex-col items-center justify-center w-full">
                        {item.visualType === "fakenews" && (
                          <div className="w-full space-y-3">
                            <div className="p-3 rounded-lg bg-white border border-[#E5E3DB] flex items-center justify-between shadow-2xs">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#FF3355]" />
                                <span className="font-mono text-xs text-[#0A0A0A]">Incoming Breaking Claim</span>
                              </div>
                              <span className="text-[10px] font-mono text-[#6F6E6A]">RAW TEXT</span>
                            </div>

                            <div className="flex justify-center">
                              <span className="font-mono text-[10px] text-[#6F6E6A]">↓ high-dimensional embedding</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2.5 rounded-lg bg-white border border-[#E5E3DB] shadow-2xs text-center">
                                <Database className="w-3.5 h-3.5 text-[#0A0A0A] mx-auto mb-1" />
                                <span className="block text-[11px] font-mono font-medium text-[#0A0A0A]">Qdrant Vector DB</span>
                                <span className="text-[9px] font-mono text-[#6F6E6A]">Cosine Similarity</span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-white border border-[#E5E3DB] shadow-2xs text-center">
                                <Network className="w-3.5 h-3.5 text-[#0A0A0A] mx-auto mb-1" />
                                <span className="block text-[11px] font-mono font-medium text-[#0A0A0A]">Evidence Nodes</span>
                                <span className="text-[9px] font-mono text-[#6F6E6A]">Cited Provenance</span>
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-white border border-[#E5E3DB] flex items-center justify-between shadow-2xs">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#1FB46A]" />
                                <span className="font-mono text-xs text-[#0A0A0A]">Grounded Verdict</span>
                              </div>
                              <span className="text-xs font-mono font-bold text-[#1FB46A]">VERIFIED 94.2%</span>
                            </div>
                          </div>
                        )}

                        {item.visualType === "upskill" && (
                          <div className="w-full space-y-3">
                            <div className="p-3 rounded-lg bg-white border border-[#E5E3DB] flex items-center justify-between shadow-2xs">
                              <div className="flex items-center gap-2.5">
                                <FileText className="w-4 h-4 text-[#FF3355]" />
                                <span className="font-mono text-xs text-[#0A0A0A]">Resume AST & Skills Vector</span>
                              </div>
                              <span className="text-[10px] font-mono text-[#1FB46A]">PARSED</span>
                            </div>

                            <div className="flex justify-center">
                              <span className="font-mono text-[10px] text-[#6F6E6A]">↓ multi-agent dispatch</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2.5 rounded-lg bg-white border border-[#E5E3DB] text-center shadow-2xs">
                                <Cpu className="w-3.5 h-3.5 text-[#0A0A0A] mx-auto mb-1" />
                                <span className="block text-[11px] font-mono font-medium text-[#0A0A0A]">Groq Llama-3 70B</span>
                                <span className="text-[9px] font-mono text-[#6F6E6A]">&lt;600ms dialogue</span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-white border border-[#E5E3DB] text-center shadow-2xs">
                                <BrainCircuit className="w-3.5 h-3.5 text-[#0A0A0A] mx-auto mb-1" />
                                <span className="block text-[11px] font-mono font-medium text-[#0A0A0A]">Mistral 7B</span>
                                <span className="text-[9px] font-mono text-[#6F6E6A]">evaluator logic</span>
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-white border border-[#E5E3DB] flex items-center justify-between shadow-2xs">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#1FB46A]" />
                                <span className="font-mono text-xs text-[#0A0A0A]">Calibrated Match Verdict</span>
                              </div>
                              <span className="text-xs font-mono font-bold text-[#FF3355]">91.8%</span>
                            </div>
                          </div>
                        )}

                        {item.visualType === "carrent" && (
                          <div className="w-full space-y-3">
                            <div className="p-3 rounded-lg bg-white border border-[#E5E3DB] shadow-2xs">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-[#FF3355]" />
                                  <span className="font-mono text-xs text-[#0A0A0A]">Booking Window Interval</span>
                                </div>
                                <span className="text-[10px] font-mono text-[#1FB46A]">ATOMIC</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-[#F5F4F0] overflow-hidden flex">
                                <div className="w-1/4 bg-[#E5E3DB]" />
                                <div className="w-1/2 bg-[#0A0A0A]" />
                                <div className="w-1/4 bg-[#E5E3DB]" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2.5 rounded-lg bg-white border border-[#E5E3DB] shadow-2xs">
                                <Database className="w-3.5 h-3.5 text-[#0A0A0A] mb-1" />
                                <span className="block text-[11px] font-mono font-medium text-[#0A0A0A]">Prisma Engine</span>
                                <span className="text-[9px] font-mono text-[#6F6E6A]">Row-level lock</span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-white border border-[#E5E3DB] shadow-2xs">
                                <Lock className="w-3.5 h-3.5 text-[#0A0A0A] mb-1" />
                                <span className="block text-[11px] font-mono font-medium text-[#0A0A0A]">Isolation</span>
                                <span className="text-[9px] font-mono text-[#6F6E6A]">Repeatable read</span>
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-white border border-[#E5E3DB] flex items-center justify-between shadow-2xs">
                              <span className="font-mono text-xs text-[#0A0A0A]">Double-booking Guarantee</span>
                              <span className="text-xs font-mono font-bold text-[#1FB46A]">0 OVERLAP</span>
                            </div>
                          </div>
                        )}

                        {item.visualType === "vault" && (
                          <div className="w-full space-y-3">
                            <div className="p-3 rounded-lg bg-white border border-[#E5E3DB] flex items-center justify-between shadow-2xs">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#6F6E6A]" />
                                <span className="font-mono text-xs text-[#0A0A0A]">Plaintext Payload Stream</span>
                              </div>
                              <span className="text-[10px] font-mono text-[#6F6E6A]">&lt; 25MB RAM</span>
                            </div>

                            <div className="p-3 rounded-lg bg-[#0A0A0A] text-white border border-black shadow-2xs space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-mono text-[#CCFF00] flex items-center gap-1.5">
                                  <Key className="w-3 h-3" /> Argon2id KDF
                                </span>
                                <span className="text-[10px] font-mono text-gray-400">Memory-Hard</span>
                              </div>
                              <div className="flex items-center justify-between pt-1 border-t border-white/15">
                                <span className="text-[11px] font-mono text-white flex items-center gap-1.5">
                                  <Lock className="w-3 h-3 text-[#FF3355]" /> AES-256-GCM
                                </span>
                                <span className="text-[10px] font-mono text-[#1FB46A]">Tag Verified</span>
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-white border border-[#E5E3DB] flex items-center justify-between shadow-2xs">
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#1FB46A]" />
                                <span className="font-mono text-xs text-[#0A0A0A]">Tamper-Proof Audit DB</span>
                              </div>
                              <span className="text-[10px] font-mono text-[#1FB46A]">IMMUTABLE</span>
                            </div>
                          </div>
                        )}

                        {item.visualType === "paper" && (
                          <div className="w-full space-y-3">
                            <div className="p-3 rounded-lg bg-white border border-[#E5E3DB] flex items-center justify-between shadow-2xs">
                              <span className="font-mono text-xs text-[#0A0A0A]">IEEE ICETSIS Bahrain 2026</span>
                              <span className="text-[10px] font-mono font-bold text-[#FF3355] bg-[#FF3355]/10 px-2 py-0.5 rounded-full">
                                RESEARCH
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2.5 rounded-lg bg-white border border-[#E5E3DB] text-center shadow-2xs">
                                <span className="block text-[11px] font-mono font-medium text-[#0A0A0A]">Visual Features</span>
                                <span className="text-[9px] font-mono text-[#6F6E6A]">Clinical Image CNN</span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-white border border-[#E5E3DB] text-center shadow-2xs">
                                <span className="block text-[11px] font-mono font-medium text-[#0A0A0A]">Dialogue Triage</span>
                                <span className="text-[9px] font-mono text-[#6F6E6A]">Conversational NLP</span>
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-white border border-[#E5E3DB] flex items-center justify-between shadow-2xs">
                              <span className="font-mono text-xs text-[#0A0A0A]">Explainable Clinic Route</span>
                              <span className="text-xs font-mono font-bold text-[#1FB46A]">HIGH CONFIDENCE</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Status Bar */}
                      <div className="pt-3 border-t border-[#E5E3DB] flex items-center justify-between text-[11px] font-mono text-[#6F6E6A] z-10">
                        <span>Status: Verified In Production</span>
                        <span className="text-[#0A0A0A] font-medium">{item.category.split("·")[0]}</span>
                      </div>
                    </div>
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
