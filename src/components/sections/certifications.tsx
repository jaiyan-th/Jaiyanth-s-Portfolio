"use client";

import * as React from "react";
import { motion } from "motion/react";

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
    name: "AWS Foundations: Getting Started with Cloud Essentials",
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
    <section id="certifications" className="relative bg-[#FCFBF9] text-[#1A1A1A] border-b border-[#E5E2DC] py-20 md:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-16"
        >
          <span className="font-label text-[11px] tracking-[0.14em] uppercase text-[#6B6B6B] block">
            06 / Certifications
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal leading-[1.15] tracking-tight">
            Verified industry <span className="italic text-[#2D5F4E]">credentials</span>.
          </h2>
        </motion.div>

        {/* Two-Column List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 border-t border-[#E5E2DC] pt-10">
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.index}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 pb-6 border-b border-[#E5E2DC]"
            >
              <div className="flex items-baseline justify-between text-xs font-label uppercase tracking-wider text-[#6B6B6B]">
                <span className="text-[#1A1A1A] font-semibold">{cert.issuer}</span>
                <span className="font-mono text-[11px]">{cert.year}</span>
              </div>
              <p className="font-sans text-sm sm:text-base text-[#6B6B6B] leading-relaxed">
                {cert.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
