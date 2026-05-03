import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { SignOutButton } from "@/components/auth/SignOutButton";

const navItems = [
  { label: "Templates", active: true },
  { label: "Drafts", active: false },
  { label: "Import Website", active: false },
  { label: "Account", active: false },
  { label: "Billing", active: false },
];

const planFeatures = ["6 templates unlocked", "Watermarked ZIP export", "Pro features coming soon"];

function getUserDisplayName(user: User) {
  const metadataName = user.user_metadata.full_name ?? user.user_metadata.name ?? user.user_metadata.user_name;
  return typeof metadataName === "string" && metadataName.trim().length > 0 ? metadataName : user.email ?? "Signed In User";
}

export function Sidebar({ user }: { user: User | null }) {
  const isSignedIn = Boolean(user);
  const userDisplayName = user ? getUserDisplayName(user) : "Guest Builder";

  return (
    <aside className="panel flex h-full flex-col gap-8 p-5 md:p-6">
      <div className="space-y-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-black/50">Workspace</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{userDisplayName}</h2>
          <p className="text-sm text-black/60">{user?.email ?? "Free Workspace"}</p>
        </div>
        <div className="rounded-[24px] border border-black/5 bg-sand p-4 text-sm leading-7 text-black/65">
          <p>
            {isSignedIn
              ? "Your account is connected. Portfolio saving and workspace persistence can land on top of this next."
              : "Build, preview, and export portfolios locally. Sign in to connect your account before saved work arrives."}
          </p>
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
        {isSignedIn ? (
          <div className="rounded-[24px] border border-black/10 bg-white p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/45">Signed In</p>
            <p className="mt-3 text-sm font-medium text-black/80">{userDisplayName}</p>
            <p className="mt-1 text-sm text-black/55">{user?.email}</p>
          </div>
        ) : (
          <div className="rounded-[24px] border border-black/10 bg-white p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/45">Sign In</p>
            <p className="mt-3 text-sm leading-7 text-black/65">Connect Google or GitHub to attach a real account to the dashboard.</p>
            <div className="mt-4">
              <AuthButtons />
            </div>
          </div>
        )}
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
        {isSignedIn ? <SignOutButton /> : null}
      </div>
    </aside>
  );
}
