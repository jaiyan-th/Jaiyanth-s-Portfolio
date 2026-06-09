import { motion } from 'motion/react';
import React from 'react';
import { PORTFOLIO_DATA } from '../constants/portfolioData';
import { Code2, Cpu, Wrench, Users, Activity, Database, Sparkles, Terminal } from 'lucide-react';

const getCategoryIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('frontend')) return <Code2 size={13} />;
  if (t.includes('backend')) return <Terminal size={13} />;
  if (t.includes('ai') || t.includes('ml')) return <Sparkles size={13} />;
  if (t.includes('database')) return <Database size={13} />;
  if (t.includes('tools')) return <Wrench size={13} />;
  return <Users size={13} />;
};

const SkillCategory = ({ title, skills, delay = 0 }: { title: string, skills: string[], delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="space-y-4"
    >
      {/* Category Header */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
        <div className="w-6 h-6 rounded bg-neon-cyan/5 border border-neon-cyan/10 flex items-center justify-center text-neon-cyan">
          {getCategoryIcon(title)}
        </div>
        <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-white/90">{title}</h3>
      </div>

      {/* Grid of Micro Skill Badges */}
      <div className="grid grid-cols-2 gap-2">
        {skills.map((skill, i) => (
          <motion.div
            key={`${skill}-${i}`}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-lg border border-white/5 bg-[#080808]/50 p-2.5 flex items-center justify-between transition-all duration-300 hover:border-neon-cyan/20 hover:bg-[#0c0c0c]/80"
          >
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,242,255,0.015)_0%,transparent_100%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <span className="text-[11px] font-medium text-white/70 group-hover:text-neon-cyan transition-colors truncate">
              {skill}
            </span>
            
            <Activity size={10} className="text-white/10 group-hover:text-neon-cyan/40 transition-colors flex-shrink-0 ml-1.5" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="relative py-20 md:py-28 px-6 overflow-hidden bg-white/[0.005]">
      {/* Subtle modern circular visual matrix */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] border border-white/[0.02] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-white/[0.01] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] text-neon-cyan uppercase tracking-[0.6em]"
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Technical <span className="text-white/40">Arsenal</span>
          </motion.h2>
        </div>

        {/* Categories container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCategory 
            title="Frontend Dev" 
            skills={PORTFOLIO_DATA.skills.frontend || []} 
            delay={0.05}
          />
          <SkillCategory 
            title="Backend Dev" 
            skills={PORTFOLIO_DATA.skills.backend || []} 
            delay={0.1}
          />
          <SkillCategory 
            title="AI / ML Systems" 
            skills={PORTFOLIO_DATA.skills.aiml || []} 
            delay={0.15}
          />
          <SkillCategory 
            title="Databases" 
            skills={PORTFOLIO_DATA.skills.databases || []} 
            delay={0.2}
          />
          <SkillCategory 
            title="Tools & Tech" 
            skills={PORTFOLIO_DATA.skills.tools || []} 
            delay={0.25}
          />
          <SkillCategory 
            title="Core Soft Skills" 
            skills={PORTFOLIO_DATA.skills.soft || []} 
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

