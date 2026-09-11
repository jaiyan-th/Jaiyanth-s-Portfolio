"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";
import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/motion";
import { SectionContainer } from "@/components/layout/section-container";

const PROJECT_CONFIGS: Record<string, { sticker: string; stickerBg: string; rotation: string; copy: string; stackText: string }> = {
  "fake-news-detector": {
    sticker: "APPLIED AI · RAG",
    stickerBg: "bg-[#A3E635] text-[#0A0A0A]",
    rotation: "-rotate-2",
    copy: "A RAG-powered fact-checking pipeline that cross-references incoming articles against a curated evidence base and surfaces a retrieval-grounded trust verdict.",
    stackText: "Python, Flask, Supabase, Vector Database, RAG",
  },
  "up-skill": {
    sticker: "APPLIED AI · CAREER",
    stickerBg: "bg-[#A3E635] text-[#0A0A0A]",
    rotation: "rotate-2",
    copy: "An AI career assistant that scores resumes ATS-style, runs mock interviews, maps skill gaps, and proposes personalized learning paths.",
    stackText: "Flask, Supabase, Stitch, NLP, Groq",
  },
  "car-rent": {
    sticker: "FULL-STACK · PLATFORM",
    stickerBg: "bg-[#A3E635] text-[#0A0A0A]",
    rotation: "-rotate-1",
    copy: "A full-stack rental platform covering vehicle discovery, booking, reviews, payments, and secure authentication, with REST APIs and relational data modeling.",
    stackText: "Next.js, React, TypeScript, NestJS, Prisma ORM",
  },
  "secure-document-vault": {
    sticker: "FULL-STACK · SECURITY",
    stickerBg: "bg-[#A3E635] text-[#0A0A0A]",
    rotation: "rotate-1",
    copy: "A zero-trust encrypted document vault with AES-256-GCM authenticated encryption, role-based access control, chunked streaming, and immutable audit logging.",
    stackText: "Python, FastAPI, SQLAlchemy, PostgreSQL, AES-256-GCM",
  },
};

interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const isReversed = index % 2 !== 0;
  const config = PROJECT_CONFIGS[project.slug] || {
    sticker: project.category.toUpperCase(),
    stickerBg: "bg-[#A3E635] text-[#0A0A0A]",
    rotation: index % 2 === 0 ? "-rotate-2" : "rotate-2",
    copy: project.summary,
    stackText: project.stack.join(", "),
  };

  return (
    <div className="neo-card neo-card-interactive p-6 sm:p-8 lg:p-10 bg-[#141414] space-y-6">
      <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-10 items-start`}>
        {/* Screenshot / Image Frame */}
        <div className="w-full lg:w-[50%] shrink-0 relative">
          {/* Rotated sticker badge on screenshot */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`sticker-badge ${config.stickerBg} ${config.rotation}`}>
              {config.sticker}
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden border-2 border-white/20 bg-[#1A1A1A]">
            <Image
              src={project.image || "/images/projects/fake-news-detector.jpg"}
              alt={`${project.title} Interface`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index === 0}
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-[50%] flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-xs sm:text-[13px] font-bold text-[#9CA3AF]">
                PROJECT 0{index + 1}
              </span>
              <Link
                href={`/projects/${project.slug}`}
                className="font-label-caps text-xs sm:text-[13px] text-[#F5F5F0] hover:text-[#A3E635] hover:underline inline-flex items-center gap-0.5 font-bold"
              >
                CASE STUDY <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F0] tracking-tight">
              {project.title}
            </h3>

            <p className="font-body text-base sm:text-lg lg:text-[1.15rem] text-[#9CA3AF] leading-relaxed pt-1">
              {config.copy}
            </p>
          </div>

          {/* Plain text tech stack */}
          <div className="border-t-2 border-white/15 pt-3 font-mono-code text-xs sm:text-[13px] text-[#9CA3AF]">
            <span className="font-label-caps text-[11px] sm:text-xs text-[#F5F5F0] font-bold mr-2 uppercase">
              STACK:
            </span>
            {config.stackText}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="relative bg-[#0A0A0A] text-[#F5F5F0] border-b-[3px] border-white/20 py-16 md:py-24 scroll-mt-20">
      <SectionContainer className="space-y-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpVariants}
          className="space-y-4"
        >
          {/* Sticker Badge + Beside Subtitle */}
          <div className="flex items-center gap-2.5">
            <span className="sticker-badge bg-[#A3E635] text-[#0A0A0A] -rotate-1">
              <FolderGit2 className="w-3.5 h-3.5 text-[#0A0A0A]" />
              WORK
            </span>
            <span className="font-body italic text-[#A3E635] text-sm font-semibold">
              / proof of work
            </span>
          </div>

          {/* Section Headline with ONE italic accent word (shipped) */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-extrabold text-[#F5F5F0] leading-[1.08] tracking-tight">
            Things I&apos;ve built and{" "}
            <span className="italic text-[#A3E635]">shipped.</span>
          </h2>
        </motion.div>

        {/* Vertical Project Stack */}
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <ProjectCard project={project} index={idx} />
            </motion.div>
          ))}
        </div>

        {/* Section Close Line & Links */}
        <div className="neo-card p-6 bg-[#141414] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm sm:text-base text-[#9CA3AF] font-medium">
            Explore all repositories on GitHub or get in touch for custom engineering engagements.
          </p>
          <div className="flex items-center gap-4 shrink-0 font-label-caps text-xs">
            <a
              href="https://github.com/jaiyan-th"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn-secondary px-4 py-2.5 inline-flex items-center gap-1.5"
            >
              <span>View GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#contact"
              className="neo-btn-primary px-4 py-2.5 inline-flex items-center justify-center"
            >
              Contact me
            </a>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
