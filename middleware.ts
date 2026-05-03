import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

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

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });

        Object.entries(headers).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith("/editor") && !user) {
    const redirectTarget = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    const loginUrl = new URL("/", request.url);

    if (redirectTarget && redirectTarget !== "/editor") {
      loginUrl.searchParams.set("redirect", redirectTarget);
    } else {
      loginUrl.searchParams.set("redirect", "/editor");
    }

    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
