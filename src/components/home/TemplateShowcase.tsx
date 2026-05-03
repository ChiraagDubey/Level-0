import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { AVAILABLE_TEMPLATES } from "@/lib/templates";
import { TemplateGalleryCard } from "@/components/templates/TemplateGalleryCard";

export function TemplateShowcase({ user }: { user: User | null }) {
  return (
    <section className="shell py-8 md:py-10">
      <div className="panel px-6 py-8 md:px-10 md:py-10">
        <div className="space-y-3">
          <span className="pill">Templates</span>
          <h2 className="section-title">Pick a finished starting point, then make it yours.</h2>
          <p className="section-copy">
            Every free template runs on the same editor and export path, but each one starts with a distinct visual
            personality.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {AVAILABLE_TEMPLATES.map((template) => (
            <TemplateGalleryCard key={template.id} template={template} user={user} />
          ))}
        </div>
        <div className="mt-8 flex justify-start">
          <Link href="/dashboard" className="text-sm font-medium underline underline-offset-4">
            View the full dashboard gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
