import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  MoreHorizontal, 
  User, 
  MessageSquare, 
  Edit, 
  Users,
  Search,
  ChevronUp,
  ChevronDown,
  Filter,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from './ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  UnifiedClientRecord,
  getAllClientsSorted,
  formatDateForDisplay,
  SUSTAINABILITY_STATUS_OPTIONS,
  SUSTAINABILITY_APPETITE_OPTIONS,
  SUSTAINABILITY_PROFILE_OPTIONS
} from '../data/unifiedClientRegistry';

// Types for URL state management
interface TableState {
  page: number;
  pageSize: number;
  search: string;
  assessmentFilter: string[];
  appetiteFilter: string[];
  profileFilter: string[];
  dateRange: {
    latest?: { from?: Date; to?: Date };
    next?: { from?: Date; to?: Date };
  };
  sort: string; // format: "column:direction" e.g. "name:asc"
}

interface SortConfig {
  column: string | null;
  direction: 'asc' | 'desc';
}

interface AutocompleteOption {
  id: string;
  name: string;
  email: string;
}

interface ClientTableProps {
  clients?: UnifiedClientRecord[];
  loading?: boolean;
  onNavigate?: (view: string) => void;
  onCreateCampaign?: () => void;
  onViewProfile?: (clientId: string) => void;
  selectedClientIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  disableColumnFilters?: boolean;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// URL state management hook
function useTableState() {
  const [state, setState] = useState<TableState>(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      page: parseInt(params.get('page') || '1', 10),
      pageSize: parseInt(params.get('pageSize') || '20', 10),
      search: params.get('search') || '',
      assessmentFilter: params.get('assessmentFilter')?.split(',').filter(Boolean) || [],
      appetiteFilter: params.get('appetiteFilter')?.split(',').filter(Boolean) || [],
      profileFilter: params.get('profileFilter')?.split(',').filter(Boolean) || [],
      dateRange: {
        latest: {},
        next: {}
      },
      sort: params.get('sort') || '',
    };
  });

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (state.page > 1) params.set('page', state.page.toString());
    if (state.pageSize !== 20) params.set('pageSize', state.pageSize.toString());
    if (state.search) params.set('search', state.search);
    if (state.assessmentFilter.length) params.set('assessmentFilter', state.assessmentFilter.join(','));
    if (state.appetiteFilter.length) params.set('appetiteFilter', state.appetiteFilter.join(','));
    if (state.profileFilter.length) params.set('profileFilter', state.profileFilter.join(','));
    if (state.sort) params.set('sort', state.sort);

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [state]);

  return [state, setState] as const;
}

