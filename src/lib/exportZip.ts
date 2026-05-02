import JSZip from "jszip";
import type { PortfolioData } from "@/types/portfolio";

type ExportTemplateId = "simple-starter" | "dark-starter" | "profile-card" | "light-vcard" | "developer-os";

function createExportPackageJson() {
  return JSON.stringify(
    {
      name: "level-0-exported-portfolio",
      private: true,
      version: "0.1.0",
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        next: "^15.0.0",
        react: "^19.0.0",
        "react-dom": "^19.0.0",
      },
      devDependencies: {
        "@types/node": "^22.10.2",
        "@types/react": "^19.0.2",
        "@types/react-dom": "^19.0.2",
        typescript: "^5.7.2",
      },
    },
    null,
    2,
  );
}

function createReadme() {
  return `# Exported LEVEL 0 Portfolio

This project was generated from LEVEL 0.

## Run locally

\`\`\`bash
npm install
npm run dev
\`\`\`
`;
}

function createLayoutFile() {
  return `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Exported from LEVEL 0",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;
}

function createNextEnvFile() {
  return `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`;
}

function createPageFile() {
  return `import { PortfolioTemplate } from "../components/PortfolioTemplate";
import { portfolio } from "../data/portfolio";

export default function HomePage() {
  return <PortfolioTemplate data={portfolio} />;
}
`;
}

function createTsConfig() {
  return `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`;
}

function createSimpleStarterGlobalsCss() {
  return `:root {
  color-scheme: light;
  --background: #f5efe3;
  --surface: #ffffff;
  --ink: #111111;
  --muted: rgba(17, 17, 17, 0.68);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Space Grotesk", Arial, sans-serif;
  color: var(--ink);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, var(--background) 100%),
    linear-gradient(135deg, rgba(17, 17, 17, 0.03), transparent 40%);
}

a {
  color: inherit;
  text-decoration: none;
}

.portfolio-shell {
  margin: 0 auto;
  max-width: 1520px;
  padding: 32px 20px 64px;
}

.portfolio-frame {
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 24px 80px rgba(17, 17, 17, 0.08);
  overflow: hidden;
}

.portfolio-stack {
  display: grid;
  gap: 40px;
  padding: 24px;
}

.card {
  border-radius: 30px;
  background: var(--surface);
  padding: 24px;
}

.hero {
  display: grid;
  gap: 32px;
}

.hero-grid {
  display: grid;
  gap: 24px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent) 26%, white);
  background: color-mix(in srgb, var(--accent) 10%, white);
  color: var(--accent);
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.name {
  margin: 0;
  font-size: clamp(2.8rem, 6vw, 4.8rem);
  line-height: 0.98;
  letter-spacing: -0.06em;
}

.title {
  margin: 16px 0 0;
  max-width: 760px;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  line-height: 1.45;
}

.copy {
  margin: 16px 0 0;
  max-width: 760px;
  color: var(--muted);
  line-height: 1.9;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.button-primary,
.button-secondary {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 600;
}

.button-primary {
  background: var(--accent);
  color: white;
}

.button-secondary {
  border: 1px solid rgba(17, 17, 17, 0.12);
}

.image-card,
.project-image {
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 28px;
  overflow: hidden;
  background: var(--background);
}

.image-card img,
.project-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-card {
  min-height: 340px;
}

.fact-card,
.experience-card,
.education-card,
.social-card,
.project-card,
.skills-group {
  border-radius: 24px;
}

.fact-card,
.experience-card {
  background: rgba(245, 239, 227, 0.9);
  padding: 20px;
}

.project-grid,
.content-grid,
.lower-grid {
  display: grid;
  gap: 24px;
}

.section-label {
  margin: 0;
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.section-title {
  margin: 8px 0 0;
  font-size: 2rem;
  letter-spacing: -0.04em;
}

.social-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
}

.social-panel {
  background: #111111;
  color: white;
}

.social-link {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
}

.social-url {
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.8;
}

.project-card {
  display: grid;
  gap: 20px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  padding: 16px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.tag {
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent) 24%, white);
  background: color-mix(in srgb, var(--accent) 10%, white);
  color: var(--accent);
  padding: 6px 12px;
  font-size: 0.78rem;
  font-weight: 600;
}

.skills-group {
  border: 1px solid rgba(17, 17, 17, 0.08);
  padding: 16px;
}

.pill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.pill {
  border-radius: 999px;
  background: rgba(245, 239, 227, 0.92);
  padding: 6px 12px;
  font-size: 0.9rem;
}

.contact {
  color: white;
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 82%, white));
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 30px;
  background: var(--surface);
  padding: 24px;
  color: var(--muted);
}

