import React, { useState, useCallback } from 'react';
import { Filter, X, Settings2, Search } from 'lucide-react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Badge } from './badge';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

// Unified Filter Header Component - Supports both new and legacy interfaces
interface NewFilterHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: Array<{
    key: string;
    label: string;
    options: string[];
    selectedOptions: string[];
    onChange: (selectedOptions: string[]) => void;
  }>;
  onClearAll: () => void;
  totalResults: number;
  filteredResults: number;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  // Page size controls
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  showPageSize?: boolean;
}

// Legacy interface for backwards compatibility
interface LegacyFilterHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string[];
  onStatusFilterChange: (filter: string[]) => void;
  appetiteFilter: string[];
  onAppetiteFilterChange: (filter: string[]) => void;
  profileFilter: string[];
  onProfileFilterChange: (filter: string[]) => void;
  statusOptions: string[];
  appetiteOptions: string[];
  profileOptions: string[];
  resultCount: number;
}

type FilterHeaderProps = NewFilterHeaderProps | LegacyFilterHeaderProps;

// Type guard to check if props are using the new interface
function isNewInterface(props: FilterHeaderProps): props is NewFilterHeaderProps {
  return 'filters' in props && 'totalResults' in props && 'filteredResults' in props;
}

export function FilterHeader(props: FilterHeaderProps) {
  // Handle both new and legacy interfaces
  if (isNewInterface(props)) {
    return <NewFilterHeader {...props} />;
  } else {
    return <LegacyFilterHeader {...props} />;
  }
}

