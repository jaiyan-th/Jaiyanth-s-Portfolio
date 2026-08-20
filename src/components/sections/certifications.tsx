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
    name: "AWS Foundations: Getting Started with the AWS Cloud Essentials",
    issuer: "AWS Training & Certification",
    year: "2026",
  },
  {
    index: "04",
    name: "Certificate Program in Artificial Intelligence & Machine Learning",
    issuer: "FutureSkills Prime (NASSCOM)",
    year: "2026",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#00A8C6] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              CREDENTIALS
            </span>
          </div>
          <h2 className="font-heading font-black text-xl sm:text-3xl lg:text-[34px] text-black leading-[1.1] tracking-tight uppercase">
            VERIFIED INDUSTRY <br />
            <span className="bg-[#00B2D6] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000] mt-1">
              CERTIFICATIONS.
            </span>
          </h2>
        </motion.div>

        {/* Professional 2x2 Card Grid — Balanced, restrained font size */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.index}
              className="bg-white border-2 border-black p-5 sm:p-6 shadow-[3px_3px_0px_#000000] flex flex-col justify-between space-y-4 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000] transition-all"
            >
              <div>
                {/* Index & Year Strip */}
                <div className="flex items-center justify-between border-b border-black/15 pb-2.5 mb-3">
                  <span className="font-mono text-xs font-black text-[#00A8C6]">
                    CERT // {cert.index}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-black bg-[#EFEFEA] px-2 py-0.5 border border-black">
                    {cert.year}
                  </span>
                </div>

                {/* Certificate Name */}
                <h3 className="font-heading font-bold text-sm sm:text-base text-black uppercase leading-snug tracking-wide">
                  {cert.name}
                </h3>

                {/* Issuer */}
                <p className="font-mono text-xs font-semibold text-black/70 mt-1.5">
                  ISSUER: <span className="text-black font-bold">{cert.issuer}</span>
                </p>
              </div>

              {/* Status */}
              <div className="pt-2.5 border-t border-black/10 flex items-center justify-between font-mono text-[10px]">
                <span className="font-bold text-black/60 uppercase">VERIFICATION</span>
                <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-600 uppercase">
                  ● ACTIVE
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
