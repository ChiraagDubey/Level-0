import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { listPortfolioDrafts } from "@/lib/portfolios";
import { createSupabaseServerClient, getCurrentUserSafe } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserSafe(supabase, "dashboard-page");

  const drafts = user ? await listPortfolioDrafts(supabase, user.id) : [];

  return <DashboardShell user={user} drafts={drafts} />;
}
