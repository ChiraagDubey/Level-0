"use client";

import { createElement, type CSSProperties, type ElementType } from "react";
import { EditableImage } from "@/components/editor/EditableImage";
import { EditableLinkButton } from "@/components/editor/EditableLinkButton";
import { EditableText } from "@/components/editor/EditableText";
import type { PortfolioData } from "@/types/portfolio";

interface DarkStarterTemplateProps {
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

export function DarkStarterTemplate({
  data,
  editable = false,
  onTextEdit,
  onImageEdit,
}: DarkStarterTemplateProps) {
  const accent = data.theme.accentName === "monochrome" ? "#f3f4f6" : data.theme.accentColor;
  const themeStyle = { ["--accent" as string]: accent } as CSSProperties;
  const accentButtonTextClassName = isLightColor(accent) ? "text-ink" : "text-white";
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
    <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[#090a12] text-white shadow-panel" style={themeStyle}>
      <div className="grid gap-6 p-5 md:p-8">
        <section className="rounded-[30px] border border-white/10 bg-[#0f111b] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
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

              <div className="space-y-4">
                {renderText({
                  path: ["hero", "name"],
                  value: data.hero.name,
                  as: "h2",
                  className: "text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl",
                })}
                {renderText({
                  path: ["hero", "title"],
                  value: data.hero.title,
                  as: "p",
                  className: "max-w-2xl text-xl leading-8 text-white/88 md:text-2xl",
                  multiline: true,
                })}
                {renderText({
                  path: ["hero", "intro"],
                  value: data.hero.intro,
                  as: "p",
                  className: "max-w-2xl text-sm leading-7 text-white/62 md:text-base",
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
                  editLabel="Drive resume link"
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
                  editLabel="Socials landing link"
                >
                  {renderText({
                    path: ["hero", "socialsLabel"],
                    value: data.hero.socialsLabel,
                    as: "span",
                  })}
                </EditableLinkButton>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {featuredExperience ? (
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                    {renderText({
                      path: ["templateLabels", "heroExperienceLabel"],
                      value: labels.heroExperienceLabel,
                      as: "p",
                      className: "font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]",
                    })}
                    {renderText({
                      path: ["experience", 0, "role"],
                      value: featuredExperience.role,
                      as: "p",
                      className: "mt-3 text-base font-semibold text-white",
                    })}
                    {renderText({
                      path: ["experience", 0, "company"],
                      value: featuredExperience.company,
                      as: "p",
                      className: "mt-1 text-sm text-white/62",
                    })}
                    {renderText({
                      path: ["experience", 0, "period"],
                      value: featuredExperience.period,
                      as: "p",
                      className: "mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/40",
                    })}
                  </div>
                ) : null}

                {featuredEducation ? (
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                    {renderText({
                      path: ["templateLabels", "heroEducationLabel"],
                      value: labels.heroEducationLabel,
                      as: "p",
                      className: "font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]",
                    })}
                    {renderText({
                      path: ["education", 0, "degree"],
                      value: featuredEducation.degree,
                      as: "p",
                      className: "mt-3 text-base font-semibold text-white",
                    })}
                    {renderText({
                      path: ["education", 0, "school"],
                      value: featuredEducation.school,
                      as: "p",
                      className: "mt-1 text-sm leading-6 text-white/62",
                    })}
                    {renderText({
                      path: ["education", 0, "period"],
                      value: featuredEducation.period,
                      as: "p",
                      className: "mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/40",
                    })}
                  </div>
                ) : null}

                {featuredSkillGroup ? (
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 sm:col-span-2 xl:col-span-1">
                    {renderText({
                      path: ["templateLabels", "heroSkillsLabel"],
                      value: labels.heroSkillsLabel,
                      as: "p",
                      className: "font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]",
                    })}
                    {renderText({
                      path: ["skills", 0, "title"],
                      value: featuredSkillGroup.title,
                      as: "p",
                      className: "mt-3 text-base font-semibold text-white",
                    })}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {featuredSkillGroup.items.slice(0, 4).map((item, itemIndex) => (
                        <span
                          key={`${featuredSkillGroup.id}-${itemIndex}`}
                          className="rounded-full border px-3 py-1 text-sm"
                          style={{ borderColor: withAlpha(accent, "38"), backgroundColor: withAlpha(accent, "12"), color: accent }}
                        >
                          {renderText({
                            path: ["skills", 0, "items", itemIndex],
                            value: item,
                            as: "span",
                          })}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4">
              {renderImage(["hero", "profileImage"], data.hero.profileImage, `${data.hero.name} profile image`, "min-h-[340px]")}
              <div className="rounded-[28px] border border-white/10 bg-[#111423] p-5">
                {renderText({
                  path: ["templateLabels", "socialLinksLabel"],
                  value: labels.socialLinksLabel,
                  as: "p",
                  className: "font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent)]",
                })}
                <div className="mt-4 grid gap-3">
                  {data.socialLinks.map((link, index) => (
                    <div key={link.id} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      {renderText({
                        path: ["socialLinks", index, "label"],
                        value: link.label,
                        as: "p",
                        className: "text-base font-medium text-white",
                      })}
                      {renderText({
                        path: ["socialLinks", index, "url"],
                        value: link.url,
                        as: "p",
                        className: "mt-2 text-sm leading-7 text-white/62",
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#0f111b] p-6">
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
            {featuredSkillGroup ? (
              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                {renderText({
                  path: ["templateLabels", "aboutSkillsLabel"],
                  value: labels.aboutSkillsLabel,
                  as: "p",
                  className: "font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]",
                })}
                {renderText({
                  path: ["skills", 0, "title"],
                  value: featuredSkillGroup.title,
                  as: "p",
                  className: "mt-3 text-base font-semibold text-white",
                })}
                <div className="mt-3 flex flex-wrap gap-2">
                  {featuredSkillGroup.items.slice(0, 4).map((item, itemIndex) => (
                    <span
                      key={`about-${featuredSkillGroup.id}-${itemIndex}`}
                      className="rounded-full border px-3 py-1 text-sm"
                      style={{ borderColor: withAlpha(accent, "38"), backgroundColor: withAlpha(accent, "10"), color: accent }}
                    >
                      {renderText({
                        path: ["skills", 0, "items", itemIndex],
                        value: item,
                        as: "span",
                      })}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="grid gap-4">
            <div className="rounded-[30px] border border-white/10 bg-[#0f111b] p-6">
              {renderText({
                path: ["templateLabels", "locationLabel"],
                value: labels.locationLabel,
                as: "p",
                className: "font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent)]",
              })}
              {renderText({
                path: ["about", "location"],
                value: data.about.location,
                as: "p",
                className: "mt-3 text-lg font-medium text-white",
              })}
            </div>
            <div className="rounded-[30px] border border-white/10 bg-[#0f111b] p-6">
              {renderText({
                path: ["templateLabels", "availabilityLabel"],
                value: labels.availabilityLabel,
                as: "p",
                className: "font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent)]",
              })}
              {renderText({
                path: ["about", "availability"],
                value: data.about.availability,
                as: "p",
                className: "mt-3 text-sm leading-7 text-white/64",
                multiline: true,
              })}
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-[#0f111b] p-6 md:p-8">
          {renderText({
            path: ["templateLabels", "projectsLabel"],
            value: labels.projectsLabel,
            as: "p",
            className: "font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent)]",
          })}
          {renderText({
            path: ["templateLabels", "projectsTitle"],
            value: labels.projectsTitle,
            as: "h3",
            className: "mt-2 text-3xl font-semibold tracking-[-0.04em] text-white",
          })}
          <div className="mt-8 grid gap-5">
            {data.projects.map((project, index) => (
              <article
                key={project.id}
                className="grid gap-5 rounded-[28px] border border-white/10 bg-white/[0.02] p-4 md:grid-cols-[0.42fr_0.58fr]"
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

        <section className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#0f111b] p-6">
            {renderText({
              path: ["templateLabels", "skillsLabel"],
              value: labels.skillsLabel,
              as: "p",
              className: "font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent)]",
            })}
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
                        style={{ borderColor: withAlpha(accent, "40"), color: accent }}
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

          <div className="grid gap-6">
            <div className="rounded-[30px] border border-white/10 bg-[#0f111b] p-6">
              {renderText({
                path: ["templateLabels", "experienceLabel"],
                value: labels.experienceLabel,
                as: "p",
                className: "font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent)]",
              })}
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
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[#0f111b] p-6">
              {renderText({
                path: ["templateLabels", "educationLabel"],
                value: labels.educationLabel,
                as: "p",
                className: "font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent)]",
              })}
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
            </div>
          </div>
        </section>

        <section
          className="rounded-[30px] border p-6 md:p-8"
          style={{
            borderColor: withAlpha(accent, "55"),
            background: `linear-gradient(135deg, ${withAlpha(accent, "2a")}, rgba(15, 17, 27, 0.95))`,
          }}
        >
          {renderText({
            path: ["contact", "heading"],
            value: data.contact.heading,
            as: "h3",
            className: "max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl",
            multiline: true,
          })}
          {renderText({
            path: ["contact", "message"],
            value: data.contact.message,
            as: "p",
            className: "mt-4 max-w-2xl text-sm leading-7 text-white/72 md:text-base",
            multiline: true,
          })}
          <div className="mt-6 flex flex-wrap items-center gap-4">
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
              className: "text-sm font-medium",
            })}
          </div>
        </section>

        <footer className="flex flex-col gap-3 rounded-[30px] border border-white/10 bg-[#0f111b] p-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          {renderText({
            path: ["footer", "note"],
            value: data.footer.note,
            as: "p",
            className: "leading-7",
            multiline: true,
          })}
          <div style={{ color: accent }}>
            <p className="font-mono text-xs uppercase tracking-[0.24em]">{data.footer.watermark}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
