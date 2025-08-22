import { 
  AnalyticsSummary, 
  DistributionData, 
  RecentReport,
  TimeFilter,
  getDateRangeFromFilter 
} from '../hooks/useAnalytics'

// Mock assessments data for demo mode
const mockAssessments = [
  {
    id: '1',
    advisor_id: 'demo-user',
    client_id: '1',
    requested_at: '2024-01-15T10:00:00Z',
    completed_at: '2024-01-16T14:30:00Z',
    profile: 'A',
    appetite: 'High',
    status: 'completed'
  },
  {
    id: '2',
    advisor_id: 'demo-user',
    client_id: '2',
    requested_at: '2024-01-20T09:15:00Z',
    completed_at: '2024-01-22T16:45:00Z',
    profile: 'B',
    appetite: 'Medium',
    status: 'completed'
  },
  {
    id: '3',
    advisor_id: 'demo-user',
    client_id: '3',
    requested_at: '2024-01-25T11:30:00Z',
    completed_at: '2024-01-27T13:20:00Z',
    profile: 'C',
    appetite: 'Low',
    status: 'completed'
  },
  {
    id: '4',
    advisor_id: 'demo-user',
    client_id: '4',
    requested_at: '2024-02-01T14:00:00Z',
    completed_at: '2024-02-03T10:15:00Z',
    profile: 'B',
    appetite: 'High',
    status: 'completed'
  },
  {
    id: '5',
    advisor_id: 'demo-user',
    client_id: '5',
    requested_at: '2024-02-05T08:45:00Z',
    completed_at: '2024-02-07T15:30:00Z',
    profile: 'A',
    appetite: 'Medium',
    status: 'completed'
  },
  {
    id: '6',
    advisor_id: 'demo-user',
    client_id: '6',
    requested_at: '2024-02-10T16:20:00Z',
    completed_at: null,
    profile: null,
    appetite: null,
    status: 'in_progress'
  },
  {
    id: '7',
    advisor_id: 'demo-user',
    client_id: '7',
    requested_at: '2024-02-12T12:00:00Z',
    completed_at: null,
    profile: null,
    appetite: null,
    status: 'requested'
  }
]

// Mock reports data
const mockReports = [
  {
    id: 'report-1',
    advisor_id: 'demo-user',
    client_id: '1',
    assessment_id: '1',
    generated_at: '2024-01-16T15:00:00Z',
    storage_path: 'reports/demo/sarah_johnson_sustainability_report.pdf',
    format: 'pdf',
    file_size_bytes: 2048000,
    client_name: 'Sarah Johnson',
    profile: 'A',
    appetite: 'High'
  },
  {
    id: 'report-2',
    advisor_id: 'demo-user',
    client_id: '2',
    assessment_id: '2',
    generated_at: '2024-01-22T17:00:00Z',
    storage_path: 'reports/demo/michael_chen_sustainability_report.pdf',
    format: 'pdf',
    file_size_bytes: 1945000,
    client_name: 'Michael Chen',
    profile: 'B',
    appetite: 'Medium'
  },
  {
    id: 'report-3',
    advisor_id: 'demo-user',
    client_id: '3',
    assessment_id: '3',
    generated_at: '2024-01-27T14:00:00Z',
    storage_path: 'reports/demo/emma_williams_sustainability_report.pdf',
    format: 'pdf',
    file_size_bytes: 2156000,
    client_name: 'Emma Williams',
    profile: 'C',
    appetite: 'Low'
  },
  {
    id: 'report-4',
    advisor_id: 'demo-user',
    client_id: '4',
    assessment_id: '4',
    generated_at: '2024-02-03T11:00:00Z',
    storage_path: 'reports/demo/david_brown_sustainability_report.pdf',
    format: 'pdf',
    file_size_bytes: 1987000,
    client_name: 'David Brown',
    profile: 'B',
    appetite: 'High'
  },
  {
    id: 'report-5',
    advisor_id: 'demo-user',
    client_id: '5',
    assessment_id: '5',
    generated_at: '2024-02-07T16:00:00Z',
    storage_path: 'reports/demo/lisa_garcia_sustainability_report.pdf',
    format: 'pdf',
    file_size_bytes: 2234000,
    client_name: 'Lisa Garcia',
    profile: 'A',
    appetite: 'Medium'
  }
]

// Mock quota data
const mockQuotaPackage = {
  allowance: 50,
  used: 7,
  remaining: 43,
  package_type: 'monthly',
  period_start: '2024-02-01',
  period_end: '2024-02-29',
  status: 'Available'
}

