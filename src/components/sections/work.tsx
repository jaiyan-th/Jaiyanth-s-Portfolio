"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { motion, useScroll, useTransform } from "motion/react";
import { PROJECTS } from "@/data/portfolio";

export function Work() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);
  const targetRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Transform vertical scroll progress into horizontal translateX across the 3 cards
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  // Calculate active index for indicator badge
  const [activeIdx, setActiveIdx] = React.useState(0);
  React.useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const idx = Math.min(
        PROJECTS.length - 1,
        Math.max(0, Math.floor(latest * PROJECTS.length))
      );
      setActiveIdx(idx);
    });
  }, [scrollYProgress]);

  return (
    <section ref={targetRef} id="work" className="relative h-[300vh] bg-[#EFEFEA] text-black scroll-mt-[57px]">
      {/* Pinned Sticky Viewport Container */}
      <div className="sticky top-[57px] h-[calc(100vh-57px)] flex flex-col justify-between overflow-hidden border-b-2 border-black py-5 sm:py-6 lg:py-8">
        {/* Pinned Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <span className="w-2.5 h-2.5 bg-[#8E0000] border border-black inline-block" />
                <span className="font-mono text-xs font-bold tracking-widest text-black uppercase">
                  SELECTED WORK
                </span>
                <span className="font-editorial-italic text-sm text-[#8E0000] font-semibold tracking-tight select-none">
                  / scroll down to slide sideways
                </span>
              </div>
              <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-black leading-[0.96] tracking-tight uppercase">
                THREE PROJECTS,{" "}
                <span className="font-editorial-italic normal-case text-[#8E0000] font-semibold tracking-tight">three</span> SHIPPED SYSTEMS.
              </h2>
            </div>

            {/* Live Progress Pill & Scroll Track indicator */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-black bg-white px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000000]">
                PROJECT 0{activeIdx + 1} / 0{PROJECTS.length}
              </span>
              <div className="w-24 h-2 bg-white border border-black overflow-hidden relative shadow-[1px_1px_0px_#000000]">
                <motion.div
                  style={{ scaleX: scrollYProgress }}
                  className="h-full bg-[#8E0000] origin-left"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontally Sliding Track */}
        <div className="w-full overflow-hidden my-auto py-2">
          <motion.div
            style={{ x }}
            className="flex gap-6 sm:gap-10 lg:gap-14 px-4 sm:px-12 lg:px-20 w-max items-stretch"
          >
            {PROJECTS.map((project) => (
              <article
                key={project.slug}
                className="w-[88vw] sm:w-[620px] lg:w-[740px] xl:w-[820px] shrink-0 bg-white border-2 border-black shadow-[8px_8px_0px_#000000] flex flex-col justify-between overflow-hidden"
              >
                {/* Card Header Bar */}
                <div className="bg-[#8E0000] border-b-2 border-black px-5 py-2.5 flex items-center justify-between text-white">
                  <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                    PROJECT {project.number} // {project.category}
                  </span>
                  <span className="font-editorial-italic text-xs text-white/90 font-medium">
                    production-ready
                  </span>
                </div>

                {/* Card Content: Two Column Inner Layout on Desktop */}
                <div className="p-5 sm:p-6 lg:p-7 flex-1 grid lg:grid-cols-12 gap-6 items-center">
                  {/* Left: Details */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-black uppercase tracking-tight mb-2">
                        {project.title}
                      </h3>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] font-bold text-black bg-[#EFEFEA] px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000000]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="font-sans text-xs sm:text-sm text-black/90 font-semibold leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Engineering Outcome Box */}
                    <div className="border-l-4 border-[#8E0000] bg-[#EFEFEA] p-3 border border-black shadow-[2px_2px_0px_#000000]">
                      <span className="font-mono text-[9.5px] font-bold text-black/70 uppercase tracking-widest block mb-0.5">
                        ENGINEERING OUTCOME
                      </span>
                      <p className="font-mono text-[11px] sm:text-xs font-bold text-black leading-snug">
                        {project.engineeringFocus}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="pt-1 flex flex-wrap items-center gap-3">
                      <motion.button
                        type="button"
                        onClick={() => setSelectedSlug(project.slug)}
                        whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #000000" }}
                        whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
                        className="bg-black text-white font-display text-sm sm:text-base tracking-wider uppercase px-5 py-2 border-2 border-black shadow-[2px_2px_0px_#8E0000] inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>INSPECT CASE STUDY</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8E0000]" />
                      </motion.button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-black font-display text-sm sm:text-base tracking-wider uppercase px-5 py-2 border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#8E0000] hover:text-white transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>LIVE DEMO</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: Project Image Preview */}
                  <div className="lg:col-span-5">
                    <div className="relative w-full aspect-[4/3] border-2 border-black shadow-[4px_4px_0px_#000000] overflow-hidden group">
                      <Image
                        src={project.image || "/images/projects/fake-news-detector.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 400px"
                        priority
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        {/* Bottom Pinned Footer Indicator */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between text-xs font-mono font-bold text-black/60">
          <span>[ 01 // FAKE NEWS DETECTOR ]</span>
          <span>[ 02 // UP-SKILL ]</span>
          <span>[ 03 // CAR-RENT ]</span>
        </div>
      </div>

      {/* Project Inspection Modal */}
      <ProjectDialog slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
    </section>
  );
}
