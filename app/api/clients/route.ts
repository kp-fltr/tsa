import { NextRequest, NextResponse } from 'next/server';
import { unifiedClients } from '../../../data/unifiedClientRegistry';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const status = searchParams.get('status') || 'all';
    const sortBy = searchParams.get('sortBy') || 'latest_assessment';
    const desc = searchParams.get('desc') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

    console.log('📊 Clients API request:', { q, status, sortBy, desc, page, pageSize });

    // Filter clients
    let filteredClients = unifiedClients;

    // Apply search query
    if (q.trim()) {
      const query = q.toLowerCase();
      filteredClients = filteredClients.filter(client =>
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (status !== 'all') {
      filteredClients = filteredClients.filter(client => client.status === status);
    }

    // Apply sorting
    filteredClients.sort((a, b) => {
      let aVal: any, bVal: any;
      
      switch (sortBy) {
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        case 'email':
          aVal = a.email;
          bVal = b.email;
          break;
        case 'status':
          aVal = a.status;
          bVal = b.status;
          break;
        case 'latest_assessment':
        default:
          aVal = a.latest_assessment ? new Date(a.latest_assessment) : new Date(0);
          bVal = b.latest_assessment ? new Date(b.latest_assessment) : new Date(0);
          break;
      }

      if (aVal < bVal) return desc ? 1 : -1;
      if (aVal > bVal) return desc ? -1 : 1;
      return 0;
    });

    // Apply pagination
    const total = filteredClients.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedClients = filteredClients.slice(startIndex, endIndex);

    const response = {
      success: true,
      data: paginatedClients,
      pagination: {
        page,
        pageSize,
        total,
        totalPages
      },
      filters: { q, status, sortBy, desc },
      timestamp: new Date().toISOString()
    };

    console.log('✅ Clients API response:', response);
    return NextResponse.json(response);

  } catch (error: any) {
    console.error('❌ Clients API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: error?.message ?? 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    console.log('📊 Create client request:', payload);

    // Basic validation
    if (!payload.name || !payload.email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name and email are required' 
        },
        { status: 400 }
      );
    }

    // Create new client (simulated)
    const newClient = {
      id: `client_${Date.now()}`,
      advisor_id: 'current_advisor',
      ...payload,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log('✅ Client created:', newClient);
    return NextResponse.json({
      success: true,
      data: newClient,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Create client error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create client',
        details: error?.message ?? 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}