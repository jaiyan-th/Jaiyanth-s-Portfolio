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

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: identity statement */}
          <div className="md:col-span-6 lg:col-span-7">
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
              className="mt-12 space-y-5 text-body text-secondary text-pretty"
            >
              {ABOUT.biography.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>
          </div>

          {/* Right: metric matrix */}
          <div className="md:col-span-6 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.18, duration: DURATION.reveal, ease: EASE.primary }}
              className="border border-line"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-mono-label text-secondary">Verified metrics</span>
                <span className="font-mono-label text-secondary">04</span>
              </div>
              <ul>
                {ABOUT.metrics.map((m, i) => (
                  <li
                    key={m.label}
                    className={`grid grid-cols-[auto_1fr] gap-4 px-5 py-5 ${
                      i !== ABOUT.metrics.length - 1 ? "border-b border-line" : ""
                    }`}
                  >
                    <div
                      className="font-display"
                      style={{
                        fontSize: "clamp(40px,5vw,56px)",
                        lineHeight: 1,
                        color: "var(--accent)",
                      }}
                    >
                      {m.value}
                    </div>
                    <div className="flex flex-col gap-1 self-center">
                      <span className="text-[15px] font-medium tracking-tight">
                        {m.label}
                      </span>
                      <span className="text-[13px] text-secondary text-pretty">
                        {m.detail}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expertise strip — moving */}
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
