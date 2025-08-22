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
  Check,
  Send,
  Eye,
  Clock
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

// Types and Interfaces
interface DataGridState {
  page: number;
  pageSize: number;
  search: string;
  filters: Record<string, string[]>;
  dateFilters: Record<string, { from?: Date; to?: Date }>;
  sort: string; // format: "column:direction"
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

interface ColumnConfig {
  key: string;
  label: string;
  width: number;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'select' | 'date';
  filterOptions?: string[];
  render?: 'text' | 'pill' | 'date';
}

interface DataGridColumn {
  key: string;
  label: string;
  width: number;
  minWidth: number;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'select' | 'date';
  filterOptions?: string[];
  render?: 'text' | 'pill' | 'date';
  align?: 'left' | 'center' | 'right';
}

interface DataGridRow {
  id: string | number;
  [key: string]: any;
}

interface DataGridProps {
  // Variant Properties
  viewport?: 'desktop' | 'mobile';
  paginationMode?: 'paginate' | 'scroll';
  pageSize?: 20 | 50 | 100; // This will be overridden by responsive logic
  showFiltersSummary?: boolean;
  hasSelection?: boolean;
  hasActions?: boolean;
  rowDensity?: 'compact' | 'comfortable';
  columnsPreset?: 'clientDirectory' | 'testDistribution';
  searchEnabled?: boolean;
  filtersEnabled?: boolean;
  stickyActions?: boolean;
  loadMoreVisible?: boolean; // mobile only
  
  // Data Properties
  data?: DataGridRow[];
  loading?: boolean;
  
  // Event Handlers
  onNavigate?: (view: string) => void;
  onViewProfile?: (id: string) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  onLoadMore?: () => void;
  
