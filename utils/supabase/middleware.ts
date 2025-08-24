import { createServerClient } from "@supabase/ssr";

import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { error: userError } = await supabase.auth.getUser();

    // If there's a JWT error, try to refresh the session
    if (userError && userError.message.includes("JWS")) {
      try {
        const {
          data: { session },
          error: refreshError,
        } = await supabase.auth.refreshSession();
        if (refreshError) {
          // Clear invalid cookies
          response.cookies.delete("sb-access-token");
          response.cookies.delete("sb-refresh-token");
        }
      } catch (refreshError) {
        // Clear invalid cookies on any error
        response.cookies.delete("sb-access-token");
        response.cookies.delete("sb-refresh-token");
      }
    }

    // protected routes
    if (request.nextUrl.pathname.startsWith("/protected") && userError) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    //if (request.nextUrl.pathname === "/" && !userError) {
    //  return NextResponse.redirect(new URL("/protected", request.url));
    //}

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
