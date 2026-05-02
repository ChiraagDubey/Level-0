import { ImportWebsiteCard } from "@/components/dashboard/ImportWebsiteCard";
import { PortfolioDraftCard } from "@/components/dashboard/PortfolioDraftCard";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TemplateCard } from "@/components/dashboard/TemplateCard";
import { AVAILABLE_TEMPLATES } from "@/lib/templates";

export function DashboardShell() {
  return (
    <main className="shell py-8">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar />

        <section className="space-y-6">
          <div className="panel px-6 py-8 md:px-8">
            <span className="pill">Dashboard</span>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">Control center for your portfolio builds.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-black/65 md:text-base">
              Choose a template, jump into the editor, leave a future import link, and keep the product surfaces
              organized before auth and persistence arrive.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="panel px-5 py-5">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/45">Templates</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Available now</h2>
                </div>
              </div>
              <div className="grid gap-5">
                {AVAILABLE_TEMPLATES.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </section>

            <div className="space-y-6">
              <ImportWebsiteCard />
              <PortfolioDraftCard />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
