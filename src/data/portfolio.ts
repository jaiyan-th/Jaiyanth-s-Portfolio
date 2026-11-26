// ============================================================
// PORTFOLIO CONTENT
// Factual data only — no invented metrics, employment, or awards
// ============================================================

import type {
  NavItem,
  SkillGroup,
  Project,
  ExperienceItem,
  ResearchPaper,
  Metric,
  ContactLink,
} from "@/types/portfolio";

export const IDENTITY = {
  name: "Jaiyanth B",
  role: "AI + Full-Stack Engineer",
  education: "Computer Science & Business Systems (Batch 2023–2027) · VSB Engineering College",
  location: "Karur, Tamil Nadu, India",
  email: "jaiyanthofficial@gmail.com",
  github: "https://github.com/jaiyan-th",
  githubPending: false,
  linkedin: "https://www.linkedin.com/in/jaiyan-th/",
  linkedinPending: false,
  heroStatement: "Applied AI engineering for systems that make sense.",
  heroSupporting: "I’m an engineer who makes complex things feel obvious — turning AI ideas into web apps people can actually use.",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/#about", index: "01" },
  { label: "Skills", href: "/#skills", index: "02" },
  { label: "Work", href: "/#work", index: "03" },
  { label: "Experience", href: "/#experience", index: "04" },
  { label: "Contact", href: "/#contact", index: "05" },
];

