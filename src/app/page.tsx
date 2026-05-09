import { CTA } from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TemplateShowcase } from "@/components/home/TemplateShowcase";
import { createSupabaseServerClient, getCurrentUserSafe } from "@/lib/supabase/server";

function getSafeInternalPath(path?: string) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/dashboard";
  }

  try {
    const url = new URL(path, "http://localhost");

    if (url.origin !== "http://localhost") {
      return "/dashboard";
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/dashboard";
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserSafe(supabase, "home-page");
  const requestedRedirect = typeof resolvedSearchParams.redirect === "string" ? resolvedSearchParams.redirect : undefined;
  const redirectPath = getSafeInternalPath(requestedRedirect);

  return (
    <main>
      <Hero user={user} redirectPath={redirectPath} hasRedirectIntent={Boolean(requestedRedirect)} />
      <HowItWorks />
      <TemplateShowcase user={user} />
      <CTA user={user} />
    </main>
  );
}
