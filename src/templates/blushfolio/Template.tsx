"use client";

import { createElement, type CSSProperties, type ElementType } from "react";
import { EditableImage } from "@/components/editor/EditableImage";
import { EditableLinkButton } from "@/components/editor/EditableLinkButton";
import { EditableText } from "@/components/editor/EditableText";
import type { PortfolioData } from "@/types/portfolio";

interface BlushfolioTemplateProps {
  data: PortfolioData;
  editable?: boolean;
  onTextEdit?: (path: Array<string | number>, value: string) => void;
  onImageEdit?: (path: Array<string | number>, file: File) => void;
}

function withAlpha(color: string, alpha: string) {
  return color.startsWith("#") && color.length === 7 ? `${color}${alpha}` : color;
}

const floatingAccents = [
  { className: "left-[4%] top-[5%] h-16 w-16 rounded-full", color: "var(--accent-soft)" },
  { className: "right-[9%] top-[8%] h-10 w-10 rotate-12 rounded-[18px]", color: "rgba(255,255,255,0.82)" },
  { className: "left-[8%] top-[34%] h-6 w-6 rotate-45 rounded-[8px]", color: "rgba(240,191,206,0.58)" },
  { className: "left-[18%] top-[62%] h-24 w-24 rounded-full", color: "rgba(255,230,238,0.82)" },
  { className: "left-[28%] top-[72%] h-10 w-10 rounded-full", color: "rgba(217,120,152,0.12)" },
  { className: "right-[6%] top-[42%] h-14 w-14 rounded-full", color: "rgba(246,214,198,0.58)" },
  { className: "right-[18%] top-[65%] h-12 w-12 rotate-12 rounded-[16px]", color: "rgba(248,222,230,0.9)" },
  { className: "left-[12%] bottom-[17%] h-9 w-9 rounded-full", color: "rgba(255,255,255,0.72)" },
  { className: "right-[14%] bottom-[12%] h-7 w-7 rotate-12 rounded-[9px]", color: "rgba(221,144,171,0.2)" },
];

