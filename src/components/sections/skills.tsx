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
  // scope   → ref attached to the .ticker element (the rotating wheel)
  // animate → scoped animate() from useAnimate, only affects .ticker's subtree
  const [scope, animate] = useAnimate<HTMLDivElement>();

  // Rotation motion values
  //   targetRotation  → updated instantly by scroll
  //   smoothRotation  → spring that follows targetRotation with inertia,
  //                     giving the wheel momentum that settles smoothly
  const targetRotation = useMotionValue(0);
  const smoothRotation = useSpring(targetRotation, {
    stiffness: 60,
    damping: 14,
    mass: 0.6,
  });

  // Track when the section first enters the viewport (one-shot)
  const isInView = useInView(scope, { once: true, margin: "-80px" });

  // ── Entry animation (one-shot) ────────────────────────────────
  // createTimeline()
  //   .add('.tick', { y: '-=6', duration: 50 }, stagger(10))
  //   .add('.ticker', { rotate: 360, duration: 1920 }, '<');
  // Both animations start at the same time. Runs once on first viewport entry.
  React.useEffect(() => {
    if (!isInView) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // '<' position → both animations start simultaneously
    animate(".tick", { y: -6 }, { duration: 0.05, delay: stagger(0.01) });
    const controls = motionAnimate(targetRotation, 360, {
      duration: 1.92,
      ease: "linear",
    });
    return () => controls.stop();
  }, [isInView, animate, targetRotation]);

  // ── Scroll-driven rotation ────────────────────────────────────
  // 0.2 deg per 1px scroll.
  //   Scroll down → clockwise (positive delta → positive rotation)
  //   Scroll up   → anticlockwise (negative delta → negative rotation)
  // Only updates while the section is in the viewport.
  // Inertia is provided by useSpring on smoothRotation — the wheel
  // continues briefly after scrolling stops, then settles.
  React.useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const section = scope.current;
    if (!section) return;

    let lastScrollY = window.scrollY;
    let inView = false;

    // Track visibility — only update rotation while the section is on screen
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        if (inView) {
          // Reset scroll baseline when entering to avoid a rotation jump
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

  // Arrange 7 nodes around a circle
  const positions = nodes.map((_, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    const r = 38;
    return {
      x: 50 + Math.cos(angle) * r,
      y: 50 + Math.sin(angle) * r,
    };
  });

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Constellation board — the bordered container (does NOT rotate) */}
      <div className="lg:col-span-7">
        <div className="relative aspect-square w-full border border-line bg-grid">
          {/* .ticker — the rotating wheel container.
              All children (SVG lines, center node, skill nodes with labels)
              rotate together so labels remain visually aligned with the wheel. */}
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
            {/* Connection lines */}
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
              {/* Lines between adjacent nodes */}
              {positions.map((p, i) => {
                const next = positions[(i + 1) % positions.length]!;
                return (
                  <line
                    key={`adj-${i}`}
                    x1={p.x}
                    y1={p.y}
                    x2={next.x}
                    y2={next.y}
                    stroke="var(--line)"
                    strokeWidth="0.15"
                    strokeDasharray="0.4 0.6"
                  />
                );
              })}
            </svg>

            {/* Center node */}
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
                <span
                  className="grid h-16 w-16 place-items-center rounded-full text-[10px] font-semibold"
                  style={{
                    background: "var(--accent)",
                    color: "var(--canvas)",
                  }}
                >
                  {activeGroup.index}
                </span>
                <span className="font-mono-label text-secondary">
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
                      scale: isActive ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.3, ease: EASE.primary }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span
                      className="tick grid h-10 w-10 place-items-center rounded-full border text-[10px] font-mono-label transition-colors duration-300"
                      style={{
                        background: isActive
                          ? "var(--surface)"
                          : "color-mix(in oklab, var(--elevated) 80%, transparent)",
                        borderColor: isActive ? "var(--accent)" : "var(--line)",
                        color: isActive ? "var(--accent)" : "var(--text-secondary)",
                      }}
                    >
                      {node.index}
                    </span>
                    <span
                      className={`text-[11px] tracking-tight transition-colors ${
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
        </div>
      </div>

      {/* Panel — NOT rotated */}
      <div className="lg:col-span-5">
        <div
          id={`skill-panel-${activeGroup.id}`}
          role="tabpanel"
          aria-labelledby={`skill-tab-${activeGroup.id}`}
          className="flex h-full flex-col border border-line p-8"
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
              <div className="flex items-center justify-between">
                <span className="font-mono-label text-secondary">
                  {activeGroup.index} / {activeGroup.label}
                </span>
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              </div>
              <h3 className="font-display text-[clamp(26px,3vw,38px)] leading-tight tracking-tight">
                {activeGroup.title}
              </h3>
              <p className="text-body text-secondary text-pretty">
                {activeGroup.description}
              </p>
              <ul className="flex flex-wrap gap-2">
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
