export function createLightVCardGlobalsCss() {
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

export function createLightVCardPortfolioTemplateFile() {
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


