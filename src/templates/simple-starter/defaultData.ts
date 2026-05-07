import type { PortfolioData } from "@/types/portfolio";

function makePlaceholder(label: string, accent: string, background: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <rect width="1200" height="900" rx="48" fill="${background}" />
      <rect x="64" y="64" width="1072" height="772" rx="32" fill="white" opacity="0.18" />
      <circle cx="300" cy="240" r="110" fill="${accent}" opacity="0.25" />
      <circle cx="900" cy="610" r="150" fill="${accent}" opacity="0.18" />
      <text x="80" y="760" fill="${accent}" font-size="88" font-family="Arial, sans-serif" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const defaultPortfolioData: PortfolioData = {
  templateId: "simple-starter",
  theme: {
    accentColor: "#06b6d4",
    accentName: "cyan",
  },
  hero: {
    eyebrow: "LEVEL 0 Demo Portfolio",
    name: "Maya Sterling",
    title: "Product-minded full-stack engineer shaping clear digital experiences.",
    intro:
      "I build thoughtful interfaces, reliable systems, and fast MVPs that make teams look sharper than their headcount suggests.",
    resumeLabel: "Resume",
    resumeUrl: "https://drive.google.com/file/d/example-resume/view",
    socialsLabel: "Socials",
    socialsUrl: "https://linktr.ee/example",
    profileImage: makePlaceholder("Profile", "#06b6d4", "#102033"),
  },
  about: {
    heading: "About",
    body:
      "I work across product, design systems, and application architecture. My sweet spot is turning rough concepts into production-ready experiences with clear tradeoffs and strong editing workflows.",
    location: "Bengaluru, India",
    availability: "Available for freelance product builds and senior engineering work.",
  },
  projects: [
    {
      id: "project-1",
      name: "Signal Studio",
      summary: "A lightweight insight dashboard that turned messy research inputs into a single client-facing narrative.",
      linkLabel: "Open Case Study",
      url: "https://example.com/signal-studio",
      image: makePlaceholder("Signal Studio", "#06b6d4", "#132a3d"),
      tags: ["Next.js", "Design Systems", "Analytics"],
    },
    {
      id: "project-2",
      name: "Field Notes",
      summary: "A mobile-first operations workspace for distributed teams managing approvals, handoffs, and delivery updates.",
      linkLabel: "Explore Product",
      url: "https://example.com/field-notes",
      image: makePlaceholder("Field Notes", "#10b981", "#163126"),
      tags: ["TypeScript", "Workflows", "Mobile UX"],
    },
    {
      id: "project-3",
      name: "Canvas Loop",
      summary: "A visual content pipeline for launching campaign pages quickly without recreating the same production setup every sprint.",
      linkLabel: "See Demo",
      url: "https://example.com/canvas-loop",
      image: makePlaceholder("Canvas Loop", "#f97316", "#382312"),
      tags: ["CMS", "Automation", "Frontend"],
    },
  ],
  skills: [
    {
      id: "skills-1",
      title: "Build",
      items: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    },
    {
      id: "skills-2",
      title: "Product",
      items: ["MVP Architecture", "Editing UX", "Systems Thinking", "Roadmapping"],
    },
    {
      id: "skills-3",
      title: "Delivery",
      items: ["Technical Strategy", "Stakeholder Alignment", "Rapid Prototyping", "QA"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Northline Studio",
      role: "Lead Product Engineer",
      period: "2023 - Present",
      summary: "Own the frontend architecture and delivery workflows for client-facing web products.",
    },
    {
      id: "exp-2",
      company: "Delta Foundry",
      role: "Senior Full-Stack Engineer",
      period: "2020 - 2023",
      summary: "Built internal tools, shipping portals, and rapid prototypes for early-stage product teams.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "National Institute of Design Systems",
      degree: "B.Tech in Computer Science",
      period: "2016 - 2020",
    },
  ],
  socialLinks: [
    {
      id: "social-1",
      label: "GitHub",
      url: "https://github.com/example",
    },
    {
      id: "social-2",
      label: "LinkedIn",
      url: "https://linkedin.com/in/example",
    },
    {
      id: "social-3",
      label: "Twitter",
      url: "https://x.com/example",
    },
  ],
  contact: {
    heading: "Let's build something useful.",
    email: "maya@example.com",
    message: "If you need a sharp MVP, a stronger editing experience, or a portfolio that ships cleanly, reach out.",
    ctaLabel: "Email Me",
  },
  footer: {
    note: "Built to show your work without the setup spiral.",
    watermark: "Built with LEVEL 0",
  },
  templateLabels: {
    heroExperienceLabel: "Current role",
    heroEducationLabel: "Education",
    heroSkillsLabel: "Core stack",
    quickFactsLabel: "Quick facts",
    socialLinksLabel: "Social links",
    aboutSkillsLabel: "Strengths",
    projectsLabel: "Projects",
    projectsTitle: "Selected work",
    skillsLabel: "Skills",
    experienceLabel: "Experience",
    educationLabel: "Education",
  },
};
