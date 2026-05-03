import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { listPortfolioDrafts } from "@/lib/portfolios";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const drafts = user ? await listPortfolioDrafts(supabase, user.id) : [];

  return <DashboardShell user={user} drafts={drafts} />;
}
