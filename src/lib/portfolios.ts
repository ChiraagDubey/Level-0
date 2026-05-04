import type { SupabaseClient } from "@supabase/supabase-js";
import { getTemplateDefinition } from "@/lib/templates";
import type { PortfolioData } from "@/types/portfolio";

export interface PortfolioDraftRecord {
  id: string;
  user_id: string;
  title: string;
  template_id: string;
  portfolio_json: PortfolioData;
  created_at: string;
  updated_at: string;
}

export interface PortfolioDraftSummary {
  id: string;
  title: string;
  templateId: string;
  updatedAt: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function hasStringFields(value: Record<string, unknown>, fields: string[]) {
  return fields.every((field) => typeof value[field] === "string");
}

function isPortfolioTheme(value: unknown) {
  return isRecord(value) && hasStringFields(value, ["accentColor", "accentName"]);
}

function isHeroSection(value: unknown) {
  return (
    isRecord(value) &&
    hasStringFields(value, [
      "eyebrow",
      "name",
      "title",
      "intro",
      "resumeLabel",
      "resumeUrl",
      "socialsLabel",
      "socialsUrl",
      "profileImage",
    ])
  );
}

function isAboutSection(value: unknown) {
  return isRecord(value) && hasStringFields(value, ["heading", "body", "location", "availability"]);
}

function isProjectItem(value: unknown) {
  return (
    isRecord(value) &&
    hasStringFields(value, ["id", "name", "summary", "linkLabel", "url", "image"]) &&
    isStringArray(value.tags)
  );
}

function isSkillGroup(value: unknown) {
  return isRecord(value) && hasStringFields(value, ["id", "title"]) && isStringArray(value.items);
}

function isExperienceItem(value: unknown) {
  return isRecord(value) && hasStringFields(value, ["id", "company", "role", "period", "summary"]);
}

function isEducationItem(value: unknown) {
  return isRecord(value) && hasStringFields(value, ["id", "school", "degree", "period"]);
}

function isSocialLink(value: unknown) {
  return isRecord(value) && hasStringFields(value, ["id", "label", "url"]);
}

function isContactSection(value: unknown) {
  return isRecord(value) && hasStringFields(value, ["heading", "email", "message", "ctaLabel"]);
}

function isFooterSection(value: unknown) {
  return isRecord(value) && hasStringFields(value, ["note", "watermark"]);
}

function collectBlobUrls(value: unknown, results: string[]) {
  if (typeof value === "string") {
    if (value.startsWith("blob:")) {
      results.push(value);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectBlobUrls(item, results));
    return;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectBlobUrls(item, results));
  }
}

export function clonePortfolioData(source: PortfolioData) {
  return structuredClone(source);
}

function isPortfolioData(value: unknown): value is PortfolioData {
  return (
    isRecord(value) &&
    typeof value.templateId === "string" &&
    isPortfolioTheme(value.theme) &&
    isHeroSection(value.hero) &&
    isAboutSection(value.about) &&
    Array.isArray(value.projects) &&
    value.projects.every((item) => isProjectItem(item)) &&
    Array.isArray(value.skills) &&
    value.skills.every((item) => isSkillGroup(item)) &&
    Array.isArray(value.experience) &&
    value.experience.every((item) => isExperienceItem(item)) &&
    Array.isArray(value.education) &&
    value.education.every((item) => isEducationItem(item)) &&
    Array.isArray(value.socialLinks) &&
    value.socialLinks.every((item) => isSocialLink(item)) &&
    isContactSection(value.contact) &&
    isFooterSection(value.footer)
  );
}

export function normalizePortfolioData(value: unknown): PortfolioData | null {
  if (isPortfolioData(value)) {
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
    return isPortfolioData(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

export function getInitialPortfolioData(templateId: string) {
  const template = getTemplateDefinition(templateId);
  const portfolio = clonePortfolioData(template.defaultData);
  portfolio.templateId = template.metadata.id;
  return portfolio;
}

export function getDefaultPortfolioTitle(templateId: string) {
  const template = getTemplateDefinition(templateId);
  return `${template.metadata.name} Draft`;
}

export function getPortfolioSaveTitle(portfolio: PortfolioData, fallbackTitle: string) {
  const heroName = portfolio.hero.name.trim();
  return heroName.length > 0 ? heroName : fallbackTitle;
}

export function findPortfolioBlobUrls(portfolio: PortfolioData) {
  const blobUrls: string[] = [];
  collectBlobUrls(portfolio, blobUrls);
  return blobUrls;
}

export async function createPortfolioDraft(
  supabase: SupabaseClient,
  userId: string,
  templateId: string,
) {
  const payload = {
    user_id: userId,
    title: getDefaultPortfolioTitle(templateId),
    template_id: templateId,
    portfolio_json: getInitialPortfolioData(templateId),
  };

  const { data, error } = await supabase
    .from("portfolios")
    .insert(payload)
    .select("id")
    .single();

  if (error || !data?.id) {
    throw new Error(error?.message ?? "Failed to create portfolio draft.");
  }

  return { id: String(data.id) };
}

export async function updatePortfolioDraft(
  supabase: SupabaseClient,
  portfolioId: string,
  userId: string,
  portfolio: PortfolioData,
  fallbackTitle: string,
) {
  const blobUrls = findPortfolioBlobUrls(portfolio);

  if (blobUrls.length > 0) {
    throw new Error("Local image previews cannot be saved yet. Replace blob images before saving.");
  }

  const title = getPortfolioSaveTitle(portfolio, fallbackTitle);
  const { data, error } = await supabase
    .from("portfolios")
    .update({
      title,
      portfolio_json: portfolio,
    })
    .eq("id", portfolioId)
    .eq("user_id", userId)
    .select("id, title")
    .single();

  if (error || !data?.id) {
    throw new Error(error?.message ?? "Failed to save portfolio draft.");
  }

  return {
    id: String(data.id),
    title: String(data.title),
  };
}

export async function deletePortfolioDraft(supabase: SupabaseClient, portfolioId: string, userId: string) {
  const { data, error } = await supabase
    .from("portfolios")
    .delete()
    .eq("id", portfolioId)
    .eq("user_id", userId)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.id) {
    throw new Error("Draft not found or you do not have permission to delete it.");
  }

  return {
    id: String(data.id),
  };
}

export async function listPortfolioDrafts(supabase: SupabaseClient, userId: string): Promise<PortfolioDraftSummary[]> {
  const { data, error } = await supabase
    .from("portfolios")
    .select("id, title, template_id, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((draft) => ({
    id: String(draft.id),
    title: String(draft.title),
    templateId: String(draft.template_id),
    updatedAt: String(draft.updated_at),
  }));
}

export async function getPortfolioDraftById(
  supabase: SupabaseClient,
  portfolioId: string,
  userId: string,
): Promise<PortfolioDraftRecord | null> {
  const { data, error } = await supabase
    .from("portfolios")
    .select("id, user_id, title, template_id, portfolio_json, created_at, updated_at")
    .eq("id", portfolioId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const normalizedPortfolio = normalizePortfolioData(data?.portfolio_json);

  if (!data || !normalizedPortfolio) {
    return null;
  }

  return {
    id: String(data.id),
    user_id: String(data.user_id),
    title: String(data.title),
    template_id: String(data.template_id),
    portfolio_json: clonePortfolioData(normalizedPortfolio),
    created_at: String(data.created_at),
    updated_at: String(data.updated_at),
  };
}
