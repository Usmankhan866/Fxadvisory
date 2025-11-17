import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e=>e.trim().toLowerCase());

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const cookieStore = await cookies();
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set({ name, value, ...options }));
          } catch {}
        },
      },
    });

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const email = (session.user.email || '').toLowerCase();
    const tokenRole = (session.user as any)?.app_metadata?.role || (session.user as any)?.user_metadata?.role;
    const isAdmin = tokenRole === 'admin' || adminEmails.includes(email);
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const service = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

    const { data, error } = await service
      .from('meetings')
      .select('id, user_id, title, description, preferred_time, status, created_at, approved_at, rejected_at, admin_notes, loom_link, rejected_reason, profiles:profiles!meetings_user_id_fkey(id, email, full_name)')
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ meetings: data || [] });
  } catch (e:any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !anonKey) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const { id, action, admin_notes, loom_link, rejected_reason } = await req.json();
    if (!id || !['approve','reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set({ name, value, ...options }));
          } catch {}
        },
      },
    });

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const email = (session.user.email || '').toLowerCase();
    const tokenRole = (session.user as any)?.app_metadata?.role || (session.user as any)?.user_metadata?.role;
    const isAdmin = tokenRole === 'admin' || adminEmails.includes(email);
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const update: any = { status: action === 'approve' ? 'approved' : 'rejected' };
    if (admin_notes !== undefined) update.admin_notes = admin_notes;
    if (loom_link !== undefined) update.loom_link = loom_link;
    if (rejected_reason !== undefined) update.rejected_reason = rejected_reason;
    if (action === 'reject') update.rejected_at = new Date().toISOString();
    if (action === 'approve') update.approved_at = new Date().toISOString();

    // Use service client for admin updates if available
    if (serviceKey) {
      const service = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
      const { data, error } = await service
        .from('meetings')
        .update(update)
        .eq('id', id)
        .select('*')
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ meeting: data });
    }

    // Fallback to RLS-aware client
    const { data, error } = await supabase
      .from('meetings')
      .update(update)
      .eq('id', id)
      .select('*')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ meeting: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
