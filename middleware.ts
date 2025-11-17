import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Create Supabase client with cookie handling
  const supabase = createMiddlewareClient({ req, res });

  // CRITICAL: getUser() validates the JWT and refreshes if needed
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  const pathname = req.nextUrl.pathname;

  let role = 'user';
  let email = '';
  let profileError = null;

  // If we have a valid user
  if (user) {
    email = (user.email || '').toLowerCase();
    const u = user as any;
    role = u?.app_metadata?.role || u?.user_metadata?.role || 'user';
    
    // Only query profiles if we don't have role and not on static path
    if (role === 'user' && !pathname.startsWith('/_next') && !pathname.includes('.')) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
      if (profile?.role) role = profile.role;
      if (error) profileError = error.message;
    }
  }

  // Debug headers
  res.headers.set('x-user-email', email || 'none');
  res.headers.set('x-user-role', role);
  res.headers.set('x-has-user', user ? 'yes' : 'no');
  if (userError) res.headers.set('x-user-error', userError.message);
  if (profileError) res.headers.set('x-profile-error', profileError);

  console.log('MIDDLEWARE - path:', pathname, '| cookies:', req.cookies.getAll().length, '| user:', user?.email || 'NONE', '| role:', role, '| error:', userError?.message || 'none');

  // Redirect logged-in users away from login
  if (user && pathname === "/login") {
    return NextResponse.redirect(new URL(role === 'admin' ? '/dashboard/admin' : '/dashboard/user', req.url));
  }

  // Protect dashboard routes - require auth
  if (!user && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin-only protection
  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/user", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/admin/:path*"],
};
