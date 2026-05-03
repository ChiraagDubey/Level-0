import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createPortfolioFromTemplate } from "@/app/actions/portfolios";
import type { TemplateGalleryEntry } from "@/lib/templates";
import { TemplatePreview } from "@/components/templates/TemplatePreview";

const badgeToneClasses = {
  light: "border-black/10 bg-black/[0.04] text-black/65",
  dark: "border-white/10 bg-white/[0.08] text-white/80",
} as const;

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
  const tone = badgeToneClasses[template.gallery.theme];
  const editorHref = `/editor?template=${template.id}`;
  const actionHref = user ? editorHref : `/?redirect=${encodeURIComponent(editorHref)}`;
  const createPortfolioAction = createPortfolioFromTemplate.bind(null, template.id);

  return (
    <article
      className={`overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_60px_rgba(17,17,17,0.06)] ${
        isDashboard ? "p-4 md:p-5" : ""
      }`}
    >
      <div className={isDashboard ? "grid gap-5 md:grid-cols-[240px_1fr] md:items-start" : ""}>
        <TemplatePreview gallery={template.gallery} />
        <div className={isDashboard ? "space-y-4" : "space-y-4 p-6"}>
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] ${tone}`}>
              {template.gallery.theme}
            </span>
            <span className="inline-flex rounded-full border border-emerald-600/15 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-700">
              {template.gallery.plan}
            </span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-black">{template.name}</h3>
            <p className="text-sm leading-7 text-black/65">{template.description}</p>
          </div>
          <div className="rounded-[20px] border border-black/[0.08] bg-[#f7f1e7] px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/45">Best for</p>
            <p className="mt-1 text-sm font-medium text-black/75">{template.gallery.bestFor}</p>
          </div>
          {user ? (
            <form action={createPortfolioAction}>
              <button
                type="submit"
                className="inline-flex rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition-transform duration-150 hover:-translate-y-0.5"
              >
                Use Template
              </button>
            </form>
          ) : (
            <Link
              href={actionHref}
              className="inline-flex rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition-transform duration-150 hover:-translate-y-0.5"
            >
              Use Template
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
