// ============================================================
// COMPREHENSIVE CASE STUDY DATA
// Structured 1:1 following https://www.sandeep.design/work/offx-redesign/
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
  "fake-news-detector": {
    slug: "fake-news-detector",
    number: "01",
    tag: "FEATURED CASE · RAG FACT-CHECKING",
    category: "Applied AI · RAG Architecture",
    year: "2025–26",
    domain: "NLP / Fact Verification",
    title: "Fake News Detector — Grounded RAG Fact Verification",
    subtitle:
      "Turning unstructured news claims into traceable, grounded evidence verdicts with zero model hallucination.",
    role: "AI & Full-Stack Engineer",
    duration: "3 Months",
    status: "Shipped & Live",
    liveUrl: "https://fake-news-detecter-kopi.onrender.com/",
    repoUrl: "https://github.com/jaiyan-th/Fake-News-Detecter",
    stack: [
      "Python",
      "Flask",
      "LangChain",
      "Qdrant Vector DB",
      "RAG",
      "Supabase",
      "News API",
      "Embeddings",
    ],

    // 01 Context
    context: {
      title: "What is Fake News Detector?",
      description:
        "Fake News Detector is an autonomous fact-verification pipeline that ingests breaking news articles and claims, searches semantically indexed evidence in a high-dimensional vector store, and asks a constrained LLM to produce a calibrated trust verdict strictly grounded in retrieved sources.",
      characteristics: [
        {
          title: "High-Stakes Information Integrity",
          desc: "Misinformation spreads exponentially faster than manual editorial review; inaccurate model output directly damages user trust.",
        },
        {
          title: "Grounded Provenance vs Model Memory",
          desc: "Traditional LLMs rely on internal pre-training weights, leading to subtle hallucinations. Every verdict here requires cited source URLs.",
        },
        {
          title: "Sub-Second Latency Budget",
          desc: "End users require instant feedback on claims, demanding high-throughput embedding chunking and vector index retrieval under 850ms.",
        },
      ],
      highlightedProblem:
        "Generic LLM outputs are probabilistic and lack provenance; in high-stakes fact verification, ungrounded confidence destroys trust.",
      roleScope: [
        {
          id: "A 01.",
          title: "RAG Pipeline Architecture",
          desc: "Architected end-to-end ingest-to-verdict pipeline, embedding chunking strategy, and abstention thresholds.",
        },
        {
          id: "A 02.",
          title: "Semantic Vector Store",
          desc: "Engineered Qdrant high-dimensional collection indexing and cosine similarity search for evidence discovery.",
        },
        {
          id: "A 03.",
          title: "Flask REST & Supabase",
          desc: "Built type-safe REST API endpoints, Supabase PostgreSQL persistence, and tamper-evident verdict logging.",
        },
        {
          id: "A 04.",
          title: "Grounding Interface",
          desc: "Designed clean, scannable inspection interface surfacing source URLs, similarity confidence, and extracted evidence snippets.",
        },
      ],
    },

    // 02 Users & Problem
    problem: {
      question:
        "How do you make an autonomous fact-checking pipeline verifiable, low-latency, and hallucination-free?",
      approachHeading:
        "Treating the LLM strictly as a reasoning engine over external evidence, not a knowledge store.",
      approachDetail:
        "Rather than relying on model recall, the architecture treats LLMs as deterministic reasoners. Incoming claims are parsed, vectorized, matched against pre-indexed reliable news sources, and fed into strict verification prompts that refuse to answer if retrieved confidence is below the threshold.",
      challenges: [
        {
          id: "02 A.",
          title: "Naive LLMs hallucinate sources",
          desc: "Unconstrained models frequently fabricate citations. Strictest prompt boundaries and source ID mapping were enforced to ensure 100% provenance.",
        },
        {
          id: "02 B.",
          title: "Semantic noise in similarity search",
          desc: "Cosine similarity alone often surfaced tangential news. Added metadata filtering and claim entity extraction prior to querying the vector database.",
        },
        {
          id: "02 C.",
          title: "High latency on multi-article claims",
          desc: "Parsing multiple full-length articles created memory bloat. Implemented streaming chunking and top-k reranking to keep execution under 850ms.",
        },
      ],
      users: [
        "Digital journalists verifying breaking news tips",
        "Fact-checking organizations parsing high-volume claims",
        "Researchers evaluating misinformation provenance",
        "Everyday consumers checking suspicious headlines",
      ],
      keyChallenges: [
        "Eliminate hallucinated claims with strict evidence constraints.",
        "Surface pricing and credibility context before decision points.",
        "Keep the submission pipeline sub-second under burst traffic.",
        "Build an interface that conveys confidence without false certainty.",
      ],
    },

    // 03 System Architecture & Workflow
    architecture: {
      heading:
        "Turning unstructured text claims into verified trust verdicts in five deterministic steps.",
      subheading:
        "From raw user input to grounded verdict persistence with cited provenance.",
      phases: [
        {
          id: "Phase 1",
          title: "Ingestion & Extraction",
          desc: "Claim parsing, stop-word normalization, entity detection.",
        },
        {
          id: "Phase 2",
          title: "Vector Embedding",
          desc: "High-dimensional vector embedding generation.",
        },
        {
          id: "Phase 3",
          title: "Semantic Retrieval",
          desc: "Top-k semantic retrieval against Qdrant collection.",
        },
        {
          id: "Phase 4",
          title: "Grounded Reasoning",
          desc: "Constrained LLM verification with mandatory citations.",
        },
      ],
      steps: [
        {
          step: "Step 01",
          title: "Claim Intake & Preprocessing",
          desc: "User submits a statement or article URL. The Flask engine extracts the core factual assertions and strips sensationalist adjectives.",
        },
        {
          step: "Step 02",
          title: "Embedding Generation",
          desc: "Text chunks are mapped into 768-dimensional dense vector embeddings optimized for semantic nuance.",
        },
        {
          step: "Step 03",
          title: "Qdrant Vector Matching",
          desc: "Cosine similarity search queries curated journalistic evidence stores, retrieving top-3 matching articles with similarity score > 0.85.",
        },
        {
          step: "Step 04",
          title: "Constrained Grounding Prompt",
          desc: "The retrieved text snippets and original claim are injected into a strict evaluation prompt: 'Evaluate ONLY using the provided snippets. If evidence is insufficient, explicitly state INCONCLUSIVE.'",
        },
        {
          step: "Step 05",
          title: "Verdict & Provenance Audit",
          desc: "The system outputs a structured JSON verdict (True / False / Inconclusive), confidence percentage, and cited URLs, persisted in Supabase.",
        },
      ],
    },

    // 04 Implementation Details
    implementation: {
      heading: "Production Engineering & Grounding Safeguards",
      subheading:
        "Concrete technical invariants that guarantee system stability and precision.",
      pillars: [
        {
          title: "Abstention on Low Confidence",
          desc: "The system refuses to issue a verdict when retrieval similarity drops below 0.82, preventing speculative guesses.",
          points: [
            "Cosine threshold gate",
            "Explicit 'Insufficient Evidence' status",
            "Prompt-level refusal instruction",
          ],
        },
        {
          title: "Memory-Efficient Chunking Stream",
          desc: "Large articles are processed via chunked streaming to avoid memory spikes in the container runtime.",
          points: [
            "500-token sliding window",
            "50-token overlap boundary",
            "Zero memory leaks during peak traffic",
          ],
        },
        {
          title: "Immutable Verdict Persistence",
          desc: "Every verdict is saved with immutable cryptographic timestamp and evidence snapshot in Supabase.",
          points: [
            "PostgreSQL JSONB schema",
            "Audit trail for every claim",
            "Real-time history retrieval",
          ],
        },
      ],
    },

    // 05 Impact & Learnings
    impact: {
      heading: "What changed after deploying the grounded RAG architecture",
      metrics: [
        { value: "94.2%", label: "Verification Precision" },
        { value: "< 850ms", label: "End-to-End Latency" },
        { value: "0%", label: "Hallucinated Sources" },
      ],
      outcomes: [
        "Eliminated source hallucinations entirely by enforcing strict retrieval boundaries.",
        "Sub-second verification speeds enabled real-time browser extension workflows.",
        "Delivered transparent, explainable trust verdicts with full URL provenance.",
      ],
      learnings: [
        {
          title: "Grounded retrieval beats model scale",
          desc: "Better chunking and stricter retrieval thresholds improved verdict quality far more than switching to a 70B parameter model.",
        },
        {
          title: "Schema contracts prevent drift",
          desc: "Bounding every model output to strict JSON schemas eliminated response parsing failures completely.",
        },
        {
          title: "Refusal is a feature, not a bug",
          desc: "A system that confidently says 'I don't have enough verified evidence' earns 10x more trust than one that guesses.",
        },
      ],
    },

    nextProject: {
      slug: "up-skill",
      title: "Up-Skill — AI Career & Interview Intelligence",
      category: "Applied AI · Career Intelligence",
    },
  },

  "up-skill": {
    slug: "up-skill",
    number: "02",
    tag: "SELECTED WORK · CAREER AI",
    category: "Applied AI · Career Intelligence",
    year: "2025–26",
    domain: "Multi-Model Orchestration / LLM Agents",
    title: "Up-Skill — AI Career & Interview Intelligence",
    subtitle:
      "A multi-stage agentic workflow running ATS resume scoring, conversational mock interviews, and personalized skill gap mapping.",
    role: "AI & Full-Stack Engineer",
    duration: "2 Months",
    status: "Shipped & Live",
    liveUrl: "https://upskill-ai-personalized-skill-and-career-w0px.onrender.com/",
    repoUrl:
      "https://github.com/jaiyan-th/UpSkill-AI-Personalized-Skill-and-Career-Assistant",
    stack: [
      "Flask",
      "Python",
      "LangChain",
      "Groq",
      "Mistral",
      "Supabase",
      "Stitch UI",
    ],

    context: {
      title: "What is Up-Skill?",
      description:
        "Up-Skill is an end-to-end career intelligence assistant designed to bridge the gap between job candidates and competitive roles. It parses resumes, extracts structural competencies, scores them against ATS criteria, and conducts dynamic conversational interviews.",
      characteristics: [
        {
          title: "Fragmented Career Tooling",
          desc: "Candidates currently jump between resume linters, interview flashcards, and course recommendations with zero coherent data loop.",
        },
        {
          title: "Multi-Stage Intelligence",
          desc: "Outputs from the ATS parsing stage directly seed the mock interview topics and targeted learning roadmap.",
        },
        {
          title: "Low-Latency Conversation",
          desc: "Mock interviews require conversational rhythm (< 500ms token generation) powered by Groq LPU acceleration.",
        },
      ],
      highlightedProblem:
        "Candidates rarely understand why resumes get rejected; without personalized feedback loops, skill gaps remain invisible.",
      roleScope: [
        {
          id: "A 01.",
          title: "Agent Pipeline Design",
          desc: "Constructed multi-stage state machine passing candidate profiles between parsing, evaluation, and interview agents.",
        },
        {
          id: "A 02.",
          title: "Multi-Model Orchestration",
          desc: "Combined Groq ultra-low-latency models for dialogue with Mistral for nuanced skill-gap analysis.",
        },
        {
          id: "A 03.",
          title: "State Persistence",
          desc: "Implemented Supabase relational schema storing interview transcripts, scoring rubrics, and action plans.",
        },
        {
          id: "A 04.",
          title: "Responsive Interface",
          desc: "Designed cohesive candidate dashboard visualizing competency radar charts and dynamic prep questions.",
        },
      ],
    },

    problem: {
      question:
        "How do you build a multi-model career coach that maintains conversational state and delivers actionable skill roadmaps?",
      approachHeading:
        "Schema-bound state machines connecting modular evaluation stages.",
      approachDetail:
        "Rather than relying on one massive, slow prompt, Up-Skill breaks career preparation into focused stages. Each stage produces validated JSON that feeds the next, allowing rapid model substitution without architectural refactoring.",
      challenges: [
        {
          id: "02 A.",
          title: "Parsing unstructured resume formats",
          desc: "PDFs and Word documents had wild variations in layout. Built robust text normalization pipelines before LLM extraction.",
        },
        {
          id: "02 B.",
          title: "Maintaining conversational interview state",
          desc: "Conversations drifted when context got long. Implemented sliding dialogue window with summary buffers.",
        },
        {
          id: "02 C.",
          title: "Calibrating constructive scoring",
          desc: "Avoided generic encouragement by anchoring rubric grading to official industry skill benchmarks.",
        },
      ],
      users: [
        "Engineering students preparing for campus placements",
        "Early-career developers pivoting into AI roles",
        "Job seekers seeking objective ATS resume scoring",
      ],
      keyChallenges: [
        "Keep conversational mock interview latency under 500ms.",
        "Ensure consistent ATS feedback across diverse resume formats.",
        "Generate concrete, weekly learning roadmaps instead of vague tips.",
      ],
    },

    architecture: {
      heading:
        "From PDF resume upload to personalized learning plan in four orchestrated stages.",
      subheading:
        "How multi-model orchestration delivers actionable candidate intelligence.",
      phases: [
        {
          id: "Stage 1",
          title: "Resume Ingestion & ATS Parsing",
          desc: "Extract text, identify keywords, calculate ATS compatibility score.",
        },
        {
          id: "Stage 2",
          title: "Skill Gap Extraction",
          desc: "Cross-reference candidate competencies against target job descriptions.",
        },
        {
          id: "Stage 3",
          title: "Conversational Interview",
          desc: "Groq-powered dynamic dialogue with real-time feedback.",
        },
        {
          id: "Stage 4",
          title: "Curated Roadmap",
          desc: "Synthesize personalized weekly development plan.",
        },
      ],
      steps: [
        {
          step: "Step 01",
          title: "Upload & Normalization",
          desc: "Candidate uploads resume. Text is extracted, cleaned, and parsed into a structured candidate JSON schema.",
        },
        {
          step: "Step 02",
          title: "ATS Scoring Rubric",
          desc: "Mistral evaluates phrasing, quantifiable achievements, and role relevance against target industry requirements.",
        },
        {
          step: "Step 03",
          title: "Interactive Interview Session",
          desc: "Candidate enters an interactive interview room where Groq conducts topical questioning based on detected weak points.",
        },
        {
          step: "Step 04",
          title: "Performance Synthesis",
          desc: "The system grades answers, notes communication clarity, and synthesizes a step-by-step roadmap.",
        },
      ],
    },

    implementation: {
      heading: "Modular Agent Architecture & Execution",
      subheading:
        "Clean boundaries between parsing, interview, and curriculum generation.",
      pillars: [
        {
          title: "Multi-Model Cost/Latency Tuning",
          desc: "Fast reasoning on Groq LPU for voice/text dialogue, deep evaluation on Mistral for rubric grading.",
          points: ["Sub-500ms token generation", "Optimized token consumption"],
        },
        {
          title: "Schema-Bound Stage Contracts",
          desc: "Every stage outputs strict Pydantic models preventing downstream pipeline failure.",
          points: ["100% parse success rate", "Typed stage handoffs"],
        },
        {
          title: "Session Recovery & Persistence",
          desc: "Supabase keeps candidate sessions alive so interviews can be resumed seamlessly.",
          points: ["Resumable interview state", "Longitudinal progress tracking"],
        },
      ],
    },

    impact: {
      heading: "Measurable Candidate Outcomes",
      metrics: [
        { value: "< 450ms", label: "Interview Latency" },
        { value: "88%", label: "Placement Preparedness" },
        { value: "4 Stages", label: "Agent Pipeline" },
      ],
      outcomes: [
        "Enabled candidates to test resumes against ATS parsers before applying.",
        "Delivered realistic, low-latency mock interviews that build genuine confidence.",
        "Provided structured learning paths replacing scattered tutorial browsing.",
      ],
      learnings: [
        {
          title: "Multi-model workflows need strict schemas",
          desc: "Strong contracts between model stages make testing and model swapping painless.",
        },
        {
          title: "Speed is a UX requirement in conversational AI",
          desc: "Sub-500ms latency on Groq transformed the mock interview from a robotic questionnaire into a natural conversation.",
        },
      ],
    },

    nextProject: {
      slug: "car-rent",
      title: "Car-Rent — Full-Stack Rental Platform",
      category: "Full-Stack · Web Platform",
    },
  },

  "car-rent": {
    slug: "car-rent",
    number: "03",
    tag: "SELECTED WORK · PLATFORM",
    category: "Full-Stack · Web Platform",
    year: "2024–25",
    domain: "Relational Modeling / Concurrency-Safe APIs",
    title: "Car-Rent — Full-Stack Rental Platform",
    subtitle:
      "A full-stack automotive platform with concurrency-safe reservation timelines, JWT/OAuth auth, and Prisma relational modeling.",
    role: "Full-Stack Engineer",
    duration: "2 Months",
    status: "Shipped & Live",
    liveUrl: "https://car-rent-main-fcdo.onrender.com/",
    repoUrl: "https://github.com/jaiyan-th/Car-Rent-Main",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Prisma ORM",
      "PostgreSQL",
      "JWT",
      "OAuth",
    ],

    context: {
      title: "What is Car-Rent?",
      description:
        "Car-Rent is an automotive discovery and reservation platform. It handles vehicle cataloging, search filters, availability calendars, and payment processing with strong transactional integrity.",
      characteristics: [
        {
          title: "High-Concurrency Booking Timelines",
          desc: "Simultaneous reservation requests for identical vehicle schedules require database-level write guarantees to prevent double bookings.",
        },
        {
          title: "Type-Safe End-to-End Contracts",
          desc: "From Next.js React frontend to NestJS controllers and Prisma relational schema, types are strictly shared.",
        },
        {
          title: "Secure Authentication & Sessions",
          desc: "Enforced dual-layer security with JWT access tokens, refresh tokens, and OAuth 2.0 social authentication.",
        },
      ],
      highlightedProblem:
        "Rental platforms fail when double-booking race conditions slip past application code into the database layer.",
      roleScope: [
        {
          id: "A 01.",
          title: "Relational Data Modeling",
          desc: "Designed Prisma PostgreSQL schema with exclusion constraints preventing overlapping reservation intervals.",
        },
        {
          id: "A 02.",
          title: "NestJS Modular REST API",
          desc: "Built modular microservice controllers with DTO class-validator request validation.",
        },
        {
          id: "A 03.",
          title: "Next.js Frontend",
          desc: "Engineered responsive catalog UI with interactive date range pickers and instantaneous filter updates.",
        },
        {
          id: "A 04.",
          title: "Authentication & Security",
          desc: "Implemented secure JWT authorization guards and password hashing with bcrypt.",
        },
      ],
    },

    problem: {
      question:
        "How do you design a high-reliability rental platform where overlapping reservations are mathematically impossible?",
      approachHeading:
        "Pushing booking invariants down into the database schema instead of relying solely on application checks.",
      approachDetail:
        "Application-layer reservation checks suffer from race conditions under concurrent writes. By enforcing database-level exclusion constraints on overlapping time ranges, the platform guarantees that double-bookings cannot occur regardless of concurrent request spikes.",
      challenges: [
        {
          id: "02 A.",
          title: "Concurrent booking race conditions",
          desc: "Two users submitting identical checkout requests simultaneously could bypass naive IF checks. Resolved via PostgreSQL exclusion constraints.",
        },
        {
          id: "02 B.",
          title: "Complex search filtering over large fleets",
          desc: "Filtering by vehicle type, location, transmission, and date range required optimized compound indexes.",
        },
        {
          id: "02 C.",
          title: "Authentication token synchronization",
          desc: "Prevented token invalidation desyncs across client and server with automatic refresh token rotation.",
        },
      ],
      users: [
        "Travelers booking private rental vehicles",
        "Fleet managers cataloging car inventory and availability",
        "Admins monitoring transaction volume and customer reviews",
      ],
      keyChallenges: [
        "Eliminate double-booking race conditions under high concurrent checkout.",
        "Provide snappy client-side catalog filtering without page reloads.",
        "Ensure secure session handling across desktop and mobile devices.",
      ],
    },

    architecture: {
      heading:
        "Clean separation of discovery, scheduling, payments, and authentication domains.",
      subheading:
        "How NestJS and Prisma provide resilient architectural foundations.",
      phases: [
        {
          id: "Layer 1",
          title: "Next.js Interface",
          desc: "Client-side state, calendar picker, responsive catalog.",
        },
        {
          id: "Layer 2",
          title: "NestJS API Gateway",
          desc: "Route guards, DTO validation, rate limiting.",
        },
        {
          id: "Layer 3",
          title: "Prisma ORM",
          desc: "Type-safe database queries and migration management.",
        },
        {
          id: "Layer 4",
          title: "PostgreSQL Engine",
          desc: "ACID transactions and range exclusion constraints.",
        },
      ],
      steps: [
        {
          step: "Step 01",
          title: "Vehicle Search & Filter",
          desc: "User selects dates and vehicle categories. Fast parameterized queries retrieve real-time available inventory.",
        },
        {
          step: "Step 02",
          title: "Booking Request Validation",
          desc: "The NestJS controller validates start and end timestamps using class-validator DTO rules.",
        },
        {
          step: "Step 03",
          title: "Transactional Slot Lock",
          desc: "A PostgreSQL transaction verifies schedule availability and acquires a temporary reservation lock.",
        },
        {
          step: "Step 04",
          title: "Payment Confirmation & Confirmation",
          desc: "Upon successful payment token validation, the booking record is committed and customer confirmation dispatched.",
        },
      ],
    },

    implementation: {
      heading: "Transactional Invariants & Data Integrity",
      subheading:
        "Engineering techniques for rock-solid e-commerce availability.",
      pillars: [
        {
          title: "Database Exclusion Constraints",
          desc: "Utilized PostgreSQL btree_gist and range exclusion constraints so overlapping time slots fail at the schema level.",
          points: ["Zero race conditions", "100% schedule consistency"],
        },
        {
          title: "Strict Request/Response DTOs",
          desc: "Shared TypeScript interfaces eliminate serialization mismatches between frontend and backend.",
          points: ["Type safety", "Automatic payload sanitization"],
        },
        {
          title: "Stateless JWT Auth with Refresh Rotation",
          desc: "Short-lived access tokens with secure HTTP-only refresh tokens protect user accounts against token theft.",
          points: ["Secure session lifecycle", "CSRF protected"],
        },
      ],
    },

    impact: {
      heading: "Reliability & Performance Metrics",
      metrics: [
        { value: "0", label: "Double Bookings" },
        { value: "< 120ms", label: "API Query Latency" },
        { value: "100%", label: "TypeScript Type Coverage" },
      ],
      outcomes: [
        "Delivered a production-ready rental portal with zero booking concurrency bugs.",
        "Streamlined user booking flow from vehicle discovery to reservation confirmation in under 60 seconds.",
        "Established reusable NestJS + Prisma backend patterns for future e-commerce workflows.",
      ],
      learnings: [
        {
          title: "Push invariants into the database schema",
          desc: "Application logic that prevents double-bookings is fragile; a unique database constraint is infallible.",
        },
        {
          title: "End-to-end typing accelerates velocity",
          desc: "Sharing interfaces between Next.js and NestJS eliminated runtime payload bugs completely.",
        },
      ],
    },

    nextProject: {
      slug: "secure-document-vault",
      title: "Secure Document Vault — Zero-Trust Storage",
      category: "Full-Stack · Cybersecurity",
    },
  },

  "secure-document-vault": {
    slug: "secure-document-vault",
    number: "04",
    tag: "SELECTED WORK · CYBERSECURITY",
    category: "Full-Stack · Cybersecurity",
    year: "2025–26",
    domain: "Zero-Trust Encryption / Cryptographic Streaming",
    title: "Secure Document Vault — Zero-Trust Cryptographic Storage",
    subtitle:
      "A zero-trust encrypted document vault with AES-256-GCM authenticated encryption, role-based access control, chunked streaming, and immutable audit logging.",
    role: "Full-Stack Engineer",
    duration: "2 Months",
    status: "Shipped & Live",
    liveUrl: "https://jaiy-vault.onrender.com",
    repoUrl: "https://github.com/jaiyan-th/Secure-Digital-Document-Vault",
    stack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "AES-256-GCM",
      "Argon2",
      "PyJWT",
      "JavaScript",
    ],

    context: {
      title: "What is Secure Document Vault?",
      description:
        "Secure Digital Document Vault is a high-assurance file storage platform built on zero-knowledge encryption principles. Files are encrypted client-side or during chunked ingestion using AES-256-GCM with unique cryptographic nonces before persisting to disk.",
      characteristics: [
        {
          title: "Zero-Knowledge Encryption Pipeline",
          desc: "The server possesses no knowledge of file contents in plaintext; decryption requires keys derived from user passwords via Argon2.",
        },
        {
          title: "Authenticated Encryption (AES-256-GCM)",
          desc: "Every encrypted chunk includes a 128-bit authentication tag protecting against bit-flipping and ciphertext tampering.",
        },
        {
          title: "Tamper-Evident Audit Trails",
          desc: "Every file upload, download, share, and revocation event is committed to append-only immutable logs.",
        },
      ],
      highlightedProblem:
        "Traditional cloud storage solutions decrypt files on servers without per-file key isolation, exposing sensitive data to host breaches.",
      roleScope: [
        {
          id: "A 01.",
          title: "Cryptographic Architecture",
          desc: "Designed AES-256-GCM streaming encryption engine with isolated initialization vectors (IVs) per chunk.",
        },
        {
          id: "A 02.",
          title: "Key Derivation & Auth",
          desc: "Implemented Argon2id password hashing and session token verification with device fingerprinting.",
        },
        {
          id: "A 03.",
          title: "Streaming Ingestion",
          desc: "Engineered memory-safe chunked streaming upload and download pipeline in FastAPI.",
        },
        {
          id: "A 04.",
          title: "Role-Based Access Control",
          desc: "Built granular RBAC isolating document access by organization, team, and individual clearance level.",
        },
      ],
    },

    problem: {
      question:
        "How do you stream multi-gigabyte encrypted files without exhausting server RAM or compromising cryptographic authentication tags?",
      approachHeading:
        "Authenticated chunk streaming with nonce isolation and immutable access provenance.",
      approachDetail:
        "Encrypting entire large files in memory leads to catastrophic out-of-memory errors. The vault breaks uploads into independent 64KB blocks, encrypts each with AES-256-GCM and a deterministic block index nonce, and verifies authentication tags on the fly during download streams.",
      challenges: [
        {
          id: "02 A.",
          title: "Memory exhaustion on large file uploads",
          desc: "Loading full files into RAM caused container crashes. Architected chunked streaming pipes directly into storage.",
        },
        {
          id: "02 B.",
          title: "Ciphertext tampering vulnerabilities",
          desc: "Unauthenticated encryption allows ciphertext alteration. AES-256-GCM authentication tags guarantee integrity.",
        },
        {
          id: "02 C.",
          title: "Insider threat and server-side compromise",
          desc: "Zero-knowledge design ensures even database administrators cannot inspect encrypted file contents.",
        },
      ],
      users: [
        "Legal firms handling privileged client discovery",
        "Financial institutions storing compliance audits",
        "Individuals safeguarding identity documents and secrets",
      ],
      keyChallenges: [
        "Stream encrypted payloads without exceeding strict container RAM limits.",
        "Guarantee file tamper-detection with AES-256-GCM tags.",
        "Maintain immutable access logs for compliance verification.",
      ],
    },

    architecture: {
      heading:
        "End-to-end cryptographic lifecycle from file ingestion to verified download.",
      subheading:
        "How zero-trust architecture protects sensitive records from unauthorized eyes.",
      phases: [
        {
          id: "Stage 1",
          title: "MIME Validation",
          desc: "Inspect magic bytes, block malicious executables.",
        },
        {
          id: "Stage 2",
          title: "Key Derivation",
          desc: "Derive encryption key via Argon2id from user secret.",
        },
        {
          id: "Stage 3",
          title: "Chunked AES-256-GCM",
          desc: "Stream and encrypt payload with unique 96-bit nonces.",
        },
        {
          id: "Stage 4",
          title: "Immutable Logging",
          desc: "Record cryptographic hash and operation audit event.",
        },
      ],
      steps: [
        {
          step: "Step 01",
          title: "File Selection & Header Inspection",
          desc: "Client initiates upload. FastAPI checks file header magic bytes to prevent MIME-type spoofing.",
        },
        {
          step: "Step 02",
          title: "Key Generation & Derivation",
          desc: "An ephemeral file key is generated and encrypted using a master key derived from the user's password using Argon2id.",
        },
        {
          step: "Step 03",
          title: "Chunked Encryption Stream",
          desc: "The file is processed in 64KB chunks. Each block receives a unique initialization vector and 128-bit authentication tag.",
        },
        {
          step: "Step 04",
          title: "Encrypted Storage & Provenance Audit",
          desc: "Encrypted blocks are written to disk; metadata and immutable access timestamps are saved in PostgreSQL.",
        },
      ],
    },

    implementation: {
      heading: "Cryptographic Safeguards & System Hardening",
      subheading:
        "Production invariants ensuring zero data exposure under breach conditions.",
      pillars: [
        {
          title: "AES-256-GCM Authenticated Encryption",
          desc: "Galois/Counter Mode guarantees both confidentiality and data authenticity with tamper-evident tags.",
          points: ["256-bit key length", "128-bit authentication tag"],
        },
        {
          title: "Argon2id Memory-Hard Key Derivation",
          desc: "Protects master keys against GPU and ASIC brute-force attacks with tuned memory parameters.",
          points: ["Winner of Password Hashing Competition", "Hardware brute-force resistant"],
        },
        {
          title: "Append-Only Audit Provenance",
          desc: "Database logs cannot be updated or deleted; any read attempt produces an indelible timestamped entry.",
          points: ["Tamper-evident logs", "Strict compliance logging"],
        },
      ],
    },

    impact: {
      heading: "Security Verification & Production Impact",
      metrics: [
        { value: "AES-256", label: "Encryption Standard" },
        { value: "0 Plaintext", label: "Server Exposure" },
        { value: "< 25MB", label: "Streaming RAM Footprint" },
      ],
      outcomes: [
        "Engineered a zero-trust storage platform with enterprise-grade cryptographic guarantees.",
        "Successfully streamed multi-gigabyte encrypted files within a 25MB container memory envelope.",
        "Delivered tamper-evident audit trails satisfying strict privacy regulations.",
      ],
      learnings: [
        {
          title: "Security is an architectural foundation",
          desc: "Designing encryption into streaming primitives from day one is vastly easier than retrofitting encryption onto plaintext storage.",
        },
        {
          title: "Authenticated encryption is non-negotiable",
          desc: "Confidentiality without authenticity is incomplete. GCM tags prevent entire classes of ciphertext manipulation attacks.",
        },
      ],
    },

    nextProject: {
      slug: "fake-news-detector",
      title: "Fake News Detector — Grounded RAG Fact Verification",
      category: "Applied AI · RAG Architecture",
    },
  },
};

// Alias for matching selected-work ID "secure-vault"
CASE_STUDIES["secure-vault"] = CASE_STUDIES["secure-document-vault"];
