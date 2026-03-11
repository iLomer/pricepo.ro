import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        supabaseResponse = NextResponse.next({
          request,
        });
        for (const { name, value, options } of cookiesToSet) {
          supabaseResponse.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protected dashboard routes
  const isProtectedRoute =
    pathname.startsWith("/panou") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/calendar") ||
    pathname.startsWith("/estimator") ||
    pathname.startsWith("/d212") ||
    pathname.startsWith("/alerte") ||
    pathname.startsWith("/registru");

  // Redirect unauthenticated users away from protected routes
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/autentificare";
    const redirectResponse = NextResponse.redirect(url);
    // Carry over cookies from session refresh to prevent cookie bloat
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    });
    return redirectResponse;
  }

  // Redirect authenticated users away from auth routes
  if (user && (pathname.startsWith("/autentificare") || pathname.startsWith("/inregistrare"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/panou";
    const redirectResponse = NextResponse.redirect(url);
    // Carry over cookies from session refresh
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    });
    return redirectResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
