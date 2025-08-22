import { useState, useEffect, useCallback } from 'react';

export interface ColumnFilter {
  columnKey: string;
  selectedOptions: string[];
}

export interface ColumnFilterConfig {
  columnKey: string;
  options: string[];
  dataField: string;
}

export interface UseColumnFiltersProps {
  tableId: string;
  data: any[];
  filterConfigs: ColumnFilterConfig[];
}

export interface UseColumnFiltersReturn {
  filteredData: any[];
  columnFilters: Record<string, string[]>;
  updateColumnFilter: (columnKey: string, selectedOptions: string[]) => void;
  clearAllFilters: () => void;
  getActiveFilterCount: () => number;
}

const getStorageKey = (tableId: string) => `column-filters-${tableId}`;

const loadFiltersFromStorage = (tableId: string, filterConfigs: ColumnFilterConfig[]) => {
  try {
    const stored = localStorage.getItem(getStorageKey(tableId));
    if (stored) {
      const parsedFilters = JSON.parse(stored);
      // Ensure all configured columns have entries
      const filters: Record<string, string[]> = {};
      filterConfigs.forEach(config => {
        filters[config.columnKey] = parsedFilters[config.columnKey] || [];
      });
      return filters;
    }
  } catch (error) {
    console.warn('Failed to load column filters from storage:', error);
  }

  // Return default empty filters
  const defaultFilters: Record<string, string[]> = {};
  filterConfigs.forEach(config => {
    defaultFilters[config.columnKey] = [];
  });
  return defaultFilters;
};

const saveFiltersToStorage = (tableId: string, filters: Record<string, string[]>) => {
  try {
    localStorage.setItem(getStorageKey(tableId), JSON.stringify(filters));
  } catch (error) {
    console.warn('Failed to save column filters to storage:', error);
  }
};

const applyFiltersToData = (
  data: any[],
  filters: Record<string, string[]>,
  filterConfigs: ColumnFilterConfig[]
): any[] => {
  return data.filter(item => {
    return filterConfigs.every(config => {
      const selectedOptions = filters[config.columnKey];
      if (!selectedOptions || selectedOptions.length === 0) {
        return true; // No filter applied, include item
      }

      const itemValue = item[config.dataField];
      if (itemValue == null) {
        return false; // Item has no value for this field
      }

      // Handle both string and array values
      if (Array.isArray(itemValue)) {
        return itemValue.some(value => 
          selectedOptions.some(option => 
            String(value).toLowerCase() === option.toLowerCase()
          )
        );
      } else {
        return selectedOptions.some(option => 
          String(itemValue).toLowerCase() === option.toLowerCase()
        );
      }
    });
  });
};

export const useColumnFilters = ({
  tableId,
  data,
  filterConfigs,
}: UseColumnFiltersProps): UseColumnFiltersReturn => {
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>(() =>
    loadFiltersFromStorage(tableId, filterConfigs)
  );

  // Apply filters to data
  const filteredData = applyFiltersToData(data, columnFilters, filterConfigs);

  // Update a specific column filter
  const updateColumnFilter = useCallback((columnKey: string, selectedOptions: string[]) => {
    setColumnFilters(prev => {
      const newFilters = {
        ...prev,
        [columnKey]: selectedOptions,
      };
      saveFiltersToStorage(tableId, newFilters);
      return newFilters;
    });
  }, [tableId]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    const emptyFilters: Record<string, string[]> = {};
    filterConfigs.forEach(config => {
      emptyFilters[config.columnKey] = [];
    });
    setColumnFilters(emptyFilters);
    saveFiltersToStorage(tableId, emptyFilters);
  }, [tableId, filterConfigs]);

  // Get total active filter count
  const getActiveFilterCount = useCallback(() => {
    return Object.values(columnFilters).reduce(
      (total, options) => total + options.length,
      0
    );
  }, [columnFilters]);

  // Save filters to storage when they change
  useEffect(() => {
    saveFiltersToStorage(tableId, columnFilters);
  }, [tableId, columnFilters]);

  return {
    filteredData,
    columnFilters,
    updateColumnFilter,
    clearAllFilters,
    getActiveFilterCount,
  };
};