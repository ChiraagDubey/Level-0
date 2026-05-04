export function createProfileCardGlobalsCss() {
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

export function createProfileCardPortfolioTemplateFile() {
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


