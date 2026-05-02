import type { PortfolioData } from "@/types/portfolio";

function makePlaceholder(label: string, accent: string, background: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <rect width="1200" height="900" rx="56" fill="${background}" />
      <rect x="58" y="58" width="1084" height="784" rx="34" fill="#0b0f17" opacity="0.92" />
      <circle cx="168" cy="120" r="10" fill="#ff5f56" />
      <circle cx="200" cy="120" r="10" fill="#ffbd2e" />
      <circle cx="232" cy="120" r="10" fill="#27c93f" />
      <rect x="92" y="164" width="1016" height="2" fill="${accent}" opacity="0.3" />
      <circle cx="280" cy="270" r="86" fill="${accent}" opacity="0.18" />
      <circle cx="930" cy="660" r="168" fill="${accent}" opacity="0.12" />
      <text x="92" y="782" fill="${accent}" font-size="84" font-family="Courier New, monospace" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const defaultPortfolioData: PortfolioData = {
  templateId: "developer-os",
  theme: {
    accentColor: "#22c55e",
    accentName: "emerald",
  },
  hero: {
    eyebrow: "Developer OS",
    name: "Rohan Mehta",
    title: "Frontend engineer building practical developer-facing products, clean interfaces, and reliable shipping workflows.",
    intro:
      "I build portfolio systems, dashboards, and product interfaces with a bias toward clarity, maintainability, and calm technical execution.",
    resumeLabel: "Open Resume",
    resumeUrl: "https://drive.google.com/file/d/developer-os-resume/view",
    socialsLabel: "Open Socials",
    socialsUrl: "https://linktr.ee/developeros",
    profileImage: makePlaceholder("whoami", "#22c55e", "#061018"),
  },
  about: {
    heading: "About",
    body:
      "My work focuses on frontend architecture, interface systems, and practical product delivery. I like portfolio and dashboard experiences that feel sharp, readable, and operational from day one.",
    location: "Pune, India",
    availability: "Open to internships, frontend freelance work, and junior-friendly product engineering roles.",
  },
  projects: [
    {
      id: "project-1",
      name: "Launch Queue",
      summary: "A release dashboard concept for tracking frontend readiness, blockers, and deployment status across small product teams.",
      linkLabel: "open project",
      url: "https://example.com/launch-queue",
      image: makePlaceholder("launch-queue", "#22c55e", "#0b1620"),
      tags: ["Next.js", "Dashboard", "Frontend"],
    },
    {
      id: "project-2",
      name: "Build Notes",
      summary: "A compact knowledge and project log system for developers who need a cleaner personal documentation workflow.",
      linkLabel: "open project",
      url: "https://example.com/build-notes",
      image: makePlaceholder("build-notes", "#06b6d4", "#0b1720"),
      tags: ["TypeScript", "Docs", "Workflow"],
    },
    {
      id: "project-3",
      name: "Signal Deploy",
      summary: "A control panel style landing and reporting interface designed for operational clarity instead of marketing noise.",
      linkLabel: "open project",
      url: "https://example.com/signal-deploy",
      image: makePlaceholder("signal-deploy", "#8b5cf6", "#131225"),
      tags: ["UI Systems", "Analytics", "Product"],
    },
  ],
  skills: [
    {
      id: "skills-1",
      title: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "skills-2",
      title: "Systems",
      items: ["Component Architecture", "Editing UX", "Responsive UI", "Interface Cleanup"],
    },
    {
      id: "skills-3",
      title: "Workflow",
      items: ["Git", "QA", "Rapid Prototyping", "Delivery"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "North Grid Labs",
      role: "Frontend Developer",
      period: "2024 - Present",
      summary: "Build operational dashboards, product-facing interfaces, and maintainable frontend sections for internal and client tools.",
    },
    {
      id: "exp-2",
      company: "Frame Dock Studio",
      role: "UI Engineering Intern",
      period: "2023 - 2024",
      summary: "Supported component implementation, layout cleanup, and interface QA across several product surfaces.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Institute of Applied Computing",
      degree: "B.Tech in Computer Science",
      period: "2020 - 2024",
    },
  ],
  socialLinks: [
    {
      id: "social-1",
      label: "GitHub",
      url: "https://github.com/developeros",
    },
    {
      id: "social-2",
      label: "LinkedIn",
      url: "https://linkedin.com/in/developeros",
    },
    {
      id: "social-3",
      label: "Portfolio Log",
      url: "https://example.com/developer-log",
    },
  ],
  contact: {
    heading: "Open a conversation.",
    email: "rohan@example.com",
    message: "If you need a frontend builder who cares about clarity, delivery speed, and usable interfaces, let’s talk.",
    ctaLabel: "Ping Me",
  },
  footer: {
    note: "A developer command-center portfolio built to present work, context, and technical credibility in one place.",
    watermark: "Built with LEVEL 0",
  },
};
