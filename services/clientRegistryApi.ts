import { toast } from 'sonner'
import { api } from '../lib/apiClient'
import { demoModeService, shouldUseDemoMode } from './demoModeService'

// Types for the client registry
export interface ClientRegistryData {
  id?: string
  advisor_id?: string
  name: string
  email: string
  status: 'updated' | 'outstanding' | 'overdue'
  sustainability_appetite?: 'High' | 'Medium' | 'Low' | 'N/A' | null
  sustainability_profile?: 'A' | 'B' | 'C' | 'D' | null
  latest_assessment?: string | null
  next_assessment?: string | null
  notes?: string
  tags?: string[]
  created_at?: string
  updated_at?: string
}

export interface ClientKPIs {
  totalClients: number
  updatedCount: number
  outstandingCount: number
  overdueCount: number
  upcoming30d: number
}

export interface ClientsResponse {
  data: ClientRegistryData[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface ClientFilters {
  q?: string
  status?: string
  sortBy?: string
  desc?: boolean
  page?: number
  pageSize?: number
}

// Fetch KPIs for the authenticated advisor
export async function fetchKpis(): Promise<ClientKPIs> {
  // Use demo mode service if demo mode is active
  if (shouldUseDemoMode()) {
    return demoModeService.fetchKpis()
  }

  try {
    const response = await api.get<{ success: boolean; data: ClientKPIs }>('/api/kpis')
    
    if (!response.success) {
      throw new Error('Failed to fetch KPIs')
    }
    
    return response.data
  } catch (error) {
    console.error('API Error for /api/kpis:', error)
    
    // If this is a network error and demo mode is available, enable it
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      console.log('Network fetch failed, checking demo mode availability...')
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo-mode', 'true')
        // Try demo mode as fallback
        try {
          return demoModeService.fetchKpis()
        } catch (demoError) {
          console.error('Demo mode also failed:', demoError)
        }
      }
    }
    
    toast.error('Failed to load dashboard metrics')
    
    // Return default KPIs on error
    return {
      totalClients: 0,
      updatedCount: 0,
      outstandingCount: 0,
      overdueCount: 0,
      upcoming30d: 0
    }
  }
}

// Fetch clients with filtering, sorting, and pagination
export async function fetchClients({
  q = '',
  status = 'all',
  sortBy = 'latest_assessment',
  desc = true,
  page = 1,
  pageSize = 20
}: ClientFilters = {}): Promise<ClientsResponse> {
  // Use demo mode service if demo mode is active
  if (shouldUseDemoMode()) {
    return demoModeService.fetchClients({ q, status, sortBy, desc, page, pageSize })
  }

  try {
    const params = {
      ...(q && { q }),
      ...(status !== 'all' && { status }),
      sortBy,
      desc: desc.toString(),
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    const response = await api.get<{
      success: boolean
      data: ClientRegistryData[]
      pagination: ClientsResponse['pagination']
    }>('/api/clients', params)

    if (!response.success) {
      throw new Error('Failed to fetch clients')
    }

    return {
      data: response.data,
      pagination: response.pagination
    }
  } catch (error) {
    console.error('API Error for /api/clients:', error)
    
    // If this is a network error and demo mode is available, enable it
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      console.log('Network fetch failed, enabling demo mode and retrying...')
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo-mode', 'true')
        // Try demo mode as fallback
        try {
          return demoModeService.fetchClients({ q, status, sortBy, desc, page, pageSize })
        } catch (demoError) {
          console.error('Demo mode also failed:', demoError)
        }
      }
    }
    
    toast.error('Failed to load clients')
    
    // Return empty result on error
    return {
      data: [],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
        totalPages: 0
      }
    }
  }
}

// Create a new client
export async function createClient(payload: Omit<ClientRegistryData, 'id' | 'advisor_id' | 'created_at' | 'updated_at'>): Promise<ClientRegistryData | null> {
  // Use demo mode service if demo mode is active
  if (shouldUseDemoMode()) {
    try {
      return await demoModeService.createClient(payload)
    } catch (error) {
      console.error('Demo mode error creating client:', error)
      toast.error('Demo mode: Failed to create client')
      return null
    }
  }

  try {
    const response = await api.post<{
      success: boolean
      data: ClientRegistryData
    }>('/api/clients', payload)

    if (!response.success) {
      throw new Error('Failed to create client')
    }

    toast.success(`Client ${payload.name} created successfully`)
    return response.data
  } catch (error) {
    console.error('Error creating client:', error)
    
    let message = 'Failed to create client'
    if (error instanceof Error) {
      message = error.message
    }
    
    toast.error(message)
    return null
  }
}

