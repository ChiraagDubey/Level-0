import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { listPortfolioDrafts } from "@/lib/portfolios";
import { createSupabaseServerClient, getCurrentUserSafe } from "@/lib/supabase/server";
import { AVAILABLE_TEMPLATES } from "@/lib/templates";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserSafe(supabase, "dashboard-page");
  const drafts = user ? await listPortfolioDrafts(supabase, user.id) : [];
  const selectedTemplateId = typeof resolvedSearchParams.template === "string" ? resolvedSearchParams.template : undefined;
  const selectedTemplate = AVAILABLE_TEMPLATES.find((template) => template.id === selectedTemplateId) ?? null;

  return <DashboardShell user={user} drafts={drafts} selectedTemplate={selectedTemplate} />;
}