export const ABOUT = {
  statement:
    "I translate ambiguous problems into engineered, useful software — moving carefully from signal, to system, to story.",
  biography: [
    "I'm a Computer Science & Business Systems (CSBS) student (Batch 2023–2027) at V.S.B. Engineering College, focused on Applied AI and Full-Stack Engineering. My curriculum integrates computational science with enterprise business workflows, while my personal engineering focuses on building grounded RAG pipelines, modern web applications, and resilient cloud backends.",
    "I care about the full path — clean data, dependable APIs, accessible interfaces, and code that another engineer can read. I've completed an AI internship building production prototypes and shipped four selected projects that anchor everything I've learned.",
    "I'm currently open to applied-AI and full-stack engineering roles where rigour, taste, and care for the user matter as much as the model.",
  ],
  metrics: [
    { value: "3", label: "Selected projects", detail: "SQL Query Agent · AI News Verification · SmartHire AI" },
    { value: "6", label: "Evidence-based skill groups", detail: "Languages · Frontend · Backend · Databases · AI & ML · Tools" },
    { value: "1", label: "AI internship", detail: "Infosys Springboard · Jun–Aug 2026" },
    { value: "2027", label: "Graduation batch", detail: "B.Tech CSBS · VSB Engineering College" },
  ] as Metric[],
  expertise: [
    "RAG",
    "LLMs",
    "NLP",
    "Vector Databases",
    "Embeddings",
    "Semantic Search",
    "Next.js",
    "React",
    "TypeScript",
    "NestJS",
    "FastAPI",
    "Flask",
    "REST APIs",
    "Supabase",
    "PostgreSQL",
    "Prisma ORM",
    "AES-256-GCM",
    "JWT",
    "OAuth",
    "Prompt Engineering",
    "Conversational AI",
    "Image Recognition",
    "Groq",
    "Mistral",
    "Product Thinking",
  ],
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    index: "01",
    label: "Languages",
    title: "Programming Languages",
    description:
      "Core languages used across AI workflows, full-stack backends, and systems engineering.",
    skills: ["Python", "SQL", "Java"],
    evidence: "Used across AI workflows, full-stack backends, and system development.",
    impact: "Provides the foundational logic for data pipelines, backend APIs, relational queries, and algorithms.",
  },
  {
    id: "frontend",
    index: "02",
    label: "Frontend",
    title: "Frontend Technologies",
    description:
      "Component-driven web interfaces built for accessibility, performance, and responsive UI.",
    skills: ["HTML", "CSS", "React", "Tailwind CSS", "JavaScript"],
    evidence: "Used for responsive, component-driven user interfaces.",
    impact: "Delivers responsive layout architecture, component states, and modern UI interactions.",
  },
  {
    id: "backend",
    index: "03",
    label: "Backend",
    title: "Backend Technologies",
    description:
      "Structured, secure backends — REST APIs, JWT authentication, and microservice architectures.",
    skills: ["FastAPI", "Flask", "REST API", "JWT Authentication"],
    evidence: "Used for structured, secure REST API architectures and authentication.",
    impact: "Ensures type-safe API routing, token authorization, request validation, and service integration.",
  },
  {
    id: "databases",
    index: "04",
    label: "Databases",
    title: "Databases",
    description:
      "Relational databases and vector stores for persistent application data and semantic search.",
    skills: ["Supabase", "MySQL", "PostgreSQL", "Qdrant (Vector Database)"],
    evidence: "Relational and vector database systems for persistent data and semantic search.",
    impact: "Powers ACID relational transactions and high-dimensional vector embeddings for AI retrieval.",
  },
  {
    id: "ai",
    index: "05",
    label: "AI & ML",
    title: "AI & ML",
    description:
      "Applied AI — retrieval-augmented generation, machine learning, NLP, and LLM reasoning.",
    skills: ["Machine Learning", "NLP", "RAG", "LangChain", "Prompt Engineering"],
    evidence: "Applied AI workflows, retrieval-augmented pipelines, and LLM reasoning.",
    impact: "Orchestrates semantic document retrieval, fact-checking verification, and intelligent agent workflows.",
  },
  {
    id: "tools",
    index: "06",
    label: "Tools",
    title: "Tools",
    description:
      "Engineering tools for version control, API testing, UI design, analytics, and workflow automation.",
    skills: ["Git", "GitHub", "Postman", "Figma", "Stitch", "Power BI"],
    evidence: "Engineering tools for version control, API testing, UI design, and analytics.",
    impact: "Streamlines git collaboration, endpoint testing, design prototypes, and analytical dashboards.",
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "sql-query-agent",
    number: "01",
    category: "Applied AI · Text-to-SQL",
    title: "SQL Query Agent",
    summary:
      "A natural-language to SQL analytics agent powered by Groq tool-calling, sqlglot AST safety validation, read-only database execution, and interactive Recharts visualizations.",
    stack: ["Python", "FastAPI", "Groq", "SQLAlchemy", "sqlglot", "React", "Recharts", "Tailwind CSS"],
    engineeringFocus: "Tool-calling LLM agent · sqlglot AST guardrails · read-only DB execution",
    repository: "https://github.com/jaiyan-th/SQL-Query-Agent",
    visual: "route-geometry",
    layout: "featured",
    caseStudy: {
      overview:
        "SQL Query Agent lets users ask analytical questions in plain English, inspect the generated SQL query, and explore results as tables or Recharts visualizations. It uses Groq (llama-3.3-70b-versatile) with multi-round tool-calling against SQLite, PostgreSQL, or MySQL.",
      problem:
        "Non-technical stakeholders need answers from relational databases without writing SQL, while naive LLM-to-SQL pipelines risk destructive queries, schema hallucinations, or unguarded execution.",
      approach:
        "Expose structured schema inspection and query execution tools to the LLM, parse every generated statement with sqlglot to enforce read-only analytics operations, and execute against read-only database connections with strict row caps and timeouts.",
      architecture:
        "React + Vite + Recharts UI → FastAPI backend → Groq LLM tool-calling loop → sqlglot AST safety validator → SQLAlchemy read-only connection (SQLite / PostgreSQL / MySQL).",
      features: [
        "Multi-round Groq tool-calling agent with schema reflection",
        "sqlglot AST parser blocking write statements and unsafe functions",
        "Read-only database connections with 5-second query timeouts",
        "Interactive table and Recharts chart visualizations",
        "Multi-database support (SQLite, PostgreSQL, MySQL)",
        "Dockerized full-stack deployment",
      ],
      challenges:
        "Preventing unsafe or malformed SQL from reaching the database required parsing the full SQL AST with sqlglot rather than relying on fragile regex keyword checks.",
      learnings:
        "Enforcing safety invariants at the AST and connection-mode layers makes LLM tool-calling reliable and safe for real analytical workloads.",
    },
  },
  {
    slug: "fake-news-detector",
    number: "02",
    category: "Applied AI · Vector RAG",
    title: "AI News Verification System",
    summary:
      "An LLM + Vector RAG evidence verification system that extracts claims, retrieves real-time reporting via NewsAPI and Google News, and synthesizes transparent verdicts with FastEmbed semantic search.",
    stack: ["Python", "FastAPI", "FastEmbed", "Groq", "NewsAPI", "SerpAPI", "Vector RAG"],
    engineeringFocus: "Vector RAG evidence pipeline · semantic search · stance & verdict synthesis",
    repository: "https://github.com/jaiyan-th/AI-Powered-Fake-News-Detecter",
    visual: "evidence-network",
    image: "/images/projects/fake-news-detector.jpg",
    layout: "reversed",
    caseStudy: {
      overview:
        "AI News Verification System ingests a news URL or pasted text claim, extracts verifiable claims and entities via Groq LLM, retrieves live coverage from NewsAPI and Google News, deduplicates syndicated wire stories, and indexes evidence with FastEmbed (BAAI/bge-small-en-v1.5) for semantic retrieval and stance-based verdict synthesis.",
      problem:
        "Users encountering viral claims cannot easily cross-check multiple news outlets, and traditional supervised classifiers fail on breaking events or lack transparent source citations.",
      approach:
        "Replace static classification with a live retrieval-augmented pipeline: extract claims, generate multi-angle search queries, retrieve and deduplicate live articles, index 384-dim FastEmbed vectors, evaluate per-source stance (SUPPORT / CONTRADICT / NEUTRAL), and synthesize a transparent verdict.",
      architecture:
        "FastAPI (/api/v1/verify) → Article extractor (newspaper3k + bs4) → Groq claim & query extraction → NewsAPI & Google News retrieval → wire deduplication → FastEmbed 384-dim semantic index → Groq stance & verdict synthesis.",
      features: [
        "URL article extraction and raw text claim verification",
        "Automated claim decomposition and multi-angle query generation",
        "Live multi-source retrieval via NewsAPI and Google News (SerpAPI / RSS)",
        "Cross-publisher syndicated wire deduplication",
        "FastEmbed (BAAI/bge-small-en-v1.5) semantic evidence retrieval",
        "Transparent REAL / FALSE / MISLEADING / UNVERIFIED verdicts with stance breakdown",
      ],
      challenges:
        "Syndicated wire stories across multiple outlets inflated support counts artificially; adding source normalization and wire deduplication ensured diverse, independent evidence weighting.",
      learnings:
        "Combining dense semantic retrieval with explicit stance evaluation produces far more explainable and trustworthy fact-checking than opaque probability scores.",
    },
  },
  {
    slug: "smarthire-ai",
    number: "03",
    category: "Applied AI · Full-Stack",
    title: "SmartHire AI",
    summary:
      "A production-grade AI mock interview and candidate assessment platform featuring multi-discipline interviews, ATS resume analysis, real-time webcam/audio telemetry, and a deterministic 4-pillar scoring engine.",
    stack: ["Python", "Django 5.2", "Django REST Framework", "Groq", "OpenAI", "PostgreSQL", "JavaScript", "Docker"],
    engineeringFocus: "Multi-discipline AI interviews · ATS parsing · deterministic 4-pillar scoring",
    repository: "https://github.com/jaiyan-th/SmartHire-AI",
    visual: "career-layers",
    layout: "cinematic",
    caseStudy: {
      overview:
        "SmartHire AI is an AI-powered mock interview and candidate assessment platform built for job seekers, university career cells, and recruitment teams. It combines Technical, HR, Behavioral (STAR), and Quantitative mock interviews with ATS resume parsing, live webcam/audio telemetry, recruiter benchmarking, and certified PDF dossiers.",
      problem:
        "Interview preparation and candidate evaluation tools rarely unify resume alignment, live communication telemetry, and structured multi-pillar scoring into a single auditable workflow.",
      approach:
        "Architect a Django 5.2 LTS + DRF backend paired with a modular vanilla JS frontend, integrating Groq Llama-3.1-8B-Instant and OpenAI GPT-4o-mini with a deterministic 4-pillar scoring formula, PyPDF2 resume parsing, and Web Speech/Audio APIs.",
      architecture:
        "Modular HTML5/CSS3/ES6 Frontend → Django 5.2 LTS & DRF API (SimpleJWT) → PostgreSQL / SQLite → Groq & OpenAI LLM services → PDF dossier generator & Admin diagnostics console.",
      features: [
        "Multi-discipline mock interviews (Technical, HR, Behavioral STAR, Quantitative)",
        "ATS resume analyzer with PDF/DOCX parsing and JD skill alignment",
        "Real-time webcam gaze stability and speaking cadence (WPM) telemetry",
        "Deterministic 4-pillar weighted scoring engine",
        "Recruiter portal for candidate filtering, benchmarking, and template building",
        "Certified tamper-resistant PDF dossier downloads & admin diagnostics",
      ],
      challenges:
        "Keeping real-time interview feedback responsive while combining LLM evaluation with browser audio/video telemetry required separating low-latency client telemetry from structured backend scoring.",
      learnings:
        "A deterministic weighted scoring model layered over structured LLM rubric outputs gives both candidates and recruiters consistent, auditable results.",
    },
  },
];

