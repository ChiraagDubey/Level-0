function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function hasStringFields(value: Record<string, unknown>, fields: string[]) {
  return fields.every((field) => typeof value[field] === "string");
}

export class WebsiteImportError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "WebsiteImportError";
    this.statusCode = statusCode;
  }
}

export interface WebsiteImportSocialLink {
  id: string;
  label: string;
  platform: string;
  url: string;
}

export interface WebsiteImportProjectCandidate {
  id: string;
  name: string;
  summary: string;
  url: string;
  image: string;
  tags: string[];
}

export interface WebsiteImportPreview {
  sourceUrl: string;
  title: string;
  metaDescription: string;
  detectedName: string;
  detectedTitle: string;
  detectedLocation: string;
  primaryEmail: string;
  headings: string[];
  paragraphs: string[];
  links: string[];
  images: string[];
  emails: string[];
  socialLinks: WebsiteImportSocialLink[];
  projectCandidates: WebsiteImportProjectCandidate[];
  skills: string[];
  warnings: string[];
}

export interface WebsiteImportApiSuccess {
  status: "success";
  preview: WebsiteImportPreview;
}

export interface WebsiteImportApiFailure {
  status: "error";
  message: string;
}

export type WebsiteImportApiResponse = WebsiteImportApiSuccess | WebsiteImportApiFailure;

export interface CreateImportedPortfolioDraftState {
  status: "idle" | "error";
  message: string | null;
}

function isWebsiteImportSocialLink(value: unknown): value is WebsiteImportSocialLink {
  return isRecord(value) && hasStringFields(value, ["id", "label", "platform", "url"]);
}

function isWebsiteImportProjectCandidate(value: unknown): value is WebsiteImportProjectCandidate {
  return (
    isRecord(value) &&
    hasStringFields(value, ["id", "name", "summary", "url", "image"]) &&
    isStringArray(value.tags)
  );
}

function isWebsiteImportPreview(value: unknown): value is WebsiteImportPreview {
  return (
    isRecord(value) &&
    hasStringFields(value, [
      "sourceUrl",
      "title",
      "metaDescription",
      "detectedName",
      "detectedTitle",
      "detectedLocation",
      "primaryEmail",
    ]) &&
    isStringArray(value.headings) &&
    isStringArray(value.paragraphs) &&
    isStringArray(value.links) &&
    isStringArray(value.images) &&
    isStringArray(value.emails) &&
    Array.isArray(value.socialLinks) &&
    value.socialLinks.every((item) => isWebsiteImportSocialLink(item)) &&
    Array.isArray(value.projectCandidates) &&
    value.projectCandidates.every((item) => isWebsiteImportProjectCandidate(item)) &&
    isStringArray(value.skills) &&
    isStringArray(value.warnings)
  );
}

export function normalizeWebsiteImportPreview(value: unknown): WebsiteImportPreview | null {
  if (isWebsiteImportPreview(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  try {
    const parsedValue: unknown = JSON.parse(trimmedValue);
    return isWebsiteImportPreview(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}
