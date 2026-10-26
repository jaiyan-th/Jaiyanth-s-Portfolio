"use client";

import { motion } from "motion/react";

interface SmileyProps {
  color: string;
  size: number;
  eyes?: "dots" | "pills" | "wink";
  className?: string;
  delay?: number;
  initialRotate?: number;
}

export function SmileyFace({
  color,
  size,
  eyes = "pills",
  className = "",
  delay = 0,
  initialRotate = 0,
}: SmileyProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: initialRotate - 15 }}
      animate={{ scale: 1, rotate: initialRotate }}
      whileHover={{
        scale: 1.15,
        rotate: initialRotate + (Math.random() > 0.5 ? 12 : -12),
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
        delay,
      }}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
      className={`relative rounded-full border-[2.5px] border-[#111111] shadow-[2.5px_2.5px_0px_#111111] flex flex-col items-center justify-center select-none cursor-pointer ${className}`}
    >
      {/* Eyes */}
      <div className="flex items-center gap-[6px] mb-1">
        {eyes === "wink" ? (
          <>
            <span className="w-1.5 h-3 bg-[#111111] rounded-full inline-block" />
            <span className="w-2.5 h-[2px] bg-[#111111] rounded-full inline-block" />
          </>
        ) : (
          <>
            <span className="w-1.5 h-3 bg-[#111111] rounded-full inline-block" />
            <span className="w-1.5 h-3 bg-[#111111] rounded-full inline-block" />
          </>
        )}
      </div>

      {/* Smile Line */}
      <svg
        width={size * 0.42}
        height={size * 0.22}
        viewBox="0 0 32 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-[#111111] stroke-[2.8] stroke-linecap-round"
      >
        <path d="M3 3C7 11 25 11 29 3" />
      </svg>
    </motion.div>
  );
}

export function SmileyCluster() {
  return (
    <div className="relative w-[280px] sm:w-[320px] md:w-[360px] h-[210px] sm:h-[240px] select-none">
      {/* Top Left: Sunny Yellow Smiley */}
      <div className="absolute top-2 left-6 z-10">
        <SmileyFace
          color="#FFD13B"
          size={84}
          initialRotate={-8}
          delay={0.1}
        />
      </div>

      {/* Top Center-Right: Electric Green Smiley */}
      <div className="absolute top-0 right-14 z-10">
        <SmileyFace
          color="#3EE07A"
          size={78}
          initialRotate={6}
          delay={0.15}
        />
      </div>

      {/* Top Right: Electric Purple Smiley */}
      <div className="absolute top-4 right-0 z-10">
        <SmileyFace
          color="#8B5CF6"
          size={68}
          initialRotate={14}
          delay={0.2}
        />
      </div>

      {/* Center Left: Coral Red Smiley */}
      <div className="absolute top-16 left-0 z-20">
        <SmileyFace
          color="#FF4D4D"
          size={82}
          initialRotate={-12}
          delay={0.25}
        />
      </div>

      {/* Center Middle: Crisp White Smiley */}
      <div className="absolute top-18 left-20 z-20">
        <SmileyFace
          color="#FFFFFF"
          size={88}
          initialRotate={2}
          delay={0.3}
        />
      </div>

      {/* Center Right: Bright Coral / Red Smiley */}
      <div className="absolute top-16 right-4 z-20">
        <SmileyFace
          color="#FF6B4A"
          size={76}
          initialRotate={10}
          delay={0.35}
        />
      </div>

      {/* Bottom Left: Pure White Smiley */}
      <div className="absolute bottom-1 left-4 z-30">
        <SmileyFace
          color="#FFFFFF"
          size={74}
          initialRotate={-6}
          delay={0.4}
        />
      </div>

      {/* Bottom Center: Electric Cyan Smiley */}
      <div className="absolute bottom-0 left-22 z-30">
        <SmileyFace
          color="#38BDF8"
          size={82}
          initialRotate={5}
          delay={0.45}
        />
      </div>

      {/* Bottom Right: Vivid Green Smiley */}
      <div className="absolute bottom-2 right-10 z-30">
        <SmileyFace
          color="#3EE07A"
          size={76}
          initialRotate={-4}
          delay={0.5}
        />
      </div>
    </div>
  );
}
