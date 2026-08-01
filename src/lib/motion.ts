// Unified motion presets — SIGNAL / SYSTEM / STORY
// Primary easing: cubic-bezier(0.16, 1, 0.3, 1)
// Secondary easing: cubic-bezier(0.65, 0, 0.35, 1)

export const EASE = {
  primary: [0.16, 1, 0.3, 1] as const,
  secondary: [0.65, 0, 0.35, 1] as const,
};

export const DURATION = {
  micro: 0.24, // 240ms — micro interactions
  button: 0.36, // 360ms — buttons
  reveal: 0.78, // 780ms — reveals
  section: 1.0, // 1000ms — section transitions
  modal: 0.82, // 820ms — modal transition
} as const;

export const STAGGER = {
  children: 0.08, // 80ms between siblings
  words: 0.06, // 60ms between words
  lines: 0.1, // 100ms between lines
} as const;

// Masked line reveal — used for headings
export const maskLineVariants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.reveal, ease: EASE.primary },
  },
};

// Soft fade-up — used for paragraphs and cards
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE.primary },
  },
};

// Soft scale-in — used for project visuals
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.reveal, ease: EASE.primary },
  },
};

// Stagger container
export const staggerContainer = (stagger: number = STAGGER.children) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  },
});

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
