import { notFound, redirect } from "next/navigation";
import { EditorShell } from "@/components/editor/EditorShell";
import { getPortfolioDraftById } from "@/lib/portfolios";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function SavedPortfolioEditorPage({
  params,
}: {
  params: Promise<{ portfolioId: string }>;
}) {
  const { portfolioId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/?redirect=${encodeURIComponent(`/editor/${portfolioId}`)}`);
  }

  const draft = await getPortfolioDraftById(supabase, portfolioId, user.id);

  if (!draft) {
    notFound();
  }

  return (
    <EditorShell
      portfolioId={draft.id}
      selectedTemplateId={draft.template_id}
      initialPortfolioData={draft.portfolio_json}
      initialDraftTitle={draft.title}
      isSavedDraft
    />
  );
}
