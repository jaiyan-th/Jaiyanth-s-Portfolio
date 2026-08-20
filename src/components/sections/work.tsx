"use client";

import * as React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { motion } from "motion/react";
import { PROJECTS } from "@/data/portfolio";

export function Work() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

  return (
    <section id="work" className="relative bg-[#0B0C0E] border-b border-[#232323] py-16 md:py-24 text-[#F5F3EF] bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 border-b border-[#232323] pb-8"
        >
          <span className="font-mono text-xs font-bold text-[#6D2932] tracking-widest uppercase block mb-1">
            03 —— SELECTED WORK
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[#F5F3EF] leading-[1.06] tracking-tight uppercase">
            THREE PROJECTS, <br />
            <span className="text-[#6D2932]">THREE SYSTEMS.</span>
          </h2>
          <p className="font-sans text-sm text-[#9A958D] mt-3 font-normal">
            Each project represents a fully realized, debugged, and integrated software artifact.
          </p>
        </motion.div>

        {/* Minimal Case-Study Entries Layout (Text-Forward, No Heavy Cards) */}
        <div className="space-y-16">
          {PROJECTS.map((project, index) => {
            const projectNum = String(index + 1).padStart(2, "0");

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="border-b border-[#232323] pb-14 grid lg:grid-cols-12 gap-8 items-start"
              >
                {/* Number & Category */}
                <div className="lg:col-span-3 space-y-1">
                  <span className="font-mono text-xs font-bold text-[#6D2932] tracking-widest uppercase block">
                    CASE STUDY {projectNum} / {project.category}
                  </span>
                  <span className="font-mono text-xs text-[#9A958D] uppercase block">
                    {project.layout.toUpperCase()} ARCHITECTURE
                  </span>
                </div>

                {/* Main Content Details */}
                <div className="lg:col-span-9 space-y-5">
                  <h3 className="font-heading font-black text-2xl sm:text-4xl text-[#F5F3EF] tracking-tight uppercase leading-tight">
                    {project.title}
                  </h3>

                  <p className="font-sans text-base text-[#F5F3EF]/90 leading-relaxed font-normal">
                    {project.summary}
                  </p>

                  <div className="border-l-2 border-[#6D2932] pl-4 py-1">
                    <span className="font-mono text-xs text-[#9A958D] font-bold uppercase tracking-wider block mb-1">
                      ENGINEERING FOCUS:
                    </span>
                    <p className="font-mono text-xs text-[#F5F3EF] font-semibold">
                      {project.engineeringFocus}
                    </p>
                  </div>

                  {/* Inline Tech Stack (Plain Text) */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#9A958D] pt-1">
                    <span className="text-[#F5F3EF] font-bold">STACK:</span>
                    <span>{project.stack.join(" · ")}</span>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex flex-wrap items-center gap-6">
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(project.slug)}
                      className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5F3EF] hover:text-[#6D2932] transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>INSPECT CASE STUDY</span>
                      <ArrowRight className="w-4 h-4 text-[#6D2932]" />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs font-bold uppercase tracking-widest text-[#9A958D] hover:text-[#F5F3EF] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>LIVE DEMO</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Project Inspection Dialog */}
      <ProjectDialog slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
    </section>
  );
}
