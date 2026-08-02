"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left"
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--accent), var(--accent-2) 60%, var(--accent-warm))",
        }}
      />
    </motion.div>
  );
}
