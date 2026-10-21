/**
 * Single source of truth for all site content.
 * Edit this file to update the site — components only render what is here.
 *
 * Paths to files in public/ (e.g. "/resume.pdf") are written WITHOUT the basePath;
 * components pass them through assetPath() when rendering.
 */

import type { IconName } from "@/components/ui/icons";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface Profile {
  /** Small line above the name in the hero. */
  greeting: string;
  name: string;
  /** Short title, used in metadata. */
  role: string;
  tagline: string;
  /** Current situation / availability, shown in the hero. */
  status: string;
  location: string;
  email: string;
  /** Path to a file in public/, e.g. "/resume.pdf". */
  resume: string;
  /** Short paragraphs for the About section. */
  about: string[];
  socials: SocialLink[];
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  /** Free-form, e.g. "Jan 2024". */
  start: string;
  /** Free-form, or "Present". */
  end: string;
  url?: string;
  /** One line of context about the company or product. */
  summary?: string;
  highlights: string[];
  tech?: string[];
}

export interface Education {
  school: string;
  degree: string;
  location?: string;
  start: string;
  end: string;
  details?: string[];
}

/** Drives the project filter; order here is the order of the filter buttons. */
export const projectCategories = ["AI/ML", "Full-Stack", "Cloud", "Data"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export interface Project {
  title: string;
  /** One-sentence summary shown on the card. */
  description: string;
  /** The single headline result, shown prominently. */
  metric: string;
  /** Implementation details, shown in an expandable list. */
  details?: string[];
  tech: string[];
  category: ProjectCategory;
  /** Source code URL. Omit if not public — the link is hidden. */
  repo?: string;
  /** Live demo URL. Omit if none — the link is hidden. */
  live?: string;
  featured?: boolean;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ContactSection {
  heading: string;
  blurb: string;
}

export interface NavItem {
  label: string;
  /** In-page anchor, e.g. "#projects". */
  href: `#${string}`;
}

export interface SiteMeta {
  title: string;
  description: string;
  /** Production URL, used for metadata. */
  url: string;
}

export interface Content {
  site: SiteMeta;
  nav: NavItem[];
  profile: Profile;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillGroup[];
  contact: ContactSection;
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export const content: Content = {
  site: {
    title: "Tushar Patel — Software Engineer",
    description:
      "Tushar Patel is a software engineer building full-stack products and production AI systems.",
    url: "https://example.vercel.app", // TODO: set to the real URL after the first Vercel deploy
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],

  profile: {
    greeting: "Hi, my name is",
    name: "Tushar Patel",
    role: "Software Engineer",
    tagline: "Software engineer building full-stack products and production AI systems.",
    status:
      "M.S. Software Engineering @ Northeastern, graduating Dec 2026, open to new-grad SWE roles",
    location: "Boston, MA",
    email: "patel.tusharv@northeastern.edu",
    resume: "/resume.pdf",
    about: [
      "I build software end to end, from database schemas and APIs to the interfaces people use. At BadgeSix, I was one of three interns who took ownership of a production SaaS codebase after its contract team rolled off, shipping features and OpenAI integrations on an accreditation platform for U.S. police departments. In my own projects I fine-tune and deploy models, like a PostgreSQL text-to-SQL service, and build AWS infrastructure with Terraform. I graduate from Northeastern's M.S. in Software Engineering in December 2026.",
    ],
    socials: [
      { label: "GitHub", href: "https://github.com/tushar-patel28", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/tushar-patel28/", icon: "linkedin" },
      { label: "Email", href: "mailto:patel.tusharv@northeastern.edu", icon: "mail" },
    ],
  },

  experience: [
    {
      company: "BadgeSix",
      role: "Full-Stack Software Engineer Co-op",
      location: "Connecticut",
      start: "Jan 2026",
      end: "Aug 2026",
      summary: "Production SaaS accreditation platform for U.S. police departments.",
      highlights: [
        "One of 3 interns who took ownership of the production codebase after the contract dev team rolled off, shipping client-facing features on a continuous-delivery cycle reviewed by the founder.",
        "Built an AI-powered Workbook Report where OpenAI GPT generates per-standard compliance summaries (match %, subpoint coverage, policy gaps), validated at ~92% match on a real client's policy documents.",
        "Built a 3-report analytics suite; the Progress Report runs 7 parallel MongoDB queries with in-memory O(1) Map joins to avoid N+1 queries.",
        "Replaced fragile client-side PDF generation with a server-side Puppeteer export, and cached AI match scores on the schema to eliminate redundant OpenAI calls.",
        "Authored an AWS architecture proposal adopting Amazon Bedrock as a CJIS-compliant LLM alternative for law-enforcement data.",
        "Ran live MongoDB Atlas migrations with rollback runbooks, and fixed production bugs in access control, notifications, and validation.",
      ],
      tech: ["NestJS", "TypeScript", "MongoDB Atlas", "React", "Redux", "OpenAI", "Puppeteer", "AWS S3"],
    },
    {
      company: "Praxware Technologies",
      role: "Full Stack Engineer Intern",
      location: "Ahmedabad, India",
      start: "Dec 2023",
      end: "Apr 2024",
      highlights: [
        "Built a legal-services platform with 50+ interfaces for clients, lawyers, and admins to manage cases, documents, appointments, and payments.",
        "Built 20+ REST APIs with role-based access control across 3 user roles, plus Razorpay payment integration.",
        "Designed a 13-table normalized MySQL schema with indexing, reducing dashboard load time by 30%.",
      ],
      tech: ["Django", "Python", "MySQL", "JavaScript"],
    },
    {
      company: "Sparks to Ideas",
      role: "Python Developer Intern",
      location: "Ahmedabad, India",
      start: "May 2023",
      end: "Jul 2023",
      highlights: [
        "Built an event management system automating registration and approvals across 4 user roles, cutting manual coordination workload by ~70%.",
      ],
      tech: ["Django", "MySQL"],
    },
    {
      company: "Keryar Technologies",
      role: "Software Developer Intern",
      location: "Anand, India",
      start: "May 2022",
      end: "Jun 2022",
      highlights: [
        "Identified 3 major backend bottlenecks, improved data retrieval time by ~20%, and introduced an automated receipt system.",
      ],
    },
  ],

  education: [
    {
      school: "Northeastern University",
      degree: "M.S. Software Engineering",
      location: "Boston, MA",
      start: "Sep 2024",
      end: "Dec 2026",
      details: [
        "Teaching Assistant, Generative AI course (Fall 2026): creating assessment questions and grading.",
      ],
    },
    {
      school: "CHARUSAT University",
      degree: "B.Tech Computer Science",
      location: "India",
      start: "Aug 2020",
      end: "May 2024",
    },
  ],

  projects: [
    {
      title: "OmniSQL – PostgreSQL Text-to-SQL",
      description:
        "Fine-tuned a 7B SOTA text-to-SQL model for the PostgreSQL dialect and deployed it as a production service.",
      metric: "69% execution accuracy vs 23% zero-shot (3×)",
      details: [
        "QLoRA fine-tuning of OmniSQL-7B (VLDB 2025)",
        "Execution-validated synthetic data pipeline (2,400 pairs across 5 schemas)",
        "FastAPI backend with pgvector schema RAG",
        "Self-correcting SQL execution with automatic retry",
        "SageMaker async inference",
        "Terraform infrastructure",
      ],
      tech: ["PyTorch", "QLoRA", "FastAPI", "pgvector", "PostgreSQL", "AWS SageMaker", "Terraform"],
      category: "AI/ML",
      featured: true,
    },
    {
      title: "Cloud-Native Web Application",
      description:
        "Production-style REST backend on AWS with full IaC, CI/CD, auto-scaling, and observability.",
      metric: "Zero-downtime rolling deploys across a 3–5 instance Auto Scaling Group",
      details: [
        "Terraform VPC with multi-AZ subnets",
        "Private RDS",
        "S3 with IAM roles (no static keys)",
        "Packer-built AMIs",
        "ALB + ASG",
        "SNS + Lambda email verification",
        "KMS + Secrets Manager",
        "CloudWatch custom metrics",
        "GitHub Actions CI/CD with instance refresh",
      ],
      tech: ["AWS", "Terraform", "Packer", "GitHub Actions", "CloudWatch", "Lambda"],
      category: "Cloud",
      featured: true,
    },
    {
      title: "Stockpile – Portfolio Tracker",
      description:
        "Full-stack investment tracker that derives holdings and P&L from raw transactions.",
      metric: "Verified against a full year of real transaction data",
      details: [
        "Next.js + TypeScript + Supabase on Vercel",
        "5-table Postgres schema with Row-Level Security",
        "Pure-function calculation library (weighted-average cost basis, realized P&L, net worth over time)",
        "CSV import with per-row validation and preview",
        "Recharts dashboards",
        "Dark mode",
      ],
      tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Recharts"],
      category: "Full-Stack",
      repo: "https://github.com/tushar-patel28/stockpile",
      featured: true,
    },
    {
      title: "Agentic Multi-Agent Workflow Platform",
      description:
        "Role-based LLM agents that coordinate testing, documentation, and logic validation.",
      metric: "~60% less manual review effort",
      details: [
        "AutoGen orchestration with tool-calling and shared memory",
        "Evaluation loops for hallucination mitigation that reduced invalid responses by ~35%",
      ],
      tech: ["AutoGen", "LLMs", "Python"],
      category: "AI/ML",
      featured: true,
    },
    {
      title: "Prepwise – GRE Prep PWA",
      description:
        "MERN progressive web app with practice questions, mock tests, flashcards, and score analytics.",
      metric: "200+ practice questions, 5 full-length mocks",
      tech: ["React", "Redux", "Node.js", "Express", "MongoDB", "JWT", "PWA"],
      category: "Full-Stack",
    },
    {
      title: "U-Net Diffusion Model",
      description: "DDPM/DDIM diffusion model built from scratch on MNIST.",
      metric: "DDIM sampling in ~100 steps (4× fewer than DDPM)",
      details: ["U-Net with time embeddings, self-attention, and classifier-free guidance"],
      tech: ["PyTorch", "Diffusion Models"],
      category: "AI/ML",
    },
    {
      title: "LLM Fine-Tuning for Text-to-SQL",
      description: "LoRA fine-tuning of FLAN-T5 and Phi-2 to generate SQL with explanations.",
      metric: "BLEU 0.0019 → 0.37 with 100% SQL validity",
      tech: ["HuggingFace", "PEFT", "LoRA", "Gradio", "W&B"],
      category: "AI/ML",
    },
    {
      title: "US College Explorer",
      description: "R/Shiny recommendation app over 1,700+ U.S. colleges.",
      metric: "K-means clustering into 4 institutional archetypes",
      tech: ["R", "Shiny", "plotly", "caret"],
      category: "Data",
    },
  ],

  skills: [
    { category: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "SQL"] },
    {
      category: "Backend",
      items: ["NestJS", "FastAPI", "Django", "Node.js", "Express", "REST API design"],
    },
    { category: "Frontend", items: ["React", "Redux", "Next.js", "Tailwind CSS"] },
    {
      category: "AI/ML",
      items: ["PyTorch", "HuggingFace", "LoRA/QLoRA", "RAG", "pgvector", "OpenAI API", "AutoGen"],
    },
    {
      category: "Cloud & DevOps",
      items: [
        "AWS (EC2, S3, RDS, Lambda, SageMaker, CloudWatch)",
        "Terraform",
        "Docker",
        "GitHub Actions",
      ],
    },
    { category: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
  ],

  contact: {
    heading: "Let's work together.",
    blurb:
      "I'm graduating in December 2026 and open to new-grad software engineering roles. Email is the best way to reach me.",
  },
};
