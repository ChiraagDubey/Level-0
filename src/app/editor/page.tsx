import { redirect } from "next/navigation";
import { EditorShell } from "@/components/editor/EditorShell";
import { createSupabaseServerClient, getCurrentUserSafe } from "@/lib/supabase/server";
import { AVAILABLE_TEMPLATES } from "@/lib/templates";

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserSafe(supabase, "editor-page");
  const templateId = resolvedSearchParams.template;

  if (typeof templateId !== "string" || !AVAILABLE_TEMPLATES.some((template) => template.id === templateId)) {
    redirect("/editor?template=simple-starter");
  }

  if (!user) {
    redirect(`/dashboard?template=${encodeURIComponent(templateId)}`);
  }

  return <EditorShell selectedTemplateId={templateId} />;
}
