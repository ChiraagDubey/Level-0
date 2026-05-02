import Link from "next/link";

const navItems = [
  { label: "Templates", active: true },
  { label: "Drafts", active: false },
  { label: "Import Website", active: false },
  { label: "Account", active: false },
  { label: "Billing", active: false },
];

const planFeatures = ["6 templates unlocked", "Watermarked ZIP export", "Pro features coming soon"];

export function Sidebar() {
  return (
    <aside className="panel flex h-full flex-col gap-8 p-5 md:p-6">
      <div className="space-y-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-black/50">Workspace</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Guest Builder</h2>
          <p className="text-sm text-black/60">Free Workspace</p>
        </div>
        <div className="rounded-[24px] border border-black/5 bg-sand p-4 text-sm leading-7 text-black/65">
          <p>Build, preview, and export portfolios locally. Auth, saving, and billing are coming next.</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={[
              "rounded-2xl px-4 py-3 text-sm transition-colors",
              item.active
                ? "border border-black/10 bg-black text-white shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
                : "border border-black/10 bg-white text-black/70",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-3">
              <span className={item.active ? "font-medium" : ""}>{item.label}</span>
              {item.active ? (
                <span className="rounded-full bg-white/14 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/85">
                  Live
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto space-y-3">
        <div className="rounded-[24px] border border-black/10 bg-white p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/45">Free Plan</p>
          <div className="mt-3 space-y-2 text-sm text-black/70">
            {planFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-black/70" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <Link href="/" className="block rounded-full border border-black/10 px-4 py-3 text-center text-sm font-medium">
          Back to Home
        </Link>
        <Link href="/editor?template=simple-starter" className="block rounded-full bg-ink px-4 py-3 text-center text-sm font-medium text-white">
          Open Editor
        </Link>
      </div>
    </aside>
  );
}
