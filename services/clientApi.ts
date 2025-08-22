import { supabase } from '../lib/supabaseClient';
import { toast } from 'sonner';
import clientRegistryApi, { 
  ClientRegistryData, 
  getClient, 
  updateClient as registryUpdateClient 
} from './clientRegistryApi';

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  assessmentStatus: 'Updated' | 'Outstanding' | 'Overdue';
  sustainabilityAppetite: 'High' | 'Medium' | 'Low' | 'N/A';
  sustainabilityProfile: 'A' | 'B' | 'C' | 'D' | 'E';
  latestAssessmentDate: string;
  nextAssessmentDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLogEntry {
  id: string;
  clientId: string;
  action: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export interface UpdateClientData {
  name?: string;
  email?: string;
  assessmentStatus?: ClientProfile['assessmentStatus'];
  sustainabilityAppetite?: ClientProfile['sustainabilityAppetite'];
  sustainabilityProfile?: ClientProfile['sustainabilityProfile'];
  latestAssessmentDate?: string;
  nextAssessmentDate?: string;
  notes?: string;
}

class ClientApiService {
  private supabase = supabase;

  async getClientProfile(clientId: string): Promise<ClientProfile | null> {
    try {
      // Get client data from the new registry API
      const registryData = await getClient(clientId);
      
      if (!registryData) {
        return null;
      }

      // Convert registry data to the expected ClientProfile format
      return this.convertRegistryToProfile(registryData);
    } catch (error) {
      console.error('Error fetching client profile:', error);
      toast.error('Failed to load client profile');
      return null;
    }
  }

  async getClientActivity(clientId: string): Promise<ActivityLogEntry[]> {
    try {
      // Mock activity data based on the client
      const mockActivity: ActivityLogEntry[] = [
        {
          id: '1',
          clientId,
          action: 'Assessment Updated',
          description: 'Sustainability assessment completed and profile updated',
          createdAt: '2024-12-15T14:30:00Z',
          createdBy: 'System'
        },
        {
          id: '2',
          clientId,
          action: 'Email Sent',
          description: 'Quarterly sustainability report sent to client',
          createdAt: '2024-12-10T09:15:00Z',
          createdBy: 'John Smith'
        },
        {
          id: '3',
          clientId,
          action: 'Profile Created',
          description: 'Client profile created and initial assessment scheduled',
          createdAt: '2024-01-15T10:00:00Z',
          createdBy: 'Jane Doe'
        }
      ];

      return mockActivity;
    } catch (error) {
      console.error('Error fetching client activity:', error);
      return [];
    }
  }

  async updateClientProfile(clientId: string, updates: UpdateClientData): Promise<boolean> {
    try {
      // Convert profile format to registry format
      const registryUpdates = this.convertProfileToRegistry(updates);
      
      // Update using the registry API
      const result = await registryUpdateClient(clientId, registryUpdates);
      
      if (result) {
        // Log the update activity
        await this.logActivity(clientId, 'Profile Updated', 'Client profile information updated');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error updating client profile:', error);
      toast.error('Failed to update client profile');
      return false;
    }
  }

  private async logActivity(clientId: string, action: string, description: string): Promise<void> {
    try {
      console.log('Activity logged:', { clientId, action, description });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }

  async deleteClient(clientId: string): Promise<boolean> {
    try {
      return await clientRegistryApi.deleteClient(clientId);
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Failed to remove client');
      return false;
    }
  }

  // Helper method to convert registry data to profile format
  private convertRegistryToProfile(data: ClientRegistryData): ClientProfile {
    return {
      id: data.id!,
      name: data.name,
      email: data.email,
      assessmentStatus: this.mapStatus(data.status),
      sustainabilityAppetite: data.sustainability_appetite || 'N/A',
      sustainabilityProfile: data.sustainability_profile || 'A',
      latestAssessmentDate: data.latest_assessment || '',
      nextAssessmentDate: data.next_assessment || '',
      notes: data.notes || '',
      createdAt: data.created_at || '',
      updatedAt: data.updated_at || ''
    };
  }

  // Helper method to convert profile format to registry format  
  private convertProfileToRegistry(data: UpdateClientData): Partial<ClientRegistryData> {
    return {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.assessmentStatus && { status: this.mapStatusReverse(data.assessmentStatus) }),
      ...(data.sustainabilityAppetite && { sustainability_appetite: data.sustainabilityAppetite }),
      ...(data.sustainabilityProfile && { sustainability_profile: data.sustainabilityProfile }),
      ...(data.latestAssessmentDate && { latest_assessment: data.latestAssessmentDate }),
      ...(data.nextAssessmentDate && { next_assessment: data.nextAssessmentDate }),
      ...(data.notes !== undefined && { notes: data.notes })
    };
  }

  // Map registry status to profile status format
  private mapStatus(status: ClientRegistryData['status']): ClientProfile['assessmentStatus'] {
    switch (status) {
      case 'updated': return 'Updated';
      case 'outstanding': return 'Outstanding'; 
      case 'overdue': return 'Overdue';
      default: return 'Outstanding';
    }
  }

  // Map profile status to registry status format
  private mapStatusReverse(status: ClientProfile['assessmentStatus']): ClientRegistryData['status'] {
    switch (status) {
      case 'Updated': return 'updated';
      case 'Outstanding': return 'outstanding';
      case 'Overdue': return 'overdue';
      default: return 'outstanding';
    }
  }
}

export const clientApi = new ClientApiService();