import { Hono } from "npm:hono@3.12.11";
import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import { config } from './config.tsx';
import { requireAuth } from './middleware.tsx';

// Initialize Supabase client
const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey
);

const testLaunch = new Hono();

// Apply auth middleware to all routes
testLaunch.use('*', requireAuth);

// Get available assessment versions
testLaunch.get('/versions', async (c) => {
  try {
    const { data, error } = await supabase
      .from('assessment_versions')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Database error fetching versions:', error);
      return c.json({ 
        success: false, 
        error: 'Failed to fetch assessment versions' 
      }, 500);
    }

    return c.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('Error fetching assessment versions:', error);
    return c.json({ 
      success: false, 
      error: 'Internal server error' 
    }, 500);
  }
});

// Get quota information for current user
testLaunch.get('/quota', async (c) => {
  try {
    const user = c.get('user');
    
    const { data, error } = await supabase
      .from('vw_fa_quota')
      .select('*')
      .eq('advisor_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Database error fetching quota:', error);
      return c.json({ 
        success: false, 
        error: 'Failed to fetch quota information' 
      }, 500);
    }

    // If no quota record exists, create default quota
    if (!data) {
      const { error: insertError } = await supabase
        .from('quota_packages')
        .insert({
          advisor_id: user.id,
          package_name: 'Starter Package',
          test_allowance_total: 100,
          test_allowance_used: 0
        });

      if (insertError) {
        console.error('Error creating default quota:', insertError);
        return c.json({ 
          success: false, 
          error: 'Failed to initialize quota' 
        }, 500);
      }

      return c.json({
        success: true,
        data: {
          test_allowance_total: 100,
          test_allowance_used: 0,
          test_allowance_remaining: 100
        }
      });
    }

    return c.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error fetching quota info:', error);
    return c.json({ 
      success: false, 
      error: 'Internal server error' 
    }, 500);
  }
});

// Launch a new test
testLaunch.post('/', async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    
    const { 
      client_id, 
      assessment_version_id, 
      channel, 
      due_date, 
      lang, 
      notes 
    } = body;

    // Validate required fields
    if (!client_id || !assessment_version_id || !channel || !due_date || !lang) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, 400);
    }

    // Validate channel and language
    if (!['email', 'link'].includes(channel)) {
      return c.json({ 
        success: false, 
        error: 'Invalid channel. Must be "email" or "link"' 
      }, 400);
    }

    if (!['EN', 'DE', 'PT'].includes(lang)) {
      return c.json({ 
        success: false, 
        error: 'Invalid language. Must be EN, DE, or PT' 
      }, 400);
    }

    // Validate due date
    const dueDateObj = new Date(due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dueDateObj <= today) {
      return c.json({ 
        success: false, 
        error: 'Due date must be in the future' 
      }, 400);
    }

    // Verify client belongs to advisor
    const { data: clientData, error: clientError } = await supabase
      .from('client_registry')
      .select('id')
      .eq('id', client_id)
      .eq('advisor_id', user.id)
      .single();

    if (clientError || !clientData) {
      return c.json({ 
        success: false, 
        error: 'Client not found or access denied' 
      }, 404);
    }

    // Call RPC function to launch test atomically
    const { data: result, error: rpcError } = await supabase
      .rpc('rpc_launch_test', {
        p_client_id: client_id,
        p_version_id: assessment_version_id,
        p_channel: channel,
        p_due_date: due_date,
        p_lang: lang,
        p_notes: notes
      });

    if (rpcError) {
      console.error('RPC error launching test:', rpcError);
      
      let errorMessage = 'Failed to launch test';
      if (rpcError.message.includes('quota')) {
        errorMessage = 'Insufficient test quota remaining';
      } else if (rpcError.message.includes('version')) {
        errorMessage = 'Invalid assessment version';
      } else if (rpcError.message.includes('due date')) {
        errorMessage = 'Due date must be in the future';
      }
      
      return c.json({ 
        success: false, 
        error: errorMessage 
      }, 400);
    }

    // If channel is email, enqueue email job (placeholder for now)
    if (channel === 'email') {
      console.log(`Email job queued for assessment ${result.assessment_id}`);
      // TODO: Implement email queue integration
    }

    return c.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error launching test:', error);
    return c.json({ 
      success: false, 
      error: 'Internal server error' 
    }, 500);
  }
});

// Get assessments for current user
testLaunch.get('/assessments', async (c) => {
  try {
    const user = c.get('user');
    
    const { data, error } = await supabase
      .from('assessments')
      .select(`
        *,
        client_registry(name, email),
        assessment_versions(name, version)
      `)
      .eq('advisor_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error fetching assessments:', error);
      return c.json({ 
        success: false, 
        error: 'Failed to fetch assessments' 
      }, 500);
    }

    return c.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return c.json({ 
      success: false, 
      error: 'Internal server error' 
    }, 500);
  }
});

export { testLaunch };