// Server configuration and environment management

export interface ServerConfig {
  environment: 'development' | 'staging' | 'production';
  supabase: {
    url: string;
    serviceRoleKey: string;
  };
  server: {
    version: string;
    name: string;
    pathPrefix: string;
  };
  security: {
    corsOrigins: string[];
    rateLimit: {
      maxRequests: number;
      windowMs: number;
    };
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    enableRequestLogging: boolean;
  };
}

// Load and validate environment variables
function loadConfig(): ServerConfig {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing required environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  }

  const environment = (Deno.env.get('ENVIRONMENT') || 'development') as 'development' | 'staging' | 'production';
  
  return {
    environment,
    supabase: {
      url: supabaseUrl,
      serviceRoleKey: serviceRoleKey,
    },
    server: {
      version: '1.0.0',
      name: 'tsa-advisor-backend',
      pathPrefix: '/make-server-28a049d0',
    },
    security: {
      corsOrigins: environment === 'production' 
        ? [Deno.env.get('FRONTEND_URL') || '*'] 
        : ['*'],
      rateLimit: {
        maxRequests: environment === 'production' ? 100 : 1000,
        windowMs: 15 * 60 * 1000, // 15 minutes
      },
    },
    logging: {
      level: environment === 'production' ? 'info' : 'debug',
      enableRequestLogging: environment !== 'production',
    },
  };
}

// Singleton config instance
export const config = loadConfig();

// Validation helpers
export function validateEnvironment(): void {
  const requiredVars = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];

  const missing = requiredVars.filter(varName => !Deno.env.get(varName));
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  console.log(`🚀 Server starting in ${config.environment} mode`);
  console.log(`📊 Rate limit: ${config.security.rateLimit.maxRequests} requests per ${config.security.rateLimit.windowMs}ms`);
  console.log(`🔍 Logging level: ${config.logging.level}`);
}