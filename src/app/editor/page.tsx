import { redirect } from "next/navigation";
import { EditorShell } from "@/components/editor/EditorShell";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const redirectPath = resolvedSearchParams.template ? `/editor?template=${resolvedSearchParams.template}` : "/editor";
    redirect(`/?redirect=${encodeURIComponent(redirectPath)}`);
  }

  return <EditorShell selectedTemplateId={resolvedSearchParams.template} />;
}
