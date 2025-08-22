import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, requireUser } from '../../../../lib/supabaseServer'

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/analytics/reports/recent - Starting request')
    
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

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '5')
    const query = searchParams.get('query') || ''

    console.log('Query params:', { limit, query })

    // Build the main query for reports with client and assessment data
    let reportsQuery = supabase
      .from('reports')
      .select(`
        id,
        generated_at,
        storage_path,
        format,
        file_size_bytes,
        client_id,
        assessment_id,
        client_registry!inner(
          id,
          name,
          email
        ),
        assessments!inner(
          id,
          profile,
          appetite,
          completed_at
        )
      `)
      .eq('advisor_id', user.id)
      .order('generated_at', { ascending: false })
      .limit(Math.min(limit, 50)) // Cap at 50 for performance

    // Add search filter if query is provided
    if (query.trim()) {
      // Search by client name or email (case-insensitive)
      reportsQuery = reportsQuery.or(
        `client_registry.name.ilike.%${query}%,client_registry.email.ilike.%${query}%`,
        { foreignTable: 'client_registry' }
      )
    }

    const { data: reports, error: reportsError } = await reportsQuery

    if (reportsError) {
      console.error('Error fetching reports:', reportsError)
      return NextResponse.json(
        { error: 'Failed to fetch reports', details: reportsError.message },
        { status: 500 }
      )
    }

    // Transform the data and generate signed URLs
    const reportsWithSignedUrls = await Promise.all(
      (reports || []).map(async (report) => {
        let signedUrl = null
        
        try {
          // Generate signed URL for file download (expires in 10 minutes)
          const { data: urlData, error: urlError } = await supabase.storage
            .from('reports') // Assuming reports are stored in a 'reports' bucket
            .createSignedUrl(report.storage_path, 600) // 10 minutes

          if (urlError) {
            console.warn(`Failed to create signed URL for report ${report.id}:`, urlError)
          } else {
            signedUrl = urlData.signedUrl
          }
        } catch (urlError) {
          console.warn(`Error creating signed URL for report ${report.id}:`, urlError)
        }

        return {
          id: report.id,
          clientName: report.client_registry?.name || 'Unknown Client',
          clientEmail: report.client_registry?.email || '',
          profile: report.assessments?.profile || 'Unknown',
          appetite: report.assessments?.appetite || 'N/A',
          generatedAt: report.generated_at,
          completedAt: report.assessments?.completed_at || null,
          format: report.format,
          fileSizeBytes: report.file_size_bytes,
          signedUrl,
          storagePath: report.storage_path
        }
      })
    )

    console.log(`Found ${reportsWithSignedUrls.length} recent reports`)

    return NextResponse.json({
      success: true,
      data: reportsWithSignedUrls,
      pagination: {
        limit,
        returned: reportsWithSignedUrls.length,
        hasMore: reportsWithSignedUrls.length === limit
      },
      query: query || null
    })

  } catch (error) {
    console.error('Recent reports API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}