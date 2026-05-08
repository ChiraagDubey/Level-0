export function createBlushfolioGlobalsCss() {
  return `:root {
  color-scheme: light;
  --page: #fff4f7;
  --page-alt: #fff8f2;
  --surface: rgba(255, 255, 255, 0.84);
  --line: rgba(217, 120, 152, 0.22);
  --ink: #35242f;
  --muted: #6f5964;
  --accent-soft: rgba(217, 120, 152, 0.1);
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
    radial-gradient(circle at top, rgba(255, 255, 255, 0.82), transparent 34%),
    radial-gradient(circle at top right, rgba(244, 211, 221, 0.55), transparent 28%),
    linear-gradient(180deg, var(--page) 0%, var(--page-alt) 100%);
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
  max-width: 1540px;
  padding: 28px 16px 64px;
}

.portfolio-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 36px;
  background: linear-gradient(180deg, #fff9fb 0%, #fff3f5 36%, #fef7f3 100%);
  box-shadow: 0 30px 90px rgba(181, 116, 142, 0.18);
}

.portfolio-stack {
  position: relative;
  display: grid;
  gap: 32px;
  padding: 20px;
}

.floating-accent {
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
}

.accent-a {
  top: 5%;
  left: 4%;
  width: 64px;
  height: 64px;
  background: var(--accent-soft);
}

.accent-b {
  top: 8%;
  right: 9%;
  width: 42px;
  height: 42px;
  border-radius: 18px;
  transform: rotate(12deg);
  background: rgba(255, 255, 255, 0.82);
}

.accent-c {
  top: 42%;
  right: 6%;
  width: 56px;
  height: 56px;
  background: rgba(246, 214, 198, 0.58);
}

.accent-e {
  top: 62%;
  left: 18%;
  width: 96px;
  height: 96px;
  background: rgba(255, 230, 238, 0.82);
}

.accent-f {
  top: 65%;
  right: 18%;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  transform: rotate(12deg);
  background: rgba(248, 222, 230, 0.9);
}

.accent-d {
  bottom: 12%;
  right: 14%;
  width: 28px;
  height: 28px;
  border-radius: 9px;
  transform: rotate(12deg);
  background: rgba(221, 144, 171, 0.2);
}

.glow-a,
.glow-b,
.sparkle,
.heart {
  position: absolute;
  pointer-events: none;
}

.glow-a,
.glow-b {
  border-radius: 999px;
  filter: blur(32px);
}

.glow-a {
  top: 54%;
  left: 22%;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(255, 224, 235, 0.7), transparent 68%);
}

.glow-b {
  top: 58%;
  right: 12%;
  width: 176px;
  height: 176px;
  background: radial-gradient(circle, rgba(255, 236, 221, 0.75), transparent 70%);
}

.sparkle,
.heart {
  color: rgba(228, 172, 193, 0.58);
}

.sparkle.one {
  top: 29%;
  right: 11%;
  font-size: 1.1rem;
}

.sparkle.two {
  top: 63%;
  right: 17%;
  font-size: 1rem;
}

.sparkle.three {
  bottom: 23%;
  left: 10%;
  font-size: 1rem;
}

.heart.one {
  top: 61%;
  left: 18%;
  font-size: 1.7rem;
  color: rgba(221, 147, 173, 0.42);
}

.heart.two {
  bottom: 14%;
  left: 35%;
  font-size: 1.2rem;
  color: rgba(228, 172, 193, 0.54);
}

.card {
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 32px;
  background: var(--surface);
  box-shadow: 0 18px 40px rgba(214, 144, 167, 0.1);
}

.hero-card,
.about-grid,
.feature-card,
.split-grid {
  display: grid;
  gap: 24px;
}

.hero-card {
  padding: 24px;
}

.eyebrow-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.eyebrow,
.status-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.eyebrow {
  border: 1px solid var(--line);
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

.status-pill {
  border: 1px solid rgba(241, 219, 227, 1);
  background: #fff8fa;
  color: #9d7484;
}

.name,
.section-title,
.project-name,
.contact-title,
.about-heading {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  letter-spacing: -0.05em;
  color: var(--ink);
}

.name {
  font-size: clamp(3.2rem, 8vw, 5.8rem);
  line-height: 0.95;
}

.title {
  margin: 16px 0 0;
  max-width: 760px;
  font-size: clamp(1.15rem, 3vw, 1.4rem);
  line-height: 1.8;
  color: #5d4450;
}

.copy {
  margin: 16px 0 0;
  max-width: 760px;
  font-size: 0.98rem;
  line-height: 2;
  color: var(--muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.button-primary,
.button-secondary,
.contact-chip,
.email-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 600;
}

.button-primary,
.contact-chip {
  background: var(--accent);
  color: white;
  box-shadow: 0 14px 28px rgba(217, 120, 152, 0.24);
}

.button-secondary,
.email-chip {
  border: 1px solid rgba(236, 212, 221, 1);
  background: white;
  color: #583f49;
}

.hero-facts {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}

.fact-card,
.skill-card,
.education-card,
.social-card,
.project-card {
  border-radius: 24px;
}

.fact-card {
  border: 1px solid rgba(240, 217, 226, 1);
  background: #fff7f9;
  padding: 16px;
}

.fact-card.warm {
  border-color: rgba(244, 223, 211, 1);
  background: #fffaf5;
}

.section-label {
  margin: 0;
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.fact-copy,
.social-url,
.project-url,
.item-copy,
.footer-copy {
  margin: 12px 0 0;
  font-size: 0.94rem;
  line-height: 1.9;
  color: var(--muted);
}

.profile-card {
  position: relative;
  border: 1px solid rgba(240, 215, 225, 1);
  border-radius: 32px;
  background: linear-gradient(180deg, #fff9fb 0%, #fff2f5 100%);
  padding: 12px;
  box-shadow: 0 20px 40px rgba(215, 149, 175, 0.12);
}

.profile-pill,
.profile-mode {
  position: absolute;
  z-index: 2;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.profile-pill {
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.85);
  color: #9c7280;
}

.profile-mode {
  right: 16px;
  bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: rgba(255, 248, 250, 0.85);
  color: var(--accent);
}

.profile-image {
  min-height: 360px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 30px;
  background: #fff6f8;
}

.profile-note {
  padding: 20px;
}

.profile-note-stack {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.profile-note-chip {
  border-radius: 20px;
  background: #fff6f8;
  padding: 14px 16px;
  font-size: 0.94rem;
  line-height: 1.9;
  color: #634d57;
}

.spotlight-grid {
  display: grid;
  gap: 12px;
  margin-top: 12px;
}

.spotlight-card,
.detail-card,
.toolkit-note {
  border-radius: 24px;
  padding: 20px;
}

.spotlight-card {
  border: 1px solid rgba(240, 217, 226, 1);
  background: linear-gradient(135deg, #fff9fb 0%, #fff3f6 100%);
  box-shadow: 0 12px 25px rgba(223, 170, 191, 0.08);
}

.detail-card {
  border: 1px solid rgba(244, 223, 211, 1);
  background: linear-gradient(135deg, #fffaf6 0%, #fff5fb 100%);
  box-shadow: 0 12px 25px rgba(233, 194, 176, 0.08);
}

.detail-label {
  margin: 0;
  color: #b78898;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.spotlight-title {
  margin: 12px 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.8rem;
  letter-spacing: -0.05em;
  color: #3d2b35;
}

.spotlight-copy,
.toolkit-note-copy {
  margin: 12px 0 0;
  font-size: 0.94rem;
  line-height: 1.9;
  color: #6a5560;
}

.detail-pill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.detail-pill {
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #7a5f6a;
  box-shadow: 0 10px 20px rgba(214, 144, 167, 0.08);
}

.about-grid {
  display: grid;
  gap: 24px;
}

.about-card,
.social-panel,
.feature-card,
.skills-panel,
.experience-panel,
.education-panel,
.contact-panel,
.footer-panel {
  padding: 24px;
}

.about-heading,
.section-title,
.contact-title {
  font-size: clamp(2rem, 4vw, 3rem);
}

.social-panel,
.project-card,
.skill-card,
.timeline-item,
.education-card {
  border: 1px solid rgba(240, 219, 227, 1);
}

.social-panel {
  border-radius: 30px;
  background: linear-gradient(180deg, #fff9fb 0%, #fff4f7 100%);
}

.social-grid,
.project-grid,
.skill-grid,
.timeline,
.education-grid {
  display: grid;
  gap: 16px;
}

.social-grid {
  margin-top: 20px;
}

.social-card {
  background: rgba(255, 255, 255, 0.88);
  padding: 16px;
}

.social-link {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #423039;
}

.feature-card {
  padding: 24px;
}

.feature-card .section-title {
  margin-top: 8px;
  max-width: 820px;
}

.project-grid {
  margin-top: 24px;
}

.project-card {
  overflow: hidden;
  border-radius: 26px;
  background: #fff8fa;
  box-shadow: 0 14px 28px rgba(214, 144, 167, 0.08);
}

.project-media {
  padding: 12px;
}

.project-image {
  min-height: 220px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 30px;
  background: #fff6f8;
}

.project-body {
  padding: 0 20px 20px;
}

.project-name {
  font-size: 1.9rem;
}

.tag-list,
.pill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.tag {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  padding: 6px 12px;
  font-size: 0.78rem;
  font-weight: 600;
}

.project-link-card {
  margin-top: 16px;
  border-radius: 18px;
  background: white;
  padding: 12px 16px;
}

.project-link-label {
  margin: 0;
  color: var(--accent);
  font-size: 0.9rem;
  font-weight: 600;
}

.project-url {
  margin-top: 4px;
  font-size: 0.8rem;
  color: #7e6671;
}

.split-grid {
  display: grid;
  gap: 24px;
}

.skill-card {
  background: #fff8fa;
  padding: 16px;
}

.toolkit-note {
  margin-top: 20px;
  border: 1px solid rgba(237, 214, 224, 1);
  background: linear-gradient(135deg, #fff6f9 0%, #fff9f4 100%);
  box-shadow: 0 12px 25px rgba(214, 144, 167, 0.08);
}

.item-title {
  margin: 0;
  font-size: 1.08rem;
  font-weight: 600;
  color: #402e37;
}

.pill {
  border-radius: 999px;
  background: white;
  padding: 6px 12px;
  font-size: 0.9rem;
  color: #6d5560;
  box-shadow: 0 8px 20px rgba(214, 144, 167, 0.08);
}

.timeline-item {
  position: relative;
  border-radius: 24px;
  background: #fff7f9;
  padding: 20px;
}

.timeline-dot {
  position: absolute;
  left: 20px;
  top: 24px;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 6px rgba(217, 120, 152, 0.14);
}

.timeline-body {
  padding-left: 28px;
}

.timeline-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
}

.timeline-role,
.education-school {
  margin: 0;
  font-size: 1.06rem;
  font-weight: 600;
  color: #3d2c35;
}

.timeline-company,
.education-degree {
  margin: 6px 0 0;
  color: #735d68;
}

.timeline-meta,
.education-meta,
.watermark {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.timeline-meta,
.education-meta {
  color: #8f7480;
}

.education-grid {
  margin-top: 20px;
}

.education-card {
  border-radius: 24px;
  background: #fffaf6;
  padding: 16px;
}

.contact-panel {
  border: 1px solid rgba(239, 218, 226, 1);
  border-radius: 32px;
  background: linear-gradient(135deg, #fdf0f4 0%, #fff8f2 100%);
  box-shadow: 0 18px 40px rgba(214, 144, 167, 0.12);
}

.contact-copy {
  margin: 16px 0 0;
  max-width: 760px;
  color: var(--muted);
  line-height: 2;
}

.contact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
}

.footer-panel {
  padding: 24px;
}

.footer-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.watermark {
  color: var(--accent);
  font-weight: 600;
}

@media (min-width: 760px) {
  .hero-facts,
  .social-grid,
  .education-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 980px) {
  .hero-card {
    grid-template-columns: 1.2fr 0.8fr;
    padding: 32px;
  }

  .spotlight-grid {
    grid-template-columns: 0.92fr 1.08fr;
  }

  .about-grid {
    grid-template-columns: 0.95fr 1.05fr;
  }

  .project-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .split-grid {
    grid-template-columns: 0.82fr 1.18fr;
  }
}

@media (min-width: 1080px) {
  .contact-layout {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: 20px;
  }

  .footer-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
`;
}

