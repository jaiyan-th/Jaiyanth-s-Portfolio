"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { SELECTED_WORK } from "@/data/content";

export function SelectedWork() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="work"
      aria-label="02 Selected Work"
      className="relative py-24 sm:py-32 border-t border-[#E5E3DB] bg-[var(--canvas)]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-12 sm:mb-16 pb-6 border-b border-[#E5E3DB]"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs sm:text-sm text-[#FF3355] tracking-widest uppercase font-semibold">
              02
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A0A0A]">
              Selected
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F6E6A] mt-2 sm:mt-0">
            Engineered Systems & Publications
          </span>
        </motion.div>

        {/* Indexed Table / List Rows */}
        <div className="divide-y divide-[#E5E3DB]">
          {SELECTED_WORK.map((item, index) => {
            const isHovered = hoveredId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative py-8 sm:py-10 transition-all duration-300 hover:bg-white px-3 sm:px-6 -mx-3 sm:-mx-6 rounded-xl"
              >
                {/* Horizontal Accent Indicator */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF3355] transition-all duration-300 rounded-l ${
                    isHovered ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"
                  }`}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start md:items-center">
                  {/* Column 1: Index Number (P. 02, etc.) */}
                  <div className="md:col-span-1">
                    <span className="font-mono text-xs sm:text-sm text-[#FF3355] font-semibold tracking-wider">
                      {item.index}
                    </span>
                  </div>

                  {/* Column 2: Title & One-Line Description */}
                  <div className="md:col-span-6 transition-transform duration-300 group-hover:translate-x-1.5">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="text-lg sm:text-xl font-medium text-[#0A0A0A] group-hover:text-[#FF3355] transition-colors duration-200">
                        {item.title}
                      </h3>
                      {item.accentNote && (
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#F5F4F0] text-[#6F6E6A] border border-[#E5E3DB]">
                          {item.accentNote}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#6F6E6A] leading-relaxed font-normal line-clamp-2 md:line-clamp-none">
                      {item.summary}
                    </p>

                    {/* Stack tags on mobile */}
                    <div className="flex flex-wrap gap-1.5 mt-3 md:hidden">
                      {item.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F4F0] text-[#6F6E6A] border border-[#E5E3DB]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Category */}
                  <div className="hidden md:block md:col-span-2 text-xs font-mono text-[#6F6E6A]">
                    {item.category}
                  </div>

                  {/* Column 4: Year */}
                  <div className="hidden md:block md:col-span-1 text-xs font-mono text-[#6F6E6A] text-right font-medium">
                    {item.year}
                  </div>

                  {/* Column 5: Action Links */}
                  <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-3 pt-2 md:pt-0">
                    {item.repoUrl && (
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${item.title} repository`}
                        className="p-2 rounded-full border border-[#E5E3DB] bg-[#F5F4F0] text-[#6F6E6A] hover:text-[#0A0A0A] hover:border-[#FF3355] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#E5E3DB] bg-[#F5F4F0] text-[#0A0A0A] group-hover:border-[#0A0A0A] group-hover:bg-[#0A0A0A] group-hover:text-white transition-all duration-200"
                      >
                        <span>View</span>
                        <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