export const EXPERIENCE: ExperienceItem = {
  role: "AI Intern",
  organisation: "Infosys Springboard",
  period: "Jun–Aug 2026",
  reflection:
    "Completed Infosys Springboard Internship 7.0 (B1) building SmartHire AI — an AI-driven interview intelligence platform for communication and candidate skill evaluation, featuring multi-discipline mock interviews, ATS resume analysis, real-time telemetry, and a deterministic 4-pillar scoring engine.",
  work: [
    "SmartHire AI",
    "Django 5.2 LTS & DRF",
    "Groq & OpenAI LLMs",
    "ATS resume parsing",
    "Real-time audio & gaze telemetry",
    "4-pillar scoring engine",
    "PostgreSQL & Docker",
    "GitHub Actions CI/CD",
  ],
};

export const RESEARCH: ResearchPaper = {
  title:
    "An AI Intelligence Wellness Framework Integrating Image Recognition and Conversational AI for Preventive Healthcare",
  venue: "ICETSIS 2026",
  location: "Bahrain",
  date: "May 2026",
  organiser: "IEEE Bahrain Section",
  status: "co-authored",
  abstract:
    "A preventive-healthcare framework that combines image recognition with a conversational AI layer to surface early wellness signals, guide users through structured follow-up questions, and route them toward appropriate care. The framework emphasizes explainability, low-friction interaction, and clinician-friendly summaries.",
  concepts: [
    "Image recognition",
    "Conversational AI",
    "Preventive healthcare",
    "Research collaboration",
    "Technical presentation",
  ],
  certificateUrl: "https://drive.google.com/file/d/1ro5v9Cb1Un-pj2ZEiKdZVDEPDeOpfEU_/view?usp=sharing",
};

