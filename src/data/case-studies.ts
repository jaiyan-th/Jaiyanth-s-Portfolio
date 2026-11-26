// ============================================================
// COMPREHENSIVE CASE STUDY DATA
// Factual engineering details for Jaiyanth B
// ============================================================

export interface CaseStudyItem {
  slug: string;
  number: string;
  tag: string;
  category: string;
  year: string;
  domain: string;
  title: string;
  subtitle: string;
  role: string;
  duration: string;
  status: string;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];

  // 01 Context
  context: {
    title: string;
    description: string;
    characteristics: Array<{
      title: string;
      desc: string;
    }>;
    highlightedProblem: string;
    roleScope: Array<{
      id: string;
      title: string;
      desc: string;
    }>;
  };

  // 02 Users & Problem
  problem: {
    question: string;
    approachHeading: string;
    approachDetail: string;
    challenges: Array<{
      id: string;
      title: string;
      desc: string;
    }>;
    users: string[];
    keyChallenges: string[];
  };

  // 03 System Architecture & Workflow
  architecture: {
    heading: string;
    subheading: string;
    phases: Array<{
      id: string;
      title: string;
      desc: string;
    }>;
    steps: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
  };

  // 04 Implementation Details
  implementation: {
    heading: string;
    subheading: string;
    pillars: Array<{
      title: string;
      desc: string;
      points: string[];
    }>;
  };

  // 05 Impact & Learnings
  impact: {
    heading: string;
    metrics: Array<{
      value: string;
      label: string;
    }>;
    outcomes: string[];
    learnings: Array<{
      title: string;
      desc: string;
    }>;
  };

  nextProject: {
    slug: string;
    title: string;
    category: string;
  };
}

