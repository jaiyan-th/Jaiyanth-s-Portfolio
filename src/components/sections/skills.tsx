"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useAnimate,
  useInView,
  useMotionValue,
  useSpring,
  stagger,
  animate as motionAnimate,
} from "motion/react";
import { SKILL_GROUPS } from "@/data/portfolio";
import { EASE, DURATION } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/masked-heading";

// 0.2 degrees of rotation per 1 pixel of scroll
const ROTATION_PER_PX = 0.2;

export function Skills() {
  const [active, setActive] = React.useState<string>(SKILL_GROUPS[0]!.id);
  const activeGroup = SKILL_GROUPS.find((g) => g.id === active)!;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative section-spacing border-t border-line"
    >
      <div className="container-editorial">
        <SectionHeader
          index="02"
          label="Skills System"
          title="Seven evidence-based skill groups."
          supporting="Every skill shown is supported by a project, internship task, or research contribution."
        />

        {/* Desktop: interactive constellation */}
        <div className="mt-16 hidden md:block">
          <ConstellationView
            active={active}
            setActive={setActive}
            activeGroup={activeGroup}
          />
        </div>

        {/* Mobile: horizontal scroll snap */}
        <div className="mt-12 -mx-[4vw] md:hidden">
          <div className="no-scrollbar flex snap-x-card gap-4 overflow-x-auto px-[4vw] pb-4">
            {SKILL_GROUPS.map((g) => (
              <article
                key={g.id}
                className="flex w-[84vw] flex-shrink-0 flex-col gap-4 border border-line p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-label text-secondary">
                    {g.index} / {g.label}
                  </span>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                </div>
                <h3 className="font-display text-[28px] leading-tight tracking-tight">
                  {g.title}
                </h3>
                <p className="text-[14px] text-secondary text-pretty">{g.description}</p>
                <ul className="flex flex-wrap gap-2 pt-2">
                  {g.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line px-3 py-1 text-[12px]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-line pt-4">
                  <span className="font-mono-label text-secondary">Evidence</span>
                  <p className="mt-2 text-[13px] text-foreground text-pretty">
                    {g.evidence}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-body text-secondary text-pretty">
          Every skill shown is supported by a project, internship task, or research
          contribution.
        </p>
      </div>
    </section>
  );
}

function ConstellationView({
  active,
  setActive,
  activeGroup,
}: {
  active: string;
  setActive: (id: string) => void;
  activeGroup: (typeof SKILL_GROUPS)[number];
}) {
  const nodes = SKILL_GROUPS;

  // ── Animation setup ───────────────────────────────────────────
  const [scope, animate] = useAnimate<HTMLDivElement>();

  const targetRotation = useMotionValue(0);
  const smoothRotation = useSpring(targetRotation, {
    stiffness: 60,
    damping: 14,
    mass: 0.6,
  });

  const isInView = useInView(scope, { once: true, margin: "-80px" });

  // ── Entry animation (one-shot) ────────────────────────────────
  React.useEffect(() => {
    if (!isInView) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    animate(".tick", { y: -6 }, { duration: 0.05, delay: stagger(0.01) });
    const controls = motionAnimate(targetRotation, 360, {
      duration: 1.92,
      ease: "linear",
    });
    return () => controls.stop();
  }, [isInView, animate, targetRotation]);

  // ── Scroll-driven rotation ────────────────────────────────────
  React.useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const section = scope.current;
    if (!section) return;

    let lastScrollY = window.scrollY;
    let inView = false;

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        if (inView) {
          lastScrollY = window.scrollY;
        }
      },
      { rootMargin: "0px", threshold: 0 }
    );
    io.observe(section);

    const onScroll = () => {
      if (!inView) return;
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      targetRotation.set(targetRotation.get() + delta * ROTATION_PER_PX);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [scope, targetRotation]);

  // Arrange 7 nodes around a circle — slightly tighter radius
  const positions = nodes.map((_, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    const r = 38;
    return {
      x: Number((50 + Math.cos(angle) * r).toFixed(4)),
      y: Number((50 + Math.sin(angle) * r).toFixed(4)),
      // Angle for label rotation (degrees)
      labelAngle: (i / nodes.length) * 360 - 90,
    };
  });

  // Tick marks around the perimeter (compass-like)
  const compassTicks = Array.from({ length: 48 }, (_, i) => {
    const angle = (i / 48) * 360;
    const isMajor = i % 6 === 0;
    return { angle, isMajor };
  });

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      {/* ── Rotating wheel — compact 5-column slot ─────────────── */}
      <div className="lg:col-span-5">
        <div className="relative aspect-square w-full border border-line bg-grid overflow-hidden">
          {/* Static decorative layer: orbital arcs (do NOT rotate) */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Outer orbital ring — dashed */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="var(--line)"
              strokeWidth="0.15"
              strokeDasharray="0.8 1.2"
              opacity="0.6"
            />
            {/* Middle orbital ring */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="var(--line)"
              strokeWidth="0.12"
              strokeDasharray="0.4 0.8"
              opacity="0.4"
            />
            {/* Inner orbital ring */}
            <circle
              cx="50"
              cy="50"
              r="22"
              fill="none"
              stroke="var(--line)"
              strokeWidth="0.12"
              strokeDasharray="0.3 0.6"
              opacity="0.3"
            />
            {/* Soft halo behind center */}
            <circle
              cx="50"
              cy="50"
              r="14"
              fill="var(--node-glow)"
              opacity="0.7"
            />
          </svg>

          {/* .ticker — the rotating wheel container */}
          <motion.div
            ref={scope}
            className="ticker absolute inset-0"
            role="tablist"
            aria-label="Skill groups"
            style={{
              rotate: smoothRotation,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            {/* Compass tick marks (rotate with wheel) */}
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {compassTicks.map((tick, i) => {
                const rad = (tick.angle * Math.PI) / 180;
                const inner = tick.isMajor ? 43 : 44.5;
                const outer = 46.5;
                const x1 = Number((50 + Math.cos(rad) * inner).toFixed(4));
                const y1 = Number((50 + Math.sin(rad) * inner).toFixed(4));
                const x2 = Number((50 + Math.cos(rad) * outer).toFixed(4));
                const y2 = Number((50 + Math.sin(rad) * outer).toFixed(4));
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--accent)"
                    strokeWidth={tick.isMajor ? "0.3" : "0.15"}
                    opacity={tick.isMajor ? 0.5 : 0.25}
                  />
                );
              })}
            </svg>

            {/* Connection lines + orbital polygon */}
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Lines from center to each node */}
              {positions.map((p, i) => {
                const isActive = nodes[i]!.id === active;
                return (
                  <motion.line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={p.x}
                    y2={p.y}
                    stroke="var(--line)"
                    strokeWidth={isActive ? "0.4" : "0.2"}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease: EASE.primary }}
                    style={
                      isActive
                        ? { stroke: "var(--accent)" }
                        : undefined
                    }
                  />
                );
              })}
              {/* Polygon connecting all nodes */}
              <motion.polygon
                points={positions.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="var(--line)"
                strokeWidth="0.15"
                strokeDasharray="0.4 0.6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </svg>

            {/* Center node — glowing hub */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: "50%", top: "50%" }}
            >
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE.primary }}
                className="flex flex-col items-center gap-1"
              >
                {/* Pulsing glow ring */}
                <span
                  aria-hidden
                  className="absolute h-20 w-20 rounded-full animate-pulse-dot"
                  style={{
                    background: "radial-gradient(circle, var(--node-glow) 0%, transparent 70%)",
                  }}
                />
                <span
                  className="relative grid h-14 w-14 place-items-center rounded-full text-[11px] font-semibold"
                  style={{
                    background: "var(--accent)",
                    color: "var(--canvas)",
                    boxShadow: "0 0 24px var(--node-glow), 0 0 8px var(--accent)",
                  }}
                >
                  {activeGroup.index}
                </span>
                <span className="relative font-mono-label text-secondary">
                  {activeGroup.label}
                </span>
              </motion.div>
            </div>

            {/* Skill nodes — .tick marks each node circle */}
            {nodes.map((node, i) => {
              const p = positions[i]!;
              const isActive = node.id === active;
              return (
                <button
                  key={node.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`skill-panel-${node.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(node.id)}
                  onFocus={() => setActive(node.id)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      setActive(nodes[(i + 1) % nodes.length]!.id);
                      e.preventDefault();
                    } else if (e.key === "ArrowLeft") {
                      setActive(nodes[(i - 1 + nodes.length) % nodes.length]!.id);
                      e.preventDefault();
                    }
                  }}
                  data-cursor="explore"
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.3, ease: EASE.primary }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span
                      className="tick grid h-9 w-9 place-items-center rounded-full border text-[9.5px] font-mono-label transition-colors duration-300"
                      style={{
                        background: isActive
                          ? "var(--accent)"
                          : "color-mix(in oklab, var(--elevated) 90%, transparent)",
                        borderColor: isActive ? "var(--accent)" : "var(--line)",
                        color: isActive ? "var(--canvas)" : "var(--text-secondary)",
                        boxShadow: isActive
                          ? "0 0 16px var(--node-glow)"
                          : "none",
                      }}
                    >
                      {node.index}
                    </span>
                    <span
                      className={`text-[10px] tracking-tight transition-colors whitespace-nowrap ${
                        isActive ? "text-foreground" : "text-secondary"
                      }`}
                    >
                      {node.label}
                    </span>
                  </motion.div>
                </button>
              );
            })}
          </motion.div>

          {/* Compass marker — static, bottom-left corner */}
          <span
            aria-hidden
            className="absolute bottom-3 left-3 font-mono-label !text-[8px] text-secondary opacity-60"
          >
            N
          </span>
          {/* Coordinate label — static, top-right corner */}
          <span
            aria-hidden
            className="absolute right-3 top-3 font-mono-label !text-[8px] text-secondary opacity-60"
          >
            SKILL.MAP / 07
          </span>
        </div>
      </div>

      {/* ── Skill details card — expanded 7-column slot ────────── */}
      <div className="lg:col-span-7">
        <div
          id={`skill-panel-${activeGroup.id}`}
          role="tabpanel"
          aria-labelledby={`skill-tab-${activeGroup.id}`}
          className="flex h-full flex-col border border-line p-8 lg:p-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: DURATION.reveal, ease: EASE.primary }}
              className="flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono-label text-secondary">
                  {activeGroup.index} / {activeGroup.label}
                </span>
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              </div>

              {/* Title */}
              <h3 className="font-display text-[clamp(26px,3vw,38px)] leading-tight tracking-tight">
                {activeGroup.title}
              </h3>

              {/* Description */}
              <p className="text-body text-secondary text-pretty">
                {activeGroup.description}
              </p>

              {/* Skills grid */}
              <div>
                <span className="font-mono-label text-secondary">Skills</span>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {activeGroup.skills.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 * i, duration: 0.4, ease: EASE.primary }}
                      className="rounded-full border border-line px-3.5 py-1.5 text-[13px]"
                    >
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Evidence */}
              <div className="mt-auto border-t border-line pt-5">
                <span className="font-mono-label text-secondary">Project evidence</span>
                <p className="mt-2 text-[14px] text-foreground text-pretty">
                  {activeGroup.evidence}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
