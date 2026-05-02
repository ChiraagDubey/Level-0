import type { PortfolioData } from "@/types/portfolio";

function makePlaceholder(label: string, accent: string, background: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <rect width="1200" height="900" rx="56" fill="${background}" />
      <rect x="64" y="64" width="1072" height="772" rx="36" fill="white" opacity="0.06" />
      <circle cx="260" cy="220" r="96" fill="${accent}" opacity="0.24" />
      <circle cx="945" cy="685" r="170" fill="${accent}" opacity="0.14" />
      <text x="84" y="764" fill="${accent}" font-size="86" font-family="Arial, sans-serif" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const defaultPortfolioData: PortfolioData = {
  templateId: "profile-card",
  theme: {
    accentColor: "#38bdf8",
    accentName: "cyan",
  },
  hero: {
    eyebrow: "Profile Card",
    name: "Anika Rao",
    title: "Frontend developer designing compact portfolio systems with clean structure and sharp delivery.",
    intro:
      "I build practical portfolio, landing page, and product UI work with an emphasis on clarity, editing speed, and reliable frontend foundations.",
    resumeLabel: "View Resume",
    resumeUrl: "https://drive.google.com/file/d/profile-card-resume/view",
    socialsLabel: "Social Hub",
    socialsUrl: "https://linktr.ee/profilecard",
    profileImage: makePlaceholder("Profile", "#38bdf8", "#0f172a"),
  },
  about: {
    heading: "About",
    body:
      "I focus on frontend systems that feel polished without becoming heavy. My work covers portfolio builds, UI cleanup, and launch-ready interfaces for students, freelancers, and early teams.",
    location: "Hyderabad, India",
    availability: "Open to internships, junior-friendly freelance work, developer portfolios, and focused UI builds.",
  },
  projects: [
    {
      id: "project-1",
      name: "Signal Desk",
      summary: "A compact analytics workspace that turns campaign results into a clean client-facing snapshot.",
      linkLabel: "Case Study",
      url: "https://example.com/signal-desk",
      image: makePlaceholder("Signal Desk", "#38bdf8", "#13263a"),
      tags: ["Next.js", "Analytics", "Dashboard"],
    },
    {
      id: "project-2",
      name: "Studio Sheet",
      summary: "A portfolio intake and revision tool that helps freelancers organize client content before launch.",
      linkLabel: "View Build",
      url: "https://example.com/studio-sheet",
      image: makePlaceholder("Studio Sheet", "#14b8a6", "#113135"),
      tags: ["TypeScript", "Forms", "Workflow"],
    },
    {
      id: "project-3",
      name: "Northline Bio",
      summary: "A personal site concept for a student developer who needed a compact layout with strong project scanning.",
      linkLabel: "Open Demo",
      url: "https://example.com/northline-bio",
      image: makePlaceholder("Northline Bio", "#f97316", "#331f12"),
      tags: ["Portfolio", "Responsive", "UI"],
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
      items: ["Git", "Rapid Prototyping", "Content Mapping", "QA"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Blueframe Studio",
      role: "Frontend Developer",
      period: "2024 - Present",
      summary: "Build portfolio systems, landing pages, and interface sections for creator and startup clients.",
    },
    {
      id: "exp-2",
      company: "Array Labs",
      role: "UI Engineering Intern",
      period: "2023 - 2024",
      summary: "Supported component implementation, dashboard polish, and frontend QA across internal tools.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Institute of Digital Systems",
      degree: "B.Tech in Computer Science",
      period: "2020 - 2024",
    },
  ],
  socialLinks: [
    {
      id: "social-1",
      label: "GitHub",
      url: "https://github.com/profilecard",
    },
    {
      id: "social-2",
      label: "LinkedIn",
      url: "https://linkedin.com/in/profilecard",
    },
    {
      id: "social-3",
      label: "Behance",
      url: "https://behance.net/profilecard",
    },
  ],
  contact: {
    heading: "Let's build something clear and professional.",
    email: "anika@example.com",
    message: "If you need a compact portfolio, a stronger frontend presence, or a clean launch-ready UI, get in touch.",
    ctaLabel: "Email Me",
  },
  footer: {
    note: "A compact vCard portfolio built to show your identity and work without visual noise.",
    watermark: "Built with LEVEL 0",
  },
};
