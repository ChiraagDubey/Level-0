import Link from "next/link";
import type { TemplateMetadata } from "@/types/portfolio";

export function TemplateCard({ template }: { template: TemplateMetadata }) {
  return (
    <article className="rounded-[28px] border border-black/10 bg-white p-5">
      <div className="grid-pattern h-40 rounded-[20px] bg-clay/25" />
      <div className="mt-5 space-y-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/45">Template</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{template.name}</h3>
        </div>
        <p className="text-sm leading-7 text-black/65">{template.description}</p>
        <Link href={`/editor?template=${template.id}`} className="inline-flex rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white">
          Use Template
        </Link>
      </div>
    </article>
  );
}
