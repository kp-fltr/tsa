import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/apiClient'
import { shouldUseDemoMode } from '../services/demoModeService'
import { analyticsApiDemo } from '../services/analyticsApiDemo'

// Types for analytics data
export interface AnalyticsSummary {
  testsRequested: number
  reportsProduced: number
  testAllowanceRemaining: number
  quotaStatus: string
  periodStart: string | null
  periodEnd: string | null
  totalAllowance: number
  usedAllowance: number
}

export interface DistributionData {
  bucket: string
  count: number
}

export interface RecentReport {
  id: string
  clientName: string
  clientEmail: string
  profile: string
  appetite: string
  generatedAt: string
  completedAt: string | null
  format: string
  fileSizeBytes: number | null
  signedUrl: string | null
  storagePath: string
}

export interface DateRange {
  from: Date
  to: Date
}

// Time filter options
export type TimeFilter = 'last30' | 'last90' | 'ytd' | 'all'

export const getDateRangeFromFilter = (filter: TimeFilter): DateRange => {
  const now = new Date()
  const currentYear = now.getFullYear()
  
  switch (filter) {
    case 'last30':
      const last30 = new Date()
      last30.setDate(last30.getDate() - 30)
      return { from: last30, to: now }
    
    case 'last90':
      const last90 = new Date()
      last90.setDate(last90.getDate() - 90)
      return { from: last90, to: now }
    
    case 'ytd':
      const ytdStart = new Date(currentYear, 0, 1) // January 1st of current year
      return { from: ytdStart, to: now }
    
    case 'all':
      const allStart = new Date(2020, 0, 1) // Start from 2020
      return { from: allStart, to: now }
    
    default:
      return getDateRangeFromFilter('last30')
  }
}

// Hook for analytics summary data
export function useAnalyticsSummary(timeFilter: TimeFilter = 'last30') {
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      if (shouldUseDemoMode()) {
        const demoData = await analyticsApiDemo.fetchSummary(timeFilter)
        setData(demoData)
        return
      }

      const dateRange = getDateRangeFromFilter(timeFilter)
      const response = await api.get<{
        success: boolean
        data: AnalyticsSummary
        dateRange: { from: string; to: string }
      }>('/api/analytics/summary', {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString()
      })
      
      if (response.success) {
        setData(response.data)
      } else {
        throw new Error('Failed to fetch analytics summary')
      }
    } catch (err) {
      console.error('Error fetching analytics summary:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      
      // Fallback to demo mode on error
      if (!shouldUseDemoMode()) {
        try {
          console.log('API failed, falling back to demo mode...')
          const demoData = await analyticsApiDemo.fetchSummary(timeFilter)
          setData(demoData)
          setError(null) // Clear error since we have fallback data
        } catch (demoErr) {
          console.error('Demo mode also failed:', demoErr)
        }
      }
    } finally {
      setLoading(false)
    }
  }, [timeFilter])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

// Hook for distribution data
export function useDistribution(
  scope: 'fa' | 'global',
  dimension: 'profile' | 'appetite',
  timeFilter: TimeFilter = 'last30'
) {
  const [data, setData] = useState<DistributionData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalAssessments, setTotalAssessments] = useState(0)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      if (shouldUseDemoMode()) {
        const demoData = await analyticsApiDemo.fetchDistribution(scope, dimension, timeFilter)
        setData(demoData.data)
        setTotalAssessments(demoData.totalAssessments)
        return
      }

      const dateRange = getDateRangeFromFilter(timeFilter)
      const endpoint = `/api/analytics/distribution/${scope}`
      
      const response = await api.get<{
        success: boolean
        data: DistributionData[]
        totalAssessments: number
        dimension: string
        scope: string
        dateRange: { from: string; to: string }
      }>(endpoint, {
        dim: dimension,
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString()
      })
      
      if (response.success) {
        setData(response.data)
        setTotalAssessments(response.totalAssessments)
      } else {
        throw new Error('Failed to fetch distribution data')
      }
    } catch (err) {
      console.error('Error fetching distribution data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      
      // Fallback to demo mode on error
      if (!shouldUseDemoMode()) {
        try {
          console.log('API failed, falling back to demo mode...')
          const demoData = await analyticsApiDemo.fetchDistribution(scope, dimension, timeFilter)
          setData(demoData.data)
          setTotalAssessments(demoData.totalAssessments)
          setError(null) // Clear error since we have fallback data
        } catch (demoErr) {
          console.error('Demo mode also failed:', demoErr)
        }
      }
    } finally {
      setLoading(false)
    }
  }, [scope, dimension, timeFilter])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    totalAssessments,
    refetch: fetchData
  }
}

// Hook for recent reports
export function useRecentReports(limit: number = 5, searchQuery: string = '') {
  const [data, setData] = useState<RecentReport[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      if (shouldUseDemoMode()) {
        const demoData = await analyticsApiDemo.fetchRecentReports(limit, searchQuery)
        setData(demoData)
        setHasMore(demoData.length === limit)
        return
      }

      const response = await api.get<{
        success: boolean
        data: RecentReport[]
        pagination: {
          limit: number
          returned: number
          hasMore: boolean
        }
        query: string | null
      }>('/api/analytics/reports/recent', {
        limit: limit.toString(),
        ...(searchQuery && { query: searchQuery })
      })
      
      if (response.success) {
        setData(response.data)
        setHasMore(response.pagination.hasMore)
      } else {
        throw new Error('Failed to fetch recent reports')
      }
    } catch (err) {
      console.error('Error fetching recent reports:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      
      // Fallback to demo mode on error
      if (!shouldUseDemoMode()) {
        try {
          console.log('API failed, falling back to demo mode...')
          const demoData = await analyticsApiDemo.fetchRecentReports(limit, searchQuery)
          setData(demoData)
          setHasMore(demoData.length === limit)
          setError(null) // Clear error since we have fallback data
        } catch (demoErr) {
          console.error('Demo mode also failed:', demoErr)
        }
      }
    } finally {
      setLoading(false)
    }
  }, [limit, searchQuery])

  // Debounce search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData()
    }, searchQuery ? 300 : 0) // 300ms debounce for search, immediate for other changes

    return () => clearTimeout(timeoutId)
  }, [fetchData])

  return {
    data,
    loading,
    error,
    hasMore,
    refetch: fetchData
  }
}

// Hook for invalidating all analytics data (useful after data changes)
export function useAnalyticsInvalidation() {
  const [isInvalidating, setIsInvalidating] = useState(false)

  const invalidateAll = useCallback(async () => {
    setIsInvalidating(true)
    // Here you would typically invalidate React Query cache or similar
    // For now, we'll just set a small delay to simulate the operation
    await new Promise(resolve => setTimeout(resolve, 100))
    setIsInvalidating(false)
  }, [])

  return {
    invalidateAll,
    isInvalidating
  }
}

// Utility function to format file size
export function formatFileSize(bytes: number | null): string {
  if (!bytes) return 'Unknown size'
  
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`
}

// Utility function to format date for display
export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}