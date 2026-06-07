import { motion } from 'motion/react';
import React from 'react';
import { PORTFOLIO_DATA } from '../constants/portfolioData';
import { Award, ExternalLink } from 'lucide-react';

export const Certifications = () => {
  return (
    <section id="certifications" className="relative min-h-screen flex flex-col justify-center py-24 px-6 bg-white/[0.005]">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          
          {/* Header */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] text-neon-purple uppercase tracking-[0.6em]"
            >
              Verification
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Professional <span className="text-white/40">Certifications</span>
            </motion.h2>
          </div>

          {/* Compact Modern Horizontal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PORTFOLIO_DATA.certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative"
              >
                {/* Low-profile active container */}
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden rounded-xl border border-white/5 bg-[#080808]/60 backdrop-blur-md p-4 flex items-center justify-between gap-4 transition-all duration-300 hover:border-neon-purple/30 hover:bg-[#0c0c0c]/80 hover:shadow-[0_0_20px_rgba(188,19,254,0.05)] cursor-pointer block select-none"
                >
                  
                  {/* Radial spotlight effect behind cell on hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.03)_0%,transparent_100%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Left Side: Icon & Details */}
                  <div className="flex items-center gap-3.5 z-10 min-w-0 flex-1">
                    <div className="flex-shrink-0 w-8.5 h-8.5 rounded-lg bg-neon-purple/5 border border-neon-purple/10 flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:border-neon-purple group-hover:text-black transition-all duration-300">
                      <Award size={15} />
                    </div>
                    
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="text-xs md:text-sm font-semibold text-white/95 tracking-tight group-hover:text-neon-purple transition-colors duration-300" title={cert.name}>
                        {cert.name}
                      </h4>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Micro Status Badge & External link icon */}
                  <div className="flex-shrink-0 z-10 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-neon-purple/10 bg-neon-purple/[0.03] text-[8px] font-mono uppercase tracking-widest text-[#bc13fe]">
                      <span className="w-1 h-1 rounded-full bg-neon-purple animate-pulse" />
                      verified
                    </span>
                    <ExternalLink size={12} className="text-white/20 group-hover:text-neon-purple transition-colors duration-300" />
                  </div>

                </a>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
