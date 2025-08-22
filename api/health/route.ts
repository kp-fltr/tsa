import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, requireUser } from '../../lib/supabaseServer'

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/health - Starting health check')
    
    // Create server Supabase client
    const supabase = createServerSupabaseClient()
    
    // Check authentication (optional for health check)
    const { user, error: authError } = await requireUser(supabase)
    
    const healthData: any = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'TSA Advisor API',
      version: '1.0.0',
      checks: {
        database: { status: 'unknown' },
        auth: { status: 'unknown' },
        clientRegistry: { status: 'unknown' }
      }
    }

    // Test database connection
    try {
      const { data, error } = await supabase
        .from('client_registry')
        .select('count(*)', { count: 'exact', head: true })
        .limit(1)

      if (error) {
        console.error('Database health check failed:', error)
        healthData.checks.database = { 
          status: 'unhealthy', 
          error: error.message 
        }
        healthData.status = 'degraded'
      } else {
        healthData.checks.database = { 
          status: 'healthy',
          totalRecords: data.length 
        }
      }
    } catch (error) {
      console.error('Database connection failed:', error)
      healthData.checks.database = { 
        status: 'unhealthy', 
        error: error instanceof Error ? error.message : 'Connection failed' 
      }
      healthData.status = 'unhealthy'
    }

    // Test authentication
    if (authError) {
      healthData.checks.auth = { 
        status: 'unauthenticated', 
        message: 'No valid session' 
      }
    } else if (user) {
      healthData.checks.auth = { 
        status: 'authenticated', 
        userId: user.id 
      }

      // Test client registry access for authenticated user
      try {
        const { data, error } = await supabase
          .from('client_registry')
          .select('count(*)', { count: 'exact' })
          .eq('advisor_id', user.id)

        if (error) {
          healthData.checks.clientRegistry = { 
            status: 'unhealthy', 
            error: error.message 
          }
          healthData.status = 'degraded'
        } else {
          healthData.checks.clientRegistry = { 
            status: 'healthy',
            userClients: data.length 
          }
        }
      } catch (error) {
        healthData.checks.clientRegistry = { 
          status: 'unhealthy', 
          error: error instanceof Error ? error.message : 'Query failed' 
        }
        healthData.status = 'degraded'
      }
    } else {
      healthData.checks.auth = { 
        status: 'no_session', 
        message: 'No user session found' 
      }
    }

    const statusCode = healthData.status === 'unhealthy' ? 503 : 200
    
    console.log('Health check completed:', healthData.status)
    
    return NextResponse.json(healthData, { status: statusCode })

  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'TSA Advisor API',
      error: 'Health check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 })
  }
}