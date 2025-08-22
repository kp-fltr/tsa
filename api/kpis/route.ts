import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, requireUser } from '../../lib/supabaseServer'

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/kpis - Starting request')
    
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

    const { data, error } = await supabase
      .from('client_registry')
      .select(`
        id,
        status,
        next_assessment
      `)
      .eq('advisor_id', user.id)

    if (error) {
      console.error('Error fetching KPIs:', error)
      return NextResponse.json(
        { error: 'Failed to fetch KPIs', details: error.message },
        { status: 500 }
      )
    }

    // Calculate KPIs
    const totalClients = data.length
    const updatedCount = data.filter(client => client.status === 'updated').length
    const outstandingCount = data.filter(client => client.status === 'outstanding').length
    const overdueCount = data.filter(client => client.status === 'overdue').length
    
    // Calculate upcoming assessments (next 30 days)
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    const upcoming30d = data.filter(client => {
      if (!client.next_assessment) return false
      const nextAssessment = new Date(client.next_assessment)
      const now = new Date()
      return nextAssessment >= now && nextAssessment <= thirtyDaysFromNow
    }).length

    const kpis = {
      totalClients,
      updatedCount,
      outstandingCount,
      overdueCount,
      upcoming30d
    }

    console.log('KPIs calculated:', kpis)

    return NextResponse.json({ 
      success: true, 
      data: kpis 
    })
  } catch (error) {
    console.error('Error in KPIs endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}