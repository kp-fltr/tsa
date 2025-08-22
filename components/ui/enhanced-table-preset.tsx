import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import { Filter, ChevronDown, X, Menu } from 'lucide-react';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Badge } from './badge';

// Enhanced Table System - F/DS V2 Neutralis Design with Filters and Resizing
// Features: Interactive filters, resizable columns, persisted preferences, mobile responsive

interface TablePreferences {
  columnWidths: Record<string, number>;
  filters: Record<string, string>;
}

interface TablePresetProps {
  children: React.ReactNode;
  className?: string;
  tableId: string; // Unique identifier for persistence
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
  enableFilters?: boolean;
  filterOptions?: Record<string, string[]>;
  onFiltersChange?: (filters: Record<string, string>) => void;
  activeFilters?: Record<string, string>;
  enableColumnResizing?: boolean;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  isHeader?: boolean;
  width?: 'narrow' | 'medium' | 'wide' | 'auto';
  align?: 'left' | 'center' | 'right';
  sticky?: 'left' | 'right';
  columnKey?: string; // For resizing and filtering
  filterable?: boolean;
  filterType?: 'status' | 'rating' | 'profile' | 'text';
  resizable?: boolean;
  minWidth?: number;
  maxWidth?: number;
}

interface StatusTagProps {
  status: 'Updated' | 'Outstanding' | 'Overdue' | 'Default';
  children: React.ReactNode;
}

interface FilterDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  filterType: 'status' | 'rating' | 'profile' | 'text';
}

// Column width mapping for consistent proportions
const COLUMN_WIDTHS = {
  narrow: 80,    // Dates, numbers
  medium: 128,   // Status, ratings
  wide: 192,     // Names, emails
  auto: 150     // Flexible content default
};

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

// Filter dropdown component with consistent styling
const FilterDropdown = forwardRef<HTMLDivElement, FilterDropdownProps>(
  ({ options, value, onChange, placeholder, filterType }, ref) => {
    const getFilterStyles = (type: string) => {
      switch (type) {
        case 'status':
          return 'border-chart-1/30 focus:border-chart-1 focus:ring-chart-1/20';
        case 'rating':
          return 'border-chart-2/30 focus:border-chart-2 focus:ring-chart-2/20';
        case 'profile':
          return 'border-chart-3/30 focus:border-chart-3 focus:ring-chart-3/20';
        default:
          return 'border-border focus:border-chart-1 focus:ring-chart-1/20';
      }
    };

    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          ref={ref}
          className={`
            h-8 
            text-xs 
            font-medium
            border
            rounded
            ${getFilterStyles(filterType)}
            transition-colors
            hover:bg-chart-1/5
          `}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="min-w-[120px]">
          <SelectItem value="all" className="text-xs">All {placeholder}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option.toLowerCase()} className="text-xs">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);
FilterDropdown.displayName = "FilterDropdown";

// Mobile filter menu component
const MobileFilterMenu = forwardRef<HTMLDivElement, {
  filterOptions: Record<string, string[]>;
  activeFilters: Record<string, string>;
  onFiltersChange: (filters: Record<string, string>) => void;
}>(({ filterOptions, activeFilters, onFiltersChange }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const activeFilterCount = Object.values(activeFilters).filter(v => v !== 'all').length;

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...activeFilters, [key]: value });
  };

  const clearAllFilters = () => {
    const clearedFilters = Object.keys(activeFilters).reduce((acc, key) => {
      acc[key] = 'all';
      return acc;
    }, {} as Record<string, string>);
    onFiltersChange(clearedFilters);
  };

  return (
    <div ref={ref} className="md:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="h-10 px-3 border-2 border-border hover:bg-chart-1/5 hover:border-chart-1/30 relative transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Filters</span>
            {activeFilterCount > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-chart-1 text-white text-xs"
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-card-foreground">Filter Options</h4>
              {activeFilterCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear All
                </Button>
              )}
            </div>
            
            {Object.entries(filterOptions).map(([key, options]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium text-card-foreground capitalize">{key}</label>
                <FilterDropdown
                  options={options}
                  value={activeFilters[key] || 'all'}
                  onChange={(value) => handleFilterChange(key, value)}
                  placeholder={key}
                  filterType={key as 'status' | 'rating' | 'profile' | 'text'}
                />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});
MobileFilterMenu.displayName = "MobileFilterMenu";

// Column resizer component
const ColumnResizer = forwardRef<HTMLDivElement, {
  onResize: (deltaX: number) => void;
  disabled?: boolean;
}>(({ onResize, disabled = false }, ref) => {
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startXRef.current;
      onResize(deltaX);
      startXRef.current = e.clientX;
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onResize, disabled]);

  if (disabled) return null;

  return (
    <div
      ref={ref}
      className={`
        absolute 
        right-0 
        top-0 
        bottom-0 
        w-1 
        cursor-col-resize 
        hover:bg-chart-1 
        ${isResizing ? 'bg-chart-1' : 'bg-transparent'}
        transition-colors
        group-hover:bg-chart-1/50
      `}
      onMouseDown={handleMouseDown}
    />
  );
});
ColumnResizer.displayName = "ColumnResizer";

