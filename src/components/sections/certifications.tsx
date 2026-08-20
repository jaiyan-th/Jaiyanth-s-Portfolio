"use client";

import * as React from "react";
import { Award, CheckCircle, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const CERTIFICATIONS = [
  {
    id: "cert-1",
    index: "01",
    title: "Python Programming & Full-Stack Development",
    issuer: "Coursera",
    year: "2025",
    focus: "Python Core · Backend Architectures · Full-Stack Integration",
  },
  {
    id: "cert-2",
    index: "02",
    title: "Artificial Intelligence: Concepts and Techniques",
    issuer: "NPTEL",
    year: "2025",
    focus: "Search Algorithms · Knowledge Representation · Neural Systems",
  },
  {
    id: "cert-3",
    index: "03",
    title: "AWS Foundations: Getting Started with the AWS Cloud Essentials",
    issuer: "AWS Training & Certification",
    year: "2026",
    focus: "Cloud Computing · Infrastructure Architecture · AWS Services",
  },
  {
    id: "cert-4",
    index: "04",
    title: "Certificate Program in Artificial Intelligence & Machine Learning",
    issuer: "FutureSkills Prime (NASSCOM)",
    year: "2026",
    focus: "Applied Machine Learning · Deep Learning Models · Industrial AI",
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
            VERIFIED INDUSTRY <br />
            <span className="bg-[#00B2D6] text-black px-2 py-0.5 inline-block border-2 border-black shadow-[3px_3px_0px_#000000] mt-1">
              CERTIFICATIONS.
            </span>
          </h2>
        </motion.div>

        {/* 2x2 Grid of Brutalist Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="bg-white border-2 border-black p-6 shadow-[5px_5px_0px_#000000] flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Card Top Strip */}
                <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-3">
                  <span className="font-mono text-xs font-black text-[#00A8C6]">
                    CERT // {cert.index}
                  </span>
                  <span className="font-mono text-[10px] font-black uppercase text-black bg-[#EFEFEA] px-2.5 py-0.5 border border-black inline-flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#00A8C6]" />
                    {cert.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-black text-base sm:text-lg text-black uppercase leading-snug mb-2">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="font-mono text-xs font-bold text-black/70 mb-3">
                  ISSUER: <span className="text-black font-black">{cert.issuer}</span>
                </p>

                {/* Focus Areas */}
                <div className="pt-2 border-t border-black/10">
                  <span className="font-mono text-[10px] font-black text-[#00A8C6] block uppercase tracking-wider mb-1">
                    KEY DOMAINS
                  </span>
                  <p className="font-sans text-xs text-black/80 font-semibold">
                    {cert.focus}
                  </p>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="border-t-2 border-black pt-3 flex items-center justify-between font-mono text-[10.5px]">
                <span className="font-black text-black uppercase">STATUS: VERIFIED</span>
                <span className="bg-[#00B2D6] text-black px-2 py-0.5 border border-black font-black text-[9px] uppercase">
                  ACTIVE
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
