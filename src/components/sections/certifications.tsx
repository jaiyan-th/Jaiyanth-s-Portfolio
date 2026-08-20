"use client";

import * as React from "react";
import { motion } from "motion/react";

const CERTIFICATIONS = [
  {
    index: "01",
    title: "Python Programming & Full-Stack Development",
    issuer: "Coursera",
    year: "2025",
    domains: ["Python Core", "Backend Architectures", "Full-Stack Integration"],
  },
  {
    index: "02",
    title: "Artificial Intelligence: Concepts and Techniques",
    issuer: "NPTEL",
    year: "2025",
    domains: ["Search Algorithms", "Knowledge Representation", "Neural Systems"],
  },
  {
    index: "03",
    title: "AWS Foundations: Getting Started with the AWS Cloud Essentials",
    issuer: "AWS Training & Certification",
    year: "2026",
    domains: ["Cloud Computing", "Infrastructure Architecture", "AWS Services"],
  },
  {
    index: "04",
    title: "Certificate Program in Artificial Intelligence & Machine Learning",
    issuer: "FutureSkills Prime (NASSCOM)",
    year: "2026",
    domains: ["Applied Machine Learning", "Deep Learning Models", "Industrial AI"],
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
          className="mb-14"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00A8C6] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              CERTIFICATIONS
            </span>
          </div>
        </motion.div>

        {/* Clean Editorial List — Simple, no heavy boxes */}
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
              className="py-6 sm:py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            >
              {/* Left Column: Number, Title, Issuer */}
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black text-[#00A8C6]">
                    // {cert.index}
                  </span>
                  <span className="font-mono text-xs font-bold text-black/60 uppercase">
                    {cert.issuer} · {cert.year}
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg sm:text-xl text-black uppercase leading-snug">
                  {cert.title}
                </h3>
              </div>

              {/* Right Column: Clean Domain Pills like Skills section */}
              <div className="flex flex-wrap items-center gap-2">
                {cert.domains.map((domain) => (
                  <span
                    key={domain}
                    className="font-mono text-xs font-semibold text-black px-3 py-1.5 border border-black bg-transparent"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
