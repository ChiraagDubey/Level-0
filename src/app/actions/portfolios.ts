"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createPortfolioDraft, updatePortfolioDraft } from "@/lib/portfolios";
import { createSupabaseServerClient, getCurrentUserSafe } from "@/lib/supabase/server";
import type { PortfolioData } from "@/types/portfolio";

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
