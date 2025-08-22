/**
 * Centralized configuration for environment flags
 * This eliminates client-side process usage and provides a single source of truth
 */

// For client-side, Next.js replaces process.env.NEXT_PUBLIC_* at build time
// For server-side, we can safely access process.env
// We'll use a try-catch to handle any edge cases

let demoMode = true; // Default to demo mode
let nodeEnv = 'development'; // Default environment

try {
  // This should work in all environments due to Next.js build-time replacement
  if (typeof process !== 'undefined' && process.env) {
    demoMode = (process.env.NEXT_PUBLIC_DEMO_MODE ?? '1') === '1';
    nodeEnv = process.env.NODE_ENV ?? 'development';
  }
} catch (error) {
  // Fallback to defaults if process is not available
  console.warn('Failed to access environment variables, using defaults');
}

export const DEMO_MODE: boolean = demoMode;
export const NODE_ENV: string = nodeEnv;
export const IS_DEVELOPMENT: boolean = nodeEnv === 'development';
export const IS_PRODUCTION: boolean = nodeEnv === 'production';

// Configuration object for easy access
export const CONFIG = {
  DEMO_MODE,
  NODE_ENV,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
} as const;

// Utility functions
export const isDemoMode = (): boolean => DEMO_MODE;
export const isDevelopment = (): boolean => IS_DEVELOPMENT;
export const isProduction = (): boolean => IS_PRODUCTION;