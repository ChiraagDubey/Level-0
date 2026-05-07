import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EditorShell } from "@/components/editor/EditorShell";
import { createPortfolioDraft } from "@/lib/portfolios";
import { createSupabaseServerClient, getCurrentUserSafe } from "@/lib/supabase/server";

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserSafe(supabase, "editor-page");
  const templateId = resolvedSearchParams.template;

  if (!user) {
    const redirectPath = templateId ? `/editor?template=${templateId}` : "/editor";
    redirect(`/?redirect=${encodeURIComponent(redirectPath)}`);
  }

  if (templateId) {
    const draft = await createPortfolioDraft(supabase, user.id, templateId);
    revalidatePath("/dashboard");
    redirect(`/editor/${draft.id}`);
  }

  return <EditorShell />;
}
