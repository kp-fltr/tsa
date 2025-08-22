// Utility for debugging Supabase client instances and auth state
// This helps ensure we're using a singleton pattern correctly

interface ClientInfo {
  id: string;
  type: 'browser' | 'server' | 'admin';
  createdAt: Date;
  location: string;
}

class SupabaseDebugger {
  private static instance: SupabaseDebugger;
  private clients: Map<string, ClientInfo> = new Map();

  private constructor() {}

  static getInstance(): SupabaseDebugger {
    if (!SupabaseDebugger.instance) {
      SupabaseDebugger.instance = new SupabaseDebugger();
    }
    return SupabaseDebugger.instance;
  }

  registerClient(id: string, type: 'browser' | 'server' | 'admin', location: string) {
    if (this.clients.has(id)) {
      console.warn(`Supabase client ${id} already registered at ${this.clients.get(id)?.location}`);
      return;
    }

    this.clients.set(id, {
      id,
      type,
      createdAt: new Date(),
      location
    });

    console.log(`Registered Supabase ${type} client: ${id} at ${location}`);
    this.logClientCount();
  }

  unregisterClient(id: string) {
    if (this.clients.delete(id)) {
      console.log(`Unregistered Supabase client: ${id}`);
      this.logClientCount();
    }
  }

  logClientCount() {
    const browserClients = Array.from(this.clients.values()).filter(c => c.type === 'browser');
    const serverClients = Array.from(this.clients.values()).filter(c => c.type === 'server');
    const adminClients = Array.from(this.clients.values()).filter(c => c.type === 'admin');

    console.log(`Supabase clients: ${browserClients.length} browser, ${serverClients.length} server, ${adminClients.length} admin`);

    if (browserClients.length > 1) {
      console.warn('Multiple browser clients detected! This may cause GoTrueClient conflicts.');
      browserClients.forEach(client => {
        console.warn(`  - ${client.id} at ${client.location} (created: ${client.createdAt.toISOString()})`);
      });
    }
  }

  getAllClients() {
    return Array.from(this.clients.values());
  }

  reset() {
    this.clients.clear();
  }
}

export const supabaseDebugger = SupabaseDebugger.getInstance();

// Helper function to check for multiple GoTrueClient instances
export function checkForMultipleClients() {
  if (typeof window === 'undefined') return;

  // Check if there are multiple auth clients in the window
  const authInstances = Object.keys(window).filter(key => 
    key.includes('supabase') || key.includes('auth') || key.includes('gotrue')
  );

  if (authInstances.length > 0) {
    console.log('Potential auth-related window properties:', authInstances);
  }

  // Log current client state
  supabaseDebugger.logClientCount();
}

// Development helper to monitor auth state
export function setupAuthMonitoring() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  // Monitor for potential issues
  let authStateChangeCount = 0;
  
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    const message = args.join(' ');
    if (message.includes('GoTrueClient') || message.includes('Multiple') || message.includes('same browser context')) {
      console.error('🚨 SUPABASE CLIENT ISSUE DETECTED:', ...args);
      supabaseDebugger.logClientCount();
    }
    originalConsoleWarn.apply(console, args);
  };

  // Log periodic status
  setInterval(() => {
    if (authStateChangeCount > 10) {
      console.log('High auth state change activity detected:', authStateChangeCount);
      authStateChangeCount = 0;
    }
  }, 30000); // Every 30 seconds
}

// Call this in development to set up monitoring
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  setupAuthMonitoring();
}