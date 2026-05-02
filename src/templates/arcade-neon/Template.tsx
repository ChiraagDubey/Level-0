"use client";

import { Pixelify_Sans } from "next/font/google";
import { createElement, type CSSProperties, type ElementType } from "react";
import { EditableImage } from "@/components/editor/EditableImage";
import { EditableLinkButton } from "@/components/editor/EditableLinkButton";
import { EditableText } from "@/components/editor/EditableText";
import type { PortfolioData } from "@/types/portfolio";

const pixelFont = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface ArcadeNeonTemplateProps {
  data: PortfolioData;
  editable?: boolean;
  onTextEdit?: (path: Array<string | number>, value: string) => void;
  onImageEdit?: (path: Array<string | number>, value: string) => void;
}

interface ArcadeNeonMeta {
  level?: string;
  xp?: string;
  missions?: string;
}

function withAlpha(color: string, alpha: string) {
  return color.startsWith("#") && color.length === 7 ? `${color}${alpha}` : color;
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

function joinClasses(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function ArcadeNeonTemplate({
  data,
  editable = false,
  onTextEdit,
  onImageEdit,
}: ArcadeNeonTemplateProps) {
  const arcadeNeonMeta = ((data as PortfolioData & { arcadeNeonMeta?: ArcadeNeonMeta }).arcadeNeonMeta ?? {}) as ArcadeNeonMeta;
  const accent = data.theme.accentName === "monochrome" ? "#ffe5f7" : data.theme.accentColor;
  const accentButtonTextClassName = isLightColor(accent) ? "text-ink" : "text-white";
  const totalSkillItems = data.skills.reduce((sum, group) => sum + group.items.length, 0);
  const currentLevel = Math.min(99, 12 + data.projects.length * 4 + data.experience.length * 7 + data.education.length * 3);
  const currentXp = 1800 + data.projects.length * 2150 + data.experience.length * 2600 + totalSkillItems * 320;
  const xpGoal = Math.max(12000, Math.ceil((currentXp + 3200) / 5000) * 5000);
  const xpProgress = Math.min(100, Math.round((currentXp / xpGoal) * 100));
  const onlineHearts = Math.min(5, Math.max(3, data.projects.length + data.experience.length));
  const missionsCleared = `${data.projects.length.toString().padStart(2, "0")} loaded`;
  const displayFontClassName = pixelFont.className;
  const panelBackground = "linear-gradient(180deg, rgba(13,9,29,0.96), rgba(6,6,18,0.98))";
  const chromeGradient = "linear-gradient(135deg, rgba(255,79,216,0.96), rgba(45,226,255,0.9) 52%, rgba(139,92,246,0.95))";
  const sectionLine = "linear-gradient(90deg, rgba(255,79,216,0.92), rgba(45,226,255,0.62), rgba(139,92,246,0))";
  const themeStyle = {
    ["--accent" as string]: accent,
    ["--accent-soft" as string]: withAlpha(accent, "18"),
    ["--accent-line" as string]: withAlpha(accent, "46"),
    ["--neon-pink" as string]: "#ff4fd8",
    ["--neon-cyan" as string]: "#2de2ff",
    ["--neon-purple" as string]: "#8b5cf6",
    ["--neon-yellow" as string]: "#ffd166",
  } as CSSProperties;

  const renderText = ({
    path,
    value,
    className,
    as = "p",
    multiline = false,
    placeholder,
  }: {
    path: Array<string | number>;
    value: string;
    className?: string;
    as?: ElementType;
    multiline?: boolean;
    placeholder?: string;
  }) => {
    if (editable && onTextEdit) {
      return (
        <EditableText
          value={value}
          onSave={(nextValue) => onTextEdit(path, nextValue)}
          className={className}
          as={as}
          multiline={multiline}
          placeholder={placeholder}
        />
      );
    }

    return createElement(as, { className }, value);
  };

  const renderImage = (path: Array<string | number>, src: string, alt: string, className?: string) => {
    if (editable && onImageEdit) {
      return <EditableImage src={src} alt={alt} className={className} onChange={(nextValue) => onImageEdit(path, nextValue)} />;
    }

    return (
      <div
        className={joinClasses("overflow-hidden rounded-[28px] border bg-[#090816]", className)}
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  };

  const playerStats = [
    { label: "Level", value: arcadeNeonMeta.level ?? `${currentLevel.toString().padStart(2, "0")}`, tone: "#ff4fd8", path: ["arcadeNeonMeta", "level"] as Array<string | number> },
    { label: "XP", value: arcadeNeonMeta.xp ?? `${currentXp.toLocaleString()} / ${xpGoal.toLocaleString()}`, tone: "#2de2ff", path: ["arcadeNeonMeta", "xp"] as Array<string | number> },
    { label: "Missions", value: arcadeNeonMeta.missions ?? missionsCleared, tone: "#8b5cf6", path: ["arcadeNeonMeta", "missions"] as Array<string | number> },
    { label: "Status", value: data.about.availability, tone: accent, path: ["about", "availability"] as Array<string | number> },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-[38px] border p-5 text-white shadow-panel md:p-7"
      style={{
        ...themeStyle,
        borderColor: "rgba(255,255,255,0.08)",
        backgroundColor: "#05060f",
        backgroundImage:
          "radial-gradient(circle at top left, rgba(255,79,216,0.18), transparent 26%), radial-gradient(circle at top right, rgba(45,226,255,0.12), transparent 22%), linear-gradient(rgba(81,115,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(81,115,255,0.08) 1px, transparent 1px), linear-gradient(180deg, #090814 0%, #05060f 100%)",
        backgroundSize: "auto, auto, 44px 44px, 44px 44px, auto",
        boxShadow: "0 36px 120px rgba(2, 5, 16, 0.78)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(255,79,216,0.18),_transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(45,226,255,0.18),_transparent_68%)] blur-3xl" />

      <div className="relative z-10 grid gap-6">
        <section
          className="relative overflow-hidden rounded-[34px] border p-5 md:p-7"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: panelBackground,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 0 36px rgba(255,79,216,0.12)",
          }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: sectionLine }} />
          <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,_rgba(139,92,246,0.18),_transparent_72%)] blur-2xl" />

          <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
            <div className="rounded-[32px] p-[1px]" style={{ background: chromeGradient, boxShadow: "0 0 30px rgba(255,79,216,0.2)" }}>
              <div className="relative h-full rounded-[32px] bg-[#090816] p-4 md:p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className={joinClasses(displayFontClassName, "text-xs uppercase tracking-[0.2em] text-[#ff9ae9]")}>Avatar Deck</span>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={`hero-heart-${index}`}
                        className={joinClasses(displayFontClassName, "text-sm")}
                        style={{ color: index < onlineHearts ? "#ff4fd8" : "rgba(255,255,255,0.22)" }}
                      >
                        +
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative mt-4">
                  <div className="pointer-events-none absolute inset-4 rounded-[28px] border border-white/10" />
                  <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff4fd8] shadow-[0_0_12px_#ff4fd8]" />
                    <span className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-[#ffd166]")}>ready</span>
                  </div>
                  <div className="pointer-events-none absolute bottom-6 right-6 rounded-full border border-[#2de2ff]/40 bg-[#07111f]/90 px-3 py-1">
                    <span className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-[#7af1ff]")}>sync 99%</span>
                  </div>
                  {renderImage(["hero", "profileImage"], data.hero.profileImage, `${data.hero.name} player profile`, "min-h-[360px] rounded-[28px]")}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[20px] border border-white/10 bg-white/[0.03] px-3 py-3">
                    <p className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-[#ff9ae9]")}>Call Sign</p>
                    {renderText({
                      path: ["hero", "eyebrow"],
                      value: data.hero.eyebrow,
                      as: "p",
                      className: joinClasses(displayFontClassName, "mt-2 text-base text-white"),
                    })}
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-white/[0.03] px-3 py-3">
                    <p className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-[#7af1ff]")}>Zone</p>
                    {renderText({
                      path: ["about", "location"],
                      value: data.about.location,
                      as: "p",
                      className: "mt-2 text-sm font-medium text-white/84",
                    })}
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-white/[0.03] px-3 py-3">
                    <p className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-white/70")}>Core</p>
                    <p className={joinClasses(displayFontClassName, "mt-2 text-base text-[#c4b5fd]")}>{totalSkillItems.toString().padStart(2, "0")} boosts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={joinClasses(displayFontClassName, "rounded-full border border-[#ff4fd8]/40 bg-[#17091b] px-4 py-2 text-sm uppercase tracking-[0.18em] text-[#ff9ae9] shadow-[0_0_16px_rgba(255,79,216,0.18)]")}>
                    Player 01
                  </span>
                  <span className={joinClasses(displayFontClassName, "rounded-full border border-[var(--accent-line)] bg-[var(--accent-soft)] px-4 py-2 text-sm uppercase tracking-[0.18em]")} style={{ color: accent }}>
                    {renderText({
                      path: ["hero", "eyebrow"],
                      value: data.hero.eyebrow,
                      as: "span",
                    })}
                  </span>
                </div>

                {renderText({
                  path: ["hero", "name"],
                  value: data.hero.name,
                  as: "h1",
                  className: joinClasses(displayFontClassName, "mt-6 text-5xl uppercase leading-[0.9] tracking-[0.04em] text-white md:text-7xl"),
                })}

                {renderText({
                  path: ["hero", "title"],
                  value: data.hero.title,
                  as: "p",
                  className: "mt-5 max-w-3xl text-lg font-semibold uppercase tracking-[0.12em] text-[#7af1ff] md:text-[1.35rem]",
                  multiline: true,
                })}

                {renderText({
                  path: ["hero", "intro"],
                  value: data.hero.intro,
                  as: "p",
                  className: "mt-5 max-w-2xl text-sm leading-7 text-white/72 md:text-base",
                  multiline: true,
                })}
              </div>

              <div className="space-y-5">
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-full p-[1px]" style={{ background: `linear-gradient(135deg, ${accent}, rgba(255,79,216,0.82))`, boxShadow: `0 0 24px ${withAlpha(accent, "2a")}` }}>
                    <EditableLinkButton
                      href={data.hero.resumeUrl}
                      editable={editable}
                      onHrefSave={onTextEdit ? (nextValue) => onTextEdit(["hero", "resumeUrl"], nextValue) : undefined}
                      variant="primary"
                      accentColor={accent}
                      editLabel="Resume link"
                    >
                      <span className={joinClasses(displayFontClassName, "uppercase tracking-[0.16em]")}>
                        {renderText({
                          path: ["hero", "resumeLabel"],
                          value: data.hero.resumeLabel,
                          as: "span",
                        })}
                      </span>
                    </EditableLinkButton>
                  </div>

                  <div className="rounded-full border border-[#2de2ff]/35 bg-[#08111f] p-1 shadow-[0_0_20px_rgba(45,226,255,0.12)]">
                    <EditableLinkButton
                      href={data.hero.socialsUrl}
                      editable={editable}
                      onHrefSave={onTextEdit ? (nextValue) => onTextEdit(["hero", "socialsUrl"], nextValue) : undefined}
                      variant="secondary"
                      accentColor={accent}
                      editLabel="Social hub link"
                    >
                      <span className={joinClasses(displayFontClassName, "uppercase tracking-[0.16em] text-[#08111f]")}>
                        {renderText({
                          path: ["hero", "socialsLabel"],
                          value: data.hero.socialsLabel,
                          as: "span",
                        })}
                      </span>
                    </EditableLinkButton>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {playerStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4"
                      style={{ boxShadow: `0 0 18px ${withAlpha(stat.tone, "18")}` }}
                    >
                      <p className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em]")} style={{ color: stat.tone }}>
                        {stat.label}
                      </p>
                      {stat.path
                        ? renderText({
                            path: stat.path,
                            value: stat.value,
                            as: "p",
                            className: joinClasses(displayFontClassName, "mt-3 text-lg uppercase text-white md:text-xl"),
                            multiline: true,
                          })
                        : (
                            <p className={joinClasses(displayFontClassName, "mt-3 text-lg uppercase text-white md:text-xl")}>{stat.value}</p>
                          )}
                    </div>
                  ))}
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#080a16]/90 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-[#ffd166]")}>XP Loadout</p>
                    <p className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-white/60")}>{xpProgress}% synced</p>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${xpProgress}%`,
                        background: "linear-gradient(90deg, #ff4fd8 0%, #2de2ff 54%, #ffd166 100%)",
                        boxShadow: "0 0 18px rgba(255,79,216,0.28)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div
            className="relative overflow-hidden rounded-[30px] border p-5 md:p-6"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: panelBackground,
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 0 28px rgba(139,92,246,0.08)",
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: sectionLine }} />
            <div className="flex items-center gap-3">
              <p className={joinClasses(displayFontClassName, "text-sm uppercase tracking-[0.18em] text-[#ff9ae9]")}>Origin Story</p>
              <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,79,216,0.6), rgba(255,79,216,0))" }} />
            </div>
            {renderText({
              path: ["about", "heading"],
              value: data.about.heading,
              as: "h2",
              className: joinClasses(displayFontClassName, "mt-5 text-3xl uppercase tracking-[0.04em] text-white md:text-[2.2rem]"),
            })}
            {renderText({
              path: ["about", "body"],
              value: data.about.body,
              as: "p",
              className: "mt-5 text-sm leading-7 text-white/70 md:text-base",
              multiline: true,
            })}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                <p className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-[#7af1ff]")}>Zone Lock</p>
                {renderText({
                  path: ["about", "location"],
                  value: data.about.location,
                  as: "p",
                  className: "mt-3 text-sm font-medium text-white/82",
                })}
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                <p className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em]")} style={{ color: accent }}>
                  Status
                </p>
                {renderText({
                  path: ["about", "availability"],
                  value: data.about.availability,
                  as: "p",
                  className: "mt-3 text-sm font-medium text-white/82",
                  multiline: true,
                })}
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-[30px] border p-5 md:p-6"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: panelBackground,
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 0 30px rgba(45,226,255,0.08)",
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: sectionLine }} />
            <div className="flex items-center gap-3">
              <p className={joinClasses(displayFontClassName, "text-sm uppercase tracking-[0.18em] text-[#7af1ff]")}>Power-Ups</p>
              <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(45,226,255,0.6), rgba(45,226,255,0))" }} />
            </div>
            <div className="mt-5 grid gap-4">
              {data.skills.map((group, groupIndex) => (
                <div
                  key={group.id}
                  className="rounded-[24px] border border-white/10 bg-[#0a0a19]/90 p-4"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {renderText({
                      path: ["skills", groupIndex, "title"],
                      value: group.title,
                      as: "h3",
                      className: joinClasses(displayFontClassName, "text-2xl uppercase tracking-[0.04em] text-white"),
                    })}
                    <span className={joinClasses(displayFontClassName, "rounded-full border border-[#8b5cf6]/40 bg-[#130d24] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#c4b5fd]")}>
                      +{group.items.length.toString().padStart(2, "0")} mods
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {group.items.map((item, itemIndex) => (
                      <span
                        key={`${group.id}-${itemIndex}`}
                        className={joinClasses(displayFontClassName, "rounded-full border px-3 py-2 text-sm uppercase tracking-[0.12em]")}
                        style={{
                          borderColor: itemIndex % 3 === 0 ? "rgba(255,79,216,0.34)" : itemIndex % 3 === 1 ? "rgba(45,226,255,0.3)" : "rgba(139,92,246,0.3)",
                          backgroundColor: itemIndex % 3 === 0 ? "rgba(255,79,216,0.1)" : itemIndex % 3 === 1 ? "rgba(45,226,255,0.08)" : "rgba(139,92,246,0.08)",
                          color: itemIndex % 3 === 0 ? "#ff9ae9" : itemIndex % 3 === 1 ? "#7af1ff" : "#c4b5fd",
                        }}
                      >
                        {renderText({
                          path: ["skills", groupIndex, "items", itemIndex],
                          value: item,
                          as: "span",
                        })}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden rounded-[30px] border p-5 md:p-6"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: panelBackground,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 0 32px rgba(255,79,216,0.1)",
          }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: sectionLine }} />
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={joinClasses(displayFontClassName, "text-sm uppercase tracking-[0.18em] text-[#ff9ae9]")}>Missions</p>
              <h2 className={joinClasses(displayFontClassName, "mt-4 text-3xl uppercase tracking-[0.04em] text-white md:text-[2.3rem]")}>Select a mission path</h2>
            </div>
            <span className={joinClasses(displayFontClassName, "rounded-full border border-[#2de2ff]/35 bg-[#09111d] px-4 py-2 text-sm uppercase tracking-[0.16em] text-[#7af1ff]")}>
              {data.projects.length.toString().padStart(2, "0")} missions
            </span>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-3">
            {data.projects.map((project, index) => (
              <article
                key={project.id}
                className="rounded-[28px] p-[1px]"
                style={{
                  background:
                    index % 3 === 0
                      ? "linear-gradient(135deg, rgba(255,79,216,0.95), rgba(45,226,255,0.4) 55%, rgba(139,92,246,0.92))"
                      : index % 3 === 1
                        ? "linear-gradient(135deg, rgba(45,226,255,0.92), rgba(139,92,246,0.45) 52%, rgba(255,79,216,0.88))"
                        : "linear-gradient(135deg, rgba(139,92,246,0.94), rgba(255,79,216,0.45) 52%, rgba(45,226,255,0.8))",
                  boxShadow: "0 0 28px rgba(255,79,216,0.12)",
                }}
              >
                <div className="grid h-full gap-4 rounded-[28px] bg-[#080815] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-[#ff9ae9]")}>
                      Mission {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className={joinClasses(displayFontClassName, "text-lg text-[#7af1ff]")}>^</span>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-[#060913] p-2">
                    {renderImage(["projects", index, "image"], project.image, `${project.name} mission preview`, "min-h-[210px] rounded-[18px]")}
                  </div>

                  <div className="space-y-4">
                    {renderText({
                      path: ["projects", index, "name"],
                      value: project.name,
                      as: "h3",
                      className: joinClasses(displayFontClassName, "text-[1.9rem] uppercase tracking-[0.04em] text-white"),
                    })}
                    {renderText({
                      path: ["projects", index, "summary"],
                      value: project.summary,
                      as: "p",
                      className: "text-sm leading-7 text-white/66",
                      multiline: true,
                    })}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={`${project.id}-${tagIndex}`}
                          className={joinClasses(displayFontClassName, "rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em]")}
                          style={{
                            borderColor: tagIndex % 2 === 0 ? "rgba(45,226,255,0.3)" : "rgba(255,79,216,0.34)",
                            backgroundColor: tagIndex % 2 === 0 ? "rgba(45,226,255,0.08)" : "rgba(255,79,216,0.1)",
                            color: tagIndex % 2 === 0 ? "#7af1ff" : "#ff9ae9",
                          }}
                        >
                          {renderText({
                            path: ["projects", index, "tags", tagIndex],
                            value: tag,
                            as: "span",
                          })}
                        </span>
                      ))}
                    </div>
                    <div className="rounded-[20px] border border-white/10 bg-[#090c18] px-4 py-4">
                      <span className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em]")} style={{ color: accent }}>
                        {renderText({
                          path: ["projects", index, "linkLabel"],
                          value: project.linkLabel,
                          as: "span",
                        })}
                      </span>
                      {renderText({
                        path: ["projects", index, "url"],
                        value: project.url,
                        as: "p",
                        className: "mt-3 break-all text-xs leading-6 text-white/48",
                      })}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div
            className="relative overflow-hidden rounded-[30px] border p-5 md:p-6"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: panelBackground,
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 0 28px rgba(45,226,255,0.08)",
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: sectionLine }} />
            <div className="flex items-center gap-3">
              <p className={joinClasses(displayFontClassName, "text-sm uppercase tracking-[0.18em] text-[#7af1ff]")}>XP Timeline</p>
              <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(45,226,255,0.6), rgba(45,226,255,0))" }} />
            </div>

            <div className="relative mt-6 grid gap-4 pl-6">
              <div className="pointer-events-none absolute bottom-3 left-[11px] top-3 w-px bg-[linear-gradient(180deg,_rgba(255,79,216,0.75),_rgba(45,226,255,0.5),_rgba(139,92,246,0.18))]" />
              {data.experience.map((item, index) => (
                <div key={item.id} className="relative rounded-[24px] border border-white/10 bg-[#090917]/92 p-4">
                  <span className="absolute -left-[21px] top-5 h-4 w-4 rounded-full border-2 border-[#05060f] bg-[#ff4fd8] shadow-[0_0_16px_rgba(255,79,216,0.8)]" />
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      {renderText({
                        path: ["experience", index, "company"],
                        value: item.company,
                        as: "h3",
                        className: joinClasses(displayFontClassName, "text-2xl uppercase tracking-[0.04em] text-white"),
                      })}
                      {renderText({
                        path: ["experience", index, "role"],
                        value: item.role,
                        as: "p",
                        className: "mt-2 text-sm font-medium uppercase tracking-[0.12em] text-[#7af1ff]",
                      })}
                    </div>
                    {renderText({
                      path: ["experience", index, "period"],
                      value: item.period,
                      as: "p",
                      className: joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-white/56"),
                    })}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className={joinClasses(displayFontClassName, "rounded-full border border-[#ffd166]/35 bg-[#1a1205] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#ffd166]")}>
                      +{(index + 2) * 900} XP
                    </span>
                    <span className={joinClasses(displayFontClassName, "rounded-full border border-[#8b5cf6]/35 bg-[#130d24] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#c4b5fd]")}>
                      checkpoint {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  {renderText({
                    path: ["experience", index, "summary"],
                    value: item.summary,
                    as: "p",
                    className: "mt-4 text-sm leading-7 text-white/66",
                    multiline: true,
                  })}
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-[30px] border p-5 md:p-6"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: panelBackground,
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 0 26px rgba(139,92,246,0.08)",
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: sectionLine }} />
            <div className="flex items-center gap-3">
              <p className={joinClasses(displayFontClassName, "text-sm uppercase tracking-[0.18em] text-[#c4b5fd]")}>Training Grounds</p>
              <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.6), rgba(139,92,246,0))" }} />
            </div>
            <div className="mt-5 grid gap-4">
              {data.education.map((item, index) => (
                <div key={item.id} className="rounded-[24px] border border-white/10 bg-[#090917]/92 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className={joinClasses(displayFontClassName, "rounded-full border border-[#ff4fd8]/35 bg-[#160818] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#ff9ae9]")}>
                      training {(index + 1).toString().padStart(2, "0")}
                    </span>
                    {renderText({
                      path: ["education", index, "period"],
                      value: item.period,
                      as: "p",
                      className: joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-white/56"),
                    })}
                  </div>
                  {renderText({
                    path: ["education", index, "school"],
                    value: item.school,
                    as: "h3",
                    className: joinClasses(displayFontClassName, "mt-4 text-2xl uppercase tracking-[0.04em] text-white"),
                  })}
                  {renderText({
                    path: ["education", index, "degree"],
                    value: item.degree,
                    as: "p",
                    className: "mt-3 text-sm leading-7 text-white/68",
                  })}
                </div>
              ))}

              <div className="rounded-[24px] border border-[#2de2ff]/24 bg-[#07111e]/88 p-4">
                <p className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-[#7af1ff]")}>Loadout Note</p>
                {renderText({
                  path: ["footer", "note"],
                  value: data.footer.note,
                  as: "p",
                  className: "mt-3 text-sm leading-7 text-white/72",
                  multiline: true,
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden rounded-[30px] border p-5 md:p-6"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: panelBackground,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 0 34px rgba(255,79,216,0.1)",
          }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: sectionLine }} />
          <div className="flex items-center gap-3">
            <p className={joinClasses(displayFontClassName, "text-sm uppercase tracking-[0.18em] text-[#ff9ae9]")}>Final Checkpoint</p>
            <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,79,216,0.6), rgba(255,79,216,0))" }} />
          </div>
          <div className="mt-5 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[26px] p-[1px]" style={{ background: chromeGradient, boxShadow: "0 0 30px rgba(255,79,216,0.14)" }}>
              <div className="rounded-[26px] bg-[#070812] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={joinClasses(displayFontClassName, "rounded-full border border-[#ffd166]/35 bg-[#1b1205] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#ffd166]")}>
                    checkpoint locked
                  </span>
                  <span className={joinClasses(displayFontClassName, "rounded-full border border-[var(--accent-line)] bg-[var(--accent-soft)] px-3 py-1 text-[11px] uppercase tracking-[0.18em]")} style={{ color: accent }}>
                    status online
                  </span>
                </div>

                {renderText({
                  path: ["contact", "heading"],
                  value: data.contact.heading,
                  as: "h2",
                  className: joinClasses(displayFontClassName, "mt-5 text-3xl uppercase tracking-[0.04em] text-white md:text-[2.2rem]"),
                  multiline: true,
                })}
                {renderText({
                  path: ["contact", "message"],
                  value: data.contact.message,
                  as: "p",
                  className: "mt-5 text-sm leading-7 text-white/70 md:text-base",
                  multiline: true,
                })}

                <div className="mt-6 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <p className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em] text-[#7af1ff]")}>Direct Channel</p>
                  {renderText({
                    path: ["contact", "email"],
                    value: data.contact.email,
                    as: "p",
                    className: "mt-3 break-all text-base font-semibold text-white",
                  })}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <span className={joinClasses(displayFontClassName, `rounded-full px-4 py-3 text-sm uppercase tracking-[0.16em] ${accentButtonTextClassName}`)} style={{ backgroundColor: accent, boxShadow: `0 0 20px ${withAlpha(accent, "2a")}` }}>
                    {renderText({
                      path: ["contact", "ctaLabel"],
                      value: data.contact.ctaLabel,
                      as: "span",
                    })}
                  </span>
                  <span className={joinClasses(displayFontClassName, "rounded-full border border-[#2de2ff]/35 bg-[#08111f] px-4 py-3 text-sm uppercase tracking-[0.16em] text-[#7af1ff]")}>
                    response window open
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {data.socialLinks.map((link, index) => (
                <div
                  key={link.id}
                  className="rounded-[24px] border border-white/10 bg-[#090917]/92 p-4"
                  style={{ boxShadow: index === 1 ? "0 0 24px rgba(45,226,255,0.08)" : "0 0 24px rgba(255,79,216,0.08)" }}
                >
                  <p className={joinClasses(displayFontClassName, "text-[11px] uppercase tracking-[0.18em]")} style={{ color: index === 1 ? "#7af1ff" : "#ff9ae9" }}>
                    channel {(index + 1).toString().padStart(2, "0")}
                  </p>
                  {renderText({
                    path: ["socialLinks", index, "label"],
                    value: link.label,
                    as: "h3",
                    className: joinClasses(displayFontClassName, "mt-5 text-2xl uppercase tracking-[0.04em] text-white"),
                  })}
                  {renderText({
                    path: ["socialLinks", index, "url"],
                    value: link.url,
                    as: "p",
                    className: "mt-3 break-all text-sm leading-7 text-white/60",
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="rounded-[28px] border border-white/10 bg-[#070812]/95 p-5 md:p-6" style={{ boxShadow: "0 0 20px rgba(139,92,246,0.08)" }}>
          {renderText({
            path: ["footer", "note"],
            value: data.footer.note,
            as: "p",
            className: "text-sm leading-7 text-white/62",
            multiline: true,
          })}
          <p className={joinClasses(displayFontClassName, "mt-4 text-[11px] uppercase tracking-[0.2em] text-[#ff9ae9]")}>{data.footer.watermark}</p>
        </footer>
      </div>
    </div>
  );
}
