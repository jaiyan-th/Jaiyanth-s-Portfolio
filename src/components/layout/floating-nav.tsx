"use client";

import * as React from "react";
import { motion } from "motion/react";

export function FloatingNav() {
  const [active, setActive] = React.useState<string>("#hero");

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
    <header className="sticky top-0 z-50 bg-[#FAF3EE]/95 backdrop-blur-md border-b-2 border-black px-4 py-3 md:px-8 shadow-sm">
      <nav aria-label="Main Navigation" className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo + Name -> Scrolls to #hero */}
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.03, x: 2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 bg-black flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#B91C1C] transition-shadow group-hover:shadow-[3px_3px_0px_#B91C1C]">
            <span className="text-white text-[11px] font-black tracking-tighter font-mono">JB</span>
          </div>
          <span className="font-mono font-black text-base tracking-wider text-black uppercase">
            JAIYANTH B
          </span>
        </motion.a>

        {/* Center-Right Nav Links with Framer Motion Active Pill & Hover Physics */}
        <div className="hidden lg:flex items-center gap-2 bg-white/60 p-1.5 border border-black/20 rounded-md">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`font-mono text-[11px] uppercase tracking-widest font-black px-3.5 py-1.5 transition-all relative rounded-sm ${
                  isActive
                    ? "text-white bg-[#B91C1C] border border-black shadow-[2px_2px_0px_#000]"
                    : "text-black/80 hover:text-black hover:bg-black/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-[#B91C1C] border border-black shadow-[2px_2px_0px_#000] -z-10 rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="flex items-center">
          <motion.a
            href="#contact"
            whileHover={{ y: -2, x: -1, boxShadow: "4px 4px 0px #000000" }}
            whileTap={{ y: 1, x: 1, boxShadow: "1px 1px 0px #000000" }}
            className="bg-[#B91C1C] text-white font-mono text-[10.5px] font-black tracking-wider uppercase px-4 py-2 border-2 border-black shadow-[2px_2px_0px_#000000] transition-all text-center leading-tight flex flex-col justify-center"
          >
            <span>GET IN</span>
            <span>TOUCH</span>
          </motion.a>
        </div>
      </nav>
    </header>
  );
}

