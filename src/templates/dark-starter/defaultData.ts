import type { PortfolioData } from "@/types/portfolio";

function makePlaceholder(label: string, accent: string, background: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <rect width="1200" height="900" rx="48" fill="${background}" />
      <rect x="52" y="52" width="1096" height="796" rx="34" fill="white" opacity="0.08" />
      <circle cx="240" cy="190" r="96" fill="${accent}" opacity="0.3" />
      <circle cx="940" cy="700" r="180" fill="${accent}" opacity="0.14" />
      <text x="70" y="780" fill="${accent}" font-size="84" font-family="Arial, sans-serif" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const defaultPortfolioData: PortfolioData = {
  templateId: "dark-starter",
  theme: {
    accentColor: "#8b5cf6",
    accentName: "purple",
  },
  hero: {
    eyebrow: "Dark Starter Template",
    name: "Noah Bennett",
    title: "Frontend developer building calm, reliable portfolio sites for first launches.",
    intro:
      "I focus on clean user interfaces, maintainable frontend systems, and practical product delivery for early portfolio projects.",
    resumeLabel: "Resume",
    resumeUrl: "https://drive.google.com/file/d/dark-starter-resume/view",
    socialsLabel: "Socials",
    socialsUrl: "https://linktr.ee/darkstarter",
    profileImage: makePlaceholder("Portrait", "#8b5cf6", "#0f1020"),
  },
  about: {
    heading: "About",
    body:
      "I enjoy building focused digital experiences that feel polished without becoming overdesigned. My work sits at the intersection of frontend development, UI structure, and practical shipping.",
    location: "Remote / Global",
    availability: "Open to junior-friendly freelance work, personal branding builds, and startup landing pages.",
  },
  projects: [
    {
      id: "project-1",
      name: "Night Ledger",
      summary: "A minimalist finance dashboard concept designed to feel calm, legible, and trustworthy for first-time users.",
      linkLabel: "View Project",
      url: "https://example.com/night-ledger",
      image: makePlaceholder("Night Ledger", "#8b5cf6", "#17182c"),
      tags: ["Next.js", "Dashboard", "UI"],
    },
    {
      id: "project-2",
      name: "Orbit Notes",
      summary: "A compact note-taking workspace with soft panels, a clear reading rhythm, and simple content actions.",
      linkLabel: "Open Demo",
      url: "https://example.com/orbit-notes",
      image: makePlaceholder("Orbit Notes", "#06b6d4", "#10212c"),
      tags: ["TypeScript", "Productivity", "UX"],
    },
    {
      id: "project-3",
      name: "Studio Path",
      summary: "A creator-focused profile site template built to help new freelancers publish their work without setup friction.",
      linkLabel: "See Case Study",
      url: "https://example.com/studio-path",
      image: makePlaceholder("Studio Path", "#f43f5e", "#2a1320"),
      tags: ["Portfolio", "Branding", "Frontend"],
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
      title: "Design",
      items: ["Layout Systems", "Component Thinking", "Visual Hierarchy", "Responsive UI"],
    },
    {
      id: "skills-3",
      title: "Workflow",
      items: ["Git", "Rapid Prototyping", "Content Mapping", "MVP Delivery"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Moonframe Studio",
      role: "Frontend Developer",
      period: "2024 - Present",
      summary: "Build landing pages, portfolio systems, and interface components for creator and startup clients.",
    },
    {
      id: "exp-2",
      company: "North Block Labs",
      role: "UI Engineering Intern",
      period: "2023 - 2024",
      summary: "Supported dashboard implementation, component cleanup, and frontend QA across internal tools.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Open Tech Institute",
      degree: "B.Sc. in Computer Applications",
      period: "2019 - 2023",
    },
  ],
  socialLinks: [
    {
      id: "social-1",
      label: "GitHub",
      url: "https://github.com/darkstarter",
    },
    {
      id: "social-2",
      label: "LinkedIn",
      url: "https://linkedin.com/in/darkstarter",
    },
    {
      id: "social-3",
      label: "Behance",
      url: "https://behance.net/darkstarter",
    },
  ],
  contact: {
    heading: "Let's build something clear and launch-ready.",
    email: "noah@example.com",
    message: "If you need a clean portfolio, a sharper developer presence, or a simpler frontend system, reach out.",
    ctaLabel: "Get In Touch",
  },
  footer: {
    note: "Designed to feel approachable, dark, and production-ready from the first draft.",
    watermark: "Built with LEVEL 0",
  },
};
