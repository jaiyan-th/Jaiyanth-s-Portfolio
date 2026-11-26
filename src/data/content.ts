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
    "Computer Science & Business Systems (CSBS) student (Batch 2023–2027) at V.S.B. Engineering College, specializing in Applied AI systems, full-stack product engineering, and secure software architectures.",
    "Driven by building software that bridges practical machine learning and grounded AI reasoning with deterministic, high-performance web backends.",
  ],
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
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
  tag: "FEATURED CASE · TEXT-TO-SQL AGENT",
  title: "SQL Query Agent — Natural Language to SQL",
  summary:
    "Ask questions in plain English, inspect the answer alongside its generated SQL, and explore results as interactive tables or Recharts visualizations.",
  highlights: [
    "Multi-round Groq LLM tool-calling loop inspecting live schemas and executing read-only queries.",
    "AST-level SQL safety validation via sqlglot restricting operations to analytics queries.",
    "Full-stack FastAPI and React + Recharts interface supporting SQLite, PostgreSQL, and MySQL.",
  ],
  metrics: [
    { label: "LLM Engine", value: "Groq Llama 3.3" },
    { label: "SQL Guardrails", value: "sqlglot AST" },
    { label: "DB Support", value: "Read-Only" },
  ],
  stack: ["Python", "FastAPI", "Groq", "SQLAlchemy", "sqlglot", "React", "Recharts", "Tailwind CSS"],
  liveUrl: "https://github.com/jaiyan-th/SQL-Query-Agent",
  repoUrl: "https://github.com/jaiyan-th/SQL-Query-Agent",
  visualType: "terminal",
};

// 02 Selected Work (Indexed list P. 01, P. 02, P. 03)
export const SELECTED_WORK: SelectedWorkItem[] = [
  {
    id: "sql-query-agent",
    index: "P. 01",
    title: "SQL Query Agent — Natural Language to SQL",
    summary:
      "Natural-language to SQL analytics agent powered by Groq tool-calling, sqlglot AST safety validation, and interactive Recharts visualizations.",
    category: "Applied AI · Text-to-SQL",
    year: "2026",
    stack: ["Python", "FastAPI", "Groq", "SQLAlchemy", "sqlglot", "React", "Recharts"],
    repoUrl: "https://github.com/jaiyan-th/SQL-Query-Agent",
    accentNote: "sqlglot AST Guardrails",
  },
  {
    id: "fake-news-detector",
    index: "P. 02",
    title: "AI News Verification System — Vector RAG Fact-Checking",
    summary:
      "LLM + Vector RAG evidence verification system using Groq, NewsAPI, Google News, and FastEmbed semantic search.",
    category: "Applied AI · RAG Verification",
    year: "2025–26",
    stack: ["Python", "FastAPI", "FastEmbed", "Groq", "NewsAPI", "SerpAPI"],
    repoUrl: "https://github.com/jaiyan-th/AI-Powered-Fake-News-Detecter",
    accentNote: "FastEmbed Vector RAG",
  },
  {
    id: "smarthire-ai",
    index: "P. 03",
    title: "SmartHire AI — Mock Interview & Assessment Platform",
    summary:
      "Production-grade AI mock interview and candidate assessment platform with ATS resume parsing, real-time telemetry, and 4-pillar scoring.",
    category: "Applied AI · Full-Stack",
    year: "2025–26",
    stack: ["Python", "Django 5.2", "DRF", "Groq", "OpenAI", "PostgreSQL", "Docker"],
    repoUrl: "https://github.com/jaiyan-th/SmartHire-AI",
    accentNote: "4-Pillar Scoring Engine",
  },
];

// 03 Why Work With Me (A, B, C)
export const WHY_WORK_WITH_ME: WhyWorkPoint[] = [
  {
    letter: "A",
    title: "Production-First AI Systems, Not Just Demos",
    description:
      "I build around how people query, evaluate, and trust AI outputs, creating RAG pipelines and semantic retrieval that ground every answer in verifiable evidence instead of model hallucination.",
    tags: ["Grounded RAG", "Vector Search", "LLM Integration", "Prompt Engineering"],
  },
  {
    letter: "B",
    title: "Systems First, Screens Second: End-to-End Ownership",
    description:
      "I start with the data contracts, schema constraints, and API boundaries behind the product, then shape the user interface around it so the system stays resilient, scalable, and easy to maintain.",
    tags: ["Next.js & React", "FastAPI & NestJS", "SQL & Supabase", "System Architecture"],
  },
  {
    letter: "C",
    title: "Density Is Not the Enemy: Rigour & Velocity",
    description:
      "I don't simplify by stripping critical capabilities. I organize dense system telemetry, probabilistic signals, and complex workflows so teams and users can scan, understand, and act with confidence.",
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
