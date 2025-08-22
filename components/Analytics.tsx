import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton'
import { Alert, AlertDescription } from './ui/alert'
import { Search, Download, FileText, Calendar, Users, Target, TrendingUp, AlertCircle } from 'lucide-react'
import { 
  useAnalyticsSummary, 
  useDistribution, 
  useRecentReports,
  TimeFilter,
  formatFileSize,
  formatDateForDisplay 
} from '../hooks/useAnalytics'
import { AnalyticsCharts } from './AnalyticsCharts'
import { AnalyticsDistributionCharts } from './AnalyticsDistributionCharts'
import { DebugMockData } from './DebugMockData'
import { cn } from './ui/utils'
import { isDemoMode } from '../lib/mockData'

interface AnalyticsProps {
  className?: string
}

interface KPIData {
  tests_requested: number;
  reports_produced: number;
  test_allowance_remaining: number;
  quota_status: 'Available' | 'Low' | 'Critical';
  generated_at: string;
}

const timeFilterOptions = [
  { value: 'last30' as TimeFilter, label: 'Last 30 Days' },
  { value: 'last90' as TimeFilter, label: 'Last 90 Days' },
  { value: 'ytd' as TimeFilter, label: 'Year to Date' },
  { value: 'all' as TimeFilter, label: 'All Time' },
]

