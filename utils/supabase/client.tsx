// This file now re-exports from the consolidated client to maintain compatibility
// This prevents breaking existing imports while using the singleton pattern

export {
  supabase,
  getCurrentSession,
  getCurrentUser,
  refreshSession,
  signOut,
  createClient
} from '../../lib/supabaseClient'

// Default export for compatibility
export { default } from '../../lib/supabaseClient'