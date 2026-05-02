import { EditorShell } from "@/components/editor/EditorShell";

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return <EditorShell selectedTemplateId={resolvedSearchParams.template} />;
}
