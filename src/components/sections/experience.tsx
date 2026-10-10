"use client";

import { motion, useReducedMotion } from "motion/react";
import { EXPERIENCE } from "@/data/portfolio";
import { Ring3D, Ring3DCardData } from "@/components/interactive/ring3d";

export function Experience() {
  const shouldReduceMotion = useReducedMotion();

  const experienceCards: Ring3DCardData[] = [
    {
      id: "experience-brainery-spot",
      label: "INDUSTRY INTERNSHIP",
      date: EXPERIENCE.period,
      title: `${EXPERIENCE.role} · ${EXPERIENCE.organisation}`,
      description: EXPERIENCE.reflection,
      rows: [
        { key: "ROLE", value: EXPERIENCE.role },
        { key: "ORG", value: EXPERIENCE.organisation },
        { key: "LOCATION", value: "Coimbatore, India" },
        { key: "STACK", value: "Python, LangChain, FastAPI, RAG" },
      ],
      cardIndex: 0,
    },
  ];

  return (
    <section
      id="experience"
      aria-label="03 Work Experience & Internship"
      className="relative py-16 sm:py-20 border-t border-[#E6E3DC] bg-transparent scroll-mt-20"
    >
      <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-8 xl:px-0">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 pb-5 border-b border-[#E6E3DC]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-accent-hover tracking-widest uppercase font-semibold">
              03
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A]">
              Experience
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] mt-2 sm:mt-0">
            Applied AI & Industry Internship
          </span>
        </motion.div>

        {/* 3D Ring / Tilt Presentation */}
        <Ring3D
          items={experienceCards}
          ariaLabel="Work Experience & Industry Internship"
        />
      </div>
    </section>
  );
}
