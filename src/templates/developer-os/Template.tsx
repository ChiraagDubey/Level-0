"use client";

import { createElement, type CSSProperties, type ElementType } from "react";
import { EditableImage } from "@/components/editor/EditableImage";
import { EditableLinkButton } from "@/components/editor/EditableLinkButton";
import { EditableText } from "@/components/editor/EditableText";
import type { PortfolioData } from "@/types/portfolio";

interface DeveloperOSTemplateProps {
  data: PortfolioData;
  editable?: boolean;
  onTextEdit?: (path: Array<string | number>, value: string) => void;
  onImageEdit?: (path: Array<string | number>, file: File) => void;
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

export function DeveloperOSTemplate({
  data,
  editable = false,
  onTextEdit,
  onImageEdit,
}: DeveloperOSTemplateProps) {
  const accent = data.theme.accentName === "monochrome" ? "#d1d5db" : data.theme.accentColor;
  const accentButtonTextClassName = isLightColor(accent) ? "text-ink" : "text-white";
  const themeStyle = {
    ["--accent" as string]: accent,
    ["--accent-soft" as string]: withAlpha(accent, "14"),
    ["--accent-line" as string]: withAlpha(accent, "38"),
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
      <div className={`overflow-hidden rounded-[26px] border border-white/10 bg-[#0a1118] ${className ?? ""}`}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  };

  const statusCards = [
    { label: "current_focus", value: data.about.heading },
    { label: "stack", value: data.skills[0]?.items.slice(0, 3).join(" / ") ?? "" },
    { label: "open_to_work", value: data.about.availability },
    { label: "projects_loaded", value: `${data.projects.length} active modules` },
  ];

  return (
    <div className="rounded-[34px] border border-white/10 bg-[#06090f] p-5 text-white shadow-panel md:p-6" style={themeStyle}>
      <div className="grid gap-6">
        <section className="rounded-[30px] border border-white/10 bg-[#0a0f17] p-5 md:p-6">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/38">session / developer-os</span>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                whoami
              </p>

              <div className="space-y-3">
                {renderText({
                  path: ["hero", "name"],
                  value: data.hero.name,
                  as: "h1",
                  className: "text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl",
                })}
                {renderText({
                  path: ["hero", "title"],
                  value: data.hero.title,
                  as: "p",
                  className: "max-w-3xl text-lg leading-8 text-white/80 md:text-2xl",
                  multiline: true,
                })}
                {renderText({
                  path: ["hero", "intro"],
                  value: data.hero.intro,
                  as: "p",
                  className: "max-w-3xl text-sm leading-7 text-white/58 md:text-base",
                  multiline: true,
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <EditableLinkButton
                  href={data.hero.resumeUrl}
                  editable={editable}
                  onHrefSave={onTextEdit ? (nextValue) => onTextEdit(["hero", "resumeUrl"], nextValue) : undefined}
                  variant="primary"
                  accentColor={accent}
                  editLabel="Resume link"
                >
                  {renderText({
                    path: ["hero", "resumeLabel"],
                    value: data.hero.resumeLabel,
                    as: "span",
                  })}
                </EditableLinkButton>

                <EditableLinkButton
                  href={data.hero.socialsUrl}
                  editable={editable}
                  onHrefSave={onTextEdit ? (nextValue) => onTextEdit(["hero", "socialsUrl"], nextValue) : undefined}
                  variant="secondary"
                  accentColor={accent}
                  editLabel="Social hub link"
                >
                  {renderText({
                    path: ["hero", "socialsLabel"],
                    value: data.hero.socialsLabel,
                    as: "span",
                  })}
                </EditableLinkButton>
              </div>
            </div>

            <div className="grid gap-4">
              {renderImage(["hero", "profileImage"], data.hero.profileImage, `${data.hero.name} profile image`, "min-h-[320px]")}
              <div className="rounded-[26px] border border-white/10 bg-[#0d131c] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                  system_status
                </p>
                <div className="mt-4 grid gap-3">
                  <div className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.02] px-4 py-3">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/45">location</span>
                    {renderText({
                      path: ["about", "location"],
                      value: data.about.location,
                      as: "span",
                      className: "text-sm font-medium text-white",
                    })}
                  </div>
                  <div className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.02] px-4 py-3">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/45">contact</span>
                    {renderText({
                      path: ["contact", "email"],
                      value: data.contact.email,
                      as: "span",
                      className: "text-sm font-medium text-white",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statusCards.map((card, index) => (
            <div key={card.label} className="rounded-[24px] border border-white/10 bg-[#0a0f17] p-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full shadow-[0_0_12px_var(--accent)]" style={{ backgroundColor: accent }} />
                <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                  {card.label}
                </p>
              </div>
              <div className="mt-4">
                {renderText({
                  path:
                    index === 0
                      ? ["about", "heading"]
                      : index === 1
                        ? ["skills", 0, "items", 0]
                        : index === 2
                          ? ["about", "availability"]
                          : ["projects", 0, "name"],
                  value: card.value,
                  as: "p",
                  className: "text-sm leading-7 text-white/72",
                  multiline: true,
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#0a0f17] p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
              cat about.md
            </p>
            {renderText({
              path: ["about", "body"],
              value: data.about.body,
              as: "p",
              className: "mt-5 text-sm leading-7 text-white/66 md:text-base",
              multiline: true,
            })}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0a0f17] p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
              skills --list
            </p>
            <div className="mt-5 grid gap-4">
              {data.skills.map((group, groupIndex) => (
                <div key={group.id} className="rounded-[22px] border border-white/10 bg-white/[0.02] p-4">
                  {renderText({
                    path: ["skills", groupIndex, "title"],
                    value: group.title,
                    as: "h3",
                    className: "text-lg font-semibold text-white",
                  })}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item, itemIndex) => (
                      <span
                        key={`${group.id}-${itemIndex}`}
                        className="rounded-full border px-3 py-1 font-mono text-xs"
                        style={{ borderColor: withAlpha(accent, "40"), backgroundColor: withAlpha(accent, "12"), color: accent }}
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

        <section className="rounded-[28px] border border-white/10 bg-[#0a0f17] p-5 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                ls projects/
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Loaded Modules</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-5">
            {data.projects.map((project, index) => (
              <article
                key={project.id}
                className="grid gap-5 rounded-[24px] border border-white/10 bg-white/[0.02] p-4 xl:grid-cols-[0.34fr_0.66fr]"
              >
                {renderImage(["projects", index, "image"], project.image, `${project.name} preview`, "min-h-[220px]")}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em]" style={{ borderColor: withAlpha(accent, "38"), color: accent }}>
                      online
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/38">project.module</span>
                  </div>

                  {renderText({
                    path: ["projects", index, "name"],
                    value: project.name,
                    as: "h3",
                    className: "text-2xl font-semibold tracking-[-0.04em] text-white",
                  })}
                  {renderText({
                    path: ["projects", index, "summary"],
                    value: project.summary,
                    as: "p",
                    className: "text-sm leading-7 text-white/64",
                    multiline: true,
                  })}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={`${project.id}-${tagIndex}`}
                        className="rounded-full border px-3 py-1 font-mono text-xs"
                        style={{ borderColor: withAlpha(accent, "38"), backgroundColor: withAlpha(accent, "12"), color: accent }}
                      >
                        {renderText({
                          path: ["projects", index, "tags", tagIndex],
                          value: tag,
                          as: "span",
                        })}
                      </span>
                    ))}
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-[#070b12] px-4 py-3">
                    <span className="font-mono text-xs uppercase tracking-[0.24em]" style={{ color: accent }}>
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
                      className: "mt-2 text-xs leading-6 text-white/42",
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#0a0f17] p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
              experience --timeline
            </p>
            <div className="mt-5 grid gap-4">
              {data.experience.map((item, index) => (
                <div key={item.id} className="rounded-[22px] border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      {renderText({
                        path: ["experience", index, "company"],
                        value: item.company,
                        as: "h3",
                        className: "text-lg font-semibold text-white",
                      })}
                      {renderText({
                        path: ["experience", index, "role"],
                        value: item.role,
                        as: "p",
                        className: "mt-1 text-sm text-white/62",
                      })}
                    </div>
                    {renderText({
                      path: ["experience", index, "period"],
                      value: item.period,
                      as: "p",
                      className: "font-mono text-xs uppercase tracking-[0.24em] text-white/38",
                    })}
                  </div>
                  {renderText({
                    path: ["experience", index, "summary"],
                    value: item.summary,
                    as: "p",
                    className: "mt-3 text-sm leading-7 text-white/64",
                    multiline: true,
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0a0f17] p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
              education --history
            </p>
            <div className="mt-5 grid gap-4">
              {data.education.map((item, index) => (
                <div key={item.id} className="rounded-[22px] border border-white/10 bg-white/[0.02] p-4">
                  {renderText({
                    path: ["education", index, "school"],
                    value: item.school,
                    as: "h3",
                    className: "text-lg font-semibold text-white",
                  })}
                  {renderText({
                    path: ["education", index, "degree"],
                    value: item.degree,
                    as: "p",
                    className: "mt-1 text-sm text-white/62",
                  })}
                  {renderText({
                    path: ["education", index, "period"],
                    value: item.period,
                    as: "p",
                    className: "mt-2 font-mono text-xs uppercase tracking-[0.24em] text-white/38",
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-[#0a0f17] p-5 md:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
            contact --open
          </p>
          <div className="mt-5 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-4">
              {renderText({
                path: ["contact", "heading"],
                value: data.contact.heading,
                as: "h2",
                className: "text-3xl font-semibold tracking-[-0.04em] text-white",
                multiline: true,
              })}
              {renderText({
                path: ["contact", "message"],
                value: data.contact.message,
                as: "p",
                className: "mt-4 text-sm leading-7 text-white/64",
                multiline: true,
              })}
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <span className={`rounded-full px-4 py-2.5 text-sm font-medium ${accentButtonTextClassName}`} style={{ backgroundColor: accent }}>
                  {renderText({
                    path: ["contact", "ctaLabel"],
                    value: data.contact.ctaLabel,
                    as: "span",
                  })}
                </span>
                {renderText({
                  path: ["contact", "email"],
                  value: data.contact.email,
                  as: "p",
                  className: "text-sm font-medium text-white",
                })}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {data.socialLinks.map((link, index) => (
                <div key={link.id} className="rounded-[22px] border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full shadow-[0_0_12px_var(--accent)]" style={{ backgroundColor: accent }} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/38">channel</span>
                  </div>
                  {renderText({
                    path: ["socialLinks", index, "label"],
                    value: link.label,
                    as: "h3",
                    className: "mt-4 text-lg font-semibold text-white",
                  })}
                  {renderText({
                    path: ["socialLinks", index, "url"],
                    value: link.url,
                    as: "p",
                    className: "mt-2 text-sm leading-7 text-white/58",
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="rounded-[28px] border border-white/10 bg-[#0a0f17] p-5 text-sm text-white/58 md:p-6">
          {renderText({
            path: ["footer", "note"],
            value: data.footer.note,
            as: "p",
            className: "leading-7",
            multiline: true,
          })}
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em]" style={{ color: accent }}>
            {data.footer.watermark}
          </p>
        </footer>
      </div>
    </div>
  );
}
