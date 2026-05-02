const steps = [
  {
    title: "Pick a finished template",
    body: "Start from a portfolio structure that already understands your data model.",
  },
  {
    title: "Edit directly on the preview",
    body: "Click mapped text and images in place without dealing with arbitrary page builders.",
  },
  {
    title: "Export a clean codebase",
    body: "Download a standalone project instead of carrying the editor into production.",
  },
];

export function HowItWorks() {
  return (
    <section className="shell py-8 md:py-10">
      <div className="panel px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <span className="pill">How it works</span>
            <h2 className="section-title">A focused workflow for shipping a portfolio quickly.</h2>
          </div>
          <p className="section-copy">
            This placeholder landing page keeps product messaging clear while staying easy to replace when the final UI
            system lands.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-[24px] border border-black/10 bg-sand/60 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-black/45">Step {index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/65">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
