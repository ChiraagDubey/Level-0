import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
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

function isInvalidRefreshTokenError(error: unknown) {
  const message = getAuthErrorMessage(error)?.toLowerCase() ?? "";

  return message.includes("invalid refresh token") || message.includes("refresh token not found");
}

function isSupabaseAuthTokenCookie(name: string) {
  return (
    (name.startsWith("sb-") && name.includes("-auth-token")) ||
    name === "supabase-auth-token" ||
    name.startsWith("supabase-auth-token.")
  );
}

function clearSupabaseAuthCookies(request: NextRequest, response: NextResponse) {
  request.cookies
    .getAll()
    .filter(({ name }) => isSupabaseAuthTokenCookie(name))
    .forEach(({ name }) => {
      response.cookies.delete(name);
    });
}

function logAuthWarning(context: string, error: unknown) {
  const message = getAuthErrorMessage(error);

  if (message) {
    console.warn(`[auth] ${context}: ${message}`);
    return;
  }

  console.warn(`[auth] ${context}: failed to resolve current user`);
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

  let user: User | null = null;

  try {
    const {
      data: { user: currentUser },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      logAuthWarning("middleware", error);

      if (isInvalidRefreshTokenError(error)) {
        clearSupabaseAuthCookies(request, response);
      }
    } else {
      user = currentUser;
    }
  } catch (error) {
    logAuthWarning("middleware", error);

    if (isInvalidRefreshTokenError(error)) {
      clearSupabaseAuthCookies(request, response);
    }
  }

  if (request.nextUrl.pathname.startsWith("/editor") && !user) {
    let redirectUrl: URL;

    if (request.nextUrl.pathname === "/editor") {
      redirectUrl = new URL("/dashboard", request.url);

      const templateId = request.nextUrl.searchParams.get("template");

      if (templateId) {
        redirectUrl.searchParams.set("template", templateId);
      }
    } else {
      const redirectTarget = `${request.nextUrl.pathname}${request.nextUrl.search}`;
      redirectUrl = new URL("/", request.url);
      redirectUrl.searchParams.set("redirect", redirectTarget);
    }

    const redirectResponse = NextResponse.redirect(redirectUrl);

    clearSupabaseAuthCookies(request, redirectResponse);

    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
