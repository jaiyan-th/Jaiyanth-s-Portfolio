"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { Card3DTilt } from "@/components/ui/card-3d-tilt";
import { motion } from "motion/react";
import { PROJECTS } from "@/data/portfolio";

export function Work() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

  return (
    <section id="work" className="relative bg-[#FFFFFF] border-b-2 border-[#E5DCD0] py-16 md:py-24 text-[#561C24] overflow-hidden bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          <span className="font-mono text-[10px] font-bold text-[#6D2932] tracking-widest uppercase block mb-1">
            03 —— SELECTED WORK
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[#561C24] leading-[1.06] tracking-tight uppercase">
            THREE PROJECTS, <br />
            <span className="text-[#6D2932]">THREE SYSTEMS.</span>
          </h2>
          <div className="mt-4 border-l-2 border-[#6D2932] pl-4">
            <p className="font-sans text-xs sm:text-sm text-[#561C24]/80 font-semibold">
              Each project represents a fully realized, debugged, and integrated software artifact.
            </p>
          </div>
        </motion.div>

        {/* Project Cards Grid with Generous Spacing & High Visual Weight */}
        <div className="space-y-28 md:space-y-36">
          {PROJECTS.map((project, index) => {
            const projectNum = String(index + 1).padStart(2, "0");
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`grid lg:grid-cols-12 gap-10 md:gap-12 items-center ${
                  isEven ? "" : "lg:grid-flow-dense"
                }`}
              >
                {/* Image Column */}
                <div className={`lg:col-span-7 ${isEven ? "" : "lg:col-start-6"}`}>
                  <Card3DTilt glowColor="rgba(109, 41, 50, 0.2)">
                    <div className="relative aspect-[16/10] w-full border-2 border-[#561C24] overflow-hidden bg-white shadow-[8px_8px_0px_#6D2932] group rounded-sm transition-all hover:shadow-[10px_10px_0px_#561C24]">
                      {/* Top Glowing Accent Line */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#6D2932] z-20" />
                      
                      {/* Viewfinder corners */}
                      <span className="blueprint-corner blueprint-corner-tl" />
                      <span className="blueprint-corner blueprint-corner-tr" />
                      <span className="blueprint-corner blueprint-corner-bl" />
                      <span className="blueprint-corner blueprint-corner-br" />

                      <Image
                        src={project.image || `/images/projects/${project.slug}.jpg`}
                        alt={`${project.title} project screenshot`}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Card3DTilt>
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-5 space-y-5 ${isEven ? "" : "lg:col-start-1"}`}>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10.5px] font-extrabold text-[#6D2932] tracking-widest uppercase">
                      PROJECT {projectNum} / SELECTED WORK
                    </span>
                    <div className="h-[1px] flex-1 bg-[#E5DCD0]" />
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#561C24] tracking-tight uppercase leading-[1.06]">
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#561C24]/90 leading-relaxed font-medium">
                    {project.summary}
                  </p>

                  <div className="p-3.5 border-2 border-[#561C24] bg-[#F5EFE6] rounded-sm shadow-[3px_3px_0px_#561C24]">
                    <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-[#6D2932] mb-1">
                      ENGINEERING FOCUS
                    </span>
                    <p className="font-mono text-[10.5px] text-[#561C24] font-black leading-snug">
                      {project.engineeringFocus}
                    </p>
                  </div>

                  <div>
                    <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#561C24]/70 mb-2">
                      STACK
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.04, y: -1, borderColor: "#561C24" }}
                          className="font-mono text-[9.5px] font-black uppercase tracking-wider px-3 py-1 border-2 border-[#6D2932] bg-white text-[#561C24] shadow-[2px_2px_0px_#561C24] transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <motion.button
                      type="button"
                      onClick={() => setSelectedSlug(project.slug)}
                      whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #561C24" }}
                      whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #561C24" }}
                      className="bg-[#6D2932] hover:bg-[#582027] border-2 border-[#561C24] text-white font-mono text-[10.5px] font-black uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 relative shadow-[2px_2px_0px_#561C24] group cursor-pointer"
                    >
                      <span>INSPECT ARCHITECTURE</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </motion.button>

                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #6D2932" }}
                        whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #6D2932" }}
                        className="bg-white hover:bg-[#561C24]/5 border-2 border-[#561C24] text-[#561C24] font-mono text-[10.5px] font-black uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 relative shadow-[2px_2px_0px_#6D2932]"
                      >
                        <span>LIVE DEPLOYMENT</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#6D2932]" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Inspection Modal */}
      <ProjectDialog slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
    </section>
  );
}
