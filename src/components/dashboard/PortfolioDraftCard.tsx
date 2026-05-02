const drafts = [
  { name: "Simple Starter Draft", updated: "Today", status: "Mock draft placeholder" },
  { name: "Client Portfolio Draft", updated: "Yesterday", status: "Future saved draft slot" },
];

export function PortfolioDraftCard() {
  return (
    <section className="rounded-[28px] border border-black/10 bg-white p-5">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/45">Drafts</p>
        <h3 className="text-2xl font-semibold tracking-[-0.04em]">Saved work will live here later.</h3>
      </div>
      <div className="mt-5 grid gap-3">
        {drafts.map((draft) => (
          <div key={draft.name} className="rounded-[22px] bg-sand/60 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-medium">{draft.name}</p>
                <p className="mt-1 text-sm text-black/55">{draft.status}</p>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-black/40">{draft.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
