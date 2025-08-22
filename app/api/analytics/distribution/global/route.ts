import { NextRequest, NextResponse } from 'next/server';
import { 
  getMockProfileDistribution, 
  getMockAppetiteDistribution, 
  DistributionBucket,
} from '../../../../../lib/mockData';

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
    const dim = searchParams.get('dim');
    
    console.log('📊 Global Distribution API request:', { 
      dimension: dim, 
      demoMode: isDemoModeServer(),
      url: request.url 
    });

    if (!dim) {
      return NextResponse.json(
        { error: 'Missing required parameter: dim' },
        { status: 400 }
      );
    }

    if (!['profile', 'appetite'].includes(dim)) {
      return NextResponse.json(
        { error: 'Invalid dimension. Must be "profile" or "appetite"' },
        { status: 400 }
      );
    }

    let distributionData: DistributionBucket[] = [];

    // Demo mode (mock) – return same shape as live
    if (isDemoModeServer()) {
      console.log('🎭 Demo mode enabled, returning Global mock data');
      
      if (dim === 'profile') {
        distributionData = getMockProfileDistribution();
        // Modify slightly for global vs FA to show different data
        distributionData = distributionData.map(item => ({
          ...item,
          count: Math.floor(item.count * 1.2) // Global would typically have more data
        }));
      } else if (dim === 'appetite') {
        distributionData = getMockAppetiteDistribution();
        distributionData = distributionData.map(item => ({
          ...item,
          count: Math.floor(item.count * 1.2)
        }));
      }
    } else {
      console.log('🔗 Demo mode disabled, would query Supabase');
      distributionData = [];
    }

    const totalAssessments = distributionData.reduce((sum, item) => sum + item.count, 0);

    // Ensure consistent response shape
    const response = {
      success: true,
      data: distributionData,
      totalAssessments,
      dimension: dim,
      scope: 'global',
      dateRange: {
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        to: new Date().toISOString()
      },
      generated_at: new Date().toISOString(),
    };

    console.log('✅ Global Distribution API response:', response);
    return NextResponse.json(response);

  } catch (error: any) {
    console.error('❌ Global Distribution API error:', error);
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