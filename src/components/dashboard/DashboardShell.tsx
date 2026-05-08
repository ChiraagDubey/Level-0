import { ImportWebsiteCard } from "@/components/dashboard/ImportWebsiteCard";
import { PortfolioDraftCard } from "@/components/dashboard/PortfolioDraftCard";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TemplateCard } from "@/components/dashboard/TemplateCard";
import type { PortfolioDraftSummary } from "@/lib/portfolios";
import { AVAILABLE_TEMPLATES } from "@/lib/templates";
import type { User } from "@supabase/supabase-js";

export function DashboardShell({
  user,
  drafts,
}: {
  user: User | null;
  drafts: PortfolioDraftSummary[];
}) {
  return (
    <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="grid gap-6 lg:grid-cols-[248px_1fr] xl:grid-cols-[264px_1fr]">
        <Sidebar user={user} />

        <section className="space-y-6">
          <div className="rounded-2xl border border-outline-variant bg-white shadow-[0_20px_55px_rgba(31,33,30,0.06)]">
            <div className="space-y-6 p-6 lg:p-8">
              <div className="space-y-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-secondary">&gt; root / dashboard</p>
                <div className="space-y-3">
                  <h1 className="text-4xl font-semibold tracking-[-0.05em] text-on-background md:text-5xl">
                    Control center for your portfolio builds.
                  </h1>
                  <p className="max-w-3xl text-sm leading-7 text-on-surface-variant md:text-base">
                    Choose a template, create a saved draft, reopen it in the editor, and keep the workflow moving
                    without changing the underlying editor, save, upload, or export behavior.
                  </p>
                </div>
              </div>
              <ImportWebsiteCard isSignedIn={Boolean(user)} templates={AVAILABLE_TEMPLATES} />
            </div>
          </div>

          <section id="template-selection" className="rounded-2xl border border-outline-variant bg-background p-5 shadow-[0_20px_55px_rgba(31,33,30,0.05)] md:p-6">
            <div className="mb-5 flex flex-col gap-3 border-b border-outline-variant pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary">&gt; template_selection</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-on-background">Choose a starter and create a draft.</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-on-surface-variant">
                  The template section remains connected to the real create-draft action for signed-in users and the
                  existing redirect flow for guests.
                </p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">
                {AVAILABLE_TEMPLATES.length} free templates
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {AVAILABLE_TEMPLATES.map((template) => (
                <TemplateCard key={template.id} template={template} user={user} />
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-outline-variant bg-background p-5 shadow-[0_20px_55px_rgba(31,33,30,0.05)] md:p-6">
            <PortfolioDraftCard drafts={drafts} user={user} />
          </section>

          <footer className="border-t border-outline-variant px-1 pt-4">
            <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-outline sm:flex-row sm:items-center sm:justify-between">
              <span>LEVEL 0</span>
              <span>Templates, drafts, editor, export</span>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
