import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Demo data
const DEMO_DATA = {
  user: {
    id: 'demo-user',
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'advisor',
    created_at: new Date().toISOString()
  },
  clients: [
    {
      id: 'demo-client-1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      company: 'Green Tech Solutions',
      industry: 'Technology',
      status: 'Active',
      total_investments: 250000,
      esg_score: 85,
      last_assessment: '2024-01-15',
      created_at: '2023-06-10'
    },
    {
      id: 'demo-client-2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      company: 'Sustainable Energy Corp',
      industry: 'Energy',
      status: 'Active',
      total_investments: 500000,
      esg_score: 92,
      last_assessment: '2024-01-12',
      created_at: '2023-08-22'
    },
    {
      id: 'demo-client-3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      company: 'EcoFriendly Logistics',
      industry: 'Transportation',
      status: 'Pending',
      total_investments: 150000,
      esg_score: 78,
      last_assessment: '2024-01-08',
      created_at: '2023-11-05'
    }
  ],
  analytics: {
    activeTests: 12,
    completionRate: 78,
    avgESGScore: 85,
    totalClients: 3,
    recentActivity: [
      { type: 'assessment_completed', client: 'Sarah Johnson', date: '2024-01-15' },
      { type: 'client_added', client: 'Emily Rodriguez', date: '2024-01-10' },
      { type: 'report_generated', client: 'Michael Chen', date: '2024-01-08' }
    ]
  },
  campaigns: []
};

class ApiService {
  private baseUrl: string;
  private accessToken: string | null = null;
  private isDemoMode: boolean = false;

  constructor() {
    this.baseUrl = `https://${projectId}.supabase.co/functions/v1/server`;
  }

  // Set demo mode
  setDemoMode(enabled: boolean) {
    this.isDemoMode = enabled;
  }

  // Set access token for authenticated requests
  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  // Get current access token
  getAccessToken(): string | null {
    return this.accessToken;
  }

  // Check if in demo mode and return demo data if so
  private getDemoData(endpoint: string): any {
    if (!this.isDemoMode) return null;

    // Simulate network delay
    return new Promise(resolve => {
      setTimeout(() => {
        switch (endpoint) {
          case '/auth/profile':
            resolve({ profile: DEMO_DATA.user });
            break;
          case '/clients':
            resolve({ clients: DEMO_DATA.clients });
            break;
          case '/analytics/dashboard':
            resolve(DEMO_DATA.analytics);
            break;
          case '/campaigns':
            resolve({ campaigns: DEMO_DATA.campaigns });
            break;
          case '/chat/history':
            resolve({ messages: [] });
            break;
          default:
            resolve({ success: true });
        }
      }, 300 + Math.random() * 200); // 300-500ms delay
    });
  }

  // Make authenticated API calls
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    // Return demo data if in demo mode
    const demoData = this.getDemoData(endpoint);
    if (demoData) {
      return await demoData;
    }

    // Add server prefix if not already present
    const prefixedEndpoint = endpoint.startsWith('/make-server-28a049d0') 
      ? endpoint 
      : `/make-server-28a049d0${endpoint}`;
    
