// ============================================================
// CENTRALIZED CONTENT SOURCE
// Marked with [PLACEHOLDER] for easy customization
// Factual details for Jaiyanth B, Applied AI & Full-Stack Engineer
// ============================================================

export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface FeaturedCaseData {
  index: string;
  tag: string;
  title: string;
  summary: string;
  highlights: string[];
  metrics: ProjectHighlight[];
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  image?: string;
  visualType: "rag-nodes" | "terminal" | "architecture";
}

export interface SelectedWorkItem {
  id: string;
  index: string; // e.g. "P. 02"
  title: string;
  summary: string;
  category: string;
  year: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  accentNote?: string;
}

export interface WhyWorkPoint {
  letter: string; // "A" | "B" | "C"
  title: string;
  description: string;
  tags: string[];
}

export interface HowIWorkStep {
  step: string; // "H. 01" ... "H. 04"
  title: string;
  description: string;
  deliverable: string;
}

export interface TechItem {
  name: string;
  category: string;
  icon?: string;
}

export const IDENTITY = {
  name: "Jaiyanth B",
  initials: "JB",
  role: "Applied AI & Full-Stack Engineer",
  location: "Karur, Tamil Nadu, India",
  timezone: "IST (UTC+5:30)",
  availability: "Open to roles · Replies within 24 hrs",
  statusPill: "Portfolio '26",
  statusRole: "Open to work",
  email: "jaiyanthofficial@gmail.com",
  github: "https://github.com/jaiyan-th",
  linkedin: "https://www.linkedin.com/in/jaiyan-th/",
  resumeUrl: "https://drive.google.com/file/d/1ro5v9Cb1Un-pj2ZEiKdZVDEPDeOpfEU_/view?usp=sharing",
  bookingUrl: "mailto:jaiyanthofficial@gmail.com?subject=Book%20a%20Call%20with%20Jaiyanth",
  bio: [
    "Final-year Computer Science & Business Systems engineer specializing in Applied AI systems, full-stack product engineering, and secure cloud architectures.",
    "Driven by building software that bridges rigorous probabilistic AI reasoning with deterministic, high-performance web backends.",
  ],
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
] as const;

export const HERO_CONTENT = {
  badgeYear: "Portfolio '26",
  badgeStatus: "Open to work",
  headlineWords: ["Applied", "AI", "&", "Full-Stack", "Engineer."],
  subtext:
    "Engineering intelligent products from signal to system. Specializing in RAG pipelines, production LLM integration, Python, SQL, and resilient full-stack architectures.",
  ctaPrimary: {
    label: "Explore Work",
    href: "#featured-case",
  },
  ctaSecondary: {
    label: "Book a Call",
    href: IDENTITY.bookingUrl,
  },
} as const;

// 01 Featured Case Study
export const FEATURED_CASE: FeaturedCaseData = {
  index: "01",
  tag: "FEATURED CASE · RAG FACT-CHECKING",
  title: "Fake News Detector — Grounded RAG Fact Verification",
  summary:
    "An autonomous fact-checking pipeline that retrieves semantically indexed news evidence from vector stores to score claims with strict source attribution and provenance.",
  highlights: [
    "[PLACEHOLDER] Grounded RAG pipeline cross-referencing incoming claims against vectorized news evidence with zero model hallucination.",
    "[PLACEHOLDER] High-throughput semantic retrieval layer using embeddings and vector search for sub-second claim resolution.",
    "[PLACEHOLDER] Full-stack architecture backed by Flask and Supabase with traceable provenance, cited URLs, and confidence calibration.",
  ],
  metrics: [
    { label: "Latency", value: "< 850ms" },
    { label: "Verification Precision", value: "94.2%" },
    { label: "Vector Search", value: "Qdrant" },
  ],
  stack: ["Python", "Flask", "LangChain", "Vector DB", "RAG", "Supabase", "LLM Integration", "News API"],
  liveUrl: "https://fake-news-detecter-kopi.onrender.com/",
  repoUrl: "https://github.com/jaiyan-th/Fake-News-Detecter",
  visualType: "rag-nodes",
};