// Main table container with enhanced functionality
export const EnhancedTablePreset = forwardRef<HTMLDivElement, TablePresetProps>(
  ({ children, className = "", tableId }, ref) => {
    const [preferences, setPreferences] = useState<TablePreferences>(() => 
      getStoredPreferences(tableId)
    );

    useEffect(() => {
      storePreferences(tableId, preferences);
    }, [tableId, preferences]);

    return (
      <div 
        ref={ref}
        className={`
          bg-card
          border
          border-border
          rounded-lg 
          overflow-hidden
          w-full
          ${className}
        `}
        data-table-id={tableId}
      >
        {React.Children.map(children, child => 
          React.isValidElement(child) 
            ? React.cloneElement(child, { preferences, setPreferences } as any)
            : child
        )}
      </div>
    );
  }
);
EnhancedTablePreset.displayName = "EnhancedTablePreset";

// Enhanced table header with filtering
export const EnhancedTableHeader = forwardRef<HTMLDivElement, TableHeaderProps & {
  preferences?: TablePreferences;
  setPreferences?: React.Dispatch<React.SetStateAction<TablePreferences>>;
}>(({ 
  children, 
  className = "", 
  enableFilters = false,
  filterOptions = {},
  onFiltersChange,
  activeFilters = {},
  enableColumnResizing = true,
  preferences,
  setPreferences
}, ref) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="space-y-2">
      {/* Filter Row - Desktop */}
      {enableFilters && !isMobile && Object.keys(filterOptions).length > 0 && (
        <div className="p-3 bg-muted/30 border-b border-border flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
            <Filter className="w-4 h-4" />
            <span>Filters:</span>
          </div>
          
          {Object.entries(filterOptions).map(([key, options]) => (
            <FilterDropdown
              key={key}
              options={options}
              value={activeFilters[key] || 'all'}
              onChange={(value) => onFiltersChange?.({ ...activeFilters, [key]: value })}
              placeholder={key}
              filterType={key as 'status' | 'rating' | 'profile' | 'text'}
            />
          ))}
          
          {Object.values(activeFilters).some(v => v !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const clearedFilters = Object.keys(activeFilters).reduce((acc, key) => {
                  acc[key] = 'all';
                  return acc;
                }, {} as Record<string, string>);
                onFiltersChange?.(clearedFilters);
              }}
              className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      )}

      {/* Mobile Filter Menu */}
      {enableFilters && isMobile && Object.keys(filterOptions).length > 0 && (
        <div className="p-3 bg-muted/30 border-b border-border">
          <MobileFilterMenu
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            onFiltersChange={onFiltersChange || (() => {})}
          />
        </div>
      )}

      {/* Table Header */}
      <div 
        ref={ref}
        className={`
          bg-muted/20
          flex 
          items-center
          min-h-[48px]
          h-[48px]
          border-b
          border-border
          sticky
          top-0
          z-10
          ${className}
        `}
      >
        {React.Children.map(children, (child, index) => 
          React.isValidElement(child) 
            ? React.cloneElement(child, { 
                preferences, 
                setPreferences,
                enableColumnResizing: enableColumnResizing && !isMobile,
                isFirstColumn: index === 0,
                isLastColumn: index === React.Children.count(children) - 1
              } as any)
            : child
        )}
      </div>
    </div>
  );
});
EnhancedTableHeader.displayName = "EnhancedTableHeader";

