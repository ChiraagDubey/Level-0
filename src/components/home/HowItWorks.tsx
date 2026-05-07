const steps = [
  {
    title: "Pick a template",
    body: "Choose one of the six finished portfolio starters already connected to the editor.",
  },
  {
    title: "Edit directly",
    body: "Update mapped content visually instead of rebuilding a portfolio from a blank canvas.",
  },
  {
    title: "Save your draft",
    body: "Keep working drafts tied to your account so you can reopen them later from the dashboard.",
  },
  {
    title: "Export ZIP",
    body: "Download a clean standalone project when the portfolio is ready to leave the builder.",
  },
];

const features = [
  {
    title: "Visual Editing",
    body: "Click text, swap images, and tweak your portfolio without touching the template source.",
  },
  {
    title: "Saved Drafts",
    body: "Create portfolio drafts from templates and reopen them later from your dashboard workspace.",
  },
  {
    title: "Persistent Image Uploads",
    body: "Uploaded images stay attached to your portfolio instead of living as temporary previews.",
  },
  {
    title: "ZIP Export",
    body: "Export a standalone ZIP so the finished portfolio can live outside the editor environment.",
  },
  {
    title: "Free Templates",
    body: "All six free starters use the same real editor, save flow, and export path.",
  },
];

export function HowItWorks() {
  return (
    <>
      <section id="features" className="border-y border-outline-variant bg-surface-container-low">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-8 lg:py-20">
          <div className="mb-8 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-secondary">&gt; core_features</p>
            <h2 className="max-w-3xl text-3xl font-semibold uppercase tracking-[-0.04em] text-on-background sm:text-4xl">
              A polished builder workflow without replacing your code with page-builder noise.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
              LEVEL 0 keeps the product focused: finished templates, direct editing, saved drafts, and exportable
              output.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-outline-variant bg-white p-5 shadow-[0_14px_40px_rgba(31,33,30,0.05)]"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-secondary">SYS</p>
                <h3 className="mt-4 text-xl font-semibold uppercase tracking-[-0.03em] text-on-background">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-on-surface-variant">{feature.body}</p>
              </article>
            ))}
            <article className="flex rounded-xl items-center justify-center border border-secondary bg-secondary/5 p-5 text-center">
              <div className="space-y-2">
                <p className="text-4xl font-semibold uppercase tracking-[-0.05em] text-secondary">6</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">Finished templates available now</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-[1280px] px-6 py-16 lg:px-8 lg:py-20">
        <div className="space-y-4 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-secondary">How it works</p>
          <h2 className="text-3xl font-semibold uppercase tracking-[-0.04em] text-on-background sm:text-4xl">
            Move from template to shipped portfolio in four steps.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-outline-variant bg-white px-5 py-6 text-center shadow-[0_14px_40px_rgba(31,33,30,0.04)]"
            >
              <div className="mx-auto flex h-12 w-12 rounded-full items-center justify-center border border-outline-variant bg-surface-container-low font-semibold text-secondary">
                {index + 1}
              </div>
              <h3 className="mt-4 text-xl font-semibold uppercase tracking-[-0.03em] text-on-background">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{step.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
