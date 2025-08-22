import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase, getCurrentSession, signOut } from '../lib/supabaseClient';
import { toast } from 'sonner@2.0.3';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  enableDemoMode: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;
    let authSubscription: { data: { subscription: any } } | null = null;

    async function initializeAuth() {
      try {
        // Check for demo mode first
        const demoModeModule = await import('../services/demoModeService');
        const demoModeActive = demoModeModule.shouldUseDemoMode();
        
        if (demoModeActive) {
          if (mounted) {
            enableDemoMode();
          }
          return;
        }

        // Get initial session
        const initialSession = await getCurrentSession();
        
        if (mounted && !isDemoMode) {
          setSession(initialSession);
          setUser(initialSession?.user || null);
        }

        // Set up auth state listener
        authSubscription = supabase.auth.onAuthStateChange(
          (event: AuthChangeEvent, session: Session | null) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('🔄 AuthContext - Auth state changed:', event);
            }
            
            // Don't override demo mode state with auth changes
            if (mounted && !isDemoMode) {
              setSession(session);
              setUser(session?.user || null);
              setLoading(false);
            }

            // Handle specific events (but not in demo mode)
            if (!isDemoMode && mounted) {
              switch (event) {
                case 'SIGNED_IN':
                  toast.success('Successfully signed in!');
                  break;
                case 'SIGNED_OUT':
                  toast.success('Successfully signed out!');
                  setIsDemoMode(false); // Reset demo mode on sign out
                  break;
                case 'TOKEN_REFRESHED':
                  if (process.env.NODE_ENV === 'development') {
                    console.log('🔄 Token refreshed in AuthContext');
                  }
                  break;
                case 'USER_UPDATED':
                  toast.success('Profile updated successfully!');
                  break;
              }
            }
          }
        );
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted && !isDemoMode) {
          setSession(null);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    // Cleanup function
    return () => {
      mounted = false;
      if (authSubscription?.data?.subscription) {
        authSubscription.data.subscription.unsubscribe();
      }
    };
  }, []); // Empty dependency array - this should only run once

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error('No user returned from sign in');
      }

      // Auth state will be updated via the listener
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // Handle specific error cases
      let message = 'Failed to sign in';
      if (error.message?.includes('Invalid login credentials')) {
        message = 'Invalid email or password';
      } else if (error.message?.includes('Email not confirmed')) {
        message = 'Please check your email and click the confirmation link';
      } else if (error.message) {
        message = error.message;
      }
      
      toast.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
          },
        },
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error('No user returned from sign up');
      }

      // Check if email confirmation is required
      if (!data.session) {
        toast.success('Please check your email and click the confirmation link to complete your registration.');
        return;
      }

      // Auth state will be updated via the listener
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      // Handle specific error cases
      let message = 'Failed to create account';
      if (error.message?.includes('User already registered')) {
        message = 'An account with this email already exists';
      } else if (error.message?.includes('Password should be')) {
        message = 'Password must be at least 6 characters long';
      } else if (error.message) {
        message = error.message;
      }
      
      toast.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      
      // If in demo mode, just clear the demo state
      if (isDemoMode) {
        localStorage.removeItem('demo-mode');
        setIsDemoMode(false);
        setUser(null);
        setSession(null);
        toast.success('Demo session ended!');
        return;
      }
      
      const success = await signOut();
      
      if (!success) {
        throw new Error('Failed to sign out');
      }

      // Auth state will be updated via the listener
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      toast.success('Password reset email sent! Check your inbox.');
    } catch (error: any) {
      console.error('Reset password error:', error);
      
      let message = 'Failed to send reset email';
      if (error.message) {
        message = error.message;
      }
      
      toast.error(message);
      throw new Error(message);
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      toast.success('Password updated successfully!');
    } catch (error: any) {
      console.error('Update password error:', error);
      
      let message = 'Failed to update password';
      if (error.message) {
        message = error.message;
      }
      
      toast.error(message);
      throw new Error(message);
    }
  };

  const enableDemoMode = () => {
    // Create a mock user for demo mode
    const mockUser = {
      id: 'demo-user-id',
      email: 'demo@tsaadvisor.com',
      user_metadata: {
        name: 'Demo User'
      },
      app_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      email_confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      role: 'authenticated',
      confirmation_sent_at: null,
      confirmed_at: new Date().toISOString(),
      recovery_sent_at: null,
      email_change_sent_at: null,
      new_email: null,
      invited_at: null,
      action_link: null,
      email_change: null,
      email_change_confirm_status: 0,
      banned_until: null,
      identities: [],
      factors: []
    } as User;

    const mockSession = {
      access_token: 'demo-access-token',
      refresh_token: 'demo-refresh-token',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer',
      user: mockUser
    } as Session;

    // Set demo mode flag in localStorage
    localStorage.setItem('demo-mode', 'true');

    setIsDemoMode(true);
    setUser(mockUser);
    setSession(mockSession);
    setLoading(false);
    
    toast.success('Demo mode enabled! Exploring the dashboard...');
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut: handleSignOut,
    resetPassword,
    updatePassword,
    enableDemoMode,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;