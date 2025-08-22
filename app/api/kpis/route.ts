import { NextRequest, NextResponse } from 'next/server';

// Mock KPIs data
const mockKpis = {
  totalClients: 247,
  totalClientsChange: '+12 this month',
  testsSent: 189,
  testsSentChange: '+18 this week',
  completionRate: '87%',
  completionRateChange: '+5% from last month',
  avgResponseTime: '2.3 days',
  avgResponseTimeChange: '-0.4 days faster',
  assessmentTypes: [
    { name: 'Risk Assessment', count: 156, percentage: 63 },
    { name: 'Compliance Check', count: 45, percentage: 18 },
    { name: 'Annual Review', count: 32, percentage: 13 },
    { name: 'Initial Survey', count: 14, percentage: 6 }
  ],
  monthlyActivity: [
    { month: 'Jan', sent: 45, completed: 38 },
    { month: 'Feb', sent: 52, completed: 44 },
    { month: 'Mar', sent: 41, completed: 36 },
    { month: 'Apr', sent: 58, completed: 51 },
    { month: 'May', sent: 49, completed: 42 },
    { month: 'Jun', sent: 56, completed: 49 }
  ],
  recentActivity: [
    {
      id: 1,
      client: 'Alice Johnson',
      action: 'Completed Risk Assessment',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      client: 'Bob Smith', 
      action: 'Started Compliance Check',
      time: '4 hours ago',
      status: 'in-progress'
    },
    {
      id: 3,
      client: 'Carol Davis',
      action: 'Overdue Annual Review',
      time: '1 day ago',
      status: 'overdue'
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    // Add a small delay to simulate real API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({
      success: true,
      data: mockKpis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('KPIs API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch KPI data',
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