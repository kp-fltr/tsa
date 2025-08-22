import { toast } from 'sonner';

const API_BASE_URL = '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: ApiResponse<T> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || result.message || 'API request failed');
      }

      return result.data as T;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // KPIs API
  async fetchKpis() {
    try {
      return await this.request('/kpis');
    } catch (error) {
      console.error('❌ KPIs API Error:', error);
      toast.error('Failed to load dashboard KPIs');
      throw new Error(`Failed to fetch KPI data: ${error}`);
    }
  }

  // Analytics Distribution API
  async fetchAnalyticsDistribution(type?: string) {
    try {
      const queryParam = type ? `?type=${type}` : '';
      return await this.request(`/analytics/distribution${queryParam}`);
    } catch (error) {
      console.error('❌ Analytics Distribution API Error:', error);
      
      if (type === 'appetite') {
        console.error('❌ Error fetching appetite distribution:', error);
        toast.error('Failed to load appetite distribution data');
      } else if (type === 'profile') {
        console.error('❌ Error fetching profile distribution:', error);
        toast.error('Failed to load profile distribution data');
      } else {
        toast.error('Failed to load analytics distribution data');
      }
      
      throw new Error(`Failed to fetch ${type || 'analytics'} distribution data: ${error}`);
    }
  }

  // Analytics Summary API
  async fetchAnalyticsSummary() {
    try {
      return await this.request('/analytics/summary');
    } catch (error) {
      console.error('❌ Analytics Summary API Error:', error);
      toast.error('Failed to load analytics summary');
      throw error;
    }
  }

  // Recent Reports API
  async fetchRecentReports() {
    try {
      return await this.request('/analytics/reports/recent');
    } catch (error) {
      console.error('❌ Recent Reports API Error:', error);
      toast.error('Failed to load recent reports');
      throw error;
    }
  }

  // Clients API
  async fetchClients() {
    try {
      return await this.request('/clients');
    } catch (error) {
      console.error('❌ Clients API Error:', error);
      toast.error('Failed to load client data');
      throw error;
    }
  }

  async fetchClient(id: string) {
    try {
      return await this.request(`/clients/${id}`);
    } catch (error) {
      console.error(`❌ Client API Error (${id}):`, error);
      toast.error('Failed to load client details');
      throw error;
    }
  }

  // Health Check API
  async healthCheck() {
    try {
      return await this.request('/health');
    } catch (error) {
      console.error('❌ Health Check API Error:', error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;