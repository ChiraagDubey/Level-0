import Link from "next/link";
import type { User } from "@supabase/supabase-js";

export function CTA({ user }: { user: User | null }) {
  return (
    <section className="shell py-8 pb-14 md:pb-16">
      <div className="rounded-[32px] bg-ink px-6 py-10 text-white md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <span className="pill border-white/15 bg-white/5 text-white/70">MVP Milestone</span>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
              LEVEL 0 keeps the first release local, focused, and exportable.
            </h2>
          </div>
          <Link
            href={user ? "/dashboard" : "/"}
            className="inline-flex h-fit rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:translate-y-[-1px]"
          >
            {user ? "Open Dashboard" : "Sign In to Start"}
          </Link>
        </div>
      </div>
    </section>
  );
}
