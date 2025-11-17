import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, NextRequest } from 'next/server';

const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = await createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();
  const pathname = req.nextUrl.pathname;

  let role: string = 'user';
  let email = '';

  if (session?.user) {
    email = (session.user.email || '').toLowerCase();
    // Prefer token metadata
    const u: any = session.user;
    role = u?.app_metadata?.role || u?.user_metadata?.role || 'user';

    // Email whitelist override
    if (adminEmails.includes(email)) {
      role = 'admin';
    }

    // Fallback to profiles (support both id and user_id columns) if still user
    if (role === 'user') {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .or(`id.eq.${session.user.id},user_id.eq.${session.user.id}`)
        .limit(1)
        .maybeSingle();
      if (profile?.role) role = profile.role;
      if (adminEmails.includes(email)) role = 'admin'; // re-assert
    }
  }

  // Debug log
  console.log('MIDDLEWARE session:', session && session.user ? session.user.email : 'none', 'role:', role, 'pathname:', pathname);

  // Attach diagnostic headers (can be viewed in network tab) for debugging
  res.headers.set('x-user-email', email || 'none');
  res.headers.set('x-user-role', role);

  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL(role === 'admin' ? '/dashboard/admin' : '/dashboard/user', req.url));
  }

  if (!session && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard/user', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/login', '/dashboard/:path*', '/admin/:path*'],
};
