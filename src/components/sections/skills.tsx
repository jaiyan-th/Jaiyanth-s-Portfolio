"use client";

import * as React from "react";
import { motion } from "motion/react";
import { SquareCode } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import { SectionContainer } from "@/components/layout/section-container";

const SKILL_CATEGORIES = [
  {
    title: "PROGRAMMING LANGUAGES",
    skills: ["Python", "SQL", "Java"],
  },
  {
    title: "FRONTEND TECHNOLOGIES",
    skills: ["HTML", "CSS", "React", "Tailwind CSS", "JavaScript"],
  },
  {
    title: "BACKEND TECHNOLOGIES",
    skills: ["FastAPI", "Flask", "REST APIs", "JWT Authentication"],
  },
  {
    title: "DATABASES",
    skills: ["Supabase", "MySQL", "PostgreSQL", "Qdrant (Vector Database)"],
  },
  {
    title: "AI & ML",
    skills: ["Machine Learning", "NLP", "RAG", "LangChain", "Prompt Engineering"],
  },
  {
    title: "TOOLS",
    skills: ["Git", "GitHub", "Postman", "Figma", "Stitch", "Power BI"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative bg-[#0A0A0A] text-[#F5F5F0] border-b-[3px] border-white/20 py-20 md:py-28 scroll-mt-20">
      <SectionContainer className="space-y-16">
        {/* Header Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpVariants}
          className="space-y-4"
        >
          {/* Sticker Label with Square Icon and Italic Lime Green Text */}
          <div className="flex items-center gap-2.5">
            <span className="sticker-badge bg-[#A3E635] text-[#0A0A0A] -rotate-1">
              <SquareCode className="w-3.5 h-3.5 text-[#0A0A0A]" />
              STACK
            </span>
            <span className="font-body italic text-[#A3E635] text-sm sm:text-base font-semibold">
              / what I reach for
            </span>
          </div>

          {/* Section Headline with ONE italic accent word (build) */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-extrabold text-[#F5F5F0] leading-[1.08] tracking-tight">
            The stack I <span className="italic text-[#A3E635]">build</span> with.
          </h2>
        </motion.div>

        {/* Flat Grid: 2 rows x 3 columns, enlarged like skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-14 gap-y-12 lg:gap-y-16">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="space-y-4"
            >
              {/* Category Label + Thin Accent Underline Rule */}
              <div>
                <h3 className="font-label-caps text-sm sm:text-[15px] md:text-base text-[#F5F5F0] font-extrabold tracking-wider uppercase">
                  {category.title}
                </h3>
                <div className="w-16 h-[3px] bg-[#A3E635] mt-2 mb-4" />
              </div>

              {/* Skills as Individual Pill Badges: enlarged padding and text */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border-[1.5px] border-white/20 hover:border-[#A3E635] bg-transparent text-[#F5F5F0] hover:text-[#A3E635] transition-colors px-4 py-2 sm:px-4.5 sm:py-2.5 font-sans text-xs sm:text-sm md:text-[15px] font-semibold rounded-none inline-block leading-snug"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Line Under Hairline Divider */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="font-label-caps text-xs sm:text-sm text-[#9CA3AF] tracking-widest uppercase font-semibold">
            IEEE Published · 4 Production-Ready Projects Shipped
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
