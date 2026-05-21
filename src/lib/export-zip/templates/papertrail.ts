export function createPaperTrailGlobalsCss() {
  return `:root {
  color-scheme: light;
  --background: #efe5d6;
  --background-strong: #e7dac6;
  --surface: #fffaf2;
  --surface-soft: #f4ecdf;
  --ink: #2f2924;
  --muted: #655d56;
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
  color: var(--ink);
  font-family: Georgia, "Times New Roman", serif;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.68), transparent 28%),
    linear-gradient(180deg, #f5efe4 0%, var(--background) 100%);
}

a {
  color: inherit;
  text-decoration: none;
}

.papertrail-shell {
  margin: 0 auto;
  max-width: 1480px;
  padding: 24px 16px 56px;
}

.papertrail-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid #d7ccb9;
  border-radius: 36px;
  box-shadow: 0 28px 85px rgba(68, 57, 43, 0.14);
  background: linear-gradient(180deg, #f5efe4 0%, var(--background) 100%);
}

.papertrail-grid {
  position: relative;
  display: grid;
  gap: 24px;
  padding: 16px;
}

.papertrail-grid::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.72), transparent 36%);
  pointer-events: none;
}

.rail,
.sheet,
.paper-card,
.paper-panel,
.note-card,
.project-card,
.timeline-card,
.skills-card,
.education-card,
.contact-card,
.footer-card {
  position: relative;
  border: 1px solid #d8ccb8;
  box-shadow: 0 18px 34px rgba(75, 65, 53, 0.08);
}

.rail {
  align-self: start;
  border-radius: 28px;
  padding: 20px;
  background: linear-gradient(180deg, #f7f1e7 0%, #eee3d1 100%);
}

.sheet {
  border-radius: 32px;
  padding: 24px;
  background: linear-gradient(180deg, #fbf7f0 0%, #f5edde 100%);
  box-shadow: 0 20px 45px rgba(77, 66, 52, 0.1);
}

.paper-card,
.paper-panel,
.note-card,
.project-card,
.timeline-card,
.skills-card,
.education-card,
.contact-card,
.footer-card {
  border-radius: 28px;
  padding: 20px;
  background: var(--surface);
}

.rail-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #ddd0bd;
  padding-bottom: 16px;
}

.rail-mark {
  display: flex;
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--accent) 30%, white);
  color: var(--accent);
  background: #fffaf2;
  font-size: 1.2rem;
  font-weight: 700;
}

.mono {
  font-family: "Courier New", Courier, monospace;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 10px;
}

.muted {
  color: var(--muted);
}

.rail-list,
.stack,
.social-list,
.timeline-list,
.education-list {
  display: grid;
  gap: 12px;
}

.rail-item,
.social-item,
.timeline-card,
.education-card,
.contact-card {
  border-radius: 20px;
  border: 1px solid #d9ccb8;
  background: #fffaf2;
}

.hero-grid,
.about-grid,
.lower-grid,
.contact-grid {
  display: grid;
  gap: 24px;
}

.hero-title,
.section-title,
.project-title,
.note-title {
  margin: 0;
  letter-spacing: -0.05em;
  color: #302924;
}

.hero-title {
  font-size: clamp(3rem, 7vw, 4.8rem);
  line-height: 0.95;
}

.section-title {
  font-size: clamp(2.2rem, 5vw, 3rem);
}

.eyebrow,
.stamp,
.tab {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 12px;
}

.eyebrow {
  border: 1px solid color-mix(in srgb, var(--accent) 28%, white);
  background: color-mix(in srgb, var(--accent) 10%, white);
  color: var(--accent);
}

.tab {
  border: 1px solid #d7cab5;
  background: #fff8ef;
  color: #7d6d60;
}

.stamp {
  border: 1px solid #cfb39f;
  background: #f3dfcf;
  color: #8a5d50;
}

.hero-copy,
.body-copy,
.project-copy,
.contact-copy {
  line-height: 1.9;
  color: var(--muted);
}

.hero-actions,
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button-primary,
.button-secondary {
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
  color: white;
}

.button-secondary {
  border: 1px solid rgba(47, 41, 36, 0.12);
  background: white;
}

.photo-frame,
.project-image {
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid #d8ccb8;
  background: #efe6d8;
}

.photo-frame img,
.project-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-frame {
  min-height: 360px;
}

.project-grid,
.skills-groups {
  display: grid;
  gap: 20px;
}

.project-card,
.timeline-card,
.skills-card,
.education-card {
  background: #fffaf2;
}

.project-card {
  overflow: hidden;
}

.project-meta {
  border-radius: 20px;
  border: 1px solid #d9ccb8;
  background: #f4ecdf;
  padding: 12px 16px;
}

.tag {
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--accent) 22%, white);
  border-style: dashed;
  background: color-mix(in srgb, var(--accent) 7%, white);
  padding: 6px 12px;
  color: #564d46;
  font-size: 0.76rem;
  font-weight: 600;
}

.timeline-card::before {
  content: "";
  position: absolute;
  left: 20px;
  top: 24px;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 14%, white);
}

.timeline-inner {
  padding-left: 28px;
}

.contact-band {
  display: inline-flex;
  border: 1px solid color-mix(in srgb, var(--accent) 28%, white);
  background: color-mix(in srgb, var(--accent) 10%, white);
  color: var(--accent);
  border-radius: 999px;
  padding: 6px 12px;
}

.panel-stack::before,
.panel-stack::after {
  content: "";
  position: absolute;
  inset: 12px;
  border-radius: inherit;
  border: 1px solid #e0d4c3;
  background: rgba(247, 241, 230, 0.76);
  z-index: -1;
}

.panel-stack::before {
  transform: translate(12px, 12px);
}

.panel-stack::after {
  transform: translate(20px, 20px);
  opacity: 0.8;
}

.handwritten {
  font-family: "Brush Script MT", "Segoe Script", "Comic Sans MS", cursive;
  letter-spacing: 0.01em;
  color: #8c6b5d;
}

.thumbtack,
.tape,
.paperclip,
.pen-line {
  position: absolute;
  pointer-events: none;
}

.thumbtack {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.thumbtack::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 12px;
  width: 2px;
  height: 16px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: rgba(151, 142, 132, 0.7);
}

.thumbtack-rose {
  background: #c4887e;
  box-shadow: 0 8px 12px rgba(144, 90, 79, 0.24);
}

.thumbtack-brass {
  background: #b59a67;
  box-shadow: 0 8px 12px rgba(117, 95, 58, 0.24);
}

.thumbtack-sage {
  background: #93a28a;
  box-shadow: 0 8px 12px rgba(88, 102, 80, 0.22);
}

.paperclip {
  width: 28px;
  height: 48px;
  border: 2px solid #86827b;
  border-radius: 14px;
}

.paperclip::after {
  content: "";
  position: absolute;
  left: 7px;
  top: 6px;
  width: 10px;
  height: 28px;
  border: 2px solid rgba(134, 130, 123, 0.8);
  border-radius: 10px;
}

.tape {
  border: 1px solid rgba(209, 192, 158, 0.7);
  border-radius: 4px;
  background: rgba(247, 238, 215, 0.85);
  box-shadow: 0 6px 14px rgba(94, 78, 58, 0.08);
}

.tape-rose {
  border-color: rgba(210, 180, 162, 0.7);
  background: rgba(239, 220, 207, 0.82);
}

.pen-line {
  height: 3px;
  border-radius: 999px;
  background: rgba(184, 118, 109, 0.65);
}

@media (min-width: 900px) {
  .papertrail-grid {
    grid-template-columns: 220px minmax(0, 1fr);
    padding: 24px;
  }

  .hero-grid {
    grid-template-columns: 1.15fr 0.85fr;
  }

  .about-grid,
  .contact-grid {
    grid-template-columns: 1fr 1fr;
  }

  .lower-grid {
    grid-template-columns: 1fr 1fr;
  }

  .project-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
`;
}

