import { motion } from 'motion/react';
import React from 'react';
import { PORTFOLIO_DATA } from '../constants/portfolioData';
import { MagneticButton } from '../components/ui/InteractiveElements';
import { ChevronDown, Cpu, Sparkles, Zap, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-28 pb-16">
      {/* Background Particles (Simulated with CSS/Motion) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 1200, 
              y: Math.random() * 800,
              opacity: Math.random() * 0.3
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [null, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 4, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-1 h-1 bg-neon-cyan/80 rounded-full"
          />
        ))}
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10 relative">
        
        {/* Left Side: Dynamic Intro */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="space-y-1.5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple leading-tight inline-block filter drop-shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                {PORTFOLIO_DATA.name.split(' ')[0]}
              </span>
            </h1>
          </div>

          <p className="text-sm md:text-base text-white/50 max-w-md leading-relaxed font-light">
            {PORTFOLIO_DATA.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <MagneticButton 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black hover:bg-neon-cyan hover:text-black py-2.5 px-5 text-xs shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2 font-semibold"
            >
              Explore Projects <ArrowRight size={12} />
            </MagneticButton>
            <MagneticButton 
              onClick={() => window.open('https://drive.google.com/file/d/1SlIxZv0mLxhFlUrK7sgKzF8KqvKFkjF4/view?usp=drive_link', '_blank')}
              className="border border-white/10 hover:border-neon-purple hover:text-neon-purple py-2.5 px-5 text-xs bg-white/[0.01]"
            >
              Explore CV
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right Side: Futuristic Status Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex flex-col justify-center space-y-4 relative w-full"
        >
          {/* Main Visual Card */}
          <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#080808]/80 backdrop-blur-md p-5 transition-all duration-300 hover:border-neon-purple/20 hover:shadow-[0_0_20px_rgba(188,19,254,0.02)]">
            <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-neon-purple/5 to-transparent pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="space-y-1">
                <div className="font-mono text-[8px] text-neon-cyan uppercase tracking-[0.6em] opacity-60">System Class</div>
                <h3 className="text-2xl font-black tracking-tight uppercase leading-tight">
                  AI & Fullstack <br />
                  <span className="text-transparent font-outline-2 text-xl" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)" }}>
                    Developer
                  </span>
                </h3>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase text-white/45">
                  <span className="tracking-wider">Focus Fields</span>
                  <span className="timeline-pulse select-none text-[8px] bg-neon-purple/10 text-neon-purple border border-neon-purple/20 px-1.5 py-0.5 rounded">Core</span>
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['// 01 AI', '// 02 WEB', '// 03 CLOUD'].map((field) => (
                    <span key={field} className="text-[9px] font-mono uppercase tracking-widest bg-white/5 text-white/60 px-2 py-1 rounded border border-white/5">
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress bar simulation */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[8px] font-mono uppercase text-white/30 tracking-widest">
                  <span>Resource allocation</span>
                  <span>100% capacity</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                  />
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-48 h-48 bg-neon-purple/5 blur-[80px] rounded-full pointer-events-none" />
          </div>

          {/* Scrolling horizontal light strip */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/35"
      >
        <span className="text-[8px] uppercase tracking-[0.5em] font-mono leading-none">Initialize Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="text-neon-cyan/60"
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
};

