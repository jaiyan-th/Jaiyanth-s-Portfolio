"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  ...props
}: RevealProps) {
  const [isInView, setIsInView] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      onViewportEnter={() => setIsInView(true)}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`${isInView ? "in-view" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
