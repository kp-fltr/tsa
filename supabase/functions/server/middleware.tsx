import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import { Context, Next } from "npm:hono@3.12.11";

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

export interface AuthenticatedContext extends Context {
  user: {
    id: string;
    email: string;
  };
}

// Authentication middleware
export async function requireAuth(c: Context, next: Next) {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Missing or invalid authorization header' }, 401);
    }

    const accessToken = authHeader.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Missing access token' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log('Auth error:', error?.message || 'No user found');
      return c.json({ error: 'Invalid or expired token' }, 401);
    }

    // Add user to context
    c.set('user', {
      id: user.id,
      email: user.email || ''
    });

    await next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return c.json({ error: 'Authentication failed' }, 500);
  }
}

// Request validation middleware
export function validateRequest(schema: any) {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      
      // Basic validation - you could integrate with a schema validation library here
      if (schema.required) {
        for (const field of schema.required) {
          if (!(field in body)) {
            return c.json({ error: `Missing required field: ${field}` }, 400);
          }
        }
      }

      c.set('validatedBody', body);
      await next();
    } catch (error) {
      console.error('Request validation error:', error);
      return c.json({ error: 'Invalid request body' }, 400);
    }
  };
}

// Error handling middleware
export function errorHandler(c: Context, error: Error) {
  console.error('Server error:', error);
  
  // Don't expose internal errors in production
  const isDevelopment = Deno.env.get('ENVIRONMENT') === 'development';
  
  return c.json({
    error: 'Internal server error',
    ...(isDevelopment && { details: error.message })
  }, 500);
}

// Rate limiting (basic implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(maxRequests: number, windowMs: number) {
  return async (c: Context, next: Next) => {
    const clientId = c.req.header('CF-Connecting-IP') || 
                    c.req.header('X-Forwarded-For') || 
                    'unknown';
    
    const now = Date.now();
    const clientData = requestCounts.get(clientId);
    
    if (!clientData || now > clientData.resetTime) {
      requestCounts.set(clientId, {
        count: 1,
        resetTime: now + windowMs
      });
      await next();
      return;
    }
    
    if (clientData.count >= maxRequests) {
      return c.json({ error: 'Rate limit exceeded' }, 429);
    }
    
    clientData.count++;
    await next();
  };
}