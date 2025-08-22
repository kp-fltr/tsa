import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { projectId, publicAnonKey } from '../utils/supabase/info'

// Server environment variables - these are only available on the server
const getServerEnvVar = (name: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name]
  }
  return undefined
}

// Get Supabase configuration
const supabaseUrl = `https://${projectId}.supabase.co`
const supabaseAnonKey = publicAnonKey
const supabaseServiceKey = getServerEnvVar('SUPABASE_SERVICE_ROLE_KEY')

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please check the info.tsx file')
}

// Server client for API routes with cookie handling
export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // Handle cookie setting errors (e.g., in middleware)
          console.error('Error setting cookie:', error)
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          // Handle cookie removal errors
          console.error('Error removing cookie:', error)
        }
      },
    },
  })
}

// Admin client for server-side operations that require elevated privileges
export function createServerSupabaseAdminClient() {
  if (!supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY. This is required for admin operations.')
  }

  return createServerClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    cookies: {
      get() { return undefined },
      set() {},
      remove() {},
    },
  })
}

// Auth guard utility for API routes
export async function requireUser(supabase: ReturnType<typeof createServerSupabaseClient>) {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Auth error:', error)
      return { user: null, error: 'Authentication failed' }
    }
    
    if (!user) {
      return { user: null, error: 'User not authenticated' }
    }
    
    return { user, error: null }
  } catch (error) {
    console.error('Failed to get user:', error)
    return { user: null, error: 'Authentication check failed' }
  }
}