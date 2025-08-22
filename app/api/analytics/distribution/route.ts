import { NextRequest, NextResponse } from 'next/server';

// Mock distribution data
const mockDistributionData = {
  appetiteDistribution: [
    { name: 'Low', value: 35, count: 86 },
    { name: 'Medium', value: 42, count: 104 },
    { name: 'High', value: 18, count: 44 },
    { name: 'N/A', value: 5, count: 13 }
  ],
  profileDistribution: [
    { name: 'Profile A', value: 28, count: 69, color: '#1677FF' },
    { name: 'Profile B', value: 24, count: 59, color: '#10B981' },
    { name: 'Profile C', value: 22, count: 54, color: '#F59E0B' },
    { name: 'Profile D', value: 16, count: 39, color: '#DC2626' },
    { name: 'Profile E', value: 10, count: 26, color: '#7C3AED' }
  ],
  assessmentStatus: [
    { name: 'Updated', value: 65, count: 160, color: '#10B981' },
    { name: 'Outstanding', value: 23, count: 57, color: '#F59E0B' },
    { name: 'Overdue', value: 12, count: 30, color: '#DC2626' }
  ],
  testPerformance: [
    { month: 'Jan', sent: 45, completed: 38, completion_rate: 84 },
    { month: 'Feb', sent: 52, completed: 44, completion_rate: 85 },
    { month: 'Mar', sent: 41, completed: 36, completion_rate: 88 },
    { month: 'Apr', sent: 58, completed: 51, completion_rate: 88 },
    { month: 'May', sent: 49, completed: 42, completion_rate: 86 },
    { month: 'Jun', sent: 56, completed: 49, completion_rate: 88 }
  ],
  timeDistribution: {
    byHour: [
      { hour: '9 AM', count: 12 },
      { hour: '10 AM', count: 18 },
      { hour: '11 AM', count: 25 },
      { hour: '12 PM', count: 22 },
      { hour: '1 PM', count: 15 },
      { hour: '2 PM', count: 28 },
      { hour: '3 PM', count: 32 },
      { hour: '4 PM', count: 19 },
      { hour: '5 PM', count: 8 }
    ],
    byDay: [
      { day: 'Monday', count: 42 },
      { day: 'Tuesday', count: 38 },
      { day: 'Wednesday', count: 45 },
      { day: 'Thursday', count: 41 },
      { day: 'Friday', count: 35 },
      { day: 'Saturday', count: 12 },
      { day: 'Sunday', count: 8 }
    ]
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    // Add a small delay to simulate real API
    await new Promise(resolve => setTimeout(resolve, 200));
    
    let data;
    switch (type) {
      case 'appetite':
        data = { appetiteDistribution: mockDistributionData.appetiteDistribution };
        break;
      case 'profile':
        data = { profileDistribution: mockDistributionData.profileDistribution };
        break;
      case 'status':
        data = { assessmentStatus: mockDistributionData.assessmentStatus };
        break;
      case 'performance':
        data = { testPerformance: mockDistributionData.testPerformance };
        break;
      case 'time':
        data = { timeDistribution: mockDistributionData.timeDistribution };
        break;
      default:
        data = mockDistributionData;
    }
    
    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Analytics Distribution API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch distribution data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}