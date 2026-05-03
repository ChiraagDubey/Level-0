"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();

    setIsSigningOut(true);
    setErrorMessage(null);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsSigningOut(false);
      setErrorMessage(error.message);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => void handleSignOut()}
        disabled={isSigningOut}
        className="block w-full rounded-full border border-black/10 px-4 py-3 text-center text-sm font-medium text-black disabled:cursor-wait disabled:opacity-70"
      >
        {isSigningOut ? "Signing out..." : "Sign Out"}
      </button>
      {errorMessage ? <p className="text-sm text-[#b42318]">{errorMessage}</p> : null}
    </div>
  );
}
