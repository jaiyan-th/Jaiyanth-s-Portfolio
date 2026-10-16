"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { IDENTITY, NAV_LINKS } from "@/data/content";
import { CASE_STUDIES } from "@/data/case-studies";

export function FloatingNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = React.useState<string>("#hero");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  // Close drawer on pathname change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // EFFECT 1: Always tracks scroll for the "scrolled" header state on EVERY page
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // EFFECT 2: Route-based active tab (derived from route type) & scroll-spy ONLY when pathname === "/"
  React.useEffect(() => {
    if (!pathname) return;

    if (pathname !== "/") {
      if (pathname.startsWith("/about")) {
        setActive("#about");
        return;
      }
      if (pathname.startsWith("/work")) {
        const slug = pathname.replace("/work/", "").split("/")[0];
        const project = CASE_STUDIES[slug];
        if (
          project?.category.toLowerCase().includes("research") ||
          project?.tag.toLowerCase().includes("research") ||
          project?.domain.toLowerCase().includes("research")
        ) {
          setActive("#research");
        } else {
          setActive("#work");
        }
        return;
      }
      return;
    }

    // Scroll-spy ONLY on homepage
    const handleScrollSpy = () => {
      if (window.scrollY < 80) {
        setActive("#hero");
        return;
      }

      const sectionIds = ["research", "experience", "work", "about", "hero"];
      const targetPoint = 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetPoint && rect.bottom > targetPoint) {
            setActive(`#${id}`);
            return;
          }
        }
      }
    };

    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      if (pathname !== "/") {
        e.preventDefault();
        router.push(`/${href}`);
        return;
      }
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        setActive(href);
      }
    }
  };

  return (
    <header
      style={{
        paddingTop: "max(0.4rem, env(safe-area-inset-top, 0.4rem))",
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#F5F3EE]/95 backdrop-blur-md border-b-[1.5px] border-[#111111] pb-2 shadow-[0_2px_0px_rgba(17,17,17,0.1)]"
          : "bg-transparent border-b border-transparent pb-2 sm:pb-2.5"
      }`}
    >
      <div className="site-container flex items-center justify-between">
        {/* Left: Clean Brand Name with Red Dot */}
        <a
          href="/#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group flex items-center gap-2.5 min-h-[40px] py-1 font-sans text-[15px] font-medium tracking-tight text-[#111111] transition-colors focus-visible:outline-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8472B] inline-block transition-transform duration-200 group-hover:scale-125 shrink-0" />
          <span className="group-hover:text-[#E8472B] transition-colors">
            {IDENTITY.name}
          </span>
        </a>

        {/* Right: Clean Navigation Links (Inter, 14px, weight 500) */}
        <motion.nav
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 py-1"
        >
          {NAV_LINKS.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-sans text-[14px] font-medium tracking-normal transition-colors relative py-2 min-h-[44px] flex items-center ${
                  isActive
                    ? "text-[#111111]"
                    : "text-[#555555] hover:text-[#E8472B]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E8472B]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </motion.nav>

        {/* Mobile Hamburger on Right (min 48x48 tap target) */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="w-12 h-12 flex items-center justify-center text-[#111111] hover:text-[#E8472B] transition-colors focus-visible:outline-none"
          >
            {isOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Menu className="w-6 h-6 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Inter 14px 500 tap targets) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b-2 border-[#111111] bg-[#F5F3EE] px-6 py-4 shadow-[0_4px_0px_#111111]"
          >
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-sans text-[14px] font-medium min-h-[48px] flex items-center justify-between py-2 transition-colors ${
                      isActive
                        ? "text-[#E8472B]"
                        : "text-[#555555] hover:text-[#E8472B]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#E8472B]" />
                    )}
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
