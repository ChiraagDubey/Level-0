import Link from "next/link";
import { AVAILABLE_TEMPLATES } from "@/lib/templates";

export function TemplateShowcase() {
  return (
    <section className="shell py-8 md:py-10">
      <div className="panel px-6 py-8 md:px-10 md:py-10">
        <div className="space-y-3">
          <span className="pill">Templates</span>
          <h2 className="section-title">Start with one strong base, then expand the catalog.</h2>
          <p className="section-copy">
            MVP scope stays intentionally tight: multiple templates, one shared schema, and one export path.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {AVAILABLE_TEMPLATES.map((template) => (
            <article key={template.id} className="overflow-hidden rounded-[28px] border border-black/10 bg-white">
              <div className="grid-pattern h-48 border-b border-black/10 bg-clay/20" />
              <div className="space-y-4 p-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">{template.name}</h3>
                  <p className="text-sm leading-7 text-black/65">{template.description}</p>
                </div>
                <Link href={`/editor?template=${template.id}`} className="text-sm font-medium underline underline-offset-4">
                  Open in editor
                </Link>
              </div>
            </article>
          ))}
          <article className="rounded-[28px] border border-dashed border-black/15 bg-white/50 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/45">Future templates</p>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em]">Developer OS, DevFlex, and more.</p>
            <p className="mt-3 text-sm leading-7 text-black/65">
              They stay out of this milestone so the shared data schema and editing model can settle first.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
