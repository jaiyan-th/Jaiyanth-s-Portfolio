"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { IDENTITY } from "@/data/content";
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

        {/* Bento Grid Layout: Photo + Modern Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: 3D Tilting Portrait Card */}
          <div className="lg:col-span-5 flex flex-col justify-between items-center w-full perspective-1200">
            <div
              ref={photoContainerRef}
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={handlePhotoMouseLeave}
              className="group relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-full aspect-square preserve-3d cursor-pointer"
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

                {/* Floating Neo-Brutalist Sticker Badges */}
                <div
                  className="absolute -top-3 -left-3 z-30 pointer-events-none"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8, x: -16 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="bg-[#FEF08A] border-2 border-[#111111] shadow-[2.5px_2.5px_0px_#111111] text-[#111111] font-mono text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full inline-block">
                      B.TECH CSBS &apos;26
                    </span>
                  </motion.div>
                </div>

                <div
                  className="absolute -bottom-3 -right-3 z-30 pointer-events-none"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8, x: 16 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                  >
                    <span className="bg-[#DCFCE7] border-2 border-[#111111] shadow-[2.5px_2.5px_0px_#111111] text-[#111111] font-mono text-[11px] uppercase tracking-wider font-extrabold px-3.5 py-1 rounded-full gap-2 inline-flex items-center">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                      IEEE CO-AUTHOR
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Quick Location / Availability Subline */}
            <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] text-[#111111] font-mono text-[11px] uppercase tracking-wider font-bold">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>Chennai, India · Applied AI &amp; Systems</span>
            </div>
          </div>

          {/* Right Column: Modern Asymmetric Bento Tiles */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            {/* Tile 1: Engineering Philosophy (Concise & High Impact) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              whileHover={shouldReduceMotion || isMobile ? {} : { y: -4, transition: { duration: 0.2 } }}
              className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF5] border-2 border-[#111111] shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#111111] relative overflow-hidden transition-all duration-200"
            >
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#FFD13B]" />
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-0.5 rounded-full bg-white border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] text-[#111111] font-mono text-[10.5px] uppercase tracking-wider font-extrabold">
                  MISSION
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#666666] font-semibold">
                  01 // SYSTEMS FIRST
                </span>
              </div>
              <h3 className="font-sans font-bold text-lg sm:text-xl text-[#111111] mb-2 leading-snug">
                Building reliable AI systems with deterministic guarantees.
              </h3>
              <p className="font-sans text-[14px] sm:text-[15px] text-[#333333] leading-relaxed font-normal mb-3">
                I engineer applied AI pipelines where models are not treated as black boxes, but grounded with semantic vector retrieval, strict schema invariants, and verifiable provenance.
              </p>
              <p className="font-sans text-[14px] sm:text-[15px] text-[#444444] leading-relaxed font-normal">
                From sub-second RAG fact-verification engines to conversational triage and high-assurance cryptographic stores, I prioritize deterministic reliability over hype.
              </p>
            </motion.div>

            {/* Split 2-Column Bento Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Tile 2: Education */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="p-5 sm:p-6 rounded-3xl bg-[#EDE9FE] border-2 border-[#111111] shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#111111] flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] flex items-center justify-center text-[#111111]">
                      <GraduationCap className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#111111] font-bold px-2.5 py-0.5 rounded-full bg-white border border-[#111111]">
                      2022–26
                    </span>
                  </div>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#6C47FF] font-extrabold block mb-1">
                    DEGREE
                  </span>
                  <h4 className="font-sans font-bold text-base text-[#111111] leading-snug mb-1">
                    B.Tech in Computer Science &amp; Business Systems
                  </h4>
                  <p className="font-sans text-[13px] text-[#444444] leading-relaxed">
                    Specializing in Applied AI architectures, distributed systems, and enterprise data security.
                  </p>
                </div>
              </motion.div>

              {/* Tile 3: Key Proof Points */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="p-5 sm:p-6 rounded-3xl bg-[#DCFCE7] border-2 border-[#111111] shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#111111] flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white border-2 border-[#111111] shadow-[1.5px_1.5px_0px_#111111] text-[#111111] font-mono text-[10.5px] uppercase tracking-wider font-extrabold">
                      HIGHLIGHTS
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-ping" />
                  </div>
                  <div className="space-y-2.5 mt-2">
                    <div className="flex items-baseline justify-between border-b border-[#111111]/15 pb-1.5">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#444444] font-medium">
                        Research Paper
                      </span>
                      <span className="font-sans font-bold text-[13px] text-[#111111]">
                        IEEE ICETSIS &apos;26
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between border-b border-[#111111]/15 pb-1.5">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#444444] font-medium">
                        RAG Precision
                      </span>
                      <span className="font-sans font-bold text-[13px] text-[#111111]">
                        94.2% Grounded
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#444444] font-medium">
                        Industry Internship
                      </span>
                      <span className="font-sans font-bold text-[13px] text-[#111111]">
                        AI Prototypes
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={IDENTITY.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#FFD13B] text-[#111111] font-sans text-[13px] font-bold border-2 border-[#111111] shadow-[2.5px_2.5px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
                >
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="w-4 h-4 ml-0.5 shrink-0" />
                </a>

                <a
                  href={IDENTITY.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#EDE9FE] text-[#111111] font-sans text-[13px] font-bold border-2 border-[#111111] shadow-[2.5px_2.5px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all select-none"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 ml-0.5 shrink-0" />
                </a>
              </div>

              <span className="font-mono text-[11px] uppercase tracking-wider text-[#666666] font-semibold">
                Building with precision &amp; care.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
