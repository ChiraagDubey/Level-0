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
    <section className="rounded-[28px] border border-black/10 bg-white p-5">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/45">Drafts</p>
        <h3 className="text-2xl font-semibold tracking-[-0.04em]">
          {isSignedIn ? "Saved drafts in your workspace." : "Saved work unlocks after sign-in."}
        </h3>
      </div>
      <div className="mt-5 grid gap-3">
        {!isSignedIn ? (
          <div className="rounded-[22px] bg-sand/60 p-4 text-sm leading-7 text-black/65">
            Sign in with Google or GitHub to create persistent portfolio drafts from templates and reopen them here.
          </div>
        ) : null}
        {isSignedIn && drafts.length === 0 ? (
          <div className="rounded-[22px] bg-sand/60 p-4 text-sm leading-7 text-black/65">
            Create your first draft from any template and it will appear here.
          </div>
        ) : null}
        {drafts.map((draft) => {
          const template = getTemplateDefinition(draft.templateId);

          return (
            <div key={draft.id} className="rounded-[22px] bg-sand/60 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-medium">{draft.title}</p>
                  <p className="mt-1 text-sm text-black/55">{template.metadata.name}</p>
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-black/40">
                  {formatUpdatedAt(draft.updatedAt)}
                </span>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap items-start gap-3">
                  <Link
                    href={`/editor/${draft.id}`}
                    className="inline-flex rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    Open/Edit
                  </Link>
                  {isSignedIn ? <DeleteDraftButton portfolioId={draft.id} draftTitle={draft.title} /> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
