"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE, DURATION } from "@/lib/motion";
import { ABOUT } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/masked-heading";

export function About() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative section-spacing"
    >
      <div className="container-editorial">
        <SectionHeader
          index="01"
          label="About"
          title="From signal to system to story."
          supporting="A short orientation to who I am, what I build, and how I work."
        />

        {/* Two-column: identity statement (left, 7 col) + metric matrix (right, 5 col) */}
        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: identity statement + biography */}
          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DURATION.reveal, ease: EASE.primary }}
              className="font-display text-statement text-balance text-foreground"
            >
              {ABOUT.statement.split(" ").map((word, i) => {
                const accentWords = ["signal,", "system,", "story."];
                const isAccent = accentWords.includes(word.toLowerCase());
                return (
                  <React.Fragment key={i}>
                    {isAccent ? (
                      <span
                        className="font-serif-editorial italic"
                        style={{ color: "var(--accent)" }}
                      >
                        {word}
                      </span>
                    ) : (
                      word
                    )}{" "}
                  </React.Fragment>
                );
              })}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.12, duration: DURATION.reveal, ease: EASE.primary }}
              className="mt-10 space-y-4 text-body text-secondary text-pretty"
            >
              {ABOUT.biography.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>
          </div>

          {/* Right: metric matrix — 2×2 grid for compact, balanced layout */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.18, duration: DURATION.reveal, ease: EASE.primary }}
              className="border border-line h-full"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-mono-label text-secondary">Verified metrics</span>
                <span className="font-mono-label text-secondary">04</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2">
                {ABOUT.metrics.map((m, i) => (
                  <li
                    key={m.label}
                    className={`flex flex-col gap-2 p-5 ${
                      i % 2 === 0 ? "sm:border-r" : ""
                    } ${i < 2 ? "border-b" : ""}`}
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span
                      className="font-display leading-none"
                      style={{
                        fontSize: "clamp(36px,4.5vw,48px)",
                        color: "var(--accent)",
                      }}
                    >
                      {m.value}
                    </span>
                    <span className="text-[13.5px] font-medium tracking-tight text-foreground">
                      {m.label}
                    </span>
                    <span className="text-[12px] text-secondary text-pretty leading-snug">
                      {m.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expertise strip — moving marquee */}
      <div
        ref={ref}
        className="mt-20 overflow-hidden border-y border-line py-6 md:mt-24"
        aria-label="Expertise"
      >
        <motion.div
          style={{ x }}
          className="flex w-max gap-12 whitespace-nowrap"
        >
          {[...ABOUT.expertise, ...ABOUT.expertise].map((e, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-display text-[clamp(20px,3vw,32px)] tracking-tight text-secondary"
            >
              <span>{e}</span>
              <span aria-hidden style={{ color: "var(--accent)" }}>
                ◆
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