  // State
  selectedIds?: string[];
  isRowSelected?: boolean; // for single row specimen
}

// Column Presets
const COLUMN_PRESETS: Record<string, DataGridColumn[]> = {
  clientDirectory: [
    {
      key: 'name',
      label: 'Name',
      width: 240,
      minWidth: 240,
      sortable: true,
      render: 'text',
      align: 'left'
    },
    {
      key: 'email',
      label: 'Email',
      width: 260,
      minWidth: 260,
      render: 'text',
      align: 'left'
    },
    {
      key: 'assessment',
      label: 'Assessment',
      width: 120,
      minWidth: 120,
      filterable: true,
      filterType: 'select',
      filterOptions: ['Updated', 'Outstanding', 'Overdue'],
      render: 'pill',
      align: 'center'
    },
    {
      key: 'appetite',
      label: 'Appetite',
      width: 110,
      minWidth: 110,
      filterable: true,
      filterType: 'select',
      filterOptions: ['Low', 'Medium', 'High', 'N/A'],
      render: 'text',
      align: 'center'
    },
    {
      key: 'profile',
      label: 'Profile',
      width: 100,
      minWidth: 100,
      filterable: true,
      filterType: 'select',
      filterOptions: ['A', 'B', 'C', 'D', 'E'],
      render: 'text',
      align: 'center'
    },
    {
      key: 'latest',
      label: 'Latest',
      width: 120,
      minWidth: 120,
      sortable: true,
      filterable: true,
      filterType: 'date',
      render: 'date',
      align: 'right'
    },
    {
      key: 'nextDue',
      label: 'Next Due',
      width: 120,
      minWidth: 120,
      sortable: true,
      filterable: true,
      filterType: 'date',
      render: 'date',
      align: 'right'
    }
  ],
  testDistribution: [
    {
      key: 'name',
      label: 'Name',
      width: 240,
      minWidth: 240,
      sortable: true,
      render: 'text',
      align: 'left'
    },
    {
      key: 'email',
      label: 'Email',
      width: 260,
      minWidth: 260,
      render: 'text',
      align: 'left'
    },
    {
      key: 'status',
      label: 'Status',
      width: 120,
      minWidth: 120,
      filterable: true,
      filterType: 'select',
      filterOptions: ['Sent', 'Delivered', 'Opened', 'Completed', 'Bounced'],
      render: 'pill',
      align: 'center'
    },
    {
      key: 'sent',
      label: 'Sent',
      width: 100,
      minWidth: 100,
      render: 'text',
      align: 'center'
    },
    {
      key: 'opened',
      label: 'Opened',
      width: 100,
      minWidth: 100,
      render: 'text',
      align: 'center'
    },
    {
      key: 'completed',
      label: 'Completed',
      width: 120,
      minWidth: 120,
      render: 'text',
      align: 'center'
    },
    {
      key: 'lastActivity',
      label: 'Last Activity',
      width: 140,
      minWidth: 140,
      sortable: true,
      filterable: true,
      filterType: 'date',
      render: 'date',
      align: 'right'
    }
  ]
};

// Status Pills Component
function StatusPill({ status, preset }: { status: string; preset: string }) {
  const getStatusColor = (status: string, preset: string) => {
    if (preset === 'clientDirectory') {
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
    } else { // testDistribution
      switch (status) {
        case 'Sent':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Delivered':
          return 'bg-cyan-100 text-cyan-800 border-cyan-200';
        case 'Opened':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'Completed':
          return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        case 'Bounced':
          return 'bg-red-100 text-red-800 border-red-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
  };

  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full border ${getStatusColor(status, preset)}`}
          style={{ 
            fontSize: '11px', 
            lineHeight: '16px',
            height: '24px',
            fontWeight: '500'
          }}>
      {status}
    </span>
  );
}

// Filter Dropdown Component
function FilterDropdown({ 
  column, 
  options, 
  selectedOptions, 
  onChange,
  disabled = false
}: {
  column: DataGridColumn;
  options: string[];
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isActive = selectedOptions.length > 0;
  const IconComponent = column.filterType === 'date' ? Calendar : Filter;

  if (disabled || !column.filterable) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`relative h-6 w-6 p-0 hover:bg-chart-1/10 transition-colors ${
            isActive ? 'text-chart-1' : 'text-muted-foreground hover:text-chart-1/80'
          }`}
          aria-label={`Filter ${column.label}`}
          style={{ minHeight: '24px', minWidth: '24px' }}
        >
          <IconComponent className="h-3 w-3" />
          {isActive && (
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-chart-1 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0 z-[70]" align="start" sideOffset={4}>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Filter {column.label}</h4>
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

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <div
                  key={option}
                  className="flex items-center space-x-2 p-1 rounded hover:bg-accent cursor-pointer"
                  onClick={() => {
                    if (isSelected) {
                      onChange(selectedOptions.filter(item => item !== option));
                    } else {
                      onChange([...selectedOptions, option]);
                    }
                  }}
                >
                  <Checkbox
                    checked={isSelected}
                    className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                  />
                  <label className="text-sm flex-1 cursor-pointer">
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Date formatter
const formatDate = (dateString: string | Date) => {
  if (!dateString) return '--';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

// Sample Data Generator
const generateSampleData = (preset: string, count: number = 50): DataGridRow[] => {
  const data: DataGridRow[] = [];
  
  const names = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Emma Brown', 'Frank Miller', 'Grace Lee', 'Henry Chen', 'Ivy Rodriguez', 'Jack Thompson'];
  const domains = ['company.com', 'business.org', 'firm.net', 'corp.com', 'group.co'];
  
  for (let i = 0; i < count; i++) {
    const name = names[i % names.length];
    const email = `${name.toLowerCase().replace(' ', '.')}@${domains[i % domains.length]}`;
    
    if (preset === 'clientDirectory') {
      data.push({
        id: i + 1,
        name,
        email,
        assessment: ['Updated', 'Outstanding', 'Overdue'][i % 3],
        appetite: ['Low', 'Medium', 'High', 'N/A'][i % 4],
        profile: ['A', 'B', 'C', 'D', 'E'][i % 5],
        latest: new Date(2024, 0, 1 + (i * 2)),
        nextDue: new Date(2024, 2, 1 + (i * 3))
      });
    } else {
      data.push({
        id: i + 1,
        name,
        email,
        status: ['Sent', 'Delivered', 'Opened', 'Completed', 'Bounced'][i % 5],
        sent: '✓',
        opened: i % 3 === 0 ? '✓' : '--',
        completed: i % 4 === 0 ? '✓' : '--',
        lastActivity: new Date(2024, 1, 1 + (i * 2))
      });
    }
  }
  
  return data;
};

// Helper function to get responsive page size
const getResponsivePageSize = (viewport: string, windowHeight?: number) => {
  if (viewport === 'mobile') {
    return 10; // Smaller page size for mobile
  }
  
  // For desktop, calculate based on available height
  if (windowHeight) {
    const availableHeight = windowHeight - 300; // Account for header, filters, pagination
    const rowHeight = 48; // Compact row height
    const calculatedRows = Math.floor(availableHeight / rowHeight);
    
    // Clamp between reasonable values
    return Math.min(Math.max(calculatedRows, 15), 50);
  }
  
  // Default fallback
  return 25;
};

// Main DataGrid Component
export function DataGrid({
  viewport = 'desktop',
  paginationMode = viewport === 'desktop' ? 'paginate' : 'scroll',
  pageSize: propPageSize, // This will be overridden
  showFiltersSummary = true,
  hasSelection = true,
  hasActions = true,
  rowDensity = 'compact',
  columnsPreset = 'clientDirectory',
  searchEnabled = true,
  filtersEnabled = true,
  stickyActions = true,
  loadMoreVisible = false,
  data,
  loading = false,
  onNavigate,
  onViewProfile,
  onSelectionChange,
  onLoadMore,
  selectedIds = [],
  isRowSelected = false
}: DataGridProps) {
  // Calculate responsive page size
  const [windowHeight, setWindowHeight] = useState<number>();
  const responsivePageSize = useMemo(() => {
    return getResponsivePageSize(viewport, windowHeight);
  }, [viewport, windowHeight]);

  // State Management
  const [state, setState] = useState<DataGridState>({
    page: 1,
    pageSize: responsivePageSize,
    search: '',
    filters: {},
    dateFilters: {},
    sort: ''
  });
  
  const [searchInput, setSearchInput] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteIndex, setAutocompleteIndex] = useState(-1);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const tableBodyRef = useRef<HTMLDivElement>(null);
  const headerCheckboxRef = useRef<HTMLButtonElement>(null);

  // Update page size when responsive size changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      pageSize: responsivePageSize,
      page: 1 // Reset to first page when page size changes
    }));
  }, [responsivePageSize]);

  // Track window height for responsive page sizing
  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    
    updateWindowHeight();
    window.addEventListener('resize', updateWindowHeight);
    return () => window.removeEventListener('resize', updateWindowHeight);
  }, []);

  // Get columns configuration
  const columns = COLUMN_PRESETS[columnsPreset] || COLUMN_PRESETS.clientDirectory;
  
  // Generate or use provided data
  const tableData = data || generateSampleData(columnsPreset, 100);
  
  // Row height based on density
  const rowHeight = rowDensity === 'compact' ? 48 : 56;
  
  // Apply filters and sorting
  const processedData = useMemo(() => {
    let filtered = [...tableData];
    
    // Apply search
    if (state.search.trim()) {
      const searchTerm = state.search.toLowerCase();
      filtered = filtered.filter(row => 
        String(row.name || '').toLowerCase().includes(searchTerm) ||
        String(row.email || '').toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply column filters
    Object.entries(state.filters).forEach(([columnKey, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(row => values.includes(String(row[columnKey])));
      }
    });
    
    // Apply sorting
    if (state.sort) {
      const [column, direction] = state.sort.split(':');
      filtered.sort((a, b) => {
        const aVal = a[column];
        const bVal = b[column];
        
        let comparison = 0;
        if (aVal < bVal) comparison = -1;
        if (aVal > bVal) comparison = 1;
        
        return direction === 'desc' ? -comparison : comparison;
      });
    }
    
    return filtered;
  }, [tableData, state]);
  
  // Pagination
  const totalPages = Math.ceil(processedData.length / state.pageSize);
  const startIndex = (state.page - 1) * state.pageSize;
  const endIndex = Math.min(startIndex + state.pageSize, processedData.length);
  const currentPageData = paginationMode === 'paginate' 
    ? processedData.slice(startIndex, endIndex)
    : processedData.slice(0, state.page * state.pageSize);

  // Handle scroll for sticky header shadow
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

  // Selection logic
  const currentPageIds = currentPageData.map(row => String(row.id));
  const isAllCurrentPageSelected = currentPageIds.length > 0 && 
    currentPageIds.every(id => selectedIds.includes(id));
  const isIndeterminate = selectedIds.some(id => currentPageIds.includes(id)) && !isAllCurrentPageSelected;

  // Handle indeterminate state properly with useEffect
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  // Event Handlers
  const handleSort = useCallback((columnKey: string) => {
    const [currentColumn, currentDirection] = state.sort.split(':');
    const newDirection = currentColumn === columnKey && currentDirection === 'asc' ? 'desc' : 'asc';
    setState(prev => ({
      ...prev,
      sort: `${columnKey}:${newDirection}`,
      page: 1
    }));
  }, [state.sort]);

  const handleFilter = useCallback((columnKey: string, values: string[]) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, [columnKey]: values },
      page: 1
    }));
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setState(prev => ({ ...prev, page: newPage }));
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTop = 0;
    }
  }, []);

  const handleSelectAll = useCallback((checked: boolean) => {
    if (!onSelectionChange) return;
    
    if (checked) {
      const newSelected = [...new Set([...selectedIds, ...currentPageIds])];
      onSelectionChange(newSelected);
    } else {
      const newSelected = selectedIds.filter(id => !currentPageIds.includes(id));
      onSelectionChange(newSelected);
    }
  }, [onSelectionChange, selectedIds, currentPageIds]);

  const handleSelectRow = useCallback((id: string, checked: boolean) => {
    if (!onSelectionChange) return;
    
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds.filter(selectedId => selectedId !== id));
    }
  }, [onSelectionChange, selectedIds]);

  // Parse sort config
  const sortConfig: SortConfig = useMemo(() => {
    if (!state.sort) return { column: null, direction: 'asc' };
    const [column, direction] = state.sort.split(':');
    return { column, direction: (direction as 'asc' | 'desc') || 'asc' };
  }, [state.sort]);

  // Active filters count
  const activeFiltersCount = Object.values(state.filters).reduce((sum, values) => sum + values.length, 0) +
    (state.search ? 1 : 0);
  const hasActiveFilters = activeFiltersCount > 0;

  // Render cell content
  const renderCell = (row: DataGridRow, column: DataGridColumn) => {
    const value = row[column.key];
    
    switch (column.render) {
      case 'pill':
        return <StatusPill status={String(value)} preset={columnsPreset} />;
      case 'date':
        return <span className="text-sm text-muted-foreground">{formatDate(value)}</span>;
      default:
        return <span className="text-sm font-semibold">{String(value || '--')}</span>;
    }
  };

  // Mobile Card Layout
  if (viewport === 'mobile') {
    return (
      <div className="h-full flex flex-col space-y-4">
        {/* Mobile Search */}
        {searchEnabled && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 w-full touch-target"
            />
          </div>
        )}

        {/* Mobile Cards */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-3 main-scroll">
          {currentPageData.map((row) => (
            <div 
              key={row.id}
              className={`bg-card border rounded-lg p-4 ${
                selectedIds.includes(String(row.id))
                  ? 'bg-blue-50/80 border-chart-1/40'
                  : 'border-border hover:border-chart-1/30'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    {hasSelection && (
                      <Checkbox
                        checked={selectedIds.includes(String(row.id))}
                        onCheckedChange={(checked) => handleSelectRow(String(row.id), checked)}
                        className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                      />
                    )}
                    <h4 className="text-sm font-semibold truncate">{row.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground truncate ml-7">{row.email}</p>
                </div>
                {columns.find(col => col.render === 'pill') && (
                  <StatusPill 
                    status={row[columns.find(col => col.render === 'pill')?.key || '']} 
                    preset={columnsPreset} 
                  />
                )}
              </div>
              
              {hasActions && (
                <div className="flex items-center gap-2 mt-3 ml-7">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewProfile?.(String(row.id))}
                    className="touch-target flex-1"
                  >
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Pagination */}
        {paginationMode === 'paginate' && totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Page {state.page} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(state.page - 1)}
                disabled={state.page === 1}
                className="touch-target"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(state.page + 1)}
                disabled={state.page === totalPages}
                className="touch-target"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {paginationMode === 'scroll' && loadMoreVisible && (
          <Button onClick={onLoadMore} className="w-full touch-target">
            Load More
          </Button>
        )}
      </div>
    );
  }

  // Desktop Table Layout
  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      {/* Header Utilities Bar */}
      <div className="flex-shrink-0 px-6 py-3 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}–{endIndex} of {processedData.length} items
            </div>
            {selectedIds.length > 0 && (
              <div className="text-sm font-semibold text-chart-1">
                {selectedIds.length} selected
              </div>
            )}
          </div>

          {searchEnabled && (
            <div className="relative" style={{ width: '280px' }}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setState(prev => ({ ...prev, search: e.target.value, page: 1 }));
                }}
                className="pl-10 w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Filters Summary */}
      {showFiltersSummary && hasActiveFilters && (
        <div className="flex-shrink-0 px-6 py-2 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2 flex-wrap">
            {state.search && (
              <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20 rounded-full">
                Search: "{state.search}"
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => {
                  setSearchInput('');
                  setState(prev => ({ ...prev, search: '', page: 1 }));
                }} />
              </Badge>
            )}
            {Object.entries(state.filters).map(([key, values]) =>
              values.map(value => (
                <Badge key={`${key}-${value}`} variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20 rounded-full">
                  {columns.find(col => col.key === key)?.label}: {value}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => {
                    const newValues = values.filter(v => v !== value);
                    handleFilter(key, newValues);
                  }} />
                </Badge>
              ))
            )}
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        {/* Sticky Header */}
        <div 
          className={`sticky top-0 z-20 bg-white border-b transition-shadow ${
            isScrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.04)]' : 'border-gray-200'
          }`} 
          style={{ height: '48px', borderBottomColor: '#E5E7EB' }}
        >
          <div className="flex items-center h-full overflow-x-auto">
            {/* Selection Column */}
            {hasSelection && (
              <div className="flex items-center justify-center" style={{ width: '60px', minWidth: '60px', padding: '0 16px' }}>
                <Checkbox
                  ref={headerCheckboxRef}
                  checked={isAllCurrentPageSelected}
                  onCheckedChange={handleSelectAll}
                  className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                />
              </div>
            )}

            {/* Data Columns */}
            {columns.map((column) => (
              <div
                key={column.key}
                className="flex items-center justify-between"
                style={{ 
                  width: `${column.width}px`, 
                  minWidth: `${column.minWidth}px`, 
                  padding: '0 16px',
                  marginRight: '24px' 
                }}
              >
                <div className="flex items-center gap-2">
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(column.key)}
                      className="h-8 p-0 hover:bg-transparent text-sm font-semibold text-secondary-foreground flex items-center gap-2"
                    >
                      {column.label}
                      {sortConfig.column === column.key && (
                        sortConfig.direction === 'asc' ? 
                          <ChevronUp className="w-3 h-3" /> : 
                          <ChevronDown className="w-3 h-3" />
                      )}
                    </Button>
                  ) : (
                    <span className="text-sm font-semibold text-secondary-foreground">
                      {column.label}
                    </span>
                  )}
                </div>
                
                {filtersEnabled && column.filterable && (
                  <FilterDropdown
                    column={column}
                    options={column.filterOptions || []}
                    selectedOptions={state.filters[column.key] || []}
                    onChange={(values) => handleFilter(column.key, values)}
                  />
                )}
              </div>
            ))}

            {/* Actions Column */}
            {hasActions && stickyActions && (
              <div 
                className="flex items-center justify-center sticky right-0 bg-white border-l border-gray-200"
                style={{ width: '64px', minWidth: '64px', padding: '0 16px' }}
              >
                <span className="text-sm font-semibold text-secondary-foreground">Actions</span>
              </div>
            )}
          </div>
        </div>

        {/* Table Body */}
        <div ref={tableBodyRef} className="flex-1 min-h-0 overflow-y-auto main-scroll">
          <div className="divide-y divide-border">
            {currentPageData.map((row) => (
              <div
                key={row.id}
                className={`flex items-center transition-all duration-200 ${
                  selectedIds.includes(String(row.id))
                    ? 'bg-blue-50/80'
                    : 'bg-card hover:bg-[#F5F7FF]'
                }`}
                style={{ height: `${rowHeight}px`, minHeight: `${rowHeight}px` }}
              >
                {/* Selection Column */}
                {hasSelection && (
                  <div className="flex items-center justify-center" style={{ width: '60px', minWidth: '60px', padding: '0 16px' }}>
                    <Checkbox
                      checked={selectedIds.includes(String(row.id))}
                      onCheckedChange={(checked) => handleSelectRow(String(row.id), checked)}
                      className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                    />
                  </div>
                )}

                {/* Data Columns */}
                {columns.map((column) => (
                  <div
                    key={column.key}
                    className={`flex items-center truncate ${
                      column.align === 'center' ? 'justify-center' :
                      column.align === 'right' ? 'justify-end' : 'justify-start'
                    }`}
                    style={{ 
                      width: `${column.width}px`, 
                      minWidth: `${column.minWidth}px`, 
                      padding: '0 16px',
                      marginRight: '24px' 
                    }}
                  >
                    {column.key === 'name' || column.key === 'email' ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="truncate cursor-default block" title={String(row[column.key])}>
                              {renderCell(row, column)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{String(row[column.key])}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      renderCell(row, column)
                    )}
                  </div>
                ))}

                {/* Actions Column */}
                {hasActions && stickyActions && (
                  <div 
                    className="flex items-center justify-center sticky right-0 bg-inherit border-l border-gray-200"
                    style={{ width: '64px', minWidth: '64px', padding: '0 16px' }}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-chart-1/10 transition-colors"
                          style={{ minHeight: '24px', minWidth: '24px' }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="z-[70] min-w-[160px]">
                        <DropdownMenuItem onClick={() => onViewProfile?.(String(row.id))}>
                          <User className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onNavigate?.('campaign-distribution')}>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Send a message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Pagination */}
      {paginationMode === 'paginate' && totalPages > 1 && (
        <div className="flex-shrink-0 border-t border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}–{endIndex} of {processedData.length} items ({state.pageSize} per page)
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(state.page - 1)}
                disabled={state.page === 1}
                className="px-4 font-medium"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else {
                    if (state.page <= 4) {
                      pageNum = i + 1;
                    } else if (state.page >= totalPages - 3) {
                      pageNum = totalPages - 6 + i;
                    } else {
                      pageNum = state.page - 3 + i;
                    }
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === state.page ? "default" : "outline"}
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
                onClick={() => handlePageChange(state.page + 1)}
                disabled={state.page === totalPages}
                className="px-4 font-medium"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export default component
export default DataGrid;