"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createPortfolioDraft,
  deletePortfolioDraft,
  findPortfolioBlobUrls,
  getDefaultPortfolioTitle,
  getPortfolioSaveTitle,
  updatePortfolioDraft,
} from "@/lib/portfolios";
import {
  mapResumeImportToPortfolio,
  normalizeResumeImportExtractedData,
} from "@/lib/import/resume/mapResumeImportToPortfolio";
import { createSupabaseServerClient, getCurrentUserSafe } from "@/lib/supabase/server";
import { AVAILABLE_TEMPLATES } from "@/lib/templates";
import type { PortfolioData } from "@/types/portfolio";

export interface CreateImportedDraftActionState {
  status: "idle" | "error";
  message: string | null;
}

function isValidTemplateId(templateId: string) {
  return AVAILABLE_TEMPLATES.some((template) => template.id === templateId);
}

export async function createPortfolioFromTemplate(templateId: string) {
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserSafe(supabase, "create-portfolio-action");

  if (!user) {
    redirect(`/?redirect=${encodeURIComponent(`/editor?template=${templateId}`)}`);
  }

  const draft = await createPortfolioDraft(supabase, user.id, templateId);

  revalidatePath("/dashboard");
  redirect(`/editor/${draft.id}`);
}

export async function createImportedPortfolioDraftAction(
  _previousState: CreateImportedDraftActionState,
  formData: FormData,
): Promise<CreateImportedDraftActionState> {
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserSafe(supabase, "create-imported-portfolio-action");

  if (!user) {
    return {
      status: "error",
      message: "You must be signed in to create an imported draft.",
    };
  }

  const templateId = formData.get("templateId");
  const sourceType = formData.get("sourceType");
  const importedData = formData.get("importData");

  if (typeof templateId !== "string" || !templateId.trim()) {
    return {
      status: "error",
      message: "Choose a template before creating a draft.",
    };
  }

  if (!isValidTemplateId(templateId)) {
    return {
      status: "error",
      message: "Choose one of the available templates before creating a draft.",
    };
  }

  if (sourceType !== "resume") {
    return {
      status: "error",
      message: "That resume import is invalid or expired. Upload the PDF again.",
    };
  }

  try {
    const normalizedImportData = normalizeResumeImportExtractedData(importedData);

    if (!normalizedImportData) {
      return {
        status: "error",
        message: "The imported resume data is invalid or expired. Upload the PDF again.",
      };
    }

    const portfolio: PortfolioData = mapResumeImportToPortfolio(templateId, normalizedImportData);
    const fallbackTitle =
      normalizedImportData.name.trim() ||
      normalizedImportData.title.trim() ||
      getDefaultPortfolioTitle(templateId);

    const blobUrls = findPortfolioBlobUrls(portfolio);

    if (blobUrls.length > 0) {
      return {
        status: "error",
        message: "Imported drafts cannot include local preview images.",
      };
    }

    const { data, error } = await supabase
      .from("portfolios")
      .insert({
        user_id: user.id,
        title: getPortfolioSaveTitle(portfolio, fallbackTitle),
        template_id: portfolio.templateId,
        portfolio_json: portfolio,
      })
      .select("id")
      .single();

    if (error || !data?.id) {
      return {
        status: "error",
        message: error?.message ?? "Failed to create imported draft.",
      };
    }

    revalidatePath("/dashboard");
    redirect(`/editor/${String(data.id)}`);
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Failed to create imported draft.",
    };
  }
}

export async function savePortfolioDraft(
  portfolioId: string,
  portfolio: PortfolioData,
  fallbackTitle: string,
): Promise<{ status: "saved"; title: string } | { status: "error"; message: string }> {
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserSafe(supabase, "save-portfolio-action");

  if (!user) {
    return {
      status: "error",
      message: "You must be signed in to save this draft.",
    };
  }

  try {
    const savedDraft = await updatePortfolioDraft(supabase, portfolioId, user.id, portfolio, fallbackTitle);
    revalidatePath("/dashboard");
    revalidatePath(`/editor/${portfolioId}`);

    return {
      status: "saved",
      title: savedDraft.title,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Failed to save portfolio draft.",
    };
  }
}

export async function deletePortfolioDraftAction(
  portfolioId: string,
): Promise<{ status: "deleted" } | { status: "error"; message: string }> {
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserSafe(supabase, "delete-portfolio-action");

  if (!user) {
    return {
      status: "error",
      message: "You must be signed in to delete this draft.",
    };
  }

  try {
    await deletePortfolioDraft(supabase, portfolioId, user.id);
    revalidatePath("/dashboard");

    return {
      status: "deleted",
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Failed to delete portfolio draft.",
    };
  }
}
