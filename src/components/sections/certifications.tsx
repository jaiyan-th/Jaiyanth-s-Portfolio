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
    <section id="certifications" className="relative bg-[#0A0A0A] text-[#F5F5F0] border-b-[3px] border-white/20 py-16 md:py-24 scroll-mt-20">
      <SectionContainer className="space-y-14">
        {/* Header Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUpVariants}
          className="space-y-4"
        >
          {/* Sticker Badge + Beside Subtitle */}
          <div className="flex items-center gap-2.5">
            <span className="sticker-badge bg-[#A3E635] text-[#0A0A0A] -rotate-1">
              <Award className="w-3.5 h-3.5 text-[#0A0A0A]" />
              CREDENTIALS
            </span>
            <span className="font-body italic text-[#A3E635] text-sm font-semibold">
              / on record
            </span>
          </div>

          {/* Section Headline with ONE italic accent word (verified) */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-extrabold text-[#F5F5F0] leading-[1.08] tracking-tight">
            Certifications, <span className="italic text-[#A3E635]">verified.</span>
          </h2>
        </motion.div>

        {/* Flat Grid: 2 rows x 2 columns, NO card borders, NO shadows, matching Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 lg:gap-y-14">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="space-y-3"
            >
              {/* Issuer Label + Year + Thin Accent Underline Rule */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-label-caps text-xs sm:text-sm text-[#F5F5F0] font-extrabold tracking-wider uppercase">
                    {cert.issuer}
                  </h3>
                  <span className="font-mono-code text-xs text-[#9CA3AF] font-bold">
                    {cert.year}
                  </span>
                </div>
                <div className="w-12 h-[2.5px] bg-[#A3E635] mt-2 mb-3.5" />
              </div>

              {/* Certification as Individual Pill Badge: matching skill pills */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <span
                  className="border-[1.5px] border-white/20 bg-transparent text-[#F5F5F0] hover:border-[#A3E635] hover:text-[#A3E635] transition-colors px-3.5 py-1.5 font-sans text-xs sm:text-[13px] font-semibold rounded-none inline-block"
                >
                  {cert.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Line Under Hairline Divider */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="font-label-caps text-xs text-[#9CA3AF] tracking-widest uppercase font-semibold">
            4 Industry Credentials Verified · Cloud, AI &amp; Full-Stack
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
