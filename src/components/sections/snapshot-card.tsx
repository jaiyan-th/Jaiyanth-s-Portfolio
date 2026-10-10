"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, Target, Layers, Sparkles } from "lucide-react";

export function SnapshotCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.45 + custom * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[460px] perspective-[1000px]"
    >
      {/* Neo-Brutalist Offset Yellow Shadow Layer */}
      <motion.div
        aria-hidden="true"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 48, rotate: 3 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, x: 8, y: 8, rotate: 0 }
            : {
                opacity: 1,
                x: 8,
                y: 8,
                rotate: 0,
                transition: {
                  delay: 0.3,
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                },
              }
        }
        className="absolute inset-0 rounded-[16px] bg-[#FFE600] border-2 border-[#0A0A0A] pointer-events-none"
      />

      {/* Main Front Card Surface */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40, rotate: 2 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, y: 0, rotate: 0 }
            : {
                opacity: 1,
                y: 0,
                rotate: isHovered ? 0 : 0,
                rotateX: tilt.x,
                rotateY: tilt.y,
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              }
        }
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-[16px] border-2 border-[#0A0A0A] bg-white p-7 sm:p-8 text-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] transition-all duration-200"
      >
        {/* Header: QUICK SNAPSHOT + 2026 Pill */}
        <motion.div
          custom={0}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between pb-5 border-b-2 border-[#0A0A0A]"
        >
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#0A0A0A] font-bold bg-[#F6F4EE] px-2.5 py-1 rounded border border-[#0A0A0A]">
            QUICK SNAPSHOT
          </span>
          <span className="px-3 py-0.5 rounded-full bg-[#FFE600] text-[#0A0A0A] border-1.5 border-[#0A0A0A] shadow-[1.5px_1.5px_0px_#0A0A0A] font-mono font-extrabold text-xs">
            2026
          </span>
        </motion.div>

        {/* Row 1: LOCATION */}
        <motion.div
          custom={1}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="py-4 border-b border-[#0A0A0A]/20"
        >
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="font-mono text-[10px] tracking-widest text-[#525252] font-bold uppercase">
              LOCATION
            </span>
          </div>
          <p className="text-base font-bold text-[#0A0A0A] tracking-tight pl-6">
            Karur, Tamil Nadu, India
          </p>
        </motion.div>

        {/* Row 2: FOCUS */}
        <motion.div
          custom={2}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="py-4 border-b border-[#0A0A0A]/20"
        >
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-accent" />
            <span className="font-mono text-[10px] tracking-widest text-[#525252] font-bold uppercase">
              FOCUS
            </span>
          </div>
          <p className="text-base font-bold text-[#0A0A0A] tracking-tight pl-6">
            Applied AI Systems & High-Assurance Architecture
          </p>
        </motion.div>

        {/* Row 3: STACK */}
        <motion.div
          custom={3}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="py-4 border-b border-[#0A0A0A]/20"
        >
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-accent" />
            <span className="font-mono text-[10px] tracking-widest text-[#525252] font-bold uppercase">
              STACK
            </span>
          </div>
          <p className="font-mono text-sm font-semibold text-[#0A0A0A] pl-6">
            Python · Next.js · LangChain · FastAPI · SQL
          </p>
        </motion.div>

        {/* Row 4: STATUS CHIP */}
        <motion.div
          custom={4}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="pt-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="font-mono text-[10px] tracking-widest text-[#525252] font-bold uppercase">
              STATUS
            </span>
          </div>
          <div className="rounded-xl bg-[#00E599]/20 border-2 border-[#0A0A0A] p-3 pl-4 flex items-center gap-3 shadow-[2.5px_2.5px_0px_#0A0A0A]">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E599] border border-black" />
            </span>
            <span className="text-xs font-mono font-bold text-[#0A0A0A]">
              Open to full-time & internship roles
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
