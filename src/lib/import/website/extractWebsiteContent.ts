import { load, type CheerioAPI } from "cheerio";
import type { Element, AnyNode } from "domhandler";
import type {
  WebsiteImportPreview,
  WebsiteImportProjectCandidate,
  WebsiteImportSocialLink,
} from "@/types/websiteImport";

const MAX_TITLE_LENGTH = 140;
const MAX_DESCRIPTION_LENGTH = 240;
const MAX_HEADING_LENGTH = 120;
const MAX_PARAGRAPH_LENGTH = 280;
const MAX_LINK_LENGTH = 240;
const MAX_EMAIL_LENGTH = 120;
const MAX_HEADINGS = 12;
const MAX_PARAGRAPHS = 10;
const MAX_LINKS = 20;
const MAX_IMAGES = 8;
const MAX_EMAILS = 5;
const MAX_SOCIAL_LINKS = 8;
const MAX_PROJECTS = 6;
const MAX_PROJECT_TAGS = 4;
const MAX_SKILLS = 18;
const MAX_WARNINGS = 8;

const PROJECT_SECTION_KEYWORDS = ["project", "projects", "work", "case study", "case studies", "portfolio"];
const ROLE_KEYWORDS = [
  "engineer",
  "developer",
  "designer",
  "founder",
  "consultant",
  "manager",
  "student",
  "architect",
  "freelance",
  "product",
  "frontend",
  "backend",
  "full-stack",
  "full stack",
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

const SOCIAL_PLATFORMS = [
  { label: "GitHub", platform: "github", hosts: ["github.com"] },
  { label: "LinkedIn", platform: "linkedin", hosts: ["linkedin.com"] },
  { label: "X", platform: "x", hosts: ["x.com", "twitter.com"] },
  { label: "GitLab", platform: "gitlab", hosts: ["gitlab.com"] },
  { label: "Dribbble", platform: "dribbble", hosts: ["dribbble.com"] },
  { label: "Behance", platform: "behance", hosts: ["behance.net"] },
  { label: "Medium", platform: "medium", hosts: ["medium.com"] },
  { label: "Dev.to", platform: "devto", hosts: ["dev.to"] },
  { label: "Instagram", platform: "instagram", hosts: ["instagram.com"] },
  { label: "YouTube", platform: "youtube", hosts: ["youtube.com", "youtu.be"] },
];

function sanitizeText(value: string, maxLength: number) {
  const normalized = value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();

  if (!normalized) {
    return "";
  }

  return normalized.length <= maxLength ? normalized : `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
}

function sanitizeFreeformText(value: string, maxLength: number) {
  return sanitizeText(value.replace(/\s*\|\s*/g, " | "), maxLength);
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

function toAbsoluteHttpUrl(rawValue: string | undefined, baseUrl: string) {
  if (!rawValue) {
    return "";
  }

  try {
    const url = new URL(rawValue, baseUrl);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "";
    }

    if (url.username || url.password) {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

function looksLikePersonName(value: string) {
  const words = value.trim().split(/\s+/);

  if (words.length < 2 || words.length > 4 || /[0-9@/]/.test(value) || value.length > 60) {
    return false;
  }

  return words.every((word) => /^[A-Z][a-zA-Z'.-]*$/.test(word));
}

function detectSocialPlatform(urlString: string) {
  try {
    const hostname = new URL(urlString).hostname.toLowerCase().replace(/^www\./, "");

    return SOCIAL_PLATFORMS.find((platform) =>
      platform.hosts.some((host) => hostname === host || hostname.endsWith(`.${host}`)),
    );
  } catch {
    return null;
  }
}

function normalizeEmailAddress(value: string) {
  return value.trim().toLowerCase();
}

function extractEmailsFromText(text: string) {
  const matches = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
  const emails: string[] = [];

  matches.forEach((match) => {
    pushUnique(emails, normalizeEmailAddress(match), MAX_EMAILS, MAX_EMAIL_LENGTH, normalizeEmailAddress);
  });

  return emails;
}

function extractMetaDescription($: CheerioAPI) {
  const metaSelectors = [
    'meta[name="description"]',
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
  ];

  for (const selector of metaSelectors) {
    const content = $("head").find(selector).attr("content");

    if (!content) {
      continue;
    }

    const sanitized = sanitizeFreeformText(content, MAX_DESCRIPTION_LENGTH);

    if (sanitized) {
      return sanitized;
    }
  }

  return "";
}

function extractHeadings($: CheerioAPI) {
  const headings: string[] = [];

  $("h1, h2, h3").each((_, element) => {
    if ($(element).closest("header, nav, footer").length > 0) {
      return;
    }

    pushUnique(headings, $(element).text(), MAX_HEADINGS, MAX_HEADING_LENGTH);
  });

  return headings;
}

function extractParagraphs($: CheerioAPI) {
  const paragraphs: string[] = [];

  $("p").each((_, element) => {
    if ($(element).closest("header, nav, footer, aside").length > 0) {
      return;
    }

    const text = sanitizeFreeformText($(element).text(), MAX_PARAGRAPH_LENGTH);

    if (text.length < 40) {
      return;
    }

    pushUnique(paragraphs, text, MAX_PARAGRAPHS, MAX_PARAGRAPH_LENGTH);
  });

  return paragraphs;
}

function extractLinks($: CheerioAPI, baseUrl: string) {
  const links: string[] = [];

  $('a[href]').each((_, element) => {
    const url = toAbsoluteHttpUrl($(element).attr("href"), baseUrl);

    if (!url) {
      return;
    }

    pushUnique(links, url, MAX_LINKS, MAX_LINK_LENGTH);
  });

  return links;
}

function extractImages($: CheerioAPI, baseUrl: string) {
  const images: string[] = [];
  const metaSelectors = ['meta[property="og:image"]', 'meta[name="twitter:image"]'];

  metaSelectors.forEach((selector) => {
    pushUnique(images, toAbsoluteHttpUrl($("head").find(selector).attr("content"), baseUrl), MAX_IMAGES, MAX_LINK_LENGTH);
  });

  $('img[src]').each((_, element) => {
    const url = toAbsoluteHttpUrl($(element).attr("src"), baseUrl);

    if (!url) {
      return;
    }

    const width = Number($(element).attr("width") ?? "");
    const height = Number($(element).attr("height") ?? "");

    if ((Number.isFinite(width) && width > 0 && width < 48) || (Number.isFinite(height) && height > 0 && height < 48)) {
      return;
    }

    pushUnique(images, url, MAX_IMAGES, MAX_LINK_LENGTH);
  });

  return images;
}

function extractSocialLinks($: CheerioAPI, baseUrl: string) {
  const links: WebsiteImportSocialLink[] = [];

  $('a[href]').each((_, element) => {
    const url = toAbsoluteHttpUrl($(element).attr("href"), baseUrl);

    if (!url) {
      return;
    }

    const platform = detectSocialPlatform(url);

    if (!platform || links.length >= MAX_SOCIAL_LINKS) {
      return;
    }

    if (links.some((item) => item.url.toLowerCase() === url.toLowerCase())) {
      return;
    }

    links.push({
      id: `social-${links.length + 1}`,
      label: sanitizeText($(element).text(), 60) || platform.label,
      platform: platform.platform,
      url,
    });
  });

  return links;
}

function extractKeywordSkills(textBlocks: string[]) {
  const combinedText = textBlocks.join(" ").toLowerCase();
  const skills: string[] = [];

  TECH_KEYWORDS.forEach((keyword) => {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
    const pattern = new RegExp(`(^|[^a-z0-9])${escaped.toLowerCase()}([^a-z0-9]|$)`, "i");

    if (pattern.test(combinedText)) {
      pushUnique(skills, keyword, MAX_SKILLS, 60);
    }
  });

  return skills;
}

function extractSectionSkills($: CheerioAPI) {
  const skills: string[] = [];

  $("section, div").each((_, element) => {
    const descriptor = `${$(element).attr("id") ?? ""} ${$(element).attr("class") ?? ""}`.toLowerCase();

    if (!/(skill|stack|tech|tool)/.test(descriptor)) {
      return;
    }

    $(element)
      .find("li, span, a, p")
      .each((__, child) => {
        const text = sanitizeText($(child).text(), 60);

        if (!text || text.length > 40 || (/[.!?]/.test(text) && text.split(/\s+/).length > 5)) {
          return;
        }

        pushUnique(skills, text, MAX_SKILLS, 60);
      });
  });

  return skills;
}

function extractMetaKeywordSkills($: CheerioAPI) {
  const content = $("head").find('meta[name="keywords"]').attr("content");
  const skills: string[] = [];

  if (!content) {
    return skills;
  }

  content.split(",").forEach((token) => {
    const value = sanitizeText(token, 60);

    if (!value || value.length > 30) {
      return;
    }

    pushUnique(skills, value, MAX_SKILLS, 60);
  });

  return skills;
}

function extractProjectTags(text: string) {
  return extractKeywordSkills([text]).slice(0, MAX_PROJECT_TAGS);
}

function isLikelyProjectCandidate($: CheerioAPI, element: AnyNode) {
  const descriptor = `${$(element).attr("id") ?? ""} ${$(element).attr("class") ?? ""}`.toLowerCase();
  const text = sanitizeFreeformText($(element).text(), 400).toLowerCase();
  let score = 0;

  if (/(project|case-study|case study|work|portfolio)/.test(descriptor)) {
    score += 2;
  }

  if (/(project|case study|selected work|featured work)/.test(text)) {
    score += 1;
  }

  if ($(element).find("h1, h2, h3, h4").length > 0) {
    score += 1;
  }

  if ($(element).find('a[href]').length > 0) {
    score += 1;
  }

  if ($(element).find("p").length > 0) {
    score += 1;
  }

  return score >= 3;
}

function buildProjectCandidate($: CheerioAPI, element: AnyNode, baseUrl: string): WebsiteImportProjectCandidate | null {
  if (!isLikelyProjectCandidate($, element)) {
    return null;
  }

  const linkElement = $(element).find('a[href]').first();
  const url = toAbsoluteHttpUrl(linkElement.attr("href"), baseUrl);
  const heading = sanitizeText($(element).find("h1, h2, h3, h4").first().text(), 80);
  const linkText = sanitizeText(linkElement.text(), 80);
  const name = heading || linkText;

  if (!name || name.length < 3) {
    return null;
  }

  const summary =
    sanitizeFreeformText($(element).find("p").first().text(), 180) ||
    sanitizeFreeformText($(element).text(), 180);

  if (!summary || summary.length < 24) {
    return null;
  }

  return {
    id: "",
    name,
    summary,
    url,
    image: toAbsoluteHttpUrl($(element).find("img").first().attr("src"), baseUrl),
    tags: extractProjectTags($(element).text()),
  };
}

function extractProjectCandidates($: CheerioAPI, baseUrl: string) {
  const candidates: WebsiteImportProjectCandidate[] = [];
  const seen = new Set<string>();
  const selectors = [
    '[class*="project"]',
    '[id*="project"]',
    '[class*="case-study"]',
    '[id*="case-study"]',
    '[class*="work"]',
    '[id*="work"]',
    "article",
  ];

  selectors.forEach((selector) => {
    $(selector).each((_, element) => {
      if (candidates.length >= MAX_PROJECTS) {
        return;
      }

      const candidate = buildProjectCandidate($, element, baseUrl);

      if (!candidate) {
        return;
      }

      const dedupeKey = `${candidate.name.toLowerCase()}|${candidate.url.toLowerCase()}`;

      if (seen.has(dedupeKey)) {
        return;
      }

      seen.add(dedupeKey);
      candidate.id = `project-${candidates.length + 1}`;
      candidates.push(candidate);
    });
  });

  if (candidates.length >= MAX_PROJECTS) {
    return candidates;
  }

  $("h2, h3").each((_, heading) => {
    if (candidates.length >= MAX_PROJECTS) {
      return;
    }

    const headingText = sanitizeText($(heading).text(), 80).toLowerCase();

    if (!PROJECT_SECTION_KEYWORDS.some((keyword) => headingText.includes(keyword))) {
      return;
    }

    const section = $(heading).closest("section, article, main, div");

    section.find("article, li, div").each((__, element) => {
      if (candidates.length >= MAX_PROJECTS) {
        return;
      }

      const candidate = buildProjectCandidate($, element, baseUrl);

      if (!candidate) {
        return;
      }

      const dedupeKey = `${candidate.name.toLowerCase()}|${candidate.url.toLowerCase()}`;

      if (seen.has(dedupeKey)) {
        return;
      }

      seen.add(dedupeKey);
      candidate.id = `project-${candidates.length + 1}`;
      candidates.push(candidate);
    });
  });

  return candidates;
}

function detectName(title: string, headings: string[]) {
  const firstHeading = headings[0] ?? "";

  if (looksLikePersonName(firstHeading)) {
    return firstHeading;
  }

  const titleSegment = sanitizeText(title.split(/[|\-]/)[0] ?? "", 80);
  return looksLikePersonName(titleSegment) ? titleSegment : "";
}

function detectRoleTitle(title: string, headings: string[], paragraphs: string[], metaDescription: string) {
  const candidates = [
    sanitizeText(title.split(/[|\-]/).slice(1).join(" "), 90),
    headings.find((heading) => ROLE_KEYWORDS.some((keyword) => heading.toLowerCase().includes(keyword))) ?? "",
    paragraphs.find((paragraph) => ROLE_KEYWORDS.some((keyword) => paragraph.toLowerCase().includes(keyword))) ?? "",
    metaDescription,
  ];

  for (const candidate of candidates) {
    const value = sanitizeFreeformText(candidate, 90);

    if (value && ROLE_KEYWORDS.some((keyword) => value.toLowerCase().includes(keyword))) {
      return value;
    }
  }

  return "";
}

function detectLocation(textBlocks: string[]) {
  const locationPatterns = [
    /\bbased in ([A-Z][a-z]+(?:\s[A-Z][a-z]+)*(?:,\s*[A-Z][a-z]+(?:\s[A-Z][a-z]+)*)?)/,
    /\blocated in ([A-Z][a-z]+(?:\s[A-Z][a-z]+)*(?:,\s*[A-Z][a-z]+(?:\s[A-Z][a-z]+)*)?)/,
  ];

  for (const block of textBlocks) {
    for (const pattern of locationPatterns) {
      const match = block.match(pattern);

      if (match?.[1]) {
        return sanitizeText(match[1], 80);
      }
    }
  }

  return "";
}

function buildWarnings(preview: Omit<WebsiteImportPreview, "warnings">) {
  const warnings: string[] = [];

  if (!preview.title) {
    pushUnique(warnings, "No reliable page title was detected.", MAX_WARNINGS, 120);
  }

  if (!preview.primaryEmail) {
    pushUnique(warnings, "No public email address was detected on the page.", MAX_WARNINGS, 120);
  }

  if (preview.socialLinks.length === 0) {
    pushUnique(warnings, "No recognizable social profile links were found.", MAX_WARNINGS, 120);
  }

  if (preview.projectCandidates.length === 0) {
    pushUnique(warnings, "No likely project cards or project links were detected.", MAX_WARNINGS, 120);
  }

  if (preview.skills.length === 0) {
    pushUnique(warnings, "No clear skills or tech stack keywords were detected.", MAX_WARNINGS, 120);
  }

  if (preview.paragraphs.length === 0) {
    pushUnique(warnings, "Very little descriptive body text was available to parse.", MAX_WARNINGS, 120);
  }

  return warnings;
}

export function extractWebsiteContent(html: string, sourceUrl: string): WebsiteImportPreview {
  const $ = load(html);

  $("script, style, noscript, template, svg").remove();

  const title = sanitizeText($("title").first().text(), MAX_TITLE_LENGTH);
  const metaDescription = extractMetaDescription($);
  const headings = extractHeadings($);
  const paragraphs = extractParagraphs($);
  const links = extractLinks($, sourceUrl);
  const images = extractImages($, sourceUrl);
  const socialLinks = extractSocialLinks($, sourceUrl);
  const rawBodyText = $("body").text();
  const emails = extractEmailsFromText(rawBodyText);

  $('a[href^="mailto:"]').each((_, element) => {
    const href = $(element).attr("href") ?? "";
    const email = href.slice("mailto:".length).split("?")[0] ?? "";
    pushUnique(emails, normalizeEmailAddress(email), MAX_EMAILS, MAX_EMAIL_LENGTH, normalizeEmailAddress);
  });

  const projectCandidates = extractProjectCandidates($, sourceUrl);
  const skills = [
    ...extractMetaKeywordSkills($),
    ...extractSectionSkills($),
    ...extractKeywordSkills([
      title,
      metaDescription,
      ...headings,
      ...paragraphs,
      ...projectCandidates.map((project) => project.summary),
    ]),
  ].reduce<string[]>((result, skill) => {
    pushUnique(result, skill, MAX_SKILLS, 60);
    return result;
  }, []);

  const previewBase = {
    sourceUrl,
    title,
    metaDescription,
    detectedName: detectName(title, headings),
    detectedTitle: detectRoleTitle(title, headings, paragraphs, metaDescription),
    detectedLocation: detectLocation([metaDescription, ...paragraphs]),
    primaryEmail: emails[0] ?? "",
    headings,
    paragraphs,
    links,
    images,
    emails,
    socialLinks,
    projectCandidates,
    skills,
  };

  return {
    ...previewBase,
    warnings: buildWarnings(previewBase),
  };
}
