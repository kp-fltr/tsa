import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env';
import type { Database } from '../types/database';

// Browser client for client-side operations
export const supabase = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Legacy client for compatibility (can be removed once all references are updated)
export const createSupabaseClient = () => supabase;

// Server client factory (for API routes)
export const createServerClient = () => {
  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
};

export type SupabaseClient = typeof supabase;