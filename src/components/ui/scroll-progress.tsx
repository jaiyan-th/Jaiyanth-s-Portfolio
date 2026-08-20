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
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F5D46] via-[#B08D57] to-[#2F5D46] origin-left z-50 shadow-[0_0_10px_rgba(47,93,70,0.5)]"
    />
  );
}
