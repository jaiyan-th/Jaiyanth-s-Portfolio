"use client";

import * as React from "react";
import { motion } from "motion/react";
import { SquareCode } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";

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
    <section id="skills" className="relative bg-[#FAF3EE] text-[#111111] border-b-[3px] border-[#111111] py-16 md:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 space-y-14">
        {/* Header Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpVariants}
          className="space-y-4"
        >
          {/* Sticker Label with Square Icon and Italic Muted Orange Text */}
          <div className="flex items-center gap-2.5">
            <span className="sticker-badge bg-[#111111] text-white -rotate-1">
              <SquareCode className="w-3.5 h-3.5 text-[#FFFFFF]" />
              STACK
            </span>
            <span className="font-body italic text-[#D9622B] text-sm font-semibold">
              / what I reach for
            </span>
          </div>

          {/* Section Headline with ONE italic accent word (build) */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
            THE STACK I <span className="italic text-[#D9622B]">build</span> WITH.
          </h2>
        </motion.div>

        {/* Flat Grid: 2 rows x 3 columns, NO card borders, NO shadows, NO rotation, NO numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="space-y-3"
            >
              {/* Category Label + Thin ~40px Black Underline Rule */}
              <div>
                <h3 className="font-label-caps text-xs sm:text-[13px] text-[#111111] font-extrabold tracking-wider">
                  {category.title}
                </h3>
                <div className="w-10 h-[2px] bg-[#111111] mt-2 mb-3" />
              </div>

              {/* Skills as Individual Pill Badges: 1.5px border, transparent bg, plain sans text */}
              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border-[1.5px] border-[#111111] bg-transparent text-[#111111] px-3 py-1 font-sans text-xs font-semibold rounded-none inline-block"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Line Under Hairline Divider */}
        <div className="border-t border-[#111111]/20 pt-8 text-center">
          <p className="font-label-caps text-xs text-[#6B6B6B] tracking-widest uppercase font-semibold">
            IEEE Published · 4 Production-Ready Projects Shipped
          </p>
        </div>
      </div>
    </section>
  );
}
