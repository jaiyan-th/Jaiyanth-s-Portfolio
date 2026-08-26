"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { motion } from "motion/react";
import { PROJECTS } from "@/data/portfolio";

export function Work() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

  return (
    <section id="work" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-20 md:py-28 scroll-mt-[57px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="flex items-center gap-2.5 mb-3 flex-wrap">
            <span className="w-2.5 h-2.5 bg-[#8E0000] border border-black inline-block" />
            <span className="font-mono text-xs font-bold tracking-widest text-black uppercase">
              SELECTED WORK
            </span>
            <span className="font-editorial-italic text-sm sm:text-base text-[#8E0000] font-semibold tracking-tight select-none">
              / real systems shipped
            </span>
          </div>
          <h2 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-black leading-[0.96] tracking-tight uppercase">
            THREE PROJECTS, <br />
            <span className="font-editorial-italic normal-case text-[#8E0000] font-semibold tracking-tight">three</span> SHIPPED SYSTEMS.
          </h2>
        </motion.div>

        {/* Selected Work List Items with Rich Image Showcases */}
        <div className="border-t-2 border-black divide-y-2 divide-black">
          {PROJECTS.map((project) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="py-14 md:py-20"
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Project Details */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Row Header: Title & Tech Stack Pills */}
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-black/60 tracking-wider block mb-1.5">
                      PROJECT {project.number} / {project.category}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-black uppercase tracking-tight mb-3">
                      {project.title}
                    </h3>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs font-bold text-black bg-white px-2.5 py-1 border border-black shadow-[1.5px_1.5px_0px_#000000]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="font-sans text-sm sm:text-base text-black/90 font-semibold max-w-2xl leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Engineering Outcome Callout */}
                  <div className="border-l-4 border-[#8E0000] bg-white p-4 border border-black shadow-[3px_3px_0px_#000000] max-w-2xl">
                    <span className="font-mono text-[10.5px] font-bold text-black/70 uppercase tracking-widest block mb-1">
                      ENGINEERING OUTCOME
                    </span>
                    <p className="font-mono text-xs sm:text-[13px] font-bold text-black leading-relaxed">
                      {project.engineeringFocus}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <motion.button
                      type="button"
                      onClick={() => setSelectedSlug(project.slug)}
                      whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #000000" }}
                      whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                      className="bg-black text-white font-display text-base sm:text-lg tracking-wider uppercase px-6 py-2.5 border-2 border-black shadow-[2px_2px_0px_#8E0000] inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>INSPECT CASE STUDY</span>
                      <ArrowRight className="w-4 h-4 text-[#8E0000]" />
                    </motion.button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black font-display text-base sm:text-lg tracking-wider uppercase px-6 py-2.5 border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#8E0000] hover:text-white transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>LIVE DEMO</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Project Image Preview Showcase */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <div className="w-full max-w-[440px] bg-white border-2 border-black shadow-[6px_6px_0px_#000000] overflow-hidden group">
                    <div className="bg-[#8E0000] border-b-2 border-black px-4 py-2 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                        PREVIEW // {project.number}
                      </span>
                      <span className="font-editorial-italic text-xs text-white/90">
                        verified
                      </span>
                    </div>
                    <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[280px]">
                      <Image
                        src={project.image || "/images/projects/fake-news-detector.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 440px"
                        priority
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Project Inspection Modal */}
      <ProjectDialog slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
    </section>
  );
}
