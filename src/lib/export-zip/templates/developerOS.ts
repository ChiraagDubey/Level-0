export function createDeveloperOSGlobalsCss() {
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

export function createDeveloperOSPortfolioTemplateFile() {
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


