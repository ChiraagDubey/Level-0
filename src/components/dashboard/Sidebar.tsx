import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { AVAILABLE_TEMPLATES } from "@/lib/templates";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Templates", href: "#template-selection" },
  { label: "Drafts", href: "#saved-drafts" },
  { label: "Account", href: "#account" },
];

const planFeatures = [`${AVAILABLE_TEMPLATES.length} templates unlocked`, "Watermarked ZIP export", "Pro features coming soon"];

function getUserDisplayName(user: User) {
  const metadataName = user.user_metadata.full_name ?? user.user_metadata.name ?? user.user_metadata.user_name;
  return typeof metadataName === "string" && metadataName.trim().length > 0 ? metadataName : user.email ?? "Signed In User";
}

function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function Sidebar({ user }: { user: User | null }) {
  const isSignedIn = Boolean(user);
  const userDisplayName = user ? getUserDisplayName(user) : "Guest Builder";

  return (
    <aside className="self-start rounded-2xl border border-outline-variant bg-surface-container shadow-[0_20px_55px_rgba(31,33,30,0.05)] lg:sticky lg:top-6">
      <div className="flex flex-col gap-6 p-5 md:p-6">
        <div className="flex items-center gap-3 border-b border-outline-variant pb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant bg-white font-mono text-sm uppercase tracking-[0.22em] text-secondary">
            {getInitials(userDisplayName) || "G"}
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary">Workspace</p>
            <h2 className="truncate text-xl font-semibold tracking-[-0.04em] text-on-background">{userDisplayName}</h2>
            <p className="truncate text-sm text-on-surface-variant">{user?.email ?? "Free Workspace"}</p>
          </div>
        </div>

        <div className="rounded-xl border border-secondary/20 bg-secondary-container/20 p-4 text-sm leading-7 text-on-surface-variant">
          <p>
            {isSignedIn
              ? "Your account is connected. Saved drafts, editor access, and sign-out remain on the same existing flows."
              : "Browse templates publicly, then sign in with Google or GitHub before creating saved drafts."}
          </p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item, index) => {
            const isPrimary = index === 0;

            return (
              <a
                key={item.label}
                href={item.href}
                className={[
                  "flex items-center rounded-xl justify-between border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors",
                  isPrimary
                    ? "border-secondary bg-secondary/10 text-secondary"
                    : "border-outline-variant bg-white text-on-surface-variant hover:border-secondary hover:text-secondary",
                ].join(" ")}
              >
                <span>{item.label}</span>
                <span>{isPrimary ? "LIVE" : "->"}</span>
              </a>
            );
          })}
        </nav>

        <div id="account" className="space-y-4">
          {isSignedIn ? (
            <div className="rounded-xl border border-outline-variant bg-white p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-secondary">Signed In</p>
              <p className="mt-3 text-sm font-medium text-on-background">{userDisplayName}</p>
              <p className="mt-1 text-sm text-on-surface-variant">{user?.email}</p>
            </div>
          ) : (
            <div className="rounded-xl border border-outline-variant bg-white p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-secondary">Sign In</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                Connect Google or GitHub to unlock the protected editor and saved draft flow.
              </p>
              <div className="mt-4">
                <AuthButtons />
              </div>
            </div>
          )}

          <div className="rounded-xl border border-outline-variant bg-white p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-secondary">Free Plan</p>
            <div className="mt-3 space-y-2 text-sm text-on-surface-variant">
              {planFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="block rounded-full border border-outline-variant bg-white px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-on-surface-variant transition-colors hover:border-secondary hover:text-secondary"
            >
              Back to Home
            </Link>
            <Link
              href="/editor?template=simple-starter"
              className="block rounded-full border border-secondary bg-secondary px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-secondary"
            >
              Open Editor
            </Link>
            {isSignedIn ? <SignOutButton /> : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
