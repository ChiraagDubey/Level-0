import type { PortfolioData } from "@/types/portfolio";

function makePlaceholder(label: string, accent: string, background: string, detail: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <rect width="1200" height="900" rx="60" fill="${background}" />
      <rect x="48" y="48" width="1104" height="804" rx="42" fill="#fffaf8" opacity="0.92" />
      <circle cx="244" cy="210" r="112" fill="${accent}" opacity="0.18" />
      <circle cx="952" cy="678" r="172" fill="${accent}" opacity="0.14" />
      <path d="M892 180c42-70 142-42 142 39 0 68-68 115-142 183-74-68-142-115-142-183 0-81 100-109 142-39Z" fill="${detail}" opacity="0.26" />
      <path d="M228 628c20-24 54-25 74-1 20-24 54-23 74 1 25 29 4 66-74 124-78-58-99-95-74-124Z" fill="${detail}" opacity="0.22" />
      <text x="84" y="768" fill="${accent}" font-size="84" font-family="Arial, sans-serif" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const defaultPortfolioData: PortfolioData = {
  templateId: "blushfolio",
  theme: {
    accentColor: "#d97898",
    accentName: "rose",
  },
  hero: {
    eyebrow: "Product designer and frontend storyteller",
    name: "Mira Vale",
    title: "Designing charming digital experiences with a soft visual voice, thoughtful UX structure, and polished frontend detail.",
    intro:
      "I build interfaces for lifestyle brands, creative founders, and modern products that want to feel warm, elevated, and memorable. My work blends visual design, product thinking, and frontend craft into experiences that feel beautiful and easy to use.",
    resumeLabel: "Download Resume",
    resumeUrl: "https://drive.google.com/file/d/blushfolio-resume/view",
    socialsLabel: "View My Work",
    socialsUrl: "https://dribbble.com/blushfolio",
    profileImage: makePlaceholder("Mira Vale", "#d97898", "#fdecef", "#f4c8d5"),
  },
  heroAside: {
    statusLabel: "Soft launch ready",
    profileLabel: "Profile card",
    profileModeLabel: "Pretty mode",
    detailLabel: "Charmed details",
    highlightItems: [
      "Thoughtful product visuals with frontend precision",
      "Soft brand expression without losing structure",
      "Built for creators, founders, and modern lifestyle products",
    ],
    spotlightLabel: "Sweet spot",
    spotlightTitle: "Soft visuals, sharp product thinking",
    spotlightBody:
      "Balancing warm storytelling, clean UX structure, and polished frontend implementation for brands that want personality without clutter.",
    toolkitLabel: "Signature blend",
    toolkitBody:
      "A mix of design systems, playful brand direction, and build-ready UI craft that keeps every page feeling intentional.",
  },
  about: {
    heading: "About",
    body:
      "I care about calm interfaces, expressive personal brands, and product pages that feel intentionally composed. Whether I am shaping a launch site, a creator portfolio, or a design-forward frontend system, I focus on clarity first and then layer in personality through rhythm, color, and refined detail.",
    location: "Bengaluru, India",
    availability: "Available for product design collaborations, frontend implementation, portfolio refreshes, and creative digital direction.",
  },
  projects: [
    {
      id: "project-1",
      name: "Petal Notes",
      summary:
        "A journal-inspired productivity concept for creators who wanted a softer, more expressive task flow. I designed the interface system, structured the mobile-first experience, and built the responsive frontend prototype.",
      linkLabel: "View Case Study",
      url: "https://example.com/petal-notes",
      image: makePlaceholder("Petal Notes", "#d97898", "#fff1f4", "#f7d9c6"),
      tags: ["Product Design", "React", "Design System"],
    },
    {
      id: "project-2",
      name: "Rosette Studio",
      summary:
        "A polished portfolio site for a boutique content studio, built to feel editorial, intimate, and high-conversion. The project focused on visual hierarchy, brand storytelling, and frontend finesse.",
      linkLabel: "Open Preview",
      url: "https://example.com/rosette-studio",
      image: makePlaceholder("Rosette Studio", "#c98aa4", "#fff6f3", "#f1d1da"),
      tags: ["Portfolio", "Next.js", "Brand UX"],
    },
    {
      id: "project-3",
      name: "Warm Peach Shop",
      summary:
        "A concept storefront for a beauty and lifestyle label with dreamy motion references, soft merchandising blocks, and a premium pink-and-peach visual language.",
      linkLabel: "See Build",
      url: "https://example.com/warm-peach-shop",
      image: makePlaceholder("Warm Peach Shop", "#e39c7b", "#fff5ef", "#f4cad4"),
      tags: ["E-commerce", "Frontend", "Visual Design"],
    },
  ],
  skills: [
    {
      id: "skills-1",
      title: "Design",
      items: ["Product UI", "Brand Storytelling", "Wireframing", "Visual Systems"],
    },
    {
      id: "skills-2",
      title: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "skills-3",
      title: "Creative Workflow",
      items: ["Creative Direction", "Prototyping", "Content Strategy", "Figma"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Studio Fleur",
      role: "Product Designer and Frontend Builder",
      period: "2024 - Present",
      summary:
        "Lead visual and interaction design for boutique digital products, then translate approved directions into responsive frontend builds with strong attention to spacing, polish, and usability.",
    },
    {
      id: "exp-2",
      company: "Bloom Grid",
      role: "UI Designer",
      period: "2023 - 2024",
      summary:
        "Created landing systems, portfolio pages, and design libraries for founder-led brands looking for a warmer and more premium web presence.",
    },
    {
      id: "exp-3",
      company: "Peachline Creative",
      role: "Design Intern",
      period: "2022 - 2023",
      summary:
        "Supported interface design, visual QA, and content layout exploration for client-facing marketing and product experiences.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "National Institute of Design Media Lab",
      degree: "B.Des in Interaction and Experience Design",
      period: "2019 - 2023",
    },
    {
      id: "edu-2",
      school: "Independent Frontend Practice",
      degree: "Advanced self-directed study in React, layout systems, and responsive UI implementation",
      period: "2021 - Present",
    },
  ],
  socialLinks: [
    {
      id: "social-1",
      label: "Dribbble",
      url: "https://dribbble.com/blushfolio",
    },
    {
      id: "social-2",
      label: "LinkedIn",
      url: "https://linkedin.com/in/blushfolio",
    },
    {
      id: "social-3",
      label: "GitHub",
      url: "https://github.com/blushfolio",
    },
    {
      id: "social-4",
      label: "Instagram",
      url: "https://instagram.com/blushfolio",
    },
  ],
  contact: {
    heading: "Let's create something beautiful together.",
    email: "mira@example.com",
    message:
      "If you need a thoughtful product designer, a frontend partner for a polished launch, or a personal brand site with softness and structure, I would love to hear what you are building.",
    ctaLabel: "Say Hello",
  },
  footer: {
    note: "BubuBlush is designed for soft storytelling, elegant digital presence, and portfolio pages that feel personal without sacrificing clarity.",
    watermark: "Built with LEVEL 0",
  },
  templateLabels: {
    quickFactsLabel: "Soft profile",
    socialLinksLabel: "Find me online",
    locationLabel: "Based in",
    availabilityLabel: "Currently",
    projectsLabel: "Featured work",
    projectsTitle: "Selected pieces with charm and structure",
    skillsLabel: "Toolkit",
    experienceLabel: "Experience",
    educationLabel: "Education",
  },
};
