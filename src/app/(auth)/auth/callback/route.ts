import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * OAuth callback handler.
 * Supabase redirects here after a successful OAuth sign-in.
 * Exchanges the auth code for a session and redirects the user.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && authData?.session?.user) {
      const user = authData.session.user;
      
      // Ensure profile row exists for OAuth signups
      await (supabase.from("profiles") as any).upsert({
        id: user.id,
        full_name: user.user_metadata?.full_name || "",
        profile_completed: false,
        created_at: new Date().toISOString(),
      }, { onConflict: 'id', ignoreDuplicates: true });

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