// Global distribution data (aggregated across all advisors)
const mockGlobalDistribution = {
  profile: [
    { bucket: 'A', count: 45 },
    { bucket: 'B', count: 67 },
    { bucket: 'C', count: 52 },
    { bucket: 'D', count: 38 },
    { bucket: 'E', count: 23 }
  ],
  appetite: [
    { bucket: 'High', count: 89 },
    { bucket: 'Medium', count: 78 },
    { bucket: 'Low', count: 45 },
    { bucket: 'N/A', count: 13 }
  ]
}

// Demo API functions
export const analyticsApiDemo = {
  async fetchSummary(timeFilter: TimeFilter): Promise<AnalyticsSummary> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const dateRange = getDateRangeFromFilter(timeFilter)
    
    // Filter assessments by date range
    const filteredAssessments = mockAssessments.filter(assessment => {
      const requestedDate = new Date(assessment.requested_at)
      return requestedDate >= dateRange.from && requestedDate <= dateRange.to
    })
    
    const testsRequested = filteredAssessments.length
    const reportsProduced = filteredAssessments.filter(a => a.status === 'completed').length
    
    return {
      testsRequested,
      reportsProduced,
      testAllowanceRemaining: mockQuotaPackage.remaining,
      quotaStatus: mockQuotaPackage.status,
      periodStart: mockQuotaPackage.period_start,
      periodEnd: mockQuotaPackage.period_end,
      totalAllowance: mockQuotaPackage.allowance,
      usedAllowance: mockQuotaPackage.used
    }
  },

  async fetchDistribution(
    scope: 'fa' | 'global',
    dimension: 'profile' | 'appetite',
    timeFilter: TimeFilter
  ): Promise<{ data: DistributionData[]; totalAssessments: number }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))
    
    if (scope === 'global') {
      // Return pre-calculated global data
      return {
        data: mockGlobalDistribution[dimension],
        totalAssessments: mockGlobalDistribution[dimension].reduce((sum, item) => sum + item.count, 0)
      }
    }
    
    // For FA scope, filter by date range
    const dateRange = getDateRangeFromFilter(timeFilter)
    const filteredAssessments = mockAssessments.filter(assessment => {
      if (assessment.status !== 'completed') return false
      const completedDate = new Date(assessment.completed_at!)
      return completedDate >= dateRange.from && completedDate <= dateRange.to
    })
    
    // Count by dimension
    const counts = new Map<string, number>()
    
    if (dimension === 'profile') {
      // Initialize all profiles
      ['A', 'B', 'C', 'D', 'E'].forEach(profile => counts.set(profile, 0))
      
      filteredAssessments.forEach(assessment => {
        const profile = assessment.profile || 'Unknown'
        counts.set(profile, (counts.get(profile) || 0) + 1)
      })
    } else {
      // Initialize all appetites
      ['High', 'Medium', 'Low', 'N/A'].forEach(appetite => counts.set(appetite, 0))
      
      filteredAssessments.forEach(assessment => {
        const appetite = assessment.appetite || 'N/A'
        counts.set(appetite, (counts.get(appetite) || 0) + 1)
      })
    }
    
    const data = Array.from(counts.entries()).map(([bucket, count]) => ({
      bucket,
      count
    }))
    
    return {
      data,
      totalAssessments: filteredAssessments.length
    }
  },

  async fetchRecentReports(limit: number = 5, query: string = ''): Promise<RecentReport[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350))
    
    let filteredReports = [...mockReports]
    
    // Apply search filter
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      filteredReports = filteredReports.filter(report => 
        report.client_name.toLowerCase().includes(searchTerm)
      )
    }
    
    // Sort by generated_at desc and limit
    filteredReports.sort((a, b) => 
      new Date(b.generated_at).getTime() - new Date(a.generated_at).getTime()
    )
    
    return filteredReports.slice(0, limit).map(report => ({
      id: report.id,
      clientName: report.client_name,
      clientEmail: `${report.client_name.toLowerCase().replace(' ', '.')}@example.com`,
      profile: report.profile,
      appetite: report.appetite,
      generatedAt: report.generated_at,
      completedAt: report.generated_at, // Assume completed when generated for demo
      format: report.format,
      fileSizeBytes: report.file_size_bytes,
      signedUrl: `https://demo.tsa-advisor.com/download/${report.id}`, // Demo URL
      storagePath: report.storage_path
    }))
  },

  async checkHealth(): Promise<any> {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'TSA Advisor Analytics (Demo Mode)',
      version: '1.0.0-demo',
      checks: {
        database: { status: 'healthy', note: 'Using demo data' },
        auth: { status: 'demo_mode', userId: 'demo-user' },
        analytics: { status: 'healthy', assessments: mockAssessments.length, reports: mockReports.length }
      }
    }
  }
}

export default analyticsApiDemo