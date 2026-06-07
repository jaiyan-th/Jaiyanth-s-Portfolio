import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA } from '../constants/portfolioData';
import { ExternalLink, Github, Search, X, Zap, Cpu, ShieldCheck, Layers } from 'lucide-react';

const CATEGORIES = ['All', 'AI / ML', 'Cybersecurity', 'AI Assistance', 'Fullstack'];

export const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter((p) => {
      // Tab match
      const matchesTab = activeTab === 'All' || p.category === activeTab;
      
      // Search query match
      const matchesSearch = searchQuery.trim() === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <section id="projects" className="relative min-h-screen flex flex-col justify-center py-24 px-6 overflow-hidden bg-black/40">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header content and search / filters bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-neon-cyan uppercase tracking-[0.4em]"
            >
              SELECTED WORK
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-white"
            >
              Engineering <span className="text-white/40">Portfolio</span>
            </motion.h2>
          </div>

          {/* Quick interactive search input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects, technologies, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 text-xs bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                activeTab === cat 
                  ? 'text-black bg-neon-cyan border-neon-cyan shadow-[0_0_15px_rgba(0,242,255,0.25)]' 
                  : 'text-white/60 bg-white/[0.02] border border-white/5 hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Grid list */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full"
              >
                {/* Visual Glass Wrapper */}
                <div className="h-full relative overflow-hidden rounded-xl border border-white/5 bg-[#080808]/85 backdrop-blur-md p-6 flex flex-col justify-between gap-6 transition-all duration-300 hover:border-neon-cyan/30 hover:shadow-[0_0_30px_rgba(0,242,255,0.03)] pb-5">
                  
                  {/* Subtle vector spotlight glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.012)_0%,transparent_100%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="space-y-4">
                    {/* Compact category tag and title headers */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[9px] font-mono text-neon-cyan uppercase tracking-wider border border-white/5">
                        {project.category}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base md:text-lg font-bold text-white group-hover:text-neon-cyan transition-colors duration-300 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>



                    {/* Stack technology list pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech.map((t: string) => (
                        <span 
                          key={t}
                          className="px-2.5 py-0.5 text-[9px] font-mono bg-white/[0.02] border border-white/5 rounded text-white/50 uppercase tracking-wide"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions / CTA footer */}
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between z-10 text-[10px] font-mono uppercase tracking-wider">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-white/40 hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={12} />
                      <span>Code Repository</span>
                    </a>
                    
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md border border-neon-cyan/20 bg-neon-cyan/[0.02] text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,242,255,0.05)] cursor-pointer hover:border-transparent font-medium"
                    >
                      <span>Review Details</span>
                      <ExternalLink size={10} />
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 border border-dashed border-white/5 rounded-xl bg-white/[0.002]">
            <p className="text-xs text-white/40 font-mono">No matching project modules found</p>
          </div>
        )}

      </div>

      {/* Case Study Full-Screen Portal Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal dialog box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#060606] border border-white/10 rounded-xl overflow-hidden glass shadow-[0_0_50px_rgba(0,242,255,0.1)] max-h-[90vh] flex flex-col"
            >
              {/* Top border ambient sweep line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-blue" />
              
              {/* Header block */}
              <div className="p-6 pb-4 border-b border-white/5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.03] text-[9px] font-mono text-neon-cyan uppercase tracking-widest leading-none">
                    <Zap className="w-2.5 h-2.5" /> Core Systems Overview
                  </span>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable specs zone */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-white/85 leading-relaxed no-scrollbar max-w-full">
                
                {/* Metrics ribbon */}
                {selectedProject.metrics && (
                  <div className="grid grid-cols-3 gap-3 bg-white/[0.01] border border-white/5 rounded-xl p-3 text-center">
                    {selectedProject.metrics.map((metric: any, i: number) => (
                      <div key={i} className="space-y-0.5">
                        <div className="text-neon-cyan font-mono text-sm md:text-base font-bold">
                          {metric.value}
                        </div>
                        <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Left/Right layout columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#bc13fe] flex items-center gap-1 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Key Problem
                      </span>
                      <p className="text-white/60 text-xs leading-relaxed text-justify">
                        {selectedProject.problem}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neon-cyan flex items-center gap-1 font-bold">
                        <Cpu className="w-3.5 h-3.5" /> Implemented Solution
                      </span>
                      <p className="text-white/60 text-xs leading-relaxed text-justify">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 flex items-center gap-1 font-bold">
                        <Layers className="w-3.5 h-3.5" /> Core Capabilities
                      </span>
                      <ul className="space-y-1.5 font-light">
                        {selectedProject.features.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5 text-white/70">
                            <span className="text-neon-cyan mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Architecture statement details */}
                {selectedProject.architecture && (
                  <div className="space-y-1.5 border-t border-white/5 pt-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">
                      Engineering Architecture Overview
                    </span>
                    <p className="text-white/60 font-mono text-[9px] bg-black/45 hover:bg-black/80 hover:border-white/10 transition-all p-3 border border-white/5 rounded-lg leading-relaxed text-left">
                      {selectedProject.architecture}
                    </p>
                  </div>
                )}

                {/* Stacks lists */}
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">
                    Validated Technical Core
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((t: string) => (
                      <span 
                        key={t}
                        className="px-2.5 py-1 text-[9px] font-mono bg-white/[0.02] border border-white/5 rounded text-white/60 hover:text-neon-cyan hover:border-neon-cyan/20 transition-all uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action buttons ribbon footer */}
              <div className="p-6 pt-4 border-t border-white/5 bg-[#080808] flex items-center justify-between gap-4">
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white/45 hover:text-white transition-colors"
                >
                  <Github size={14} />
                  <span>Explore Stack Repository</span>
                </a>
                
                <a 
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neon-cyan font-mono text-xs font-bold text-black hover:bg-neon-cyan/80 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,255,0.2)] cursor-pointer"
                >
                  <span>Build Live</span>
                  <ExternalLink size={12} />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