export function Analytics({ className }: AnalyticsProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('last30')
  const [distributionScope, setDistributionScope] = useState<'fa' | 'global'>('fa')
  const [reportsSearchQuery, setReportsSearchQuery] = useState('')
  
  // KPI state management
  const [kpiData, setKpiData] = useState<KPIData | null>(null)
  const [kpiLoading, setKpiLoading] = useState(true)
  const [kpiError, setKpiError] = useState<string | null>(null)

  // Data hooks for reports (keeping existing functionality)
  const summaryQuery = useAnalyticsSummary(timeFilter)
  const profileDistQuery = useDistribution(distributionScope, 'profile', timeFilter)
  const appetiteDistQuery = useDistribution(distributionScope, 'appetite', timeFilter)
  const reportsQuery = useRecentReports(5, reportsSearchQuery)

  // Fetch KPI data from API
  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        setKpiLoading(true)
        setKpiError(null)

        console.log('🔍 Fetching KPIs data...')
        const url = '/api/kpis'
        console.log(`📡 KPIs API URL: ${url}`)

        const response = await fetch(url, { 
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        console.log(`📡 KPIs Response status: ${response.status}`)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error(`❌ KPIs API Error (${response.status}):`, errorText)
          throw new Error(`Failed to fetch KPI data: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log('✅ KPIs API Response:', data)
        
        // Add quota status based on remaining allowance
        const enhancedData = {
          ...data,
          quota_status: data.test_allowance_remaining === -1 
            ? 'Available' 
            : data.test_allowance_remaining <= 10 
              ? 'Critical' 
              : data.test_allowance_remaining <= 30 
                ? 'Low' 
                : 'Available',
          generated_at: new Date().toISOString()
        }
        
        setKpiData(enhancedData)
      } catch (error) {
        console.error('❌ Error fetching KPIs:', error)
        setKpiError(error instanceof Error ? error.message : 'Failed to load KPIs')
      } finally {
        setKpiLoading(false)
      }
    }

    fetchKPIs()
  }, [])

  const handleDownloadReport = (report: any) => {
    if (report.signedUrl) {
      window.open(report.signedUrl, '_blank')
    } else {
      console.warn('No signed URL available for report:', report.id)
    }
  }

  const getQuotaStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'default'
      case 'Low':
        return 'destructive'
      case 'Critical':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero section - Fixed header that doesn't scroll */}
      <div className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-shrink-0">
        {/* Desktop Layout - Side by side with controls aligned */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-card-foreground mb-2">
              Analytics
            </h1>
            <p className="text-muted-foreground text-base content-width">
              Track your TSA assessment performance and insights
            </p>
          </div>
          
          {/* Time Filter Control */}
          <div className="flex items-center gap-3">
            <Select value={timeFilter} onValueChange={(value: TimeFilter) => setTimeFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeFilterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Scrollable Analytics Content */}
      <div className={cn(
        'flex-1 min-h-0 analytics-scroll p-4 sm:p-6 lg:p-8 space-y-8',
        className
      )}>
        {/* Demo Mode Indicator */}
        {isDemoMode() && (
          <Alert className="border-chart-1 bg-chart-1/10">
            <AlertCircle className="h-4 w-4 text-chart-1" />
            <AlertDescription className="text-chart-1">
              <strong>Demo Mode:</strong> Showing sample data for demonstration purposes.
            </AlertDescription>
          </Alert>
        )}

        {/* Debug Component - Only in development */}
        {typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
          <DebugMockData />
        )}

        {/* KPIs Section */}
        <section aria-label="Key Performance Indicators">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-1/10 rounded-lg">
                  <FileText className="h-5 w-5 text-chart-1" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">TSA Tests Requested</p>
                  {kpiLoading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : kpiError ? (
                    <p className="text-h4 font-semibold text-destructive">Error</p>
                  ) : (
                    <p className="text-h4 font-semibold text-foreground">
                      {kpiData?.tests_requested || 0}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-2/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-chart-2" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">TSA Reports Produced</p>
                  {kpiLoading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : kpiError ? (
                    <p className="text-h4 font-semibold text-destructive">Error</p>
                  ) : (
                    <p className="text-h4 font-semibold text-foreground">
                      {kpiData?.reports_produced || 0}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-3/10 rounded-lg">
                  <Target className="h-5 w-5 text-chart-3" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Test Allowance Remaining</p>
                  {kpiLoading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : kpiError ? (
                    <p className="text-h4 font-semibold text-destructive">Error</p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-h4 font-semibold text-foreground">
                        {kpiData?.test_allowance_remaining === -1 
                          ? '∞' 
                          : kpiData?.test_allowance_remaining || 0}
                      </p>
                      {kpiData?.quota_status && (
                        <Badge 
                          variant={getQuotaStatusColor(kpiData.quota_status)}
                          className="text-xs"
                        >
                          {kpiData.quota_status}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Charts Section */}
        <section aria-label="Distribution Analysis" className="space-y-6">
          {/* Distribution Analysis Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h3 className="text-foreground">Distribution Analysis</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Scope:</span>
              <Select 
                value={distributionScope} 
                onValueChange={(value: 'fa' | 'global') => setDistributionScope(value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fa">My Clients Only</SelectItem>
                  <SelectItem value="global">Overall TSA Population</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Charts Grid - Ensuring proper visibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="chart-container">
              <AnalyticsDistributionCharts
                type="profile"
                title="Distribution by Sustainability Profile"
              />
            </div>
            
            <div className="chart-container">
              <AnalyticsDistributionCharts
                type="appetite"
                title="Distribution by Sustainability Appetite"
              />
            </div>
          </div>
        </section>

        {/* Recent Reports Section */}
        <section aria-label="Recent Reports" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-foreground">Recent Reports</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by client name or date..."
                value={reportsSearchQuery}
                onChange={(e) => setReportsSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-[300px]"
              />
            </div>
          </div>

          {reportsQuery.error && (
            <Alert>
              <AlertDescription>{reportsQuery.error}</AlertDescription>
            </Alert>
          )}

          <Card>
            {reportsQuery.loading ? (
              <div className="p-6 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            ) : reportsQuery.data.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-base text-muted-foreground">
                  {reportsSearchQuery ? 'No reports found matching your search.' : 'No reports generated yet.'}
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {reportsQuery.data.map((report) => (
                  <div key={report.id} className="p-6 hover:bg-muted/20 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <p className="font-semibold text-foreground truncate">
                            {report.clientName}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Profile {report.profile}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {report.appetite} Appetite
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDateForDisplay(report.generatedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-sm text-muted-foreground">
                            {report.format.toUpperCase()} • {formatFileSize(report.fileSizeBytes)}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReport(report)}
                          disabled={!report.signedUrl}
                          className="min-w-[100px]"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>

        {/* Bottom spacing to ensure last element is fully visible */}
        <div className="h-4" aria-hidden="true" />
      </div>
    </div>
  )
}

export default Analytics