export function createPaperTrailPortfolioTemplateFile() {
  return `import type { CSSProperties } from "react";

type PortfolioData = typeof import("../data/portfolio").portfolio;

const sections = ["Cover Page", "Author's Note", "Selected Work", "Experience Log", "Toolbox", "Contact Sheet"];

export function PortfolioTemplate({ data }: { data: PortfolioData }) {
  const themeStyle = { ["--accent" as string]: data.theme.accentColor } as CSSProperties;
  const heroAside = {
    statusLabel: data.heroAside?.statusLabel ?? "Case file open",
    profileLabel: data.heroAside?.profileLabel ?? "Field portrait",
    profileModeLabel: data.heroAside?.profileModeLabel ?? "Issue 01",
    detailLabel: data.heroAside?.detailLabel ?? "Margin notes",
    highlightItems: data.heroAside?.highlightItems ?? [],
    spotlightLabel: data.heroAside?.spotlightLabel ?? "Author's note",
    spotlightTitle: data.heroAside?.spotlightTitle ?? "",
    spotlightBody: data.heroAside?.spotlightBody ?? "",
    toolkitLabel: data.heroAside?.toolkitLabel ?? "Builder's note",
    toolkitBody: data.heroAside?.toolkitBody ?? "",
  };
  const labels = {
    quickFactsLabel: data.templateLabels?.quickFactsLabel ?? "Case details",
    socialLinksLabel: data.templateLabels?.socialLinksLabel ?? "Reference links",
    aboutSkillsLabel: data.templateLabels?.aboutSkillsLabel ?? "Working style",
    locationLabel: data.templateLabels?.locationLabel ?? "Filed from",
    availabilityLabel: data.templateLabels?.availabilityLabel ?? "Availability",
    projectsLabel: data.templateLabels?.projectsLabel ?? "Selected work",
    projectsTitle: data.templateLabels?.projectsTitle ?? "Documented projects",
    skillsLabel: data.templateLabels?.skillsLabel ?? "Toolbox",
    experienceLabel: data.templateLabels?.experienceLabel ?? "Experience log",
    educationLabel: data.templateLabels?.educationLabel ?? "Education",
  };

  return (
    <main className="papertrail-shell" style={themeStyle}>
      <div className="papertrail-frame">
        <div className="papertrail-grid">
          <aside className="rail panel-stack">
            <span className="thumbtack thumbtack-brass" style={{ left: 20, top: -8 }} />
            <span className="tape" style={{ right: 30, top: 20, width: 64, height: 22, transform: "rotate(-6deg)" }} />
            <div className="rail-brand">
              <div className="rail-mark">PT</div>
              <div>
                <p className="mono muted">Paper index</p>
                <p style={{ margin: "4px 0 0", fontSize: "0.95rem", fontWeight: 600 }}>PaperTrail</p>
              </div>
            </div>
            <div className="stack" style={{ marginTop: 20 }}>
              <div className="paper-panel">
                <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>Edition</p>
                <p className="muted" style={{ margin: "10px 0 0", fontSize: "0.95rem" }}>Documented portfolio dossier</p>
              </div>
              <div className="rail-list">
                {sections.map((section, index) => (
                  <div key={section} className="rail-item" style={{ display: "flex", gap: 12, padding: "12px 14px" }}>
                    <span className="mono muted">{String(index + 1).padStart(2, "0")}</span>
                    <span>{section}</span>
                  </div>
                ))}
              </div>
              <div className="paper-panel" style={{ background: "#f1e6d6" }}>
                <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>{heroAside.statusLabel}</p>
                <p className="muted" style={{ margin: "12px 0 0" }}>This layout is built to read like a collected working document rather than a dashboard or blog.</p>
                <p className="handwritten" style={{ margin: "12px 0 0", fontSize: "1.3rem", lineHeight: 1 }}>documented with care</p>
              </div>
            </div>
          </aside>

          <div className="stack">
            <section className="sheet panel-stack">
              <span className="paperclip" style={{ left: 20, top: -10, transform: "rotate(-8deg)" }} />
              <span className="thumbtack thumbtack-rose" style={{ right: 82, top: -8 }} />
              <span className="tape" style={{ right: 118, top: 28, width: 78, height: 24, transform: "rotate(8deg)" }} />
              <div className="hero-grid">
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    <span className="eyebrow mono">{data.hero.eyebrow}</span>
                    <span className="tab mono">{heroAside.profileLabel}</span>
                  </div>
                  <div style={{ position: "relative", display: "inline-block", marginTop: 24, paddingRight: 24 }}>
                    <h1 className="hero-title" style={{ margin: 0 }}>{data.hero.name}</h1>
                    <span className="pen-line" style={{ left: 8, bottom: 4, width: "78%", transform: "rotate(1deg)" }} />
                  </div>
                  <p className="hero-copy" style={{ marginTop: 16, fontSize: "1.3rem", color: "#4a413b" }}>{data.hero.title}</p>
                  <p className="hero-copy" style={{ marginTop: 16 }}>{data.hero.intro}</p>
                  <div className="hero-actions" style={{ marginTop: 24 }}>
                    <a className="button-primary" href={data.hero.socialsUrl} target="_blank" rel="noreferrer">{data.hero.socialsLabel}</a>
                    <a className="button-secondary" href={data.hero.resumeUrl} target="_blank" rel="noreferrer">{data.hero.resumeLabel}</a>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                    <p className="handwritten" style={{ margin: 0, fontSize: "1.4rem", lineHeight: 1 }}>currently building</p>
                    <span className="pen-line" style={{ position: "static", width: 36, transform: "rotate(-10deg)" }} />
                  </div>
                  <div className="about-grid" style={{ marginTop: 24 }}>
                    <div className="paper-card">
                      <span className="thumbtack thumbtack-brass" style={{ left: 18, top: -8 }} />
                      <p className="stamp mono" style={{ margin: 0 }}>{heroAside.spotlightLabel}</p>
                      <h3 className="note-title" style={{ marginTop: 14, fontSize: "1.8rem" }}>{heroAside.spotlightTitle}</h3>
                      <p className="body-copy" style={{ marginTop: 14 }}>{heroAside.spotlightBody}</p>
                    </div>
                    <div className="paper-card" style={{ background: "#f2e6d4" }}>
                      <span className="tape" style={{ right: 20, top: -10, width: 58, height: 22, transform: "rotate(-10deg)" }} />
                      <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>{labels.quickFactsLabel}</p>
                      <div style={{ marginTop: 16 }}>
                        <p className="mono muted" style={{ margin: 0 }}>{labels.locationLabel}</p>
                        <p style={{ margin: "6px 0 16px", fontWeight: 600 }}>{data.about.location}</p>
                        <p className="mono muted" style={{ margin: 0 }}>{labels.availabilityLabel}</p>
                        <p className="muted" style={{ margin: "6px 0 0" }}>{data.about.availability}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stack">
                  <div className="paper-card" style={{ background: "linear-gradient(180deg,#f8f1e5 0%,#f1e4d0 100%)" }}>
                    <span className="paperclip" style={{ right: 24, top: -16, transform: "rotate(10deg)" }} />
                    <span className="thumbtack thumbtack-sage" style={{ left: 20, top: -8 }} />
                    <div className="photo-frame"><img src={data.hero.profileImage} alt={data.hero.name + " profile image"} /></div>
                  </div>
                  <div className="paper-card">
                    <span className="tape" style={{ left: 26, top: -12, width: 72, height: 24, transform: "rotate(-6deg)" }} />
                    <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>{heroAside.detailLabel}</p>
                    <div className="stack" style={{ marginTop: 14 }}>
                      {heroAside.highlightItems.map((item, index) => (
                        <div key={"note-" + index} className="note-card" style={{ background: index % 3 === 0 ? "#f4ecdf" : index % 3 === 1 ? "#eef1e8" : "#ece5d8" }}>
                          <p className="muted" style={{ margin: 0 }}>{item}</p>
                        </div>
                      ))}
                    </div>
                    <p className="handwritten" style={{ margin: "14px 0 0", fontSize: "1.25rem", lineHeight: 1, textAlign: "right" }}>notes from the build</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="about-grid">
              <div className="paper-card">
                <h2 className="section-title">{data.about.heading}</h2>
                <p className="body-copy" style={{ marginTop: 16 }}>{data.about.body}</p>
              </div>
              <div className="stack">
                <div className="paper-card" style={{ background: "#f2e7d7" }}>
                  <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>{labels.socialLinksLabel}</p>
                  <div className="social-list" style={{ marginTop: 16 }}>
                    {data.socialLinks.map((link) => (
                      <div key={link.id} className="social-item" style={{ padding: 16 }}>
                        <p style={{ margin: 0, fontWeight: 700 }}>{link.label}</p>
                        <p className="muted" style={{ margin: "8px 0 0" }}>{link.url}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="paper-card" style={{ background: "#fff7ec" }}>
                  <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>{labels.aboutSkillsLabel}</p>
                  <h3 className="note-title" style={{ marginTop: 14, fontSize: "1.6rem" }}>{heroAside.toolkitLabel}</h3>
                  <p className="body-copy" style={{ marginTop: 14 }}>{heroAside.toolkitBody}</p>
                </div>
              </div>
            </section>

            <section className="paper-card panel-stack">
              <span className="thumbtack thumbtack-brass" style={{ left: 22, top: -8 }} />
              <span className="tape" style={{ right: 32, top: -12, width: 78, height: 24, transform: "rotate(8deg)" }} />
              <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>{labels.projectsLabel}</p>
              <div style={{ position: "relative", display: "inline-block", marginTop: 10, paddingRight: 24 }}>
                <h2 className="section-title" style={{ margin: 0 }}>{labels.projectsTitle}</h2>
                <span className="pen-line" style={{ left: 4, bottom: 2, width: "58%", transform: "rotate(1deg)" }} />
              </div>
              <div className="project-grid" style={{ marginTop: 20 }}>
                {data.projects.map((project, index) => (
                  <article key={project.id} className="project-card" style={{ transform: "rotate(" + (index % 2 === 0 ? "-0.8deg" : "0.8deg") + ")", overflow: "visible" }}>
                    <span className="paperclip" style={{ right: 18, top: -16, transform: "rotate(9deg)" }} />
                    <span className={"thumbtack " + (index === 1 ? "thumbtack-sage" : index === 2 ? "thumbtack-rose" : "thumbtack-rose")} style={{ left: 18, top: -8 }} />
                    <span className={"tape" + (index === 2 ? " tape-rose" : "")} style={index === 1 ? { right: 72, top: -12, width: 62, height: 24, transform: "rotate(-8deg)" } : { left: 72, top: -12, width: 62, height: 24, transform: "rotate(8deg)" }} />
                    <div style={{ padding: 12 }}>
                      <div className="project-image"><img src={project.image} alt={project.name + " preview"} /></div>
                    </div>
                    <div style={{ padding: "0 20px 20px" }}>
                      <p className="mono muted" style={{ margin: 0 }}>File {String(index + 1).padStart(2, "0")}</p>
                      <div style={{ position: "relative", display: "inline-block", marginTop: 10, paddingRight: 24 }}>
                        <h3 className="project-title" style={{ margin: 0, fontSize: "1.8rem" }}>{project.name}</h3>
                        <span className="pen-line" style={{ left: 0, bottom: 0, width: "75%", transform: "rotate(-1deg)", background: index === 1 ? "rgba(127,146,121,0.6)" : "rgba(107,123,146,0.55)" }} />
                      </div>
                      <p className="project-copy" style={{ marginTop: 12 }}>{project.summary}</p>
                      <div className="tag-list" style={{ marginTop: 14 }}>
                        {project.tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                      <div className="project-meta" style={{ marginTop: 16 }}>
                        <p style={{ margin: 0, color: "var(--accent)", fontWeight: 700 }}>{project.linkLabel}</p>
                        <p className="muted" style={{ margin: "6px 0 0", fontSize: "0.82rem" }}>{project.url}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="lower-grid">
              <div className="paper-card">
                <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>{labels.experienceLabel}</p>
                <div className="timeline-list" style={{ marginTop: 16 }}>
                  {data.experience.map((item) => (
                    <article key={item.id} className="timeline-card" style={{ padding: 20 }}>
                      <div className="timeline-inner">
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <div>
                            <h3 style={{ margin: 0, fontSize: "1.05rem" }}>{item.role}</h3>
                            <p className="muted" style={{ margin: "4px 0 0" }}>{item.company}</p>
                          </div>
                          <p className="mono muted" style={{ margin: 0 }}>{item.period}</p>
                        </div>
                        <p className="body-copy" style={{ marginTop: 12 }}>{item.summary}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="stack">
                <div className="paper-card">
                  <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>{labels.skillsLabel}</p>
                  <div className="skills-groups" style={{ marginTop: 16 }}>
                    {data.skills.map((group) => (
                      <div key={group.id} className="skills-card">
                        <h3 style={{ margin: 0, fontSize: "1.05rem" }}>{group.title}</h3>
                        <div className="tag-list" style={{ marginTop: 12 }}>
                          {group.items.map((item) => (
                            <span key={item} className="tag">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="paper-card">
                  <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>{labels.educationLabel}</p>
                  <div className="education-list" style={{ marginTop: 16 }}>
                    {data.education.map((item) => (
                      <article key={item.id} className="education-card">
                        <h3 style={{ margin: 0, fontSize: "1.05rem" }}>{item.school}</h3>
                        <p className="muted" style={{ margin: "8px 0 0" }}>{item.degree}</p>
                        <p className="mono muted" style={{ margin: "12px 0 0" }}>{item.period}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="paper-card panel-stack" style={{ background: "linear-gradient(135deg,#faf5ed 0%,#f1e7d6 100%)" }}>
              <span className="thumbtack thumbtack-brass" style={{ left: 22, top: -8 }} />
              <span className="tape tape-rose" style={{ right: 32, top: -12, width: 78, height: 24, transform: "rotate(-8deg)" }} />
              <div className="contact-grid">
                <div>
                  <div className="contact-band mono">contact sheet</div>
                  <div style={{ position: "relative", display: "inline-block", marginTop: 16, paddingRight: 24 }}>
                    <h2 className="section-title" style={{ margin: 0 }}>{data.contact.heading}</h2>
                    <span className="pen-line" style={{ left: 4, bottom: 2, width: "52%", background: "rgba(107,123,146,0.55)" }} />
                  </div>
                  <p className="contact-copy" style={{ marginTop: 16 }}>{data.contact.message}</p>
                  <p className="handwritten" style={{ margin: "14px 0 0", fontSize: "1.3rem", lineHeight: 1 }}>open to internships</p>
                </div>
                <div className="stack">
                  <div className="contact-card" style={{ padding: 16 }}>
                    <span className="paperclip" style={{ right: 16, top: -16, transform: "rotate(8deg)" }} />
                    <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>{data.contact.ctaLabel}</p>
                    <p style={{ margin: "12px 0 0", fontSize: "1.12rem", fontWeight: 700 }}>{data.contact.email}</p>
                  </div>
                  <div className="contact-card" style={{ padding: 16, background: "#f2e7d7" }}>
                    <span className="tape" style={{ left: 18, top: -12, width: 58, height: 22, transform: "rotate(-8deg)" }} />
                    <p className="mono" style={{ color: "var(--accent)", margin: 0 }}>{labels.socialLinksLabel}</p>
                    <div className="social-list" style={{ marginTop: 12 }}>
                      {data.socialLinks.map((link) => (
                        <div key={"contact-" + link.id} className="social-item" style={{ padding: 12 }}>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem" }}>{link.label}</p>
                          <p className="muted" style={{ margin: "4px 0 0", fontSize: "0.8rem" }}>{link.url}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <footer className="footer-card">
              <span className="thumbtack thumbtack-rose" style={{ left: 22, top: -8 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p className="body-copy" style={{ margin: 0 }}>{data.footer.note}</p>
                <div style={{ position: "relative", display: "inline-block", width: "fit-content" }}>
                  <p className="mono" style={{ margin: 0, color: "var(--accent)" }}>{data.footer.watermark}</p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
`;
}
