"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { IDENTITY } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

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

  // 3D Tilt toward cursor for portrait photograph (max 8deg, disabled below 768px & reduced motion)
  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || shouldReduceMotion || !photoContainerRef.current) return;
    const rect = photoContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPhotoTilt({
      x: -y * 8, // rotateX
      y: x * 8,  // rotateY
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
      className="relative section-padding border-t border-[#E2DFD7] bg-transparent scroll-mt-20 perspective-1200"
    >
      <div className="site-container">
        {/* Section Header with Reusable Reveal: On phones stack right label under title */}
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-12 pb-5 border-b border-[#E2DFD7] gap-2">
          <div className="flex items-baseline gap-3 sm:gap-4">
            <span className="text-fluid-mono text-[#E5341B] tracking-widest uppercase font-extrabold">
              01
            </span>
            <h2 className="text-fluid-h2 font-extrabold tracking-[-0.03em] text-[#0A0A0A] section-draw-line">
              About
            </h2>
          </div>
          <span className="text-fluid-mono uppercase tracking-widest text-[#666666]">
            Background, Story & Engineering Values
          </span>
        </Reveal>

        {/* Main Content Grid: On <1024px, photo stacks FIRST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* Photo Column: 2/5 on desktop, on smaller screens photo is FIRST at max 420px */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex items-center justify-center w-full perspective-1200">
            <div
              ref={photoContainerRef}
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={handlePhotoMouseLeave}
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square preserve-3d cursor-pointer"
            >
              {/* Hard Offset Shadow Plate */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-[#0A0A0A]/15 transition-transform duration-150 ease-out"
                style={{
                  transform:
                    isMobile || shouldReduceMotion
                      ? "translate3d(8px, 8px, -40px)"
                      : `translate3d(${8 - photoTilt.y * 1.5}px, ${8 + photoTilt.x * 1.5}px, -40px)`,
                }}
              />

              {/* Photo Card with 3D Tilt Toward Cursor */}
              <div
                className="relative w-full h-full overflow-hidden rounded-2xl bg-[#F5F3EE] transition-transform duration-100 ease-out will-change-transform shadow-[6px_6px_0_rgba(17,17,17,0.12)]"
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
                  className="object-cover object-center filter grayscale contrast-105 transition-all duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                />
              </div>
            </div>
          </div>

          {/* Text Column: 3/5 on desktop, order-2 on smaller screens */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-between preserve-3d">
            <div>
              {/* Sticker Eyebrow */}
              <div className="mb-4">
                <span className="neo-sticker bg-[#FFE45C] text-[#0A0A0A] font-bold">
                  ENGINEERING PHILOSOPHY
                </span>
              </div>

              {/* Large Headline */}
              <h3 className="text-fluid-h3 font-extrabold tracking-[-0.03em] text-[#0A0A0A] leading-tight mb-6">
                Building systems where applied AI meets production reliability and verifiable data provenance.
              </h3>

              {/* Staggered Paragraphs rising with rotateX(20deg) */}
              <div className="space-y-4 sm:space-y-5 text-fluid-body text-[#555555] leading-relaxed font-normal mb-8 perspective-1200">
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

              {/* Education Credential: Slides in from left on Z axis */}
              <motion.div
                initial={
                  shouldReduceMotion || isMobile
                    ? { opacity: 0, y: 16 }
                    : { opacity: 0, x: -36, translateZ: -60 }
                }
                whileInView={{ opacity: 1, x: 0, y: 0, translateZ: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={shouldReduceMotion || isMobile ? {} : { y: -2 }}
                className="flex items-start gap-4 mb-8 p-4 sm:p-5 rounded-md bg-white hard-shadow"
              >
                <div className="w-10 h-10 rounded-md bg-[#0A0A0A] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-[2px_2px_0px_#E5341B]">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-fluid-mono uppercase tracking-wider text-[#E5341B] font-bold">
                      Education
                    </span>
                    <span className="text-fluid-mono text-[#666666] font-semibold">
                      2022 – 2026
                    </span>
                  </div>
                  <h4 className="text-fluid-small font-bold text-[#0A0A0A] mb-1">
                    B.Tech in Computer Science & Business Systems
                  </h4>
                  <p className="text-fluid-small text-[#666666] leading-relaxed">
                    Specializing in Applied AI systems, full-stack product engineering, and secure data architectures.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Allowed Outlined Pill Buttons with --space-1 gap */}
            <div
              style={{ gap: "var(--space-1)" }}
              className="flex flex-wrap items-center pt-6 border-t border-[#E2DFD7]"
            >
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer"
                className="neo-pill-btn px-6 py-2.5 text-sm sm:text-base"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 shrink-0" />
              </a>

              <a
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer"
                className="neo-pill-btn px-6 py-2.5 text-sm sm:text-base"
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
