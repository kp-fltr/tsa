import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const clientRegistry = new Hono();

// CORS middleware
clientRegistry.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Helper function to get user from auth token
async function getAuthenticatedUser(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return { error: 'No authorization token provided', user: null };
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) {
    return { error: 'Invalid or expired token', user: null };
  }

  return { error: null, user };
}

// Initialize the client_registry table if it doesn't exist
clientRegistry.get('/init', async (c) => {
  try {
    // Try to call the initialization function
    const { data, error: tableError } = await supabase.rpc('create_client_registry_table');
    
    if (tableError) {
      // If the function doesn't exist, that's okay - assume table is already set up
      if (tableError.code === 'PGRST202' || tableError.message?.includes('function') || tableError.message?.includes('not found')) {
        // Check if table exists by trying to select from it
        const { error: selectError } = await supabase
          .from('client_registry')
          .select('count(*)', { count: 'exact', head: true })
          .limit(1);
        
        if (selectError) {
          return c.json({ 
            error: 'Database not properly initialized. Please run the database setup SQL script first.',
            details: 'The client_registry table does not exist. Please execute the database-setup.sql script in your Supabase SQL editor.'
          }, 500);
        }
        
        return c.json({ 
          success: true, 
          message: 'Client registry table exists and is ready',
          note: 'Initialization function not found, but table is accessible'
        });
      }
      
      console.error('Error calling initialization function:', tableError);
      return c.json({ error: 'Failed to initialize table', details: tableError.message }, 500);
    }

    return c.json({ success: true, message: 'Client registry initialized successfully', data });
  } catch (error) {
    console.error('Error initializing client registry:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get KPIs for the authenticated advisor
clientRegistry.get('/kpis', async (c) => {
  try {
    const { error: authError, user } = await getAuthenticatedUser(c.req.raw);
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401);
    }

    const { data, error } = await supabase
      .from('client_registry')
      .select(`
        id,
        status,
        next_assessment
      `)
      .eq('advisor_id', user.id);

    if (error) {
      console.error('Error fetching KPIs:', error);
      return c.json({ error: 'Failed to fetch KPIs' }, 500);
    }

    // Calculate KPIs
    const totalClients = data.length;
    const updatedCount = data.filter(client => client.status === 'updated').length;
    const outstandingCount = data.filter(client => client.status === 'outstanding').length;
    const overdueCount = data.filter(client => client.status === 'overdue').length;
    
    // Calculate upcoming assessments (next 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const upcoming30d = data.filter(client => {
      if (!client.next_assessment) return false;
      const nextAssessment = new Date(client.next_assessment);
      const now = new Date();
      return nextAssessment >= now && nextAssessment <= thirtyDaysFromNow;
    }).length;

    const kpis = {
      totalClients,
      updatedCount,
      outstandingCount,
      overdueCount,
      upcoming30d
    };

    return c.json({ success: true, data: kpis });
  } catch (error) {
    console.error('Error in KPIs endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get clients with search, filter, sort, and pagination
clientRegistry.get('/clients', async (c) => {
  try {
    const { error: authError, user } = await getAuthenticatedUser(c.req.raw);
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401);
    }

    const url = new URL(c.req.url);
    const q = url.searchParams.get('q') || '';
    const status = url.searchParams.get('status');
    const sortBy = url.searchParams.get('sortBy') || 'latest_assessment';
    const desc = url.searchParams.get('desc') === 'true';
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');

    let query = supabase
      .from('client_registry')
      .select('*', { count: 'exact' })
      .eq('advisor_id', user.id);

    // Apply search filter
    if (q) {
      query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);
    }

    // Apply status filter
    if (status && status !== 'all') {
      const statusArray = status.split(',');
      query = query.in('status', statusArray);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: !desc });

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching clients:', error);
      return c.json({ error: 'Failed to fetch clients' }, 500);
    }

    return c.json({
      success: true,
      data: data || [],
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize)
      }
    });
  } catch (error) {
    console.error('Error in clients endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create a new client
clientRegistry.post('/clients', async (c) => {
  try {
    const { error: authError, user } = await getAuthenticatedUser(c.req.raw);
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    
    // Validate required fields
    if (!body.name || !body.email) {
      return c.json({ error: 'Name and email are required' }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }

    const clientData = {
      advisor_id: user.id,
      name: body.name,
      email: body.email,
      status: body.status || 'outstanding',
      sustainability_appetite: body.sustainability_appetite || null,
      sustainability_profile: body.sustainability_profile || null,
      latest_assessment: body.latest_assessment || null,
      next_assessment: body.next_assessment || null,
      notes: body.notes || '',
      tags: body.tags || []
    };

    const { data, error } = await supabase
      .from('client_registry')
      .insert(clientData)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return c.json({ error: 'A client with this email already exists' }, 409);
      }
      console.error('Error creating client:', error);
      return c.json({ error: 'Failed to create client' }, 500);
    }

    return c.json({ success: true, data });
  } catch (error) {
    console.error('Error in create client endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update a client
clientRegistry.put('/clients/:id', async (c) => {
  try {
    const { error: authError, user } = await getAuthenticatedUser(c.req.raw);
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401);
    }

    const clientId = c.req.param('id');
    const body = await c.req.json();

    // Validate email format if provided
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return c.json({ error: 'Invalid email format' }, 400);
      }
    }

    const { data, error } = await supabase
      .from('client_registry')
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq('id', clientId)
      .eq('advisor_id', user.id)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return c.json({ error: 'A client with this email already exists' }, 409);
      }
      console.error('Error updating client:', error);
      return c.json({ error: 'Failed to update client' }, 500);
    }

    if (!data) {
      return c.json({ error: 'Client not found or access denied' }, 404);
    }

    return c.json({ success: true, data });
  } catch (error) {
    console.error('Error in update client endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete a client
clientRegistry.delete('/clients/:id', async (c) => {
  try {
    const { error: authError, user } = await getAuthenticatedUser(c.req.raw);
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401);
    }

    const clientId = c.req.param('id');

    const { data, error } = await supabase
      .from('client_registry')
      .delete()
      .eq('id', clientId)
      .eq('advisor_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error deleting client:', error);
      return c.json({ error: 'Failed to delete client' }, 500);
    }

    if (!data) {
      return c.json({ error: 'Client not found or access denied' }, 404);
    }

    return c.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error in delete client endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get a single client by ID
clientRegistry.get('/clients/:id', async (c) => {
  try {
    const { error: authError, user } = await getAuthenticatedUser(c.req.raw);
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401);
    }

    const clientId = c.req.param('id');

    const { data, error } = await supabase
      .from('client_registry')
      .select('*')
      .eq('id', clientId)
      .eq('advisor_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching client:', error);
      return c.json({ error: 'Failed to fetch client' }, 500);
    }

    if (!data) {
      return c.json({ error: 'Client not found or access denied' }, 404);
    }

    return c.json({ success: true, data });
  } catch (error) {
    console.error('Error in get client endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export { clientRegistry };