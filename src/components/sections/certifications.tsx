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
    <section id="certifications" className="relative bg-canvas text-foreground border-b-[3px] border-line py-20 md:py-28 scroll-mt-20 transition-colors">
      <SectionContainer className="space-y-16">
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
            <span className="font-body italic text-[#A3E635] text-sm sm:text-base font-semibold">
              / on record
            </span>
          </div>

          {/* Section Headline with ONE italic accent word (verified) */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-extrabold text-foreground leading-[1.08] tracking-tight">
            Certifications, <span className="italic text-[#A3E635]">verified.</span>
          </h2>
        </motion.div>

        {/* Flat Grid: 2 rows x 2 columns, enlarged like skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-14 lg:gap-y-16">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="space-y-4"
            >
              {/* Issuer Label + Year + Bold Accent Underline Rule */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-label-caps text-base sm:text-lg md:text-xl text-foreground font-extrabold tracking-wider uppercase">
                    {cert.issuer}
                  </h3>
                  <span className="font-mono-code text-sm sm:text-base text-text-secondary font-bold">
                    {cert.year}
                  </span>
                </div>
                <div className="w-20 h-[3.5px] bg-[#A3E635] mt-2.5 mb-4" />
              </div>

              {/* Certification as Enlarged Pill Badge */}
              <div className="flex flex-wrap gap-3 pt-1">
                <span
                  className="border-2 border-line hover:border-[#A3E635] bg-transparent text-foreground hover:text-[#A3E635] transition-colors px-6 py-3.5 font-sans text-base sm:text-lg md:text-xl font-bold rounded-none inline-block leading-snug"
                >
                  {cert.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Line Under Hairline Divider */}
        <div className="border-t border-line pt-8 text-center">
          <p className="font-label-caps text-xs sm:text-sm text-text-secondary tracking-widest uppercase font-semibold">
            4 Industry Credentials Verified · Cloud, AI &amp; Full-Stack
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
