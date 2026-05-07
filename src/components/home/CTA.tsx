import Link from "next/link";
import type { User } from "@supabase/supabase-js";

export function CTA({ user }: { user: User | null }) {
  return (
    <>
      <section className="bg-secondary">
        <div className="mx-auto max-w-[1280px] px-6 py-16 text-center text-white lg:px-8 lg:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-white/80">Initialize your career.</p>
          <h2 className="mt-4 text-4xl font-semibold uppercase tracking-[-0.05em] sm:text-5xl">
            Build a portfolio that starts finished.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
            Choose a template, edit your mapped content visually, save drafts as you go, and export a clean ZIP when
            the portfolio is ready to ship.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={user ? "/dashboard" : "#start"}
              className="inline-flex items-center justify-center border border-white bg-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-secondary transition-colors hover:bg-[#eaf7f8]"
            >
              {user ? "Open Dashboard" : "Start Free"}
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-outline-variant bg-background">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-secondary">LEVEL 0 ARCHITECTS</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-outline">
              LEVEL 0 portfolio builder. Templates, saved drafts, and exportable portfolio code.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 font-mono text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">
            <a href="#templates" className="transition-colors hover:text-secondary">
              Templates
            </a>
            <a href="#features" className="transition-colors hover:text-secondary">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-secondary">
              Workflow
            </a>
            <Link href="/dashboard" className="transition-colors hover:text-secondary">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
