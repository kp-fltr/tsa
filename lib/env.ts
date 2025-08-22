/**
 * Environment configuration
 * Uses Next.js build-time replacement for NEXT_PUBLIC_ variables
 */

// These will be replaced at build time by Next.js
// Default to OFF for safety
const NEXT_PUBLIC_DEMO_MODE = typeof process !== 'undefined' 
  ? process.env.NEXT_PUBLIC_DEMO_MODE 
  : '0';

const NODE_ENV = typeof process !== 'undefined' 
  ? process.env.NODE_ENV 
  : 'development';

/**
 * Environment configuration object
 */
export const ENV = {
  DEMO_MODE: NEXT_PUBLIC_DEMO_MODE === '1' || NEXT_PUBLIC_DEMO_MODE === 'true',
  NODE_ENV: NODE_ENV || 'development',
  IS_DEVELOPMENT: (NODE_ENV || 'development') === 'development',
  IS_PRODUCTION: (NODE_ENV || 'development') === 'production',
} as const;

/**
 * Utility functions
 */
export const isDemoMode = () => ENV.DEMO_MODE;
export const isDevelopment = () => ENV.IS_DEVELOPMENT;
export const isProduction = () => ENV.IS_PRODUCTION;
export const getNodeEnv = () => ENV.NODE_ENV;