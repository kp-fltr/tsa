import { supabase } from '../lib/supabase';
import { toast } from 'sonner@2.0.3';
import type { ClientRegistryData } from './clientRegistryApi';

export interface ClientFilters {
  q?: string;
  status?: string;
  sortBy?: string;
  desc?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ClientsResponse {
  data: ClientRegistryData[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Fetch clients with filtering and pagination
export async function fetchClients(filters: ClientFilters = {}): Promise<ClientsResponse> {
  try {
    const {
      q = '',
      status = 'all',
      sortBy = 'latest_assessment',
      desc = true,
      page = 1,
      pageSize = 20,
    } = filters;

    let query = supabase.from('client_registry').select('*', { count: 'exact' });

    // Apply filters
    if (q) {
      query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);
    }

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: !desc });

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data || [],
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching clients:', error);
    toast.error('Failed to load clients');
    return {
      data: [],
      pagination: { page: 1, pageSize: 20, total: 0, totalPages: 0 },
    };
  }
}

// Create a new client
export async function createClient(
  clientData: Omit<ClientRegistryData, 'id' | 'advisor_id' | 'created_at' | 'updated_at'>
): Promise<ClientRegistryData | null> {
  try {
    const { data, error } = await supabase
      .from('client_registry')
      .insert([clientData])
      .select()
      .single();

    if (error) throw error;

    toast.success(`Client ${clientData.name} created successfully`);
    return data;
  } catch (error) {
    console.error('Error creating client:', error);
    toast.error('Failed to create client');
    return null;
  }
}

// Update a client
export async function updateClient(
  id: string,
  updates: Partial<ClientRegistryData>
): Promise<ClientRegistryData | null> {
  try {
    const { data, error } = await supabase
      .from('client_registry')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    toast.success('Client updated successfully');
    return data;
  } catch (error) {
    console.error('Error updating client:', error);
    toast.error('Failed to update client');
    return null;
  }
}

// Delete a client
export async function deleteClient(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('client_registry').delete().eq('id', id);

    if (error) throw error;

    toast.success('Client deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting client:', error);
    toast.error('Failed to delete client');
    return false;
  }
}

// Get single client by ID
export async function getClient(id: string): Promise<ClientRegistryData | null> {
  try {
    const { data, error } = await supabase
      .from('client_registry')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching client:', error);
    toast.error('Failed to load client details');
    return null;
  }
}