.watermark {
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

@media (min-width: 900px) {
  .hero {
    grid-template-columns: 1.2fr 0.8fr;
  }

  .content-grid {
    grid-template-columns: 0.9fr 1.1fr;
  }

  .project-card {
    grid-template-columns: 0.45fr 0.55fr;
  }

  .lower-grid {
    grid-template-columns: 0.85fr 1.15fr;
  }

  .footer {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
`;
}

function createPortfolioDataFile(portfolio: PortfolioData) {
  return `export const portfolio = ${JSON.stringify(portfolio, null, 2)} as const;
`;
}

function createSimpleStarterPortfolioTemplateFile() {
  return `import type { CSSProperties } from "react";

type PortfolioData = typeof import("../data/portfolio").portfolio;

export function PortfolioTemplate({ data }: { data: PortfolioData }) {
  const themeStyle = { ["--accent" as string]: data.theme.accentColor } as CSSProperties;

  return (
    <main className="portfolio-shell" style={themeStyle}>
      <div className="portfolio-frame">
        <div className="portfolio-stack">
          <section className="card hero">
            <div>
              <span className="eyebrow">{data.hero.eyebrow}</span>
              <h1 className="name">{data.hero.name}</h1>
              <p className="title">{data.hero.title}</p>
              <p className="copy">{data.hero.intro}</p>
              <div className="actions">
                <a className="button-primary" href={data.hero.resumeUrl} target="_blank" rel="noreferrer">
                  {data.hero.resumeLabel}
                </a>
                <a className="button-secondary" href={data.hero.socialsUrl} target="_blank" rel="noreferrer">
                  {data.hero.socialsLabel}
                </a>
              </div>
            </div>

            <div className="hero-grid">
              <div className="image-card">
                <img src={data.hero.profileImage} alt={data.hero.name} />
              </div>
              <div className="fact-card">
                <p className="section-label">Quick facts</p>
                <p className="copy">{data.about.location}</p>
                <p className="copy">{data.about.availability}</p>
              </div>
            </div>
          </section>

          <section className="content-grid">
            <div className="card">
              <p className="section-label">{data.about.heading}</p>
              <p className="copy">{data.about.body}</p>
            </div>

            <div className="card social-panel">
              <p className="section-label" style={{ color: "rgba(255,255,255,0.45)" }}>
                Social links
              </p>
              <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                {data.socialLinks.map((link) => (
                  <div key={link.id} className="social-card">
                    <p className="social-link">{link.label}</p>
                    <p className="social-url">{link.url}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="card">
            <p className="section-label">Projects</p>
            <h2 className="section-title">Selected work</h2>
            <div className="project-grid" style={{ marginTop: 24 }}>
              {data.projects.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.name} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.6rem", letterSpacing: "-0.04em" }}>{project.name}</h3>
                    <p className="copy">{project.summary}</p>
                    <div className="tag-list">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p style={{ margin: "16px 0 0", color: "var(--accent)", fontWeight: 600 }}>{project.linkLabel}</p>
                    <p style={{ margin: "4px 0 0", color: "rgba(17, 17, 17, 0.45)", fontSize: "0.8rem" }}>{project.url}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="lower-grid">
            <div className="card">
              <p className="section-label">Skills</p>
              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                {data.skills.map((group) => (
                  <div key={group.id} className="skills-group">
                    <h3 style={{ margin: 0 }}>{group.title}</h3>
                    <div className="pill-list">
                      {group.items.map((item) => (
                        <span key={item} className="pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: 24 }}>
              <div className="card">
                <p className="section-label">Experience</p>
                <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                  {data.experience.map((item) => (
                    <div key={item.id} className="experience-card">
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                        <div>
                          <h3 style={{ margin: 0 }}>{item.company}</h3>
                          <p style={{ margin: "4px 0 0", color: "rgba(17,17,17,0.65)" }}>{item.role}</p>
                        </div>
                        <p style={{ margin: 0, fontSize: "0.78rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(17,17,17,0.45)" }}>
                          {item.period}
                        </p>
                      </div>
                      <p className="copy">{item.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <p className="section-label">Education</p>
                <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                  {data.education.map((item) => (
                    <div key={item.id} className="education-card" style={{ border: "1px solid rgba(17,17,17,0.08)", padding: 16 }}>
                      <h3 style={{ margin: 0 }}>{item.school}</h3>
                      <p style={{ margin: "4px 0 0", color: "rgba(17,17,17,0.65)" }}>{item.degree}</p>
                      <p style={{ margin: "10px 0 0", fontSize: "0.78rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(17,17,17,0.45)" }}>
                        {item.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="card contact">
            <h2 className="section-title" style={{ marginTop: 0, color: "white" }}>
              {data.contact.heading}
            </h2>
            <p className="copy" style={{ color: "rgba(255,255,255,0.88)" }}>
              {data.contact.message}
            </p>
            <div className="actions">
              <span className="button-secondary" style={{ background: "white", color: "#111111", borderColor: "white" }}>
                {data.contact.ctaLabel}
              </span>
              <span style={{ fontWeight: 600 }}>{data.contact.email}</span>
            </div>
          </section>

          <footer className="footer">
            <p className="copy" style={{ margin: 0 }}>
              {data.footer.note}
            </p>
            <p className="watermark">{data.footer.watermark}</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
`;
}

function createDarkStarterGlobalsCss() {
  return `:root {
  color-scheme: dark;
  --background: #090a12;
  --surface: #0f111b;
  --surface-alt: #111423;
  --ink: #ffffff;
  --muted: rgba(255, 255, 255, 0.64);
  --muted-strong: rgba(255, 255, 255, 0.72);
  --line: rgba(255, 255, 255, 0.1);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Space Grotesk", Arial, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.06), transparent 28%),
    radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.04), transparent 32%),
    var(--background);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio-shell {
  margin: 0 auto;
  max-width: 1520px;
  padding: 24px 16px 64px;
}

.portfolio-frame {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 34px;
  background: var(--background);
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.38);
}

.portfolio-stack {
  display: grid;
  gap: 24px;
  padding: 20px;
}

.panel {
  border: 1px solid var(--line);
  border-radius: 30px;
  background: var(--surface);
  padding: 24px;
}

.hero-panel {
  display: grid;
  gap: 32px;
}

.hero-content,
.hero-side,
.about-grid,
.skills-grid,
.footer {
  display: grid;
  gap: 16px;
}

.hero-side {
  gap: 16px;
}

.eyebrow,
.section-label {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.eyebrow {
  border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  color: var(--accent);
  padding: 6px 12px;
}

.section-label {
  color: var(--accent);
}

.name {
  margin: 0;
  font-size: clamp(2.9rem, 6vw, 5rem);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.title {
  margin: 16px 0 0;
  max-width: 760px;
  font-size: clamp(1.15rem, 3vw, 1.8rem);
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.9);
}

.copy {
  margin: 16px 0 0;
  color: var(--muted);
  line-height: 1.9;
}

.actions,
.pill-list,
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.actions {
  margin-top: 24px;
}

.button-primary,
.button-secondary,
.button-static {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 600;
}

.button-primary {
  background: var(--accent);
  color: var(--accent-text);
}

.button-secondary {
  border: 1px solid var(--line);
  background: white;
  color: #111111;
}

.button-static {
  background: var(--accent);
  color: var(--accent-text);
}

.image-card,
.project-image {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: #12131f;
}

.image-card {
  min-height: 340px;
}

.social-card,
.location-card,
.availability-card,
.project-card,
.skills-card,
.experience-card,
.education-card {
  border: 1px solid var(--line);
  border-radius: 24px;
}

.social-card,
.location-card,
.availability-card,
.project-card,
.skills-card,
.experience-card,
.education-card {
  background: rgba(255, 255, 255, 0.02);
  padding: 16px;
}

.social-card p,
.location-card p,
.availability-card p,
.project-card p,
.skills-card p,
.experience-card p,
.education-card p {
  margin: 0;
}

.social-title,
.location-value {
  font-size: 1rem;
  font-weight: 600;
}

.social-url,
.meta-copy,
.project-url,
.period {
  margin-top: 8px;
  color: var(--muted);
}

.project-grid,
.experience-grid,
.education-grid {
  display: grid;
  gap: 20px;
}

.project-card {
  display: grid;
  gap: 20px;
}

.section-title {
  margin: 8px 0 0;
  font-size: 2rem;
  letter-spacing: -0.04em;
}

.project-name {
  margin: 0;
  font-size: 1.6rem;
  letter-spacing: -0.04em;
}

.tag,
.pill {
  border-radius: 999px;
  padding: 6px 12px;
}

.tag {
  border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 600;
}

.pill {
  border: 1px solid color-mix(in srgb, var(--accent) 26%, transparent);
  color: var(--accent);
  font-size: 0.9rem;
}

.info-grid {
  display: grid;
  gap: 24px;
}

.row-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.contact-card {
  border-radius: 30px;
  border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, transparent), rgba(15, 17, 27, 0.95));
  padding: 24px;
}

.contact-card .copy {
  color: var(--muted-strong);
}

.footer {
  border: 1px solid var(--line);
  border-radius: 30px;
  background: var(--surface);
  padding: 24px;
  color: rgba(255, 255, 255, 0.6);
}

.footer-copy {
  margin: 0;
  line-height: 1.9;
}

.watermark {
  margin: 0;
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

@media (min-width: 900px) {
  .hero-panel {
    grid-template-columns: 1.15fr 0.85fr;
  }

  .about-grid {
    grid-template-columns: 0.85fr 1.15fr;
  }

  .project-card {
    grid-template-columns: 0.42fr 0.58fr;
  }

  .skills-grid {
    grid-template-columns: 0.72fr 1.28fr;
  }

  .footer {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}
`;
}

function createDarkStarterPortfolioTemplateFile() {
  return `import type { CSSProperties } from "react";

type PortfolioData = typeof import("../data/portfolio").portfolio;

function withAlpha(color: string, alpha: string) {
  return color.startsWith("#") && color.length === 7 ? \`\${color}\${alpha}\` : color;
}

function isLightColor(color: string) {
  if (!(color.startsWith("#") && color.length === 7)) {
    return false;
  }

  const red = Number.parseInt(color.slice(1, 3), 16);
  const green = Number.parseInt(color.slice(3, 5), 16);
  const blue = Number.parseInt(color.slice(5, 7), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.72;
}

export function PortfolioTemplate({ data }: { data: PortfolioData }) {
  const accent = data.theme.accentName === "monochrome" ? "#f3f4f6" : data.theme.accentColor;
  const themeStyle = {
    ["--accent" as string]: accent,
    ["--accent-text" as string]: isLightColor(accent) ? "#111111" : "#ffffff",
  } as CSSProperties;

  return (
    <main className="portfolio-shell" style={themeStyle}>
      <div className="portfolio-frame">
        <div className="portfolio-stack">
          <section className="panel hero-panel">
            <div className="hero-content">
              <span className="eyebrow">{data.hero.eyebrow}</span>
              <div>
                <h1 className="name">{data.hero.name}</h1>
                <p className="title">{data.hero.title}</p>
                <p className="copy">{data.hero.intro}</p>
              </div>
              <div className="actions">
                <a className="button-primary" href={data.hero.resumeUrl} target="_blank" rel="noreferrer">
                  {data.hero.resumeLabel}
                </a>
                <a className="button-secondary" href={data.hero.socialsUrl} target="_blank" rel="noreferrer">
                  {data.hero.socialsLabel}
                </a>
              </div>
            </div>

            <div className="hero-side">
              <div className="image-card">
                <img src={data.hero.profileImage} alt={data.hero.name} />
              </div>
              <div className="panel" style={{ background: "#111423" }}>
                <p className="section-label">Social links</p>
                <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
                  {data.socialLinks.map((link) => (
                    <div key={link.id} className="social-card">
                      <p className="social-title">{link.label}</p>
                      <p className="social-url">{link.url}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="about-grid">
            <div className="panel">
              <h2 className="section-title" style={{ marginTop: 0 }}>{data.about.heading}</h2>
              <p className="copy">{data.about.body}</p>
            </div>

            <div className="info-grid">
              <div className="location-card">
                <p className="section-label">Location</p>
                <p className="location-value" style={{ marginTop: 12 }}>{data.about.location}</p>
              </div>
              <div className="availability-card">
                <p className="section-label">Availability</p>
                <p className="meta-copy" style={{ marginTop: 12 }}>{data.about.availability}</p>
              </div>
            </div>
          </section>

          <section className="panel">
            <p className="section-label">Projects</p>
            <h2 className="section-title">Featured work</h2>
            <div className="project-grid" style={{ marginTop: 24 }}>
              {data.projects.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.name} />
                  </div>
                  <div>
                    <h3 className="project-name">{project.name}</h3>
                    <p className="copy">{project.summary}</p>
                    <div className="tag-list" style={{ marginTop: 16 }}>
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p style={{ margin: "16px 0 0", color: "var(--accent)", fontWeight: 600 }}>{project.linkLabel}</p>
                    <p className="project-url">{project.url}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="skills-grid">
            <div className="panel">
              <p className="section-label">Skills</p>
              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                {data.skills.map((group) => (
                  <div key={group.id} className="skills-card">
                    <h3 style={{ margin: 0 }}>{group.title}</h3>
                    <div className="pill-list" style={{ marginTop: 12 }}>
                      {group.items.map((item) => (
                        <span key={item} className="pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: 24 }}>
              <div className="panel">
                <p className="section-label">Experience</p>
                <div className="experience-grid" style={{ marginTop: 20 }}>
                  {data.experience.map((item) => (
                    <div key={item.id} className="experience-card">
                      <div className="row-head">
                        <div>
                          <h3 style={{ margin: 0 }}>{item.company}</h3>
                          <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.62)" }}>{item.role}</p>
                        </div>
                        <p className="period">{item.period}</p>
                      </div>
                      <p className="copy">{item.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel">
                <p className="section-label">Education</p>
                <div className="education-grid" style={{ marginTop: 20 }}>
                  {data.education.map((item) => (
                    <div key={item.id} className="education-card">
                      <h3 style={{ margin: 0 }}>{item.school}</h3>
                      <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.62)" }}>{item.degree}</p>
                      <p className="period" style={{ marginTop: 10 }}>{item.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className="contact-card"
            style={{
              borderColor: withAlpha(accent, "55"),
              background: \`linear-gradient(135deg, \${withAlpha(accent, "2a")}, rgba(15, 17, 27, 0.95))\`,
            }}
          >
            <h2 className="section-title" style={{ marginTop: 0 }}>{data.contact.heading}</h2>
            <p className="copy">{data.contact.message}</p>
            <div className="actions">
              <span className="button-static">{data.contact.ctaLabel}</span>
              <span style={{ fontWeight: 600 }}>{data.contact.email}</span>
            </div>
          </section>

          <footer className="footer">
            <p className="footer-copy">{data.footer.note}</p>
            <p className="watermark">{data.footer.watermark}</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
`;
}

function createProfileCardGlobalsCss() {
  return `:root {
  color-scheme: dark;
  --background: #07090f;
  --surface: #0b0d14;
  --surface-strong: #0f111b;
  --surface-alt: #111423;
  --ink: #ffffff;
  --muted: rgba(255, 255, 255, 0.64);
  --line: rgba(255, 255, 255, 0.1);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Space Grotesk", Arial, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.05), transparent 28%),
    radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.04), transparent 30%),
    var(--background);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

button {
  font: inherit;
}

.portfolio-shell {
  margin: 0 auto;
  max-width: 1600px;
  padding: 24px 16px 64px;
}

.portfolio-layout {
  display: grid;
  gap: 24px;
}

.sidebar {
  align-self: start;
}

.sidebar-card,
.main-card,
.content-card,
.footer-card {
  border: 1px solid var(--line);
  border-radius: 32px;
  background: var(--surface);
}

.sidebar-card {
  padding: 20px;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35);
}

.main-card {
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35);
}

.sidebar-stack,
.content-stack {
  display: grid;
  gap: 20px;
}

.photo-wrap {
  border: 1px solid var(--line);
  border-radius: 28px;
  background: var(--surface-alt);
  padding: 12px;
}

.photo-card {
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid var(--line);
  min-height: 260px;
  background: #12131f;
}

.eyebrow,
.section-label {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.eyebrow {
  border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  color: var(--accent);
  padding: 6px 12px;
}

.identity h1 {
  margin: 0;
  font-size: clamp(2.2rem, 4vw, 3rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
}

.identity p {
  margin: 12px 0 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.8;
}

.mini-card,
.social-card,
.skills-card,
.resume-card,
.education-card,
.project-card,
.contact-card {
  border: 1px solid var(--line);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.03);
  padding: 16px;
}

.mini-card p,
.social-card p,
.skills-card p,
.resume-card p,
.education-card p,
.project-card p,
.contact-card p {
  margin: 0;
}

.section-label {
  color: var(--accent);
}

.value {
  margin-top: 12px;
  font-size: 0.95rem;
  font-weight: 600;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button-primary,
.button-secondary,
.button-static {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 600;
}

.button-primary,
.button-static {
  background: var(--accent);
  color: var(--accent-text);
}

.button-secondary {
  border: 1px solid var(--line);
  background: white;
  color: #111111;
}

.social-grid,
.skills-grid,
.project-grid,
.contact-grid {
  display: grid;
  gap: 16px;
}

.social-label {
  font-size: 0.95rem;
  font-weight: 600;
}

.social-url,
.body-copy,
.meta-copy,
.project-url,
.period {
  margin-top: 8px;
  color: var(--muted);
  line-height: 1.8;
}

.tab-bar {
  border-bottom: 1px solid var(--line);
  padding: 20px;
}

.tab-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tab {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.72);
  padding: 10px 16px;
  cursor: pointer;
}

.tab-active {
  border-color: color-mix(in srgb, var(--accent) 34%, transparent);
  background: var(--accent);
  color: var(--accent-text);
}

.content-stack {
  padding: 20px;
}

.content-card {
  padding: 20px;
  background: var(--surface-strong);
}

.content-card h2,
.content-card h3,
.project-card h3 {
  margin: 0;
  letter-spacing: -0.04em;
}

.content-card h2 {
  font-size: 2rem;
}

.body-copy {
  margin-top: 16px;
}

.availability-card {
  margin-top: 20px;
}

.pill-list,
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.pill,
.tag {
  border-radius: 999px;
  padding: 6px 12px;
}

.pill {
  border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
  color: var(--accent);
}

.project-card {
  display: grid;
  gap: 20px;
}

.project-image {
  overflow: hidden;
  min-height: 220px;
  border-radius: 22px;
  border: 1px solid var(--line);
  background: #12131f;
}

.tag {
  border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 600;
}

.row-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-card {
  padding: 20px;
  color: rgba(255, 255, 255, 0.6);
}

.footer-copy {
  margin: 0;
  line-height: 1.9;
}

.watermark {
  margin: 16px 0 0;
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

@media (min-width: 900px) {
  .portfolio-layout {
    grid-template-columns: 320px 1fr;
  }

  .project-card {
    grid-template-columns: 0.38fr 0.62fr;
  }

  .contact-grid,
  .social-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .sidebar {
    position: sticky;
    top: 24px;
  }
}
`;
}

function createProfileCardPortfolioTemplateFile() {
  return `"use client";

import { useState, type CSSProperties } from "react";

type PortfolioData = typeof import("../data/portfolio").portfolio;
type ProfileCardTab = "about" | "resume" | "projects" | "contact";

const tabOptions: Array<{ id: ProfileCardTab; label: string }> = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function withAlpha(color: string, alpha: string) {
  return color.startsWith("#") && color.length === 7 ? \`\${color}\${alpha}\` : color;
}

function isLightColor(color: string) {
  if (!(color.startsWith("#") && color.length === 7)) {
    return false;
  }

  const red = Number.parseInt(color.slice(1, 3), 16);
  const green = Number.parseInt(color.slice(3, 5), 16);
  const blue = Number.parseInt(color.slice(5, 7), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.72;
}

export function PortfolioTemplate({ data }: { data: PortfolioData }) {
  const [activeTab, setActiveTab] = useState<ProfileCardTab>("about");
  const accent = data.theme.accentName === "monochrome" ? "#f3f4f6" : data.theme.accentColor;
  const themeStyle = {
    ["--accent" as string]: accent,
    ["--accent-text" as string]: isLightColor(accent) ? "#111111" : "#ffffff",
  } as CSSProperties;

  return (
    <main className="portfolio-shell" style={themeStyle}>
      <div className="portfolio-layout">
        <aside className="sidebar">
          <div className="sidebar-card">
            <div className="sidebar-stack">
              <div className="photo-wrap">
                <div className="photo-card">
                  <img src={data.hero.profileImage} alt={data.hero.name} />
                </div>
              </div>

              <div>
                <span className="eyebrow">{data.hero.eyebrow}</span>
                <div className="identity" style={{ marginTop: 16 }}>
                  <h1>{data.hero.name}</h1>
                  <p>{data.hero.title}</p>
                </div>
              </div>

              <div className="mini-card">
                <p className="section-label">Location</p>
                <p className="value">{data.about.location}</p>
              </div>

              <div className="mini-card">
                <p className="section-label">Email</p>
                <p className="value">{data.contact.email}</p>
              </div>

              <div className="button-row">
                <a className="button-primary" href={data.hero.resumeUrl} target="_blank" rel="noreferrer">
                  {data.hero.resumeLabel}
                </a>
                <a className="button-secondary" href={data.hero.socialsUrl} target="_blank" rel="noreferrer">
                  {data.hero.socialsLabel}
                </a>
              </div>

              <div className="content-card" style={{ background: "#111423" }}>
                <p className="section-label">Social Links</p>
                <div className="social-grid" style={{ marginTop: 16 }}>
                  {data.socialLinks.map((link) => (
                    <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="social-card">
                      <p className="social-label">{link.label}</p>
                      <p className="social-url">{link.url}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="main-card">
          <div className="tab-bar">
            <div className="tab-list">
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={\`tab \${tab.id === activeTab ? "tab-active" : ""}\`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="content-stack">
            {activeTab === "about" ? (
              <>
                <section className="content-card">
                  <h2>{data.about.heading}</h2>
                  <p className="body-copy">{data.about.body}</p>
                  <p className="body-copy" style={{ color: "rgba(255,255,255,0.56)" }}>{data.hero.intro}</p>
                  <div className="mini-card availability-card">
                    <p className="section-label">Availability</p>
                    <p className="meta-copy">{data.about.availability}</p>
                  </div>
                </section>

                <section className="content-card">
                  <p className="section-label">Skills</p>
                  <div className="skills-grid" style={{ marginTop: 20 }}>
                    {data.skills.map((group) => (
                      <div key={group.id} className="skills-card">
                        <h3>{group.title}</h3>
                        <div className="pill-list">
                          {group.items.map((item) => (
                            <span key={item} className="pill">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : null}

            {activeTab === "resume" ? (
              <>
                <section className="content-card">
                  <p className="section-label">Experience</p>
                  <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                    {data.experience.map((item) => (
                      <div key={item.id} className="resume-card">
                        <div className="row-head">
                          <div>
                            <h3>{item.company}</h3>
                            <p className="meta-copy" style={{ marginTop: 4 }}>{item.role}</p>
                          </div>
                          <p className="period">{item.period}</p>
                        </div>
                        <p className="body-copy">{item.summary}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="content-card">
                  <p className="section-label">Education</p>
                  <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                    {data.education.map((item) => (
                      <div key={item.id} className="education-card">
                        <h3>{item.school}</h3>
                        <p className="meta-copy" style={{ marginTop: 4 }}>{item.degree}</p>
                        <p className="period" style={{ marginTop: 10 }}>{item.period}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : null}

            {activeTab === "projects" ? (
              <section className="content-card">
                <p className="section-label">Projects</p>
                <div className="project-grid" style={{ marginTop: 20 }}>
                  {data.projects.map((project) => (
                    <article key={project.id} className="project-card">
                      <div className="project-image">
                        <img src={project.image} alt={project.name} />
                      </div>
                      <div>
                        <h3>{project.name}</h3>
                        <p className="body-copy">{project.summary}</p>
                        <div className="tag-list">
                          {project.tags.map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p style={{ margin: "16px 0 0", color: "var(--accent)", fontWeight: 600 }}>{project.linkLabel}</p>
                        <p className="project-url">{project.url}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {activeTab === "contact" ? (
              <>
                <section className="content-card">
                  <h2>{data.contact.heading}</h2>
                  <p className="body-copy">{data.contact.message}</p>
                  <div className="button-row" style={{ marginTop: 20 }}>
                    <span className="button-static">{data.contact.ctaLabel}</span>
                    <span style={{ alignSelf: "center", fontWeight: 600 }}>{data.contact.email}</span>
                  </div>
                </section>

                <section className="content-card">
                  <p className="section-label">Social Links</p>
                  <div className="contact-grid" style={{ marginTop: 20 }}>
                    {data.socialLinks.map((link) => (
                      <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="contact-card">
                        <h3>{link.label}</h3>
                        <p className="social-url">{link.url}</p>
                      </a>
                    ))}
                  </div>
                </section>
              </>
            ) : null}

            <footer className="footer-card">
              <p className="footer-copy">{data.footer.note}</p>
              <p className="watermark">{data.footer.watermark}</p>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
`;
}

function createLightVCardGlobalsCss() {
  return `:root {
  color-scheme: light;
  --page: #f4efe7;
  --surface: #fffdf9;
  --surface-alt: #fbf8f3;
  --line: #e3ddd4;
  --ink: #1f1d1a;
  --muted: #59544d;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Space Grotesk", Arial, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.55), transparent 28%),
    radial-gradient(circle at bottom right, rgba(37, 99, 235, 0.06), transparent 26%),
    var(--page);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

button {
  font: inherit;
}

.portfolio-shell {
  margin: 0 auto;
  max-width: 1600px;
  padding: 24px 16px 64px;
}

.portfolio-layout {
  display: grid;
  gap: 24px;
}

.sidebar {
  align-self: start;
}

.sidebar-card,
.main-card,
.content-card,
.footer-card {
  border: 1px solid var(--line);
  border-radius: 32px;
  background: var(--surface);
  box-shadow: 0 20px 60px rgba(79, 67, 45, 0.08);
}

.sidebar-card {
  padding: 20px;
}

.main-card {
  overflow: hidden;
}

.sidebar-stack,
.content-stack {
  display: grid;
  gap: 20px;
}

.photo-wrap {
  border: 1px solid var(--line);
  border-radius: 28px;
  background: var(--page);
  padding: 12px;
}

.photo-card,
.project-image {
  overflow: hidden;
  border: 1px solid #d9d4cb;
  border-radius: 24px;
  background: #efebe4;
}

.photo-card {
  min-height: 260px;
}

.eyebrow,
.section-label {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.eyebrow {
  border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, white);
  color: var(--accent);
  padding: 6px 12px;
}

.identity h1 {
  margin: 0;
  font-size: clamp(2.2rem, 4vw, 3rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
}

.identity p,
.body-copy,
.meta-copy,
.project-url,
.social-url,
.footer-copy {
  color: var(--muted);
  line-height: 1.8;
}

.identity p {
  margin: 12px 0 0;
}

.mini-card,
.social-card,
.skills-card,
.resume-card,
.education-card,
.project-card,
.contact-card {
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--surface-alt);
  padding: 16px;
}

.section-label {
  color: var(--accent);
}

.value {
  margin: 12px 0 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button-primary,
.button-secondary,
.button-static {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 600;
}

.button-primary,
.button-static {
  background: var(--accent);
  color: white;
}

.button-secondary {
  border: 1px solid var(--line);
  background: white;
  color: var(--ink);
}

.social-grid,
.skills-grid,
.project-grid,
.contact-grid {
  display: grid;
  gap: 16px;
}

.social-label {
  font-size: 0.95rem;
  font-weight: 600;
}

.tab-bar {
  border-bottom: 1px solid var(--line);
  padding: 20px;
}

.tab-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tab {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: white;
  color: #504c45;
  padding: 10px 16px;
  cursor: pointer;
}

.tab-active {
  border-color: color-mix(in srgb, var(--accent) 28%, transparent);
  background: var(--accent);
  color: white;
}

.content-stack {
  gap: 24px;
  padding: 20px;
  background: #faf6f0;
}

.content-card {
  padding: 20px;
}

.content-card h2,
.content-card h3,
.project-card h3 {
  margin: 0;
  letter-spacing: -0.04em;
  color: var(--ink);
}

.content-card h2 {
  font-size: 2rem;
}

.body-copy {
  margin: 16px 0 0;
}

.availability-card {
  margin-top: 20px;
}

.pill-list,
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.pill,
.tag {
  border-radius: 999px;
  padding: 6px 12px;
}

.pill {
  border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent);
  background: color-mix(in srgb, var(--accent) 8%, white);
  color: var(--accent);
}

.project-card {
  display: grid;
  gap: 20px;
}

.project-image {
  min-height: 220px;
}

.tag {
  border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, white);
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 600;
}

.row-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-copy {
  margin: 0;
}

.watermark {
  margin: 16px 0 0;
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

@media (min-width: 900px) {
  .portfolio-layout {
    grid-template-columns: 320px 1fr;
  }

  .project-card {
    grid-template-columns: 0.38fr 0.62fr;
  }

  .contact-grid,
  .social-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .sidebar {
    position: sticky;
    top: 24px;
  }
}
`;
}

function createLightVCardPortfolioTemplateFile() {
  return `"use client";

import { useState, type CSSProperties } from "react";

type PortfolioData = typeof import("../data/portfolio").portfolio;
type LightVCardTab = "about" | "resume" | "projects" | "contact";

const tabOptions: Array<{ id: LightVCardTab; label: string }> = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function PortfolioTemplate({ data }: { data: PortfolioData }) {
  const [activeTab, setActiveTab] = useState<LightVCardTab>("about");
  const accent = data.theme.accentColor;
  const themeStyle = { ["--accent" as string]: accent } as CSSProperties;

  return (
    <main className="portfolio-shell" style={themeStyle}>
      <div className="portfolio-layout">
        <aside className="sidebar">
          <div className="sidebar-card">
            <div className="sidebar-stack">
              <div className="photo-wrap">
                <div className="photo-card">
                  <img src={data.hero.profileImage} alt={data.hero.name} />
                </div>
              </div>

              <div>
                <span className="eyebrow">{data.hero.eyebrow}</span>
                <div className="identity" style={{ marginTop: 16 }}>
                  <h1>{data.hero.name}</h1>
                  <p>{data.hero.title}</p>
                </div>
              </div>

              <div className="mini-card">
                <p className="section-label">Location</p>
                <p className="value">{data.about.location}</p>
              </div>

              <div className="mini-card">
                <p className="section-label">Email</p>
                <p className="value">{data.contact.email}</p>
              </div>

              <div className="button-row">
                <a className="button-primary" href={data.hero.resumeUrl} target="_blank" rel="noreferrer">
                  {data.hero.resumeLabel}
                </a>
                <a className="button-secondary" href={data.hero.socialsUrl} target="_blank" rel="noreferrer">
                  {data.hero.socialsLabel}
                </a>
              </div>

              <div className="mini-card">
                <p className="section-label">Social Links</p>
                <div className="social-grid" style={{ marginTop: 16 }}>
                  {data.socialLinks.map((link) => (
                    <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="social-card">
                      <p className="social-label">{link.label}</p>
                      <p className="social-url">{link.url}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="main-card">
          <div className="tab-bar">
            <div className="tab-list">
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={tab.id === activeTab ? "tab tab-active" : "tab"}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="content-stack">
            {activeTab === "about" ? (
              <>
                <section className="content-card">
                  <h2>{data.about.heading}</h2>
                  <p className="body-copy">{data.about.body}</p>
                  <p className="body-copy" style={{ color: "#6a655d" }}>{data.hero.intro}</p>
                  <div className="mini-card availability-card">
                    <p className="section-label">Availability</p>
                    <p className="meta-copy">{data.about.availability}</p>
                  </div>
                </section>

                <section className="content-card">
                  <p className="section-label">Skills</p>
                  <div className="skills-grid" style={{ marginTop: 20 }}>
                    {data.skills.map((group) => (
                      <div key={group.id} className="skills-card">
                        <h3>{group.title}</h3>
                        <div className="pill-list">
                          {group.items.map((item) => (
                            <span key={item} className="pill">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : null}

            {activeTab === "resume" ? (
              <>
                <section className="content-card">
                  <p className="section-label">Experience</p>
                  <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                    {data.experience.map((item) => (
                      <div key={item.id} className="resume-card">
                        <div className="row-head">
                          <div>
                            <h3>{item.company}</h3>
                            <p className="meta-copy" style={{ marginTop: 4 }}>{item.role}</p>
                          </div>
                          <p className="meta-copy">{item.period}</p>
                        </div>
                        <p className="body-copy">{item.summary}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="content-card">
                  <p className="section-label">Education</p>
                  <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                    {data.education.map((item) => (
                      <div key={item.id} className="education-card">
                        <h3>{item.school}</h3>
                        <p className="meta-copy" style={{ marginTop: 4 }}>{item.degree}</p>
                        <p className="meta-copy" style={{ marginTop: 10 }}>{item.period}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : null}

            {activeTab === "projects" ? (
              <section className="content-card">
                <p className="section-label">Projects</p>
                <div className="project-grid" style={{ marginTop: 20 }}>
                  {data.projects.map((project) => (
                    <article key={project.id} className="project-card">
                      <div className="project-image">
                        <img src={project.image} alt={project.name} />
                      </div>
                      <div>
                        <h3>{project.name}</h3>
                        <p className="body-copy">{project.summary}</p>
                        <div className="tag-list">
                          {project.tags.map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p style={{ margin: "16px 0 0", color: "var(--accent)", fontWeight: 600 }}>{project.linkLabel}</p>
                        <p className="project-url">{project.url}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {activeTab === "contact" ? (
              <>
                <section className="content-card">
                  <h2>{data.contact.heading}</h2>
                  <p className="body-copy">{data.contact.message}</p>
                  <div className="button-row" style={{ marginTop: 20 }}>
                    <span className="button-static">{data.contact.ctaLabel}</span>
                    <span style={{ alignSelf: "center", fontWeight: 600 }}>{data.contact.email}</span>
                  </div>
                </section>

                <section className="content-card">
                  <p className="section-label">Social Links</p>
                  <div className="contact-grid" style={{ marginTop: 20 }}>
                    {data.socialLinks.map((link) => (
                      <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="contact-card">
                        <h3>{link.label}</h3>
                        <p className="social-url">{link.url}</p>
                      </a>
                    ))}
                  </div>
                </section>
              </>
            ) : null}

            <footer className="footer-card">
              <p className="footer-copy">{data.footer.note}</p>
              <p className="watermark">{data.footer.watermark}</p>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
`;
}

function createDeveloperOSGlobalsCss() {
  return `:root {
  color-scheme: dark;
  --page: #05080e;
  --surface: #0a0f17;
  --surface-alt: #0d131c;
  --panel: rgba(255, 255, 255, 0.02);
  --line: rgba(255, 255, 255, 0.1);
  --ink: #ffffff;
  --muted: rgba(255, 255, 255, 0.64);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Space Grotesk", Arial, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.05), transparent 26%),
    radial-gradient(circle at bottom right, rgba(34, 197, 94, 0.06), transparent 24%),
    var(--page);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio-shell {
  margin: 0 auto;
  max-width: 1600px;
  padding: 24px 16px 64px;
}

.shell-card,
.hero-card,
.status-card,
.section-card,
.terminal-card,
.project-card,
.contact-card,
.social-card,
.footer-card {
  border: 1px solid var(--line);
  border-radius: 28px;
  background: var(--surface);
}

.shell-card {
  padding: 20px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
}

.hero-card,
.status-card,
.section-card,
.terminal-card,
.footer-card {
  padding: 20px;
}

.hero-grid,
.about-grid,
.timeline-grid,
.contact-grid {
  display: grid;
  gap: 24px;
}

.window-dots {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
}

.command,
.meta-label {
  font-family: "IBM Plex Mono", "Courier New", monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.command {
  color: var(--accent);
}

.meta-label {
  color: rgba(255, 255, 255, 0.38);
}

.hero-title {
  margin: 0;
  font-size: clamp(2.8rem, 6vw, 5rem);
  line-height: 0.96;
  letter-spacing: -0.05em;
}

.hero-copy,
.body-copy,
.meta-copy,
.footer-copy,
.project-url {
  color: var(--muted);
  line-height: 1.8;
}

.hero-copy {
  margin-top: 16px;
}

.action-row,
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button-primary,
.button-secondary,
.button-static {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 600;
}

.button-primary,
.button-static {
  background: var(--accent);
  color: var(--accent-text);
}

.button-secondary {
  border: 1px solid var(--line);
  background: white;
  color: #111111;
}

.image-card {
  overflow: hidden;
  min-height: 320px;
  border-radius: 26px;
  border: 1px solid var(--line);
  background: #0a1118;
}

.terminal-card {
  background: var(--surface-alt);
}

.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent);
}

.status-value,
.contact-email {
  color: var(--ink);
  font-weight: 500;
}

.skills-grid,
.project-grid,
.social-grid {
  display: grid;
  gap: 16px;
}

.skill-card,
.timeline-item {
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--panel);
  padding: 16px;
}

.pill,
.tag,
.status-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
}

.pill,
.tag {
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  color: var(--accent);
  padding: 6px 12px;
  font-family: "IBM Plex Mono", "Courier New", monospace;
  font-size: 12px;
}

.status-badge {
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  color: var(--accent);
  padding: 6px 12px;
  font-family: "IBM Plex Mono", "Courier New", monospace;
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.project-card {
  display: grid;
  gap: 20px;
  padding: 16px;
  background: var(--panel);
}

.project-image {
  overflow: hidden;
  min-height: 220px;
  border-radius: 24px;
  border: 1px solid var(--line);
  background: #0a1118;
}

.project-shell {
  border: 1px solid var(--line);
  border-radius: 18px;
  background: #070b12;
  padding: 12px 16px;
}

.row-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-copy {
  margin: 0;
}

.watermark {
  margin: 16px 0 0;
  color: var(--accent);
  font-family: "IBM Plex Mono", "Courier New", monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

@media (min-width: 900px) {
  .hero-grid {
    grid-template-columns: 1.2fr 0.8fr;
  }

  .about-grid,
  .timeline-grid {
    grid-template-columns: 1fr 1fr;
  }

  .contact-grid {
    grid-template-columns: 0.9fr 1.1fr;
  }

  .social-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .project-card {
    grid-template-columns: 0.34fr 0.66fr;
  }
}
`;
}

function createDeveloperOSPortfolioTemplateFile() {
  return `import type { CSSProperties } from "react";

type PortfolioData = typeof import("../data/portfolio").portfolio;

function withAlpha(color: string, alpha: string) {
  return color.startsWith("#") && color.length === 7 ? \`\${color}\${alpha}\` : color;
}

function isLightColor(color: string) {
  if (!(color.startsWith("#") && color.length === 7)) {
    return false;
  }

  const red = Number.parseInt(color.slice(1, 3), 16);
  const green = Number.parseInt(color.slice(3, 5), 16);
  const blue = Number.parseInt(color.slice(5, 7), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.72;
}

export function PortfolioTemplate({ data }: { data: PortfolioData }) {
  const accent = data.theme.accentName === "monochrome" ? "#d1d5db" : data.theme.accentColor;
  const themeStyle = {
    ["--accent" as string]: accent,
    ["--accent-text" as string]: isLightColor(accent) ? "#111111" : "#ffffff",
  } as CSSProperties;

  const statusCards = [
    { label: "current_focus", value: data.about.heading },
    { label: "stack", value: data.skills[0]?.items.slice(0, 3).join(" / ") ?? "" },
    { label: "open_to_work", value: data.about.availability },
    { label: "projects_loaded", value: \`\${data.projects.length} active modules\` },
  ];

  return (
    <main className="portfolio-shell" style={themeStyle}>
      <div className="shell-card">
        <div style={{ display: "grid", gap: 24 }}>
          <section className="hero-card">
            <div className="window-dots">
              <span className="dot" style={{ background: "#ff5f56" }} />
              <span className="dot" style={{ background: "#ffbd2e" }} />
              <span className="dot" style={{ background: "#27c93f" }} />
              <span className="meta-label" style={{ marginLeft: 12 }}>session / developer-os</span>
            </div>

            <div className="hero-grid" style={{ marginTop: 24 }}>
              <div>
                <p className="command">whoami</p>
                <h1 className="hero-title">{data.hero.name}</h1>
                <p className="hero-copy" style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.15rem" }}>{data.hero.title}</p>
                <p className="hero-copy">{data.hero.intro}</p>
                <div className="action-row" style={{ marginTop: 24 }}>
                  <a className="button-primary" href={data.hero.resumeUrl} target="_blank" rel="noreferrer">
                    {data.hero.resumeLabel}
                  </a>
                  <a className="button-secondary" href={data.hero.socialsUrl} target="_blank" rel="noreferrer">
                    {data.hero.socialsLabel}
                  </a>
                </div>
              </div>

              <div style={{ display: "grid", gap: 16 }}>
                <div className="image-card">
                  <img src={data.hero.profileImage} alt={data.hero.name} />
                </div>

                <div className="terminal-card">
                  <p className="command">system_status</p>
                  <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
                    <div className="row-head" style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--panel)", padding: "12px 16px" }}>
                      <span className="meta-label">location</span>
                      <span className="status-value">{data.about.location}</span>
                    </div>
                    <div className="row-head" style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--panel)", padding: "12px 16px" }}>
                      <span className="meta-label">contact</span>
                      <span className="status-value">{data.contact.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {statusCards.map((card) => (
              <div key={card.label} className="status-card">
                <div className="status-chip">
                  <span className="status-dot" />
                  <span className="command">{card.label}</span>
                </div>
                <p className="body-copy" style={{ marginTop: 16 }}>{card.value}</p>
              </div>
            ))}
          </section>

          <section className="about-grid">
            <div className="section-card">
              <p className="command">cat about.md</p>
              <p className="body-copy" style={{ marginTop: 20 }}>{data.about.body}</p>
            </div>

            <div className="section-card">
              <p className="command">skills --list</p>
              <div className="skills-grid" style={{ marginTop: 20 }}>
                {data.skills.map((group) => (
                  <div key={group.id} className="skill-card">
                    <h3 style={{ margin: 0 }}>{group.title}</h3>
                    <div className="tag-list">
                      {group.items.map((item) => (
                        <span key={item} className="pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-card">
            <p className="command">ls projects/</p>
            <h2 style={{ margin: "8px 0 0", fontSize: "2rem", letterSpacing: "-0.04em" }}>Loaded Modules</h2>
            <div className="project-grid" style={{ marginTop: 24 }}>
              {data.projects.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.name} />
                  </div>
                  <div>
                    <div className="action-row" style={{ gap: 8 }}>
                      <span className="status-badge">online</span>
                      <span className="meta-label">project.module</span>
                    </div>
                    <h3 style={{ marginTop: 16 }}>{project.name}</h3>
                    <p className="body-copy">{project.summary}</p>
                    <div className="tag-list">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-shell" style={{ marginTop: 16 }}>
                      <span className="command">{project.linkLabel}</span>
                      <p className="project-url">{project.url}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="timeline-grid">
            <div className="section-card">
              <p className="command">experience --timeline</p>
              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                {data.experience.map((item) => (
                  <div key={item.id} className="timeline-item">
                    <div className="row-head">
                      <div>
                        <h3 style={{ margin: 0 }}>{item.company}</h3>
                        <p className="meta-copy" style={{ marginTop: 4 }}>{item.role}</p>
                      </div>
                      <p className="meta-label">{item.period}</p>
                    </div>
                    <p className="body-copy">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-card">
              <p className="command">education --history</p>
              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                {data.education.map((item) => (
                  <div key={item.id} className="timeline-item">
                    <h3 style={{ margin: 0 }}>{item.school}</h3>
                    <p className="meta-copy" style={{ marginTop: 4 }}>{item.degree}</p>
                    <p className="meta-label" style={{ marginTop: 10 }}>{item.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-card">
            <p className="command">contact --open</p>
            <div className="contact-grid" style={{ marginTop: 20 }}>
              <div className="contact-card" style={{ padding: 16 }}>
                <h2 style={{ margin: 0, fontSize: "2rem", letterSpacing: "-0.04em" }}>{data.contact.heading}</h2>
                <p className="body-copy">{data.contact.message}</p>
                <div className="action-row" style={{ marginTop: 20 }}>
                  <span className="button-static">{data.contact.ctaLabel}</span>
                  <span className="contact-email">{data.contact.email}</span>
                </div>
              </div>

              <div className="social-grid">
                {data.socialLinks.map((link) => (
                  <div key={link.id} className="social-card" style={{ padding: 16 }}>
                    <div className="status-chip">
                      <span className="status-dot" />
                      <span className="meta-label">channel</span>
                    </div>
                    <h3 style={{ margin: "16px 0 0" }}>{link.label}</h3>
                    <p className="body-copy" style={{ marginTop: 8 }}>{link.url}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="footer-card">
            <p className="footer-copy">{data.footer.note}</p>
            <p className="watermark">{data.footer.watermark}</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
`;
}

function createTemplateFiles(templateId: ExportTemplateId) {
  if (templateId === "developer-os") {
    return {
      globalsCss: createDeveloperOSGlobalsCss(),
      portfolioTemplate: createDeveloperOSPortfolioTemplateFile(),
    };
  }

  if (templateId === "light-vcard") {
    return {
      globalsCss: createLightVCardGlobalsCss(),
      portfolioTemplate: createLightVCardPortfolioTemplateFile(),
    };
  }

  if (templateId === "profile-card") {
    return {
      globalsCss: createProfileCardGlobalsCss(),
      portfolioTemplate: createProfileCardPortfolioTemplateFile(),
    };
  }

  if (templateId === "dark-starter") {
    return {
      globalsCss: createDarkStarterGlobalsCss(),
      portfolioTemplate: createDarkStarterPortfolioTemplateFile(),
    };
  }

  return {
    globalsCss: createSimpleStarterGlobalsCss(),
    portfolioTemplate: createSimpleStarterPortfolioTemplateFile(),
  };
}

export async function downloadPortfolioZip(portfolio: PortfolioData, templateId: string) {
  const zip = new JSZip();
  const resolvedTemplateId = (
    templateId === "dark-starter" ||
    templateId === "profile-card" ||
    templateId === "light-vcard" ||
    templateId === "developer-os"
      ? templateId
      : "simple-starter"
  ) as ExportTemplateId;
  const templateFiles = createTemplateFiles(resolvedTemplateId);

  zip.file("package.json", createExportPackageJson());
  zip.file("README.md", createReadme());
  zip.file("tsconfig.json", createTsConfig());
  zip.file("next-env.d.ts", createNextEnvFile());
  zip.file("src/app/page.tsx", createPageFile());
  zip.file("src/app/layout.tsx", createLayoutFile());
  zip.file("src/app/globals.css", templateFiles.globalsCss);
  zip.file("src/data/portfolio.ts", createPortfolioDataFile(portfolio));
  zip.file("src/components/PortfolioTemplate.tsx", templateFiles.portfolioTemplate);

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "level-0-portfolio-export.zip";
  anchor.click();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}
