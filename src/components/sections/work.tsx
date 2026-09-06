"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";
import { motion } from "motion/react";

interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View case study for ${project.title}`}
      className="group block w-full text-left bg-white border border-[#E5E2DC] p-6 sm:p-8 lg:p-10 hover:border-[#2D5F4E]/40 transition-colors"
    >
      <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-center`}>
        {/* Image Frame */}
        <div className="w-full lg:w-[52%] shrink-0">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F7F6F2] border border-[#E5E2DC]">
            <Image
              src={project.image || "/images/projects/fake-news-detector.jpg"}
              alt={`${project.title} Interface`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index === 0}
              unoptimized
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-[48%] flex flex-col justify-center space-y-4">
          <div className="flex items-center justify-between text-[11px] font-label tracking-[0.14em] uppercase text-[#6B6B6B]">
            <span>0{index + 1} / {project.category}</span>
            <span className="text-[#2D5F4E] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 font-semibold">
              Case study <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal tracking-tight group-hover:text-[#2D5F4E] transition-colors">
            {project.title}
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#1A1A1A] font-medium leading-relaxed">
            {project.engineeringFocus}
          </p>

          <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed line-clamp-3">
            {project.summary}
          </p>

          {/* Tech Stack - quiet plain listing */}
          <div className="pt-2 text-xs font-sans text-[#6B6B6B]">
            <span className="font-label text-[10px] tracking-wider uppercase text-[#1A1A1A] font-semibold mr-2">
              Stack:
            </span>
            {project.stack.join(" · ")}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Work() {
  return (
    <section id="work" className="relative bg-[#FCFBF9] text-[#1A1A1A] border-b border-[#E5E2DC] py-20 md:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-16"
        >
          <span className="font-label text-[11px] tracking-[0.14em] uppercase text-[#6B6B6B] block">
            03 / Selected Work
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal leading-[1.15] tracking-tight">
            Projects built and <span className="italic text-[#2D5F4E]">deployed</span>.
          </h2>
        </motion.div>

        {/* Vertical Project Stack */}
        <div className="flex flex-col gap-10">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} index={idx} />
            </motion.div>
          ))}
        </div>

        {/* Quiet Footer Link */}
        <div className="mt-16 pt-8 border-t border-[#E5E2DC] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6B6B6B]">
          <span>All architecture models and codebases are tested in production.</span>
          <a
            href="https://github.com/jaiyan-th"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-[11px] tracking-[0.14em] uppercase text-[#1A1A1A] hover:text-[#2D5F4E] transition-colors inline-flex items-center gap-1 font-semibold"
          >
            <span>Explore all repositories on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#2D5F4E]" />
          </a>
        </div>
      </div>
    </section>
  );
}
