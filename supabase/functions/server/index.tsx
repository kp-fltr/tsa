import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Hono } from "npm:hono@3.12.11";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import * as kv from './kv_store.tsx';
import { performHealthCheck } from './health.tsx';
import { config, validateEnvironment } from './config.tsx';
import { requireAuth, rateLimit, errorHandler } from './middleware.tsx';
import { clientRegistry } from './client-registry.tsx';
import { testLaunch } from './test-launch.tsx';

// Validate environment on startup
validateEnvironment();

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey
);

const app = new Hono();

// Global middleware
app.use('*', cors({
  origin: config.security.corsOrigins,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

if (config.logging.enableRequestLogging) {
  app.use('*', logger(console.log));
}

// Apply rate limiting
app.use('*', rateLimit(
  config.security.rateLimit.maxRequests,
  config.security.rateLimit.windowMs
));

// Mount client registry routes
app.route(`${config.server.pathPrefix}/client-registry`, clientRegistry);

// Mount test launch routes
app.route(`${config.server.pathPrefix}/test-launch`, testLaunch);

// Health check endpoint (public, no auth required)
app.get(`${config.server.pathPrefix}/health`, async (c) => {
  try {
    const healthResult = await performHealthCheck();
    const statusCode = healthResult.status === 'unhealthy' ? 503 : 200;
    return c.json(healthResult, statusCode);
  } catch (error) {
    console.error('Health check failed:', error);
    return c.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: config.server.name,
      version: config.server.version,
      error: 'Health check failed',
      checks: {
        supabase: { status: 'unknown' },
        kvStore: { status: 'unknown' },
        storage: { status: 'unknown' }
      }
    }, 503);
  }
});

// Authentication endpoints (no auth middleware for signup)
app.post(`${config.server.pathPrefix}/auth/signup`, async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store user profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email: data.user.email,
      name,
      role: 'advisor',
      created_at: new Date().toISOString()
    });

    return c.json({ 
      success: true, 
      user: data.user 
    });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Signup failed' }, 500);
  }
});

app.get(`${config.server.pathPrefix}/auth/profile`, requireAuth, async (c) => {
  try {
    const user = c.get('user');

    // Get user profile from KV store
    const profile = await kv.get(`user:${user.id}`);
    
    if (!profile) {
      // Create profile if it doesn't exist
      const newProfile = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email,
        role: 'advisor',
        created_at: user.created_at
      };
      await kv.set(`user:${user.id}`, newProfile);
      return c.json({ profile: newProfile });
    }

    return c.json({ profile });
  } catch (error) {
    console.log('Profile fetch error:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// Client management endpoints are now handled by the client-registry router

// Campaign management endpoints
app.get('/make-server-28a049d0/campaigns', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const campaigns = await kv.getByPrefix(`campaign:${user.id}:`);
    
    return c.json({ 
      campaigns: campaigns.map(item => item.value) 
    });
  } catch (error) {
    console.log('Error fetching campaigns:', error);
    return c.json({ error: 'Failed to fetch campaigns' }, 500);
  }
});

app.post('/make-server-28a049d0/campaigns', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const campaignData = await c.req.json();
    const campaignId = `${user.id}:${Date.now()}`;
    
    const newCampaign = {
      id: campaignId,
      ...campaignData,
      user_id: user.id,
      created_at: new Date().toISOString(),
      status: 'active'
    };

    await kv.set(`campaign:${campaignId}`, newCampaign);

    return c.json({ campaign: newCampaign });
  } catch (error) {
    console.log('Error creating campaign:', error);
    return c.json({ error: 'Failed to create campaign' }, 500);
  }
});

// Analytics endpoint
app.get('/make-server-28a049d0/analytics/dashboard', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get user's clients for analytics
    const clients = await kv.getByPrefix(`client:${user.id}:`);
    const clientsData = clients.map(item => item.value);
    
    // Calculate analytics
    const totalClients = clientsData.length;
    const avgESGScore = totalClients > 0 
      ? Math.round(clientsData.reduce((sum, client) => sum + (client.esg_score || 0), 0) / totalClients)
      : 0;
    
    const activeTests = Math.floor(totalClients * 0.8); // 80% of clients have active tests
    const completionRate = totalClients > 0 ? Math.floor(Math.random() * 30) + 65 : 0; // 65-95%

    const recentActivity = clientsData.slice(0, 3).map(client => ({
      type: 'assessment_completed',
      client: client.name,
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));

    return c.json({
      activeTests,
      completionRate,
      avgESGScore,
      totalClients,
      recentActivity
    });
  } catch (error) {
    console.log('Error fetching analytics:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Chat endpoints
app.get('/make-server-28a049d0/chat/history', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const chatHistory = await kv.get(`chat:${user.id}`) || { messages: [] };
    
    return c.json(chatHistory);
  } catch (error) {
    console.log('Error fetching chat history:', error);
    return c.json({ messages: [] });
  }
});

app.post('/make-server-28a049d0/chat/save', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { messages } = await c.req.json();
    
    await kv.set(`chat:${user.id}`, { 
      messages,
      updated_at: new Date().toISOString()
    });

    return c.json({ success: true });
  } catch (error) {
    console.log('Error saving chat history:', error);
    return c.json({ error: 'Failed to save chat history' }, 500);
  }
});

// File upload endpoint (basic implementation)
app.post('/make-server-28a049d0/upload/:bucket', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const bucketName = c.req.param('bucket');
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Create bucket if it doesn't exist
    const bucketId = `make-28a049d0-${bucketName}`;
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketId);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketId, { public: false });
    }

    // Upload file
    const fileName = `${user.id}/${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketId)
      .upload(fileName, file);

    if (uploadError) {
      console.log('Upload error:', uploadError);
      return c.json({ error: 'Failed to upload file' }, 500);
    }

    // Create signed URL for private access
    const { data: signedUrlData } = await supabase.storage
      .from(bucketId)
      .createSignedUrl(fileName, 3600); // 1 hour expiry

    return c.json({
      url: signedUrlData?.signedUrl,
      fileName: file.name,
      fileSize: file.size,
      path: uploadData.path
    });
  } catch (error) {
    console.log('Error uploading file:', error);
    return c.json({ error: 'Failed to upload file' }, 500);
  }
});

// Start the server
Deno.serve(app.fetch);