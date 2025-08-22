import { useState, useEffect, useMemo, useCallback } from 'react';

interface TablePreferences {
  columnWidths: Record<string, number>;
  filters: Record<string, string>;
}

interface UseEnhancedTableProps {
  tableId: string;
  data: any[];
  defaultFilters?: Record<string, string>;
  filterFields?: Record<string, string>; // Maps filter key to data field
}

interface UseEnhancedTableReturn {
  filteredData: any[];
  preferences: TablePreferences;
  setPreferences: React.Dispatch<React.SetStateAction<TablePreferences>>;
  activeFilters: Record<string, string>;
  handleFiltersChange: (newFilters: Record<string, string>) => void;
  clearFilters: () => void;
  resetColumnWidths: () => void;
}

// Local storage utilities
const getStoredPreferences = (tableId: string): TablePreferences => {
  try {
    const stored = localStorage.getItem(`table-preferences-${tableId}`);
    return stored ? JSON.parse(stored) : { columnWidths: {}, filters: {} };
  } catch {
    return { columnWidths: {}, filters: {} };
  }
};

const storePreferences = (tableId: string, preferences: TablePreferences) => {
  try {
    localStorage.setItem(`table-preferences-${tableId}`, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to store table preferences:', error);
  }
};

// Filter function that works with various data structures
const applyFilters = (
  data: any[], 
  filters: Record<string, string>, 
  filterFields: Record<string, string>
): any[] => {
  return data.filter(item => {
    return Object.entries(filters).every(([filterKey, filterValue]) => {
      if (filterValue === 'all' || !filterValue) return true;
      
      const dataField = filterFields[filterKey] || filterKey;
      const itemValue = item[dataField];
      
      if (typeof itemValue === 'string') {
        return itemValue.toLowerCase() === filterValue.toLowerCase();
      }
      
      return itemValue === filterValue;
    });
  });
};

export const useEnhancedTable = ({
  tableId,
  data,
  defaultFilters = {},
  filterFields = {}
}: UseEnhancedTableProps): UseEnhancedTableReturn => {
  // Initialize preferences from localStorage
  const [preferences, setPreferences] = useState<TablePreferences>(() => {
    const stored = getStoredPreferences(tableId);
    return {
      columnWidths: stored.columnWidths,
      filters: { ...defaultFilters, ...stored.filters }
    };
  });

  // Persist preferences to localStorage when they change
  useEffect(() => {
    storePreferences(tableId, preferences);
  }, [tableId, preferences]);

  // Active filters (separate from preferences for easier management)
  const activeFilters = useMemo(() => preferences.filters, [preferences.filters]);

  // Apply filters to data
  const filteredData = useMemo(() => {
    return applyFilters(data, activeFilters, filterFields);
  }, [data, activeFilters, filterFields]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: Record<string, string>) => {
    setPreferences(prev => ({
      ...prev,
      filters: newFilters
    }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    const clearedFilters = Object.keys(activeFilters).reduce((acc, key) => {
      acc[key] = 'all';
      return acc;
    }, {} as Record<string, string>);
    
    handleFiltersChange(clearedFilters);
  }, [activeFilters, handleFiltersChange]);

  // Reset column widths to defaults
  const resetColumnWidths = useCallback(() => {
    setPreferences(prev => ({
      ...prev,
      columnWidths: {}
    }));
  }, []);

  return {
    filteredData,
    preferences,
    setPreferences,
    activeFilters,
    handleFiltersChange,
    clearFilters,
    resetColumnWidths
  };
};

// Utility function to generate filter options from data
export const generateFilterOptions = (
  data: any[],
  field: string,
  customOptions?: string[]
): string[] => {
  if (customOptions) return customOptions;
  
  const uniqueValues = [...new Set(data.map(item => item[field]).filter(Boolean))];
  return uniqueValues.sort();
};

// Common filter configurations for different table types
export const getCommonFilterOptions = () => ({
  status: ['Updated', 'Outstanding', 'Overdue'],
  rating: ['High', 'Medium', 'Low', 'N/A'],
  profile: ['A', 'B', 'C', 'D', 'E']
});

// Predefined filter field mappings for client data
export const getClientFilterFields = () => ({
  status: 'sustainability_assessment_status',
  rating: 'sustainability_appetite_rating',
  profile: 'sustainability_profile'
});