export function createBlushfolioPortfolioTemplateFile() {
  return `import type { CSSProperties } from "react";

type PortfolioData = typeof import("../data/portfolio").portfolio;

export function PortfolioTemplate({ data }: { data: PortfolioData }) {
  const themeStyle = {
    ["--accent" as string]: data.theme.accentColor,
  } as CSSProperties;
  const labels = {
    quickFactsLabel: data.templateLabels?.quickFactsLabel ?? "Soft profile",
    socialLinksLabel: data.templateLabels?.socialLinksLabel ?? "Find me online",
    locationLabel: data.templateLabels?.locationLabel ?? "Based in",
    availabilityLabel: data.templateLabels?.availabilityLabel ?? "Currently",
    projectsLabel: data.templateLabels?.projectsLabel ?? "Featured work",
    projectsTitle: data.templateLabels?.projectsTitle ?? "Selected work",
    skillsLabel: data.templateLabels?.skillsLabel ?? "Toolkit",
    experienceLabel: data.templateLabels?.experienceLabel ?? "Experience",
    educationLabel: data.templateLabels?.educationLabel ?? "Education",
  };
  const heroAside = {
    statusLabel: data.heroAside?.statusLabel ?? "Soft launch ready",
    profileLabel: data.heroAside?.profileLabel ?? "Profile card",
    profileModeLabel: data.heroAside?.profileModeLabel ?? "Pretty mode",
    detailLabel: data.heroAside?.detailLabel ?? "Charmed details",
    highlightItems: data.heroAside?.highlightItems ?? [
      "Thoughtful product visuals with frontend precision",
      "Soft brand expression without losing structure",
      "Built for creators, founders, and modern lifestyle products",
    ],
    spotlightLabel: data.heroAside?.spotlightLabel ?? "Sweet spot",
    spotlightTitle: data.heroAside?.spotlightTitle ?? "Soft visuals, sharp product thinking",
    spotlightBody:
      data.heroAside?.spotlightBody ??
      "Balancing warm storytelling, clean UX structure, and polished frontend implementation for brands that want personality without clutter.",
    toolkitLabel: data.heroAside?.toolkitLabel ?? "Signature blend",
    toolkitBody:
      data.heroAside?.toolkitBody ??
      "A mix of design systems, playful brand direction, and build-ready UI craft that keeps every page feeling intentional.",
  };

  return (
    <main className="portfolio-shell" style={themeStyle}>
      <div className="portfolio-frame">
        <span className="floating-accent accent-a" />
        <span className="floating-accent accent-b" />
        <span className="floating-accent accent-c" />
        <span className="floating-accent accent-e" />
        <span className="floating-accent accent-f" />
        <span className="floating-accent accent-d" />
        <span className="glow-a" />
        <span className="glow-b" />
        <span className="sparkle one">*</span>
        <span className="sparkle two">*</span>
        <span className="sparkle three">*</span>
        <span className="heart one">o</span>
        <span className="heart two">o</span>

        <div className="portfolio-stack">
          <section className="card hero-card">
            <div>
              <div className="eyebrow-row">
                <span className="eyebrow">{data.hero.eyebrow}</span>
                <span className="status-pill">{heroAside.statusLabel}</span>
              </div>

              <h1 className="name">{data.hero.name}</h1>
              <p className="title">{data.hero.title}</p>
              <p className="copy">{data.hero.intro}</p>

              <div className="actions">
                <a className="button-primary" href={data.hero.socialsUrl} target="_blank" rel="noreferrer">
                  {data.hero.socialsLabel}
                </a>
                <a className="button-secondary" href={data.hero.resumeUrl} target="_blank" rel="noreferrer">
                  {data.hero.resumeLabel}
                </a>
              </div>

              <div className="hero-facts">
                <div className="fact-card">
                  <p className="section-label">{labels.locationLabel}</p>
                  <p className="fact-copy">{data.about.location}</p>
                </div>
                <div className="fact-card warm">
                  <p className="section-label">{labels.availabilityLabel}</p>
                  <p className="fact-copy">{data.about.availability}</p>
                </div>
              </div>

              <div className="spotlight-grid">
                <div className="spotlight-card">
                  <p className="section-label">{heroAside.spotlightLabel}</p>
                  <h3 className="spotlight-title">{heroAside.spotlightTitle}</h3>
                  <p className="spotlight-copy">{heroAside.spotlightBody}</p>
                </div>
                <div className="detail-card">
                  <p className="detail-label">{heroAside.detailLabel}</p>
                  <div className="detail-pill-list">
                    {heroAside.highlightItems.slice(0, 2).map((item) => (
                      <span key={item} className="detail-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="profile-card">
                <span className="profile-pill">{heroAside.profileLabel}</span>
                <span className="profile-mode">{heroAside.profileModeLabel}</span>
                <div className="profile-image">
                  <img src={data.hero.profileImage} alt={data.hero.name} />
                </div>
              </div>

              <div className="card profile-note">
                <p className="section-label">{labels.quickFactsLabel}</p>
                <div className="profile-note-stack">
                  {heroAside.highlightItems.map((item, index) => (
                    <div
                      key={item}
                      className="profile-note-chip"
                      style={{
                        background: index % 3 === 0 ? "#fff6f8" : index % 3 === 1 ? "#fff8f3" : "#fff7fa",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="about-grid">
            <div className="card about-card">
              <h2 className="about-heading">{data.about.heading}</h2>
              <p className="copy">{data.about.body}</p>
            </div>

            <div className="social-panel">
              <p className="section-label">{labels.socialLinksLabel}</p>
              <div className="social-grid">
                {data.socialLinks.map((link) => (
                  <div key={link.id} className="social-card">
                    <p className="social-link">{link.label}</p>
                    <p className="social-url">{link.url}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="card feature-card">
            <p className="section-label">{labels.projectsLabel}</p>
            <h2 className="section-title">{labels.projectsTitle}</h2>
            <div className="project-grid">
              {data.projects.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-media">
                    <div className="project-image">
                      <img src={project.image} alt={project.name} />
                    </div>
                  </div>
                  <div className="project-body">
                    <h3 className="project-name">{project.name}</h3>
                    <p className="copy">{project.summary}</p>
                    <div className="tag-list">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-link-card">
                      <p className="project-link-label">{project.linkLabel}</p>
                      <p className="project-url">{project.url}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="split-grid">
            <div className="card skills-panel">
              <p className="section-label">{labels.skillsLabel}</p>
              <div className="skill-grid" style={{ marginTop: 20 }}>
                {data.skills.map((group) => (
                  <div key={group.id} className="skill-card">
                    <h3 className="item-title">{group.title}</h3>
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
              <div className="toolkit-note">
                <p className="section-label">{heroAside.toolkitLabel}</p>
                <p className="toolkit-note-copy">{heroAside.toolkitBody}</p>
              </div>
            </div>

            <div style={{ display: "grid", gap: 24 }}>
              <div className="card experience-panel">
                <p className="section-label">{labels.experienceLabel}</p>
                <div className="timeline" style={{ marginTop: 20 }}>
                  {data.experience.map((item) => (
                    <article key={item.id} className="timeline-item">
                      <span className="timeline-dot" />
                      <div className="timeline-body">
                        <div className="timeline-head">
                          <div>
                            <h3 className="timeline-role">{item.role}</h3>
                            <p className="timeline-company">{item.company}</p>
                          </div>
                          <p className="timeline-meta">{item.period}</p>
                        </div>
                        <p className="item-copy">{item.summary}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="card education-panel">
                <p className="section-label">{labels.educationLabel}</p>
                <div className="education-grid">
                  {data.education.map((item) => (
                    <article key={item.id} className="education-card">
                      <h3 className="education-school">{item.school}</h3>
                      <p className="education-degree">{item.degree}</p>
                      <p className="education-meta" style={{ marginTop: 12 }}>
                        {item.period}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="contact-panel">
            <div className="contact-layout">
              <div>
                <h2 className="contact-title">{data.contact.heading}</h2>
                <p className="contact-copy">{data.contact.message}</p>
              </div>
              <div className="contact-row">
                <span className="contact-chip">{data.contact.ctaLabel}</span>
                <span className="email-chip">{data.contact.email}</span>
              </div>
            </div>
          </section>

          <footer className="card footer-panel">
            <div className="footer-row">
              <p className="footer-copy" style={{ margin: 0, maxWidth: 820 }}>
                {data.footer.note}
              </p>
              <p className="watermark">{data.footer.watermark}</p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
`;
}
