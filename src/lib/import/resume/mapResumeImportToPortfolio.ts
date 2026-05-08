import { getInitialPortfolioData } from "@/lib/portfolios";
import type {
  EducationItem,
  ExperienceItem,
  PortfolioData,
  ProjectItem,
  SkillGroup,
  SocialLink,
} from "@/types/portfolio";
import type { ResumeImportExtractedData } from "@/types/import";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function hasStringFields(value: Record<string, unknown>, fields: string[]) {
  return fields.every((field) => typeof value[field] === "string");
}

function isSocialLink(value: unknown): value is SocialLink {
  return isRecord(value) && hasStringFields(value, ["id", "label", "url"]);
}

function isProjectItem(value: unknown): value is ProjectItem {
  return (
    isRecord(value) &&
    hasStringFields(value, ["id", "name", "summary", "linkLabel", "url", "image"]) &&
    isStringArray(value.tags)
  );
}

function isExperienceItem(value: unknown): value is ExperienceItem {
  return isRecord(value) && hasStringFields(value, ["id", "company", "role", "period", "summary"]);
}

function isEducationItem(value: unknown): value is EducationItem {
  return isRecord(value) && hasStringFields(value, ["id", "school", "degree", "period"]);
}

function sanitizeText(value: string, maxLength: number) {
  const normalized = value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();

  if (!normalized) {
    return "";
  }

  return normalized.length <= maxLength ? normalized : `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
}

function sanitizeHttpUrl(value: string) {
  const normalized = sanitizeText(value, 400);

  if (!normalized) {
    return "";
  }

  try {
    const url = new URL(normalized);

    if ((url.protocol !== "http:" && url.protocol !== "https:") || url.username || url.password) {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

function sanitizeEmail(value: string) {
  return sanitizeText(value, 160).toLowerCase();
}

function sanitizePhone(value: string) {
  return sanitizeText(value, 40);
}

function sanitizeSocialLinks(items: SocialLink[]) {
  const results: SocialLink[] = [];

  items.forEach((item, index) => {
    const label = sanitizeText(item.label, 60);
    const url = sanitizeHttpUrl(item.url);

    if (!label || !url || results.some((entry) => entry.url.toLowerCase() === url.toLowerCase())) {
      return;
    }

    results.push({
      id: `social-${index + 1}`,
      label,
      url,
    });
  });

  return results.slice(0, 8);
}

function sanitizeProjectItems(items: ProjectItem[], fallbackImages: string[]) {
  return items
    .slice(0, 6)
    .map((item, index) => ({
      id: `project-${index + 1}`,
      name: sanitizeText(item.name, 80),
      summary: sanitizeText(item.summary, 220),
      linkLabel: sanitizeText(item.linkLabel, 40) || "Open Project",
      url: sanitizeHttpUrl(item.url),
      image: fallbackImages[index % Math.max(fallbackImages.length, 1)] || "",
      tags: item.tags.map((tag) => sanitizeText(tag, 30)).filter(Boolean).slice(0, 5),
    }))
    .filter((item) => item.name || item.summary);
}

function sanitizeExperienceItems(items: ExperienceItem[]) {
  return items
    .slice(0, 5)
    .map((item, index) => ({
      id: `exp-${index + 1}`,
      company: sanitizeText(item.company, 80),
      role: sanitizeText(item.role, 80),
      period: sanitizeText(item.period, 60),
      summary: sanitizeText(item.summary, 220),
    }))
    .filter((item) => item.company || item.role || item.summary);
}

function sanitizeEducationItems(items: EducationItem[]) {
  return items
    .slice(0, 4)
    .map((item, index) => ({
      id: `edu-${index + 1}`,
      school: sanitizeText(item.school, 100),
      degree: sanitizeText(item.degree, 120),
      period: sanitizeText(item.period, 60),
    }))
    .filter((item) => item.school || item.degree);
}

function buildSkillGroup(title: string, items: string[], id: string): SkillGroup | null {
  const normalizedItems = items
    .map((item) => sanitizeText(item, 40))
    .filter(Boolean)
    .filter((item, index, array) => array.findIndex((entry) => entry.toLowerCase() === item.toLowerCase()) === index)
    .slice(0, 18);

  if (normalizedItems.length === 0) {
    return null;
  }

  return {
    id,
    title,
    items: normalizedItems,
  };
}

function buildContactMessage(data: ResumeImportExtractedData) {
  const parts = [
    data.email ? `Email: ${sanitizeEmail(data.email)}` : "",
    data.phone ? `Phone: ${sanitizePhone(data.phone)}` : "",
    data.location ? `Location: ${sanitizeText(data.location, 80)}` : "",
  ].filter(Boolean);

  return sanitizeText(parts.join(" | "), 220);
}

export function normalizeResumeImportExtractedData(value: unknown): ResumeImportExtractedData | null {
  const rawValue = typeof value === "string" ? value.trim() : value;

  if (typeof rawValue === "string") {
    if (!rawValue) {
      return null;
    }

    try {
      return normalizeResumeImportExtractedData(JSON.parse(rawValue));
    } catch {
      return null;
    }
  }

  if (
    !isRecord(rawValue) ||
    rawValue.sourceType !== "resume" ||
    !hasStringFields(rawValue, [
      "sourceFileName",
      "name",
      "title",
      "bio",
      "location",
      "email",
      "phone",
    ])
  ) {
    return null;
  }

  if (
    !isStringArray(rawValue.links) ||
    !Array.isArray(rawValue.socialLinks) ||
    !rawValue.socialLinks.every((item) => isSocialLink(item)) ||
    !isStringArray(rawValue.skills) ||
    !Array.isArray(rawValue.projects) ||
    !rawValue.projects.every((item) => isProjectItem(item)) ||
    !Array.isArray(rawValue.experience) ||
    !rawValue.experience.every((item) => isExperienceItem(item)) ||
    !Array.isArray(rawValue.education) ||
    !rawValue.education.every((item) => isEducationItem(item)) ||
    !isStringArray(rawValue.certifications) ||
    !isStringArray(rawValue.warnings)
  ) {
    return null;
  }

  return rawValue as unknown as ResumeImportExtractedData;
}

export function mapResumeImportToPortfolio(templateId: string, data: ResumeImportExtractedData): PortfolioData {
  const portfolio = getInitialPortfolioData(templateId);
  const defaultProjectImages = portfolio.projects.map((project) => project.image).filter(Boolean);
  const socialLinks = sanitizeSocialLinks(data.socialLinks);
  const primaryLink = socialLinks[0]?.url ?? data.links.map((link) => sanitizeHttpUrl(link)).find(Boolean) ?? "";
  const coreSkills = buildSkillGroup("Core skills", data.skills, "skills-1");
  const certifications = buildSkillGroup("Certifications", data.certifications, "skills-2");

  portfolio.hero.eyebrow = "Imported resume";
  portfolio.hero.name = sanitizeText(data.name, 80);
  portfolio.hero.title = sanitizeText(data.title, 120);
  portfolio.hero.intro = sanitizeText(data.bio, 320);
  portfolio.hero.resumeUrl = "";
  portfolio.hero.socialsUrl = primaryLink;
  portfolio.about.body = sanitizeText(data.bio, 420);
  portfolio.about.location = sanitizeText(data.location, 80);
  portfolio.about.availability = "";
  portfolio.projects = sanitizeProjectItems(data.projects, defaultProjectImages);
  portfolio.skills = [coreSkills, certifications].filter((group): group is SkillGroup => Boolean(group));
  portfolio.experience = sanitizeExperienceItems(data.experience);
  portfolio.education = sanitizeEducationItems(data.education);
  portfolio.socialLinks = socialLinks;
  portfolio.contact.email = sanitizeEmail(data.email);
  portfolio.contact.message = buildContactMessage(data);
  portfolio.footer.note = "Imported from resume";

  return portfolio;
}
