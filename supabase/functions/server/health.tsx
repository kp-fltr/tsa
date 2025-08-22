import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import * as kv from './kv_store.tsx';

// Initialize Supabase client for health checks
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  service: string;
  version: string;
  checks: {
    supabase: {
      status: 'healthy' | 'unhealthy';
      responseTime?: number;
      error?: string;
    };
    kvStore: {
      status: 'healthy' | 'unhealthy';
      responseTime?: number;
      error?: string;
    };
    storage: {
      status: 'healthy' | 'unhealthy';
      responseTime?: number;
      error?: string;
    };
  };
}

export async function performHealthCheck(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  const result: HealthCheckResult = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'tsa-advisor-backend',
    version: '1.0.0',
    checks: {
      supabase: { status: 'healthy' },
      kvStore: { status: 'healthy' },
      storage: { status: 'healthy' }
    }
  };

  // Test Supabase connection
  try {
    const supabaseStart = Date.now();
    await supabase.auth.getUser('dummy-token');
    result.checks.supabase.responseTime = Date.now() - supabaseStart;
  } catch (error) {
    result.checks.supabase.status = 'unhealthy';
    result.checks.supabase.error = error.message;
    result.status = 'degraded';
  }

  // Test KV store
  try {
    const kvStart = Date.now();
    const testKey = `health-check-${Date.now()}`;
    await kv.set(testKey, { test: true });
    const retrieved = await kv.get(testKey);
    await kv.del(testKey);
    
    if (!retrieved) {
      throw new Error('KV store read/write test failed');
    }
    
    result.checks.kvStore.responseTime = Date.now() - kvStart;
  } catch (error) {
    result.checks.kvStore.status = 'unhealthy';
    result.checks.kvStore.error = error.message;
    result.status = 'degraded';
  }

  // Test storage
  try {
    const storageStart = Date.now();
    const { data: buckets } = await supabase.storage.listBuckets();
    result.checks.storage.responseTime = Date.now() - storageStart;
  } catch (error) {
    result.checks.storage.status = 'unhealthy';
    result.checks.storage.error = error.message;
    result.status = 'degraded';
  }

  // If any critical service is down, mark as unhealthy
  if (result.checks.supabase.status === 'unhealthy' || result.checks.kvStore.status === 'unhealthy') {
    result.status = 'unhealthy';
  }

  return result;
}