import { redirect } from "next/navigation";
import { EditorShell } from "@/components/editor/EditorShell";
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

  if (!templateId) {
    redirect("/editor?template=simple-starter");
  }

  if (!user) {
    const redirectPath = `/editor?template=${templateId}`;
    redirect(`/?redirect=${encodeURIComponent(redirectPath)}`);
  }

  return <EditorShell selectedTemplateId={templateId} />;
}
