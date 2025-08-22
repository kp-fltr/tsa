import React, { useMemo } from 'react'
import { Column } from '@ant-design/plots'
import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { Alert, AlertDescription } from './ui/alert'
import { Badge } from './ui/badge'
import { TrendingUp, Users } from 'lucide-react'
import { DistributionData } from '../hooks/useAnalytics'
import { cn } from './ui/utils'

interface AnalyticsChartsProps {
  type: 'profile' | 'appetite'
  data: DistributionData[]
  loading: boolean
  error: string | null
  title: string
  scope: 'fa' | 'global'
  totalAssessments: number
  className?: string
}

export function AnalyticsCharts({
  type,
  data,
  loading,
  error,
  title,
  scope,
  totalAssessments,
  className
}: AnalyticsChartsProps) {
  // Determine if we're on mobile for responsive chart config
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Chart configuration
  const chartConfig = useMemo(() => {
    // Color mapping for different categories
    const getColor = (bucket: string) => {
      if (type === 'profile') {
        const colors: Record<string, string> = {
          'A': 'rgb(16, 185, 129)', // chart-2 green
          'B': 'rgb(22, 119, 255)', // chart-1 blue  
          'C': 'rgb(245, 158, 11)', // chart-3 amber
          'D': 'rgb(220, 38, 38)',  // chart-4 red
          'E': 'rgb(124, 58, 237)', // chart-5 purple
          'Unknown': 'rgb(113, 113, 121)' // muted-foreground
        }
        return colors[bucket] || colors['Unknown']
      } else {
        const colors: Record<string, string> = {
          'High': 'rgb(16, 185, 129)',   // chart-2 green
          'Medium': 'rgb(245, 158, 11)', // chart-3 amber
          'Low': 'rgb(220, 38, 38)',     // chart-4 red
          'N/A': 'rgb(113, 113, 121)'   // muted-foreground
        }
        return colors[bucket] || colors['N/A']
      }
    }

    // Sort data for better visualization
    const sortedData = [...data].sort((a, b) => {
      if (type === 'profile') {
        const order = ['A', 'B', 'C', 'D', 'E', 'Unknown']
        return order.indexOf(a.bucket) - order.indexOf(b.bucket)
      } else {
        const order = ['High', 'Medium', 'Low', 'N/A']
        return order.indexOf(a.bucket) - order.indexOf(b.bucket)
      }
    })

    return {
      data: sortedData,
      xField: 'bucket',
      yField: 'count',
      seriesField: 'bucket',
      autoFit: true,
      height: isMobile ? 300 : 360,
      color: ({ bucket }: { bucket: string }) => getColor(bucket),
      columnStyle: {
        radius: [6, 6, 0, 0],
      },
      meta: {
        bucket: {
          alias: type === 'profile' ? 'Sustainability Profile' : 'Sustainability Appetite'
        },
        count: {
          alias: 'Number of Assessments'
        }
      },
      label: {
        position: 'top' as const,
        style: {
          fill: 'rgb(24, 24, 27)', // foreground color
          fontSize: 12,
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif'
        },
        formatter: (value: any) => {
          // Only show label if count > 0
          return value.count > 0 ? value.count.toString() : ''
        }
      },
      tooltip: {
        formatter: (datum: any) => ({
          name: type === 'profile' ? `Profile ${datum.bucket}` : `${datum.bucket} Appetite`,
          value: `${datum.count} assessments (${totalAssessments > 0 ? ((datum.count / totalAssessments) * 100).toFixed(1) : 0}%)`
        })
      },
      legend: {
        position: isMobile ? 'bottom' as const : 'top-right' as const,
        itemName: {
          style: {
            fontSize: 12,
            fontFamily: 'Inter, sans-serif'
          }
        }
      },
      axis: {
        x: {
          title: {
            text: type === 'profile' ? 'Sustainability Profile' : 'Sustainability Appetite',
            style: {
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              fill: 'rgb(113, 113, 121)' // muted-foreground
            }
          },
          label: {
            style: {
              fontSize: 11,
              fontFamily: 'Inter, sans-serif',
              fill: 'rgb(113, 113, 121)' // muted-foreground
            }
          }
        },
        y: {
          title: {
            text: 'Number of Assessments',
            style: {
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              fill: 'rgb(113, 113, 121)' // muted-foreground
            }
          },
          label: {
            style: {
              fontSize: 11,
              fontFamily: 'Inter, sans-serif',
              fill: 'rgb(113, 113, 121)' // muted-foreground
            }
          }
        }
      },
      interactions: [
        {
          type: 'element-highlight-by-x'
        },
        {
          type: 'element-highlight'
        }
      ],
      theme: {
        geometries: {
          interval: {
            rect: {
              default: {
                style: {
                  fillOpacity: 0.9
                }
              },
              active: {
                style: {
                  fillOpacity: 1,
                  stroke: 'rgba(24, 24, 27, 0.2)',
                  strokeWidth: 2
                }
              }
            }
          }
        }
      }
    }
  }, [data, type, isMobile, totalAssessments])

  // Calculate summary stats
  const totalCount = data.reduce((sum, item) => sum + item.count, 0)
  const maxCategory = data.reduce((max, item) => 
    item.count > max.count ? item : max, 
    { bucket: '', count: 0 }
  )

  if (loading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-[300px] w-full" />
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={cn('p-6', className)}>
        <h4 className="mb-4 text-foreground">{title}</h4>
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </Card>
    )
  }

  if (totalCount === 0) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-foreground">{title}</h4>
          <Badge variant="outline">
            {scope === 'fa' ? 'My Clients' : 'Global'}
          </Badge>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-base text-muted-foreground mb-2">No data available</p>
          <p className="text-sm text-muted-foreground content-width">
            Complete some assessments to see distribution data
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn('p-6', className)}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-1">
            <h4 className="text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground">
              Based on {totalAssessments} completed assessments
            </p>
          </div>
          <Badge variant="outline" className="self-start">
            {scope === 'fa' ? 'My Clients' : 'Global'}
          </Badge>
        </div>

        {/* Summary Stats */}
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Total:</span>
            <span className="font-semibold text-foreground">{totalCount}</span>
          </div>
          {maxCategory.count > 0 && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Most common:</span>
              <Badge variant="secondary" className="text-xs font-medium">
                {type === 'profile' ? `Profile ${maxCategory.bucket}` : `${maxCategory.bucket} Appetite`}
                ({maxCategory.count})
              </Badge>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="w-full">
          <Column {...chartConfig} />
        </div>

        {/* Data Breakdown (Mobile) */}
        {isMobile && (
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
            {data.map((item) => (
              <div key={item.bucket} className="flex items-center justify-between text-sm py-1">
                <span className="text-muted-foreground">
                  {type === 'profile' ? `Profile ${item.bucket}` : item.bucket}:
                </span>
                <span className="font-semibold text-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

export default AnalyticsCharts