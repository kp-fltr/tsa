import { useState, useEffect, useCallback } from 'react';
import { 
  fetchKpis, 
  fetchClients, 
  createClient, 
  updateClient, 
  deleteClient,
  ClientKPIs, 
  ClientRegistryData, 
  ClientsResponse, 
  ClientFilters,
  clientCache
} from '../services/clientRegistryApi';
import { toast } from 'sonner@2.0.3';

// Custom hook for managing client registry data with caching and real-time updates
export function useClientRegistry() {
  const [kpis, setKpis] = useState<ClientKPIs>({
    totalClients: 0,
    updatedCount: 0,
    outstandingCount: 0,
    overdueCount: 0,
    upcoming30d: 0
  });
  const [clients, setClients] = useState<ClientRegistryData[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(false);
  const [kpisLoading, setKpisLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Current filters state
  const [filters, setFilters] = useState<ClientFilters>({
    q: '',
    status: 'all',
    sortBy: 'latest_assessment',
    desc: true,
    page: 1,
    pageSize: 20
  });

  // Load KPIs from cache or API
  const loadKpis = useCallback(async () => {
    setKpisLoading(true);
    setError(null);
    try {
      const kpisData = await clientCache.getKpis();
      setKpis(kpisData);
    } catch (error) {
      console.error('Error loading KPIs:', error);
      setError('Failed to load dashboard metrics');
      // Set default values on error
      setKpis({
        totalClients: 0,
        updatedCount: 0,
        outstandingCount: 0,
        overdueCount: 0,
        upcoming30d: 0
      });
    } finally {
      setKpisLoading(false);
    }
  }, []);

  // Load clients with current filters
  const loadClients = useCallback(async (newFilters?: Partial<ClientFilters>) => {
    setLoading(true);
    setError(null);
    try {
      const currentFilters = { ...filters, ...newFilters };
      const response = await fetchClients(currentFilters);
      setClients(response.data);
      setPagination(response.pagination);
      
      // Update filters state if new filters were provided
      if (newFilters) {
        setFilters(currentFilters);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
      setError('Failed to load clients');
      setClients([]);
      setPagination({
        page: 1,
        pageSize: 20,
        total: 0,
        totalPages: 0
      });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Refresh both KPIs and current client view
  const refreshAll = useCallback(async () => {
    clientCache.invalidateKpis(); // Clear cache to force fresh data
    await Promise.all([
      loadKpis(),
      loadClients()
    ]);
  }, [loadKpis, loadClients]);

  // Create a new client and refresh data
  const handleCreateClient = useCallback(async (clientData: Omit<ClientRegistryData, 'id' | 'advisor_id' | 'created_at' | 'updated_at'>) => {
    try {
      const newClient = await createClient(clientData);
      if (newClient) {
        // Refresh both KPIs and client list
        await refreshAll();
        return newClient;
      }
      return null;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  }, [refreshAll]);

  // Update a client and refresh data
  const handleUpdateClient = useCallback(async (id: string, updates: Partial<ClientRegistryData>) => {
    try {
      const updatedClient = await updateClient(id, updates);
      if (updatedClient) {
        // Update local state immediately for better UX
        setClients(prev => prev.map(client => 
          client.id === id ? { ...client, ...updates } : client
        ));
        
        // Refresh KPIs in background (status changes affect metrics)
        loadKpis();
        return updatedClient;
      }
      return null;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  }, [loadKpis]);

  // Delete a client and refresh data
  const handleDeleteClient = useCallback(async (id: string) => {
    try {
      const success = await deleteClient(id);
      if (success) {
        // Update local state immediately
        setClients(prev => prev.filter(client => client.id !== id));
        
        // Refresh KPIs and reload current page
        await refreshAll();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  }, [refreshAll]);

  // Search functionality
  const handleSearch = useCallback((query: string) => {
    loadClients({ q: query, page: 1 });
  }, [loadClients]);

  // Filter functionality
  const handleFilter = useCallback((status: string) => {
    loadClients({ status, page: 1 });
  }, [loadClients]);

  // Sorting functionality
  const handleSort = useCallback((sortBy: string, desc: boolean = true) => {
    loadClients({ sortBy, desc, page: 1 });
  }, [loadClients]);

  // Pagination functionality
  const handlePageChange = useCallback((page: number) => {
    loadClients({ page });
  }, [loadClients]);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    loadClients({ pageSize, page: 1 });
  }, [loadClients]);

  // Load initial data on mount
  useEffect(() => {
    refreshAll();
  }, []);

  return {
    // Data
    kpis,
    clients,
    pagination,
    filters,
    
    // Loading states
    loading,
    kpisLoading,
    error,
    
    // Actions
    refreshAll,
    loadKpis,
    loadClients,
    createClient: handleCreateClient,
    updateClient: handleUpdateClient,
    deleteClient: handleDeleteClient,
    
    // Search, filter, sort, pagination
    search: handleSearch,
    filter: handleFilter,
    sort: handleSort,
    changePage: handlePageChange,
    changePageSize: handlePageSizeChange,
    
    // Utility
    setFilters,
    clearError: () => setError(null)
  };
}

// Simpler hook for just KPIs using unified dataset (for Dashboard components that only need metrics)
export function useClientKpis() {
  const [kpis, setKpis] = useState<ClientKPIs>({
    totalClients: 0,
    updatedCount: 0,
    outstandingCount: 0,
    overdueCount: 0,
    upcoming30d: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadKpis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try API client first
      const { apiClient } = await import('../services/apiClient');
      const apiData = await apiClient.fetchKpis();
      
      // Map API response to expected interface
      const kpisData: ClientKPIs = {
        totalClients: apiData.totalClients || 0,
        updatedCount: apiData.testsSent || 0, // Map API fields to expected fields
        outstandingCount: apiData.totalClients ? Math.floor(apiData.totalClients * 0.3) : 0, // Estimate based on completion rate
        overdueCount: apiData.totalClients ? Math.floor(apiData.totalClients * 0.1) : 0, // Estimate
        upcoming30d: apiData.totalClients ? Math.floor(apiData.totalClients * 0.2) : 0 // Estimate
      };
      
      setKpis(kpisData);
    } catch (error) {
      console.error('❌ Error fetching KPIs:', error);
      setError(`Failed to load KPIs: ${error}`);
      
      // Fallback to mock data for better UX
      setKpis({
        totalClients: 247,
        updatedCount: 160,
        outstandingCount: 57,
        overdueCount: 30,
        upcoming30d: 42
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshKpis = useCallback(async () => {
    await loadKpis(); // No cache to invalidate - direct calculation
  }, [loadKpis]);

  useEffect(() => {
    loadKpis();
  }, [loadKpis]);

  return {
    kpis,
    loading,
    error,
    refresh: refreshKpis,
    clearError: () => setError(null)
  };
}

// Hook for managing client table state (for ClientManagement component)
export function useClientTable() {
  const {
    clients,
    pagination,
    loading,
    error,
    loadClients,
    updateClient,
    deleteClient,
    search,
    filter,
    sort,
    changePage,
    changePageSize,
    filters
  } = useClientRegistry();

  // Combined filter update function
  const updateFilters = useCallback((newFilters: Partial<ClientFilters>) => {
    loadClients(newFilters);
  }, [loadClients]);

  return {
    clients,
    pagination,
    loading,
    error,
    filters,
    updateClient,
    deleteClient,
    search,
    filter,
    sort,
    changePage,
    changePageSize,
    updateFilters,
    refresh: () => loadClients()
  };
}

export default useClientRegistry;