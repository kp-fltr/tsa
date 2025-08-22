import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, requireUser } from '../../../lib/supabaseServer'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`GET /api/clients/${params.id} - Starting request`)
    
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
    console.log('Fetching client:', params.id)

    const { data: client, error } = await supabase
      .from('client_registry')
      .select('*')
      .eq('id', params.id)
      .eq('advisor_id', user.id)
      .single()

    if (error) {
      console.error('Error fetching client:', error)
      return NextResponse.json(
        { error: 'Failed to fetch client', details: error.message },
        { status: 500 }
      )
    }

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found or access denied' },
        { status: 404 }
      )
    }

    console.log('Client found:', client.id)

    return NextResponse.json({
      success: true,
      data: client,
    })

  } catch (error) {
    console.error('Get client API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`PUT /api/clients/${params.id} - Starting request`)
    
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
    console.log('Updating client:', params.id, 'with data:', Object.keys(body))

    // Validate email format if provided
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        )
      }
    }

    const { data: client, error } = await supabase
      .from('client_registry')
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .eq('advisor_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating client:', error)
      
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: 'A client with this email already exists' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to update client', details: error.message },
        { status: 500 }
      )
    }

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found or access denied' },
        { status: 404 }
      )
    }

    console.log('Client updated successfully:', client.id)

    return NextResponse.json({
      success: true,
      data: client,
    })

  } catch (error) {
    console.error('Update client API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`DELETE /api/clients/${params.id} - Starting request`)
    
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

    console.log('Deleting client:', params.id)

    const { data: client, error } = await supabase
      .from('client_registry')
      .delete()
      .eq('id', params.id)
      .eq('advisor_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error deleting client:', error)
      return NextResponse.json(
        { error: 'Failed to delete client', details: error.message },
        { status: 500 }
      )
    }

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found or access denied' },
        { status: 404 }
      )
    }

    console.log('Client deleted successfully:', client.id)

    return NextResponse.json({
      success: true,
      message: 'Client deleted successfully'
    })

  } catch (error) {
    console.error('Delete client API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}