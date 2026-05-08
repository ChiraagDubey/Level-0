import "server-only";

import type {
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SocialLink,
} from "@/types/portfolio";
import type { ResumeImportExtractedData } from "@/types/import";

const MAX_LINKS = 10;
const MAX_SOCIAL_LINKS = 8;
const MAX_SKILLS = 18;
const MAX_PROJECTS = 6;
const MAX_EXPERIENCE = 5;
const MAX_EDUCATION = 4;
const MAX_CERTIFICATIONS = 8;
const MAX_WARNINGS = 8;

const ROLE_KEYWORDS = [
  "engineer",
  "developer",
  "designer",
  "founder",
  "consultant",
  "manager",
  "architect",
  "student",
  "product",
  "frontend",
  "backend",
  "full stack",
  "full-stack",
  "analyst",
  "specialist",
];

const TECH_KEYWORDS = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "SCSS",
  "Sass",
  "GraphQL",
  "REST API",
  "Supabase",
  "Firebase",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Prisma",
  "Docker",
  "AWS",
  "Vercel",
  "Netlify",
  "Figma",
  "Framer",
  "Redux",
  "React Native",
  "Python",
  "Django",
  "Flask",
  "Java",
  "C++",
  "Git",
  "GitHub",
  "CI/CD",
  "Jest",
  "Cypress",
];

const SECTION_PATTERNS = [
  { key: "summary", pattern: /^(summary|profile|about|objective|professional summary)$/i },
  { key: "skills", pattern: /^(skills|technical skills|core skills|tech stack|tools|expertise)$/i },
  { key: "projects", pattern: /^(projects|personal projects|selected projects)$/i },
  { key: "experience", pattern: /^(experience|work experience|professional experience|employment|work history)$/i },
  { key: "education", pattern: /^(education|academic background|qualifications?)$/i },
  { key: "certifications", pattern: /^(certifications|certificates|licenses?)$/i },
];

function toAscii(value: string) {
  return value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[^\x20-\x7E\n]/g, " ");
}