export function BlushfolioTemplate({
  data,
  editable = false,
  onTextEdit,
  onImageEdit,
}: BlushfolioTemplateProps) {
  const accent = data.theme.accentColor;
  const themeStyle = {
    ["--accent" as string]: accent,
    ["--accent-soft" as string]: withAlpha(accent, "18"),
    ["--accent-line" as string]: withAlpha(accent, "36"),
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
      <div className={`overflow-hidden rounded-[30px] border border-[var(--accent-line)] bg-[#fff6f8] ${className ?? ""}`}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  };

  return (
    <div
      className="relative overflow-hidden rounded-[36px] border border-[var(--accent-line)] bg-[linear-gradient(180deg,#fff9fb_0%,#fff3f5_36%,#fef7f3_100%)] text-[#33262d] shadow-[0_30px_90px_rgba(181,116,142,0.18)]"
      style={themeStyle}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_72%)]" />
        <div className="absolute left-[22%] top-[54%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,224,235,0.7),transparent_68%)] blur-2xl" />
        <div className="absolute right-[12%] top-[58%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,236,221,0.75),transparent_70%)] blur-2xl" />
        {floatingAccents.map((accentItem) => (
          <span
            key={accentItem.className}
            className={`absolute ${accentItem.className} blur-[1px]`}
            style={{ backgroundColor: accentItem.color }}
          />
        ))}
        <span className="absolute left-[6%] top-[20%] text-2xl text-[rgba(212,146,170,0.6)]">+</span>
        <span className="absolute right-[11%] top-[29%] text-xl text-[rgba(222,160,184,0.72)]">*</span>
        <span className="absolute left-[18%] top-[61%] text-[28px] text-[rgba(221,147,173,0.42)]">o</span>
        <span className="absolute right-[17%] top-[63%] text-lg text-[rgba(228,172,193,0.58)]">*</span>
        <span className="absolute left-[10%] bottom-[23%] text-lg text-[rgba(212,146,170,0.66)]">*</span>
        <span className="absolute left-[35%] bottom-[14%] text-xl text-[rgba(228,172,193,0.54)]">o</span>
      </div>

      <div className="relative grid gap-8 p-5 sm:p-6 lg:p-8">
        <section className="grid gap-8 rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_50px_rgba(214,144,167,0.12)] lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-[var(--accent-line)] bg-[var(--accent-soft)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
                {renderText({
                  path: ["hero", "eyebrow"],
                  value: data.hero.eyebrow,
                  as: "span",
                })}
              </span>
              <span className="rounded-full border border-[#f1dbe3] bg-[#fff8fa] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#9d7484]">
                {renderText({
                  path: ["heroAside", "statusLabel"],
                  value: heroAside.statusLabel,
                  as: "span",
                })}
              </span>
            </div>

            <div className="space-y-4">
              {renderText({
                path: ["hero", "name"],
                value: data.hero.name,
                as: "h2",
                className: "max-w-3xl font-serif text-5xl tracking-[-0.06em] text-[#35242f] sm:text-6xl lg:text-7xl",
              })}
              {renderText({
                path: ["hero", "title"],
                value: data.hero.title,
                as: "p",
                className: "max-w-2xl text-lg leading-8 text-[#5d4450] sm:text-[1.35rem]",
                multiline: true,
              })}
              {renderText({
                path: ["hero", "intro"],
                value: data.hero.intro,
                as: "p",
                className: "max-w-2xl text-sm leading-8 text-[#6f5a64] sm:text-base",
                multiline: true,
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <EditableLinkButton
                href={data.hero.socialsUrl}
                editable={editable}
                onHrefSave={onTextEdit ? (nextValue) => onTextEdit(["hero", "socialsUrl"], nextValue) : undefined}
                variant="primary"
                accentColor={accent}
                editLabel="Portfolio link"
              >
                {renderText({
                  path: ["hero", "socialsLabel"],
                  value: data.hero.socialsLabel,
                  as: "span",
                })}
              </EditableLinkButton>

              <EditableLinkButton
                href={data.hero.resumeUrl}
                editable={editable}
                onHrefSave={onTextEdit ? (nextValue) => onTextEdit(["hero", "resumeUrl"], nextValue) : undefined}
                variant="secondary"
                accentColor={accent}
                editLabel="Resume link"
              >
                {renderText({
                  path: ["hero", "resumeLabel"],
                  value: data.hero.resumeLabel,
                  as: "span",
                })}
              </EditableLinkButton>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] border border-[#f0d9e2] bg-[#fff7f9] p-4 shadow-[0_12px_25px_rgba(223,170,191,0.08)]">
                {renderText({
                  path: ["templateLabels", "locationLabel"],
                  value: labels.locationLabel,
                  as: "p",
                  className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]",
                })}
                {renderText({
                  path: ["about", "location"],
                  value: data.about.location,
                  as: "p",
                  className: "mt-3 text-sm font-medium text-[#44313a]",
                })}
              </div>

              <div className="rounded-[24px] border border-[#f4dfd3] bg-[#fffaf5] p-4 shadow-[0_12px_25px_rgba(233,194,176,0.08)]">
                {renderText({
                  path: ["templateLabels", "availabilityLabel"],
                  value: labels.availabilityLabel,
                  as: "p",
                  className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]",
                })}
                {renderText({
                  path: ["about", "availability"],
                  value: data.about.availability,
                  as: "p",
                  className: "mt-3 text-sm leading-7 text-[#5d4a53]",
                  multiline: true,
                })}
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="rounded-[26px] border border-[#f0d9e2] bg-[linear-gradient(135deg,#fff9fb_0%,#fff3f6_100%)] p-5 shadow-[0_12px_25px_rgba(223,170,191,0.08)]">
                {renderText({
                  path: ["heroAside", "spotlightLabel"],
                  value: heroAside.spotlightLabel,
                  as: "p",
                  className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]",
                })}
                {renderText({
                  path: ["heroAside", "spotlightTitle"],
                  value: heroAside.spotlightTitle,
                  as: "h3",
                  className: "mt-3 font-serif text-2xl tracking-[-0.05em] text-[#3d2b35]",
                  multiline: true,
                })}
                {renderText({
                  path: ["heroAside", "spotlightBody"],
                  value: heroAside.spotlightBody,
                  as: "p",
                  className: "mt-3 text-sm leading-7 text-[#6a5560]",
                  multiline: true,
                })}
              </div>

              <div className="rounded-[26px] border border-[#f4dfd3] bg-[linear-gradient(135deg,#fffaf6_0%,#fff5fb_100%)] p-5 shadow-[0_12px_25px_rgba(233,194,176,0.08)]">
                {renderText({
                  path: ["heroAside", "detailLabel"],
                  value: heroAside.detailLabel,
                  as: "p",
                  className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[#b78898]",
                })}
                <div className="mt-4 flex flex-wrap gap-2">
                  {heroAside.highlightItems.slice(0, 2).map((item, index) => (
                    <span
                      key={`hero-detail-${index}`}
                      className="rounded-full border border-white/80 bg-white/90 px-3 py-2 text-xs font-medium text-[#7a5f6a] shadow-[0_10px_20px_rgba(214,144,167,0.08)]"
                    >
                      {renderText({
                        path: ["heroAside", "highlightItems", index],
                        value: item,
                        as: "span",
                      })}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative rounded-[32px] border border-[#f0d7e1] bg-[linear-gradient(180deg,#fff9fb_0%,#fff2f5_100%)] p-3 shadow-[0_20px_40px_rgba(215,149,175,0.12)]">
              <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#9c7280]">
                {renderText({
                  path: ["heroAside", "profileLabel"],
                  value: heroAside.profileLabel,
                  as: "span",
                })}
              </div>
              <div className="absolute bottom-4 right-4 rounded-full border border-white/70 bg-[#fff8fa]/85 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                {renderText({
                  path: ["heroAside", "profileModeLabel"],
                  value: heroAside.profileModeLabel,
                  as: "span",
                })}
              </div>
              {renderImage(["hero", "profileImage"], data.hero.profileImage, `${data.hero.name} profile image`, "min-h-[360px]")}
            </div>

            <div className="rounded-[28px] border border-[#f0d9e2] bg-white/90 p-5 shadow-[0_16px_35px_rgba(216,150,175,0.09)]">
              {renderText({
                path: ["templateLabels", "quickFactsLabel"],
                value: labels.quickFactsLabel,
                as: "p",
                className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]",
              })}
              <div className="mt-4 grid gap-3 text-sm leading-7 text-[#634d57]">
                {heroAside.highlightItems.map((item, index) => (
                  <div
                    key={`profile-note-${index}`}
                    className={[
                      "rounded-[20px] px-4 py-3",
                      index % 3 === 0 ? "bg-[#fff6f8]" : index % 3 === 1 ? "bg-[#fff8f3]" : "bg-[#fff7fa]",
                    ].join(" ")}
                  >
                    {renderText({
                      path: ["heroAside", "highlightItems", index],
                      value: item,
                      as: "span",
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[30px] border border-white/70 bg-white/82 p-6 shadow-[0_18px_40px_rgba(214,144,167,0.1)]">
            {renderText({
              path: ["about", "heading"],
              value: data.about.heading,
              as: "h3",
              className: "font-serif text-3xl tracking-[-0.05em] text-[#35242f] sm:text-4xl",
            })}
            {renderText({
              path: ["about", "body"],
              value: data.about.body,
              as: "p",
              className: "mt-4 text-sm leading-8 text-[#6d5863] sm:text-base",
              multiline: true,
            })}
          </div>

          <div className="rounded-[30px] border border-[#eed7df] bg-[linear-gradient(180deg,#fff9fb_0%,#fff4f7_100%)] p-6 shadow-[0_18px_40px_rgba(214,144,167,0.1)]">
            {renderText({
              path: ["templateLabels", "socialLinksLabel"],
              value: labels.socialLinksLabel,
              as: "p",
              className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]",
            })}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {data.socialLinks.map((link, index) => (
                <div key={link.id} className="rounded-[22px] border border-white/80 bg-white/88 p-4">
                  {renderText({
                    path: ["socialLinks", index, "label"],
                    value: link.label,
                    as: "p",
                    className: "text-base font-semibold text-[#423039]",
                  })}
                  {renderText({
                    path: ["socialLinks", index, "url"],
                    value: link.url,
                    as: "p",
                    className: "mt-2 text-sm leading-7 text-[#775d68]",
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_40px_rgba(214,144,167,0.1)] sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {renderText({
                path: ["templateLabels", "projectsLabel"],
                value: labels.projectsLabel,
                as: "p",
                className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]",
              })}
              {renderText({
                path: ["templateLabels", "projectsTitle"],
                value: labels.projectsTitle,
                as: "h3",
                className: "mt-2 max-w-2xl font-serif text-3xl tracking-[-0.05em] text-[#35242f] sm:text-4xl",
                multiline: true,
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {data.projects.map((project, index) => (
              <article key={project.id} className="overflow-hidden rounded-[26px] border border-[#f0dbe3] bg-[#fff8fa] shadow-[0_14px_28px_rgba(214,144,167,0.08)]">
                <div className="p-3">
                  {renderImage(["projects", index, "image"], project.image, `${project.name} preview`, "min-h-[220px]")}
                </div>
                <div className="space-y-4 px-5 pb-5">
                  {renderText({
                    path: ["projects", index, "name"],
                    value: project.name,
                    as: "h4",
                    className: "font-serif text-2xl tracking-[-0.04em] text-[#38272f]",
                  })}
                  {renderText({
                    path: ["projects", index, "summary"],
                    value: project.summary,
                    as: "p",
                    className: "text-sm leading-7 text-[#6f5b64]",
                    multiline: true,
                  })}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={`${project.id}-${tagIndex}`}
                        className="rounded-full border border-[var(--accent-line)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent)]"
                      >
                        {renderText({
                          path: ["projects", index, "tags", tagIndex],
                          value: tag,
                          as: "span",
                        })}
                      </span>
                    ))}
                  </div>
                  <div className="rounded-[18px] bg-white px-4 py-3">
                    {renderText({
                      path: ["projects", index, "linkLabel"],
                      value: project.linkLabel,
                      as: "p",
                      className: "text-sm font-semibold text-[var(--accent)]",
                    })}
                    {renderText({
                      path: ["projects", index, "url"],
                      value: project.url,
                      as: "p",
                      className: "mt-1 text-xs leading-6 text-[#7e6671]",
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_40px_rgba(214,144,167,0.1)]">
            {renderText({
              path: ["templateLabels", "skillsLabel"],
              value: labels.skillsLabel,
              as: "p",
              className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]",
            })}
            <div className="mt-5 grid gap-4">
              {data.skills.map((group, groupIndex) => (
                <div key={group.id} className="rounded-[24px] border border-[#f0dbe3] bg-[#fff8fa] p-4">
                  {renderText({
                    path: ["skills", groupIndex, "title"],
                    value: group.title,
                    as: "h4",
                    className: "text-lg font-semibold text-[#402e37]",
                  })}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item, itemIndex) => (
                      <span key={`${group.id}-${itemIndex}`} className="rounded-full bg-white px-3 py-1.5 text-sm text-[#6d5560] shadow-[0_8px_20px_rgba(214,144,167,0.08)]">
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
            <div className="mt-5 rounded-[24px] border border-[#edd6e0] bg-[linear-gradient(135deg,#fff6f9_0%,#fff9f4_100%)] p-4 shadow-[0_12px_25px_rgba(214,144,167,0.08)]">
              {renderText({
                path: ["heroAside", "toolkitLabel"],
                value: heroAside.toolkitLabel,
                as: "p",
                className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]",
              })}
              {renderText({
                path: ["heroAside", "toolkitBody"],
                value: heroAside.toolkitBody,
                as: "p",
                className: "mt-3 text-sm leading-7 text-[#6a5560]",
                multiline: true,
              })}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_40px_rgba(214,144,167,0.1)]">
              {renderText({
                path: ["templateLabels", "experienceLabel"],
                value: labels.experienceLabel,
                as: "p",
                className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]",
              })}
              <div className="mt-5 grid gap-4">
                {data.experience.map((item, index) => (
                  <article key={item.id} className="relative rounded-[24px] border border-[#f0dbe3] bg-[#fff7f9] p-5">
                    <span className="pointer-events-none absolute left-5 top-6 h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_rgba(217,120,152,0.14)]" />
                    <div className="pl-7">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          {renderText({
                            path: ["experience", index, "role"],
                            value: item.role,
                            as: "h4",
                            className: "text-lg font-semibold text-[#3d2c35]",
                          })}
                          {renderText({
                            path: ["experience", index, "company"],
                            value: item.company,
                            as: "p",
                            className: "mt-1 text-sm text-[#735d68]",
                          })}
                        </div>
                        {renderText({
                          path: ["experience", index, "period"],
                          value: item.period,
                          as: "p",
                          className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[#8f7480]",
                        })}
                      </div>
                      {renderText({
                        path: ["experience", index, "summary"],
                        value: item.summary,
                        as: "p",
                        className: "mt-3 text-sm leading-7 text-[#6f5b64]",
                        multiline: true,
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_40px_rgba(214,144,167,0.1)]">
              {renderText({
                path: ["templateLabels", "educationLabel"],
                value: labels.educationLabel,
                as: "p",
                className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]",
              })}
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {data.education.map((item, index) => (
                  <article key={item.id} className="rounded-[24px] border border-[#f0dbe3] bg-[#fffaf6] p-4">
                    {renderText({
                      path: ["education", index, "school"],
                      value: item.school,
                      as: "h4",
                      className: "text-lg font-semibold text-[#3d2c35]",
                    })}
                    {renderText({
                      path: ["education", index, "degree"],
                      value: item.degree,
                      as: "p",
                      className: "mt-2 text-sm leading-7 text-[#715b65]",
                      multiline: true,
                    })}
                    {renderText({
                      path: ["education", index, "period"],
                      value: item.period,
                      as: "p",
                      className: "mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#917782]",
                    })}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#efdae2] bg-[linear-gradient(135deg,#fdf0f4_0%,#fff8f2_100%)] p-6 shadow-[0_18px_40px_rgba(214,144,167,0.12)] sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              {renderText({
                path: ["contact", "heading"],
                value: data.contact.heading,
                as: "h3",
                className: "max-w-3xl font-serif text-3xl tracking-[-0.05em] text-[#35242f] sm:text-4xl",
                multiline: true,
              })}
              {renderText({
                path: ["contact", "message"],
                value: data.contact.message,
                as: "p",
                className: "mt-4 max-w-3xl text-sm leading-8 text-[#6f5964] sm:text-base",
                multiline: true,
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white shadow-[0_14px_28px_rgba(217,120,152,0.24)]">
                {renderText({
                  path: ["contact", "ctaLabel"],
                  value: data.contact.ctaLabel,
                  as: "span",
                })}
              </span>
              <span className="rounded-full border border-[#ecd4dd] bg-white px-4 py-3 text-sm font-medium text-[#583f49]">
                {renderText({
                  path: ["contact", "email"],
                  value: data.contact.email,
                  as: "span",
                })}
              </span>
            </div>
          </div>
        </section>

        <footer className="rounded-[30px] border border-white/70 bg-white/84 p-6 shadow-[0_18px_40px_rgba(214,144,167,0.08)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {renderText({
              path: ["footer", "note"],
              value: data.footer.note,
              as: "p",
              className: "max-w-3xl text-sm leading-7 text-[#6a5560]",
              multiline: true,
            })}
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">{data.footer.watermark}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
