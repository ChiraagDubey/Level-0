import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { DeleteDraftButton } from "@/components/dashboard/DeleteDraftButton";
import type { PortfolioDraftSummary } from "@/lib/portfolios";
import { getTemplateDefinition } from "@/lib/templates";

function formatUpdatedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown update";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function PortfolioDraftCard({
  drafts,
  user,
}: {
  drafts: PortfolioDraftSummary[];
  user: User | null;
}) {
  const isSignedIn = Boolean(user);

  return (
    <section id="saved-drafts">
      <div className="flex flex-col gap-3 border-b border-outline-variant pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary">&gt; saved_drafts</p>
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-on-background">
            {isSignedIn ? "Saved drafts in your workspace." : "Saved drafts unlock after sign-in."}
          </h3>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">
          {isSignedIn ? `${drafts.length} item${drafts.length === 1 ? "" : "s"} detected` : "guest mode"}
        </p>
      </div>
      <div className="mt-5 grid gap-3">
        {!isSignedIn ? (
          <div className="rounded-xl border border-outline-variant bg-white p-4 text-sm leading-7 text-on-surface-variant">
            Sign in with Google or GitHub to create persistent portfolio drafts from templates and reopen them here.
          </div>
        ) : null}
        {isSignedIn && drafts.length === 0 ? (
          <div className="rounded-xl border border-outline-variant bg-white p-4 text-sm leading-7 text-on-surface-variant">
            Create your first draft from any template and it will appear here.
          </div>
        ) : null}
        {drafts.map((draft) => {
          const template = getTemplateDefinition(draft.templateId);

          return (
            <article
              key={draft.id}
              className="rounded-xl border border-outline-variant bg-white p-4 shadow-[0_12px_30px_rgba(31,33,30,0.04)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-low font-mono text-[11px] uppercase tracking-[0.22em] text-secondary">
                    DR
                  </div>
                  <div>
                    <p className="text-base font-semibold uppercase tracking-[-0.02em] text-on-background">{draft.title}</p>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">
                      <span>
                        Template: <span className="text-secondary">{template.metadata.name}</span>
                      </span>
                      <span>
                        Modified: <span className="text-on-background">{formatUpdatedAt(draft.updatedAt)}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-start gap-3">
                  <Link
                    href={`/editor/${draft.id}`}
                    className="inline-flex rounded-full items-center justify-center border border-secondary bg-secondary px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-secondary"
                  >
                    Open/Edit
                  </Link>
                  {isSignedIn ? <DeleteDraftButton portfolioId={draft.id} draftTitle={draft.title} /> : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