export const CASE_STUDIES: Record<string, CaseStudyItem> = {
  "sql-query-agent": {
    slug: "sql-query-agent",
    number: "01",
    tag: "APPLIED AI · TEXT-TO-SQL AGENT",
    category: "Applied AI · Text-to-SQL",
    year: "2026",
    domain: "Natural Language Interfaces / Analytics",
    title: "SQL Query Agent — Natural Language to SQL",
    subtitle:
      "Ask a question in English, inspect the answer and its source SQL, and explore the results as an interactive table or chart—with AST-level read-only safety guardrails.",
    role: "Full-Stack & AI Engineer",
    duration: "2026",
    status: "Open Source · GitHub",
    repoUrl: "https://github.com/jaiyan-th/SQL-Query-Agent",
    stack: [
      "Python",
      "FastAPI",
      "Groq",
      "SQLAlchemy",
      "sqlglot",
      "React",
      "Recharts",
      "Tailwind CSS",
    ],
    context: {
      title: "What is SQL Query Agent?",
      description:
        "SQL Query Agent is a full-stack conversational analytics application. Users ask business questions in plain English, and an AI agent inspects database schemas, writes validated SQL, executes read-only queries, and presents answers alongside source SQL, data tables, and Recharts visualizations.",
      characteristics: [
        {
          title: "Multi-Round Tool Calling",
          desc: "Powered by Groq (llama-3.3-70b-versatile) with up to 8 completion rounds per turn to inspect tables, sample rows, and refine queries.",
        },
        {
          title: "AST-Level SQL Safety",
          desc: "Every generated SQL query is parsed with sqlglot to restrict operations to safe analytics statements and reject writes.",
        },
        {
          title: "Multi-Database Support",
          desc: "Works across SQLite (read-only URI mode), PostgreSQL, and MySQL with strict server statement limits and 100-row caps.",
        },
      ],
      highlightedProblem:
        "How can non-technical users query live relational databases in plain English without exposing the database to destructive SQL or unverified LLM hallucinations?",
      roleScope: [
        {
          id: "01",
          title: "Agent Loop",
          desc: "Engineered the Groq tool-calling loop in Python with session-scoped conversation history and schema reflection.",
        },
        {
          id: "02",
          title: "Safety Layer",
          desc: "Built AST validation using sqlglot and read-only connection wrappers with 5-second execution timeouts.",
        },
        {
          id: "03",
          title: "Analytics UI",
          desc: "Created the React + Vite + Tailwind + Recharts frontend with inspectable SQL and chart switching.",
        },
      ],
    },
    problem: {
      question:
        "How do you turn natural language questions into trustworthy, read-only SQL analytics?",
      approachHeading: "Schema-grounded tool calling with deterministic AST guardrails",
      approachDetail:
        "Instead of generating blind SQL in one shot, the agent uses structured tools to list allowlisted tables, inspect sample rows, and validate every statement through sqlglot before execution.",
      challenges: [
        {
          id: "01",
          title: "Write & Injection Prevention",
          desc: "Regex keyword filters are brittle; full AST parsing via sqlglot ensures only read-only analytical SELECT queries execute.",
        },
        {
          id: "02",
          title: "Conversational Follow-Ups",
          desc: "Follow-up questions like 'Only show customers from Tamil Nadu' require retaining structured context across turns.",
        },
        {
          id: "03",
          title: "Timeout & Payload Control",
          desc: "Unbounded result sets can overwhelm both the LLM context window and browser UI, requiring 100-row caps and 5s deadlines.",
        },
      ],
      users: [
        "Business analysts exploring retail and revenue data without writing SQL",
        "Developers needing an auditable, safe Text-to-SQL reference architecture",
        "Teams running self-hosted analytics over SQLite, PostgreSQL, or MySQL",
      ],
      keyChallenges: [
        "Parsing and validating arbitrary LLM-generated SQL before execution",
        "Supporting multi-dialect SQL across SQLite, PostgreSQL, and MySQL",
        "Rendering query results dynamically as both tables and Recharts charts",
      ],
    },
    architecture: {
      heading: "System Architecture & Workflow",
      subheading:
        "FastAPI backend orchestrating Groq tool-calling, sqlglot AST validation, and read-only SQLAlchemy execution.",
      phases: [
        {
          id: "01",
          title: "Schema & Context",
          desc: "app/agent.py sends the user question, conversation history, SQL dialect, and three tool definitions to Groq.",
        },
        {
          id: "02",
          title: "AST Validation",
          desc: "app/safety.py parses the statement tree with sqlglot, allowing analytics operations and blocking writes.",
        },
        {
          id: "03",
          title: "Read-Only Execution",
          desc: "app/db.py executes validated SQL on read-only connections with a 5-second timeout and 100-row cap.",
        },
      ],
      steps: [
        {
          step: "01",
          title: "Question Intake",
          desc: "User submits a natural language question in the React UI, proxied to FastAPI.",
        },
        {
          step: "02",
          title: "Tool Dispatch",
          desc: "Groq requests table listings, schema reflection with 3 sample rows, or SQL execution.",
        },
        {
          step: "03",
          title: "Safety Gate",
          desc: "sqlglot inspects the parsed SQL AST and rejects any non-read-only or disallowed operations.",
        },
        {
          step: "04",
          title: "Visualization",
          desc: "FastAPI returns the final answer, executed SQL statements, and rows for table/Recharts rendering.",
        },
      ],
    },
    implementation: {
      heading: "Core Engineering Pillars",
      subheading:
        "Built for safety, inspectability, and clean local or Dockerized deployment.",
      pillars: [
        {
          title: "Groq Tool-Calling Agent",
          desc: "Multi-round reasoning loop matching tool calls to deterministic Python functions.",
          points: [
            "Supports up to 8 completion rounds per user turn",
            "Maintains 8 exchanges of session history in memory",
            "Returns both the natural-language answer and exact executed SQL",
          ],
        },
        {
          title: "Read-Only Database Guardrails",
          desc: "Defense-in-depth across SQL parsing and database connection configuration.",
          points: [
            "sqlglot AST inspection restricting statements to analytics queries",
            "SQLite opened with mode=ro and query_only pragma",
            "Read-only transactions and execution deadlines for PostgreSQL and MySQL",
          ],
        },
      ],
    },
    impact: {
      heading: "Key Outcomes & Learnings",
      metrics: [
        { value: "Groq", label: "llama-3.3-70b-versatile" },
        { value: "sqlglot", label: "AST Safety Parser" },
        { value: "100 Rows", label: "Bounded Result Cap" },
      ],
      outcomes: [
        "Full-stack Text-to-SQL workspace with inspectable SQL and Recharts visualizations",
        "Zero write-statement exposure via sqlglot AST validation and read-only DB modes",
        "Single-command Docker Compose deployment serving compiled React + FastAPI",
      ],
      learnings: [
        {
          title: "AST Parsing Beats Regex",
          desc: "Validating the parsed SQL syntax tree with sqlglot eliminates entire classes of bypasses that simple string checks miss.",
        },
        {
          title: "Transparency Builds Trust",
          desc: "Always showing the generated SQL alongside the answer lets users verify the logic immediately.",
        },
      ],
    },
    nextProject: {
      slug: "fake-news-detector",
      title: "AI News Verification System",
      category: "Applied AI · Vector RAG",
    },
  },

  "fake-news-detector": {
    slug: "fake-news-detector",
    number: "02",
    tag: "APPLIED AI · VECTOR RAG VERIFICATION",
    category: "Applied AI · Vector RAG",
    year: "2025–26",
    domain: "NLP / Fact Verification",
    title: "AI News Verification System — Vector RAG Fact-Checking",
    subtitle:
      "An LLM + Vector RAG evidence verification system that verifies news URLs and viral claims against real-time reporting from global and regional news sources.",
    role: "AI & Full-Stack Engineer",
    duration: "2025–26",
    status: "Open Source · GitHub",
    repoUrl: "https://github.com/jaiyan-th/AI-Powered-Fake-News-Detecter",
    stack: [
      "Python",
      "FastAPI",
      "FastEmbed",
      "Groq",
      "NewsAPI",
      "SerpAPI",
      "Vector RAG",
    ],
    context: {
      title: "What is the AI News Verification System?",
      description:
        "VerifyNews automates multi-source fact-checking without relying on static supervised classifiers. It ingests a news URL or pasted claim, extracts verifiable sub-claims via Groq LLM, retrieves real-time reporting from NewsAPI and Google News, deduplicates syndicated wire stories, and indexes evidence with FastEmbed (BAAI/bge-small-en-v1.5) for semantic retrieval and stance-based verdict synthesis.",
      characteristics: [
        {
          title: "Live Multi-Source Retrieval",
          desc: "Queries NewsAPI and Google News (SerpAPI or RSS) using multi-angle search queries generated from the claim.",
        },
        {
          title: "384-Dim FastEmbed Vector RAG",
          desc: "Embeds deduplicated evidence into an in-memory semantic vector index using BAAI/bge-small-en-v1.5 for top-k retrieval.",
        },
        {
          title: "Stance & Verdict Synthesis",
          desc: "Evaluates each source as SUPPORT, CONTRADICT, or NEUTRAL before synthesizing REAL, FALSE, MISLEADING, or UNVERIFIED.",
        },
      ],
      highlightedProblem:
        "Static fake-news classifiers fail on breaking news and cannot explain why a claim is true or false. Users need live, multi-source evidence with transparent stance attribution.",
      roleScope: [
        {
          id: "01",
          title: "Claim & Query Pipeline",
          desc: "Built URL article extraction (newspaper3k + bs4) and Groq-powered claim and query generation.",
        },
        {
          id: "02",
          title: "Semantic RAG Index",
          desc: "Implemented wire deduplication and in-memory FastEmbed cosine similarity search.",
        },
        {
          id: "03",
          title: "Verdict Engine & UI",
          desc: "Designed the FastAPI /api/v1/verify endpoint and interactive single-page verification UI.",
        },
      ],
    },
    problem: {
      question:
        "How do you verify breaking news claims in real time without relying on stale training data?",
      approachHeading: "Retrieve live reporting first, then reason over deduplicated evidence",
      approachDetail:
        "Instead of asking an LLM what it remembers, the pipeline extracts core claims, fetches fresh reporting across multiple outlets, deduplicates syndicated copies, and scores stance over top-k semantic chunks.",
      challenges: [
        {
          id: "01",
          title: "Syndicated Wire Duplicates",
          desc: "Multiple outlets often republish the same wire story, which can skew naive source counts unless deduplicated.",
        },
        {
          id: "02",
          title: "Nuance & Partial Truths",
          desc: "Many viral claims mix real facts with outdated dates or exaggerated numbers, requiring a dedicated MISLEADING verdict.",
        },
        {
          id: "03",
          title: "Insufficient Evidence Handling",
          desc: "When retrieved reporting is sparse or neutral, the system must surface UNVERIFIED rather than guessing.",
        },
      ],
      users: [
        "Readers checking viral social media claims and forwarded news links",
        "Journalists and researchers cross-referencing breaking coverage across outlets",
        "Developers exploring FastEmbed + Groq Vector RAG architectures",
      ],
      keyChallenges: [
        "Extracting clean article text from diverse news URLs",
        "Deduplicating syndicated stories across publishers",
        "Calibrating 4-way verdicts (REAL, FALSE, MISLEADING, UNVERIFIED)",
      ],
    },
    architecture: {
      heading: "System Architecture & Workflow",
      subheading:
        "End-to-end FastAPI pipeline from URL/text intake to semantic retrieval and stance synthesis.",
      phases: [
        {
          id: "01",
          title: "Extraction & Queries",
          desc: "Extracts article text (newspaper3k + bs4) and generates 3–5 targeted search queries via Groq.",
        },
        {
          id: "02",
          title: "Retrieval & FastEmbed",
          desc: "Fetches NewsAPI & Google News results, deduplicates wire stories, and indexes 384-dim FastEmbed vectors.",
        },
        {
          id: "03",
          title: "Stance & Verdict",
          desc: "Evaluates per-source stance (SUPPORT / CONTRADICT / NEUTRAL) and synthesizes the final verdict.",
        },
      ],
      steps: [
        {
          step: "01",
          title: "Input Ingestion",
          desc: "Accepts a news article URL or pasted text claim at /api/v1/verify.",
        },
        {
          step: "02",
          title: "Claim Decomposition",
          desc: "Groq LLM extracts primary claims, sub-claims, and named entities.",
        },
        {
          step: "03",
          title: "Vector Indexing",
          desc: "Deduplicated articles are embedded with FastEmbed (BAAI/bge-small-en-v1.5) for top-k cosine retrieval.",
        },
        {
          step: "04",
          title: "Transparent Verdict",
          desc: "Synthesizes REAL, FALSE, MISLEADING, or UNVERIFIED with cited evidence snippets.",
        },
      ],
    },
    implementation: {
      heading: "Core Engineering Pillars",
      subheading:
        "Designed for speed, source diversity, and explainable verification.",
      pillars: [
        {
          title: "Multi-Source News Retrieval",
          desc: "Combines NewsAPI and Google News (SerpAPI / RSS) with source normalization.",
          points: [
            "Generates 3–5 targeted search queries per claim",
            "Normalizes and deduplicates cross-publisher syndicated wire stories",
            "Extracts clean article bodies from URLs with newspaper3k and BeautifulSoup",
          ],
        },
        {
          title: "FastEmbed Semantic RAG",
          desc: "Lightweight, fast 384-dimensional dense vector retrieval in Python.",
          points: [
            "Uses BAAI/bge-small-en-v1.5 via FastEmbed with in-memory cosine similarity",
            "Retrieves top-k relevant passages for stance analysis",
            "Produces transparent evidence snippets and confidence breakdowns",
          ],
        },
      ],
    },
    impact: {
      heading: "Key Outcomes & Learnings",
      metrics: [
        { value: "384-dim", label: "FastEmbed Vectors" },
        { value: "4 Verdicts", label: "REAL / FALSE / MISLEADING / UNVERIFIED" },
        { value: "FastAPI", label: "Async Verification API" },
      ],
      outcomes: [
        "Real-time claim verification grounded in live NewsAPI and Google News reporting",
        "Transparent stance breakdown per source instead of opaque black-box scores",
        "Clean single-page UI backed by FastAPI and Groq inference",
      ],
      learnings: [
        {
          title: "Deduplication Matters",
          desc: "Filtering syndicated wire copies prevents a single press release from masquerading as independent consensus.",
        },
        {
          title: "Explicit Uncertainty",
          desc: "Supporting MISLEADING and UNVERIFIED verdicts makes the system honest when evidence is partial or missing.",
        },
      ],
    },
    nextProject: {
      slug: "smarthire-ai",
      title: "SmartHire AI",
      category: "Applied AI · Full-Stack",
    },
  },

  "smarthire-ai": {
    slug: "smarthire-ai",
    number: "03",
    tag: "APPLIED AI · INTERVIEW & ASSESSMENT PLATFORM",
    category: "Applied AI · Full-Stack",
    year: "2025–26",
    domain: "Talent Intelligence / EdTech",
    title: "SmartHire AI — Mock Interview & Candidate Assessment Platform",
    subtitle:
      "A production-grade AI interview preparation and candidate assessment platform with multi-discipline mock interviews, ATS resume analysis, real-time telemetry, and a 4-pillar scoring engine.",
    role: "Full-Stack & AI Engineer",
    duration: "2025–26",
    status: "Open Source · GitHub",
    repoUrl: "https://github.com/jaiyan-th/SmartHire-AI",
    stack: [
      "Python",
      "Django 5.2",
      "Django REST Framework",
      "Groq",
      "OpenAI",
      "PostgreSQL",
      "JavaScript",
      "Docker",
    ],
    context: {
      title: "What is SmartHire AI?",
      description:
        "SmartHire AI is a full-stack interview preparation and candidate assessment platform built for students, job seekers, university career cells, and recruitment teams. It unifies Technical, HR, Behavioral (STAR), and Quantitative mock interviews with ATS resume parsing, webcam/microphone telemetry, a recruiter benchmarking portal, and certified PDF dossier exports.",
      characteristics: [
        {
          title: "Multi-Discipline Interviews",
          desc: "Supports Technical, HR, Behavioral (STAR method), and Quantitative Aptitude interviews in one live room.",
        },
        {
          title: "Real-Time Telemetry",
          desc: "Captures browser webcam gaze stability and speaking cadence (WPM) via Web Speech/Audio APIs.",
        },
        {
          title: "Deterministic 4-Pillar Scoring",
          desc: "Combines Communication (30%), Knowledge (25%), Technical/Problem-Solving (30%), and Presence (15%) into a transparent score.",
        },
      ],
      highlightedProblem:
        "Job seekers and recruitment teams lack a unified platform that connects resume-to-JD alignment, live interview telemetry, and auditable multi-pillar candidate scoring.",
      roleScope: [
        {
          id: "01",
          title: "Django 5.2 + DRF Backend",
          desc: "Architected REST APIs with SimpleJWT auth, PostgreSQL/SQLite dual support, and RBAC for Candidates, Recruiters, and Admins.",
        },
        {
          id: "02",
          title: "AI & Telemetry Pipeline",
          desc: "Integrated Groq Llama-3.1-8B-Instant, OpenAI GPT-4o-mini, PyPDF2 ATS parsing, and browser speech/gaze telemetry.",
        },
        {
          id: "03",
          title: "Portals & PDF Dossiers",
          desc: "Built candidate analytics, recruiter benchmarking, admin diagnostics console, and verifiable PDF dossier downloads.",
        },
      ],
    },
    problem: {
      question:
        "How do you deliver realistic mock interviews and consistent candidate assessments at scale?",
      approachHeading: "Combine multi-model AI evaluation with deterministic weighted scoring",
      approachDetail:
        "Use fast LLMs for conversational interviews and ATS skill extraction, pair them with browser audio/video telemetry, and compute final scores deterministically across four weighted pillars.",
      challenges: [
        {
          id: "01",
          title: "Scoring Consistency",
          desc: "Raw LLM grades can drift across sessions; a deterministic 4-pillar formula keeps evaluations consistent and auditable.",
        },
        {
          id: "02",
          title: "Multi-Role Workflows",
          desc: "Candidates, Recruiters, and Administrators each need tailored dashboards and strict RBAC boundaries.",
        },
        {
          id: "03",
          title: "Zero-Friction Frontend",
          desc: "Delivered a responsive Lavender Blush UI with modular ES6 JavaScript and zero npm build friction.",
        },
      ],
      users: [
        "Students and job seekers practicing Technical, HR, and STAR behavioral interviews",
        "University career cells and recruiters benchmarking candidate rosters",
        "Administrators monitoring connection pools and AI model settings",
      ],
      keyChallenges: [
        "Integrating PyPDF2 resume parsing with job description gap analysis",
        "Capturing real-time speaking cadence (WPM) and gaze stability in the browser",
        "Generating tamper-resistant PDF dossiers with verification codes",
      ],
    },
    architecture: {
      heading: "System Architecture & Workflow",
      subheading:
        "Django 5.2 LTS + DRF backend serving modular ES6 frontend views and dual-database persistence.",
      phases: [
        {
          id: "01",
          title: "ATS & Intake",
          desc: "Parses candidate PDF/DOCX resumes with PyPDF2 and computes job description skill alignment.",
        },
        {
          id: "02",
          title: "Live Interview Room",
          desc: "Runs multi-discipline AI interviews with PIP camera telemetry and Web Speech/Audio cadence tracking.",
        },
        {
          id: "03",
          title: "Scoring & Dossiers",
          desc: "Computes the 4-pillar score and exports certified PDF dossiers for recruiter benchmarking.",
        },
      ],
      steps: [
        {
          step: "01",
          title: "Role Auth & Demo Chips",
          desc: "SimpleJWT authentication with Candidate, Recruiter, and Admin RBAC.",
        },
        {
          step: "02",
          title: "Resume ATS Analysis",
          desc: "Extracts skills from uploaded resumes and surfaces a skill-gap roadmap.",
        },
        {
          step: "03",
          title: "Mock Interview & Telemetry",
          desc: "Conducts adaptive Q&A via Groq / OpenAI while measuring WPM and gaze stability.",
        },
        {
          step: "04",
          title: "Insights & Recruiter Portal",
          desc: "Visualizes performance radar charts, candidate rosters, and downloadable PDF dossiers.",
        },
      ],
    },
    implementation: {
      heading: "Core Engineering Pillars",
      subheading:
        "Engineered with Django 5.2 LTS, SimpleJWT, and Dockerized CI/CD.",
      pillars: [
        {
          title: "4-Pillar Scoring & ATS Engine",
          desc: "Structured evaluation combining resume alignment, domain answers, and delivery telemetry.",
          points: [
            "Weighted formula: Communication (30%), Knowledge (25%), Technical (30%), Presence (15%)",
            "PyPDF2 resume parsing and skill-gap checklist generation",
            "Certified PDF dossier exports with verification codes",
          ],
        },
        {
          title: "Recruiter & Admin Governance",
          desc: "Dedicated portals for talent benchmarking and system health monitoring.",
          points: [
            "Recruiter candidate roster filtering, benchmarking, and template builder",
            "Admin diagnostics console with connection pool monitoring and AI model controls",
            "PostgreSQL production support with SQLite fallback and GitHub Actions CI/CD",
          ],
        },
      ],
    },
    impact: {
      heading: "Key Outcomes & Learnings",
      metrics: [
        { value: "4-Pillar", label: "Deterministic Scoring" },
        { value: "Django 5.2", label: "LTS + DRF Backend" },
        { value: "3 Roles", label: "Candidate · Recruiter · Admin" },
      ],
      outcomes: [
        "Unified interview prep, ATS analysis, and recruiter assessment in one platform",
        "Deterministic scoring formula making AI-assisted evaluations auditable",
        "Dockerized deployment with GitHub Actions CI pipeline",
      ],
      learnings: [
        {
          title: "Deterministic Weights Over Raw Scores",
          desc: "Separating rubric extraction from a fixed mathematical weighting formula makes candidate comparisons fair and repeatable.",
        },
        {
          title: "Role-Based Architecture",
          desc: "Designing clean RBAC boundaries early kept Candidate, Recruiter, and Admin workflows modular and maintainable.",
        },
      ],
    },
    nextProject: {
      slug: "sql-query-agent",
      title: "SQL Query Agent",
      category: "Applied AI · Text-to-SQL",
    },
  },
};

// Keep internship aliases pointing to smarthire-ai for Experience section links
CASE_STUDIES["infosys-springboard-internship"] = CASE_STUDIES["smarthire-ai"];
CASE_STUDIES["internship"] = CASE_STUDIES["smarthire-ai"];
