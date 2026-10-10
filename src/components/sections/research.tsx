"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { RESEARCH } from "@/data/portfolio";
import { Ring3D, Ring3DCardData } from "@/components/interactive/ring3d";

export function Research() {
  const shouldReduceMotion = useReducedMotion();

  const researchCards: Ring3DCardData[] = [
    {
      id: "research-ieee-icetsis-2026",
      label: "RESEARCH PAPER",
      date: RESEARCH.date,
      title: RESEARCH.title,
      description: RESEARCH.abstract,
      rows: [
        { key: "VENUE", value: RESEARCH.venue },
        { key: "ORGANISER", value: RESEARCH.organiser },
        { key: "STATUS", value: "Published & Peer-Reviewed" },
        { key: "DOMAIN", value: "Preventive Healthcare & Multimodal AI" },
      ],
      link: "/work/preventive-ai-paper",
      cardIndex: 0,
    },
  ];

  return (
    <section
      id="research"
      aria-label="04 Research, Publications & Achievements"
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
              04
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A]">
              Research & Publication
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] mt-2 sm:mt-0">
            IEEE ICETSIS 2026 · Peer-Reviewed Conference
          </span>
        </motion.div>

        {/* 3D Ring / Tilt Presentation */}
        <Ring3D
          items={researchCards}
          ariaLabel="Research, Publications & Case Studies"
        />

        {/* Certificate link */}
        {RESEARCH.certificateUrl && (
          <div className="flex justify-center items-center mt-4">
            <a
              href={RESEARCH.certificateUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6B6B6B] hover:text-accent transition-colors"
            >
              <span>View IEEE Certificate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
