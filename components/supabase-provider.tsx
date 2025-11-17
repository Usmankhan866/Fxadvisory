"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect, createContext, useContext } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

const SupabaseCtx = createContext<SupabaseClient | null>(null);

export default function SupabaseProvider({ children, initialSession }: { children: React.ReactNode; initialSession: any }) {
  const [client] = useState(() => createClientComponentClient());

  useEffect(() => {
    // Set up auth state listener to maintain session
    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email || 'no session');
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        // Force a hard reload to sync cookies properly
        if (typeof window !== 'undefined' && event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed, cookies should be updated');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [client]);

  return <SupabaseCtx.Provider value={client}>{children}</SupabaseCtx.Provider>;
}

export function useSupabase() {
  const context = useContext(SupabaseCtx);
  if (!context) {
    throw new Error('useSupabase must be used within SupabaseProvider');
  }
  return context;
}
