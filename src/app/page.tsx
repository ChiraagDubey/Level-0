import { CTA } from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TemplateShowcase } from "@/components/home/TemplateShowcase";
import { createSupabaseServerClient, getCurrentUserSafe } from "@/lib/supabase/server";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserSafe(supabase, "home-page");
  const redirectPath = resolvedSearchParams.redirect;

  return (
    <main>
      <Hero user={user} redirectPath={redirectPath} />
      <HowItWorks />
      <TemplateShowcase user={user} />
      <CTA user={user} />
    </main>
  );
}
