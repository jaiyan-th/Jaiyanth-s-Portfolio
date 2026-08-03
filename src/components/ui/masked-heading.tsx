"use client";

import * as React from "react";
import { motion, useInView, type Variants } from "motion/react";
import { EASE, DURATION } from "@/lib/motion";

/**
 * Masked line reveal — splits a heading into lines and reveals each
 * from below an overflow:hidden mask. Falls back to plain render
 * for reduced motion.
 */
export function MaskedHeading({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  accentWords = [],
}: {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  /** Words to render in serif italic accent (case-insensitive, matches with punctuation stripped) */
  accentWords?: string[];
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [reduce, setReduce] = React.useState(false);

  React.useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const lines = splitToLines(text);
  const accentLower = accentWords.map((w) => w.toLowerCase());

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { y: "110%" },
    visible: { y: "0%", transition: { duration: DURATION.reveal, ease: EASE.primary } },
  };

  // Render a line, wrapping any accent words in a serif italic span.
  // Splits on whitespace and strips punctuation (including hyphens) for matching.
  const renderLine = (line: string) => {
    if (accentLower.length === 0) return line;
    // Split into tokens (words) + whitespace, preserving both
    const tokens = line.split(/(\s+)/);
    return tokens.map((tok, i) => {
      if (/^\s+$/.test(tok) || tok === "") return <React.Fragment key={i}>{tok}</React.Fragment>;
      // Strip punctuation incl. hyphens for matching: "evidence-based" → "evidencebased"
      const stripped = tok.toLowerCase().replace(/[.,!?;:"'\-]/g, "");
      const isAccent = accentLower.some((aw) => stripped.includes(aw));
      if (isAccent) {
        return (
          <span
            key={i}
            className="font-serif-editorial"
            style={{ color: "var(--accent)" }}
          >
            {tok}
          </span>
        );
      }
      return <React.Fragment key={i}>{tok}</React.Fragment>;
    });
  };

  return (
    <div ref={ref}>
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView || reduce ? "visible" : "hidden"}
        className={className}
      >
        {lines.map((line, i) => (
          <span key={i} className="mask-line">
            <motion.span variants={reduce ? undefined : child} className="block">
              {renderLine(line)}
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Naive line splitter — wraps to ~6 words per line.
// Good enough for editorial headings; full text-balancing is overkill here.
function splitToLines(text: string): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current: string[] = [];
  const maxWords = Math.max(3, Math.min(7, Math.ceil(words.length / 2)));
  for (const w of words) {
    current.push(w);
    if (current.length >= maxWords) {
      lines.push(current.join(" "));
      current = [];
    }
  }
  if (current.length) lines.push(current.join(" "));
  return lines;
}

/** Section header pattern — index · label · title · supporting */
export function SectionHeader({
  index,
  label,
  title,
  supporting,
  align = "left",
  accentWords = [],
}: {
  index: string;
  label: string;
  title: string;
  supporting?: string;
  align?: "left" | "center";
  /** Words in the title to render in serif italic accent */
  accentWords?: string[];
}) {
  return (
    <div
      className={`flex flex-col gap-6 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: EASE.primary }}
        className="flex items-center gap-4"
      >
        <motion.span
          className="font-mono-label text-secondary"
          whileHover={{ color: "var(--accent)" }}
          transition={{ duration: 0.2 }}
        >
          [ {index} ]
        </motion.span>
        <span className="h-px w-12 bg-line" />
        <span className="font-mono-label text-secondary">{label}</span>
      </motion.div>
      <MaskedHeading
        text={title}
        accentWords={accentWords}
        className="font-display text-section text-balance"
      />
      {supporting ? (
        <p
          className={`max-w-xl text-body text-secondary text-pretty ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {supporting}
        </p>
      ) : null}
    </div>
  );
}
