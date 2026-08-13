"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxDegree?: number;
  glowColor?: string;
}

export function Card3DTilt({
  children,
  className = "",
  maxDegree = 8,
  glowColor = "rgba(255, 77, 77, 0.25)",
}: Card3DTiltProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXSpring = useSpring(useTransform(mouseY, [0, 1], [maxDegree, -maxDegree]), {
    stiffness: 250,
    damping: 20,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [0, 1], [-maxDegree, maxDegree]), {
    stiffness: 250,
    damping: 20,
  });

  const glowX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), { stiffness: 200, damping: 20 });
  const glowY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div className="perspective-1000">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`relative transition-shadow duration-300 ${className}`}
      >
        {/* Dynamic Glow Overlay */}
        <motion.div
          aria-hidden
          style={{
            background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${glowColor}, transparent 65%)`,
          }}
          className="pointer-events-none absolute -inset-px rounded-inherit opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
        />
        {children}
      </motion.div>
    </div>
  );
}
