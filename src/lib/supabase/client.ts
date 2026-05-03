import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

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

let browserClient: SupabaseClient | undefined;

export function createSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();

  browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}
