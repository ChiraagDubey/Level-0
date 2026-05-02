import Link from "next/link";

export function Hero() {
  return (
    <section className="shell pt-10 md:pt-14">
      <div className="panel overflow-hidden">
        <div className="grid gap-10 px-6 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-14">
          <div className="space-y-6">
            <span className="pill">LEVEL 0</span>
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-black/50">From zero to portfolio</p>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-ink md:text-7xl">
                Pick a finished portfolio. Click to edit. Export the code.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-black/68 md:text-lg">
                LEVEL 0 turns a portfolio into a visual editing workflow. Choose a template, change mapped fields on
                the live preview, and export a clean standalone project.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:translate-y-[-1px]"
              >
                Start Building
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:border-black/20"
              >
                Sign In Placeholder
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[32px] bg-ink p-5 text-white">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/55">Core product line</p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
                Visual portfolio builder for creators who want a finished starting point.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] bg-white/5 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/55">Editing</p>
                <p className="mt-2 text-sm leading-7 text-white/80">Click text, swap images, tweak accent color.</p>
              </div>
              <div className="rounded-[24px] bg-white/5 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/55">Export</p>
                <p className="mt-2 text-sm leading-7 text-white/80">Download a standalone portfolio project as ZIP.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
