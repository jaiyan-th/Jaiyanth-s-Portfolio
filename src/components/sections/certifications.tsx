"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Award } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";
import { SectionContainer } from "@/components/layout/section-container";

const CERTIFICATIONS = [
  {
    index: "01",
    name: "Python Programming & Full-Stack Development",
    issuer: "Coursera",
    year: "2025",
  },
  {
    index: "02",
    name: "Artificial Intelligence: Concepts and Techniques",
    issuer: "NPTEL",
    year: "2025",
  },
  {
    index: "03",
    name: "AWS Foundations: Getting Started with AWS Cloud Essentials",
    issuer: "AWS Training & Certification",
    year: "2026",
  },
  {
    index: "04",
    name: "Certificate Program in AI & Machine Learning",
    issuer: "FutureSkills Prime (NASSCOM)",
    year: "2026",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative bg-[#FAF3EE] text-[#111111] border-b-[3px] border-[#111111] py-16 md:py-24 scroll-mt-20">
      <SectionContainer className="space-y-12">
        {/* Section Header: Plain bold black headline, no italic, no color */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpVariants}
          className="space-y-4"
        >
          {/* Sticker Badge + Beside Subtitle */}
          <div className="flex items-center gap-2.5">
            <span className="sticker-badge bg-[#111111] text-white -rotate-1">
              <Award className="w-3.5 h-3.5 text-[#FFFFFF]" />
              CREDENTIALS
            </span>
            <span className="font-body italic text-[#E5484D] text-sm font-semibold">
              / on record
            </span>
          </div>

          {/* Section Headline with ONE italic accent word (verified) */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-extrabold text-[#111111] leading-[1.08] tracking-tight">
            Certifications,{" "}
            <span className="italic text-[#E5484D]">verified.</span>
          </h2>
        </motion.div>

        {/* Grid of Thick-Bordered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="neo-card p-6 sm:p-8 bg-white space-y-4 flex flex-col justify-between min-h-[160px]"
            >
              {/* Issuer Bold + Plain Small-Caps Muted Year Text (No border, no fill) */}
              <div className="flex items-baseline justify-between border-b-2 border-[#111111] pb-3">
                <span className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-[#111111]">
                  {cert.issuer}
                </span>
                <span className="font-label-caps text-xs sm:text-sm text-[#6B6B6B] tracking-wider font-semibold">
                  {cert.year}
                </span>
              </div>

              <p className="font-body text-base sm:text-lg font-semibold text-[#222222] leading-snug">
                {cert.name}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
