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
    <section id="certifications" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#00A8C6] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              CREDENTIALS
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-[40px] text-black leading-[1.08] tracking-tight uppercase">
            VERIFIED <br />
            <span className="bg-[#00B2D6] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000] mt-1">
              INDUSTRY CERTIFICATIONS.
            </span>
          </h2>
        </motion.div>

        {/* Clean Line-Divided List — No Box, Pure Minimal Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="border-t-2 border-black divide-y-2 divide-black"
        >
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.index}
              className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-black/[0.02] transition-colors"
            >
              {/* Left Column: Number, Title, Issuer */}
              <div className="flex items-start sm:items-center gap-4">
                <span className="font-mono text-xs font-black text-[#00A8C6] shrink-0 pt-0.5 sm:pt-0">
                  // {cert.index}
                </span>
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg text-black uppercase leading-snug">
                    {cert.name}
                  </h3>
                  <span className="font-mono text-xs font-bold text-black/60 block mt-0.5">
                    {cert.issuer}
                  </span>
                </div>
              </div>

              {/* Right Column: Year */}
              <div className="shrink-0 pl-8 sm:pl-0">
                <span className="font-mono text-xs font-bold text-black bg-transparent px-2.5 py-1 border border-black inline-block">
                  {cert.year}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
