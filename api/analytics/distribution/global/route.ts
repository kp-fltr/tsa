import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, createServerSupabaseAdminClient, requireUser } from '../../../../lib/supabaseServer'

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/analytics/distribution/global - Starting request')
    
    // Create regular server Supabase client for auth check
    const supabase = createServerSupabaseClient()
    
    // Require authentication (user must be logged in to see global data)
    const { user, error: authError } = await requireUser(supabase)
    
    if (authError || !user) {
      console.error('Authentication failed:', authError)
      return NextResponse.json(
        { error: authError || 'Authentication required' },
        { status: 401 }
      )
    }

    console.log('Authenticated user:', user.id)

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const dimension = searchParams.get('dim') // 'profile' or 'appetite'
    const fromParam = searchParams.get('from')
    const toParam = searchParams.get('to')

    // Validate dimension parameter
    if (!dimension || !['profile', 'appetite'].includes(dimension)) {
      return NextResponse.json(
        { error: 'Invalid dimension parameter. Must be "profile" or "appetite"' },
        { status: 400 }
      )
    }

    // Calculate date range
    let fromDate: Date
    let toDate = new Date()

    if (fromParam) {
      fromDate = new Date(fromParam)
    } else {
      // Default to last 30 days
      fromDate = new Date()
      fromDate.setDate(fromDate.getDate() - 30)
    }

    if (toParam) {
      toDate = new Date(toParam)
    }

    console.log('Fetching global distribution:', { dimension, from: fromDate.toISOString(), to: toDate.toISOString() })

    // Create admin client to bypass RLS for aggregated data
    const adminSupabase = createServerSupabaseAdminClient()

    // Fetch global aggregated data (no PII, just counts)
    let query = adminSupabase
      .from('assessments')
      .select('profile, appetite, completed_at')
      .eq('status', 'completed') // Only completed assessments
      .gte('completed_at', fromDate.toISOString())
      .lte('completed_at', toDate.toISOString())

    const { data: assessments, error } = await query

    if (error) {
      console.error('Error fetching global distribution data:', error)
      return NextResponse.json(
        { error: 'Failed to fetch global distribution data', details: error.message },
        { status: 500 }
      )
    }

    // Process data based on dimension (same logic as FA but across all advisors)
    let distributionData: { bucket: string; count: number }[] = []

    if (dimension === 'profile') {
      const profileCounts = new Map<string, number>()
      
      // Initialize with all possible profiles
      const allProfiles = ['A', 'B', 'C', 'D', 'E']
      allProfiles.forEach(profile => {
        profileCounts.set(profile, 0)
      })
      
      // Count actual data
      assessments?.forEach(assessment => {
        const profile = assessment.profile || 'Unknown'
        profileCounts.set(profile, (profileCounts.get(profile) || 0) + 1)
      })
      
      distributionData = Array.from(profileCounts.entries()).map(([bucket, count]) => ({
        bucket,
        count
      }))
    } else if (dimension === 'appetite') {
      const appetiteCounts = new Map<string, number>()
      
      // Initialize with all possible appetites in desired order
      const allAppetites = ['High', 'Medium', 'Low', 'N/A']
      allAppetites.forEach(appetite => {
        appetiteCounts.set(appetite, 0)
      })
      
      // Count actual data
      assessments?.forEach(assessment => {
        const appetite = assessment.appetite || 'N/A'
        appetiteCounts.set(appetite, (appetiteCounts.get(appetite) || 0) + 1)
      })
      
      distributionData = Array.from(appetiteCounts.entries()).map(([bucket, count]) => ({
        bucket,
        count
      }))
    }

    console.log(`Global ${dimension} distribution:`, distributionData)

    return NextResponse.json({
      success: true,
      data: distributionData,
      dimension,
      scope: 'global',
      dateRange: {
        from: fromDate.toISOString(),
        to: toDate.toISOString()
      },
      totalAssessments: assessments?.length || 0,
      note: 'Aggregated data across all advisors (no PII)'
    })

  } catch (error) {
    console.error('Global distribution API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}