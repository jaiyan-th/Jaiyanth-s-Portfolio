// Expressive Neo-Brutalist Motion Presets
// Snappy ease-out, 150-200ms, fade + 12-16px slide

export const EASE = {
  primary: [0.2, 0.8, 0.2, 1] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
};

export const DURATION = {
  micro: 0.15, // 150ms — snappy hover / press
  button: 0.18,
  reveal: 0.45, // 450ms — scroll-in
  section: 0.5,
  modal: 0.25,
} as const;

export const STAGGER = {
  children: 0.08, // 80ms between siblings
  words: 0.05,
  lines: 0.08,
} as const;

// Neo-brutalist scroll reveal (fade + slide 12-16px)
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE.snappy },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.reveal, ease: EASE.snappy },
  },
};

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