function sanitizeText(value: string, maxLength: number) {
  const normalized = toAscii(value).replace(/[ \t]+/g, " ").replace(/\s+\n/g, "\n").trim();

  if (!normalized) {
    return "";
  }

  return normalized.length <= maxLength ? normalized : `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
}

function pushUnique(
  list: string[],
  rawValue: string,
  maxItems: number,
  maxLength: number,
  normalizer: (value: string) => string = (value) => value.toLowerCase(),
) {
  const value = sanitizeText(rawValue, maxLength);

  if (!value) {
    return;
  }

  const normalized = normalizer(value);

  if (list.some((item) => normalizer(item) === normalized)) {
    return;
  }

  if (list.length < maxItems) {
    list.push(value);
  }
}

function normalizeUrl(rawValue: string) {
  const trimmed = sanitizeText(rawValue.replace(/[),.;]+$/, ""), 240);

  if (!trimmed) {
    return "";
  }

  const withProtocol = /^(https?:)?\/\//i.test(trimmed)
    ? trimmed.replace(/^\/\//, "https://")
    : /^(www\.|github\.com|linkedin\.com|gitlab\.com|behance\.net|dribbble\.com|medium\.com)/i.test(trimmed)
      ? `https://${trimmed}`
      : "";

  if (!withProtocol) {
    return "";
  }

  try {
    const url = new URL(withProtocol);

    if ((url.protocol !== "http:" && url.protocol !== "https:") || url.username || url.password) {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

function extractUrls(text: string) {
  const matches = text.match(/(?:https?:\/\/|www\.)[^\s<>()]+/gi) ?? [];
  const urls: string[] = [];

  matches.forEach((match) => {
    pushUnique(urls, normalizeUrl(match), MAX_LINKS, 240);
  });

  return urls;
}

function extractEmails(text: string) {
  const matches = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
  const emails: string[] = [];

  matches.forEach((match) => {
    pushUnique(emails, match.toLowerCase(), 5, 160, (value) => value.toLowerCase());
  });

  return emails;
}

function extractPhones(text: string) {
  const matches = text.match(/(?:\+?\d[\d(). -]{7,}\d)/g) ?? [];
  const phones: string[] = [];

  matches.forEach((match) => {
    const digits = match.replace(/\D/g, "");

    if (digits.length < 10 || digits.length > 15) {
      return;
    }

    pushUnique(phones, match, 4, 40, (value) => value.replace(/\D/g, ""));
  });

  return phones;
}

function detectSocialLinks(urls: string[]) {
  const links: SocialLink[] = [];
  const platforms = [
    { label: "GitHub", hosts: ["github.com"] },
    { label: "LinkedIn", hosts: ["linkedin.com"] },
    { label: "GitLab", hosts: ["gitlab.com"] },
    { label: "Dribbble", hosts: ["dribbble.com"] },
    { label: "Behance", hosts: ["behance.net"] },
    { label: "Medium", hosts: ["medium.com"] },
    { label: "X", hosts: ["x.com", "twitter.com"] },
  ];

  urls.forEach((url, index) => {
    try {
      const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
      const platform = platforms.find((entry) =>
        entry.hosts.some((host) => hostname === host || hostname.endsWith(`.${host}`)),
      );

      if (!platform || links.some((item) => item.url.toLowerCase() === url.toLowerCase()) || links.length >= MAX_SOCIAL_LINKS) {
        return;
      }

      links.push({
        id: `social-${index + 1}`,
        label: platform.label,
        url,
      });
    } catch {
      return;
    }
  });

  return links;
}

function normalizeLines(text: string) {
  return toAscii(text)
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .replace(/\u2022/g, "-")
    .split("\n")
    .map((line) => line.trim())
    .filter((line, index, lines) => !(line === "" && lines[index - 1] === ""));
}

function matchSection(line: string) {
  const normalizedLine = line.replace(/[:|-]+$/, "").trim();

  return SECTION_PATTERNS.find(({ pattern }) => pattern.test(normalizedLine)) ?? null;
}

function buildSections(lines: string[]) {
  const sections: Record<string, string[]> = {
    top: [],
    summary: [],
    skills: [],
    projects: [],
    experience: [],
    education: [],
    certifications: [],
  };
  let currentSection = "top";

  lines.forEach((line) => {
    if (!line) {
      sections[currentSection].push("");
      return;
    }

    const sectionMatch = matchSection(line);

    if (sectionMatch) {
      currentSection = sectionMatch.key;
      return;
    }

    const colonMatch = line.match(/^([A-Za-z][A-Za-z /&]+):\s+(.+)$/);

    if (colonMatch) {
      const inlineSection = matchSection(colonMatch[1] ?? "");

      if (inlineSection) {
        currentSection = inlineSection.key;
        sections[currentSection].push(colonMatch[2] ?? "");
        return;
      }
    }

    sections[currentSection].push(line);
  });

  return sections;
}

function looksLikePersonName(line: string) {
  const words = line.trim().split(/\s+/);

  if (words.length < 2 || words.length > 4 || /[@\d/|]/.test(line) || line.length > 60) {
    return false;
  }

  return words.every((word) => /^[A-Z][a-zA-Z'.-]*$/.test(word));
}

function detectName(lines: string[]) {
  for (const line of lines.slice(0, 6)) {
    if (looksLikePersonName(line)) {
      return sanitizeText(line, 80);
    }
  }

  return "";
}

function detectTitle(lines: string[], summaryLines: string[]) {
  const candidates = [...lines.slice(0, 8), ...summaryLines.slice(0, 3)];

  for (const candidate of candidates) {
    const value = sanitizeText(candidate, 120);
    const lowerValue = value.toLowerCase();

    if (!value || value.includes("@") || /^https?:\/\//i.test(value)) {
      continue;
    }

    if (ROLE_KEYWORDS.some((keyword) => lowerValue.includes(keyword))) {
      return value;
    }
  }

  for (const candidate of lines.slice(1, 5)) {
    const value = sanitizeText(candidate, 120);

    if (value && value.length >= 8 && value.length <= 90 && !/[@\d]/.test(value)) {
      return value;
    }
  }

  return "";
}

function detectLocation(lines: string[]) {
  const patterns = [
    /\bbased in ([A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+)*(?:,\s*[A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+)*)?)/,
    /\blocated in ([A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+)*(?:,\s*[A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+)*)?)/,
    /\b([A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+)*,\s*[A-Z][a-zA-Z]+)\b/,
  ];

  for (const line of lines.slice(0, 12)) {
    if (line.includes("@") || /^https?:\/\//i.test(line)) {
      continue;
    }

    for (const pattern of patterns) {
      const match = line.match(pattern);

      if (match?.[1]) {
        return sanitizeText(match[1], 80);
      }
    }
  }

  return "";
}

function detectBio(summaryLines: string[], topLines: string[]) {
  const summary = sanitizeText(summaryLines.filter(Boolean).join(" "), 420);

  if (summary) {
    return summary;
  }

  const topSummaryCandidates = topLines.filter((line) => line.length > 40 && !line.includes("@") && !/^https?:\/\//i.test(line));
  return sanitizeText(topSummaryCandidates.slice(0, 2).join(" "), 420);
}

function parseSkills(skillsLines: string[], fallbackText: string) {
  const skills: string[] = [];
  const sourceLines = skillsLines.length > 0 ? skillsLines : [fallbackText];

  sourceLines.forEach((line) => {
    const normalizedLine = line.replace(/^[\-*]\s*/, "");
    const listSource = normalizedLine.includes(":") ? normalizedLine.split(":").slice(1).join(":") : normalizedLine;

    listSource.split(/[,|/;]+/).forEach((part) => {
      const value = sanitizeText(part, 40);

      if (!value || value.length > 32 || /^https?:\/\//i.test(value)) {
        return;
      }

      if (/[.!?]/.test(value) && value.split(/\s+/).length > 4) {
        return;
      }

      pushUnique(skills, value, MAX_SKILLS, 40);
    });
  });

  TECH_KEYWORDS.forEach((keyword) => {
    const pattern = new RegExp(`(^|[^a-z0-9])${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").toLowerCase()}([^a-z0-9]|$)`, "i");

    if (pattern.test(fallbackText.toLowerCase())) {
      pushUnique(skills, keyword, MAX_SKILLS, 40);
    }
  });

  return skills;
}

function splitSectionChunks(lines: string[]) {
  const chunks: string[][] = [];
  let currentChunk: string[] = [];

  lines.forEach((line) => {
    if (!line) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
        currentChunk = [];
      }
      return;
    }

    const normalizedLine = line.replace(/^[\-*]\s*/, "").trim();

    if (!normalizedLine) {
      return;
    }

    if (/^[\-*]\s+/.test(line) && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = [normalizedLine];
      return;
    }

    currentChunk.push(normalizedLine);
  });

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

function extractPeriod(text: string) {
  const match = text.match(
    /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s+\d{4}|\d{4})(?:\s*(?:-|to)\s*((?:Present|Current|Now)|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s+\d{4}|\d{4}))?/i,
  );

  if (!match) {
    return "";
  }

  const start = sanitizeText(match[1] ?? "", 40);
  const end = sanitizeText(match[2] ?? "", 40);

  return start ? (end ? `${start} - ${end}` : start) : "";
}

function splitRoleAndCompany(value: string) {
  const atIndex = value.toLowerCase().indexOf(" at ");

  if (atIndex > 0) {
    return {
      role: sanitizeText(value.slice(0, atIndex), 80),
      company: sanitizeText(value.slice(atIndex + 4), 80),
    };
  }

  const divider = value.includes("|") ? "|" : value.includes("-") ? "-" : "";

  if (!divider) {
    return {
      role: sanitizeText(value, 80),
      company: "",
    };
  }

  const [role, company] = value.split(divider, 2);
  return {
    role: sanitizeText(role ?? "", 80),
    company: sanitizeText(company ?? "", 80),
  };
}

function parseProjects(lines: string[], urls: string[]) {
  return splitSectionChunks(lines)
    .slice(0, MAX_PROJECTS)
    .map((chunk, index) => {
      const text = sanitizeText(chunk.join(" "), 260);
      const name = sanitizeText(chunk[0] ?? "", 80);
      const summary = sanitizeText(chunk.slice(1).join(" ") || text.replace(name, ""), 200);
      const url = urls.find((entry) => text.includes(entry)) ?? "";
      const tags = parseSkills(chunk, text).slice(0, 4);

      return {
        id: `project-${index + 1}`,
        name,
        summary,
        linkLabel: url ? "Open Project" : "View Details",
        url,
        image: "",
        tags,
      };
    })
    .filter((item) => item.name || item.summary);
}

function parseExperience(lines: string[]) {
  return splitSectionChunks(lines)
    .slice(0, MAX_EXPERIENCE)
    .map((chunk, index) => {
      const firstLine = sanitizeText(chunk[0] ?? "", 100);
      const { role, company } = splitRoleAndCompany(firstLine);
      const summary = sanitizeText(chunk.slice(1).join(" "), 220);
      const period = extractPeriod(chunk.join(" "));

      return {
        id: `exp-${index + 1}`,
        company,
        role,
        period,
        summary,
      };
    })
    .filter((item) => item.role || item.company || item.summary);
}

function parseEducation(lines: string[]) {
  return splitSectionChunks(lines)
    .slice(0, MAX_EDUCATION)
    .map((chunk, index) => {
      const joined = chunk.join(" ");
      const school =
        sanitizeText(
          chunk.find((line) => /(university|college|school|institute|academy)/i.test(line)) ?? chunk[0] ?? "",
          100,
        );
      const degree =
        sanitizeText(
          chunk.find((line) => /(bachelor|master|mba|phd|b\.?tech|m\.?tech|diploma|certificate|bootcamp|course)/i.test(line)) ??
            chunk[1] ??
            "",
          120,
        );
      const period = extractPeriod(joined);

      return {
        id: `edu-${index + 1}`,
        school,
        degree,
        period,
      };
    })
    .filter((item) => item.school || item.degree);
}

function parseCertifications(lines: string[]) {
  const certifications: string[] = [];

  lines.forEach((line) => {
    line
      .split(/[|;]/)
      .map((part) => sanitizeText(part.replace(/^[\-*]\s*/, ""), 100))
      .filter(Boolean)
      .forEach((value) => {
        pushUnique(certifications, value, MAX_CERTIFICATIONS, 100);
      });
  });

  return certifications;
}

function buildWarnings(data: Omit<ResumeImportExtractedData, "warnings">) {
  const warnings: string[] = [];
  const hasStructuredContent =
    data.skills.length > 0 ||
    data.projects.length > 0 ||
    data.experience.length > 0 ||
    data.education.length > 0 ||
    data.certifications.length > 0 ||
    data.socialLinks.length > 0;

  if (!data.name) {
    pushUnique(warnings, "No clear name was detected.", MAX_WARNINGS, 120);
  }

  if (!data.title) {
    pushUnique(warnings, "No clear professional title was detected.", MAX_WARNINGS, 120);
  }

  if (!data.email) {
    pushUnique(warnings, "No email address was detected.", MAX_WARNINGS, 120);
  }

  if (data.skills.length === 0) {
    pushUnique(warnings, "Could not detect skills.", MAX_WARNINGS, 120);
  }

  if (data.projects.length === 0) {
    pushUnique(warnings, "Could not confidently detect projects.", MAX_WARNINGS, 120);
  }

  if (data.experience.length === 0) {
    pushUnique(warnings, "No experience entries were parsed.", MAX_WARNINGS, 120);
  }

  if (data.education.length === 0) {
    pushUnique(warnings, "No education entries were parsed.", MAX_WARNINGS, 120);
  }

  if (!hasStructuredContent && (data.bio || data.title || data.links.length > 0 || data.phone || data.location)) {
    pushUnique(warnings, "Only limited resume structure could be detected.", MAX_WARNINGS, 120);
  }

  return warnings;
}

export function parseResumeContent(text: string, sourceFileName: string): ResumeImportExtractedData {
  const lines = normalizeLines(text);
  const sections = buildSections(lines);
  const topLines = sections.top.filter(Boolean);
  const summaryLines = sections.summary.filter(Boolean);
  const allText = lines.join("\n");
  const links = extractUrls(allText);
  const emails = extractEmails(allText);
  const phones = extractPhones(allText);
  const socialLinks = detectSocialLinks(links);
  const dataWithoutWarnings = {
    sourceType: "resume" as const,
    sourceFileName: sanitizeText(sourceFileName, 120),
    name: detectName(topLines),
    title: detectTitle(topLines, summaryLines),
    bio: detectBio(summaryLines, topLines),
    location: detectLocation(topLines.concat(summaryLines)),
    email: emails[0] ?? "",
    phone: phones[0] ?? "",
    links: links.slice(0, MAX_LINKS),
    socialLinks,
    skills: parseSkills(sections.skills.filter(Boolean), allText),
    projects: parseProjects(sections.projects, links),
    experience: parseExperience(sections.experience),
    education: parseEducation(sections.education),
    certifications: parseCertifications(sections.certifications),
  };

  return {
    ...dataWithoutWarnings,
    warnings: buildWarnings(dataWithoutWarnings),
  };
}
