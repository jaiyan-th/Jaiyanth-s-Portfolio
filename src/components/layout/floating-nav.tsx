"use client";

import * as React from "react";

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
    <header className="sticky top-0 z-50 bg-[#FAF3EE]/95 backdrop-blur-sm border-b border-black/10 px-4 py-3 md:px-8">
      <nav aria-label="Main Navigation" className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo + Name -> Scrolls to #hero */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-7 h-7 bg-black flex items-center justify-center border border-black">
            <span className="text-white text-[11px] font-bold tracking-tighter font-mono">JB</span>
          </div>
          <span className="font-mono font-bold text-base tracking-wider text-black uppercase">
            JAIYANTH B
          </span>
        </a>

        {/* Center-Right Nav Links (Clean Sans-Serif, Medium-Bold, ~10% Smaller) */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`font-sans text-[10px] uppercase tracking-widest font-bold py-1 transition-all relative ${
                  isActive ? "text-black border-b border-[#B91C1C]" : "text-black/75 hover:text-black"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="flex items-center">
          <a
            href="#contact"
            className="bg-[#B91C1C] text-white font-mono text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 border border-black/20 hover:bg-[#B91C1C]/90 transition-all text-center leading-tight flex flex-col justify-center"
          >
            <span>GET IN</span>
            <span>TOUCH</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
