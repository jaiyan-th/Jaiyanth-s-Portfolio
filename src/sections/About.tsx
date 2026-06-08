import { motion, useInView } from 'motion/react';
import React, { useRef, useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../constants/portfolioData';
import { Target, User, Zap, Sparkles } from 'lucide-react';

const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1500;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const About = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center py-24 px-6 bg-white/[0.002]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Side: Story */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-neon-purple font-mono text-[10px] uppercase tracking-[0.6em]">
                <User size={12} />
                <span>Biography</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Crafting Intelligence <br />
                <span className="text-white/40">Through Systems & Code.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="prose prose-invert max-w-none text-xs md:text-sm text-white/60 leading-relaxed font-light"
            >
              <p>
                {PORTFOLIO_DATA.about.objective}
              </p>
            </motion.div>

            {/* Micro Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {PORTFOLIO_DATA.about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 rounded-lg border border-white/5 bg-[#080808]/40 space-y-1"
                >
                  <div className="text-xl md:text-2xl font-bold text-neon-cyan tracking-tight">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[8px] uppercase tracking-[0.2em] text-white/40 font-mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Focus Areas Cards */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl border border-white/5 bg-[#080808]/60 backdrop-blur-md p-5 transition-all duration-300 hover:border-neon-cyan/20"
            >
              {/* Radial spotlight effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.02)_0%,transparent_100%)] pointer-events-none" />

              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Target className="text-neon-cyan" size={14} />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/80">Focus Domains</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {PORTFOLIO_DATA.about.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-white/60 hover:border-neon-cyan/20 hover:text-neon-cyan transition-colors duration-300 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-start gap-2.5 text-white/40">
                    <Zap size={12} className="text-neon-purple mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] italic leading-normal font-light">
                      "Inventing the future by proactively structuring scalable cloud and smart AI algorithms daily."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Subtle background glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-neon-purple/5 blur-[80px] rounded-full pointer-events-none" />
          </div>
          
        </div>
      </div>
    </section>
  );
};

