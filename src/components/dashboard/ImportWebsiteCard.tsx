export function ImportWebsiteCard() {
  return (
    <section className="rounded-[28px] border border-black/10 bg-white p-5">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/45">Future scraper import</p>
        <h3 className="text-2xl font-semibold tracking-[-0.04em]">Bring an existing website later.</h3>
      </div>
      <p className="mt-3 text-sm leading-7 text-black/65">
        This MVP only captures the placeholder entry point. No scraper logic or parsing runs yet.
      </p>
      <div className="mt-5 flex flex-col gap-3 md:flex-row">
        <input
          type="url"
          placeholder="https://your-portfolio.com"
          className="h-12 flex-1 rounded-2xl border border-black/10 bg-sand/50 px-4 outline-none placeholder:text-black/35"
        />
        <button type="button" className="h-12 rounded-2xl border border-black/10 px-4 text-sm font-medium text-black/45">
          Import Placeholder
        </button>
      </div>
    </section>
  );
}