// 02 Selected Work (Indexed list P. 02, P. 03, P. 04...)
export const SELECTED_WORK: SelectedWorkItem[] = [
  {
    id: "up-skill",
    index: "P. 02",
    title: "Up-Skill — AI Career & Interview Intelligence",
    summary:
      "[PLACEHOLDER] Multi-stage career agent running ATS resume scoring, conversational mock interviews, and personalized skill-gap mapping.",
    category: "Applied AI · Career Intelligence",
    year: "2025",
    stack: ["Python", "Flask", "LangChain", "Groq", "Mistral", "Supabase"],
    liveUrl: "https://upskill-ai-personalized-skill-and-career-w0px.onrender.com/",
    repoUrl: "https://github.com/jaiyan-th/UpSkill-AI-Personalized-Skill-and-Career-Assistant",
    accentNote: "Multi-Model Orchestration",
  },
  {
    id: "car-rent",
    index: "P. 03",
    title: "Car-Rent — Full-Stack Rental Platform",
    summary:
      "[PLACEHOLDER] Full-stack automotive platform with concurrency-safe reservation timelines, JWT/OAuth auth, and Prisma relational modeling.",
    category: "Full-Stack · Web Platform",
    year: "2025",
    stack: ["Next.js", "React", "TypeScript", "NestJS", "Prisma ORM", "PostgreSQL"],
    liveUrl: "https://car-rent-main-fcdo.onrender.com/",
    repoUrl: "https://github.com/jaiyan-th/Car-Rent-Main",
    accentNote: "Concurrency Invariant Schema",
  },
  {
    id: "secure-vault",
    index: "P. 04",
    title: "Secure Document Vault — Zero-Trust Cryptographic Storage",
    summary:
      "[PLACEHOLDER] High-assurance document store featuring AES-256-GCM authenticated encryption, Argon2 KDF, chunked streaming, and immutable audit logs.",
    category: "Full-Stack · Cybersecurity",
    year: "2025",
    stack: ["FastAPI", "Python", "SQLAlchemy", "PostgreSQL", "AES-256-GCM", "Argon2"],
    liveUrl: "https://jaiy-vault.onrender.com",
    repoUrl: "https://github.com/jaiyan-th/Secure-Digital-Document-Vault",
    accentNote: "Authenticated Encryption Stream",
  },
  {
    id: "preventive-ai-paper",
    index: "P. 05",
    title: "Preventive Healthcare Multimodal AI Framework",
    summary:
      "[PLACEHOLDER] IEEE Bahrain (ICETSIS 2026) co-authored research paper integrating image recognition with conversational triage for explainable clinic routing.",
    category: "AI Research · IEEE Paper",
    year: "2026",
    stack: ["Image Recognition", "Conversational AI", "Clinical Triage", "Research Methodology"],
    liveUrl: "https://drive.google.com/file/d/1ro5v9Cb1Un-pj2ZEiKdZVDEPDeOpfEU_/view?usp=sharing",
    repoUrl: "https://drive.google.com/file/d/1ro5v9Cb1Un-pj2ZEiKdZVDEPDeOpfEU_/view?usp=sharing",
    accentNote: "ICETSIS 2026 IEEE Bahrain",
  },
];

