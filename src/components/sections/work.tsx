"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";

interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View case study for ${project.title}`}
      className="group relative cursor-pointer select-none [perspective:1000px] w-full text-left bg-transparent p-0 border-0 outline-none focus-visible:ring-2 focus-visible:ring-[#C9971C] focus-visible:ring-offset-4 focus-visible:ring-offset-[#EFEFEA] transition-shadow rounded-sm block"
    >
      {/* Giant Translucent Watermark Number behind/behind-left of card top */}
      <span
        aria-hidden="true"
        className="absolute -top-8 sm:-top-10 -left-2 z-0 font-display text-[6rem] sm:text-[7.5rem] md:text-[8.5rem] text-black/10 leading-none pointer-events-none select-none"
      >
        0{index + 1}
      </span>

      {/* Main Image Frame (Calibrated 16/10 aspect ratio with 2px black border & brutalist shadow) */}
      <div className="relative z-10 aspect-[16/10] w-full overflow-hidden bg-white border-2 border-black shadow-[6px_6px_0px_#000000]">
        {/* Category Pill in top-right */}
        <div
          aria-hidden="true"
          className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-black/85 backdrop-blur-sm border border-black text-[10px] font-mono font-bold tracking-widest text-white uppercase shadow-[1.5px_1.5px_0px_#C9971C]"
        >
          {project.category}
        </div>

        {/* Project Image */}
        <Image
          src={project.image || "/images/projects/fake-news-detector.jpg"}
          alt=""
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
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white font-display text-xs sm:text-sm uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#C9971C]">
              <span>VIEW CASE STUDY</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9971C]" />
            </span>
          </div>
        </div>
      </div>

      {/* Info Below Image */}
      <div className="mt-3.5 space-y-1.5 relative z-10">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl sm:text-2xl text-black uppercase tracking-tight group-hover:text-[#C9971C] transition-colors duration-300">
            {project.title}
          </h3>
          <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#C9971C] border border-black mt-1.5 shrink-0" />
        </div>

        <p className="font-mono text-xs text-black/75 line-clamp-2 leading-relaxed">
          {project.engineeringFocus}
        </p>

        {/* Tech Stack Pills (Up to 4 tags) */}
        <div aria-hidden="true" className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] sm:text-[11px] font-bold text-black bg-white px-2.5 py-0.5 border border-black shadow-[1.5px_1.5px_0px_#000000]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function Work() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const sectionRef = React.useRef<HTMLElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.children[index]?.clientWidth || 0;
    const gap = 32;
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
    const nextIdx = Math.min(PROJECTS.length, currentIndex + 1);
    scrollToIndex(nextIdx);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = (container.children[0]?.clientWidth || 1) + 32;
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx !== currentIndex && newIdx >= 0 && newIdx <= PROJECTS.length) {
      setCurrentIndex(newIdx);
    }
  };

  // Scroll sideways while inside Work cards, and naturally continue vertical page scrolling once completed
  React.useEffect(() => {
    const el = sectionRef.current;
    const scrollEl = scrollRef.current;
    if (!el || !scrollEl) return;

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const atStart = scrollEl.scrollLeft <= 6;
      const atEnd = scrollEl.scrollLeft + scrollEl.clientWidth >= scrollEl.scrollWidth - 6;

      // Intercept and glide sideways only if there are still cards to scroll in that direction
      if ((delta > 0 && !atEnd) || (delta < 0 && !atStart)) {
        e.preventDefault();
        scrollEl.scrollBy({
          left: delta * 0.85,
          behavior: "auto",
        });
      }
      // Once side scroll is complete (atEnd on down scroll, or atStart on up scroll),
      // the event passes through naturally so you can visit the other sections below/above
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[#EFEFEA] text-black border-b-2 border-black scroll-mt-[57px] py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Eyebrow Header + Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
              <span className="w-2.5 h-2.5 bg-[#C9971C] border border-black inline-block" />
              <span className="font-mono text-xs font-bold tracking-widest text-black uppercase">
                SELECTED WORK
              </span>
              <span className="font-editorial-italic text-sm sm:text-base text-[#C9971C] font-semibold tracking-tight select-none">
                / scroll sideways to explore
              </span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-black leading-[0.96] tracking-tight uppercase">
              THREE PROJECTS, <br />
              <span className="font-editorial-italic normal-case text-[#C9971C] font-semibold tracking-tight">three</span> SHIPPED SYSTEMS.
            </h2>
          </div>

          {/* Navigation Arrows & Counter */}
          <div className="hidden md:flex items-center gap-3 self-end">
            <span className="font-mono text-xs font-bold text-black/60 uppercase mr-2">
              0{Math.min(currentIndex + 1, PROJECTS.length)} / 0{PROJECTS.length}
            </span>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous project"
              className="p-2.5 border-2 border-black bg-white shadow-[2px_2px_0px_#000000] disabled:opacity-40 hover:bg-[#EFEFEA] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= PROJECTS.length}
              aria-label="Next project"
              className="p-2.5 border-2 border-black bg-white shadow-[2px_2px_0px_#000000] disabled:opacity-40 hover:bg-[#EFEFEA] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Sideways Carousel Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-8 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-none no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={project.slug}
              className="w-[85vw] sm:w-[380px] lg:w-[420px] shrink-0 snap-start"
            >
              <ProjectCard project={project} index={idx} />
            </div>
          ))}

          {/* End of Selection Slide */}
          <div className="w-[85vw] sm:w-[320px] lg:w-[360px] shrink-0 snap-start bg-white border-2 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000000] flex flex-col justify-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9971C] block mb-2">
              END OF SELECTION
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-black uppercase tracking-tight mb-2">
              READY TO BUILD?
            </h3>
            <p className="font-mono text-xs text-black/80 leading-relaxed mb-6">
              Explore all repositories on GitHub or get in touch for custom engineering engagements.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://github.com/jaiyan-th"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white font-display text-xs sm:text-sm tracking-wider uppercase px-4 py-2.5 border-2 border-black shadow-[2px_2px_0px_#C9971C] hover:bg-[#C9971C] hover:text-black transition-colors inline-flex items-center justify-between"
              >
                <span>VIEW GITHUB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                className="bg-white text-black font-display text-xs sm:text-sm tracking-wider uppercase px-4 py-2.5 border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#EFEFEA] transition-colors inline-flex items-center justify-between"
              >
                <span>CONTACT ME</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Indicator Track */}
        <div className="flex items-center justify-between pt-4 border-t border-black/15">
          <div className="flex items-center gap-2">
            {PROJECTS.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => scrollToIndex(i)}
                aria-label={`Scroll to project 0${i + 1}`}
                className={`h-2 transition-all duration-300 border border-black ${
                  currentIndex === i
                    ? "w-8 bg-[#C9971C]"
                    : "w-2 bg-white hover:bg-black/30"
                }`}
              />
            ))}
            <button
              onClick={() => scrollToIndex(PROJECTS.length)}
              aria-label="Scroll to end slide"
              className={`h-2 transition-all duration-300 border border-black ${
                currentIndex >= PROJECTS.length
                  ? "w-8 bg-[#C9971C]"
                  : "w-2 bg-white hover:bg-black/30"
              }`}
            />
          </div>

          <div className="font-mono text-[11px] font-bold text-black/60 uppercase">
            SCROLL SIDEWAYS OR DRAG →
          </div>
        </div>
      </div>
    </section>
  );
}
