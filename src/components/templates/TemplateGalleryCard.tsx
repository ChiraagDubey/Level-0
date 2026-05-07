import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createPortfolioFromTemplate } from "@/app/actions/portfolios";
import type { TemplateGalleryEntry } from "@/lib/templates";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { UseTemplateSubmitButton } from "@/components/templates/UseTemplateSubmitButton";

export function TemplateGalleryCard({
  template,
  variant = "home",
  user = null,
}: {
  template: TemplateGalleryEntry;
  variant?: "home" | "dashboard";
  user?: User | null;
}) {
  const isDashboard = variant === "dashboard";
  const editorHref = `/editor?template=${template.id}`;
  const actionHref = user ? editorHref : `/?redirect=${encodeURIComponent(editorHref)}`;
  const createPortfolioAction = createPortfolioFromTemplate.bind(null, template.id);
  const actionButtonClassName = "w-full items-center justify-center border border-secondary bg-secondary px-4 py-3 text-white hover:bg-secondary";

  return (
    <article className="overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-[0_18px_50px_rgba(31,33,30,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className={isDashboard ? "flex flex-col" : "flex flex-col"}>
        <div className="relative">
        <TemplatePreview gallery={template.gallery} />
          <span className="absolute right-4 top-4 inline-flex rounded-full border border-secondary bg-secondary px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
            FREE
          </span>
        </div>
        <div className={isDashboard ? "space-y-4 p-4" : "space-y-4 p-5"}>
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">{template.gallery.bestFor}</p>
            <h3 className="text-2xl font-semibold uppercase tracking-[-0.04em] text-on-background">{template.name}</h3>
            <p className="text-sm leading-7 text-on-surface-variant">{template.description}</p>
          </div>
          <div className="rounded-xl border border-outline-variant bg-background px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-secondary">Use case</p>
            <p className="mt-1 text-sm font-medium text-on-surface-variant">{template.gallery.bestFor}</p>
          </div>
          {user ? (
            <form action={createPortfolioAction}>
              <UseTemplateSubmitButton className={`${actionButtonClassName} rounded-full`} />
            </form>
          ) : (
            <Link
              href={actionHref}
              className="inline-flex w-full rounded-full items-center justify-center border border-secondary bg-secondary px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-secondary"
            >
              Use Template
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
