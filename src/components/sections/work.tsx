"use client";

import * as React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { motion } from "motion/react";
import { PROJECTS } from "@/data/portfolio";

export function Work() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

  return (
    <section id="work" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-[#A30000] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              SELECTED WORK
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-[52px] text-black leading-[1.05] tracking-tight uppercase">
            THREE PROJECTS, <br />
            THREE SHIPPED SYSTEMS.
          </h2>
        </motion.div>

        {/* Selected Work List Items (Exact karolbinkow.ski Selected Work Format) */}
        <div className="border-t-2 border-black divide-y-2 divide-black">
          {PROJECTS.map((project) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="py-10 space-y-6"
            >
              {/* Row Header: Title on Left, Tech Stack Pills on Right */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[10.5px] font-black uppercase text-black/60 tracking-wider block mb-1">
                    PROJECT {project.number} / {project.category}
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-4xl text-black uppercase tracking-tight">
                    {project.title}
                  </h3>
                </div>

                {/* Tech Pills (karolbinkow.ski bordered tag pills) */}
                <div className="flex flex-wrap gap-1.5">
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
              <p className="font-sans text-sm sm:text-base text-black/90 font-semibold max-w-3xl leading-relaxed">
                {project.summary}
              </p>

              {/* Outcome Bar (karolbinkow.ski left-bar callout) */}
              <div className="border-l-4 border-[#A30000] bg-white p-3.5 border border-black shadow-[3px_3px_0px_#000000] max-w-3xl">
                <span className="font-mono text-[10px] font-black text-black/70 uppercase tracking-widest block mb-1">
                  ENGINEERING OUTCOME
                </span>
                <p className="font-mono text-xs font-black text-black">
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
                  className="bg-black text-white font-mono text-xs font-black uppercase tracking-widest px-5 py-3 border-2 border-black shadow-[2px_2px_0px_#A30000] inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>INSPECT CASE STUDY</span>
                  <ArrowRight className="w-4 h-4 text-[#A30000]" />
                </motion.button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black font-mono text-xs font-black uppercase tracking-widest px-5 py-3 border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#A30000] hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
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
