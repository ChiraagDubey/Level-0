import type { PortfolioData } from "@/types/portfolio";

function makeAvatarPlaceholder(label: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="avatar-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff4fd8" />
          <stop offset="52%" stop-color="#2de2ff" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </linearGradient>
        <radialGradient id="avatar-glow" cx="20%" cy="18%" r="72%">
          <stop offset="0%" stop-color="#ff4fd8" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#ff4fd8" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="900" rx="56" fill="#080712" />
      <rect width="1200" height="900" rx="56" fill="url(#avatar-glow)" />
      <rect x="44" y="44" width="1112" height="812" rx="40" fill="#090816" stroke="url(#avatar-border)" stroke-width="4" />
      <path d="M44 182 H1156" stroke="#ff4fd8" opacity="0.46" stroke-width="3" />
      <path d="M160 44 V856 M340 44 V856 M520 44 V856 M700 44 V856 M880 44 V856 M1060 44 V856" stroke="#8aa4ff" opacity="0.09" />
      <path d="M44 300 H1156 M44 450 H1156 M44 600 H1156 M44 750 H1156" stroke="#8aa4ff" opacity="0.09" />
      <circle cx="898" cy="194" r="108" fill="#2de2ff" opacity="0.08" />
      <circle cx="280" cy="260" r="136" fill="#ff4fd8" opacity="0.14" />
      <rect x="102" y="116" width="174" height="62" rx="20" fill="#17091b" stroke="#ff4fd8" stroke-opacity="0.48" />
      <text x="132" y="158" fill="#ff9ae9" font-size="30" font-family="'Pixelify Sans', 'Courier New', monospace" font-weight="700">READY</text>
      <rect x="876" y="706" width="192" height="56" rx="18" fill="#08111f" stroke="#2de2ff" stroke-opacity="0.48" />
      <text x="908" y="744" fill="#7af1ff" font-size="28" font-family="'Pixelify Sans', 'Courier New', monospace" font-weight="700">SYNC 99%</text>
      <circle cx="488" cy="356" r="126" fill="#141028" stroke="#2de2ff" stroke-opacity="0.48" stroke-width="8" />
      <path d="M408 384 C408 314 448 272 490 272 C532 272 572 314 572 384 C572 454 532 492 490 492 C448 492 408 454 408 384 Z" fill="#221839" />
      <path d="M336 642 C366 554 436 512 492 512 C548 512 618 554 648 642 L648 714 L336 714 Z" fill="#130f26" stroke="#ff4fd8" stroke-opacity="0.22" stroke-width="4" />
      <circle cx="428" cy="346" r="10" fill="#ff4fd8" />
      <circle cx="550" cy="346" r="10" fill="#2de2ff" />
      <path d="M430 418 C456 438 524 438 550 418" stroke="#ffd166" stroke-width="8" stroke-linecap="round" opacity="0.85" />
      <text x="96" y="790" fill="#ff9ae9" font-size="82" font-family="'Pixelify Sans', 'Courier New', monospace" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function makeMissionPlaceholder(label: string, primary: string, secondary: string, support: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="mission-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="56%" stop-color="${secondary}" />
          <stop offset="100%" stop-color="${support}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" rx="56" fill="#070712" />
      <rect x="52" y="52" width="1096" height="796" rx="38" fill="#090816" stroke="url(#mission-border)" stroke-width="4" />
      <path d="M52 172 H1148" stroke="${primary}" stroke-opacity="0.42" stroke-width="3" />
      <path d="M172 52 V848 M356 52 V848 M540 52 V848 M724 52 V848 M908 52 V848" stroke="#90a6ff" opacity="0.08" />
      <path d="M52 290 H1148 M52 430 H1148 M52 570 H1148 M52 710 H1148" stroke="#90a6ff" opacity="0.08" />
      <rect x="102" y="116" width="256" height="68" rx="22" fill="#140a18" stroke="${primary}" stroke-opacity="0.44" />
      <text x="134" y="160" fill="${primary}" font-size="34" font-family="'Pixelify Sans', 'Courier New', monospace" font-weight="700">${label}</text>
      <rect x="858" y="690" width="214" height="58" rx="18" fill="#08111f" stroke="${secondary}" stroke-opacity="0.44" />
      <text x="890" y="728" fill="${secondary}" font-size="28" font-family="'Pixelify Sans', 'Courier New', monospace" font-weight="700">GO LIVE</text>
      <circle cx="316" cy="382" r="148" fill="${primary}" opacity="0.15" />
      <circle cx="838" cy="294" r="110" fill="${secondary}" opacity="0.12" />
      <path d="M258 630 L410 360 L560 630 Z" fill="#110d22" stroke="${support}" stroke-opacity="0.36" stroke-width="6" />
      <rect x="642" y="312" width="242" height="182" rx="30" fill="#0f1021" stroke="${secondary}" stroke-opacity="0.34" stroke-width="5" />
      <rect x="692" y="352" width="142" height="20" rx="10" fill="${secondary}" opacity="0.72" />
      <rect x="692" y="396" width="102" height="20" rx="10" fill="${primary}" opacity="0.74" />
      <rect x="692" y="440" width="156" height="20" rx="10" fill="${support}" opacity="0.72" />
      <text x="98" y="796" fill="#ffffff" opacity="0.82" font-size="74" font-family="'Pixelify Sans', 'Courier New', monospace" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const defaultPortfolioData: PortfolioData = {
  templateId: "arcade-neon",
  theme: {
    accentColor: "#ff4fd8",
    accentName: "rose",
  },
  hero: {
    eyebrow: "Neon Vanguard",
    name: "Aria Vega",
    title: "Frontend developer building premium interfaces with arcade energy, product clarity, and dependable execution.",
    intro:
      "I design and ship portfolio systems, product surfaces, and launch-ready interfaces that feel electric without losing structure, readability, or trust.",
    resumeLabel: "Download CV",
    resumeUrl: "https://drive.google.com/file/d/arcade-neon-resume/view",
    socialsLabel: "Open Links",
    socialsUrl: "https://linktr.ee/arcadeneon",
    profileImage: makeAvatarPlaceholder("PLAYER CARD"),
  },
  about: {
    heading: "Origin Story",
    body:
      "My work blends frontend engineering, interface systems, and creative presentation. I like portfolio experiences that feel distinct, polished, and easy to scan for recruiters, clients, and collaborators.",
    location: "Bengaluru, India",
    availability: "Open to internships, frontend product work, and creative developer portfolio builds.",
  },
  projects: [
    {
      id: "project-1",
      name: "Nebula Arena",
      summary: "A multiplayer product landing and dashboard concept built around brighter visual identity and clearer project storytelling.",
      linkLabel: "Launch Mission",
      url: "https://example.com/nebula-arena",
      image: makeMissionPlaceholder("MISSION 01", "#ff4fd8", "#2de2ff", "#8b5cf6"),
      tags: ["Next.js", "Dashboard", "UI Systems"],
    },
    {
      id: "project-2",
      name: "Stellar Notes",
      summary: "A compact workspace for organizing product notes, design references, and launch checklists without visual clutter.",
      linkLabel: "Launch Mission",
      url: "https://example.com/stellar-notes",
      image: makeMissionPlaceholder("MISSION 02", "#2de2ff", "#8b5cf6", "#ff4fd8"),
      tags: ["TypeScript", "Productivity", "Frontend"],
    },
    {
      id: "project-3",
      name: "Quest Journal",
      summary: "A profile-led project site shaped around rich sections, narrative framing, and polished visual hierarchy.",
      linkLabel: "Launch Mission",
      url: "https://example.com/quest-journal",
      image: makeMissionPlaceholder("MISSION 03", "#8b5cf6", "#ff4fd8", "#2de2ff"),
      tags: ["Portfolio", "Branding", "Responsive UI"],
    },
  ],
  skills: [
    {
      id: "skills-1",
      title: "Core Stack",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "skills-2",
      title: "Design Systems",
      items: ["Visual Hierarchy", "Component Thinking", "Responsive Layouts", "Interaction Polish"],
    },
    {
      id: "skills-3",
      title: "Workflow",
      items: ["Git", "Rapid Prototyping", "QA", "Frontend Delivery"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Nova Grid Studio",
      role: "Frontend Developer",
      period: "2024 - Present",
      summary: "Build profile sites, dashboards, and branded product surfaces with a focus on clean architecture and launch quality.",
    },
    {
      id: "exp-2",
      company: "Pixel Harbor Labs",
      role: "UI Engineering Intern",
      period: "2023 - 2024",
      summary: "Supported interface implementation, component cleanup, and frontend QA across multiple product builds.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Academy of Digital Systems",
      degree: "B.Tech in Computer Science",
      period: "2020 - 2024",
    },
  ],
  socialLinks: [
    {
      id: "social-1",
      label: "GitHub",
      url: "https://github.com/arcadeneon",
    },
    {
      id: "social-2",
      label: "LinkedIn",
      url: "https://linkedin.com/in/arcadeneon",
    },
    {
      id: "social-3",
      label: "Design Log",
      url: "https://example.com/design-log",
    },
  ],
  contact: {
    heading: "Final checkpoint reached.",
    email: "aria@example.com",
    message: "If you need a developer who can make a portfolio, product surface, or frontend system feel more alive and more useful, reach out.",
    ctaLabel: "Connect",
  },
  footer: {
    note: "A premium arcade-inspired portfolio built to feel memorable, polished, and launch-ready.",
    watermark: "Built with LEVEL 0",
  },
};
