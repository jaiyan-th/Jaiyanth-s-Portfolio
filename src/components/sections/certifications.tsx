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
            <span className="w-2.5 h-2.5 bg-[#FFC000] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              CREDENTIALS
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-[40px] text-black leading-[1.08] tracking-tight uppercase">
            VERIFIED <br />
            <span className="bg-[#FFC000] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000] mt-1">
              INDUSTRY CERTIFICATIONS.
            </span>
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
                <h3 className="font-mono text-xs font-black tracking-widest text-black uppercase">
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
