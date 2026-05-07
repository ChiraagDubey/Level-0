import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { AVAILABLE_TEMPLATES } from "@/lib/templates";
import { TemplateGalleryCard } from "@/components/templates/TemplateGalleryCard";

export function TemplateShowcase({ user }: { user: User | null }) {
  return (
    <section id="templates" className="bg-surface-container">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-secondary">_starter_library</p>
            <h2 className="max-w-3xl text-3xl font-semibold uppercase tracking-[-0.04em] text-on-background sm:text-4xl">
              Pick a finished starting point, then make it yours.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
              The template gallery stays dynamic and connected to the existing registry. Every card still follows the
              same real create-draft or guest redirect flow.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">
            Total templates: {String(AVAILABLE_TEMPLATES.length).padStart(2, "0")}
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {AVAILABLE_TEMPLATES.map((template) => (
            <TemplateGalleryCard key={template.id} template={template} user={user} />
          ))}
        </div>
        <div className="mt-8 flex justify-start">
          <Link
            href="/dashboard"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-secondary underline underline-offset-4"
          >
            Open dashboard gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
