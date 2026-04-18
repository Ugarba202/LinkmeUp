import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Creates a Supabase client for use in Next.js middleware.
 * Refreshes the auth token on every request and updates cookies.
 * 
 * Route protection logic:
 * - /dashboard/* → requires auth + profile_completed
 * - /setup → requires auth (but profile_completed can be false)
 * - /signup, /login → redirects to /dashboard if already authed + completed
 * - /, /u/*, /scan → public, no auth required
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // ─── Frontend Test Mode Bypass ───────────────────────────────────────────
  // If the mock session cookie is present, allow access to protected routes
  // without a real Supabase session. This is for testing the UI flow.
  const hasMockSession = request.cookies.has("linkmeup-mock-session");
  const pathname = request.nextUrl.pathname;

  if (hasMockSession) {
    // If authed in mock mode, prevent visiting login/signup
    if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Refresh the session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ─── Public routes — always accessible ────────────────────────────────
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/u/") ||
    pathname === "/scan";

  if (isPublicRoute) {
    return response;
  }

  // ─── Protected: Dashboard routes ──────────────────────────────────────
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // ─── Auth routes (login/signup) ───────────────────────────────────────
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  // ─── Setup route ──────────────────────────────────────────────────────
  const isSetupRoute = pathname.startsWith("/setup");

  if (!user) {
    // Not authenticated
    if (isDashboardRoute || isSetupRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    return response;
  }

  // ─── User IS authenticated from here ──────────────────────────────────

  // Check profile completion status
  let profileCompleted = false;
  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("profile_completed")
      .eq("id", user.id)
      .maybeSingle();

    profileCompleted = profile?.profile_completed ?? false;
  } catch {
    // If profile fetch fails, default to incomplete
    profileCompleted = false;
  }

  if (isAuthRoute) {
    // Already authenticated → redirect based on profile status
    const url = request.nextUrl.clone();
    url.pathname = profileCompleted ? "/dashboard" : "/setup";
    return NextResponse.redirect(url);
  }

  if (isDashboardRoute && !profileCompleted) {
    // Profile not completed → force setup wizard (matches mobile app behavior)
    const url = request.nextUrl.clone();
    url.pathname = "/setup";
    return NextResponse.redirect(url);
  }

  if (isSetupRoute && profileCompleted) {
    // Profile already completed → redirect to dashboard
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}
