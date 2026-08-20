// ============================================================
// PORTFOLIO TYPE SYSTEM
// Single source of truth for content shapes
// ============================================================

export type NavItem = {
  label: string;
  href: string;
  index: string;
};

export type SkillGroup = {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
  skills: string[];
  evidence: string;
  impact?: string;
};

export type ProjectStack = string[];

export type Project = {
  slug: string;
  number: string;
  category: string;
  title: string;
  summary: string;
  stack: ProjectStack;
  engineeringFocus: string;
  repository: string;
  liveUrl?: string;
  visual: string;
  image?: string;
  layout: "featured" | "reversed" | "cinematic";
  caseStudy: {
    overview: string;
    problem: string;
    approach: string;
    architecture: string;
    features: string[];
    challenges: string;
    learnings: string;
  };
};

export type ExperienceItem = {
  role: string;
  organisation: string;
  period: string;
  reflection: string;
  work: string[];
};

export type ResearchPaper = {
  title: string;
  venue: string;
  location: string;
  date: string;
  organiser: string;
  status: "co-authored" | "accepted" | "presented" | "published";
  concepts: string[];
  abstract: string;
  certificateUrl?: string;
};

export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type ContactLink = {
  label: string;
  value: string;
  href?: string;
  pending?: boolean;
};
