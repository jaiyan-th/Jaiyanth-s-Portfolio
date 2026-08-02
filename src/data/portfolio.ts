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
  education: "Final-year Computer Science & Business Systems",
  location: "India / IST",
  email: "jaiyanthofficial@gmail.com",
  github: "https://github.com/jaiyanth-b",
  githubPending: false,
  linkedin: "Profile URL pending",
  linkedinPending: true,
  heroStatement: "Engineering intelligent products from signal to system.",
  heroSupporting:
    "I build applied AI workflows, full-stack products, structured APIs, data-driven systems, and thoughtful interfaces that turn complex problems into useful software.",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/#about", index: "01" },
  { label: "Skills", href: "/#skills", index: "02" },
  { label: "Work", href: "/#work", index: "03" },
  { label: "Experience", href: "/#experience", index: "04" },
  { label: "Research", href: "/#research", index: "05" },
  { label: "Contact", href: "/#contact", index: "06" },
];

export const ABOUT = {
  statement:
    "I translate ambiguous problems into engineered, useful software — moving carefully from signal, to system, to story.",
  biography: [
    "I'm a final-year Computer Science & Business Systems student in India, focused on Applied AI and Full-Stack Engineering. My work sits between research and production: I build RAG pipelines, conversational systems, structured APIs, and end-to-end web products that hold up under real use.",
    "I care about the full path — clean data, dependable APIs, accessible interfaces, and code that another engineer can read. I've contributed to an IEEE research paper on preventive healthcare AI, completed an AI internship building production prototypes, and shipped three selected projects that anchor everything I've learned.",
    "I'm currently open to applied-AI and full-stack engineering roles where rigour, taste, and care for the user matter as much as the model.",
  ],
  metrics: [
    { value: "3", label: "Selected projects", detail: "Fake News Detector · Up-Skill · Car-Rent" },
    { value: "7", label: "Evidence-based skill groups", detail: "Languages · Web · Backend · DB · AI · Tools · Soft" },
    { value: "1", label: "AI internship", detail: "Brainery Spot Technology · Jun–Jul 2025" },
    { value: "1", label: "IEEE research contribution", detail: "ICETSIS 2026 · IEEE Bahrain Section" },
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
    "Flask",
    "REST APIs",
    "Supabase",
    "Prisma ORM",
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
      "Core languages used across AI workflows and full-stack products, from research scripts to production servers.",
    skills: ["Python", "TypeScript", "JavaScript", "SQL"],
    evidence: "Used across every selected project — Fake News Detector, Up-Skill, and Car-Rent.",
  },
  {
    id: "frontend",
    index: "02",
    label: "Frontend",
    title: "Frontend & Web Technologies",
    description:
      "Component-driven web interfaces built for accessibility, performance, and editorial clarity.",
    skills: ["Next.js", "React", "HTML5", "CSS3", "Responsive UI", "Form Workflows"],
    evidence: "Car-Rent uses Next.js + React. This portfolio is built with the same stack.",
  },
  {
    id: "backend",
    index: "03",
    label: "Backend",
    title: "Backend Engineering",
    description:
      "Structured, secure backends — REST APIs, JWT and OAuth flows, and clean service composition.",
    skills: ["Flask", "NestJS", "REST APIs", "JWT Authentication", "OAuth", "API Integration"],
    evidence: "Flask powers Fake News Detector & Up-Skill. NestJS powers Car-Rent.",
  },
  {
    id: "databases",
    index: "04",
    label: "Databases",
    title: "Databases & Modeling",
    description:
      "Relational modeling, ORM layering, and vector storage for retrieval-augmented AI systems.",
    skills: ["Supabase", "Prisma ORM", "Vector Database", "Relational Modeling", "Embeddings", "SQL"],
    evidence: "Supabase + vector store on Fake News Detector. Prisma ORM on Car-Rent.",
  },
  {
    id: "ai",
    index: "05",
    label: "AI",
    title: "AI Frameworks & Methods",
    description:
      "Applied AI — retrieval-augmented generation, conversational agents, NLP, and image recognition.",
    skills: ["RAG", "LLMs", "NLP", "Groq", "Mistral", "Conversational AI", "Image Recognition"],
    evidence: "RAG pipeline on Fake News Detector. Groq + Mistral on Up-Skill. Image recognition in IEEE research.",
  },
  {
    id: "tools",
    index: "06",
    label: "Tools",
    title: "Tools & Technologies",
    description:
      "Engineering tools for version control, integrations, prompt design, testing, and debugging discipline.",
    skills: ["Git", "News API", "Stitch", "Prompt Engineering", "Debugging", "Testing", "Semantic Search"],
    evidence: "Git collaboration throughout the AI internship. News API on Fake News Detector. Stitch on Up-Skill.",
  },
  {
    id: "soft",
    index: "07",
    label: "Soft Skills",
    title: "Soft Skills",
    description:
      "Collaboration and engineering habits learned across research, internship, and team projects.",
    skills: [
      "Team Collaboration",
      "Problem Solving",
      "Research Collaboration",
      "Technical Presentation",
      "Product Thinking",
      "Debugging Discipline",
      "Testing Mindset",
    ],
    evidence: "Practiced across the AI internship and IEEE research contribution.",
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "fake-news-detector",
    number: "01",
    category: "Applied AI · RAG",
    title: "Fake News Detector",
    summary:
      "A RAG-powered fact-checking pipeline that cross-references incoming articles against a curated evidence base and surfaces a retrieval-grounded trust verdict.",
    stack: ["Python", "Flask", "Supabase", "Vector Database", "RAG", "LLM", "News API", "Embeddings", "Semantic Search"],
    engineeringFocus: "Retrieval-augmented generation pipeline · semantic-search evidence layer",
    repository: "https://github.com/jaiyanth-b/fake-news-detector",
    visual: "evidence-network",
    layout: "featured",
    caseStudy: {
      overview:
        "Fake News Detector ingests an article, retrieves semantically similar verified evidence from a vector store, and asks an LLM to produce a calibrated trust verdict grounded strictly in the retrieved sources. The pipeline is wrapped behind a Flask service and uses Supabase for persistence and News API for evidence collection.",
      problem:
        "Misinformation moves faster than manual fact-checking. Generic LLM answers are unreliable because they hallucinate and lack provenance. The challenge was to build a system that grounds every verdict in retrieved, traceable evidence instead of model memory.",
      approach:
        "Treat the LLM as a reasoning layer, not a knowledge source. Convert trusted evidence into embeddings, store them in a vector database, retrieve the top-k semantically similar items for each incoming article, and feed them into a strict prompt that asks for a verdict traceable to those sources only.",
      architecture:
        "Flask API → News API ingestion → text chunking → embedding model → vector database → semantic retrieval → strict-grounded LLM prompt → trust verdict with cited sources. Supabase stores article metadata and verdict history.",
      features: [
        "Article intake and normalization",
        "Evidence collection via News API",
        "Embedding generation and vector storage",
        "Semantic retrieval of top-k evidence",
        "Strict RAG prompt with source citation",
        "Trust score with traceable evidence links",
        "Verdict history persisted in Supabase",
      ],
      challenges:
        "Retrieval relevance was the hardest part — naive similarity often surfaced tangential sources. Tightening chunk size, adding metadata filters, and constraining the prompt to refuse when evidence was insufficient materially improved verdict quality.",
      learnings:
        "Grounded retrieval beats a larger model. The most reliable upgrades came from better chunking, stricter prompts, and refusing to answer when evidence was weak — not from scaling the LLM.",
    },
  },
  {
    slug: "up-skill",
    number: "02",
    category: "Applied AI · Career Assistant",
    title: "Up-Skill",
    summary:
      "An AI career assistant that scores resumes ATS-style, runs mock interviews, maps skill gaps, and proposes personalized learning paths.",
    stack: ["Flask", "Supabase", "Stitch", "NLP", "Groq", "Mistral"],
    engineeringFocus: "Multi-stage LLM workflow · profile intelligence · skill-gap analysis",
    repository: "https://github.com/jaiyanth-b/up-skill",
    visual: "career-layers",
    layout: "reversed",
    caseStudy: {
      overview:
        "Up-Skill is a career assistant that turns a candidate's resume and target role into a structured development plan. It scores the resume ATS-style, runs a conversational mock interview, identifies skill gaps against the role, and proposes a personalized learning path.",
      problem:
        "Career tooling is fragmented: resume scoring, interview prep, and learning plans live in separate products. Candidates rarely get a single coherent view of where they stand and what to do next.",
      approach:
        "Build a multi-stage LLM workflow where each stage produces structured output the next stage consumes. Use Groq for low-latency reasoning and Mistral for nuanced evaluation. Stitch and Supabase persist profile state and learning progress.",
      architecture:
        "Flask service · resume parser · ATS scoring stage · mock interview (conversational) stage · skill-gap analysis stage · learning-path synthesis stage. Profile state and progress persisted in Supabase. Stitch used for design system.",
      features: [
        "ATS-style resume scoring with structured feedback",
        "Conversational mock interview with topic tracking",
        "Skill-gap analysis against a target role",
        "Personalized learning path generation",
        "Profile state persisted across sessions",
        "Multi-model orchestration (Groq + Mistral)",
      ],
      challenges:
        "Stage-to-stage consistency was hard — an ATS score from one model had to be interpretable by the skill-gap stage in another. A shared structured schema between stages resolved most drift.",
      learnings:
        "Multi-model pipelines need a strong contract between stages. Once outputs were schema-bound, swapping models became a tuning decision instead of a rewrite.",
    },
  },
  {
    slug: "car-rent",
    number: "03",
    category: "Full-Stack · Platform",
    title: "Car-Rent",
    summary:
      "A full-stack rental platform covering vehicle discovery, booking, reviews, payments, and secure authentication, with REST APIs and relational data modeling.",
    stack: ["Next.js", "React", "TypeScript", "NestJS", "Prisma ORM", "JWT", "OAuth", "REST API", "Relational Database"],
    engineeringFocus: "Full-stack platform · secure auth · relational modeling",
    repository: "https://github.com/jaiyanth-b/car-rent",
    visual: "route-geometry",
    layout: "cinematic",
    caseStudy: {
      overview:
        "Car-Rent is a full-stack rental platform. Users discover vehicles, place bookings, leave reviews, and pay securely. The system uses Next.js on the front, NestJS on the back, Prisma ORM for relational modeling, and JWT + OAuth for authentication.",
      problem:
        "Rental platforms combine a lot of moving parts — search, scheduling, payments, reviews, and auth — and small leaks in any one of them break the whole experience. The challenge was to model this cleanly and keep the API contract dependable.",
      approach:
        "Split the system into a typed Next.js front-end, a NestJS REST API, and a Prisma-managed relational schema. Use JWT for session auth, OAuth for federated login, and strict request/response DTOs everywhere so the front and back never drift.",
      architecture:
        "Next.js + React (front) · NestJS REST API · Prisma ORM · relational database · JWT auth · OAuth provider. Clean separation of discovery, booking, review, and payment domains.",
      features: [
        "Vehicle discovery with filters",
        "Booking timeline with availability checks",
        "Secure JWT and OAuth authentication",
        "Review and rating system",
        "Payment integration",
        "REST API with strict DTOs",
        "Relational data modeling via Prisma ORM",
      ],
      challenges:
        "Booking availability under concurrent writes was the hardest correctness problem. Adding a database-level constraint on overlapping bookings removed a class of race conditions that application logic alone couldn't fully prevent.",
      learnings:
        "Push invariants into the schema wherever possible. Code that prevents double-bookings is fragile; a unique constraint is not.",
    },
  },
];

export const EXPERIENCE: ExperienceItem = {
  role: "AI Intern",
  organisation: "Brainery Spot Technology",
  period: "Jun–Jul 2025",
  reflection:
    "Spent the internship building applied-AI prototypes that needed to work, not just demo. Shipped RAG and LLM workflows, learned to integrate third-party REST APIs cleanly, and practiced the unglamorous engineering habits — debugging, testing, prompt iteration, and team feedback — that make AI systems dependable in production.",
  work: [
    "Python AI workflows",
    "Prompt engineering",
    "Debugging",
    "Testing",
    "REST API integration",
    "RAG and LLM prototypes",
    "Git collaboration",
    "Team feedback",
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
  { label: "GitHub", value: "github.com/jaiyanth-b", href: IDENTITY.github, pending: IDENTITY.githubPending },
  { label: "LinkedIn", value: IDENTITY.linkedin, pending: IDENTITY.linkedinPending },
  { label: "Location", value: IDENTITY.location },
];

export const SITE = {
  url: "https://jaiyanthb.com",
  title: "Jaiyanth B — AI + Full-Stack Engineer",
  description: IDENTITY.heroSupporting,
  ogImage: "/opengraph-image",
} as const;
