import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Search, Info, Award, Code, BookOpen, Mail, Link, ExternalLink, Sparkles, Navigation } from 'lucide-react';

interface CommandItem {
  icon: React.ReactNode;
  title: string;
  category: string;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle command palette on overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K or CTRL+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      // ESC closes
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands: CommandItem[] = [
    {
      icon: <Info className="w-4 h-4 text-neon-cyan" />,
      title: "Teleport to About Section",
      category: "Navigation",
      action: () => { window.location.href = '#about'; setIsOpen(false); }
    },
    {
      icon: <Code className="w-4 h-4 text-neon-cyan" />,
      title: "Teleport to Skills System",
      category: "Navigation",
      action: () => { window.location.href = '#skills'; setIsOpen(false); }
    },
    {
      icon: <Terminal className="w-4 h-4 text-neon-cyan" />,
      title: "Teleport to Project Showcase",
      category: "Navigation",
      action: () => { window.location.href = '#projects'; setIsOpen(false); }
    },
    {
      icon: <Award className="w-4 h-4 text-neon-cyan" />,
      title: "Teleport to Industry Internships",
      category: "Navigation",
      action: () => { window.location.href = '#internships'; setIsOpen(false); }
    },
    {
      icon: <BookOpen className="w-4 h-4 text-neon-cyan" />,
      title: "Teleport to Education Credentials",
      category: "Navigation",
      action: () => { window.location.href = '#education'; setIsOpen(false); }
    },
    {
      icon: <Mail className="w-4 h-4 text-neon-purple" />,
      title: "Initiate Direct Email Draft",
      category: "Communication",
      action: () => { window.location.href = 'mailto:jaiyanthofficial@gmail.com?subject=Inquiry from Portfolio'; setIsOpen(false); }
    },
    {
      icon: <ExternalLink className="w-4 h-4 text-[#bc13fe]" />,
      title: "Browse GitHub Repositories",
      category: "Social",
      action: () => { window.open('https://github.com/jaiyan-th', '_blank'); setIsOpen(false); }
    },
    {
      icon: <ExternalLink className="w-4 h-4 text-[#bc13fe]" />,
      title: "LinkedIn Profile Broadcast",
      category: "Social",
      action: () => { window.open('https://linkedin.com/in/jaiyan-th', '_blank'); setIsOpen(false); }
    },
    {
      icon: <Link className="w-4 h-4 text-neon-cyan" />,
      title: "Copy Shareable Portfolio Link",
      category: "Utility",
      action: () => {
        navigator.clipboard.writeText(window.location.origin);
        alert("Clipboard updated: Portfolio node link copied!");
        setIsOpen(false);
      }
    }
  ];

  // Filtering commands based on input
  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) || 
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard accessibility navigate down, up, enter keys inside list
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleNavKeys = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleNavKeys);
    return () => window.removeEventListener('keydown', handleNavKeys);
  }, [isOpen, filtered, selectedIndex]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh] px-4">
            
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Core Palette modal box */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-[#070707] border border-white/10 rounded-xl overflow-hidden glass shadow-[0_0_50px_rgba(0,242,255,0.12)] flex flex-col"
            >
              {/* Top input zone */}
              <div className="p-4 border-b border-white/5 flex items-center gap-3">
                <Search className="w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Query console or navigational links..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-white placeholder-white/45 outline-none font-mono"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono text-white/45 hover:text-white border border-white/5 uppercase"
                >
                  esc
                </button>
              </div>

              {/* Commands List stack */}
              <div 
                ref={listRef}
                className="max-h-[280px] overflow-y-auto p-2 space-y-0.5 no-scrollbar"
              >
                {filtered.map((cmd, i) => (
                  <button
                    key={cmd.title}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all font-mono text-xs cursor-pointer ${
                      i === selectedIndex 
                        ? 'bg-neon-cyan/10 border border-neon-cyan/20 text-white' 
                        : 'border border-transparent bg-transparent text-white/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-1 rounded-md ${
                        i === selectedIndex ? 'bg-neon-cyan/20' : 'bg-white/5'
                      }`}>
                        {cmd.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="block truncate">{cmd.title}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] uppercase tracking-wider text-white/35 font-light">
                        {cmd.category}
                      </span>
                      {i === selectedIndex && (
                        <Navigation className="w-3 h-3 text-neon-cyan animate-pulse" />
                      )}
                    </div>
                  </button>
                ))}

                {filtered.length === 0 && (
                  <div className="p-8 text-center text-white/45 font-mono text-xs">
                     console matching error: command not resolved
                  </div>
                )}
              </div>

              {/* Console system footer instruction */}
              <div className="p-3 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-between text-[8px] font-mono uppercase tracking-widest text-white/30 px-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  <span>JB Matrix System Terminal</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>↑↓ Nav</span>
                  <span>↵ Exec</span>
                </div>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};
