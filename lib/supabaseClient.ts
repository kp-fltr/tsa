import { createBrowserClient } from '@supabase/ssr'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { Database } from '../types/database'
import { supabaseDebugger } from '../utils/supabaseDebug'

const supabaseUrl = `https://${projectId}.supabase.co`
const supabaseAnonKey = publicAnonKey

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please check the info.tsx file')
}

// Singleton pattern to prevent multiple GoTrueClient instances
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null
let authListenerSetup = false

function createSupabaseClient() {
  const client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
    global: {
      headers: {
        'x-client-info': 'tsa-advisor-app@1.0.0',
      },
    },
    cookies: {
      get(name: string) {
        // For browser client, use document.cookie
        if (typeof document === 'undefined') return undefined
        
        const cookies = document.cookie.split(';')
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim())
          if (cookieName === name) {
            return decodeURIComponent(cookieValue)
          }
        }
        return undefined
      },
      set(name: string, value: string, options: any) {
        if (typeof document === 'undefined') return
        
        let cookieString = `${name}=${encodeURIComponent(value)}`
        
        if (options?.maxAge) {
          cookieString += `; Max-Age=${options.maxAge}`
        }
        if (options?.path) {
          cookieString += `; Path=${options.path}`
        }
        if (options?.domain) {
          cookieString += `; Domain=${options.domain}`
        }
        if (options?.secure) {
          cookieString += '; Secure'
        }
        if (options?.httpOnly) {
          cookieString += '; HttpOnly'
        }
        if (options?.sameSite) {
          cookieString += `; SameSite=${options.sameSite}`
        }
        
        document.cookie = cookieString
      },
      remove(name: string, options: any) {
        if (typeof document === 'undefined') return
        
        let cookieString = `${name}=; Max-Age=0`
        
        if (options?.path) {
          cookieString += `; Path=${options.path}`
        }
        if (options?.domain) {
          cookieString += `; Domain=${options.domain}`
        }
        
        document.cookie = cookieString
      },
    },
  })

  // Register with debugger in development
  if (process.env.NODE_ENV === 'development') {
    supabaseDebugger.registerClient('main-browser-client', 'browser', '/lib/supabaseClient.ts')
  }

  return client
}

// Create or return existing instance (singleton pattern)
export const supabase = (() => {
  if (!supabaseInstance && typeof window !== 'undefined') {
    supabaseInstance = createSupabaseClient()
    
    // Set up auth state change listener once and only once
    if (!authListenerSetup) {
      supabaseInstance.auth.onAuthStateChange((event, session) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔐 Main client auth state changed:', event, session?.user?.id)
        }
      })
      authListenerSetup = true
    }
  }
  
  return supabaseInstance || createSupabaseClient()
})()

// Helper functions with error handling
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Error getting session:', error)
      return null
    }
    
    return session
  } catch (error) {
    console.error('Failed to get session:', error)
    return null
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Error getting user:', error)
      return null
    }
    
    return user
  } catch (error) {
    console.error('Failed to get user:', error)
    return null
  }
}

export async function refreshSession() {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession()
    
    if (error) {
      console.error('Error refreshing session:', error)
      return null
    }
    
    return session
  } catch (error) {
    console.error('Failed to refresh session:', error)
    return null
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error signing out:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Failed to sign out:', error)
    return false
  }
}

// Export createClient function for compatibility
export const createClient = () => supabase

export default supabase