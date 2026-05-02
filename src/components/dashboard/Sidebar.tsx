import Link from "next/link";

const navItems = ["Templates", "Drafts", "Import Website", "Account", "Billing"];

export function Sidebar() {
  return (
    <aside className="panel flex h-full flex-col gap-8 p-5 md:p-6">
      <div className="space-y-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-black/50">Mock account</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Maya Sterling</h2>
          <p className="text-sm text-black/60">Senior Builder Plan Placeholder</p>
        </div>
        <div className="rounded-[24px] bg-sand p-4 text-sm leading-7 text-black/65">
          <p>Local MVP mode.</p>
          <p>No auth, no billing, no persistence yet.</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <div key={item} className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/70">
            {item}
          </div>
        ))}
      </nav>

      <div className="mt-auto space-y-3">
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
