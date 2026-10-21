/**
 * Single source of truth for all site content.
 * Edit this file to update the site — components only render what is here.
 *
 * Paths to files in public/ (e.g. "/resume.pdf") are written WITHOUT the basePath;
 * components pass them through assetPath() when rendering.
 *
 * Everything marked TODO is placeholder content.
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
  role: string;
  tagline: string;
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
  highlights: string[];
  tech?: string[];
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
  details?: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  /** Source code URL. */
  repo?: string;
  /** Live demo URL. */
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
    title: "Tushar Patel — Software Engineer", // TODO
    description:
      "Portfolio of Tushar Patel: projects, experience, and contact information.", // TODO
    url: "https://example.vercel.app", // TODO: set after first Vercel deploy
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
    role: "Software Engineer", // TODO
    tagline:
      "I build reliable, well-crafted software — from backend systems to polished interfaces.", // TODO
    location: "Boston, MA", // TODO
    email: "you@example.com", // TODO
    resume: "/resume.pdf", // TODO: replace public/resume.pdf with your resume
    about: [
      // TODO
      "Placeholder: a short introduction — who you are, what you work on, and what you care about as an engineer.",
      "Placeholder: what you're currently studying or building, and the kinds of roles or problems you're interested in.",
    ],
    socials: [
      { label: "GitHub", href: "https://github.com/tushar-patel28", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle", icon: "linkedin" }, // TODO
      { label: "Email", href: "mailto:you@example.com", icon: "mail" }, // TODO
    ],
  },

  experience: [
    // TODO
    {
      company: "Company One",
      role: "Software Engineer Intern",
      location: "Remote",
      start: "May 2025",
      end: "Aug 2025",
      highlights: [
        "Placeholder: an impact-focused bullet with a concrete result (e.g. reduced latency by 40%).",
        "Placeholder: a bullet about something you designed, owned, or shipped.",
      ],
      tech: ["TypeScript", "React", "Node.js"],
    },
    {
      company: "Company Two",
      role: "Software Developer",
      location: "City, Country",
      start: "Jan 2022",
      end: "Jul 2024",
      highlights: [
        "Placeholder: describe a system or feature you built and its scale.",
        "Placeholder: describe a collaboration, mentoring, or process improvement.",
      ],
      tech: ["Python", "PostgreSQL", "AWS"],
    },
  ],

  education: [
    // TODO
    {
      school: "Northeastern University",
      degree: "M.S. in Computer Science",
      start: "Sep 2024",
      end: "May 2026",
    },
  ],

  projects: [
    // TODO
    {
      title: "Project Alpha",
      description:
        "Placeholder: one or two sentences on what it does, why it's interesting, and your role.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      repo: "https://github.com/tushar-patel28",
      live: "https://example.com",
      featured: true,
    },
    {
      title: "Project Beta",
      description:
        "Placeholder: a data, ML, or backend project — highlight the hardest problem you solved.",
      tech: ["Python", "FastAPI", "Docker"],
      repo: "https://github.com/tushar-patel28",
      featured: true,
    },
    {
      title: "Project Gamma",
      description: "Placeholder: a smaller tool, library, or experiment.",
      tech: ["Go", "CLI"],
      repo: "https://github.com/tushar-patel28",
    },
  ],

  skills: [
    // TODO
    { category: "Languages", items: ["TypeScript", "Python", "Java", "SQL"] },
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { category: "Backend & Data", items: ["Node.js", "FastAPI", "PostgreSQL", "Redis"] },
    { category: "Tools & Cloud", items: ["Git", "Docker", "AWS", "Linux"] },
  ],

  contact: {
    heading: "Let's work together.",
    blurb:
      "My inbox is always open — whether it's an opportunity, a question, or just to say hi.", // TODO
  },
};
