"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export function FloatingNav() {
  const [active, setActive] = React.useState<string>("#hero");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const navHrefs = ["#hero", "#about", "#skills", "#work", "#experience", "#achievements", "#certifications", "#contact"];
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
    { label: "HOME", href: "#hero" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "WORK", href: "#work" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "ACHIEVEMENTS", href: "#achievements" },
    { label: "CERTIFICATIONS", href: "#certifications" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#hero") {
      e.preventDefault();
      setActive("#hero");
      window.scrollTo({ top: 0, behavior: "smooth" });
      try {
        window.history.pushState(null, "", "#hero");
      } catch {}
    } else {
      setActive(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#EFEFEA]/95 backdrop-blur-md border-t-2 border-b-2 border-black px-4 py-2.5 md:px-8">
      <nav aria-label="Main Navigation" className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: KB Style Logo + Name */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-mono font-black text-xs border-2 border-black">
            JB
          </div>
          <span className="font-display text-2xl tracking-wider text-black uppercase">
            JAIYANTH B
          </span>
        </a>

        {/* Center Nav Links - Monospace Upper Case */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-mono text-xs uppercase tracking-widest font-black transition-colors relative cursor-pointer ${
                  isActive ? "text-black underline underline-offset-4 decoration-[#8E0000] decoration-2" : "text-black/70 hover:text-black"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right CTA Button: GET IN TOUCH */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ y: -2, x: -1, boxShadow: "5px 5px 0px #000000" }}
            whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
            className="bg-[#8E0000] hover:bg-[#700000] text-white font-display text-lg tracking-wider uppercase px-5 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>GET IN TOUCH →</span>
          </motion.a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden p-2 border-2 border-black bg-white shadow-[2px_2px_0px_#000000] text-black flex items-center justify-center"
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
            className="lg:hidden mt-3 pt-3 border-t-2 border-black bg-[#EFEFEA] p-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      handleNavClick(e, item.href);
                    }}
                    className={`font-mono text-xs uppercase tracking-widest font-black p-3 flex items-center border-2 ${
                      isActive
                        ? "bg-[#8E0000] text-white border-black shadow-[2px_2px_0px_#000000]"
                        : "bg-white text-black border-black"
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
