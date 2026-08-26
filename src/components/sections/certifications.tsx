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
    <section id="certifications" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-20 md:py-28 scroll-mt-[57px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center gap-2.5 mb-3 flex-wrap">
            <span className="w-2.5 h-2.5 bg-[#C9971C] border border-black inline-block" />
            <span className="font-mono text-xs font-bold tracking-widest text-black uppercase">
              CREDENTIALS
            </span>
            <span className="font-editorial-italic text-sm sm:text-base text-[#C9971C] font-semibold tracking-tight select-none">
              / verified knowledge
            </span>
          </div>
          <h2 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-black leading-[0.96] tracking-tight uppercase">
            VERIFIED <br />
            <span className="font-editorial-italic normal-case text-[#C9971C] font-semibold tracking-tight">industry</span> CERTIFICATIONS.
          </h2>
        </motion.div>

        {/* 2-Column Grid matching Skills section category structure, using clean bordered pills/boxes for certificate names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10"
        >
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.index} className="space-y-3">
              {/* Category Header: Issuer & Year */}
              <div className="flex items-center justify-between border-b border-black/15 pb-2">
                <h3 className="font-display text-xl tracking-wider text-black uppercase">
                  {cert.issuer}
                </h3>
                <span className="font-mono text-xs font-bold text-black/60">
                  {cert.year}
                </span>
              </div>

              {/* Certificate Name wrapped in a clean bordered box/pill like Skills section */}
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs font-semibold text-black px-3 py-1.5 border border-black bg-transparent leading-relaxed inline-block">
                  {cert.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
