import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Internship } from './sections/Internship';
import { Education } from './sections/Education';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { AIChatbot } from './components/AIChatbot';
import { CommandPalette } from './components/CommandPalette';

const Navbar = ({ scrollY, theme }: { scrollY: any; theme: 'dark' | 'light' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth fluid transitions
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    [
      theme === 'light' ? 'rgba(246, 248, 250, 0)' : 'rgba(0, 0, 0, 0)',
      theme === 'light' ? 'rgba(246, 248, 250, 0.92)' : 'rgba(0, 0, 0, 0.9)'
    ]
  );
  
  const padding = useTransform(
    scrollY,
    [0, 100],
    ['16px 0', '24px 0'] // Shifts from smaller to slightly larger padding
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(32px)']
  );

  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [
      theme === 'light' ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)',
      theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)'
    ]
  );

  const shadowOpacity = useTransform(
    scrollY,
    [0, 100],
    [
      theme === 'light' ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0)',
      theme === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(0, 0, 0, 0.5)'
    ]
  );

  const borderBottom = useTransform(borderOpacity, (v) => `1px solid ${v}`);
  const boxShadow = useTransform(shadowOpacity, (v) => `0 10px 30px -10px ${v}`);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Internships', href: '#internships' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        backgroundColor,
        padding,
        backdropFilter: backdropBlur,
        borderBottom,
        boxShadow,
      }}
      className="fixed top-0 left-0 w-full z-[1000]"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-neon-cyan transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium tracking-tight text-white/70"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default function App() {
  const { scrollY } = useScroll();

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.body;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToTopOpacity = useTransform(scrollY, [200, 500], [0, 1]);
  const scrollToTopScale = useTransform(scrollY, [200, 500], [0.8, 1]);
  const pointerEventsProps = useTransform(scrollToTopOpacity, (v) => v > 0.5 ? 'auto' : 'none');

  return (
    <div className="relative">
      <motion.main
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <Navbar scrollY={scrollY} theme={theme} />
        
        {/* Background Layers */}
        <div className="mesh-gradient" />
        <div className="spotlight" />
        <div className="noise" />

        <Hero />
        <About />
        <Skills />
        <Projects />
        <Internship />
        <Education />
        <Certifications />
        <Contact />

        {/* Floating Theme Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 right-6 z-[1001] w-9.5 h-9.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] cursor-pointer"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </motion.button>

        {/* Advanced Developer & AI Widgets */}
        <AIChatbot />
        <CommandPalette />
        
        {/* Scroll to Top Button */}
        <motion.button
          style={{ 
            opacity: scrollToTopOpacity,
            scale: scrollToTopScale,
            pointerEvents: pointerEventsProps as any
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 backdrop-blur-xl flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,242,255,0.2)]"
        >
          <ChevronDown className="rotate-180" size={24} />
        </motion.button>
      </motion.main>
    </div>
  );
}
