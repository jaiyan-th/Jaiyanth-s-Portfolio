"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export function FloatingNav() {
  const [active, setActive] = React.useState<string>("#hero");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const navHrefs = ["#hero", "#about", "#skills", "#work", "#experience", "#achievements", "#contact"];
    const sections = navHrefs
      .map((href) => document.getElementById(href.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "WORK", href: "#work" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "ACHIEVEMENTS", href: "#achievements" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0C0E]/90 backdrop-blur-md border-b border-[#232323] px-4 py-2 md:px-8 shadow-sm">
      <nav aria-label="Main Navigation" className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo + Name -> Scrolls to #hero */}
        <motion.a
          href="#hero"
          onClick={() => setActive("#hero")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 group min-h-[44px] min-w-[44px]"
        >
          <div className="w-7 h-7 bg-[#141619] border border-[#232323] flex items-center justify-center transition-colors group-hover:border-[#6D2932]">
            <span className="text-[#F5F3EF] text-[11px] font-bold tracking-tighter font-mono">JB</span>
          </div>
          <span className="font-mono font-bold text-xs sm:text-sm tracking-widest text-[#F5F3EF] uppercase">
            JAIYANTH B
          </span>
        </motion.a>

        {/* Center Nav Links - Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`font-mono text-[11px] uppercase tracking-widest transition-colors py-2 relative ${
                  isActive
                    ? "text-[#F5F3EF] font-bold"
                    : "text-[#9A958D] hover:text-[#F5F3EF]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#6D2932]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            className="bg-[#6D2932] hover:bg-[#582027] text-white font-mono text-[10.5px] font-bold tracking-wider uppercase px-4 py-2 min-h-[40px] border border-[#6D2932] transition-all text-center leading-tight flex items-center justify-center cursor-pointer"
          >
            GET IN TOUCH
          </motion.a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden p-2 min-h-[40px] min-w-[40px] border border-[#232323] bg-[#141619] text-[#F5F3EF] flex items-center justify-center"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 pt-3 border-t border-[#232323] bg-[#0B0C0E] p-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-mono text-xs uppercase tracking-widest font-bold p-3 flex items-center border-b border-[#232323]/50 ${
                      isActive
                        ? "text-[#F5F3EF] border-[#6D2932]"
                        : "text-[#9A958D] hover:text-[#F5F3EF]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
