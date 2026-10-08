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
    <section id="certifications" className="relative bg-canvas text-foreground border-b-[3px] border-line py-16 md:py-24 scroll-mt-20 transition-colors">
      <SectionContainer className="space-y-12">
        {/* Header Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUpVariants}
          className="space-y-4"
        >
          {/* Sticker Badge + Beside Subtitle */}
          <div className="flex items-center gap-2.5">
            <span className="sticker-badge bg-[#b3122b] text-white -rotate-1">
              <Award className="w-3.5 h-3.5 text-white" />
              CREDENTIALS
            </span>
            <span className="font-body italic text-[#b3122b] text-sm sm:text-base font-semibold">
              / on record
            </span>
          </div>

          {/* Section Headline with ONE italic accent word (verified) */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-extrabold text-foreground leading-[1.08] tracking-tight">
            Certifications, <span className="italic text-[#b3122b]">verified.</span>
          </h2>
        </motion.div>

        {/* 2x2 Grid of Neo-Cards matching design spec */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="neo-card p-6 sm:p-7 space-y-4"
            >
              {/* Issuer Label + Year with divider */}
              <div className="flex items-center justify-between border-b-2 border-line pb-3">
                <h3 className="font-label-caps text-xs sm:text-[13px] text-text-secondary font-bold tracking-wider uppercase">
                  {cert.issuer}
                </h3>
                <span className="font-mono-code text-xs sm:text-sm text-text-secondary font-bold">
                  {cert.year}
                </span>
              </div>

              {/* Certification Name */}
              <p className="font-heading text-lg sm:text-xl font-extrabold text-foreground leading-snug">
                {cert.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Line Under Hairline Divider */}
        <div className="border-t border-line pt-6 text-center">
          <p className="font-label-caps text-xs sm:text-sm text-text-secondary tracking-widest uppercase font-semibold">
            4 Industry Credentials Verified · Cloud, AI &amp; Full-Stack
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
