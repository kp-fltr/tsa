import { supabase } from '../lib/supabase';
import { toast } from 'sonner@2.0.3';

export interface ClientKPIs {
  totalClients: number;
  updatedCount: number;
  outstandingCount: number;
  overdueCount: number;
  upcoming30d: number;
}

// Fetch KPI data for the current user
export async function fetchKpis(): Promise<ClientKPIs> {
  try {
    const { data, error } = await supabase.from('client_registry').select('status, next_assessment');

    if (error) throw error;

    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const kpis: ClientKPIs = {
      totalClients: data?.length || 0,
      updatedCount: data?.filter(client => client.status === 'updated').length || 0,
      outstandingCount: data?.filter(client => client.status === 'outstanding').length || 0,
      overdueCount: data?.filter(client => client.status === 'overdue').length || 0,
      upcoming30d:
        data?.filter(client => {
          if (!client.next_assessment) return false;
          const nextDate = new Date(client.next_assessment);
          return nextDate <= thirtyDaysFromNow && nextDate >= now;
        }).length || 0,
    };

    return kpis;
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    toast.error('Failed to load dashboard metrics');

    // Return default KPIs on error
    return {
      totalClients: 0,
      updatedCount: 0,
      outstandingCount: 0,
      overdueCount: 0,
      upcoming30d: 0,
    };
  }
}

// Simple cache for KPIs (5 minute TTL)
class KPICache {
  private cache: { data: ClientKPIs; timestamp: number } | null = null;
  private readonly TTL = 5 * 60 * 1000; // 5 minutes

  async get(): Promise<ClientKPIs> {
    const now = Date.now();
    if (this.cache && now - this.cache.timestamp < this.TTL) {
      return this.cache.data;
    }

    const data = await fetchKpis();
    this.cache = { data, timestamp: now };
    return data;
  }

  invalidate(): void {
    this.cache = null;
  }
}

export const kpiCache = new KPICache();