    const url = `${this.baseUrl}${prefixedEndpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken || publicAnonKey}`,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
        throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Authentication methods
  async signUp(email: string, password: string, name: string) {
    if (this.isDemoMode) {
      // Simulate successful signup in demo mode
      return new Promise(resolve => {
        setTimeout(() => resolve({ success: true }), 500);
      });
    }

    try {
      const response = await this.makeRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });

      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    if (this.isDemoMode) {
      // Simulate successful sign in for demo mode
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            session: {
              access_token: 'demo-token'
            }
          });
        }, 500);
      });
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.session?.access_token) {
        this.setAccessToken(data.session.access_token);
      }

      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async signOut() {
    if (this.isDemoMode) {
      this.setDemoMode(false);
      return Promise.resolve();
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }

      this.setAccessToken(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  async getCurrentSession() {
    if (this.isDemoMode) {
      return { access_token: 'demo-token' };
    }

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw new Error(error.message);
      }

      if (data.session?.access_token) {
        this.setAccessToken(data.session.access_token);
      }

      return data.session;
    } catch (error) {
      console.error('Get session error:', error);
      throw error;
    }
  }

  async getUserProfile() {
    return this.makeRequest('/auth/profile');
  }

  // Client management
  async getClients() {
    try {
      const response = await this.makeRequest('/clients');
      
      // Ensure response has the expected structure
      if (!response || typeof response !== 'object') {
        console.warn('Invalid response from /clients endpoint:', response);
        return { clients: [] };
      }

      // If response doesn't have clients array, return empty array
      if (!response.clients || !Array.isArray(response.clients)) {
        console.warn('Response missing clients array:', response);
        return { clients: [] };
      }

      return response;
    } catch (error) {
      console.error('Error fetching clients:', error);
      // Return empty clients array on error
      return { clients: [] };
    }
  }

  async createClient(clientData: any) {
    if (this.isDemoMode) {
      // Add to demo data and return success
      const newClient = {
        ...clientData,
        id: `demo-client-${Date.now()}`,
        created_at: new Date().toISOString(),
        status: 'Active',
        esg_score: Math.floor(Math.random() * 30) + 70, // Random score 70-100
      };
      DEMO_DATA.clients.push(newClient);
      return { client: newClient };
    }

    return this.makeRequest('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  }

  async updateClient(clientId: string, updates: any) {
    if (this.isDemoMode) {
      const clientIndex = DEMO_DATA.clients.findIndex(c => c.id === clientId);
      if (clientIndex >= 0) {
        DEMO_DATA.clients[clientIndex] = { ...DEMO_DATA.clients[clientIndex], ...updates };
        return { client: DEMO_DATA.clients[clientIndex] };
      }
      return { success: true };
    }

    return this.makeRequest(`/clients/${clientId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteClient(clientId: string) {
    if (this.isDemoMode) {
      const clientIndex = DEMO_DATA.clients.findIndex(c => c.id === clientId);
      if (clientIndex >= 0) {
        DEMO_DATA.clients.splice(clientIndex, 1);
      }
      return { success: true };
    }

    return this.makeRequest(`/clients/${clientId}`, {
      method: 'DELETE',
    });
  }

  // Alias for consistency
  async removeClient(clientId: number | string) {
    return this.deleteClient(String(clientId));
  }

  // Campaign management
  async getCampaigns() {
    return this.makeRequest('/campaigns');
  }

  async createCampaign(campaignData: any) {
    if (this.isDemoMode) {
      const newCampaign = {
        ...campaignData,
        id: `demo-campaign-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      DEMO_DATA.campaigns.push(newCampaign);
      return { campaign: newCampaign };
    }

    return this.makeRequest('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
  }

  // Analytics
  async getDashboardAnalytics() {
    return this.makeRequest('/analytics/dashboard');
  }

  // AI Chat
  async getChatHistory() {
    return this.makeRequest('/chat/history');
  }

  async saveChatHistory(messages: any[]) {
    if (this.isDemoMode) {
      // Just return success in demo mode
      return { success: true };
    }

    return this.makeRequest('/chat/save', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    });
  }

  // File upload
  async uploadFile(file: File, bucket: string) {
    if (this.isDemoMode) {
      // Simulate file upload success
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            url: `https://demo.example.com/files/${file.name}`,
            fileName: file.name,
            fileSize: file.size
          });
        }, 1000);
      });
    }

    const formData = new FormData();
    formData.append('file', file);

    return this.makeRequest(`/upload/${bucket}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken || publicAnonKey}`,
        // Don't set Content-Type for FormData - let browser set it with boundary
      },
      body: formData,
    });
  }

  // Health check
  async healthCheck() {
    if (this.isDemoMode) {
      return { status: 'healthy', mode: 'demo' };
    }

    try {
      const response = await this.makeRequest('/health');
      return response;
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;