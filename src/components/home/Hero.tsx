import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { AuthButtons } from "@/components/auth/AuthButtons";

export function Hero({
  user,
  redirectPath,
}: {
  user: User | null;
  redirectPath?: string;
}) {
  const isSignedIn = Boolean(user);
  const startHref = isSignedIn ? "/dashboard" : redirectPath ?? "/dashboard";

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-outline-variant bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-outline-variant bg-white text-[11px] font-medium text-secondary">
              &gt;_
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">LEVEL 0</p>
              <p className="text-[10px] uppercase tracking-[0.26em] text-on-surface-variant">From zero to portfolio</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-on-surface-variant md:flex">
            <a href="#templates" className="transition-colors hover:text-secondary">
              Templates
            </a>
            <a href="#features" className="transition-colors hover:text-secondary">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-secondary">
              Workflow
            </a>
          </nav>
          <Link
            href={isSignedIn ? "/dashboard" : "#start"}
            className="inline-flex rounded-full items-center justify-center border border-secondary bg-secondary px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-secondary"
          >
            {isSignedIn ? "Open Dashboard" : "Sign In"}
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1280px] px-6 pb-16 pt-10 lg:px-8 lg:pb-24 lg:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <div className="space-y-8">
            <div className="inline-flex rounded-full items-center gap-2 border border-outline-variant bg-surface-container px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-on-primary-fixed-variant">
              <span className="text-secondary">&gt;</span>
              System Ready: Portfolio Engine
            </div>
            <div className="space-y-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant">LEVEL 0 - From zero to portfolio.</p>
              <h1 className="max-w-3xl text-5xl font-semibold uppercase leading-none tracking-[-0.05em] text-on-background sm:text-6xl lg:text-[72px]">
                Choose a finished template.
                <br />
                <span className="text-secondary">Edit it visually.</span>
                <br />
                Export the code.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-on-surface-variant md:text-lg">
                LEVEL 0 is a portfolio builder for creators, beginners, and developers. Choose a finished template,
                edit it visually, save your draft, and export a standalone ZIP project when you are ready.
              </p>
            </div>

            {isSignedIn ? (
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex rounded-full items-center justify-center border border-secondary bg-secondary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-secondary"
                >
                  Open Dashboard
                </Link>
                <a
                  href="#templates"
                  className="inline-flex rounded-full items-center justify-center border border-secondary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-secondary transition-colors hover:bg-secondary/5"
                >
                  View Templates
                </a>
              </div>
            ) : (
              <div id="start" className="space-y-5">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={startHref}
                    className="inline-flex rounded-full items-center justify-center border border-secondary bg-secondary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-secondary"
                  >
                    Get Started
                  </Link>
                  <a
                    href="#templates"
                    className="inline-flex rounded-full items-center justify-center border border-secondary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-secondary transition-colors hover:bg-secondary/5"
                  >
                    View Templates
                  </a>
                </div>
                <div className="max-w-xl rounded-2xl border border-outline-variant bg-white p-4 shadow-[0_18px_50px_rgba(31,33,30,0.08)]">
                  <p className="mb-4 text-sm leading-7 text-on-surface-variant">
                    Sign in with Google or GitHub to create saved drafts, open the protected editor, and export your
                    finished portfolio.
                  </p>
                  <AuthButtons redirectToPath={redirectPath ?? "/dashboard"} />
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container shadow-[0_28px_70px_rgba(31,33,30,0.12)]">
              <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-high px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#d69a8b]" />
                  <span className="h-3 w-3 rounded-full bg-[#b9c7ae]" />
                  <span className="h-3 w-3 rounded-full bg-[#d2b18f]" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-outline">editor.sys - live preview</p>
                <span className="w-10" />
              </div>
              <div className="grid gap-6 bg-white p-5 sm:grid-cols-[0.74fr_1fr] sm:p-6">
                <div className="space-y-4">
                  <div className="aspect-square rounded-xl border border-outline-variant bg-[linear-gradient(135deg,#0f1b1d,#1f686f_55%,#9ed7df)]" />
                  <div className="rounded-xl border border-outline-variant bg-background p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-variant">Mapped content</p>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">Click text, replace images, tweak accent colors, and save your draft.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-outline-variant bg-background p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-secondary">&gt; edit_content</p>
                    <div className="mt-4 space-y-3">
                      <div className="h-4 w-3/4 rounded bg-surface-variant" />
                      <div className="h-3 w-full rounded bg-surface-container" />
                      <div className="h-3 w-5/6 rounded bg-surface-container" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-24 rounded-xl border border-outline-variant bg-surface-container-low" />
                    <div className="h-24 rounded-xl border border-outline-variant bg-surface-container-low" />
                    <div className="h-24 rounded-xl border border-outline-variant bg-surface-container-low" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-outline-variant bg-background p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-outline">Saved Drafts</p>
                      <p className="mt-2 text-sm leading-6 text-on-surface-variant">Resume exactly where you left off from your dashboard.</p>
                    </div>
                    <div className="rounded-xl border border-outline-variant bg-background p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-outline">ZIP Export</p>
                      <p className="mt-2 text-sm leading-6 text-on-surface-variant">Download a clean standalone code package.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 right-3 rounded-full border border-secondary bg-secondary-container px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-on-secondary-fixed-variant shadow-[0_14px_30px_rgba(31,104,111,0.2)] sm:right-6">
              No code required
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
