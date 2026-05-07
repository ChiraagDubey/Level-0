export function createDarkStarterGlobalsCss() {
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

.support-grid {
  display: grid;
  gap: 12px;
  margin-top: 24px;
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
.support-card,
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
.support-card,
.project-card,
.skills-card,
.experience-card,
.education-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 16px;
}

.social-card p,
.location-card p,
.availability-card p,
.support-card p,
.project-card p,
.skills-card p,
.experience-card p,
.education-card p {
  margin: 0;
}

.social-title,
.location-value,
.support-title {
  font-size: 1rem;
  font-weight: 600;
}

.social-url,
.meta-copy,
.support-copy,
.project-url,
.period {
  margin-top: 8px;
  color: var(--muted);
}

.support-meta {
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
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

  .support-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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

export function createDarkStarterPortfolioTemplateFile() {
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
  const featuredExperience = data.experience[0];
  const featuredEducation = data.education[0];
  const featuredSkillGroup = data.skills[0];
  const labels = {
    heroExperienceLabel: data.templateLabels?.heroExperienceLabel ?? "Current role",
    heroEducationLabel: data.templateLabels?.heroEducationLabel ?? "Education",
    heroSkillsLabel: data.templateLabels?.heroSkillsLabel ?? "Core stack",
    socialLinksLabel: data.templateLabels?.socialLinksLabel ?? "Social links",
    aboutSkillsLabel: data.templateLabels?.aboutSkillsLabel ?? "Focus",
    locationLabel: data.templateLabels?.locationLabel ?? "Location",
    availabilityLabel: data.templateLabels?.availabilityLabel ?? "Availability",
    projectsLabel: data.templateLabels?.projectsLabel ?? "Projects",
    projectsTitle: data.templateLabels?.projectsTitle ?? "Featured work",
    skillsLabel: data.templateLabels?.skillsLabel ?? "Skills",
    experienceLabel: data.templateLabels?.experienceLabel ?? "Experience",
    educationLabel: data.templateLabels?.educationLabel ?? "Education",
  };
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

              <div className="support-grid">
                {featuredExperience ? (
                  <div className="support-card">
                    <p className="section-label">{labels.heroExperienceLabel}</p>
                    <p className="support-title" style={{ marginTop: 12 }}>{featuredExperience.role}</p>
                    <p className="support-copy">{featuredExperience.company}</p>
                    <p className="support-meta">{featuredExperience.period}</p>
                  </div>
                ) : null}

                {featuredEducation ? (
                  <div className="support-card">
                    <p className="section-label">{labels.heroEducationLabel}</p>
                    <p className="support-title" style={{ marginTop: 12 }}>{featuredEducation.degree}</p>
                    <p className="support-copy">{featuredEducation.school}</p>
                    <p className="support-meta">{featuredEducation.period}</p>
                  </div>
                ) : null}

                {featuredSkillGroup ? (
                  <div className="support-card">
                    <p className="section-label">{labels.heroSkillsLabel}</p>
                    <p className="support-title" style={{ marginTop: 12 }}>{featuredSkillGroup.title}</p>
                    <div className="pill-list" style={{ marginTop: 12 }}>
                      {featuredSkillGroup.items.slice(0, 4).map((item) => (
                        <span key={item} className="pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="hero-side">
              <div className="image-card">
                <img src={data.hero.profileImage} alt={data.hero.name} />
              </div>
              <div className="panel" style={{ background: "#111423" }}>
                <p className="section-label">{labels.socialLinksLabel}</p>
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
              {featuredSkillGroup ? (
                <div className="support-card" style={{ marginTop: 24 }}>
                  <p className="section-label">{labels.aboutSkillsLabel}</p>
                  <p className="support-title" style={{ marginTop: 12 }}>{featuredSkillGroup.title}</p>
                  <div className="pill-list" style={{ marginTop: 12 }}>
                    {featuredSkillGroup.items.slice(0, 4).map((item) => (
                      <span key={item} className="pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="info-grid">
              <div className="location-card">
                <p className="section-label">{labels.locationLabel}</p>
                <p className="location-value" style={{ marginTop: 12 }}>{data.about.location}</p>
              </div>
              <div className="availability-card">
                <p className="section-label">{labels.availabilityLabel}</p>
                <p className="meta-copy" style={{ marginTop: 12 }}>{data.about.availability}</p>
              </div>
            </div>
          </section>

          <section className="panel">
            <p className="section-label">{labels.projectsLabel}</p>
            <h2 className="section-title">{labels.projectsTitle}</h2>
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
              <p className="section-label">{labels.skillsLabel}</p>
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
                <p className="section-label">{labels.experienceLabel}</p>
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
                <p className="section-label">{labels.educationLabel}</p>
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


