import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, requireUser } from '../../lib/supabaseServer'

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/clients - Starting request')
    
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
    const q = searchParams.get('q') || ''
    const status = searchParams.get('status') || 'all'
    const sortBy = searchParams.get('sortBy') || 'latest_assessment'
    const desc = searchParams.get('desc') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    console.log('Query params:', { q, status, sortBy, desc, page, pageSize })

    // Build query
    let query = supabase
      .from('client_registry')
      .select('*', { count: 'exact' })
      .eq('advisor_id', user.id)

    // Apply search filter
    if (q) {
      query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`)
    }

    // Apply status filter
    if (status !== 'all') {
      const statusArray = status.split(',')
      query = query.in('status', statusArray)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: !desc })

    // Apply pagination
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    const { data: clients, error: queryError, count } = await query

    if (queryError) {
      console.error('Database query error:', queryError)
      return NextResponse.json(
        { error: 'Failed to fetch clients', details: queryError.message },
        { status: 500 }
      )
    }

    console.log(`Found ${clients?.length || 0} clients (total: ${count})`)

    return NextResponse.json({
      success: true,
      data: clients || [],
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
      },
    })

  } catch (error) {
    console.error('Clients API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/clients - Starting request')
    
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

    // Parse request body
    const body = await request.json()
    console.log('Creating client:', { name: body.name, email: body.email })
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Prepare client data
    const clientData = {
      advisor_id: user.id,
      name: body.name,
      email: body.email,
      status: body.status || 'outstanding',
      sustainability_appetite: body.sustainability_appetite || null,
      sustainability_profile: body.sustainability_profile || null,
      latest_assessment: body.latest_assessment || null,
      next_assessment: body.next_assessment || null,
      notes: body.notes || '',
      tags: body.tags || [],
    }

    // Insert client
    const { data: client, error: insertError } = await supabase
      .from('client_registry')
      .insert(clientData)
      .select()
      .single()

    if (insertError) {
      console.error('Database insert error:', insertError)
      
      if (insertError.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: 'A client with this email already exists' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to create client', details: insertError.message },
        { status: 500 }
      )
    }

    console.log('Client created successfully:', client.id)

    return NextResponse.json({
      success: true,
      data: client,
    })

  } catch (error) {
    console.error('Create client API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}