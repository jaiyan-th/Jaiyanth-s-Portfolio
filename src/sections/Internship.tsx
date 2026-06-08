import { motion } from 'motion/react';
import React from 'react';
import { PORTFOLIO_DATA } from '../constants/portfolioData';
import { Briefcase, Cpu, Cloud } from 'lucide-react';

const getIcon = (role: string) => {
  if (role.toLowerCase().includes('machine learning')) return <Cpu size={15} />;
  if (role.toLowerCase().includes('cloud')) return <Cloud size={15} />;
  return <Briefcase size={15} />;
};

export const Internship = () => {
  return (
    <section id="internships" className="relative min-h-screen flex flex-col justify-center py-24 px-6 bg-white/[0.005]">
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
              Professional
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Industry <span className="text-white/40">Immersion</span>
            </motion.h2>
          </div>

          {/* Compact Modern Dual Row/Grid */}
          <div className={`grid grid-cols-1 ${PORTFOLIO_DATA.internships.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'} gap-4`}>
            {PORTFOLIO_DATA.internships.map((intern, i) => (
              <motion.div
                key={intern.role}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative"
              >
                {/* Low-profile active container */}
                <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#080808]/60 backdrop-blur-md p-4.5 flex flex-col justify-between gap-4 h-full transition-all duration-300 hover:border-neon-cyan/30 hover:bg-[#0c0c0c]/80 hover:shadow-[0_0_20px_rgba(0,242,255,0.05)]">
                  
                  {/* Radial spotlight effect behind cell on hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.02)_0%,transparent_100%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="space-y-3.5 z-10">
                    {/* Header Row: Icon & Status */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-shrink-0 w-8.5 h-8.5 rounded-lg bg-neon-cyan/5 border border-neon-cyan/10 flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan group-hover:border-neon-cyan group-hover:text-black transition-all duration-300">
                        {getIcon(intern.role)}
                      </div>
                      
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-neon-cyan/10 bg-neon-cyan/[0.03] text-[8px] font-mono uppercase tracking-widest text-neon-cyan">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                        {intern.period}
                      </span>
                    </div>

                    {/* Role & Details */}
                    <div className="space-y-1.5">
                      <h4 className="text-sm md:text-base font-bold text-white/95 tracking-tight group-hover:text-neon-cyan transition-colors duration-300">
                        {intern.role}
                      </h4>
                      {intern.company && (
                        <div className="text-[11px] font-mono text-neon-purple uppercase tracking-wide font-medium">
                          {intern.company} {intern.location ? `| ${intern.location}` : ""}
                        </div>
                      )}
                      <p className="text-xs text-white/50 leading-relaxed font-light">
                        {intern.description}
                      </p>
                    </div>
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
