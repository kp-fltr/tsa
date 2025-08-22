import { NextRequest, NextResponse } from 'next/server';
import { unifiedClients } from '../../../../data/unifiedClientRegistry';

interface RouteContext {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = params;
    
    console.log('📊 Get client request:', id);

    // Find client by ID
    const client = unifiedClients.find(c => c.id === id);

    if (!client) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Client not found' 
        },
        { status: 404 }
      );
    }

    console.log('✅ Client found:', client);
    return NextResponse.json({
      success: true,
      data: client,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Get client error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch client',
        details: error?.message ?? 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = params;
    const updates = await request.json();
    
    console.log('📊 Update client request:', { id, updates });

    // Find client by ID
    const client = unifiedClients.find(c => c.id === id);

    if (!client) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Client not found' 
        },
        { status: 404 }
      );
    }

    // Update client (simulated)
    const updatedClient = {
      ...client,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    console.log('✅ Client updated:', updatedClient);
    return NextResponse.json({
      success: true,
      data: updatedClient,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Update client error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update client',
        details: error?.message ?? 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = params;
    
    console.log('📊 Delete client request:', id);

    // Find client by ID
    const client = unifiedClients.find(c => c.id === id);

    if (!client) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Client not found' 
        },
        { status: 404 }
      );
    }

    // Delete client (simulated)
    console.log('✅ Client deleted:', id);
    return NextResponse.json({
      success: true,
      message: 'Client deleted successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Delete client error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete client',
        details: error?.message ?? 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}