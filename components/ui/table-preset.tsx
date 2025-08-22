import React, { forwardRef } from 'react';

// Standardized Table System - F/DS V2 Neutralis Design
// Requirements: Consistent row height, selection column, sticky actions, optimal column distribution

interface TablePresetProps {
  children: React.ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
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
}

interface StatusTagProps {
  status: 'Updated' | 'Outstanding' | 'Overdue' | 'Default';
  children: React.ReactNode;
}

// Column width mapping for consistent proportions
const COLUMN_WIDTHS = {
  narrow: 'w-20 min-w-[80px]',    // Dates, numbers
  medium: 'w-32 min-w-[128px]',   // Status, ratings
  wide: 'w-48 min-w-[192px]',     // Names, emails
  auto: 'flex-1 min-w-[120px]'    // Flexible content
};

// Main table container with consistent styling
export const TablePreset = forwardRef<HTMLDivElement, TablePresetProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div 
        ref={ref}
        className={`
          bg-white
          border
          border-zinc-200
          rounded-lg 
          overflow-hidden
          w-full
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
);
TablePreset.displayName = "TablePreset";

// Table header with F/DS V2 styling
export const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div 
        ref={ref}
        className={`
          bg-zinc-50
          flex 
          items-center
          min-h-[48px]
          h-[48px]
          border-b
          border-zinc-200
          sticky
          top-0
          z-10
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
);
TableHeader.displayName = "TableHeader";

// Table body row with consistent height and hover states
export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
  ({ children, className = "", onClick, selected = false }, ref) => {
    return (
      <div 
        ref={ref}
        className={`
          bg-white
          flex 
          items-center
          min-h-[48px]
          h-[48px]
          border-b
          border-zinc-200
          last:border-b-0
          hover:bg-zinc-50
          transition-colors
          duration-150
          ${onClick ? 'cursor-pointer' : ''}
          ${selected ? 'bg-blue-50 border-blue-200' : ''}
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

// Table cell with standardized padding and typography
export const TableCell = forwardRef<HTMLDivElement, TableCellProps>(
  ({ children, className = "", isHeader = false, width = 'auto', align = 'left', sticky }, ref) => {
    const widthClass = COLUMN_WIDTHS[width];
    const alignClass = align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start';
    const textAlign = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
    
    const stickyClass = sticky === 'left' ? 'sticky left-0 z-20 bg-inherit' : 
                       sticky === 'right' ? 'sticky right-0 z-20 bg-inherit border-l border-zinc-200' : '';

    return (
      <div 
        ref={ref}
        className={`
          flex 
          items-center
          h-[48px]
          px-4
          ${widthClass}
          ${alignClass}
          ${textAlign}
          ${stickyClass}
          ${isHeader ? 'font-semibold text-zinc-900' : 'text-zinc-700'}
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
);
TableCell.displayName = "TableCell";

// Status tag with consistent styling
export const StatusTag = forwardRef<HTMLDivElement, StatusTagProps>(
  ({ status, children }, ref) => {
    const getStatusStyles = (status: string) => {
      switch (status) {
        case 'Updated':
          return 'bg-green-50 border-green-200 text-green-800';
        case 'Outstanding':
          return 'bg-amber-50 border-amber-200 text-amber-800';
        case 'Overdue':
          return 'bg-red-50 border-red-200 text-red-800';
        default:
          return 'bg-zinc-50 border-zinc-300 text-zinc-900';
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
        border-zinc-300 
        bg-white 
        text-blue-600 
        focus:ring-2 
        focus:ring-blue-500/20
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
    'border border-zinc-300 bg-white hover:bg-zinc-50' : 
    'hover:bg-zinc-100';

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
        duration-150
        ${variantClass}
        ${className}
      `}
    >
      {children}
    </button>
  );
});
TableAction.displayName = "TableAction";

// Empty state component
export const TableEmptyState = forwardRef<HTMLDivElement, {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}>(({ icon, title, description, action }, ref) => {
  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-12 text-center">
      {icon && (
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2 text-zinc-900">{title}</h3>
      {description && (
        <p className="text-zinc-600 max-w-sm mb-4">{description}</p>
      )}
      {action}
    </div>
  );
});
TableEmptyState.displayName = "TableEmptyState";

// Loading skeleton for tables
export const TableSkeleton = forwardRef<HTMLDivElement, {
  rows?: number;
  columns?: number;
}>(({ rows = 5, columns = 6 }, ref) => {
  return (
    <div ref={ref} className="animate-pulse">
      {/* Header skeleton */}
      <div className="h-[48px] bg-zinc-100 border-b border-zinc-200 flex items-center px-4">
        <div className="w-4 h-4 bg-zinc-200 rounded mr-4"></div>
        <div className="flex-1 flex gap-4">
          {Array.from({ length: columns - 1 }).map((_, i) => (
            <div key={i} className="h-4 bg-zinc-200 rounded flex-1"></div>
          ))}
        </div>
      </div>
      
      {/* Body skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="h-[48px] border-b border-zinc-200 flex items-center px-4">
          <div className="w-4 h-4 bg-zinc-100 rounded mr-4"></div>
          <div className="flex-1 flex gap-4">
            {Array.from({ length: columns - 1 }).map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-zinc-100 rounded flex-1"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
TableSkeleton.displayName = "TableSkeleton";