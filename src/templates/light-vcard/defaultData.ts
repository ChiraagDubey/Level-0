import type { PortfolioData } from "@/types/portfolio";

function makePlaceholder(label: string, accent: string, background: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <rect width="1200" height="900" rx="56" fill="${background}" />
      <rect x="64" y="64" width="1072" height="772" rx="36" fill="white" opacity="0.88" />
      <circle cx="260" cy="220" r="96" fill="${accent}" opacity="0.18" />
      <circle cx="945" cy="685" r="170" fill="${accent}" opacity="0.16" />
      <text x="84" y="764" fill="${accent}" font-size="86" font-family="Arial, sans-serif" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const defaultPortfolioData: PortfolioData = {
  templateId: "light-vcard",
  theme: {
    accentColor: "#2563eb",
    accentName: "cyan",
  },
  hero: {
    eyebrow: "Light vCard",
    name: "Elena Brooks",
    title: "Product-focused frontend developer building crisp portfolio systems and polished web interfaces.",
    intro:
      "I design and ship practical portfolio, product UI, and personal brand websites that feel clear, modern, and easy to maintain.",
    resumeLabel: "Resume",
    resumeUrl: "https://drive.google.com/file/d/light-vcard-resume/view",
    socialsLabel: "Socials",
    socialsUrl: "https://linktr.ee/lightvcard",
    profileImage: makePlaceholder("Profile", "#2563eb", "#ece7de"),
  },
  about: {
    heading: "About",
    body:
      "My work sits between frontend engineering, clean interface design, and practical launch strategy. I like profile sites that feel refined, readable, and useful to recruiters and clients.",
    location: "Mumbai, India",
    availability: "Available for product UI work, portfolio refreshes, and junior-friendly frontend freelance projects.",
  },
  projects: [
    {
      id: "project-1",
      name: "Northline CV",
      summary: "A compact personal site for a recent graduate that turned scattered profile details into a cleaner recruiter-facing portfolio.",
      linkLabel: "View Case Study",
      url: "https://example.com/northline-cv",
      image: makePlaceholder("Northline CV", "#2563eb", "#f0ece4"),
      tags: ["Portfolio", "Next.js", "UI"],
    },
    {
      id: "project-2",
      name: "Studio Brief",
      summary: "A project intake and delivery panel for a freelance designer who needed a more organized client-facing workflow.",
      linkLabel: "See Build",
      url: "https://example.com/studio-brief",
      image: makePlaceholder("Studio Brief", "#10b981", "#edf6ef"),
      tags: ["TypeScript", "Workflow", "Freelance"],
    },
    {
      id: "project-3",
      name: "Profile Desk",
      summary: "A professional profile website concept shaped around scannable sections, compact cards, and light editorial polish.",
      linkLabel: "Open Demo",
      url: "https://example.com/profile-desk",
      image: makePlaceholder("Profile Desk", "#f97316", "#f8efe6"),
      tags: ["Resume", "Profile", "Frontend"],
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
      items: ["UI Structure", "Visual Hierarchy", "Responsive Layouts", "Content Systems"],
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
      company: "Atelier Grid",
      role: "Frontend Developer",
      period: "2024 - Present",
      summary: "Build profile sites, product pages, and structured frontend sections for creator and service clients.",
    },
    {
      id: "exp-2",
      company: "Beacon Studio",
      role: "UI Engineering Intern",
      period: "2023 - 2024",
      summary: "Supported interface implementation, component cleanup, and QA on internal web tools.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Institute of Design Technology",
      degree: "B.Tech in Computer Science",
      period: "2020 - 2024",
    },
  ],
  socialLinks: [
    {
      id: "social-1",
      label: "GitHub",
      url: "https://github.com/lightvcard",
    },
    {
      id: "social-2",
      label: "LinkedIn",
      url: "https://linkedin.com/in/lightvcard",
    },
    {
      id: "social-3",
      label: "Dribbble",
      url: "https://dribbble.com/lightvcard",
    },
  ],
  contact: {
    heading: "Let’s make your profile feel clearer and more credible.",
    email: "elena@example.com",
    message: "If you need a cleaner portfolio, a sharper frontend presence, or a more recruiter-friendly personal site, reach out.",
    ctaLabel: "Email Me",
  },
  footer: {
    note: "A light vCard portfolio designed to keep profile information compact, polished, and easy to scan.",
    watermark: "Built with LEVEL 0",
  },
};