// Table body row with consistent height and hover states
export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
  ({ children, className = "", onClick, selected = false }, ref) => {
    return (
      <div 
        ref={ref}
        className={`
          bg-card
          flex 
          items-center
          min-h-[48px]
          h-[48px]
          border-b
          border-border
          last:border-b-0
          hover:bg-chart-1/5
          transition-colors
          duration-200
          ${onClick ? 'cursor-pointer' : ''}
          ${selected ? 'bg-chart-1/10 border-chart-1/30' : ''}
          ${className}
        `}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);
TableRow.displayName = "TableRow";

// Enhanced table cell with resizing support
export const TableCell = forwardRef<HTMLDivElement, TableCellProps & {
  preferences?: TablePreferences;
  setPreferences?: React.Dispatch<React.SetStateAction<TablePreferences>>;
  enableColumnResizing?: boolean;
  isFirstColumn?: boolean;
  isLastColumn?: boolean;
}>(({ 
  children, 
  className = "", 
  isHeader = false, 
  width = 'auto', 
  align = 'left', 
  sticky,
  columnKey,
  resizable = true,
  minWidth = 60,
  maxWidth = 400,
  preferences,
  setPreferences,
  enableColumnResizing = true,
  isFirstColumn = false,
  isLastColumn = false
}, ref) => {
  const defaultWidth = COLUMN_WIDTHS[width];
  const storedWidth = columnKey && preferences?.columnWidths[columnKey];
  const currentWidth = storedWidth || defaultWidth;

  const alignClass = align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start';
  const textAlign = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  
  const stickyClass = sticky === 'left' ? 'sticky left-0 z-20 bg-inherit' : 
                     sticky === 'right' ? 'sticky right-0 z-20 bg-inherit border-l border-border' : '';

  const handleResize = useCallback((deltaX: number) => {
    if (!columnKey || !setPreferences) return;
    
    const newWidth = Math.max(minWidth, Math.min(maxWidth, currentWidth + deltaX));
    
    setPreferences(prev => ({
      ...prev,
      columnWidths: {
        ...prev.columnWidths,
        [columnKey]: newWidth
      }
    }));
  }, [columnKey, setPreferences, currentWidth, minWidth, maxWidth]);

  return (
    <div 
      ref={ref}
      className={`
        relative
        group
        flex 
        items-center
        h-[48px]
        px-4
        ${alignClass}
        ${textAlign}
        ${stickyClass}
        ${isHeader ? 'font-semibold text-card-foreground' : 'text-muted-foreground'}
        ${className}
      `}
      style={{ 
        width: currentWidth,
        minWidth: currentWidth,
        maxWidth: currentWidth
      }}
    >
      {children}
      
      {/* Column resizer - only on headers and when resizing is enabled */}
      {isHeader && resizable && enableColumnResizing && !isLastColumn && (
        <ColumnResizer onResize={handleResize} />
      )}
    </div>
  );
});
TableCell.displayName = "TableCell";

// Status tag with consistent styling
export const StatusTag = forwardRef<HTMLDivElement, StatusTagProps>(
  ({ status, children }, ref) => {
    const getStatusStyles = (status: string) => {
      switch (status) {
        case 'Updated':
          return 'bg-chart-2/10 border-chart-2/30 text-chart-2';
        case 'Outstanding':
          return 'bg-chart-3/10 border-chart-3/30 text-chart-3';
        case 'Overdue':
          return 'bg-chart-4/10 border-chart-4/30 text-chart-4';
        default:
          return 'bg-muted border-border text-muted-foreground';
      }
    };

    return (
      <div 
        ref={ref}
        className={`
          inline-flex
          items-center
          px-2 
          py-1
          rounded
          border
          text-xs
          font-medium
          whitespace-nowrap
          ${getStatusStyles(status)}
        `}
      >
        {children}
      </div>
    );
  }
);
StatusTag.displayName = "StatusTag";

// Selection checkbox for multi-select functionality
export const TableCheckbox = forwardRef<HTMLInputElement, {
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
}>(({ checked, onChange, indeterminate = false }, ref) => {
  React.useEffect(() => {
    if (ref && typeof ref === 'object' && ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="
        w-4 
        h-4 
        rounded 
        border 
        border-border 
        bg-card 
        text-chart-1
        transition-all
        duration-200
        hover:border-chart-1/50
        focus:border-chart-1
        focus:ring-2 
        focus:ring-chart-1/20
        focus:outline-none
        disabled:cursor-not-allowed
        disabled:opacity-50
        cursor-pointer
      "
    />
  );
});
TableCheckbox.displayName = "TableCheckbox";

// Standard action button for tables
export const TableAction = forwardRef<HTMLButtonElement, {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'ghost' | 'outline';
  className?: string;
}>(({ children, onClick, variant = 'ghost', className = "" }, ref) => {
  const variantClass = variant === 'outline' ? 
    'border border-border bg-card hover:bg-chart-1/5' : 
    'hover:bg-chart-1/8';

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`
        inline-flex
        items-center
        justify-center
        w-8
        h-8
        rounded
        transition-colors
        duration-200
        text-muted-foreground
        hover:text-card-foreground
        ${variantClass}
        ${className}
      `}
    >
      {children}
    </button>
  );
});
TableAction.displayName = "TableAction";

// Filter utilities for table data
export const createTableFilters = (data: any[], filters: Record<string, string>) => {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === 'all') return true;
      
      const itemValue = item[key];
      if (typeof itemValue === 'string') {
        return itemValue.toLowerCase() === value.toLowerCase();
      }
      
      return itemValue === value;
    });
  });
};

// Export all components
export {
  EnhancedTablePreset as TablePreset,
  EnhancedTableHeader as TableHeader,
  FilterDropdown,
  MobileFilterMenu,
  ColumnResizer
};