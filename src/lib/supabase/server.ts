import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { cookies } from "next/headers";

function getSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing env var: NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabaseAnonKey) {
    throw new Error("Missing env var: NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return { supabaseUrl, supabaseAnonKey };
}

function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    return typeof message === "string" ? message : null;
  }

  return null;
}

function logAuthWarning(context: string, error: unknown) {
  const message = getAuthErrorMessage(error);

  if (message) {
    console.warn(`[auth] ${context}: ${message}`);
    return;
  }

  console.warn(`[auth] ${context}: failed to resolve current user`);
}

export function isSupabaseAuthTokenCookie(name: string) {
  return (
    (name.startsWith("sb-") && name.includes("-auth-token")) ||
    name === "supabase-auth-token" ||
    name.startsWith("supabase-auth-token.")
  );
}

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components may not be able to persist refreshed cookies directly.
        }
      },
    },
  });
}

export async function getCurrentUserSafe(
  supabase: SupabaseClient,
  context = "server",
): Promise<User | null> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      logAuthWarning(context, error);
      return null;
    }

    return user;
  } catch (error) {
    logAuthWarning(context, error);
    return null;
  }
}