// Supplementary research context — does not modify the paper itself.
// Used only for the expanded Research section layout.
export const RESEARCH_CONTEXT = {
  highlights: [
    {
      index: "01",
      title: "Multimodal signal capture",
      description:
        "Image-recognition input layer extracts visual wellness indicators from user-uploaded images, normalised for downstream reasoning.",
    },
    {
      index: "02",
      title: "Structured conversational triage",
      description:
        "A conversational-AI layer asks targeted follow-up questions, reducing ambiguity before any recommendation is surfaced.",
    },
    {
      index: "03",
      title: "Explainable preventive routing",
      description:
        "Outputs are traceable to the captured signals and dialogue, producing clinician-friendly summaries rather than opaque scores.",
    },
  ],
  methodology: [
    "Literature review of preventive-AI frameworks",
    "Architecture design for multimodal intake",
    "Image-recognition model selection and evaluation",
    "Conversational flow design with safety constraints",
    "Explainability layer for clinician review",
    "Co-authoring and technical presentation",
  ],
  outcomes: [
    "Co-authored framework accepted at ICETSIS 2026",
    "Architecture integrating image + conversational AI",
    "Explainability-first design for preventive healthcare",
    "Clinician-friendly summary format",
  ],
} as const;

export const CONTACT_LINKS: ContactLink[] = [
  { label: "Email", value: IDENTITY.email, href: `mailto:${IDENTITY.email}` },
  { label: "GitHub", value: "github.com/jaiyan-th", href: IDENTITY.github, pending: IDENTITY.githubPending },
  { label: "LinkedIn", value: "in/jaiyan-th", href: IDENTITY.linkedin, pending: IDENTITY.linkedinPending },
  { label: "Location", value: IDENTITY.location },
];

export const SITE = {
  url: "https://jaiyanthb.com",
  title: "Jaiyanth B",
  description: IDENTITY.heroSupporting,
  ogImage: "/opengraph-image",
} as const;
