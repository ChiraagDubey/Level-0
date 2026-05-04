export function createArcadeNeonGlobalsCss() {
  return `@import url("https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&display=swap");

:root {
  color-scheme: dark;
  --page: #05060f;
  --surface: linear-gradient(180deg, rgba(13, 9, 29, 0.96), rgba(6, 6, 18, 0.98));
  --line: rgba(255, 255, 255, 0.08);
  --ink: #ffffff;
  --muted: rgba(255, 255, 255, 0.68);
  --pink: #ff4fd8;
  --cyan: #2de2ff;
  --purple: #8b5cf6;
  --yellow: #ffd166;
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
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(circle at top left, rgba(255, 79, 216, 0.18), transparent 26%),
    radial-gradient(circle at top right, rgba(45, 226, 255, 0.12), transparent 22%),
    linear-gradient(rgba(81, 115, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(81, 115, 255, 0.08) 1px, transparent 1px),
    linear-gradient(180deg, #090814 0%, #05060f 100%);
  background-size: auto, auto, 44px 44px, 44px 44px, auto;
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

.portfolio-stack {
  position: relative;
  display: grid;
  gap: 24px;
}

.panel {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 30px;
  background: var(--surface);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03);
  padding: 20px;
}

.panel::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 79, 216, 0.92), rgba(45, 226, 255, 0.62), rgba(139, 92, 246, 0));
}

.hero-panel {
  border-radius: 34px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03), 0 0 36px rgba(255, 79, 216, 0.12);
}

.hero-grid,
.story-grid,
.xp-grid,
.social-grid,
.contact-grid,
.stat-grid,
.edu-grid {
  display: grid;
  gap: 16px;
}

.display {
  font-family: "Pixelify Sans", "Courier New", monospace;
}

.hero-tag,
.hero-badge,
.skill-badge,
.timeline-badge,
.contact-badge,
.channel-badge,
.mission-badge,
.chip,
.tag,
.button-primary,
.button-secondary,
.button-static {
  font-family: "Pixelify Sans", "Courier New", monospace;
}

.hero-tag,
.hero-badge,
.mission-count,
.skill-badge,
.timeline-badge,
.contact-badge,
.channel-badge,
.chip,
.tag {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid transparent;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.avatar-frame,
.contact-frame,
.project-border {
  border-radius: 32px;
  padding: 1px;
}

.avatar-frame,
.contact-frame {
  background: linear-gradient(135deg, rgba(255, 79, 216, 0.96), rgba(45, 226, 255, 0.9) 52%, rgba(139, 92, 246, 0.95));
}

.avatar-frame {
  box-shadow: 0 0 30px rgba(255, 79, 216, 0.2);
}

.contact-frame {
  box-shadow: 0 0 30px rgba(255, 79, 216, 0.14);
}

.avatar-shell,
.contact-shell {
  position: relative;
  height: 100%;
  border-radius: 32px;
  background: #090816;
  padding: 16px;
}

.contact-shell {
  border-radius: 26px;
  background: #070812;
  padding: 20px;
}

.avatar-top,
.section-head,
.mission-top,
.row-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-tag {
  border-color: rgba(255, 79, 216, 0.4);
  background: #17091b;
  color: #ff9ae9;
  padding: 10px 16px;
  font-size: 0.95rem;
  box-shadow: 0 0 16px rgba(255, 79, 216, 0.18);
}

.hero-badge {
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, #070812);
  color: var(--accent);
  padding: 10px 16px;
  font-size: 0.95rem;
}

.avatar-heart {
  color: rgba(255, 255, 255, 0.22);
  font-size: 0.95rem;
}

.avatar-heart.is-active {
  color: var(--pink);
}

.avatar-image-wrap {
  position: relative;
  margin-top: 16px;
}

.avatar-image-wrap::before {
  content: "";
  position: absolute;
  inset: 16px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.avatar-floating,
.avatar-sync {
  position: absolute;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
}

.avatar-floating {
  left: 24px;
  top: 24px;
  color: var(--yellow);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.avatar-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--pink);
  box-shadow: 0 0 12px var(--pink);
}

.avatar-sync {
  right: 24px;
  bottom: 24px;
  border: 1px solid rgba(45, 226, 255, 0.4);
  background: rgba(7, 17, 31, 0.9);
  color: #7af1ff;
  padding: 6px 12px;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.image-card {
  min-height: 360px;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #090816;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}

.mini-grid {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.mini-card,
.stat-card,
.progress-card,
.skill-card,
.timeline-card,
.edu-card,
.social-card,
.note-card,
.contact-channel {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.03);
}

.mini-card,
.stat-card,
.progress-card,
.skill-card,
.timeline-card,
.edu-card,
.social-card,
.note-card {
  padding: 16px;
}

.mini-label,
.section-label,
.mission-label,
.stat-label,
.ui-label,
.watermark {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.mini-label,
.section-label,
.mission-label,
.stat-label,
.ui-label,
.watermark,
.hero-subtitle,
.mission-name,
.section-title,
.contact-title,
.social-name,
.edu-name,
.xp-company {
  font-family: "Pixelify Sans", "Courier New", monospace;
}

.hero-title {
  margin: 24px 0 0;
  font-size: clamp(3rem, 7vw, 5.8rem);
  line-height: 0.9;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero-subtitle {
  margin: 20px 0 0;
  max-width: 760px;
  color: #7af1ff;
  font-size: clamp(1.05rem, 2.8vw, 1.35rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.copy,
.story-copy,
.project-copy,
.meta-copy,
.footer-copy {
  color: var(--muted);
  line-height: 1.85;
}

.copy {
  margin: 20px 0 0;
  max-width: 760px;
}

.hero-actions,
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
  font-size: 0.92rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.button-shell-primary {
  border-radius: 999px;
  padding: 1px;
  background: linear-gradient(135deg, var(--accent), rgba(255, 79, 216, 0.82));
  box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 22%, transparent);
}

.button-primary,
.button-static {
  background: var(--accent);
  color: var(--accent-text);
}

.button-shell-secondary {
  border-radius: 999px;
  border: 1px solid rgba(45, 226, 255, 0.35);
  background: #08111f;
  padding: 4px;
  box-shadow: 0 0 20px rgba(45, 226, 255, 0.12);
}

.button-secondary {
  border: none;
  background: white;
  color: #08111f;
}

.stat-grid {
  gap: 12px;
}

.stat-card {
  box-shadow: 0 0 18px rgba(255, 79, 216, 0.1);
}

.stat-value,
.mini-value,
.xp-pill,
.mission-name,
.section-title,
.contact-title,
.social-name,
.edu-name,
.xp-company {
  color: #ffffff;
}

.stat-value {
  margin: 12px 0 0;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.progress-card {
  background: rgba(8, 10, 22, 0.9);
}

.progress-track {
  margin-top: 12px;
  height: 12px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #ff4fd8 0%, #2de2ff 54%, #ffd166 100%);
  box-shadow: 0 0 18px rgba(255, 79, 216, 0.28);
}

.section-label {
  margin: 0;
}

.section-line {
  height: 1px;
  flex: 1;
}

.section-title,
.contact-title {
  margin: 20px 0 0;
  font-size: clamp(2.2rem, 4vw, 3rem);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.info-grid {
  display: grid;
  gap: 16px;
  margin-top: 24px;
}

.skill-card {
  background: rgba(10, 10, 25, 0.9);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

.skill-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.skill-badge {
  border-color: rgba(139, 92, 246, 0.4);
  background: #130d24;
  color: #c4b5fd;
  padding: 6px 12px;
  font-size: 0.75rem;
}

.pill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.chip,
.tag {
  padding: 8px 12px;
  font-size: 0.85rem;
}

.chip.tone-pink,
.tag.tone-pink {
  border-color: rgba(255, 79, 216, 0.34);
  background: rgba(255, 79, 216, 0.1);
  color: #ff9ae9;
}

.chip.tone-cyan,
.tag.tone-cyan {
  border-color: rgba(45, 226, 255, 0.3);
  background: rgba(45, 226, 255, 0.08);
  color: #7af1ff;
}

.chip.tone-purple,
.tag.tone-purple {
  border-color: rgba(139, 92, 246, 0.3);
  background: rgba(139, 92, 246, 0.08);
  color: #c4b5fd;
}

.project-section {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03), 0 0 32px rgba(255, 79, 216, 0.1);
}

.project-grid {
  display: grid;
  gap: 20px;
  margin-top: 24px;
}

.project-card {
  display: grid;
  gap: 16px;
  height: 100%;
  border-radius: 28px;
  background: #080815;
  padding: 16px;
}

.mission-label {
  color: #ff9ae9;
}

.mission-name,
.xp-company,
.edu-name,
.social-name {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2rem);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.mission-arrow {
  color: #7af1ff;
  font-size: 1.15rem;
}

.project-image-wrap {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  background: #060913;
  padding: 8px;
}

.project-image {
  min-height: 210px;
  overflow: hidden;
  border-radius: 18px;
}

.project-shell {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  background: #090c18;
  padding: 16px;
}

.project-url {
  margin: 12px 0 0;
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.8rem;
  line-height: 1.7;
  word-break: break-all;
}

.timeline-list {
  position: relative;
  display: grid;
  gap: 16px;
  margin-top: 24px;
  padding-left: 24px;
}

.timeline-list::before {
  content: "";
  position: absolute;
  left: 11px;
  top: 12px;
  bottom: 12px;
  width: 1px;
  background: linear-gradient(180deg, rgba(255, 79, 216, 0.75), rgba(45, 226, 255, 0.5), rgba(139, 92, 246, 0.18));
}

.timeline-card {
  position: relative;
  background: rgba(9, 9, 23, 0.92);
}

.timeline-dot {
  position: absolute;
  left: -22px;
  top: 20px;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 2px solid #05060f;
  background: var(--pink);
  box-shadow: 0 0 16px rgba(255, 79, 216, 0.8);
}

.timeline-badge {
  padding: 6px 12px;
  font-size: 0.75rem;
}

.timeline-badge.tone-yellow {
  border-color: rgba(255, 209, 102, 0.35);
  background: #1a1205;
  color: #ffd166;
}

.timeline-badge.tone-purple {
  border-color: rgba(139, 92, 246, 0.35);
  background: #130d24;
  color: #c4b5fd;
}

.timeline-badge.tone-pink {
  border-color: rgba(255, 79, 216, 0.35);
  background: #160818;
  color: #ff9ae9;
}

.timeline-meta {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.timeline-period,
.edu-period {
  color: rgba(255, 255, 255, 0.56);
  font-size: 0.75rem;
}

.contact-panel {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03), 0 0 34px rgba(255, 79, 216, 0.1);
}

.contact-badge {
  padding: 6px 12px;
  font-size: 0.75rem;
}

.contact-badge.tone-yellow {
  border-color: rgba(255, 209, 102, 0.35);
  background: #1b1205;
  color: #ffd166;
}

.contact-badge.tone-accent {
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, #070812);
  color: var(--accent);
}

.contact-info {
  margin-top: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.03);
  padding: 16px;
}

.contact-actions {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.social-card {
  background: rgba(9, 9, 23, 0.92);
}

.channel-badge {
  font-size: 0.75rem;
}

.footer-card {
  border-radius: 28px;
  background: rgba(7, 8, 18, 0.95);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.08);
}

.footer-copy {
  margin: 0;
}

.watermark {
  display: block;
  margin-top: 16px;
  color: #ff9ae9;
}

@media (min-width: 720px) {
  .mini-grid,
  .info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 900px) {
  .hero-grid {
    grid-template-columns: 0.88fr 1.12fr;
  }

  .stat-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .story-grid {
    grid-template-columns: 0.92fr 1.08fr;
  }

  .xp-grid {
    grid-template-columns: 1.05fr 0.95fr;
  }

  .contact-grid {
    grid-template-columns: 0.95fr 1.05fr;
  }

  .social-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .edu-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .project-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}`;
}

