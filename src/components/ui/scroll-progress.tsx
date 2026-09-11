"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, willChange: "transform" }}
      className="fixed top-0 left-0 right-0 h-1 bg-[#A3E635] origin-left z-50"
    />
  );
}
