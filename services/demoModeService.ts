import { client_registry, getClientById, ClientRegistryEntry } from '../data/client_registry';
import { ClientRegistryData, ClientKPIs, ClientsResponse, ClientFilters } from './clientRegistryApi';
import { toast } from 'sonner@2.0.3';

// Demo mode service to provide mock data when authentication is bypassed
class DemoModeService {
  private isDemoMode(): boolean {
    // Use the same logic as shouldUseDemoMode for consistency
    return shouldUseDemoMode();
  }

  // Convert ClientRegistryEntry to ClientRegistryData format
  private convertToApiFormat(entry: ClientRegistryEntry): ClientRegistryData {
    return {
      id: entry.id.toString(),
      advisor_id: 'demo-advisor',
      name: entry.name,
      email: entry.email,
      status: entry.sustainability_assessment_status.toLowerCase() as 'updated' | 'outstanding' | 'overdue',
      sustainability_appetite: entry.sustainability_appetite_rating,
      sustainability_profile: entry.sustainability_profile,
      latest_assessment: entry.latest_assessment_date,
      next_assessment: entry.next_assessment_date,
      notes: '',
      tags: [],
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    };
  }

  // Mock KPIs fetch
  async fetchKpis(): Promise<ClientKPIs> {
    if (!this.isDemoMode()) {
      throw new Error('Demo mode service called outside of demo mode');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Calculate KPIs from client_registry
    const total = client_registry.length;
    const updated = client_registry.filter(c => c.sustainability_assessment_status === 'Updated').length;
    const outstanding = client_registry.filter(c => c.sustainability_assessment_status === 'Outstanding').length;
    const overdue = client_registry.filter(c => c.sustainability_assessment_status === 'Overdue').length;

    // Calculate upcoming assessments in next 30 days
    const now = new Date();
    const next30Days = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    const upcoming30d = client_registry.filter(c => {
      const nextAssessment = new Date(c.next_assessment_date);
      return nextAssessment >= now && nextAssessment <= next30Days;
    }).length;

    return {
      totalClients: total,
      updatedCount: updated,
      outstandingCount: outstanding,
      overdueCount: overdue,
      upcoming30d: upcoming30d
    };
  }

  // Mock clients fetch with filtering and pagination
  async fetchClients({
    q = '',
    status = 'all',
    sortBy = 'latest_assessment',
    desc = true,
    page = 1,
    pageSize = 20
  }: ClientFilters = {}): Promise<ClientsResponse> {
    if (!this.isDemoMode()) {
      throw new Error('Demo mode service called outside of demo mode');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    let filteredClients = [...client_registry];

    // Apply search filter
    if (q) {
      const searchTerm = q.toLowerCase();
      filteredClients = filteredClients.filter(client =>
        client.name.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (status !== 'all') {
      const statusFilter = status.charAt(0).toUpperCase() + status.slice(1); // Convert to title case
      filteredClients = filteredClients.filter(client => 
        client.sustainability_assessment_status === statusFilter
      );
    }

    // Apply sorting
    filteredClients.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'status':
          aValue = a.sustainability_assessment_status;
          bValue = b.sustainability_assessment_status;
          break;
        case 'latest_assessment':
          aValue = new Date(a.latest_assessment_date).getTime();
          bValue = new Date(b.latest_assessment_date).getTime();
          break;
        case 'next_assessment':
          aValue = new Date(a.next_assessment_date).getTime();
          bValue = new Date(b.next_assessment_date).getTime();
          break;
        case 'sustainability_profile':
          aValue = a.sustainability_profile;
          bValue = b.sustainability_profile;
          break;
        default:
          aValue = a.latest_assessment_date;
          bValue = b.latest_assessment_date;
      }

      if (aValue < bValue) return desc ? 1 : -1;
      if (aValue > bValue) return desc ? -1 : 1;
      return 0;
    });

    // Apply pagination
    const total = filteredClients.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedClients = filteredClients.slice(startIndex, endIndex);

    // Convert to API format
    const apiFormatClients = paginatedClients.map(client => this.convertToApiFormat(client));

    return {
      data: apiFormatClients,
      pagination: {
        page,
        pageSize,
        total,
        totalPages
      }
    };
  }

  // Mock client creation
  async createClient(payload: Omit<ClientRegistryData, 'id' | 'advisor_id' | 'created_at' | 'updated_at'>): Promise<ClientRegistryData> {
    if (!this.isDemoMode()) {
      throw new Error('Demo mode service called outside of demo mode');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create new client with generated ID and timestamps
    const newClient: ClientRegistryData = {
      ...payload,
      id: `demo-client-${Date.now()}`,
      advisor_id: 'demo-user-id',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    toast.success(`Demo: Client ${payload.name} created successfully`);
    return newClient;
  }

  // Mock client update
  async updateClient(id: string, patch: Partial<ClientRegistryData>): Promise<ClientRegistryData> {
    if (!this.isDemoMode()) {
      throw new Error('Demo mode service called outside of demo mode');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    // Find client in client_registry
    const clientId = parseInt(id);
    const clientEntry = getClientById(clientId);
    
    if (!clientEntry) {
      throw new Error('Client not found');
    }

    // For demo purposes, return the updated client in API format
    const updatedClient: ClientRegistryData = {
      ...this.convertToApiFormat(clientEntry),
      ...patch,
      updated_at: new Date().toISOString()
    };

    toast.success('Demo: Client updated successfully');
    return updatedClient;
  }

  // Mock client deletion
  async deleteClient(id: string): Promise<boolean> {
    if (!this.isDemoMode()) {
      throw new Error('Demo mode service called outside of demo mode');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Find client in client_registry
    const clientId = parseInt(id);
    const clientEntry = getClientById(clientId);
    
    if (!clientEntry) {
      throw new Error('Client not found');
    }

    toast.success('Demo: Client deleted successfully (demo mode - not actually deleted)');
    return true;
  }

  // Mock get single client
  async getClient(id: string): Promise<ClientRegistryData> {
    if (!this.isDemoMode()) {
      throw new Error('Demo mode service called outside of demo mode');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // Find client in client_registry
    const clientId = parseInt(id);
    const clientEntry = getClientById(clientId);
    
    if (!clientEntry) {
      throw new Error('Client not found');
    }

    return this.convertToApiFormat(clientEntry);
  }

  // Enable demo mode
  enableDemoMode(): void {
    localStorage.setItem('demo-mode', 'true');
  }

  // Auto-enable demo mode if conditions are met
  autoEnableDemoModeIfNeeded(): void {
    if (shouldUseDemoMode() && localStorage.getItem('demo-mode') !== 'true') {
      localStorage.setItem('demo-mode', 'true');
    }
  }

  // Disable demo mode
  disableDemoMode(): void {
    localStorage.removeItem('demo-mode');
  }

  // Health check for demo mode
  async checkHealth(): Promise<any> {
    return {
      status: 'healthy',
      mode: 'demo',
      clients: client_registry.length,
      message: 'Demo mode service is operational'
    };
  }
}

// Export singleton instance
export const demoModeService = new DemoModeService();

// Helper function to determine if we should use demo mode
export function shouldUseDemoMode(): boolean {
  // Always use demo mode in Figma Make environment or when localStorage flag is set
  // This ensures the app works even when API endpoints are not available
  if (typeof window === 'undefined') return false; // Server-side
  
  return localStorage.getItem('demo-mode') === 'true' || 
         !window.location.origin.includes('localhost') ||
         process.env.NODE_ENV === 'development';
}