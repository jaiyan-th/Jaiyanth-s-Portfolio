"use client";

import * as React from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export function CursorSpotlight() {
  const [isVisible, setIsVisible] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  React.useEffect(() => {
    // Only enable on desktop fine pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        x: spotlightX,
        y: spotlightY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed top-0 left-0 z-50 h-[380px] w-[380px] rounded-full opacity-60 mix-blend-screen transition-opacity duration-300 hidden md:block"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(255,77,77,0.18)_0%,rgba(185,28,28,0.08)_40%,transparent_70%)] blur-xl" />
    </motion.div>
  );
}
