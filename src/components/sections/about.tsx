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

  // 3D Tilt toward cursor for portrait photograph
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

  const paragraphVariants = {
    hidden: {
      opacity: 0,
      rotateX: shouldReduceMotion || isMobile ? 0 : 20,
      y: 20,
      translateZ: shouldReduceMotion || isMobile ? 0 : -30,
    },
    visible: (custom: number) => ({
      opacity: 1,
      rotateX: 0,
      y: 0,
      translateZ: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.12 + custom * 0.1,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="about"
      aria-label="01 About Jaiyanth B"
      className="relative min-h-[100svh] flex flex-col justify-center section-padding border-t-2 border-[#111111]/20 bg-[#ECE9E1]/35 scroll-mt-16 perspective-1200 transition-colors"
    >
      <div className="site-container">
        {/* Section Header with Eyebrow Pill and Instrument Serif H2 */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b-[1.5px] border-[#111111]/20 gap-3">
          <div className="flex flex-col gap-2.5">
            <EyebrowPill accent="ABOUT" text="BACKGROUND & VALUES" />
            <h2 className="font-sans font-bold text-fluid-h2 text-[#111111] leading-[1.05] tracking-[-0.035em]">
              About{" "}
              <em className="accent font-serif-italic italic text-accent font-normal accent-underline">
                Jaiyanth B
              </em>
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#555555]">
            Background, Story &amp; Values
          </span>
        </Reveal>

        {/* Section Intro Paragraph with 2px solid accent left vertical line */}
        <div className="lead-intro mb-6">
          <p>
            Building systems where applied AI meets production reliability, context-grounded retrieval pipelines, and verifiable data provenance.
          </p>
        </div>

        {/* Main Content Grid: On <1024px, photo stacks FIRST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* Photo Column: 2/5 on desktop */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex items-start justify-center w-full perspective-1200">
            <div
              ref={photoContainerRef}
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={handlePhotoMouseLeave}
              className="group relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-full aspect-square preserve-3d cursor-pointer"
            >
              {/* Hard Offset Shadow Plate */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-[#111111]/10 transition-transform duration-150 ease-out"
                style={{
                  transform:
                    isMobile || shouldReduceMotion
                      ? "translate3d(8px, 8px, -40px)"
                      : `translate3d(${8 - photoTilt.y * 1.5}px, ${8 + photoTilt.x * 1.5}px, -40px)`,
                }}
              />

              {/* Photo Card with 3D Tilt Toward Cursor */}
              <div
                className="relative w-full h-full overflow-hidden rounded-2xl bg-[#F5F3EE] transition-transform duration-100 ease-out will-change-transform shadow-[6px_6px_0px_#111111] border-2 border-[#111111]"
                style={{
                  transform:
                    isMobile || shouldReduceMotion
                      ? "none"
                      : `rotateX(${photoTilt.x}deg) rotateY(${photoTilt.y}deg) translateZ(20px)`,
                }}
              >
                <Image
                  src="/images/jaiyanth-about.jpg"
                  alt="Jaiyanth B — Applied AI & Full-Stack Engineer"
                  fill
                  priority
                  className="object-cover object-center filter grayscale contrast-105 transition-all duration-700 group-hover:scale-[1.04] group-hover:filter-none"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                />

                {/* Holographic light sheen on hover */}
                <div className="pointer-events-none absolute -inset-full bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Floating Glass Badges (Mono 11px uppercase) */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8, x: -16 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -top-3 -left-3 z-20 pointer-events-none"
              >
                <span className="backdrop-blur-md bg-white border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] text-[#111111] font-mono text-[11px] uppercase tracking-[0.08em] font-medium px-3.5 py-1 rounded-full inline-block">
                  B.TECH CSBS &apos;26
                </span>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8, x: 16 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="absolute -bottom-3 -right-3 z-20 pointer-events-none"
              >
                <span className="backdrop-blur-md bg-white border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] text-[#111111] font-mono text-[11px] uppercase tracking-[0.08em] font-medium px-3.5 py-1 rounded-full gap-2 inline-flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#E8472B] animate-pulse" />
                  IEEE CO-AUTHOR
                </span>
              </motion.div>
            </div>
          </div>

          {/* Text Column: 3/5 on desktop */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-between preserve-3d">
            <div>
              {/* Category Eyebrow */}
              <div className="mb-4">
                <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] text-[#111111] font-mono text-[11px] uppercase tracking-[0.08em] font-medium inline-block">
                  ENGINEERING PHILOSOPHY
                </span>
              </div>

              {/* Card Headline: Inter with italic accent */}
              <h3 className="font-sans font-bold text-fluid-h3 text-[#111111] leading-snug mb-3">
                Building systems where{" "}
                <em className="accent font-serif-italic italic text-accent font-normal">applied AI</em>{" "}
                meets production reliability and verifiable data provenance.
              </h3>

              {/* Staggered Paragraphs: Inter, muted gray, tightened spacing */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] mb-4 space-y-3 font-sans text-[15px] text-[var(--body)] leading-relaxed font-normal perspective-1200 relative overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#E8472B] via-[#E8472B]/40 to-transparent" />
                <motion.p
                  custom={0}
                  variants={paragraphVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  I&apos;m an Applied AI and Full-Stack Engineer who believes the most impactful software happens when you refuse to treat models as magic black boxes. Rather than wrapping raw LLM endpoints in thin veneers, I build the vector retrieval pipelines, context grounding layers, and strict database invariants that make AI trustworthy.
                </motion.p>
                <motion.p
                  custom={1}
                  variants={paragraphVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  My engineering journey spans end-to-end systems: from architecting sub-second RAG fact-verification engines with Qdrant and LangChain, to multi-model agentic career platforms with Groq and Mistral, to high-assurance vaults backed by AES-256-GCM authenticated encryption and Argon2id memory-hard key derivation.
                </motion.p>
                <motion.p
                  custom={2}
                  variants={paragraphVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  I also co-authored a peer-reviewed research paper accepted at IEEE ICETSIS 2026 Bahrain, focusing on multimodal diagnostic triage by uniting clinical computer vision with explainable conversational flows.
                </motion.p>
              </div>

              {/* Education Credential Card */}
              <motion.div
                initial={
                  shouldReduceMotion || isMobile
                    ? { opacity: 0, y: 16 }
                    : { opacity: 0, x: -36, translateZ: -60 }
                }
                whileInView={{ opacity: 1, x: 0, y: 0, translateZ: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -3, scale: 1.01 }}
                className="group flex items-start gap-4 mb-4 p-5 sm:p-6 rounded-xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-[#111111] flex items-center justify-center text-white shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-[#E8472B] transition-all duration-200 shadow-sm">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start sm:items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#E8472B] font-medium">
                      Education
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#555555] font-medium">
                      2022 – 2026
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-lg sm:text-xl text-[#111111] mb-1 group-hover:text-[#E8472B] transition-colors">
                    B.Tech in Computer Science &amp;{" "}
                    <em className="accent font-serif-italic italic text-accent font-normal">Business Systems</em>
                  </h4>
                  <p className="font-sans text-[14px] text-[var(--body)] leading-relaxed">
                    Specializing in Applied AI systems, full-stack product engineering, and secure data architectures.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Outlined Pill Buttons (Inter 14px weight 500, gap 12px) */}
            <div
              className="flex flex-wrap items-center gap-3 pt-4 border-t-[1.5px] border-[#111111]/20"
            >
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer"
                className="neo-pill-btn px-[22px] py-[11px] font-sans text-[14px] font-medium group"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer"
                className="neo-pill-btn px-[22px] py-[11px] font-sans text-[14px] font-medium"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
