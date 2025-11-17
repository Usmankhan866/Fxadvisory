import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function getSessionFromRequest(req: Request, url: string, anonKey: string) {
  const cookieStore = await cookies();
  const ssrClient = createServerClient(url, anonKey, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set({ name, value, ...options })); } catch {} },
    }
  });

  // Try cookies-based session first
  let { data: { session } } = await ssrClient.auth.getSession();

  // Fallback to Authorization Bearer token
  if (!session) {
    const authHeader = req.headers.get('authorization') || req.headers.get('Authorization') || '';
    const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
    if (bearer) {
      const authedClient = createClient(url, anonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { headers: { Authorization: `Bearer ${bearer}` } }
      });
      const { data: userData } = await authedClient.auth.getUser();
      if (userData?.user) {
        session = { user: userData.user } as any;
      }
    }
  }

  return { session, ssrClient } as { session: any, ssrClient: ReturnType<typeof createServerClient> };
}

export async function POST(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !anonKey) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const body = await req.json();
    const { title, description, preferred_time } = body || {};

    if (!title || !preferred_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { session, ssrClient } = await getSessionFromRequest(req, url, anonKey);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Prefer service client to bypass RLS if available
    if (serviceKey) {
      const service = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
      const { data, error } = await service
        .from('meetings')
        .insert({
          user_id: session.user.id,
          title,
          description: description || null,
          preferred_time,
          status: 'pending'
        })
        .select('*')
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ meeting: data }, { status: 201 });
    }

    // Fallback to RLS-aware client
    const { data, error } = await ssrClient
      .from('meetings')
      .insert({
        user_id: session.user.id,
        title,
        description: description || null,
        preferred_time,
        status: 'pending'
      })
      .select('*')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ meeting: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !anonKey) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const { session, ssrClient } = await getSessionFromRequest(req, url, anonKey);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (serviceKey) {
      const service = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
      const { data, error } = await service
        .from('meetings')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ meetings: data || [] });
    }

    // Fallback to RLS-aware client
    const { data, error } = await ssrClient
      .from('meetings')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ meetings: data || [] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
