import { NextRequest, NextResponse } from 'next/server';

// Sample analytics summary data
const getMockAnalyticsSummary = () => ({
  testsRequested: 347,
  reportsProduced: 312,
  testAllowanceRemaining: 653,
  quotaStatus: 'Active',
  periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  periodEnd: new Date().toISOString(),
  totalAllowance: 1000,
  usedAllowance: 347
});

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
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    
    console.log('📊 Analytics Summary API request:', { 
      from,
      to,
      demoMode: isDemoModeServer(),
      url: request.url 
    });

    let summaryData;

    // Demo mode (mock) – return same shape as live
    if (isDemoModeServer()) {
      console.log('🎭 Demo mode enabled, returning mock analytics summary');
      summaryData = getMockAnalyticsSummary();
    } else {
      console.log('🔗 Demo mode disabled, would query Supabase');
      summaryData = getMockAnalyticsSummary(); // Default to mock for now
    }

    // Ensure consistent response shape
    const response = {
      success: true,
      data: summaryData,
      dateRange: {
        from: from || summaryData.periodStart,
        to: to || summaryData.periodEnd
      },
      generated_at: new Date().toISOString(),
    };

    console.log('✅ Analytics Summary API response:', response);
    return NextResponse.json(response);

  } catch (error: any) {
    console.error('❌ Analytics Summary API error:', error);
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