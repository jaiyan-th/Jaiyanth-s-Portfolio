"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { User } from "lucide-react";
import { fadeUpVariants } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="relative bg-[#FAF3EE] text-[#111111] border-b-[3px] border-[#111111] min-h-[calc(100vh-5rem)] flex flex-col justify-center py-20 md:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Eyebrow, Plain Black Headline, Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUpVariants}
            className="lg:col-span-7 space-y-6"
          >
            {/* Sticker Badge + Beside Subtitle */}
            <div className="flex items-center gap-2.5">
              <span className="sticker-badge bg-[#111111] text-white -rotate-1">
                <User className="w-3.5 h-3.5 text-[#FFFFFF]" />
                ABOUT
              </span>
              <span className="font-body italic text-[#D9622B] text-sm font-semibold">
                / the story so far
              </span>
            </div>

            {/* Section Headline with ONE italic accent word (story) */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] leading-[1.12] tracking-tight">
              From signal to system to{" "}
              <span className="italic text-[#D9622B]">story.</span>
            </h2>

            {/* Bio Copy */}
            <div className="space-y-4 font-body text-base sm:text-[17px] text-[#222222] leading-relaxed max-w-[620px]">
              <p>
                I&apos;m a final-year Computer Science &amp; Business Systems student focused on applied AI and full-stack engineering. My work sits between research and production — RAG pipelines, conversational systems, structured APIs, and end-to-end products that hold up under real use.
              </p>
              <p>
                I&apos;ve co-authored an IEEE research paper on preventive healthcare AI, completed an AI internship building production prototypes, and shipped four projects that anchor what I&apos;ve learned. I&apos;m currently open to applied-AI and full-stack roles where rigour and care for the user matter as much as the model.
              </p>
            </div>
          </motion.div>

          {/* Right Column: ONLY Profile Photo, full height anchor */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[380px] sm:max-w-[400px] neo-card p-3.5 bg-white space-y-3">
              {/* Portrait Aspect Ratio 4:5, not clipped */}
              <div className="relative w-full aspect-[4/5] overflow-hidden border-2 border-[#111111] bg-[#FAF3EE]">
                <Image
                  src="/images/jaiyanth-profile.jpg"
                  alt="Jaiyanth B — AI & Full-Stack Engineer"
                  fill
                  className="object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-300"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 380px, 400px"
                  priority
                />
              </div>

              {/* Photo Caption Tag */}
              <div className="pt-1 pb-1 px-1 flex items-center justify-between font-label-caps text-xs text-[#111111]">
                <span className="font-bold tracking-wider">JAIYANTH B</span>
                <span className="sticker-badge bg-[#111111] text-white text-[10px] py-0.5 px-2">
                  ENGINEER
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
