import { NextRequest, NextResponse } from 'next/server';

// Sample recent reports data
const getMockRecentReports = (limit: number = 5, searchQuery: string = '') => {
  const allReports = [
    {
      id: '1',
      clientName: 'John Smith',
      clientEmail: 'john.smith@email.com',
      profile: 'Conservative',
      appetite: 'Low',
      generatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      format: 'PDF',
      fileSizeBytes: 1024768,
      signedUrl: null,
      storagePath: '/reports/client_1_sustainability.pdf'
    },
    {
      id: '2',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah.johnson@email.com',
      profile: 'Moderate',
      appetite: 'Medium',
      generatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      format: 'PDF',
      fileSizeBytes: 987654,
      signedUrl: null,
      storagePath: '/reports/client_2_sustainability.pdf'
    },
    {
      id: '3',
      clientName: 'Michael Chen',
      clientEmail: 'michael.chen@email.com',
      profile: 'Aggressive',
      appetite: 'High',
      generatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      format: 'PDF',
      fileSizeBytes: 1156789,
      signedUrl: null,
      storagePath: '/reports/client_3_sustainability.pdf'
    },
    {
      id: '4',
      clientName: 'Emma Davis',
      clientEmail: 'emma.davis@email.com',
      profile: 'Balanced',
      appetite: 'Medium',
      generatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      format: 'PDF',
      fileSizeBytes: 892345,
      signedUrl: null,
      storagePath: '/reports/client_4_sustainability.pdf'
    },
    {
      id: '5',
      clientName: 'David Wilson',
      clientEmail: 'david.wilson@email.com',
      profile: 'Conservative',
      appetite: 'Low',
      generatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      format: 'PDF',
      fileSizeBytes: 1034567,
      signedUrl: null,
      storagePath: '/reports/client_5_sustainability.pdf'
    }
  ];

  // Filter by search query if provided
  let filteredReports = allReports;
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredReports = allReports.filter(report => 
      report.clientName.toLowerCase().includes(query) ||
      report.clientEmail.toLowerCase().includes(query) ||
      report.profile.toLowerCase().includes(query)
    );
  }

  return filteredReports.slice(0, limit);
};

// Safe demo mode check for server-side
const isDemoModeServer = (): boolean => {
  try {
    return (process.env.NEXT_PUBLIC_DEMO_MODE ?? '1') === '1';
  } catch (error) {
    return true; // Default to demo mode
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const query = searchParams.get('query') || '';
    
    console.log('📊 Recent Reports API request:', { 
      limit,
      query,
      demoMode: isDemoModeServer(),
      url: request.url 
    });

    let reportsData;

    // Demo mode (mock) – return same shape as live
    if (isDemoModeServer()) {
      console.log('🎭 Demo mode enabled, returning mock recent reports');
      reportsData = getMockRecentReports(limit, query);
    } else {
      console.log('🔗 Demo mode disabled, would query Supabase');
      reportsData = getMockRecentReports(limit, query); // Default to mock for now
    }

    // Ensure consistent response shape
    const response = {
      success: true,
      data: reportsData,
      pagination: {
        limit,
        returned: reportsData.length,
        hasMore: reportsData.length === limit // Simple hasMore logic
      },
      query: query || null,
      generated_at: new Date().toISOString(),
    };

    console.log('✅ Recent Reports API response:', response);
    return NextResponse.json(response);

  } catch (error: any) {
    console.error('❌ Recent Reports API error:', error);
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