// Table Preferences Management System
// Centralized utilities for managing table filters, column widths, and other user preferences

export interface TablePreferences {
  columnWidths: Record<string, number>;
  filters: Record<string, string>;
  sortOrder?: {
    column: string;
    direction: 'asc' | 'desc';
  };
  pageSize?: number;
  hiddenColumns?: string[];
}

export interface TableConfig {
  tableId: string;
  defaultFilters?: Record<string, string>;
  defaultColumnWidths?: Record<string, number>;
  defaultSortOrder?: {
    column: string;
    direction: 'asc' | 'desc';
  };
}

// Storage keys for different table types
export const TABLE_STORAGE_KEYS = {
  'client-management': 'table-preferences-client-management',
  'test-distribution-client-selection': 'table-preferences-test-distribution-client-selection', 
  'analytics-reports': 'table-preferences-analytics-reports',
  'analytics-campaigns': 'table-preferences-analytics-campaigns',
  'client-directory': 'table-preferences-client-directory'
} as const;

// Default column widths for consistency
export const DEFAULT_COLUMN_WIDTHS = {
  narrow: 80,    // Checkboxes, dates, numbers
  medium: 128,   // Status, ratings, short text
  wide: 192,     // Names, emails, descriptions
  auto: 150      // Flexible content
} as const;

// Common filter configurations
export const COMMON_FILTER_OPTIONS = {
  status: ['Updated', 'Outstanding', 'Overdue'],
  rating: ['High', 'Medium', 'Low', 'N/A'],
  profile: ['A', 'B', 'C', 'D', 'E'],
  urgency: ['Critical', 'High', 'Medium', 'Low'],
  category: ['Sustainability', 'Environmental', 'Social', 'Governance']
} as const;

// Field mappings for client data
export const CLIENT_FILTER_FIELDS = {
  status: 'sustainability_assessment_status',
  rating: 'sustainability_appetite_rating',
  profile: 'sustainability_profile'
} as const;

// Local storage utilities with error handling
export const getStoredPreferences = (tableId: string): TablePreferences => {
  try {
    const storageKey = TABLE_STORAGE_KEYS[tableId as keyof typeof TABLE_STORAGE_KEYS] || `table-preferences-${tableId}`;
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : { columnWidths: {}, filters: {} };
  } catch (error) {
    console.warn(`Failed to load table preferences for ${tableId}:`, error);
    return { columnWidths: {}, filters: {} };
  }
};

export const storePreferences = (tableId: string, preferences: TablePreferences): void => {
  try {
    const storageKey = TABLE_STORAGE_KEYS[tableId as keyof typeof TABLE_STORAGE_KEYS] || `table-preferences-${tableId}`;
    localStorage.setItem(storageKey, JSON.stringify(preferences));
  } catch (error) {
    console.warn(`Failed to store table preferences for ${tableId}:`, error);
  }
};

// Clear preferences for a specific table
export const clearTablePreferences = (tableId: string): void => {
  try {
    const storageKey = TABLE_STORAGE_KEYS[tableId as keyof typeof TABLE_STORAGE_KEYS] || `table-preferences-${tableId}`;
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.warn(`Failed to clear table preferences for ${tableId}:`, error);
  }
};

// Clear all table preferences
export const clearAllTablePreferences = (): void => {
  try {
    Object.values(TABLE_STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.warn('Failed to clear all table preferences:', error);
  }
};

// Get default preferences for a table type
export const getDefaultPreferences = (config: TableConfig): TablePreferences => {
  return {
    columnWidths: config.defaultColumnWidths || {},
    filters: config.defaultFilters || {},
    sortOrder: config.defaultSortOrder,
    pageSize: 25,
    hiddenColumns: []
  };
};

// Merge stored preferences with defaults
export const getMergedPreferences = (config: TableConfig): TablePreferences => {
  const stored = getStoredPreferences(config.tableId);
  const defaults = getDefaultPreferences(config);
  
  return {
    columnWidths: { ...defaults.columnWidths, ...stored.columnWidths },
    filters: { ...defaults.filters, ...stored.filters },
    sortOrder: stored.sortOrder || defaults.sortOrder,
    pageSize: stored.pageSize || defaults.pageSize,
    hiddenColumns: stored.hiddenColumns || defaults.hiddenColumns
  };
};

// Filter utility functions
export const applyTableFilters = (
  data: any[], 
  filters: Record<string, string>, 
  filterFields: Record<string, string> = {}
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

// Search utility function
export const applyTableSearch = (
  data: any[], 
  searchTerm: string,
  searchFields: string[] = ['name', 'email']
): any[] => {
  if (!searchTerm.trim()) return data;
  
  const lowercaseSearch = searchTerm.toLowerCase();
  
  return data.filter(item => {
    return searchFields.some(field => {
      const value = item[field];
      return value && typeof value === 'string' && 
             value.toLowerCase().includes(lowercaseSearch);
    });
  });
};

// Generate filter options from data
export const generateFilterOptions = (
  data: any[],
  field: string,
  customOptions?: string[]
): string[] => {
  if (customOptions) return customOptions;
  
  const uniqueValues = [...new Set(
    data.map(item => item[field])
        .filter(Boolean)
        .filter(value => typeof value === 'string')
  )];
  
  return uniqueValues.sort();
};

// Column width validation
export const validateColumnWidth = (
  width: number, 
  minWidth: number = 60, 
  maxWidth: number = 500
): number => {
  return Math.max(minWidth, Math.min(maxWidth, width));
};

// Export configuration helpers
export const createTableConfig = (
  tableId: string,
  options: Partial<Omit<TableConfig, 'tableId'>> = {}
): TableConfig => {
  return {
    tableId,
    defaultFilters: { status: 'all', rating: 'all', profile: 'all', ...options.defaultFilters },
    defaultColumnWidths: options.defaultColumnWidths || {},
    defaultSortOrder: options.defaultSortOrder
  };
};

// Performance optimization - debounced preference saving
export const createDebouncedPreferenceSaver = (
  tableId: string, 
  delay: number = 500
) => {
  let timeoutId: NodeJS.Timeout;
  
  return (preferences: TablePreferences) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      storePreferences(tableId, preferences);
    }, delay);
  };
};

// Migration helper for existing preferences
export const migrateTablePreferences = (
  oldTableId: string, 
  newTableId: string
): void => {
  try {
    const oldPreferences = getStoredPreferences(oldTableId);
    if (Object.keys(oldPreferences.columnWidths).length > 0 || 
        Object.keys(oldPreferences.filters).length > 0) {
      storePreferences(newTableId, oldPreferences);
      clearTablePreferences(oldTableId);
    }
  } catch (error) {
    console.warn(`Failed to migrate preferences from ${oldTableId} to ${newTableId}:`, error);
  }
};