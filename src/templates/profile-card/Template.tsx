"use client";

import { createElement, type CSSProperties, type ElementType, useState } from "react";
import { EditableImage } from "@/components/editor/EditableImage";
import { EditableLinkButton } from "@/components/editor/EditableLinkButton";
import { EditableText } from "@/components/editor/EditableText";
import type { PortfolioData } from "@/types/portfolio";

interface ProfileCardTemplateProps {
  data: PortfolioData;
  editable?: boolean;
  onTextEdit?: (path: Array<string | number>, value: string) => void;
  onImageEdit?: (path: Array<string | number>, value: string) => void;
}

type ProfileCardTab = "about" | "resume" | "projects" | "contact";

const tabOptions: Array<{ id: ProfileCardTab; label: string }> = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

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

export function ProfileCardTemplate({
  data,
  editable = false,
  onTextEdit,
  onImageEdit,
}: ProfileCardTemplateProps) {
  const [activeTab, setActiveTab] = useState<ProfileCardTab>("about");
  const accent = data.theme.accentName === "monochrome" ? "#f3f4f6" : data.theme.accentColor;
  const accentButtonTextClassName = isLightColor(accent) ? "text-ink" : "text-white";
  const themeStyle = {
    ["--accent" as string]: accent,
    ["--accent-soft" as string]: withAlpha(accent, "18"),
    ["--accent-line" as string]: withAlpha(accent, "45"),
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
      <div className={`overflow-hidden rounded-[28px] border border-white/10 bg-[#12131f] ${className ?? ""}`}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]" style={themeStyle}>
      <aside className="xl:sticky xl:top-6 xl:self-start">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0d14] p-5 text-white shadow-panel md:p-6">
          <div className="space-y-5">
            <div className="rounded-[28px] border border-white/10 bg-[#111423] p-3">
              {renderImage(["hero", "profileImage"], data.hero.profileImage, `${data.hero.name} profile image`, "min-h-[260px]")}
            </div>

            <div className="space-y-4">
              <span
                className="inline-flex rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.26em]"
                style={{ borderColor: withAlpha(accent, "55"), color: accent, backgroundColor: withAlpha(accent, "18") }}
              >
                {renderText({
                  path: ["hero", "eyebrow"],
                  value: data.hero.eyebrow,
                  as: "span",
                })}
              </span>

              <div className="space-y-3">
                {renderText({
                  path: ["hero", "name"],
                  value: data.hero.name,
                  as: "h2",
                  className: "text-3xl font-semibold tracking-[-0.05em] text-white",
                })}
                {renderText({
                  path: ["hero", "title"],
                  value: data.hero.title,
                  as: "p",
                  className: "text-sm leading-7 text-white/72",
                  multiline: true,
                })}
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                  Location
                </p>
                <div className="mt-3">
                  {renderText({
                    path: ["about", "location"],
                    value: data.about.location,
                    as: "p",
                    className: "text-sm font-medium text-white",
                  })}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                  Email
                </p>
                <div className="mt-3">
                  {renderText({
                    path: ["contact", "email"],
                    value: data.contact.email,
                    as: "p",
                    className: "text-sm font-medium text-white",
                  })}
                </div>
              </div>
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

            <div className="rounded-[24px] border border-white/10 bg-[#111423] p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                Social Links
              </p>
              <div className="mt-4 grid gap-3">
                {data.socialLinks.map((link, index) => (
                  <div key={link.id} className="rounded-[20px] border border-white/10 bg-white/[0.03] p-3">
                    {renderText({
                      path: ["socialLinks", index, "label"],
                      value: link.label,
                      as: "p",
                      className: "text-sm font-medium text-white",
                    })}
                    {renderText({
                      path: ["socialLinks", index, "url"],
                      value: link.url,
                      as: "p",
                      className: "mt-2 text-xs leading-6 text-white/58",
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0d14] text-white shadow-panel">
        <div className="border-b border-white/10 px-5 py-5 md:px-6">
          <div className="flex flex-wrap gap-3">
            {tabOptions.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${isActive ? accentButtonTextClassName : "text-white/72"}`}
                  style={{
                    borderColor: isActive ? withAlpha(accent, "55") : "rgba(255,255,255,0.1)",
                    backgroundColor: isActive ? accent : "rgba(255,255,255,0.03)",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 p-5 md:p-6">
          {activeTab === "about" ? (
            <>
              <section className="rounded-[28px] border border-white/10 bg-[#0f111b] p-5 md:p-6">
                {renderText({
                  path: ["about", "heading"],
                  value: data.about.heading,
                  as: "h3",
                  className: "text-3xl font-semibold tracking-[-0.04em] text-white",
                })}
                {renderText({
                  path: ["about", "body"],
                  value: data.about.body,
                  as: "p",
                  className: "mt-4 text-sm leading-7 text-white/64 md:text-base",
                  multiline: true,
                })}
                {renderText({
                  path: ["hero", "intro"],
                  value: data.hero.intro,
                  as: "p",
                  className: "mt-4 text-sm leading-7 text-white/56",
                  multiline: true,
                })}
                <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                    Availability
                  </p>
                  {renderText({
                    path: ["about", "availability"],
                    value: data.about.availability,
                    as: "p",
                    className: "mt-3 text-sm leading-7 text-white/64",
                    multiline: true,
                  })}
                </div>
              </section>

              <section className="rounded-[28px] border border-white/10 bg-[#0f111b] p-5 md:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                  Skills
                </p>
                <div className="mt-5 grid gap-4">
                  {data.skills.map((group, groupIndex) => (
                    <div key={group.id} className="rounded-[24px] border border-white/10 bg-white/[0.02] p-4">
                      {renderText({
                        path: ["skills", groupIndex, "title"],
                        value: group.title,
                        as: "h4",
                        className: "text-lg font-semibold text-white",
                      })}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.items.map((item, itemIndex) => (
                          <span
                            key={`${group.id}-${itemIndex}`}
                            className="rounded-full border px-3 py-1 text-sm"
                            style={{ borderColor: withAlpha(accent, "45"), color: accent }}
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
              </section>
            </>
          ) : null}

          {activeTab === "resume" ? (
            <>
              <section className="rounded-[28px] border border-white/10 bg-[#0f111b] p-5 md:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                  Experience
                </p>
                <div className="mt-5 grid gap-4">
                  {data.experience.map((item, index) => (
                    <div key={item.id} className="rounded-[24px] border border-white/10 bg-white/[0.02] p-4">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          {renderText({
                            path: ["experience", index, "company"],
                            value: item.company,
                            as: "h4",
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
              </section>

              <section className="rounded-[28px] border border-white/10 bg-[#0f111b] p-5 md:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                  Education
                </p>
                <div className="mt-5 grid gap-4">
                  {data.education.map((item, index) => (
                    <div key={item.id} className="rounded-[24px] border border-white/10 bg-white/[0.02] p-4">
                      {renderText({
                        path: ["education", index, "school"],
                        value: item.school,
                        as: "h4",
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
              </section>
            </>
          ) : null}

          {activeTab === "projects" ? (
            <section className="rounded-[28px] border border-white/10 bg-[#0f111b] p-5 md:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                Projects
              </p>
              <div className="mt-5 grid gap-5">
                {data.projects.map((project, index) => (
                  <article
                    key={project.id}
                    className="grid gap-5 rounded-[24px] border border-white/10 bg-white/[0.02] p-4 lg:grid-cols-[0.38fr_0.62fr]"
                  >
                    {renderImage(["projects", index, "image"], project.image, `${project.name} preview`, "min-h-[220px]")}
                    <div className="space-y-4">
                      {renderText({
                        path: ["projects", index, "name"],
                        value: project.name,
                        as: "h4",
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
                            className="rounded-full border px-3 py-1 text-xs font-medium"
                            style={{
                              borderColor: withAlpha(accent, "55"),
                              backgroundColor: withAlpha(accent, "14"),
                              color: accent,
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
                      <div>
                        <span className="text-sm font-medium" style={{ color: accent }}>
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
                          className: "mt-1 text-xs leading-6 text-white/42",
                        })}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeTab === "contact" ? (
            <>
              <section className="rounded-[28px] border border-white/10 bg-[#0f111b] p-5 md:p-6">
                {renderText({
                  path: ["contact", "heading"],
                  value: data.contact.heading,
                  as: "h3",
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
              </section>

              <section className="rounded-[28px] border border-white/10 bg-[#0f111b] p-5 md:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                  Social Links
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {data.socialLinks.map((link, index) => (
                    <div key={link.id} className="rounded-[24px] border border-white/10 bg-white/[0.02] p-4">
                      {renderText({
                        path: ["socialLinks", index, "label"],
                        value: link.label,
                        as: "p",
                        className: "text-lg font-semibold text-white",
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
              </section>
            </>
          ) : null}

          <footer className="rounded-[28px] border border-white/10 bg-[#0f111b] p-5 text-sm text-white/60 md:p-6">
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
      </section>
    </div>
  );
}
