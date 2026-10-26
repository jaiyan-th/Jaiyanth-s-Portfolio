"use client";

import { motion } from "motion/react";

interface DoodleArrowProps {
  className?: string;
  width?: number;
  height?: number;
}

export function DoodleArrow({ className = "", width = 72, height = 48 }: DoodleArrowProps) {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 80 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[#111111] select-none ${className}`}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Hand-drawn curving arrow path */}
      <path
        d="M68 6C60 14 44 26 28 22C18 19 14 30 16 38C17 42 22 44 26 42"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrowhead */}
      <path
        d="M18 36L12 44L22 45"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
