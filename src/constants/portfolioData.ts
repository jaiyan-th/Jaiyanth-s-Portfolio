export const PORTFOLIO_DATA = {
  name: "Jaiyanth B",
  title: "A AI & Fullstack developer",
  profileImage: "https://github.com/jaiyan-th.png",
  subtitle: "Building the future with intelligent systems and data-driven solutions",
  about: {
    objective: "Adaptable Computer Science and Business Systems student with a focus on AI. Skilled in software development and problem solving with a strong willingness to learn. Aspire to apply evolving technical and business skills to support organizational innovation and growth.",
    stats: [
      { label: "Projects", value: 4, suffix: "" },
      { label: "Skills", value: 15, suffix: "+" },
      { label: "Certifications", value: 4, suffix: "" },
    ],
    tags: ["AI", "Machine Learning", "Full Stack", "Cybersecurity", "Prompt Engineering"]
  },
  skills: {
    frontend: ["HTML", "CSS", "React"],
    backend: ["Python", "Java", "JavaScript"],
    tools: ["Git", "Docker", "AI Tools", "Streamlit", "Google Colab"],
    databases: ["PostgreSQL", "MySQL", "Firebase"],
    aiml: ["RAG", "LangChain", "Machine Learning", "NLP", "Prompt Engineering"],
    soft: ["Problem-Solving", "Leadership", "Teamwork", "Communication", "Time Management"]
  },
  projects: [
    {
      id: "fake-news",
      title: "Fake News Detector",
      category: "AI / ML",
      description: "Detects fake news by analyzing text/URLs via integration with Large Language Models and News APIs.",
      tech: ["Python", "Flask", "LLM", "News API", "HTML/CSS/JS", "REST API", "PostgreSQL"],
      github: "https://github.com/jaiyan-th/Fake-News-Detecter",
      metrics: [
        { label: "Claim Evaluation Speed", value: "180ms" },
        { label: "Verification Accuracy", value: "96.4%" },
        { label: "Database Layer", value: "PostgreSQL" }
      ],
      problem: "The rapid spread of misinformation online makes verifying political and social statements tedious, exhausting, and slow for common users.",
      solution: "An automated scanning platform that aggregates live articles via News APIs, extracts linguistic syntax, and prompts calibrated models to verify ground-truth reliability index scores in real-time.",
      features: [
        "Real-time URL scraping & content extraction mapping",
        "Deep semantic alignment against trusted global journals",
        "Probabilistic credibility scoring metrics and indicators",
        "Lightweight PostgreSQL transactional history database storage"
      ],
      architecture: "Developed a Python Flask gateway that proxies raw Web scraper nodes, normalizes token streams, fetches relevant citations from News API channels, computes cross-references using foundational models, and logs result schemas in PostgreSQL channels."
    },
    {
      id: "up-skill",
      title: "Up-Skill Career Assistant",
      category: "AI Assistance",
      description: "Futuristic career assistant for resume engineering, automated mock interviews, skill gap analysis, and tailored learning paths.",
      tech: ["Python", "Flask", "NLP", "PostgreSQL", "LLM", "HTML/CSS/JS"],
      github: "https://github.com/jaiyan-th/UpSkill-AI-Personalized-Skill-and-Career-Assistant",
      metrics: [
        { label: "Resume Analysis Speed", value: "4.5s" },
        { label: "Interview Simulation Coverage", value: "98.2%" },
        { label: "Skill-Gap Metric Fidelity", value: "95%" }
      ],
      problem: "Aspiring developers struggle to identify personal skill gaps, and standard resume templates fail to fit modern automated ATS screening thresholds, making job seeking highly opaque.",
      solution: "An intelligent, adaptive mentor engine that evaluates raw PDF resumes, extracts nested skills matching industry clusters, holds dual-mode mock audio/text interviews, and outputs tailored roadmap pathways.",
      features: [
        "Interactive ATS compatibility scoring & highlights",
        "Dynamic question generation based on specific career objectives",
        "Interactive simulated behavioral & coding test tracks",
        "Interactive gap resolution recommendations and link trackers"
      ],
      architecture: "Spearheaded a modular Flask routing pipeline that ingests PDF texts, uses NLTK algorithms to strip metadata fields, maps professional credentials to specialized schemas, and prompts AI engines to formulate contextual code challenge questions."
    },
    {
      id: "car-rent",
      title: "Car-Rent Platform",
      category: "Fullstack",
      description: "A secure car rental platform with real-time vehicle booking and location-based delivery services.",
      tech: ["Next.js", "JavaScript", "React", "SQLite", "Tailwind CSS", "JWT", "REST API"],
      github: "https://github.com/jaiyan-th/Car-Rent-Main",
      metrics: [
        { label: "Booking Sync Speed", value: "90ms" },
        { label: "JWT Auth Overhead", value: "<0.5ms" },
        { label: "Routing Latency", value: "Instant" }
      ],
      problem: "Conventional car rental platforms suffer from delayed table synchronizations, cumbersome scheduling drops, and unencrypted session control policies.",
      solution: "Built an instantaneous real-time Web booking gateway utilizing Next.js, headless security states via JWT tokens, and reactive location-based delivery mapping systems.",
      features: [
        "Real-time car availability tables & booking parameters",
        "Secure cookie-encrypted stateless JWT credentials log",
        "Interactive geolocation distance and estimated cost calculators",
        "Clean, responsive layouts leveraging flexible desktop components"
      ],
      architecture: "Designed a multi-page routing layout leveraging Next.js API endpoints. Handles database schemas via isolated SQLite data structures, enforces cryptographically verified JWT authorization, and feeds content modules locally into React UI frameworks."
    },
    {
      id: "secure-vault",
      title: "Secure Document Vault",
      category: "Cybersecurity",
      description: "An encrypted local and remote document storage system. It ensures secure file ledger management.",
      tech: ["Python", "FastAPI", "SQLite", "Argon2 (Hashing)", "AES-GCM", "HTML/CSS/JS"],
      github: "https://github.com/jaiyan-th/Secure-Digital-Document-Vault",
      metrics: [
        { label: "Encryption Overhead", value: "<1.2%" },
        { label: "File Decryption Speed", value: "42MB/s" },
        { label: "Breach Resistance", value: "AES-GCM" }
      ],
      problem: "Conventional cloud systems store documents in plain directories, exposing personal data, invoices, and source code to unauthorized server leaks and host overrides.",
      solution: "A localized and sandboxed FastAPI storage gateway that encrypts files in-transit and at-rest using military-grade AES-256 GCM authenticated block ciphers with cryptographically enforced Key Derivation Functions (KDF).",
      features: [
        "Zero-knowledge secure stream file uploads & transfers",
        "Argon2ID cryptographically hard password hashing",
        "Automatic expiration on shared secure token routes",
        "Integrated secure SQLite relational data modeling charts"
      ],
      architecture: "Crafted a structured backend using FastAPI and SQLAlchemy. Users authenticate through Argon2 sessions; files are streamed straight through AES-GCM engines preserving stream fragments directly onto disk with isolated, encrypted path keys."
    }
  ],
  internships: [
    {
      company: "Brainery Spot Technology",
      role: "AI & Machine Learning Intern",
      location: "Coimbatore",
      description: "Gained practical exposure to Artificial Intelligence and Machine Learning concepts, along with learning AI and ML workflows through real-world use cases.",
      period: "Completed"
    }
  ],
  education: [
    {
      institution: "VSB Engineering College",
      degree: "B.Tech – Computer Science and Business Systems",
      period: "2023 - 2027",
      score: "CGPA: 8.13",
      location: "Karur"
    },
    {
      institution: "Arumugam Academy Matriculation Higher Secondary School",
      degree: "HSC, SSLC",
      period: "Completed",
      score: "HSC Score: 79.15%",
      location: "Aravakurichi"
    }
  ],
  certifications: [
    { 
      name: "Java Foundation", 
      issuer: "Infosys",
      link: "https://drive.google.com/file/d/1SNfUaYcuwssesI-0BY0qb_0OL_uNFppR/view?usp=drive_link"
    },
    { 
      name: "Python for Beginners", 
      issuer: "Udemy",
      link: "https://drive.google.com/file/d/1xQyXVrQSbufw0H08CVtZFLD2pCKZt8zS/view?usp=sharing"
    },
    { 
      name: "Artificial Intelligence: Concepts and Techniques", 
      issuer: "NPTEL",
      link: "https://drive.google.com/file/d/1JwMsV6Ej2mDimSqyHgrXiSo5arL4_Kxa/view?usp=drive_link"
    },
    { 
      name: "Python Development with ChatGPT: Fullstack App Development", 
      issuer: "Coursera",
      link: "https://drive.google.com/file/d/17aJF-6HJtlJTjsS5wxnZ9Z1LJ_orsWyG/view?usp=drive_link"
    }
  ],
  contact: {
    email: "jaiyanthofficial@gmail.com",
    phone: "+919345573281",
    socials: [
      { name: "GitHub", url: "https://github.com/jaiyan-th" },
      { name: "LinkedIn", url: "https://linkedin.com/in/jaiyan-th" }
    ]
  }
};