export function createArcadeNeonPortfolioTemplateFile() {
  return `import type { CSSProperties } from "react";

type PortfolioData = typeof import("../data/portfolio").portfolio;

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

function missionGradient(index: number) {
  if (index % 3 === 0) {
    return "linear-gradient(135deg, rgba(255,79,216,0.95), rgba(45,226,255,0.4) 55%, rgba(139,92,246,0.92))";
  }

  if (index % 3 === 1) {
    return "linear-gradient(135deg, rgba(45,226,255,0.92), rgba(139,92,246,0.45) 52%, rgba(255,79,216,0.88))";
  }

  return "linear-gradient(135deg, rgba(139,92,246,0.94), rgba(255,79,216,0.45) 52%, rgba(45,226,255,0.8))";
}

function toneClass(index: number) {
  if (index % 3 === 0) {
    return "tone-pink";
  }

  if (index % 3 === 1) {
    return "tone-cyan";
  }

  return "tone-purple";
}

export function PortfolioTemplate({ data }: { data: PortfolioData }) {
  const arcadeNeonMeta = ((data as PortfolioData & { arcadeNeonMeta?: ArcadeNeonMeta }).arcadeNeonMeta ?? {}) as ArcadeNeonMeta;
  const accent = data.theme.accentName === "monochrome" ? "#ffe5f7" : data.theme.accentColor;
  const totalSkillItems = data.skills.reduce((sum, group) => sum + group.items.length, 0);
  const currentLevel = Math.min(99, 12 + data.projects.length * 4 + data.experience.length * 7 + data.education.length * 3);
  const currentXp = 1800 + data.projects.length * 2150 + data.experience.length * 2600 + totalSkillItems * 320;
  const xpGoal = Math.max(12000, Math.ceil((currentXp + 3200) / 5000) * 5000);
  const xpProgress = Math.min(100, Math.round((currentXp / xpGoal) * 100));
  const onlineHearts = Math.min(5, Math.max(3, data.projects.length + data.experience.length));
  const themeStyle = {
    ["--accent" as string]: accent,
    ["--accent-text" as string]: isLightColor(accent) ? "#111111" : "#ffffff",
  } as CSSProperties;

  const playerStats = [
    { label: "Level", value: arcadeNeonMeta.level ?? currentLevel.toString().padStart(2, "0"), tone: "#ff4fd8" },
    { label: "XP", value: arcadeNeonMeta.xp ?? \`\${currentXp.toLocaleString()} / \${xpGoal.toLocaleString()}\`, tone: "#2de2ff" },
    { label: "Missions", value: arcadeNeonMeta.missions ?? \`\${data.projects.length.toString().padStart(2, "0")} loaded\`, tone: "#8b5cf6" },
    { label: "Status", value: data.about.availability, tone: accent },
  ];

  return (
    <main className="portfolio-shell" style={themeStyle}>
      <div className="portfolio-stack">
        <section className="panel hero-panel">
          <div className="hero-grid">
            <div className="avatar-frame">
              <div className="avatar-shell">
                <div className="avatar-top">
                  <span className="display mini-label" style={{ color: "#ff9ae9" }}>Avatar Deck</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index} className={\`display avatar-heart \${index < onlineHearts ? "is-active" : ""}\`}>+</span>
                    ))}
                  </div>
                </div>

                <div className="avatar-image-wrap">
                  <div className="avatar-floating display"><span className="avatar-dot" />READY</div>
                  <div className="avatar-sync display">SYNC 99%</div>
                  <div className="image-card">
                    <img src={data.hero.profileImage} alt={data.hero.name} />
                  </div>
                </div>

                <div className="mini-grid">
                  <div className="mini-card">
                    <p className="display mini-label" style={{ color: "#ff9ae9", margin: 0 }}>Call Sign</p>
                    <p className="display mini-value" style={{ margin: "8px 0 0", fontSize: "1rem" }}>{data.hero.eyebrow}</p>
                  </div>
                  <div className="mini-card">
                    <p className="display mini-label" style={{ color: "#7af1ff", margin: 0 }}>Zone</p>
                    <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.84)" }}>{data.about.location}</p>
                  </div>
                  <div className="mini-card">
                    <p className="display mini-label" style={{ color: "rgba(255,255,255,0.7)", margin: 0 }}>Core</p>
                    <p className="display mini-value" style={{ margin: "8px 0 0", fontSize: "1rem", color: "#c4b5fd" }}>{totalSkillItems.toString().padStart(2, "0")} boosts</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24 }}>
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <span className="hero-tag">Player 01</span>
                  <span className="hero-badge">{data.hero.eyebrow}</span>
                </div>
                <h1 className="display hero-title">{data.hero.name}</h1>
                <p className="display hero-subtitle">{data.hero.title}</p>
                <p className="copy">{data.hero.intro}</p>
              </div>

              <div style={{ display: "grid", gap: 20 }}>
                <div className="hero-actions">
                  <div className="button-shell-primary">
                    <a className="button-primary" href={data.hero.resumeUrl} target="_blank" rel="noreferrer">
                      {data.hero.resumeLabel}
                    </a>
                  </div>
                  <div className="button-shell-secondary">
                    <a className="button-secondary" href={data.hero.socialsUrl} target="_blank" rel="noreferrer">
                      {data.hero.socialsLabel}
                    </a>
                  </div>
                </div>

                <div className="stat-grid">
                  {playerStats.map((stat) => (
                    <div key={stat.label} className="stat-card" style={{ boxShadow: \`0 0 18px \${stat.tone}18\` }}>
                      <p className="display stat-label" style={{ color: stat.tone, margin: 0 }}>{stat.label}</p>
                      <p className="display stat-value">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="progress-card">
                  <div className="row-head">
                    <p className="display ui-label" style={{ color: "#ffd166", margin: 0 }}>XP Loadout</p>
                    <p className="display ui-label" style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>{xpProgress}% synced</p>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: \`\${xpProgress}%\` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="story-grid">
          <div className="panel">
            <div className="section-head">
              <p className="display section-label" style={{ color: "#ff9ae9" }}>Origin Story</p>
              <span className="section-line" style={{ background: "linear-gradient(90deg, rgba(255,79,216,0.6), rgba(255,79,216,0))" }} />
            </div>
            <h2 className="display section-title">{data.about.heading}</h2>
            <p className="story-copy">{data.about.body}</p>

            <div className="info-grid">
              <div className="mini-card">
                <p className="display mini-label" style={{ color: "#7af1ff", margin: 0 }}>Zone Lock</p>
                <p style={{ margin: "12px 0 0", color: "rgba(255,255,255,0.82)" }}>{data.about.location}</p>
              </div>
              <div className="mini-card">
                <p className="display mini-label" style={{ color: accent, margin: 0 }}>Status</p>
                <p style={{ margin: "12px 0 0", color: "rgba(255,255,255,0.82)" }}>{data.about.availability}</p>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="section-head">
              <p className="display section-label" style={{ color: "#7af1ff" }}>Power-Ups</p>
              <span className="section-line" style={{ background: "linear-gradient(90deg, rgba(45,226,255,0.6), rgba(45,226,255,0))" }} />
            </div>
            <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
              {data.skills.map((group) => (
                <div key={group.id} className="skill-card">
                  <div className="skill-row">
                    <h3 className="display mission-name">{group.title}</h3>
                    <span className="skill-badge">+{group.items.length.toString().padStart(2, "0")} mods</span>
                  </div>
                  <div className="pill-list">
                    {group.items.map((item, index) => (
                      <span key={item} className={\`chip \${toneClass(index)}\`}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel project-section">
          <div className="row-head">
            <div>
              <p className="display section-label" style={{ color: "#ff9ae9", margin: 0 }}>Missions</p>
              <h2 className="display section-title" style={{ marginTop: 16 }}>Select a mission path</h2>
            </div>
            <span className="hero-badge mission-count" style={{ borderColor: "rgba(45,226,255,0.35)", background: "#09111d", color: "#7af1ff" }}>
              {data.projects.length.toString().padStart(2, "0")} missions
            </span>
          </div>

          <div className="project-grid">
            {data.projects.map((project, index) => (
              <article key={project.id} className="project-border" style={{ background: missionGradient(index), boxShadow: "0 0 28px rgba(255,79,216,0.12)" }}>
                <div className="project-card">
                  <div className="mission-top">
                    <span className="display mission-label">Mission {(index + 1).toString().padStart(2, "0")}</span>
                    <span className="display mission-arrow">^</span>
                  </div>

                  <div className="project-image-wrap">
                    <div className="project-image">
                      <img src={project.image} alt={project.name} />
                    </div>
                  </div>

                  <div>
                    <h3 className="display mission-name">{project.name}</h3>
                    <p className="project-copy">{project.summary}</p>
                    <div className="tag-list">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tag} className={\`tag \${tagIndex % 2 === 0 ? "tone-cyan" : "tone-pink"}\`}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-shell" style={{ marginTop: 16 }}>
                      <span className="display ui-label" style={{ color: accent }}>{project.linkLabel}</span>
                      <p className="project-url">{project.url}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="xp-grid">
          <div className="panel">
            <div className="section-head">
              <p className="display section-label" style={{ color: "#7af1ff" }}>XP Timeline</p>
              <span className="section-line" style={{ background: "linear-gradient(90deg, rgba(45,226,255,0.6), rgba(45,226,255,0))" }} />
            </div>

            <div className="timeline-list">
              {data.experience.map((item, index) => (
                <div key={item.id} className="timeline-card">
                  <span className="timeline-dot" />
                  <div className="row-head">
                    <div>
                      <h3 className="display xp-company">{item.company}</h3>
                      <p style={{ margin: "8px 0 0", color: "#7af1ff", fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.role}</p>
                    </div>
                    <p className="display timeline-period" style={{ margin: 0 }}>{item.period}</p>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-badge tone-yellow">+{(index + 2) * 900} XP</span>
                    <span className="timeline-badge tone-purple">checkpoint {(index + 1).toString().padStart(2, "0")}</span>
                  </div>
                  <p className="meta-copy" style={{ margin: "16px 0 0" }}>{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="section-head">
              <p className="display section-label" style={{ color: "#c4b5fd" }}>Training Grounds</p>
              <span className="section-line" style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.6), rgba(139,92,246,0))" }} />
            </div>

            <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
              {data.education.map((item, index) => (
                <div key={item.id} className="edu-card">
                  <div className="row-head">
                    <span className="timeline-badge tone-pink">training {(index + 1).toString().padStart(2, "0")}</span>
                    <p className="display edu-period" style={{ margin: 0 }}>{item.period}</p>
                  </div>
                  <h3 className="display edu-name" style={{ marginTop: 16 }}>{item.school}</h3>
                  <p className="meta-copy" style={{ margin: "12px 0 0" }}>{item.degree}</p>
                </div>
              ))}

              <div className="note-card" style={{ borderColor: "rgba(45,226,255,0.24)", background: "rgba(7,17,30,0.88)" }}>
                <p className="display ui-label" style={{ color: "#7af1ff", margin: 0 }}>Loadout Note</p>
                <p className="meta-copy" style={{ margin: "12px 0 0", color: "rgba(255,255,255,0.72)" }}>{data.footer.note}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel contact-panel">
          <div className="section-head">
            <p className="display section-label" style={{ color: "#ff9ae9" }}>Final Checkpoint</p>
            <span className="section-line" style={{ background: "linear-gradient(90deg, rgba(255,79,216,0.6), rgba(255,79,216,0))" }} />
          </div>

          <div className="contact-grid" style={{ marginTop: 20 }}>
            <div className="contact-frame">
              <div className="contact-shell">
                <div className="row-head">
                  <span className="contact-badge tone-yellow">checkpoint locked</span>
                  <span className="contact-badge tone-accent">status online</span>
                </div>

                <h2 className="display contact-title">{data.contact.heading}</h2>
                <p className="copy" style={{ marginTop: 20 }}>{data.contact.message}</p>

                <div className="contact-info">
                  <p className="display ui-label" style={{ color: "#7af1ff", margin: 0 }}>Direct Channel</p>
                  <p style={{ margin: "12px 0 0", fontWeight: 700, wordBreak: "break-all" }}>{data.contact.email}</p>
                </div>

                <div className="contact-actions">
                  <span className="button-static">{data.contact.ctaLabel}</span>
                  <span className="hero-badge" style={{ borderColor: "rgba(45,226,255,0.35)", background: "#08111f", color: "#7af1ff" }}>response window open</span>
                </div>
              </div>
            </div>

            <div className="social-grid">
              {data.socialLinks.map((link, index) => (
                <div key={link.id} className="social-card">
                  <p className="display channel-badge" style={{ margin: 0, color: index === 1 ? "#7af1ff" : "#ff9ae9" }}>
                    channel {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <h3 className="display social-name" style={{ marginTop: 20 }}>{link.label}</h3>
                  <p className="meta-copy" style={{ margin: "12px 0 0", wordBreak: "break-all" }}>{link.url}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="panel footer-card">
          <p className="footer-copy">{data.footer.note}</p>
          <span className="watermark">{data.footer.watermark}</span>
        </footer>
      </div>
    </main>
  );
}
`;
}

