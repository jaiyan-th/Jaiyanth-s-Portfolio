"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";
import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/motion";

const PROJECT_CONFIGS: Record<string, { sticker: string; stickerBg: string; rotation: string; copy: string; stackText: string }> = {
  "fake-news-detector": {
    sticker: "APPLIED AI · RAG",
    stickerBg: "bg-[#B91C1C] text-white",
    rotation: "-rotate-2",
    copy: "A RAG-powered fact-checking pipeline that cross-references incoming articles against a curated evidence base and surfaces a retrieval-grounded trust verdict.",
    stackText: "Python, Flask, Supabase, Vector Database, RAG",
  },
  "up-skill": {
    sticker: "APPLIED AI · CAREER",
    stickerBg: "bg-[#D9622B] text-white",
    rotation: "rotate-2",
    copy: "An AI career assistant that scores resumes ATS-style, runs mock interviews, maps skill gaps, and proposes personalized learning paths.",
    stackText: "Flask, Supabase, Stitch, NLP, Groq",
  },
  "car-rent": {
    sticker: "FULL-STACK · PLATFORM",
    stickerBg: "bg-[#111111] text-white",
    rotation: "-rotate-1",
    copy: "A full-stack rental platform covering vehicle discovery, booking, reviews, payments, and secure authentication, with REST APIs and relational data modeling.",
    stackText: "Next.js, React, TypeScript, NestJS, Prisma ORM",
  },
  "secure-document-vault": {
    sticker: "FULL-STACK · SECURITY",
    stickerBg: "bg-[#B91C1C] text-white",
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
    stickerBg: "bg-[#111111] text-white",
    rotation: index % 2 === 0 ? "-rotate-2" : "rotate-2",
    copy: project.summary,
    stackText: project.stack.join(", "),
  };

  return (
    <div className="neo-card neo-card-interactive p-6 sm:p-8 lg:p-8 bg-white space-y-6">
      <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-10 items-start`}>
        {/* Screenshot / Image Frame */}
        <div className="w-full lg:w-[50%] shrink-0 relative">
          {/* Rotated sticker badge on screenshot */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`sticker-badge ${config.stickerBg} ${config.rotation}`}>
              {config.sticker}
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden border-2 border-[#111111] bg-[#FAF3EE]">
            <Image
              src={project.image || "/images/projects/fake-news-detector.jpg"}
              alt={`${project.title} Interface`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index === 0}
              unoptimized
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-[50%] flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-xs font-bold text-[#777777]">
                PROJECT 0{index + 1}
              </span>
              <Link
                href={`/projects/${project.slug}`}
                className="font-label-caps text-xs text-[#B91C1C] hover:underline inline-flex items-center gap-0.5 font-bold"
              >
                CASE STUDY <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              {project.title}
            </h3>

            <p className="font-body text-base text-[#333333] leading-relaxed pt-1">
              {config.copy}
            </p>
          </div>

          {/* Plain text tech stack */}
          <div className="border-t-2 border-[#111111]/15 pt-3 font-mono-code text-xs text-[#555555]">
            <span className="font-label-caps text-[10px] text-[#111111] font-bold mr-2 uppercase">
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
    <section id="work" className="relative bg-[#FAF3EE] text-[#111111] border-b-[3px] border-[#111111] py-16 md:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpVariants}
          className="space-y-3"
        >
          <div className="inline-block">
            <span className="sticker-badge bg-[#111111] text-white -rotate-1">
              FEATURED BUILDS
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
            Projects I built and <span className="italic text-[#B91C1C]">shipped.</span>
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
        <div className="neo-card p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm sm:text-base text-[#222222] font-medium">
            Explore all repositories on GitHub or get in touch for custom engineering engagements.
          </p>
          <div className="flex items-center gap-4 shrink-0 font-label-caps text-xs">
            <a
              href="https://github.com/jaiyan-th"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn-secondary px-4 py-2.5 inline-flex items-center gap-1.5 text-[#111111]"
            >
              <span>View GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#contact"
              className="neo-btn-primary px-4 py-2.5 inline-flex items-center justify-center text-white"
            >
              Contact me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
