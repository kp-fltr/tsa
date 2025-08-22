import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, requireUser } from '../../../lib/supabaseServer'

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/analytics/summary - Starting request')
    
    // Create server Supabase client
    const supabase = createServerSupabaseClient()
    
    // Require authentication
    const { user, error: authError } = await requireUser(supabase)
    
    if (authError || !user) {
      console.error('Authentication failed:', authError)
      return NextResponse.json(
        { error: authError || 'Authentication required' },
        { status: 401 }
      )
    }

    console.log('Authenticated user:', user.id)

    // Parse query parameters for date filtering
    const { searchParams } = new URL(request.url)
    const fromParam = searchParams.get('from')
    const toParam = searchParams.get('to')

    // Calculate date range
    let fromDate: Date
    let toDate = new Date() // Default to now

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

    console.log('Date range:', { from: fromDate.toISOString(), to: toDate.toISOString() })

    // Fetch assessments data for the date range
    const { data: assessments, error: assessmentsError } = await supabase
      .from('assessments')
      .select('*')
      .eq('advisor_id', user.id)
      .gte('requested_at', fromDate.toISOString())
      .lte('requested_at', toDate.toISOString())

    if (assessmentsError) {
      console.error('Error fetching assessments:', assessmentsError)
      return NextResponse.json(
        { error: 'Failed to fetch assessments data', details: assessmentsError.message },
        { status: 500 }
      )
    }

    // Fetch quota information
    const { data: quotaData, error: quotaError } = await supabase
      .from('vw_fa_quota')
      .select('*')
      .eq('advisor_id', user.id)
      .single()

    if (quotaError && quotaError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching quota data:', quotaError)
      // Don't fail the request if quota data is missing, just log it
    }

    // Calculate summary metrics
    const testsRequested = assessments?.length || 0
    const reportsProduced = assessments?.filter(a => a.status === 'completed').length || 0
    const testAllowanceRemaining = quotaData?.remaining ?? 0

    const summary = {
      testsRequested,
      reportsProduced,
      testAllowanceRemaining,
      quotaStatus: quotaData?.status || 'Unknown',
      periodStart: quotaData?.period_start || null,
      periodEnd: quotaData?.period_end || null,
      totalAllowance: quotaData?.allowance || 0,
      usedAllowance: quotaData?.used || 0
    }

    console.log('Analytics summary calculated:', summary)

    return NextResponse.json({
      success: true,
      data: summary,
      dateRange: {
        from: fromDate.toISOString(),
        to: toDate.toISOString()
      }
    })

  } catch (error) {
    console.error('Analytics summary API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}