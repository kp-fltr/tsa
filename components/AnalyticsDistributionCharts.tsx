import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';

interface DistributionData {
  bucket: string;
  count: number;
}

interface DistributionResponse {
  data: DistributionData[];
  dimension: string;
  total_assessments: number;
  generated_at: string;
}

interface AnalyticsDistributionChartsProps {
  type: 'profile' | 'appetite';
  title: string;
  className?: string;
}

export function AnalyticsDistributionCharts({ 
  type, 
  title, 
  className = '' 
}: AnalyticsDistributionChartsProps) {
  const [data, setData] = useState<DistributionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalAssessments, setTotalAssessments] = useState(0);

  useEffect(() => {
    const fetchDistributionData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`🔍 Fetching ${type} distribution data...`);
        const url = `/api/analytics/distribution?type=${type}`;
        console.log(`📡 API URL: ${url}`);

        const response = await fetch(url, { 
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log(`📡 Response status: ${response.status}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ API Error (${response.status}):`, errorText);
          throw new Error(`Failed to fetch ${type} distribution data: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log(`✅ API Response for ${type}:`, result);
        
        if (result.success && result.data) {
          // Map the API response to chart format
          if (type === 'appetite' && result.data.appetiteDistribution) {
            const chartData = result.data.appetiteDistribution.map((item: any) => ({
              bucket: item.name,
              count: item.count
            }));
            setData(chartData);
            setTotalAssessments(chartData.reduce((sum: number, item: any) => sum + item.count, 0));
          } else if (type === 'profile' && result.data.profileDistribution) {
            const chartData = result.data.profileDistribution.map((item: any) => ({
              bucket: item.name,
              count: item.count
            }));
            setData(chartData);
            setTotalAssessments(chartData.reduce((sum: number, item: any) => sum + item.count, 0));
          } else {
            throw new Error(`No ${type} distribution data found in response`);
          }
        } else {
          throw new Error(result.error || 'Invalid response format');
        }
      } catch (err) {
        console.error(`❌ Error fetching ${type} distribution:`, err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchDistributionData();
  }, [type]);

  // Chart configuration
  const chartConfig = {
    data,
    xField: 'bucket',
    yField: 'count',
    autoFit: true,
    height: 300,
    columnStyle: {
      radiusTopLeft: 6,
      radiusTopRight: 6,
      fillOpacity: 0.6,
    },
    label: {
      position: 'top' as const,
      style: {
        fill: 'var(--foreground)',
        fontSize: 12,
        fontWeight: 600,
      },
    },
    color: ({ bucket }: { bucket: string }) => {
      // Use different colors based on the bucket for better visual distinction
      const colors = {
        // Profile colors (A-E)
        'A': 'var(--chart-2)', // Green for highest sustainability
        'B': 'var(--chart-1)', // Blue
        'C': 'var(--chart-3)', // Yellow/Orange
        'D': 'var(--chart-4)', // Red
        'E': 'var(--chart-5)', // Purple
        // Appetite colors
        'High': 'var(--chart-2)',
        'Medium': 'var(--chart-3)',
        'Low': 'var(--chart-4)',
        'N/A': 'var(--chart-5)',
      };
      return colors[bucket as keyof typeof colors] || 'var(--chart-1)';
    },
    tooltip: {
      formatter: (datum: DistributionData) => {
        const percentage = totalAssessments > 0 
          ? ((datum.count / totalAssessments) * 100).toFixed(1)
          : '0.0';
        
        return {
          name: type === 'profile' ? 'Profile' : 'Appetite',
          value: `${datum.count} assessments (${percentage}%)`,
        };
      },
      shared: true,
    },
    axis: {
      x: {
        title: {
          text: type === 'profile' 
            ? 'Sustainability Profile' 
            : 'Sustainability Appetite',
          style: {
            fontSize: 12,
            fill: 'var(--muted-foreground)',
          },
        },
        label: {
          style: {
            fill: 'var(--foreground)',
            fontSize: 12,
          },
        },
      },
      y: {
        title: {
          text: 'Number of Assessments',
          style: {
            fontSize: 12,
            fill: 'var(--muted-foreground)',
          },
        },
        label: {
          style: {
            fill: 'var(--foreground)',
            fontSize: 12,
          },
        },
      },
    },
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 1000,
      },
    },
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        {/* Chart Header */}
        <div className="space-y-1">
          <h3 className="text-h4">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {loading 
              ? 'Loading distribution data...'
              : totalAssessments > 0 
                ? `Based on ${totalAssessments} completed assessments`
                : 'No assessment data available'
            }
          </p>
        </div>

        {/* Chart Content */}
        <div className="min-h-[300px] flex items-center justify-center">
          {loading ? (
            <div className="w-full space-y-4">
              <Skeleton className="h-8 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          ) : error ? (
            <Alert className="border-destructive bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                {error}
              </AlertDescription>
            </Alert>
          ) : data.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted/30 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <p className="text-base mb-2">No data available</p>
                <p className="text-sm">
                  {type === 'profile' 
                    ? 'No sustainability profile assessments found'
                    : 'No sustainability appetite assessments found'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <Column {...chartConfig} />
            </div>
          )}
        </div>

        {/* Chart Footer with Summary Stats */}
        {!loading && !error && data.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-base font-semibold">{totalAssessments}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-base font-semibold">{data.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Highest</p>
                <p className="text-base font-semibold">
                  {Math.max(...data.map(d => d.count))}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Average</p>
                <p className="text-base font-semibold">
                  {Math.round(totalAssessments / data.length)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}