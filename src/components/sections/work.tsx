"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { motion } from "motion/react";
import { PROJECTS } from "@/data/portfolio";

export function Work() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.children[index]?.clientWidth || 0;
    const gap = 32; // 2rem gap
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, currentIndex - 1);
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(PROJECTS.length - 1, currentIndex + 1);
    scrollToIndex(nextIdx);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = (container.children[0]?.clientWidth || 1) + 32;
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx !== currentIndex && newIdx >= 0 && newIdx < PROJECTS.length) {
      setCurrentIndex(newIdx);
    }
  };

  return (
    <section id="work" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-16 md:py-24 scroll-mt-[57px] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header + Sideways Navigation Controls */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              <span className="w-2.5 h-2.5 bg-[#8E0000] border border-black inline-block" />
              <span className="font-mono text-xs font-bold tracking-widest text-black uppercase">
                SELECTED WORK
              </span>
              <span className="font-editorial-italic text-sm sm:text-base text-[#8E0000] font-semibold tracking-tight select-none">
                / scroll sideways
              </span>
            </div>
            <h2 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-black leading-[0.96] tracking-tight uppercase">
              THREE PROJECTS, <br />
              <span className="font-editorial-italic normal-case text-[#8E0000] font-semibold tracking-tight">three</span> SHIPPED SYSTEMS.
            </h2>
          </motion.div>

          {/* Sideways Scroll Action Buttons */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-black bg-white px-3 py-2 border-2 border-black shadow-[2px_2px_0px_#000000]">
              0{currentIndex + 1} / 0{PROJECTS.length}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous project"
              className="p-2.5 bg-white disabled:opacity-40 border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#8E0000] hover:text-white transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === PROJECTS.length - 1}
              aria-label="Next project"
              className="p-2.5 bg-white disabled:opacity-40 border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#8E0000] hover:text-white transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Sideways Scrolling Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:none cursor-grab active:cursor-grabbing"
        >
          {PROJECTS.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
              className="w-[88vw] sm:w-[580px] lg:w-[680px] shrink-0 snap-start bg-white border-2 border-black shadow-[8px_8px_0px_#000000] flex flex-col justify-between overflow-hidden"
            >
              {/* Card Header Tag */}
              <div className="bg-[#8E0000] border-b-2 border-black px-5 py-3 flex items-center justify-between text-white">
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                  PROJECT {project.number} // {project.category}
                </span>
                <span className="font-editorial-italic text-xs text-white/90 font-medium">
                  production-ready
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                {/* Title & Pills */}
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl text-black uppercase tracking-tight mb-3">
                    {project.title}
                  </h3>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs font-bold text-black bg-[#EFEFEA] px-2.5 py-1 border border-black shadow-[1px_1px_0px_#000000]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Image Showcase */}
                <div className="relative w-full h-[220px] sm:h-[260px] border-2 border-black shadow-[4px_4px_0px_#000000] overflow-hidden group">
                  <Image
                    src={project.image || "/images/projects/fake-news-detector.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 680px"
                    priority
                    unoptimized
                  />
                </div>

                {/* Summary */}
                <p className="font-sans text-sm sm:text-base text-black/90 font-semibold leading-relaxed">
                  {project.summary}
                </p>

                {/* Engineering Outcome Box */}
                <div className="border-l-4 border-[#8E0000] bg-[#EFEFEA] p-4 border border-black shadow-[2px_2px_0px_#000000]">
                  <span className="font-mono text-[10px] font-bold text-black/70 uppercase tracking-widest block mb-1">
                    ENGINEERING OUTCOME
                  </span>
                  <p className="font-mono text-xs font-bold text-black leading-relaxed">
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
            </motion.article>
          ))}
        </div>

        {/* Bottom Carousel Indicator Pills */}
        <div className="flex justify-center items-center gap-2.5 mt-4">
          {PROJECTS.map((p, idx) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`h-2.5 transition-all border border-black cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-[#8E0000] shadow-[1px_1px_0px_#000000]"
                  : "w-2.5 bg-white hover:bg-black/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Project Inspection Modal */}
      <ProjectDialog slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
    </section>
  );
}
