"use client";

import * as React from "react";
import { Award } from "lucide-react";
import { motion } from "motion/react";

const CERTIFICATION_GROUPS = [
  {
    issuer: "COURSERA",
    year: "2025",
    items: ["Python Programming & Full-Stack Development"],
  },
  {
    issuer: "NPTEL",
    year: "2025",
    items: ["Artificial Intelligence: Concepts and Techniques"],
  },
  {
    issuer: "AWS TRAINING & CERTIFICATION",
    year: "2026",
    items: ["AWS Foundations: Getting Started with AWS Cloud Essentials"],
  },
  {
    issuer: "FUTURESKILLS PRIME (NASSCOM)",
    year: "2026",
    items: ["Certificate Program in AI & Machine Learning"],
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
            FOUR VERIFIED <br />
            <span className="bg-[#00B2D6] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000] mt-1">
              INDUSTRY CERTIFICATIONS.
            </span>
          </h2>
        </motion.div>

        {/* Single Clean Box Layout — Identical to Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white border-2 border-black p-6 sm:p-8 shadow-[4px_4px_0px_#000000] space-y-6"
        >
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-black" />
              <span className="font-mono text-xs font-black uppercase text-black tracking-wider">
                PROFESSIONAL INDUSTRY CERTIFICATIONS
              </span>
            </div>
            <span className="bg-[#00B2D6] text-black px-2.5 py-1 font-mono text-[10px] uppercase font-black tracking-widest border border-black inline-flex items-center gap-1.5">
              VERIFIED &amp; ACTIVE
            </span>
          </div>

          {/* Certifications 2-Column Grid inside the single card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-2">
            {CERTIFICATION_GROUPS.map((group) => (
              <div key={group.issuer} className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-black/15 pb-1.5">
                  <h3 className="font-mono text-xs font-black tracking-widest text-black uppercase">
                    {group.issuer}
                  </h3>
                  <span className="font-mono text-xs font-bold text-black/60">
                    {group.year}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((cert) => (
                    <span
                      key={cert}
                      className="font-mono text-xs font-semibold text-black px-3 py-1.5 border border-black bg-[#EFEFEA]"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
