/**
 * Client-safe configuration that never accesses process
 * Use this for components that must run only in browser environments
 */

// These values are set at build time by Next.js for NEXT_PUBLIC_ variables
// For client-side, we use compile-time constants to avoid any runtime process access

const NEXT_PUBLIC_DEMO_MODE = '1'; // This will be replaced by Next.js
const NODE_ENV_DEFAULT = 'development';

export const CLIENT_DEMO_MODE = NEXT_PUBLIC_DEMO_MODE === '1';
export const CLIENT_IS_DEVELOPMENT = NODE_ENV_DEFAULT === 'development';

export const CLIENT_CONFIG = {
  DEMO_MODE: CLIENT_DEMO_MODE,
  IS_DEVELOPMENT: CLIENT_IS_DEVELOPMENT,
} as const;

export const isClientDemoMode = (): boolean => CLIENT_DEMO_MODE;
export const isClientDevelopment = (): boolean => CLIENT_IS_DEVELOPMENT;