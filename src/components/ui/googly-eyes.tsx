"use client";

import { useEffect, useState, useRef } from "react";

export function GooglyEyes({ size = 52 }: { size?: number }) {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const distance = Math.min(size * 0.22, Math.hypot(e.clientX - centerX, e.clientY - centerY) * 0.05);

      setPupilPos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  const eyeSize = size;
  const pupilSize = size * 0.46;

  return (
    <span
      ref={containerRef}
      className="inline-flex items-center gap-1 align-middle select-none mx-1.5"
    >
      {/* Left Eye */}
      <span
        style={{ width: eyeSize, height: eyeSize }}
        className="relative rounded-full bg-white border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center overflow-hidden inline-block"
      >
        <span
          style={{
            width: pupilSize,
            height: pupilSize,
            transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
          }}
          className="rounded-full bg-[#111111] transition-transform duration-75 ease-out relative flex items-center justify-center"
        >
          {/* Pupil Light Glint */}
          <span className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 right-1" />
        </span>
      </span>

      {/* Right Eye */}
      <span
        style={{ width: eyeSize, height: eyeSize }}
        className="relative rounded-full bg-white border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center overflow-hidden inline-block"
      >
        <span
          style={{
            width: pupilSize,
            height: pupilSize,
            transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
          }}
          className="rounded-full bg-[#111111] transition-transform duration-75 ease-out relative flex items-center justify-center"
        >
          {/* Pupil Light Glint */}
          <span className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 right-1" />
        </span>
      </span>
    </span>
  );
}