// 03 Why Work With Me (A, B, C)
export const WHY_WORK_WITH_ME: WhyWorkPoint[] = [
  {
    letter: "A",
    title: "Production-First AI Systems, Not Just Demos",
    description:
      "[PLACEHOLDER] I build around how people query, evaluate, and trust AI outputs, creating RAG pipelines and semantic retrieval that ground every answer in verifiable evidence instead of model hallucination.",
    tags: ["Grounded RAG", "Vector Search", "LLM Integration", "Prompt Engineering"],
  },
  {
    letter: "B",
    title: "Systems First, Screens Second: End-to-End Ownership",
    description:
      "[PLACEHOLDER] I start with the data contracts, schema constraints, and API boundaries behind the product, then shape the user interface around it so the system stays resilient, scalable, and easy to maintain.",
    tags: ["Next.js & React", "FastAPI & NestJS", "SQL & Supabase", "System Architecture"],
  },
  {
    letter: "C",
    title: "Density Is Not the Enemy: Rigour & Velocity",
    description:
      "[PLACEHOLDER] I don't simplify by stripping critical capabilities. I organize dense system telemetry, probabilistic signals, and complex workflows so teams and users can scan, understand, and act with confidence.",
    tags: ["Type Safety", "WCAG AA", "Micro-Interactions", "Clean Code"],
  },
];

// 04 How I Work (H. 01 – H. 04)
export const HOW_I_WORK: HowIWorkStep[] = [
  {
    step: "H. 01",
    title: "Discovery in the Open: Signal & Framing",
    description:
      "[PLACEHOLDER] I keep discovery collaborative and transparent, mapping raw data signals, user workflows, latency budgets, and edge constraints before committing to code.",
    deliverable: "Signal blueprint & user outcomes spec",
  },
  {
    step: "H. 02",
    title: "Decisions Documented, Not Just Designed",
    description:
      "[PLACEHOLDER] I make architectural reasoning and schema invariants visible, modeling type-safe API boundaries and vector schemas that scale without friction.",
    deliverable: "Interface contracts & schema migration plan",
  },
  {
    step: "H. 03",
    title: "Clear Contracts, Fewer Gaps",
    description:
      "[PLACEHOLDER] I code with production reality in mind, implementing strict DTO validation, comprehensive test coverage, and token benchmark instrumentation.",
    deliverable: "Verified implementation with telemetry benchmarks",
  },
  {
    step: "H. 04",
    title: "Support Where It Matters",
    description:
      "[PLACEHOLDER] I stay close to the live deployment, monitoring retrieval fidelity, error boundaries, and user interactions so the software thrives under real traffic.",
    deliverable: "Live cloud deployment with automated CI/CD",
  },
];

// 05 Tech / Trusted by Marquee
export const TECH_MARQUEE: TechItem[] = [
  { name: "Python", category: "Language" },
  { name: "SQL", category: "Database" },
  { name: "LangChain", category: "AI Orchestration" },
  { name: "LLM Integration", category: "Applied AI" },
  { name: "RAG Pipelines", category: "AI Architecture" },
  { name: "FastAPI", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "NestJS", category: "Backend" },
  { name: "Supabase", category: "Database & Auth" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Qdrant", category: "Vector Store" },
  { name: "Prisma ORM", category: "Data Layer" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Docker", category: "DevOps" },
  { name: "Git & GitHub", category: "Version Control" },
];

// Experience Summary (Internship & IEEE)
export const BACKGROUND_HIGHLIGHTS = {
  internship: {
    company: "Brainery Spot Technology",
    role: "AI Intern",
    period: "Jun – Jul 2025",
    bullets: [
      "[PLACEHOLDER] Built production-oriented applied AI prototypes with RAG and LLM reasoning.",
      "[PLACEHOLDER] Integrated REST API contracts with robust error recovery and test coverage.",
      "[PLACEHOLDER] Practiced prompt engineering iterations and team code reviews.",
    ],
  },
  research: {
    venue: "ICETSIS 2026 · IEEE Bahrain Section",
    title: "An AI Intelligence Wellness Framework Integrating Image Recognition and Conversational AI",
    date: "May 2026",
    role: "Co-Author",
  },
} as const;

// Marquee Text for Contact Section
export const CONTACT_MARQUEE = [
  "LET'S BUILD TOGETHER",
  "GET IN TOUCH",
  "OPEN FOR ROLES",
  "APPLIED AI & FULL-STACK",
  "LET'S BUILD TOGETHER",
  "GET IN TOUCH",
  "OPEN FOR ROLES",
  "APPLIED AI & FULL-STACK",
];
