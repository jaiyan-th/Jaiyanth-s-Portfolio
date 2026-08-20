"use client";

import * as React from "react";
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
        {/* Eyebrow Header — Identical to STACK/Skills */}
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

        {/* Certifications Grid — Exactly like STACK / Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10"
        >
          {CERTIFICATION_GROUPS.map((group) => (
            <div key={group.issuer} className="space-y-3">
              {/* Category Label: Issuer + Year */}
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs font-black tracking-widest text-black uppercase">
                  {group.issuer}
                </h3>
                <span className="font-mono text-xs font-bold text-black/60">
                  {group.year}
                </span>
              </div>

              {/* Certificate Pill */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((cert) => (
                  <span
                    key={cert}
                    className="font-mono text-xs font-semibold text-black px-3 py-1.5 border border-black bg-transparent"
                  >
                    {cert}
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
