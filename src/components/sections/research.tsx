"use client";

import * as React from "react";
import { RESEARCH } from "@/data/portfolio";
import { motion } from "motion/react";

const CERTIFICATIONS = [
  {
    title: "Python Programming & Full-Stack Development",
    issuer: "Coursera",
    year: "2025",
  },
  {
    title: "Artificial Intelligence: Concepts and Techniques",
    issuer: "NPTEL",
    year: "2025",
  },
  {
    title: "AWS Foundations: Getting Started with the AWS Cloud Essentials",
    issuer: "AWS Training & Certification",
    year: "2026",
  },
  {
    title: "Certificate Program in Artificial Intelligence & Machine Learning",
    issuer: "FutureSkills Prime (NASSCOM)",
    year: "2026",
  },
];

export function Research() {
  return (
    <section id="achievements" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-16 md:py-24">
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
              ACHIEVEMENTS
            </span>
          </div>
        </motion.div>

        {/* IEEE Research Paper — Simple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <h3 className="font-mono text-xs font-black tracking-widest text-black uppercase mb-5">
            IEEE RESEARCH PAPER
          </h3>

          <div className="bg-white border-2 border-black p-6 sm:p-8 shadow-[4px_4px_0px_#000000] space-y-4">
            <h4 className="font-heading font-black text-lg sm:text-xl text-black leading-snug">
              {RESEARCH.title}
            </h4>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-black/70 font-semibold">
              <span>{RESEARCH.venue} · {RESEARCH.location}</span>
              <span>{RESEARCH.date}</span>
              <span>{RESEARCH.organiser}</span>
            </div>

            <div className="pt-1">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest bg-[#00B2D6] text-black px-2.5 py-1 border border-black inline-block">
                ACCEPTED & PUBLISHED
              </span>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <h3 className="font-mono text-xs font-black tracking-widest text-black uppercase mb-5">
            CERTIFICATIONS
          </h3>

          <div className="border-t-2 border-black divide-y divide-black/20">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
              >
                <div>
                  <span className="font-sans text-sm font-bold text-black block">
                    {cert.title}
                  </span>
                  <span className="font-mono text-xs text-black/60 font-semibold">
                    {cert.issuer}
                  </span>
                </div>
                <span className="font-mono text-xs font-black text-black/50 shrink-0">
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
