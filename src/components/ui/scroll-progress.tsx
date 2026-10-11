"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, willChange: "transform" }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#E5341B] origin-left z-[9999] pointer-events-none"
    />
  );
}
