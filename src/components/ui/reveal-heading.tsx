"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export interface RevealHeadingLine {
  text: string;
  accent?: string;
  afterAccent?: string;
}

interface RevealHeadingProps {
  lines: RevealHeadingLine[];
  className?: string;
}

export function RevealHeading({ lines, className = "" }: RevealHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.4"],
  });

  return (
    <div ref={containerRef} className={`space-y-1.5 ${className}`}>
      {lines.map((line, idx) => {
        return (
          <RevealLineItem
            key={idx}
            line={line}
            index={idx}
            total={lines.length}
            scrollYProgress={scrollYProgress}
            shouldReduceMotion={Boolean(shouldReduceMotion)}
          />
        );
      })}
    </div>
  );
}

function RevealLineItem({
  line,
  index,
  total,
  scrollYProgress,
  shouldReduceMotion,
}: {
  line: RevealHeadingLine;
  index: number;
  total: number;
  scrollYProgress: any;
  shouldReduceMotion: boolean;
}) {
  // Stagger intervals across [0, 1] range:
  // For 3 lines: [0, 0.45], [0.28, 0.72], [0.55, 1.0]
  const step = 0.55 / Math.max(1, total - 1);
  const startP = index * step;
  const endP = Math.min(1, startP + 0.45);

  const opacity = useTransform(scrollYProgress, [startP, endP], [0.15, 1]);
  const color = useTransform(scrollYProgress, [startP, endP], ["#BDBDBD", "#0A0A0A"]);
  const y = useTransform(scrollYProgress, [startP, endP], [12, 0]);

  if (shouldReduceMotion) {
    return (
      <div className="block leading-[1.15]">
        <span className="text-[#0A0A0A]">{line.text}</span>
        {line.accent && (
          <span className="text-[#FF3355] font-medium mx-1">{line.accent}</span>
        )}
        {line.afterAccent && (
          <span className="text-[#0A0A0A]">{line.afterAccent}</span>
        )}
      </div>
    );
  }

  return (
    <motion.div
      style={{
        opacity,
        color,
        y,
        willChange: "opacity, transform, color",
      }}
      className="block leading-[1.15] transition-colors duration-75"
    >
      <span>{line.text}</span>
      {line.accent && (
        <span className="text-[#FF3355] font-medium mx-1">{line.accent}</span>
      )}
      {line.afterAccent && <span>{line.afterAccent}</span>}
    </motion.div>
  );
}
