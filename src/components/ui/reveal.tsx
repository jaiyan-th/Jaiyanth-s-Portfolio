"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, useReducedMotion } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "pop";
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  ...props
}: RevealProps) {
  const [isInView, setIsInView] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 0 };
    switch (direction) {
      case "left":
        return { opacity: 0, x: -32, rotateY: -10 };
      case "right":
        return { opacity: 0, x: 32, rotateY: 10 };
      case "pop":
        return { opacity: 0, scale: 0.9, y: 16 };
      case "up":
      default:
        return { opacity: 0, y: 28, rotateX: -6 };
    }
  };

  const getAnimate = () => {
    if (shouldReduceMotion) return { opacity: 1 };
    switch (direction) {
      case "left":
        return { opacity: 1, x: 0, rotateY: 0 };
      case "right":
        return { opacity: 1, x: 0, rotateY: 0 };
      case "pop":
        return { opacity: 1, scale: 1, y: 0 };
      case "up":
      default:
        return { opacity: 1, y: 0, rotateX: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, amount: 0.15 }}
      onViewportEnter={() => setIsInView(true)}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`perspective-1200 will-change-transform ${isInView ? "in-view" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
