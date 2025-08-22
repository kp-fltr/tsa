import React, { forwardRef } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Badge } from './badge';
import { Input } from './input';

// Standalone Filter Bar Component for Tables
// Can be used above any table to provide consistent filtering UX

interface TableFilterBarProps {
  filterOptions: Record<string, string[]>;
  activeFilters: Record<string, string>;
  onFiltersChange: (filters: Record<string, string>) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  className?: string;
}

interface FilterDropdownProps {
  filterKey: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

// Individual filter dropdown with consistent styling
const FilterDropdown = forwardRef<HTMLDivElement, FilterDropdownProps>(
  ({ filterKey, options, value, onChange, placeholder }, ref) => {
    const getFilterStyles = (key: string) => {
      switch (key) {
        case 'status':
          return 'border-blue-200 focus:border-blue-500 focus:ring-blue-500/20';
        case 'rating':
          return 'border-green-200 focus:border-green-500 focus:ring-green-500/20';
        case 'profile':
          return 'border-amber-200 focus:border-amber-500 focus:ring-amber-500/20';
        default:
          return 'border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500/20';
      }
    };

    return (
      <div ref={ref} className="min-w-[120px]">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger 
            className={`
              h-10 
              text-sm 
              font-medium
              border
              rounded-md
              ${getFilterStyles(filterKey)}
              transition-colors
              hover:bg-zinc-50
            `}
          >
            <div className="flex items-center gap-2">
              <Filter className="w-3 h-3" />
              <SelectValue placeholder={placeholder} />
            </div>
          </SelectTrigger>
          <SelectContent className="min-w-[140px]">
            <SelectItem value="all" className="text-sm">All {placeholder}</SelectItem>
            {options.map((option) => (
              <SelectItem key={option} value={option.toLowerCase()} className="text-sm">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
);
FilterDropdown.displayName = "FilterDropdown";

// Main filter bar component
export const TableFilterBar = forwardRef<HTMLDivElement, TableFilterBarProps>(
  ({ 
    filterOptions, 
    activeFilters, 
    onFiltersChange,
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    className = ""
  }, ref) => {
    const activeFilterCount = Object.values(activeFilters).filter(v => v !== 'all').length;
    const hasSearch = onSearchChange !== undefined;

    const handleFilterChange = (key: string, value: string) => {
      onFiltersChange({ ...activeFilters, [key]: value });
    };

    const clearAllFilters = () => {
      const clearedFilters = Object.keys(activeFilters).reduce((acc, key) => {
        acc[key] = 'all';
        return acc;
      }, {} as Record<string, string>);
      onFiltersChange(clearedFilters);
      
      // Also clear search if provided
      if (hasSearch) {
        onSearchChange("");
      }
    };

    return (
      <div 
        ref={ref}
        className={`
          p-4 
          bg-zinc-50/50 
          border-b 
          border-zinc-200 
          flex 
          items-center 
          gap-4 
          flex-wrap
          ${className}
        `}
      >
        {/* Search Input */}
        {hasSearch && (
          <div className="flex-1 min-w-[200px] max-w-[400px]">
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-10 border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500/20"
            />
          </div>
        )}

        {/* Filter Label */}
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
          <Filter className="w-4 h-4" />
          <span>Filters:</span>
        </div>
        
        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap">
          {Object.entries(filterOptions).map(([key, options]) => (
            <FilterDropdown
              key={key}
              filterKey={key}
              options={options}
              value={activeFilters[key] || 'all'}
              onChange={(value) => handleFilterChange(key, value)}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </div>
        
        {/* Active Filter Count & Clear Button */}
        {(activeFilterCount > 0 || (hasSearch && searchValue.trim())) && (
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <Badge 
                variant="secondary" 
                className="bg-chart-1/10 text-chart-1 border-chart-1/20"
              >
                {activeFilterCount} active
              </Badge>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          </div>
        )}
      </div>
    );
  }
);
TableFilterBar.displayName = "TableFilterBar";

export default TableFilterBar;