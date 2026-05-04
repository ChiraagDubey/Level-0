export function createSimpleStarterGlobalsCss() {
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

export function createSimpleStarterPortfolioTemplateFile() {
  return `import type { CSSProperties } from "react";

type PortfolioData = typeof import("../data/portfolio").portfolio;

interface ArcadeNeonMeta {
  level?: string;
  xp?: string;
  missions?: string;
}

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

