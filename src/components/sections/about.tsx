"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

import { EyebrowPill } from "@/components/ui/eyebrow-pill";

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || shouldReduceMotion || !photoContainerRef.current) return;
    const rect = photoContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPhotoTilt({
      x: -y * 8,
      y: x * 8,
    });
  };

  const handlePhotoMouseLeave = () => {
    setPhotoTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="about"
      aria-label="01 About Jaiyanth B"
      className="relative min-h-[90vh] flex flex-col justify-center section-padding border-t-2 border-[#111111] bg-[#F5F0E6] scroll-mt-20 perspective-1200 transition-colors"
    >
      <div className="site-container max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b-2 border-[#111111] gap-3">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#6C47FF]" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#111111]">
                BACKGROUND &amp; VALUES
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(24px,3.2vw,36px)] text-[#111111] leading-tight tracking-tight">
              About Jaiyanth B.
            </h2>
          </div>
          <span className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-[#555555]">
            Engineering Philosophy &amp; Story
          </span>
        </Reveal>

        {/* Clean 2-Column Layout: Text on Left (Simple & Unboxed), Photo on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Simple Editorial Content (No Box Clutter) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Mission Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-5 select-none">
              <span className="w-2 h-2 rounded-full bg-[#6C47FF]" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#111111]">
                ENGINEERING PHILOSOPHY
              </span>
            </div>

            {/* Clear Medium Headline */}
            <h3 className="font-sans font-bold text-[clamp(22px,2.8vw,32px)] text-[#111111] leading-snug tracking-tight mb-5">
              Engineering applied AI systems with deterministic grounding and production reliability.
            </h3>

            {/* Simple Unboxed Paragraphs */}
            <div className="space-y-4 font-sans text-[15px] sm:text-[16px] text-[#333333] leading-relaxed max-w-2xl mb-6">
              <p>
                I am a Computer Science &amp; Business Systems (CSBS) student, Batch 2023–2027, at V.S.B. Engineering College. My academic curriculum unites core computing principles, data structures, and algorithms with modern enterprise architectures and business technology.
              </p>
              <p>
                Alongside my coursework at VSB Engineering College, I build practical software systems — specializing in applied AI engineering, grounded Retrieval-Augmented Generation (RAG) pipelines, and responsive full-stack applications built for reliability and real-world utility.
              </p>
            </div>

            {/* Simple Meta Line (Education & Location) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] font-mono text-[11px] font-bold text-[#111111] uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-[#8B5CF6]" />
                <span>B.Tech CSBS &apos;27 · 2023–2027 · VSB Eng College</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] font-mono text-[11px] font-bold text-[#111111] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span>Karur, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Tilting Portrait Photo Card */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end w-full perspective-1200 pt-4 lg:pt-0">
            <div
              ref={photoContainerRef}
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={handlePhotoMouseLeave}
              className="group relative w-full max-w-[360px] sm:max-w-[400px] aspect-square preserve-3d cursor-pointer"
            >
              {/* Hard Offset Shadow Plate */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl bg-[#111111]/10 transition-transform duration-150 ease-out"
                style={{
                  transform:
                    isMobile || shouldReduceMotion
                      ? "translate3d(8px, 8px, -40px)"
                      : `translate3d(${8 - photoTilt.y * 1.5}px, ${8 + photoTilt.x * 1.5}px, -40px)`,
                }}
              />

              {/* Photo Card with 3D Tilt */}
              <div
                className="relative w-full h-full transition-transform duration-100 ease-out will-change-transform preserve-3d"
                style={{
                  transform:
                    isMobile || shouldReduceMotion
                      ? "none"
                      : `rotateX(${photoTilt.x}deg) rotateY(${photoTilt.y}deg) translateZ(20px)`,
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-3xl bg-[#F5F3EE] shadow-[6px_6px_0px_#111111] border-2 border-[#111111]">
                  <Image
                    src="/images/jaiyanth-about.jpg"
                    alt="Jaiyanth B — Applied AI & Full-Stack Engineer"
                    fill
                    priority
                    className="object-cover object-center filter grayscale contrast-105 transition-all duration-700 group-hover:scale-[1.04] group-hover:filter-none"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                  />
                  <div className="pointer-events-none absolute -inset-full bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
