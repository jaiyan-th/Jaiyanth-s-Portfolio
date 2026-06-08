import { motion } from 'motion/react';
import React from 'react';
import { PORTFOLIO_DATA } from '../constants/portfolioData';
import { GraduationCap } from 'lucide-react';

export const Education = () => {
  return (
    <section id="education" className="relative min-h-screen flex flex-col justify-center py-24 px-6 overflow-hidden bg-white/[0.002]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="space-y-12">
          
          {/* Header */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] text-neon-cyan uppercase tracking-[0.6em]"
            >
              Academic
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Educational <span className="text-white/40">Background</span>
            </motion.h2>
          </div>

          {/* Timeline Stack */}
          <div className="relative border-l border-white/5 ml-2.5 md:ml-4 pl-6 md:pl-8 space-y-6">
            {PORTFOLIO_DATA.education.map((edu, i) => (
              <motion.div
                key={`${edu.institution}-${edu.degree}`}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative group"
              >
                {/* Timeline Node Dot */}
                <div className="absolute -left-[31px] md:-left-[39px] top-4 z-20 w-3 h-3 rounded-full bg-[#030303] border-2 border-neon-cyan flex items-center justify-center transition-all duration-300 group-hover:border-neon-cyan group-hover:shadow-[0_0_12px_rgba(0,242,255,0.6)]">
                  <span className="w-1 h-1 rounded-full bg-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Compact Modern Layout */}
                <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#080808]/60 backdrop-blur-md p-4 md:p-5 transition-all duration-300 hover:border-neon-cyan/20 hover:bg-[#0c0c0c]/80 hover:shadow-[0_0_20px_rgba(0,242,255,0.03)]">
                  {/* Backdrop Spotlight effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,242,255,0.02)_0%,transparent_80%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 z-10 relative">
                    {/* Left: Cap Icon and Info */}
                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                      <div className="flex-shrink-0 w-8.5 h-8.5 rounded-lg bg-neon-cyan/5 border border-neon-cyan/10 flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan group-hover:border-neon-cyan group-hover:text-black transition-all duration-300">
                        <GraduationCap size={15} />
                      </div>
                      
                      <div className="min-w-0 space-y-1">
                        <h4 className="text-sm md:text-base font-bold text-white/95 leading-tight group-hover:text-neon-cyan transition-colors duration-300">
                          {edu.institution}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-neon-purple/80 uppercase tracking-wider">
                          <span>{edu.degree}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Micro period badge */}
                    <div className="flex-shrink-0 self-start md:self-auto">
                      <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-[9px] font-mono text-white/40 uppercase tracking-widest whitespace-nowrap">
                        {edu.period}
                      </span>
                    </div>
                  </div>

                  {/* Score & Location details */}
                  <div className="mt-3.5 space-y-1.5 pl-0 md:pl-12 relative z-10">
                    <div className="text-xs text-neon-cyan font-mono tracking-wider font-semibold">
                      {edu.score}
                    </div>
                    {edu.location && (
                      <div className="text-xs text-white/40 font-mono tracking-wide">
                        Location: {edu.location}
                      </div>
                    )}
                  </div>

                  {/* Footer micro status indicator */}
                  <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center gap-2 pl-0 md:pl-12 text-[9px] font-mono uppercase tracking-widest text-white/30 relative z-10">
                    <span className={`w-1.5 h-1.5 rounded-full ${edu.period === 'Completed' ? 'bg-white/20' : 'bg-neon-cyan animate-pulse'}`} />
                    <span>Status: {edu.period === 'Completed' ? 'Completed Academic Session' : 'Active Term'}</span>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
