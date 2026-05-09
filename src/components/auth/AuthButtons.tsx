"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthProvider = "google" | "github";

const providerLabels: Record<AuthProvider, string> = {
  google: "Continue with Google",
  github: "Continue with GitHub",
};

function getSafeInternalPath(path?: string) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/dashboard";
  }

  try {
    const url = new URL(path, "http://localhost");

    if (url.origin !== "http://localhost") {
      return "/dashboard";
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/dashboard";
  }
}

export function AuthButtons({ redirectToPath = "/dashboard" }: { redirectToPath?: string }) {
  const [pendingProvider, setPendingProvider] = useState<AuthProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (provider: AuthProvider) => {
    const supabase = createSupabaseBrowserClient();
    const callbackUrl = new URL(`${window.location.origin}/auth/callback`);
    const safeRedirectPath = getSafeInternalPath(redirectToPath);

    callbackUrl.searchParams.set("next", safeRedirectPath);

    setPendingProvider(provider);
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: callbackUrl.toString(),
      },
    });

    if (error) {
      setPendingProvider(null);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {(["google", "github"] as const).map((provider) => (
          <button
            key={provider}
            type="button"
            onClick={() => void handleSignIn(provider)}
            disabled={pendingProvider !== null}
            className={[
              "inline-flex items-center justify-center rounded-full border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors disabled:cursor-wait disabled:opacity-70",
              provider === "google"
                ? "border-secondary bg-secondary text-white hover:bg-secondary"
                : "border-outline-variant bg-white text-on-surface-variant hover:border-secondary hover:text-secondary",
            ].join(" ")}
          >
            {pendingProvider === provider ? "Redirecting..." : providerLabels[provider]}
          </button>
        ))}
      </div>
      {errorMessage ? <p className="text-sm text-[#b42318]">{errorMessage}</p> : null}
    </div>
  );
}