// Update a client
export async function updateClient(id: string, patch: Partial<ClientRegistryData>): Promise<ClientRegistryData | null> {
  // Use demo mode service if demo mode is active
  if (shouldUseDemoMode()) {
    try {
      return await demoModeService.updateClient(id, patch)
    } catch (error) {
      console.error('Demo mode error updating client:', error)
      toast.error('Demo mode: Failed to update client')
      return null
    }
  }

  try {
    const response = await api.put<{
      success: boolean
      data: ClientRegistryData
    }>(`/api/clients/${id}`, patch)

    if (!response.success) {
      throw new Error('Failed to update client')
    }

    toast.success('Client updated successfully')
    return response.data
  } catch (error) {
    console.error('Error updating client:', error)
    
    let message = 'Failed to update client'
    if (error instanceof Error) {
      message = error.message
    }
    
    toast.error(message)
    return null
  }
}

// Delete a client
export async function deleteClient(id: string): Promise<boolean> {
  // Use demo mode service if demo mode is active
  if (shouldUseDemoMode()) {
    try {
      return await demoModeService.deleteClient(id)
    } catch (error) {
      console.error('Demo mode error deleting client:', error)
      toast.error('Demo mode: Failed to delete client')
      return false
    }
  }

  try {
    const response = await api.delete<{
      success: boolean
      message?: string
    }>(`/api/clients/${id}`)

    if (!response.success) {
      throw new Error('Failed to delete client')
    }

    toast.success('Client deleted successfully')
    return true
  } catch (error) {
    console.error('Error deleting client:', error)
    
    let message = 'Failed to delete client'
    if (error instanceof Error) {
      message = error.message
    }
    
    toast.error(message)
    return false
  }
}

// Get a single client by ID
export async function getClient(id: string): Promise<ClientRegistryData | null> {
  // Use demo mode service if demo mode is active
  if (shouldUseDemoMode()) {
    try {
      return await demoModeService.getClient(id)
    } catch (error) {
      console.error('Demo mode error fetching client:', error)
      toast.error('Demo mode: Failed to load client details')
      return null
    }
  }

  try {
    const response = await api.get<{
      success: boolean
      data: ClientRegistryData
    }>(`/api/clients/${id}`)
    
    if (!response.success) {
      throw new Error('Failed to fetch client')
    }
    
    return response.data
  } catch (error) {
    console.error('Error fetching client:', error)
    toast.error('Failed to load client details')
    return null
  }
}

// Data validation helpers
export function validateClientData(data: Partial<ClientRegistryData>): string[] {
  const errors: string[] = []
  
  if (data.name && data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }
  
  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format')
    }
  }
  
  if (data.status && !['updated', 'outstanding', 'overdue'].includes(data.status)) {
    errors.push('Invalid status value')
  }
  
  if (data.sustainability_appetite && !['High', 'Medium', 'Low', 'N/A'].includes(data.sustainability_appetite)) {
    errors.push('Invalid sustainability appetite value')
  }
  
  if (data.sustainability_profile && !['A', 'B', 'C', 'D'].includes(data.sustainability_profile)) {
    errors.push('Invalid sustainability profile value')
  }
  
  return errors
}

// Cache management for performance
class ClientRegistryCache {
  private kpis: ClientKPIs | null = null
  private kpisTimestamp: number = 0
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  async getKpis(): Promise<ClientKPIs> {
    const now = Date.now()
    if (this.kpis && (now - this.kpisTimestamp) < this.CACHE_TTL) {
      return this.kpis
    }
    
    this.kpis = await fetchKpis()
    this.kpisTimestamp = now
    return this.kpis
  }

  invalidateKpis(): void {
    this.kpis = null
    this.kpisTimestamp = 0
  }
}

export const clientCache = new ClientRegistryCache()

// Health check function
export async function checkHealth(): Promise<any> {
  // Use demo mode service if demo mode is active
  if (shouldUseDemoMode()) {
    return demoModeService.checkHealth()
  }

  try {
    return await api.get('/api/health')
  } catch (error) {
    console.error('Health check failed:', error)
    return { status: 'unhealthy', error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Default export with all functions
export default {
  fetchKpis,
  fetchClients,
  createClient,
  updateClient,
  deleteClient,
  getClient,
  validateClientData,
  clientCache,
  checkHealth
}