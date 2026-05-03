"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthProvider = "google" | "github";

const providerLabels: Record<AuthProvider, string> = {
  google: "Continue with Google",
  github: "Continue with GitHub",
};

export function AuthButtons({ redirectToPath = "/dashboard" }: { redirectToPath?: string }) {
  const [pendingProvider, setPendingProvider] = useState<AuthProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (provider: AuthProvider) => {
    const supabase = createSupabaseBrowserClient();
    const callbackUrl = new URL(`${window.location.origin}/auth/callback`);

    if (redirectToPath) {
      callbackUrl.searchParams.set("next", redirectToPath);
    }

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
      <div className="grid gap-2">
        {(["google", "github"] as const).map((provider) => (
          <button
            key={provider}
            type="button"
            onClick={() => void handleSignIn(provider)}
            disabled={pendingProvider !== null}
            className="rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-sand disabled:cursor-wait disabled:opacity-70"
          >
            {pendingProvider === provider ? "Redirecting..." : providerLabels[provider]}
          </button>
        ))}
      </div>
      {errorMessage ? <p className="text-sm text-[#b42318]">{errorMessage}</p> : null}
    </div>
  );
}
