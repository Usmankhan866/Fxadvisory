import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

// Admin identification (extend as needed)
const adminEmails = ['hannah@switchyardfx.com.au'];

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !anonKey) {
      return NextResponse.json({ error: 'Missing Supabase env vars' }, { status: 500 });
    }

    // Next.js 16: cookies() is async
    const cookieStore = await cookies();

    const supabase = createServerClient(url, anonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    });

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = (session.user.email || '').toLowerCase();
    const tokenRole = (session.user as any)?.app_metadata?.role || (session.user as any)?.user_metadata?.role;
    const isAdmin = tokenRole === 'admin' || adminEmails.includes(email);

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!serviceKey) {
      return NextResponse.json({ error: 'Missing server env vars' }, { status: 500 });
    }

    const service = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Fetch profiles
    const { data: profiles, error: profilesError } = await service
      .from('profiles')
      .select('id, email, full_name, role, last_sign_in, created_at');

    if (profilesError) {
      return NextResponse.json({ error: profilesError.message }, { status: 500 });
    }

    // Batch counts for topics & currencies per user (could be optimized via RPC)
    const results = await Promise.all(
      (profiles || []).map(async (p) => {
        const [{ count: topicsCount }, { count: currenciesCount }] = await Promise.all([
          service.from('user_topics').select('*', { count: 'exact', head: true }).eq('user_id', p.id),
          service.from('user_currencies').select('*', { count: 'exact', head: true }).eq('user_id', p.id)
        ]);
        return {
          id: p.id,
          email: p.email,
          full_name: p.full_name || p.email?.split('@')[0] || 'Unknown',
          role: p.role || 'user',
          topics_count: topicsCount || 0,
          currencies_count: currenciesCount || 0,
          created_at: p.created_at,
          last_sign_in: p.last_sign_in || p.created_at
        };
      })
    );

    return NextResponse.json({ users: results });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
