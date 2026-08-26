"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { motion, useScroll, useTransform } from "motion/react";
import { PROJECTS } from "@/data/portfolio";

interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  onInspect: (slug: string) => void;
  index: number;
}

function ProjectCard({ project, onInspect, index }: ProjectCardProps) {
  return (
    <div
      onClick={() => onInspect(project.slug)}
      className="group relative cursor-pointer select-none [perspective:1000px] w-full"
    >
      {/* Giant Translucent Watermark Number behind/behind-left of card top */}
      <span
        aria-hidden="true"
        className="absolute -top-10 sm:-top-14 -left-3 z-0 font-display text-[7rem] sm:text-[8.5rem] md:text-[9.5rem] text-black/10 leading-none pointer-events-none select-none"
      >
        0{index + 1}
      </span>

      {/* Main Image Frame (4/5 Aspect Ratio with 2px black border & brutalist shadow) */}
      <div className="relative z-10 aspect-[4/5] w-full overflow-hidden bg-white border-2 border-black shadow-[6px_6px_0px_#000000]">
        {/* Category Pill in top-right */}
        <div className="absolute top-3.5 right-3.5 z-20 px-3 py-1 bg-black/85 backdrop-blur-sm border border-black text-[10px] font-mono font-bold tracking-widest text-white uppercase shadow-[1.5px_1.5px_0px_#C9971C]">
          {project.category}
        </div>

        {/* Project Image */}
        <Image
          src={project.image || "/images/projects/fake-news-detector.jpg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 420px"
          priority={index === 0}
          unoptimized
        />

        {/* Gold Gradient Overlay with mix-blend-multiply */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-transparent via-[#C9971C]/25 to-[#C9971C]/60 mix-blend-multiply"
        />

        {/* Floating "View case study" Pill in Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white font-display text-sm uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#C9971C]">
              <span>VIEW CASE STUDY</span>
              <ArrowRight className="w-4 h-4 text-[#C9971C]" />
            </span>
          </div>
        </div>
      </div>

      {/* Info Below Image */}
      <div className="mt-4 space-y-2 relative z-10">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl sm:text-3xl text-black uppercase tracking-tight group-hover:text-[#C9971C] transition-colors duration-300">
            {project.title}
          </h3>
          <span className="w-2.5 h-2.5 rounded-full bg-[#C9971C] border border-black mt-2 shrink-0" />
        </div>

        <p className="font-mono text-xs text-black/75 line-clamp-2 leading-relaxed">
          {project.engineeringFocus}
        </p>

        {/* Tech Stack Pills (Up to 4 tags) */}
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] font-bold text-black bg-white px-2.5 py-0.5 border border-black shadow-[1.5px_1.5px_0px_#000000]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);
  const targetRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth scroll translation for desktop horizontal track
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="work" className="relative bg-[#EFEFEA] text-black border-b-2 border-black scroll-mt-[57px]">
      {/* DESKTOP (md breakpoint and up): Sticky Scroll-Driven Horizontal Track */}
      <div ref={targetRef} className="hidden md:block relative h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-between py-12 px-6 lg:px-12 overflow-hidden max-w-7xl mx-auto w-full">
          {/* Eyebrow Header */}
          <div>
            <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
              <span className="w-2.5 h-2.5 bg-[#C9971C] border border-black inline-block" />
              <span className="font-mono text-xs font-bold tracking-widest text-black uppercase">
                SELECTED WORK
              </span>
              <span className="font-editorial-italic text-sm sm:text-base text-[#C9971C] font-semibold tracking-tight select-none">
                / scroll to explore projects
              </span>
            </div>
            <h2 className="font-display font-normal text-4xl lg:text-5xl text-black leading-[0.96] tracking-tight uppercase">
              THREE PROJECTS, <br />
              <span className="font-editorial-italic normal-case text-[#C9971C] font-semibold tracking-tight">three</span> SHIPPED SYSTEMS.
            </h2>
          </div>

          {/* Horizontal Track of Project Cards */}
          <div className="relative overflow-visible my-auto py-6">
            <motion.div style={{ x }} className="flex items-center gap-10 lg:gap-12 pl-2">
              {PROJECTS.map((project, idx) => (
                <div key={project.slug} className="w-[380px] lg:w-[420px] shrink-0">
                  <ProjectCard
                    project={project}
                    onInspect={(slug) => setSelectedSlug(slug)}
                    index={idx}
                  />
                </div>
              ))}

              {/* End of Selection Slide */}
              <div className="w-[320px] lg:w-[360px] shrink-0 bg-white border-2 border-black p-8 shadow-[6px_6px_0px_#000000] flex flex-col justify-center">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9971C] block mb-2">
                  END OF SELECTION
                </span>
                <h3 className="font-display text-3xl text-black uppercase tracking-tight mb-3">
                  READY TO BUILD?
                </h3>
                <p className="font-mono text-xs text-black/80 leading-relaxed mb-6">
                  Explore full repositories on GitHub or get in touch for custom engineering engagements.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://github.com/jaiyan-th"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-display text-sm tracking-wider uppercase px-5 py-2.5 border-2 border-black shadow-[2px_2px_0px_#C9971C] hover:bg-[#C9971C] hover:text-black transition-colors inline-flex items-center justify-between"
                  >
                    <span>VIEW GITHUB</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="bg-white text-black font-display text-sm tracking-wider uppercase px-5 py-2.5 border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#EFEFEA] transition-colors inline-flex items-center justify-between"
                  >
                    <span>CONTACT ME</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full pt-4">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-black/60 uppercase mb-2">
              <span>01 / 03 PROJECTS</span>
              <span>SCROLL DOWN ↓</span>
            </div>
            <div className="w-full h-2 bg-white border-2 border-black overflow-hidden shadow-[2px_2px_0px_#000000]">
              <motion.div style={{ scaleX }} className="h-full bg-[#C9971C] origin-left" />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET (below md breakpoint): Normal Vertical Grid */}
      <div className="block md:hidden py-16 px-4 sm:px-6">
        {/* Eyebrow Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
            <span className="w-2.5 h-2.5 bg-[#C9971C] border border-black inline-block" />
            <span className="font-mono text-xs font-bold tracking-widest text-black uppercase">
              SELECTED WORK
            </span>
            <span className="font-editorial-italic text-sm text-[#C9971C] font-semibold tracking-tight select-none">
              / real systems shipped
            </span>
          </div>
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-black leading-[0.96] tracking-tight uppercase">
            THREE PROJECTS, <br />
            <span className="font-editorial-italic normal-case text-[#C9971C] font-semibold tracking-tight">three</span> SHIPPED SYSTEMS.
          </h2>
        </div>

        {/* 1 Column on Mobile, 2 Columns on Tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8">
          {PROJECTS.map((project, idx) => (
            <div key={project.slug}>
              <ProjectCard
                project={project}
                onInspect={(slug) => setSelectedSlug(slug)}
                index={idx}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      <ProjectDialog slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
    </section>
  );
}
