"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Terminal } from "lucide-react";
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
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpVariants}
          className="space-y-4"
        >
          {/* Sticker Label with Icon and Italic Accent */}
          <div className="flex items-center gap-2.5">
            <span className="sticker-badge bg-[#111111] text-white -rotate-1">
              <Terminal className="w-3.5 h-3.5 text-[#D9622B]" />
              STACK
            </span>
            <span className="font-body italic text-[#D9622B] text-sm font-semibold">
              / tools of the trade
            </span>
          </div>

          {/* Section Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#111111] tracking-tight">
            TOOLS I <span className="italic text-[#D9622B] font-black lowercase text-4xl sm:text-5xl md:text-6xl">build</span> WITH.
          </h2>
        </motion.div>

        {/* 6 Category Columns in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="neo-card p-5 bg-white space-y-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-[#111111] pb-2 mb-3">
                  <h3 className="font-label-caps text-xs text-[#111111] font-bold">
                    {category.title}
                  </h3>
                  <span className="font-mono-code text-[10px] text-[#777777] font-bold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Individual Pill Badges: Thin border, quiet, no shadow, no rotation, no color fill */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-pill bg-[#FAF3EE]/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Line Under Thin Divider */}
        <div className="border-t-[1.5px] border-[#111111]/30 pt-6 text-center">
          <p className="font-label-caps text-xs text-[#555555] tracking-widest uppercase font-semibold">
            IEEE Published · 4 Production-Ready Projects Shipped
          </p>
        </div>
      </div>
    </section>
  );
}