// Legacy FilterHeader component for backwards compatibility
function LegacyFilterHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  appetiteFilter,
  onAppetiteFilterChange,
  profileFilter,
  onProfileFilterChange,
  statusOptions,
  appetiteOptions,
  profileOptions,
  resultCount
}: LegacyFilterHeaderProps) {
  const [open, setOpen] = useState(false);
  
  // Calculate active filters safely
  const totalActiveFilters = (statusFilter?.length || 0) + (appetiteFilter?.length || 0) + (profileFilter?.length || 0);
  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasActiveFilters = totalActiveFilters > 0 || hasSearchQuery;

  const handleClearAll = useCallback(() => {
    console.log('LegacyFilterHeader: Clear all filters');
    onSearchChange('');
    onStatusFilterChange([]);
    onAppetiteFilterChange([]);
    onProfileFilterChange([]);
  }, [onSearchChange, onStatusFilterChange, onAppetiteFilterChange, onProfileFilterChange]);

  const handleToggleStatusOption = useCallback((option: string) => {
    const isSelected = statusFilter.includes(option);
    const newSelected = isSelected
      ? statusFilter.filter(item => item !== option)
      : [...statusFilter, option];
    onStatusFilterChange(newSelected);
  }, [statusFilter, onStatusFilterChange]);

  const handleToggleAppetiteOption = useCallback((option: string) => {
    const isSelected = appetiteFilter.includes(option);
    const newSelected = isSelected
      ? appetiteFilter.filter(item => item !== option)
      : [...appetiteFilter, option];
    onAppetiteFilterChange(newSelected);
  }, [appetiteFilter, onAppetiteFilterChange]);

  const handleToggleProfileOption = useCallback((option: string) => {
    const isSelected = profileFilter.includes(option);
    const newSelected = isSelected
      ? profileFilter.filter(item => item !== option)
      : [...profileFilter, option];
    onProfileFilterChange(newSelected);
  }, [profileFilter, onProfileFilterChange]);

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between gap-4">
        {/* Left: Filter Status and Results */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {resultCount} clients
          </div>
          
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              {hasSearchQuery && (
                <Badge
                  variant="secondary"
                  className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer transition-colors"
                  onClick={() => onSearchChange('')}
                >
                  Search: "{searchQuery.length > 20 ? searchQuery.substring(0, 20) + '...' : searchQuery}"
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
              
              {statusFilter.map((option) => (
                <Badge
                  key={`status-${option}`}
                  variant="secondary"
                  className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer transition-colors"
                  onClick={() => handleToggleStatusOption(option)}
                >
                  Status: {option}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}

              {appetiteFilter.map((option) => (
                <Badge
                  key={`appetite-${option}`}
                  variant="secondary"
                  className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer transition-colors"
                  onClick={() => handleToggleAppetiteOption(option)}
                >
                  Appetite: {option}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}

              {profileFilter.map((option) => (
                <Badge
                  key={`profile-${option}`}
                  variant="secondary"
                  className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer transition-colors"
                  onClick={() => handleToggleProfileOption(option)}
                >
                  Profile: {option}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Right: Filter Controls */}
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-chart-1 hover:text-chart-1 hover:bg-chart-1/10 transition-colors h-9"
            >
              Clear all
            </Button>
          )}
          
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 h-9 ${
                  hasActiveFilters ? 'bg-chart-1/10 border-chart-1/30 text-chart-1' : ''
                }`}
              >
                <Settings2 className="w-4 h-4" />
                Filters
                {totalActiveFilters > 0 && (
                  <Badge
                    variant="secondary"
                    className="h-5 px-2 text-xs bg-chart-1 text-white border-0"
                  >
                    {totalActiveFilters}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="end" side="bottom" sideOffset={8}>
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Filter & Search</h4>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAll}
                      className="text-chart-1 hover:text-chart-1 hover:bg-chart-1/10"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                
                {/* Search Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search clients by name or email..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Filter Options */}
              <div className="max-h-96 overflow-y-auto">
                {/* Status Filter */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-sm">Assessment Status</h5>
                    {statusFilter.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-chart-1/10 text-chart-1 border-chart-1/20"
                      >
                        {statusFilter.length} selected
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {statusOptions.map((option) => {
                      const isSelected = statusFilter.includes(option);
                      return (
                        <div
                          key={option}
                          className="flex items-center space-x-3 p-2 rounded hover:bg-accent transition-colors cursor-pointer"
                          onClick={() => handleToggleStatusOption(option)}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggleStatusOption(option)}
                            className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                          />
                          <span className="text-sm flex-1">{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Appetite Filter */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-sm">Sustainability Appetite</h5>
                    {appetiteFilter.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-chart-1/10 text-chart-1 border-chart-1/20"
                      >
                        {appetiteFilter.length} selected
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {appetiteOptions.map((option) => {
                      const isSelected = appetiteFilter.includes(option);
                      return (
                        <div
                          key={option}
                          className="flex items-center space-x-3 p-2 rounded hover:bg-accent transition-colors cursor-pointer"
                          onClick={() => handleToggleAppetiteOption(option)}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggleAppetiteOption(option)}
                            className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                          />
                          <span className="text-sm flex-1">{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Profile Filter */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-sm">Sustainability Profile</h5>
                    {profileFilter.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-chart-1/10 text-chart-1 border-chart-1/20"
                      >
                        {profileFilter.length} selected
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {profileOptions.map((option) => {
                      const isSelected = profileFilter.includes(option);
                      return (
                        <div
                          key={option}
                          className="flex items-center space-x-3 p-2 rounded hover:bg-accent transition-colors cursor-pointer"
                          onClick={() => handleToggleProfileOption(option)}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggleProfileOption(option)}
                            className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                          />
                          <span className="text-sm flex-1">{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-3">
        {/* Status */}
        <div className="text-sm text-muted-foreground">
          Showing {resultCount} clients
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            {hasSearchQuery && (
              <Badge
                variant="secondary"
                className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer transition-colors"
                onClick={() => onSearchChange('')}
              >
                Search: "{searchQuery.length > 15 ? searchQuery.substring(0, 15) + '...' : searchQuery}"
                <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
            
            {statusFilter.map((option) => (
              <Badge
                key={`status-${option}`}
                variant="secondary"
                className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer transition-colors"
                onClick={() => handleToggleStatusOption(option)}
              >
                Status: {option}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}

            {appetiteFilter.map((option) => (
              <Badge
                key={`appetite-${option}`}
                variant="secondary"
                className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer transition-colors"
                onClick={() => handleToggleAppetiteOption(option)}
              >
                Appetite: {option}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}

            {profileFilter.map((option) => (
              <Badge
                key={`profile-${option}`}
                variant="secondary"
                className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer transition-colors"
                onClick={() => handleToggleProfileOption(option)}
              >
                Profile: {option}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-chart-1 hover:text-chart-1 hover:bg-chart-1/10 transition-colors h-9"
            >
              Clear all
            </Button>
          )}
          
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 h-9 flex-1 ${
                  hasActiveFilters ? 'bg-chart-1/10 border-chart-1/30 text-chart-1' : ''
                }`}
              >
                <Settings2 className="w-4 h-4" />
                Filters
                {totalActiveFilters > 0 && (
                  <Badge
                    variant="secondary"
                    className="h-5 px-2 text-xs bg-chart-1 text-white border-0"
                  >
                    {totalActiveFilters}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start" side="bottom" sideOffset={8}>
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Filter & Search</h4>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAll}
                      className="text-chart-1 hover:text-chart-1 hover:bg-chart-1/10"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                
                {/* Search Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search clients by name or email..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Mobile Filter Options */}
              <div className="max-h-80 overflow-y-auto">
                {/* Status Filter */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-sm">Assessment Status</h5>
                    {statusFilter.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-chart-1/10 text-chart-1 border-chart-1/20"
                      >
                        {statusFilter.length} selected
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {statusOptions.map((option) => {
                      const isSelected = statusFilter.includes(option);
                      return (
                        <div
                          key={option}
                          className="flex items-center space-x-3 p-2 rounded hover:bg-accent transition-colors cursor-pointer"
                          onClick={() => handleToggleStatusOption(option)}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggleStatusOption(option)}
                            className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                          />
                          <span className="text-sm flex-1">{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Appetite Filter */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-sm">Sustainability Appetite</h5>
                    {appetiteFilter.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-chart-1/10 text-chart-1 border-chart-1/20"
                      >
                        {appetiteFilter.length} selected
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {appetiteOptions.map((option) => {
                      const isSelected = appetiteFilter.includes(option);
                      return (
                        <div
                          key={option}
                          className="flex items-center space-x-3 p-2 rounded hover:bg-accent transition-colors cursor-pointer"
                          onClick={() => handleToggleAppetiteOption(option)}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggleAppetiteOption(option)}
                            className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                          />
                          <span className="text-sm flex-1">{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Profile Filter */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-sm">Sustainability Profile</h5>
                    {profileFilter.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-chart-1/10 text-chart-1 border-chart-1/20"
                      >
                        {profileFilter.length} selected
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {profileOptions.map((option) => {
                      const isSelected = profileFilter.includes(option);
                      return (
                        <div
                          key={option}
                          className="flex items-center space-x-3 p-2 rounded hover:bg-accent transition-colors cursor-pointer"
                          onClick={() => handleToggleProfileOption(option)}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggleProfileOption(option)}
                            className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                          />
                          <span className="text-sm flex-1">{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

// New FilterHeader component for the modern interface
function NewFilterHeader({
  searchQuery,
  onSearchChange,
  filters = [], // Add default empty array
  onClearAll,
  totalResults,
  filteredResults,
  isOpen = false,
  onOpenChange,
  pageSize = 20,
  onPageSizeChange,
  pageSizeOptions = [20, 50, 100],
  showPageSize = false
}: NewFilterHeaderProps) {
  const [open, setOpen] = useState(isOpen);
  
  // Safe reduce with default empty array
  const totalActiveFilters = (filters || []).reduce(
    (sum, filter) => sum + (filter?.selectedOptions?.length || 0),
    0
  );
  
  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasActiveFilters = totalActiveFilters > 0 || hasSearchQuery;
  const isFiltered = filteredResults < totalResults;

  const handleOpenChange = useCallback((newOpen: boolean) => {
    console.log('NewFilterHeader: Popover state change:', { from: open, to: newOpen });
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  }, [open, onOpenChange]);

  const handleClearAll = useCallback(() => {
    console.log('NewFilterHeader: Clear all filters');
    onClearAll();
    onSearchChange('');
  }, [onClearAll, onSearchChange]);

  const handleToggleOption = useCallback((filter: any, option: string) => {
    console.log('NewFilterHeader: Toggle option:', { 
      filterKey: filter.key, 
      option, 
      currentSelected: filter.selectedOptions 
    });
    
    const isSelected = filter.selectedOptions?.includes(option) || false;
    const newSelected = isSelected
      ? (filter.selectedOptions || []).filter(item => item !== option)
      : [...(filter.selectedOptions || []), option];
    
    console.log('NewFilterHeader: New selection:', newSelected);
    filter.onChange?.(newSelected);
  }, []);

  // Simple fallback implementation for new interface
  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="text-sm text-muted-foreground">
        Showing {filteredResults} of {totalResults} clients
        {isFiltered && <span className="text-chart-1 font-medium ml-1">• Filtered</span>}
      </div>
    </div>
  );
}