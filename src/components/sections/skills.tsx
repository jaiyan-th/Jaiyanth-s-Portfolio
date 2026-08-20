"use client";

import * as React from "react";
import { SKILL_GROUPS } from "@/data/portfolio";
import { motion } from "motion/react";

export function Skills() {
  return (
    <section id="skills" className="relative bg-[#EFEFEA] text-black border-b-2 border-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00A8C6] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              STACK
            </span>
          </div>
        </motion.div>

        {/* Skill Categories Grid — karolbinkow.ski layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10"
        >
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="space-y-3">
              {/* Category Label */}
              <h3 className="font-mono text-xs font-black tracking-widest text-black uppercase">
                {group.title.toUpperCase()}
              </h3>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs font-semibold text-black px-3 py-1.5 border border-black bg-transparent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Footer credential line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-black/20"
        >
          <p className="font-mono text-xs font-semibold text-black/70 tracking-wide">
            IEEE Published · CS50 (Harvard) · 3+ Projects Shipped to Production
          </p>
        </motion.div>
      </div>
    </section>
  );
}