// Compact Status tag component - Regression Fix #2
function CompactStatusTag({ status, children }: { status: string; children: React.ReactNode }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Updated':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Outstanding':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border ${getStatusColor(status)}`}
          style={{ 
            fontSize: '11px', 
            lineHeight: '16px',
            height: '24px',
            fontWeight: '500'
          }}>
      {children}
    </span>
  );
}

// Filter dropdown component
function FilterDropdown({ 
  column, 
  icon: Icon,
  options, 
  selectedOptions, 
  onChange,
  disabled = false
}: {
  column: string;
  icon: React.ElementType;
  options: string[];
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isActive = selectedOptions.length > 0;

  const handleToggleOption = useCallback((option: string) => {
    const isSelected = selectedOptions.includes(option);
    if (isSelected) {
      onChange(selectedOptions.filter(item => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  }, [selectedOptions, onChange]);

  const handleSelectAll = useCallback(() => {
    if (selectedOptions.length === options.length) {
      onChange([]);
    } else {
      onChange([...options]);
    }
  }, [options, selectedOptions, onChange]);

  if (disabled) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`relative h-6 w-6 p-0 hover:bg-chart-1/10 transition-colors ${
            isActive ? 'text-chart-1' : 'text-muted-foreground hover:text-chart-1/80'
          }`}
          aria-label={`Filter ${column}`}
          style={{ minHeight: '24px', minWidth: '24px' }}
        >
          <Icon className="h-3 w-3" />
          {isActive && (
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-chart-1 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0 z-[70]" align="start" sideOffset={4}>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Filter {column}</h4>
            {selectedOptions.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange([])}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
            )}
          </div>

          {selectedOptions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedOptions.map(option => (
                <Badge
                  key={option}
                  variant="secondary"
                  className="text-xs px-2 py-1 bg-chart-1/10 text-chart-1 border-chart-1/20"
                >
                  {option}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleOption(option);
                    }}
                    className="ml-1 hover:bg-chart-1/20 rounded-full p-0.5 -mr-1"
                  >
                    <X className="h-2 w-2" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-2 py-1">
            <Checkbox
              id={`select-all-${column}`}
              checked={selectedOptions.length === options.length}
              onCheckedChange={handleSelectAll}
              className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
            />
            <label
              htmlFor={`select-all-${column}`}
              className="text-sm font-medium cursor-pointer"
            >
              {selectedOptions.length === options.length ? 'Deselect All' : 'Select All'}
            </label>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <div
                  key={option}
                  className="flex items-center space-x-2 p-1 rounded hover:bg-accent cursor-pointer"
                  onClick={() => handleToggleOption(option)}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleToggleOption(option)}
                    className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                  />
                  <label className="text-sm flex-1 cursor-pointer">
                    {option}
                  </label>
                </div>
              );
            })}
          </div>

          {selectedOptions.length > 0 && (
            <div className="pt-2 border-t text-xs text-muted-foreground">
              {selectedOptions.length} of {options.length} selected
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Date range filter component
function DateRangeFilter({ 
  column,
  dateRange,
  onChange,
  disabled = false
}: {
  column: string;
  dateRange?: { from?: Date; to?: Date };
  onChange: (range: { from?: Date; to?: Date }) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isActive = dateRange?.from || dateRange?.to;

  if (disabled) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`relative h-6 w-6 p-0 hover:bg-chart-1/10 transition-colors ${
            isActive ? 'text-chart-1' : 'text-muted-foreground hover:text-chart-1/80'
          }`}
          aria-label={`Filter ${column} dates`}
          style={{ minHeight: '24px', minWidth: '24px' }}
        >
          <Calendar className="h-3 w-3" />
          {isActive && (
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-chart-1 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 z-[70]" align="start" sideOffset={4}>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Filter {column} Date</h4>
            {isActive && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange({})}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">From Date</label>
              <Input
                type="date"
                value={dateRange?.from ? dateRange.from.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  onChange({ ...dateRange, from: date });
                }}
                className="w-full mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">To Date</label>
              <Input
                type="date"
                value={dateRange?.to ? dateRange.to.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  onChange({ ...dateRange, to: date });
                }}
                className="w-full mt-1"
              />
            </div>
          </div>

          {isActive && (
            <div className="pt-2 border-t text-xs text-muted-foreground">
              {dateRange?.from && `From: ${formatDateForDisplay(dateRange.from)}`}
              {dateRange?.from && dateRange?.to && ' • '}
              {dateRange?.to && `To: ${formatDateForDisplay(dateRange.to)}`}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Table Empty State
function TableEmptyState({ 
  icon, 
  title, 
  description, 
  action 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  action?: React.ReactNode; 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      {icon}
      <h3 className="text-lg font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">{description}</p>
      {action}
    </div>
  );
}

export function ClientTable({
  clients,
  loading = false,
  onNavigate,
  onCreateCampaign,
  onViewProfile,
  selectedClientIds = [],
  onSelectionChange,
  disableColumnFilters = false,
}: ClientTableProps) {
  const [tableState, setTableState] = useTableState();
  const [searchInput, setSearchInput] = useState(tableState.search);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteIndex, setAutocompleteIndex] = useState(-1);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const tableBodyRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Debounced search
  const debouncedSearch = useDebounce(searchInput, 250);

  // Update table state when debounced search changes
  useEffect(() => {
    setTableState(prev => ({ 
      ...prev, 
      search: debouncedSearch,
      page: 1
    }));
  }, [debouncedSearch, setTableState]);

  // Handle table body scroll for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      if (tableBodyRef.current) {
        setIsScrolled(tableBodyRef.current.scrollTop > 0);
      }
    };

    const tableBody = tableBodyRef.current;
    if (tableBody) {
      tableBody.addEventListener('scroll', handleScroll);
      return () => tableBody.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Use unified dataset
  const allClients = clients || getAllClientsSorted();

  // Parse sort configuration
  const sortConfig: SortConfig = useMemo(() => {
    if (!tableState.sort) return { column: null, direction: 'asc' };
    const [column, direction] = tableState.sort.split(':');
    return { column, direction: (direction as 'asc' | 'desc') || 'asc' };
  }, [tableState.sort]);

  // Filter and sort clients
  const processedClients = useMemo(() => {
    let filtered = allClients;

    // Apply search filter
    if (tableState.search.trim()) {
      const searchTerm = tableState.search.toLowerCase();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm)
      );
    }

    // Apply column filters
    if (!disableColumnFilters) {
      if (tableState.assessmentFilter.length > 0) {
        filtered = filtered.filter(client => 
          tableState.assessmentFilter.includes(client.sustainability_assessment_status)
        );
      }

      if (tableState.appetiteFilter.length > 0) {
        filtered = filtered.filter(client => 
          tableState.appetiteFilter.includes(client.sustainability_appetite_rating)
        );
      }

      if (tableState.profileFilter.length > 0) {
        filtered = filtered.filter(client => 
          tableState.profileFilter.includes(client.sustainability_profile)
        );
      }

      // Apply date range filters
      if (tableState.dateRange.latest?.from || tableState.dateRange.latest?.to) {
        filtered = filtered.filter(client => {
          const clientDate = new Date(client.latest_assessment_date || 0);
          const from = tableState.dateRange.latest?.from;
          const to = tableState.dateRange.latest?.to;
          
          if (from && clientDate < from) return false;
          if (to && clientDate > to) return false;
          return true;
        });
      }

      if (tableState.dateRange.next?.from || tableState.dateRange.next?.to) {
        filtered = filtered.filter(client => {
          const clientDate = new Date(client.next_assessment_date || 0);
          const from = tableState.dateRange.next?.from;
          const to = tableState.dateRange.next?.to;
          
          if (from && clientDate < from) return false;
          if (to && clientDate > to) return false;
          return true;
        });
      }
    }

    // Apply sorting
    if (sortConfig.column) {
      filtered = [...filtered].sort((a, b) => {
        let aVal: any, bVal: any;
        
        switch (sortConfig.column) {
          case 'name':
            aVal = a.name.toLowerCase();
            bVal = b.name.toLowerCase();
            break;
          case 'latest':
            aVal = new Date(a.latest_assessment_date || 0);
            bVal = new Date(b.latest_assessment_date || 0);
            break;
          case 'next':
            aVal = new Date(a.next_assessment_date || 0);
            bVal = new Date(b.next_assessment_date || 0);
            break;
          default:
            return 0;
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [allClients, tableState, sortConfig, disableColumnFilters]);

  // Pagination
  const totalClients = processedClients.length;
  const totalPages = Math.ceil(totalClients / tableState.pageSize);
  const startIndex = (tableState.page - 1) * tableState.pageSize;
  const endIndex = Math.min(startIndex + tableState.pageSize, totalClients);
  const currentPageClients = processedClients.slice(startIndex, endIndex);

  // Autocomplete options
  const autocompleteOptions: AutocompleteOption[] = useMemo(() => {
    if (!searchInput.trim()) return [];
    
    const searchTerm = searchInput.toLowerCase();
    return allClients
      .filter(client => 
        client.name.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm)
      )
      .slice(0, 8)
      .map(client => ({
        id: client.id.toString(),
        name: client.name,
        email: client.email
      }));
  }, [searchInput, allClients]);

  // Selection logic - only for current page
  const currentPageIds = currentPageClients.map(client => client.id.toString());
  const isAllCurrentPageSelected = currentPageIds.length > 0 && 
    currentPageIds.every(id => selectedClientIds.includes(id));
  const isIndeterminate = selectedClientIds.some(id => currentPageIds.includes(id)) && !isAllCurrentPageSelected;

  // Handlers
  const handleSort = useCallback((column: string) => {
    const newDirection = sortConfig.column === column && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setTableState(prev => ({
      ...prev,
      sort: `${column}:${newDirection}`,
      page: 1
    }));

    // Scroll to top of table body
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTop = 0;
    }
  }, [sortConfig, setTableState]);

  const handlePageChange = useCallback((newPage: number) => {
    setTableState(prev => ({ ...prev, page: newPage }));
    
    // Scroll to top of table body
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTop = 0;
    }
  }, [setTableState]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setTableState(prev => ({ 
      ...prev, 
      pageSize: newPageSize,
      page: 1 
    }));
  }, [setTableState]);

  const handleSelectAll = useCallback((checked: boolean) => {
    if (!onSelectionChange) return;
    
    if (checked) {
      const newSelected = [...new Set([...selectedClientIds, ...currentPageIds])];
      onSelectionChange(newSelected);
    } else {
      const newSelected = selectedClientIds.filter(id => !currentPageIds.includes(id));
      onSelectionChange(newSelected);
    }
  }, [onSelectionChange, selectedClientIds, currentPageIds]);

  const handleSelectClient = useCallback((clientId: string, checked: boolean) => {
    if (!onSelectionChange) return;
    
    if (checked) {
      onSelectionChange([...selectedClientIds, clientId]);
    } else {
      onSelectionChange(selectedClientIds.filter(id => id !== clientId));
    }
  }, [onSelectionChange, selectedClientIds]);

  const handleClearAllFilters = useCallback(() => {
    setTableState(prev => ({
      ...prev,
      search: '',
      assessmentFilter: [],
      appetiteFilter: [],
      profileFilter: [],
      dateRange: { latest: {}, next: {} },
      sort: '',
      page: 1
    }));
    setSearchInput('');
  }, [setTableState]);

  const handleFilterChange = useCallback((filterType: string, values: string[]) => {
    setTableState(prev => ({
      ...prev,
      [`${filterType}Filter`]: values,
      page: 1
    }));
  }, [setTableState]);

  const handleDateRangeChange = useCallback((dateType: 'latest' | 'next', range: { from?: Date; to?: Date }) => {
    setTableState(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [dateType]: range
      },
      page: 1
    }));
  }, [setTableState]);

  // Search handlers
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showAutocomplete || autocompleteOptions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setAutocompleteIndex(prev => 
          prev < autocompleteOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setAutocompleteIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (autocompleteIndex >= 0) {
          const option = autocompleteOptions[autocompleteIndex];
          onViewProfile?.(option.id);
          setShowAutocomplete(false);
        }
        break;
      case 'Escape':
        setShowAutocomplete(false);
        setAutocompleteIndex(-1);
        break;
    }
  }, [showAutocomplete, autocompleteOptions, autocompleteIndex, onViewProfile]);

  const handleAutocompleteSelect = useCallback((option: AutocompleteOption) => {
    onViewProfile?.(option.id);
    setShowAutocomplete(false);
    setAutocompleteIndex(-1);
  }, [onViewProfile]);

  // Active filters count
  const activeFiltersCount = (
    (tableState.assessmentFilter?.length || 0) +
    (tableState.appetiteFilter?.length || 0) +
    (tableState.profileFilter?.length || 0) +
    (tableState.search ? 1 : 0) +
    (tableState.dateRange.latest?.from || tableState.dateRange.latest?.to ? 1 : 0) +
    (tableState.dateRange.next?.from || tableState.dateRange.next?.to ? 1 : 0)
  );

  const hasActiveFilters = activeFiltersCount > 0;
  const isFiltered = processedClients.length < allClients.length;

  // Show empty state if no clients at all
  if (allClients.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <TableEmptyState
          icon={<Users className="w-8 h-8 text-muted-foreground" />}
          title="No clients found"
          description="Get started by adding your first client to begin tracking sustainability assessments."
        />
      </div>
    );
  }

  // Show filtered empty state
  if (processedClients.length === 0 && hasActiveFilters) {
    return (
      <div className="h-full flex flex-col">
        <TableEmptyState
          icon={<Users className="w-8 h-8 text-muted-foreground" />}
          title="No clients match your filters"
          description="Try adjusting your search terms or filter criteria to see more results."
          action={
            <Button
              variant="outline"
              onClick={handleClearAllFilters}
              className="mt-4"
            >
              Clear all filters
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Mobile card layout */}
      <div className="lg:hidden h-full flex flex-col space-y-4">
        {/* Mobile controls */}
        <div className="flex-shrink-0 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search clients by name or email..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowAutocomplete(e.target.value.length > 0);
                setAutocompleteIndex(-1);
              }}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => setShowAutocomplete(searchInput.length > 0)}
              onBlur={() => setTimeout(() => setShowAutocomplete(false), 150)}
              className="pl-10 w-full touch-target"
              aria-label="Search clients"
              aria-expanded={showAutocomplete}
              aria-activedescendant={autocompleteIndex >= 0 ? `autocomplete-${autocompleteIndex}` : undefined}
            />
            
            {/* Autocomplete dropdown */}
            {showAutocomplete && autocompleteOptions.length > 0 && (
              <div
                ref={autocompleteRef}
                className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto"
                role="listbox"
              >
                {autocompleteOptions.map((option, index) => (
                  <div
                    key={option.id}
                    id={`autocomplete-${index}`}
                    className={`px-3 py-2 cursor-pointer transition-colors ${
                      index === autocompleteIndex ? 'bg-accent' : 'hover:bg-accent/50'
                    }`}
                    onClick={() => handleAutocompleteSelect(option)}
                    role="option"
                    aria-selected={index === autocompleteIndex}
                  >
                    <div className="text-sm font-medium">{option.name}</div>
                    <div className="text-xs text-muted-foreground">{option.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status info */}
          <div className="flex flex-col gap-1">
            <div className="text-sm text-muted-foreground">
              Showing {currentPageClients.length} of {totalClients} clients
              {isFiltered && <span className="text-chart-1 ml-1">• Filtered</span>}
            </div>
            {selectedClientIds.length > 0 && (
              <div className="text-sm font-semibold text-chart-1">
                {selectedClientIds.length} selected
              </div>
            )}
          </div>
        </div>

        {/* Active filters chips */}
        {hasActiveFilters && (
          <div className="flex-shrink-0 flex flex-wrap gap-2">
            {tableState.search && (
              <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                Search: "{tableState.search.substring(0, 20)}..."
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => {
                  setSearchInput('');
                  setTableState(prev => ({ ...prev, search: '', page: 1 }));
                }} />
              </Badge>
            )}
            {tableState.assessmentFilter.map(filter => (
              <Badge key={`assessment-${filter}`} variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                Assessment: {filter}
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => {
                  const newFilter = tableState.assessmentFilter.filter(f => f !== filter);
                  handleFilterChange('assessment', newFilter);
                }} />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={handleClearAllFilters} className="text-chart-1 hover:bg-chart-1/10">
              Clear all
            </Button>
          </div>
        )}

        {/* Mobile cards - scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-3 main-scroll">
          {currentPageClients.map((client) => (
            <div 
              key={client.id} 
              className={`bg-card border rounded-lg p-4 transition-all duration-200 ${
                selectedClientIds.includes(client.id.toString())
                  ? 'bg-blue-50/80' // Regression Fix #4: Subtle background highlight only
                  : 'border-border hover:border-chart-1/30 hover:bg-chart-1/5'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    {onSelectionChange && (
                      <Checkbox
                        checked={selectedClientIds.includes(client.id.toString())}
                        onCheckedChange={(checked) => handleSelectClient(client.id.toString(), checked)}
                        aria-label={`Select ${client.name}`}
                        className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                      />
                    )}
                    <h4 className="text-sm font-semibold truncate">{client.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground truncate ml-7">
                    {client.email}
                  </p>
                </div>
                <CompactStatusTag status={client.sustainability_assessment_status}>
                  {client.sustainability_assessment_status}
                </CompactStatusTag>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm ml-7">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Appetite</p>
                  <p className="font-medium">{client.sustainability_appetite_rating}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Profile</p>
                  <p className="font-medium">{client.sustainability_profile}</p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border mt-3 ml-7">
                <p className="text-xs text-muted-foreground">
                  Next Assessment: <span className="font-medium">{formatDateForDisplay(client.next_assessment_date)}</span>
                </p>
              </div>
              
              <div className="flex items-center gap-2 mt-3 ml-7">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewProfile?.(client.id.toString())}
                  className="touch-target flex-1"
                >
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigate?.('test-distribution')}
                  className="touch-target flex-1"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile pagination */}
        {totalPages > 1 && (
          <div className="flex-shrink-0 border-t border-border bg-card pt-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(tableState.page - 1)}
                disabled={tableState.page === 1}
                className="touch-target"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <span className="text-sm text-muted-foreground">
                Page {tableState.page} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(tableState.page + 1)}
                disabled={tableState.page === totalPages}
                className="touch-target"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop table layout - ≥1024px */}
      <div className="hidden lg:flex flex-col h-full bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        {/* Table/Header/UtilitiesBar - Header utilities bar inside table card */}
        <div className="flex-shrink-0 px-6 py-3 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            {/* Left side - Status and selection info */}
            <div className="flex items-center gap-6">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}–{endIndex} of {totalClients} clients
                {isFiltered && <span className="text-chart-1 font-semibold ml-1">• Filtered</span>}
              </div>
              {selectedClientIds.length > 0 && (
                <div className="text-sm font-semibold text-chart-1">
                  {selectedClientIds.length} selected
                </div>
              )}
            </div>

            {/* Right side - Search input 280px wide */}
            <div className="relative" style={{ width: '280px' }}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search clients by name or email..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowAutocomplete(e.target.value.length > 0);
                  setAutocompleteIndex(-1);
                }}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => setShowAutocomplete(searchInput.length > 0)}
                onBlur={() => setTimeout(() => setShowAutocomplete(false), 150)}
                className="pl-10 w-full"
                aria-label="Search clients"
                aria-expanded={showAutocomplete}
                aria-activedescendant={autocompleteIndex >= 0 ? `autocomplete-${autocompleteIndex}` : undefined}
              />
              
              {/* Table/Header/UtilitiesBar/Autocomplete - Autocomplete dropdown */}
              {showAutocomplete && autocompleteOptions.length > 0 && (
                <div
                  ref={autocompleteRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-[70] max-h-64 overflow-y-auto"
                  role="listbox"
                >
                  {autocompleteOptions.map((option, index) => (
                    <div
                      key={option.id}
                      id={`autocomplete-${index}`}
                      className={`px-3 py-2 cursor-pointer transition-colors ${
                        index === autocompleteIndex ? 'bg-accent' : 'hover:bg-accent/50'
                      }`}
                      onClick={() => handleAutocompleteSelect(option)}
                      role="option"
                      aria-selected={index === autocompleteIndex}
                    >
                      <div className="text-sm font-medium">{option.name}</div>
                      <div className="text-xs text-muted-foreground">{option.email}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters/ChipRow - Active filters summary chips */}
        {hasActiveFilters && (
          <div className="flex-shrink-0 px-6 py-2 border-b border-border bg-muted/20">
            <div className="flex items-center gap-2 flex-wrap">
              {tableState.search && (
                <Badge 
                  variant="secondary" 
                  className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer rounded-full" 
                  onClick={() => {
                    setSearchInput('');
                    setTableState(prev => ({ ...prev, search: '', page: 1 }));
                  }}
                >
                  Search: "{tableState.search.substring(0, 20)}..."
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
              {tableState.assessmentFilter.map(filter => (
                <Badge 
                  key={`assessment-${filter}`} 
                  variant="secondary" 
                  className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer rounded-full" 
                  onClick={() => {
                    const newFilter = tableState.assessmentFilter.filter(f => f !== filter);
                    handleFilterChange('assessment', newFilter);
                  }}
                >
                  Assessment: {filter}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {tableState.appetiteFilter.map(filter => (
                <Badge 
                  key={`appetite-${filter}`} 
                  variant="secondary" 
                  className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer rounded-full" 
                  onClick={() => {
                    const newFilter = tableState.appetiteFilter.filter(f => f !== filter);
                    handleFilterChange('appetite', newFilter);
                  }}
                >
                  Appetite: {filter}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {tableState.profileFilter.map(filter => (
                <Badge 
                  key={`profile-${filter}`} 
                  variant="secondary" 
                  className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer rounded-full" 
                  onClick={() => {
                    const newFilter = tableState.profileFilter.filter(f => f !== filter);
                    handleFilterChange('profile', newFilter);
                  }}
                >
                  Profile: {filter}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {(tableState.dateRange.latest?.from || tableState.dateRange.latest?.to) && (
                <Badge 
                  variant="secondary" 
                  className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer rounded-full" 
                  onClick={() => handleDateRangeChange('latest', {})}
                >
                  Latest Date Filter
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
              {(tableState.dateRange.next?.from || tableState.dateRange.next?.to) && (
                <Badge 
                  variant="secondary" 
                  className="bg-chart-1/10 text-chart-1 border-chart-1/20 hover:bg-chart-1/20 cursor-pointer rounded-full" 
                  onClick={() => handleDateRangeChange('next', {})}
                >
                  Next Date Filter
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={handleClearAllFilters} className="text-chart-1 hover:bg-chart-1/10 rounded-full">
                Clear all
              </Button>
            </div>
          </div>
        )}

        {/* Table container with sticky header and scrollable body */}
        <div className="flex-1 min-h-0 overflow-hidden relative">
          {/* Table/Header - Sticky table header row - 48px height */}
          <div className={`sticky top-0 z-20 bg-white border-b transition-shadow ${
            isScrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.04)]' : 'border-gray-200'
          }`} style={{ height: '48px', borderBottomColor: '#E5E7EB', borderBottomWidth: '1px' }}>
            <div className="flex items-center h-full overflow-x-auto">
              {/* Select column */}
              {onSelectionChange && (
                <div className="flex items-center justify-center" style={{ width: '60px', minWidth: '60px', padding: '0 16px' }}>
                  <Checkbox
                    checked={isAllCurrentPageSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all clients on current page"
                    className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                  />
                </div>
              )}
              
              {/* Table/Header/Cell-Name - Name column - sortable, min-width 200px - Regression Fix #3: Increased padding */}
              <div className="flex items-center justify-between" style={{ width: '200px', minWidth: '200px', padding: '0 24px' }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('name')}
                  className="h-8 p-0 hover:bg-transparent text-sm font-semibold text-secondary-foreground flex items-center gap-2"
                  aria-sort={sortConfig.column === 'name' ? sortConfig.direction : 'none'}
                >
                  Name
                  {sortConfig.column === 'name' && (
                    sortConfig.direction === 'asc' ? 
                      <ChevronUp className="w-3 h-3" /> : 
                      <ChevronDown className="w-3 h-3" />
                  )}
                </Button>
              </div>
              
              {/* Table/Header/Cell-Email - Email column, min-width 180px - Regression Fix #3: Increased padding */}
              <div className="flex items-center" style={{ width: '180px', minWidth: '180px', padding: '0 24px' }}>
                <span className="text-sm font-semibold text-secondary-foreground">Email</span>
              </div>
              
              {/* Table/Header/Cell-Assessment - Assessment column with filter, min-width 160px - Regression Fix #3: Increased padding */}
              <div className="flex items-center justify-between" style={{ width: '160px', minWidth: '160px', padding: '0 24px' }}>
                <span className="text-sm font-semibold text-secondary-foreground">Assessment</span>
                <div style={{ marginLeft: '8px' }}>
                  <FilterDropdown
                    column="Assessment"
                    icon={Filter}
                    options={SUSTAINABILITY_STATUS_OPTIONS}
                    selectedOptions={tableState.assessmentFilter}
                    onChange={(options) => handleFilterChange('assessment', options)}
                    disabled={disableColumnFilters}
                  />
                </div>
              </div>
              
              {/* Table/Header/Cell-Appetite - Appetite column with filter, min-width 120px - Regression Fix #3: Increased padding */}
              <div className="flex items-center justify-between" style={{ width: '120px', minWidth: '120px', padding: '0 24px' }}>
                <span className="text-sm font-semibold text-secondary-foreground">Appetite</span>
                <div style={{ marginLeft: '8px' }}>
                  <FilterDropdown
                    column="Appetite"
                    icon={Filter}
                    options={SUSTAINABILITY_APPETITE_OPTIONS}
                    selectedOptions={tableState.appetiteFilter}
                    onChange={(options) => handleFilterChange('appetite', options)}
                    disabled={disableColumnFilters}
                  />
                </div>
              </div>
              
              {/* Table/Header/Cell-Profile - Profile column with filter, min-width 120px - Regression Fix #3: Increased padding */}
              <div className="flex items-center justify-between" style={{ width: '120px', minWidth: '120px', padding: '0 24px' }}>
                <span className="text-sm font-semibold text-secondary-foreground">Profile</span>
                <div style={{ marginLeft: '8px' }}>
                  <FilterDropdown
                    column="Profile"
                    icon={Filter}
                    options={SUSTAINABILITY_PROFILE_OPTIONS}
                    selectedOptions={tableState.profileFilter}
                    onChange={(options) => handleFilterChange('profile', options)}
                    disabled={disableColumnFilters}
                  />
                </div>
              </div>
              
              {/* Table/Header/Cell-Latest - Latest column - sortable with date filter, min-width 130px - Regression Fix #3: Increased padding */}
              <div className="flex items-center justify-between" style={{ width: '130px', minWidth: '130px', padding: '0 24px' }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('latest')}
                  className="h-8 p-0 hover:bg-transparent text-sm font-semibold text-secondary-foreground flex items-center gap-2"
                  aria-sort={sortConfig.column === 'latest' ? sortConfig.direction : 'none'}
                >
                  Latest
                  {sortConfig.column === 'latest' && (
                    sortConfig.direction === 'asc' ? 
                      <ChevronUp className="w-3 h-3" /> : 
                      <ChevronDown className="w-3 h-3" />
                  )}
                </Button>
                <div style={{ marginLeft: '8px' }}>
                  <DateRangeFilter
                    column="Latest"
                    dateRange={tableState.dateRange.latest}
                    onChange={(range) => handleDateRangeChange('latest', range)}
                    disabled={disableColumnFilters}
                  />
                </div>
              </div>
              
              {/* Table/Header/Cell-NextDue - Next Due column - sortable with date filter, min-width 130px - Regression Fix #3: Increased padding */}
              <div className="flex items-center justify-between" style={{ width: '130px', minWidth: '130px', padding: '0 24px' }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('next')}
                  className="h-8 p-0 hover:bg-transparent text-sm font-semibold text-secondary-foreground flex items-center gap-2"
                  aria-sort={sortConfig.column === 'next' ? sortConfig.direction : 'none'}
                >
                  Next Due
                  {sortConfig.column === 'next' && (
                    sortConfig.direction === 'asc' ? 
                      <ChevronUp className="w-3 h-3" /> : 
                      <ChevronDown className="w-3 h-3" />
                  )}
                </Button>
                <div style={{ marginLeft: '8px' }}>
                  <DateRangeFilter
                    column="Next Due"
                    dateRange={tableState.dateRange.next}
                    onChange={(range) => handleDateRangeChange('next', range)}
                    disabled={disableColumnFilters}
                  />
                </div>
              </div>
              
              {/* Table/Header/Cell-Actions - Sticky Actions column, optimized width - Regression Fix #1: Reduced to 56px (24px icon + 16px padding each side) */}
              <div 
                className="flex items-center justify-center sticky right-0 bg-white border-l border-gray-200" 
                style={{ width: '56px', minWidth: '56px', padding: '0 16px', borderLeftColor: '#E5E7EB', borderLeftWidth: '1px' }}
              >
                <span className="text-sm font-semibold text-secondary-foreground">Actions</span>
              </div>
            </div>
          </div>

          {/* Table/Body - Scrollable table body */}
          <div 
            ref={tableBodyRef}
            className="flex-1 min-h-0 overflow-y-auto main-scroll"
          >
            <div className="divide-y divide-border">
              {currentPageClients.map((client) => (
                <div 
                  key={client.id}
                  className={`flex items-center transition-all duration-200 overflow-x-auto ${
                    selectedClientIds.includes(client.id.toString())
                      ? 'bg-blue-50/80' // Regression Fix #4: Subtle background highlight only, no border outline
                      : 'bg-card hover:bg-[#F5F7FF]' // Clean hover state
                  }`}
                  style={{ height: '48px', minHeight: '48px' }} // Row height 48px
                >
                  {/* Selection column */}
                  {onSelectionChange && (
                    <div className="flex items-center justify-center" style={{ width: '60px', minWidth: '60px', padding: '0 16px' }}>
                      <Checkbox
                        checked={selectedClientIds.includes(client.id.toString())}
                        onCheckedChange={(checked) => handleSelectClient(client.id.toString(), checked)}
                        aria-label={`Select ${client.name}`}
                        className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                      />
                    </div>
                  )}

                  {/* Table/Body/Row/Cell-Name - Name with truncation and tooltip - Regression Fix #3: Increased padding */}
                  <div className="flex items-center truncate" style={{ width: '200px', minWidth: '200px', padding: '0 24px' }}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-sm font-semibold truncate cursor-default" title={client.name}>
                            {client.name}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{client.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Table/Body/Row/Cell-Email - Email with truncation and tooltip - Regression Fix #3: Increased padding */}
                  <div className="flex items-center truncate" style={{ width: '180px', minWidth: '180px', padding: '0 24px' }}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-sm text-muted-foreground truncate cursor-default hover:text-foreground transition-colors" title={client.email}>
                            {client.email}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{client.email}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Table/Body/Row/Cell-Assessment - Assessment Status with compact color coding - Regression Fix #2 */}
                  <div className="flex items-center justify-center" style={{ width: '160px', minWidth: '160px', padding: '0 24px' }}>
                    <CompactStatusTag status={client.sustainability_assessment_status}>
                      {client.sustainability_assessment_status}
                    </CompactStatusTag>
                  </div>

                  {/* Table/Body/Row/Cell-Appetite - Appetite Rating - Regression Fix #3: Increased padding */}
                  <div className="flex items-center justify-center" style={{ width: '120px', minWidth: '120px', padding: '0 24px' }}>
                    <span className="text-sm font-semibold">{client.sustainability_appetite_rating}</span>
                  </div>

                  {/* Table/Body/Row/Cell-Profile - Profile - Regression Fix #3: Increased padding */}
                  <div className="flex items-center justify-center" style={{ width: '120px', minWidth: '120px', padding: '0 24px' }}>
                    <span className="text-sm font-semibold text-chart-1">{client.sustainability_profile}</span>
                  </div>

                  {/* Table/Body/Row/Cell-Latest - Latest Assessment Date - Regression Fix #3: Increased padding */}
                  <div className="flex items-center justify-end" style={{ width: '130px', minWidth: '130px', padding: '0 24px' }}>
                    <span className="text-sm text-muted-foreground">
                      {formatDateForDisplay(client.latest_assessment_date)}
                    </span>
                  </div>

                  {/* Table/Body/Row/Cell-NextDue - Next Assessment Date - Regression Fix #3: Increased padding */}
                  <div className="flex items-center justify-end" style={{ width: '130px', minWidth: '130px', padding: '0 24px' }}>
                    <span className="text-sm text-muted-foreground">
                      {formatDateForDisplay(client.next_assessment_date)}
                    </span>
                  </div>

                  {/* Table/Body/Row/Cell-Actions - Sticky Actions Column with optimized width - Regression Fix #1 */}
                  <div 
                    className="flex items-center justify-center sticky right-0 bg-inherit border-l border-gray-200" 
                    style={{ width: '56px', minWidth: '56px', padding: '0 16px', borderLeftColor: '#E5E7EB', borderLeftWidth: '1px' }}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-chart-1/10 hover:border-chart-1/30 transition-colors"
                          aria-label={`Actions for ${client.name}`}
                          style={{ minHeight: '24px', minWidth: '24px' }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="end" 
                        sideOffset={8}
                        className="z-[70] min-w-[160px]"
                        avoidCollisions={true}
                        side="bottom"
                        role="menu"
                      >
                        <DropdownMenuItem 
                          onClick={() => onViewProfile?.(client.id.toString())}
                          className="hover:bg-chart-1/10 transition-colors cursor-pointer"
                          aria-label={`View profile for ${client.name}`}
                          role="menuitem"
                        >
                          <User className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onNavigate?.('test-distribution')}
                          className="hover:bg-chart-1/10 transition-colors cursor-pointer"
                          aria-label={`Send message to ${client.name}`}
                          role="menuitem"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Send a message
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="hover:bg-chart-1/10 transition-colors cursor-pointer"
                          aria-label={`Edit details for ${client.name}`}
                          role="menuitem"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table/Footer - Fixed pagination bar at bottom of table card - Regression Fix #5: Improved visibility and alignment */}
        {totalPages > 1 && (
          <div className="flex-shrink-0 border-t border-border bg-card px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left - Page size selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Show:</span>
                <select
                  value={tableState.pageSize}
                  onChange={(e) => handlePageSizeChange(parseInt(e.target.value, 10))}
                  className="text-sm border border-border rounded px-3 py-1.5 bg-background font-medium min-h-[36px]"
                >
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              {/* Right - Pagination controls with improved visibility - Regression Fix #5 */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(tableState.page - 1)}
                  disabled={tableState.page === 1}
                  className="min-h-[36px] px-4 font-medium"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                
                {/* Page numbers with smart ellipsis - improved visibility */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                    let pageNum;
                    
                    if (totalPages <= 7) {
                      pageNum = i + 1;
                    } else {
                      if (tableState.page <= 4) {
                        if (i < 5) pageNum = i + 1;
                        else if (i === 5) return <span key="ellipsis1" className="px-2 text-muted-foreground font-medium">...</span>;
                        else pageNum = totalPages;
                      } else if (tableState.page >= totalPages - 3) {
                        if (i === 0) pageNum = 1;
                        else if (i === 1) return <span key="ellipsis2" className="px-2 text-muted-foreground font-medium">...</span>;
                        else pageNum = totalPages - (6 - i);
                      } else {
                        if (i === 0) pageNum = 1;
                        else if (i === 1) return <span key="ellipsis3" className="px-2 text-muted-foreground font-medium">...</span>;
                        else if (i <= 4) pageNum = tableState.page + (i - 3);
                        else if (i === 5) return <span key="ellipsis4" className="px-2 text-muted-foreground font-medium">...</span>;
                        else pageNum = totalPages;
                      }
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === tableState.page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10 h-9 font-medium"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(tableState.page + 1)}
                  disabled={tableState.page === totalPages}
                  className="min-h-[36px] px-4 font-medium"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}