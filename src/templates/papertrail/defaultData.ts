import type { PortfolioData } from "@/types/portfolio";

function makePlaceholder(label: string, accent: string, background: string, paper: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <rect width="1200" height="900" rx="48" fill="${background}" />
      <rect x="54" y="52" width="1092" height="796" rx="34" fill="${paper}" />
      <rect x="98" y="108" width="1004" height="684" rx="26" fill="#fffdfa" opacity="0.95" />
      <path d="M172 178h236" stroke="${accent}" stroke-width="10" stroke-linecap="round" opacity="0.44" />
      <path d="M172 228h346" stroke="#5c554f" stroke-width="7" stroke-linecap="round" opacity="0.24" />
      <path d="M172 268h286" stroke="#5c554f" stroke-width="7" stroke-linecap="round" opacity="0.18" />
      <rect x="798" y="136" width="186" height="62" rx="12" fill="${accent}" opacity="0.18" />
      <rect x="814" y="224" width="232" height="206" rx="22" fill="#efe3cd" />
      <rect x="838" y="246" width="182" height="126" rx="14" fill="#f9f5ed" />
      <circle cx="876" cy="612" r="142" fill="${accent}" opacity="0.10" />
      <rect x="184" y="566" width="362" height="154" rx="18" fill="#f4ecdf" />
      <path d="M206 606h286" stroke="#5c554f" stroke-width="8" stroke-linecap="round" opacity="0.22" />
      <path d="M206 644h314" stroke="#5c554f" stroke-width="8" stroke-linecap="round" opacity="0.16" />
      <text x="184" y="808" fill="${accent}" font-size="82" font-family="Georgia, serif" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const defaultPortfolioData: PortfolioData = {
  templateId: "papertrail",
  theme: {
    accentColor: "#8d5d4f",
    accentName: "rose",
  },
  hero: {
    eyebrow: "Documented product engineering portfolio",
    name: "Rowan Hale",
    title: "Product-minded builder documenting experiments, systems, and shipped work with editorial clarity.",
    intro:
      "I design and build software like a field notebook: observe closely, test quickly, record decisions, and ship the cleanest version that moves the work forward. My focus lives at the intersection of product thinking, frontend craft, and dependable systems.",
    resumeLabel: "Download Resume",
    resumeUrl: "https://drive.google.com/file/d/papertrail-resume/view",
    socialsLabel: "View Work",
    socialsUrl: "https://example.com/papertrail-work",
    profileImage: makePlaceholder("Rowan Hale", "#8d5d4f", "#e8dcc9", "#f6f0e6"),
  },
  heroAside: {
    statusLabel: "Case file open",
    profileLabel: "Field portrait",
    profileModeLabel: "Issue 08",
    detailLabel: "Margin notes",
    highlightItems: [
      "Turns rough product ideas into shippable systems with clear tradeoffs.",
      "Documents process, not just outcomes, so teams can repeat what worked.",
      "Builds interfaces that feel calm, tactile, and operationally sharp.",
    ],
    spotlightLabel: "Author's note",
    spotlightTitle: "Shipping with structure, curiosity, and a bias toward clarity",
    spotlightBody:
      "The work I enjoy most sits between product strategy and implementation: ambiguous inputs, real user needs, and a team that benefits from sharper systems, cleaner writing, and interfaces that make decisions easier.",
    toolkitLabel: "Builder's note",
    toolkitBody:
      "My stack changes with the problem, but the approach stays consistent: map the workflow, remove friction, preserve readability, and leave behind a system other people can extend without guesswork.",
    logoText: "PT",
    aboutDocument: "This layout is built to read like a collected working document rather than a dashboard or blog.",
    aboutDocumentNote: "documented with care",
    funFactsTitle: "Fun Facts",
    funFacts: [
      "Chai > Coffee",
      "Indie hacker at heart",
      "Night owl",
      "Love sketching UI",
      "Always learning",
      ":)"
    ]
  },
  about: {
    heading: "Author's Note",
    body:
      "I like portfolios that read like working documents instead of polished theater. The strongest products I have worked on came from disciplined iteration, good notes, and an honest understanding of what the user needed right now versus later. That is how I build too: define the job, shape the flow, make the interface legible, and keep the implementation sturdy enough for the next version. I care about documentation, interaction quality, performance, and the quiet design decisions that make software feel composed.",
    location: "Bengaluru, India",
    availability: "Available for product engineering, frontend systems work, UX-heavy MVPs, internal tools, and design-minded implementation partnerships.",
  },
  projects: [
    {
      id: "project-1",
      name: "Signal Ledger",
      summary:
        "A research-to-roadmap workspace for product teams drowning in scattered interview notes and feedback threads. I designed the narrative structure, built the editor-facing workflow, and shipped the responsive interface system that turned raw inputs into weekly decision-ready dossiers.",
      linkLabel: "Open Case File",
      url: "https://example.com/signal-ledger",
      image: makePlaceholder("Signal Ledger", "#7d4f42", "#e9ddcb", "#f8f3eb"),
      tags: ["Next.js", "Research Ops", "Editorial UI"],
    },
    {
      id: "project-2",
      name: "Relay Archive",
      summary:
        "A documented handoff tool for operations and support teams managing recurring requests across regions. The product centered on traceability, readable logs, and fast review states without turning the interface into enterprise noise.",
      linkLabel: "Review Build",
      url: "https://example.com/relay-archive",
      image: makePlaceholder("Relay Archive", "#6d7f66", "#e6dfd2", "#f4efe4"),
      tags: ["TypeScript", "Workflows", "Internal Tools"],
    },
    {
      id: "project-3",
      name: "Northline Notes",
      summary:
        "A portfolio and publishing system for a studio that wanted every case study to feel like a collected artifact. I led the content structure, visual language, and frontend build, creating a paper-led editorial experience that stayed easy to maintain.",
      linkLabel: "View Dossier",
      url: "https://example.com/northline-notes",
      image: makePlaceholder("Northline Notes", "#495c78", "#e5d9c7", "#f8f2e9"),
      tags: ["Portfolio Systems", "React", "Content Design"],
    },
  ],
  skills: [
    {
      id: "skills-1",
      title: "Product Thinking",
      items: ["Workflow Design", "Research Synthesis", "Scope Framing", "Systems Mapping"],
    },
    {
      id: "skills-2",
      title: "Frontend Build",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Design Systems"],
    },
    {
      id: "skills-3",
      title: "Operations and Delivery",
      items: ["Documentation", "MVP Architecture", "Cross-functional Communication", "Rapid Prototyping"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Northline Systems",
      role: "Lead Product Engineer",
      period: "2023 - Present",
      summary:
        "Own the interface architecture for workflow-heavy products, pairing product discovery with implementation. I document tradeoffs, shape editor experiences, and ship systems that balance speed, clarity, and long-term maintainability.",
    },
    {
      id: "exp-2",
      company: "Field Manual Studio",
      role: "Senior Frontend Engineer",
      period: "2021 - 2023",
      summary:
        "Built design-minded product surfaces for founders and small teams, with a focus on structured content, operational dashboards, and publishing flows that supported real day-to-day use.",
    },
    {
      id: "exp-3",
      company: "Relay Workshop",
      role: "Product Builder",
      period: "2019 - 2021",
      summary:
        "Worked across design, prototyping, and frontend delivery for early-stage concepts. The role sharpened my ability to translate incomplete requirements into clean, testable product direction.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Institute for Human-Centered Systems",
      degree: "B.Tech in Computer Science with a focus on product systems and interaction design",
      period: "2015 - 2019",
    },
    {
      id: "edu-2",
      school: "Independent Practice",
      degree: "Ongoing study in interface writing, visual systems, and editorial product design",
      period: "2019 - Present",
    },
  ],
  socialLinks: [
    {
      id: "social-1",
      label: "GitHub",
      url: "https://github.com/rowanhale",
    },
    {
      id: "social-2",
      label: "LinkedIn",
      url: "https://linkedin.com/in/rowanhale",
    },
    {
      id: "social-3",
      label: "Notes",
      url: "https://example.com/notes",
    },
    {
      id: "social-4",
      label: "Are.na",
      url: "https://www.are.na/rowan-hale",
    },
  ],
  contact: {
    heading: "Open to documented product work, thoughtful systems, and teams that value clear execution.",
    email: "rowan@example.com",
    message:
      "If you need a builder who can shape the product story, structure the workflow, and ship the interface with care, send over the context. I am especially interested in products where research, systems, and writing matter as much as code.",
    ctaLabel: "Start a Conversation",
  },
  footer: {
    note: "PaperTrail is built for product-minded people who like their portfolios to feel observed, composed, and rooted in real working practice.",
    watermark: "Built with LEVEL 0",
  },
  templateLabels: {
    quickFactsLabel: "Case details",
    socialLinksLabel: "Reference links",
    aboutSkillsLabel: "Working style",
    locationLabel: "Filed from",
    availabilityLabel: "Availability",
    projectsLabel: "Selected work",
    projectsTitle: "Documented projects, shipped systems, and edited outcomes",
    skillsLabel: "Toolbox",
    experienceLabel: "Experience log",
    educationLabel: "Education",
    heroNote1: "open to\ninternships",
    heroNote2: "currently building",
  },
};
