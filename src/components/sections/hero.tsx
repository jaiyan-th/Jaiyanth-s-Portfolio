"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-[#FAF3EE] border-b border-black/10 px-4 sm:px-6 lg:px-8 py-10 lg:py-16 min-h-[calc(100vh-56px)] flex flex-col justify-center overflow-hidden bg-grid"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Column: Headlines & Call-to-Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Top Eyebrow Badges */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10.5px] font-bold text-[#B91C1C] tracking-widest uppercase">
              00 —— AVAILABLE FOR ROLES
            </span>
            <div className="h-[1px] flex-1 bg-black/15 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#B91C1C] rounded-full" />
            </div>
          </div>

          {/* Scaled Display Headline (3 lines max on desktop, 1.0 line-height) */}
          <div className="relative inline-block mb-3">
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] text-black leading-[1.02] tracking-tight uppercase">
              EVERY PROBLEM IS A SYSTEM <br className="hidden sm:inline" />
              WAITING TO BE DESIGNED.
            </h1>
          </div>

          {/* Highlighter-Stroke Badge */}
          <div className="mb-4">
            <span className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-white bg-[#B91C1C] border border-black px-3.5 py-1 rounded-[2px_8px_3px_7px] shadow-[2px_2px_0px_rgba(0,0,0,1)] -rotate-1 inline-block transition-transform hover:rotate-0">
              BUILT, NOT JUST DEMOED.
            </span>
          </div>

          {/* FROM SIGNAL TO SYSTEM -> Inline node diagram */}
          <div className="my-4">
            <div className="flex items-center gap-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#B91C1C]">
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full border border-[#B91C1C] flex items-center justify-center bg-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
                </div>
                <span className="mt-1 text-black/70 text-[9px] sm:text-[10px] font-bold">SIGNAL</span>
              </div>
              
              <div className="w-10 sm:w-14 h-[1px] bg-[#B91C1C] relative flex items-center justify-end">
                <div className="w-1 h-2 border-t-4 border-b-4 border-l-4 border-transparent border-l-[#B91C1C]" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full border border-[#B91C1C] flex items-center justify-center bg-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
                </div>
                <span className="mt-1 text-black/70 text-[9px] sm:text-[10px] font-bold">SYSTEM</span>
              </div>

              <div className="w-10 sm:w-14 h-[1px] bg-[#B91C1C] relative flex items-center justify-end">
                <div className="w-1 h-2 border-t-4 border-b-4 border-l-4 border-transparent border-l-[#B91C1C]" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full border border-[#B91C1C] flex items-center justify-center bg-[#B91C1C]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
                </div>
                <span className="mt-1 text-black/70 text-[9px] sm:text-[10px] font-bold">STORY</span>
              </div>
            </div>
          </div>

          {/* Supporting Description */}
          <p className="max-w-xl font-sans text-xs sm:text-sm text-black/85 leading-relaxed mb-6">
            I work across the full stack — AI workflows, backend architecture, structured APIs, and interfaces — to turn messy, real-world problems into software that actually works.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="border border-black font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 hover:bg-black/5 transition-all inline-flex items-center gap-2 relative bg-white shadow-sm"
            >
              <span>VIEW SELECTED WORK</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="border border-black/40 font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 hover:bg-black/5 transition-all bg-white"
            >
              START A CONVERSATION
            </a>
          </div>
        </div>

        {/* Right Column: Crisp Terminal Card */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">

          {/* Bordered Terminal Panel */}
          <div className="w-full max-w-[460px] lg:max-w-[480px] bg-white relative z-10 blueprint-box shadow-md">
            {/* Viewfinder corners */}
            <span className="blueprint-corner blueprint-corner-tl" />
            <span className="blueprint-corner blueprint-corner-tr" />
            <span className="blueprint-corner blueprint-corner-bl" />
            <span className="blueprint-corner blueprint-corner-br" />

            {/* Terminal Chrome Bar */}
            <div className="flex items-center justify-between border-b border-black/15 bg-[#FAF3EE] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-black/30 bg-black/10" />
                <span className="w-2.5 h-2.5 rounded-full border border-black/30 bg-black/10" />
                <span className="w-2.5 h-2.5 rounded-full border border-black/30 bg-black/10" />
              </div>
              <span className="font-mono text-[10px] font-bold tracking-wider text-black/60 uppercase">
                console.exe // sys_info
              </span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-xs sm:text-sm space-y-3.5 leading-relaxed bg-white">
              <div>
                <p className="text-black/60 font-medium">$ whoami</p>
                <p className="text-[#B91C1C] font-bold">&gt; Jaiyanth B</p>
              </div>

              <div>
                <p className="text-black/60 font-medium">$ role</p>
                <p className="text-[#B91C1C] font-bold">&gt; AI + Full-Stack Engineer</p>
              </div>

              <div>
                <p className="text-black/60 font-medium">$ status</p>
                <p className="text-[#B91C1C] font-bold">&gt; Open to opportunities</p>
              </div>

              <div>
                <p className="text-black/60 font-medium">$ stack</p>
                <p className="text-[#B91C1C] font-bold">&gt; Python · React · LLMs · REST APIs</p>
              </div>

              <div>
                <p className="text-black/60 font-medium">$ location</p>
                <p className="text-[#B91C1C] font-bold">
                  &gt; Karur, Tamil Nadu, India
                  <span className="inline-block w-2 h-4 bg-[#B91C1C] animate-pulse align-middle ml-1.5" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
