import React from 'react';
import { cn } from './ui/utils';
import { TableFilterBar } from './ui/table-filter-bar';

export interface TableColumn {
  title: string | React.ReactNode;
  dataIndex: string;
  key: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: any, index: number) => React.ReactNode;
  sorter?: boolean | ((a: any, b: any) => number);
  filters?: Array<{text: string; value: string | number}>;
  onFilter?: (value: string | number, record: any) => boolean;
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
  className?: string;
  priority?: 'high' | 'medium' | 'low'; // For mobile responsiveness
}

export interface TableProps {
  dataSource: any[];
  columns: TableColumn[];
  rowKey?: string | ((record: any) => string);
  loading?: boolean;
  pagination?: boolean | {
    current?: number;
    pageSize?: number;
    total?: number;
    onChange?: (page: number, pageSize?: number) => void;
  };
  rowSelection?: {
    selectedRowKeys?: (string | number)[];
    onChange?: (selectedRowKeys: (string | number)[], selectedRows: any[]) => void;
    onSelect?: (record: any, selected: boolean, selectedRows: any[]) => void;
    onSelectAll?: (selected: boolean, selectedRows: any[], changeRows: any[]) => void;
  };
  onRow?: (record: any, index?: number) => {
    onClick?: (event: React.MouseEvent) => void;
    onDoubleClick?: (event: React.MouseEvent) => void;
    onContextMenu?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
  };
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  showHeader?: boolean;
  scroll?: {
    x?: number | string;
    y?: number | string;
  };
  className?: string;
  style?: React.CSSProperties;
  locale?: {
    emptyText?: React.ReactNode;
  };
  // Enhanced table features
  enableFilters?: boolean;
  filterOptions?: Record<string, string[]>;
  activeFilters?: Record<string, string>;
  onFiltersChange?: (filters: Record<string, string>) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export const Table: React.FC<TableProps> = ({
  dataSource = [],
  columns = [],
  rowKey = 'key',
  loading = false,
  pagination = false,
  rowSelection,
  onRow,
  size = 'middle',
  bordered = false,
  showHeader = true,
  scroll,
  className,
  style,
  locale = { emptyText: 'No data' },
  // Enhanced features
  enableFilters = false,
  filterOptions = {},
  activeFilters = {},
  onFiltersChange,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<(string | number)[]>(
    rowSelection?.selectedRowKeys || []
  );

  const getRowKey = (record: any, index: number) => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index;
  };

  const handleSelectRow = (record: any, selected: boolean) => {
    const key = getRowKey(record, 0);
    const newSelectedRowKeys = selected
      ? [...selectedRowKeys, key]
      : selectedRowKeys.filter(k => k !== key);
    
    setSelectedRowKeys(newSelectedRowKeys);
    
    if (rowSelection?.onSelect) {
      const selectedRows = dataSource.filter(item => 
        newSelectedRowKeys.includes(getRowKey(item, 0))
      );
      rowSelection.onSelect(record, selected, selectedRows);
    }
    
    if (rowSelection?.onChange) {
      const selectedRows = dataSource.filter(item => 
        newSelectedRowKeys.includes(getRowKey(item, 0))
      );
      rowSelection.onChange(newSelectedRowKeys, selectedRows);
    }
  };

  const handleSelectAll = (selected: boolean) => {
    const newSelectedRowKeys = selected 
      ? dataSource.map((record, index) => getRowKey(record, index))
      : [];
    
    setSelectedRowKeys(newSelectedRowKeys);
    
    if (rowSelection?.onSelectAll) {
      const selectedRows = selected ? [...dataSource] : [];
      const changeRows = selected ? dataSource : 
        dataSource.filter(item => selectedRowKeys.includes(getRowKey(item, 0)));
      rowSelection.onSelectAll(selected, selectedRows, changeRows);
    }
    
    if (rowSelection?.onChange) {
      const selectedRows = selected ? [...dataSource] : [];
      rowSelection.onChange(newSelectedRowKeys, selectedRows);
    }
  };

  const isAllSelected = dataSource.length > 0 && 
    dataSource.every((record, index) => selectedRowKeys.includes(getRowKey(record, index)));
  
  const isSomeSelected = selectedRowKeys.length > 0 && !isAllSelected;

  const sizeClasses = {
    small: 'text-sm',
    middle: 'text-base',
    large: 'text-lg',
  };

  const paddingClasses = {
    small: 'px-3 py-2',
    middle: 'px-4 py-3',
    large: 'px-6 py-4',
  };

  // Responsive column handling
  const getVisibleColumns = () => {
    // On mobile, show only essential columns
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return columns.filter(col => !col.className?.includes('hidden') || col.fixed);
    }
    return columns;
  };

  const visibleColumns = getVisibleColumns();
  const regularColumns = visibleColumns.filter(col => col.fixed !== 'right');
  const fixedRightColumns = visibleColumns.filter(col => col.fixed === 'right');

  if (loading) {
    return (
      <div className="w-full">
        <div className={cn(
          'bg-card rounded-md border border-border overflow-hidden',
          className
        )} style={style}>
          <div className="animate-pulse">
            {/* Header skeleton */}
            {showHeader && (
              <div className="border-b border-border bg-muted/20">
                <div className="flex">
                  {visibleColumns.map((column, index) => (
                    <div
                      key={column.key || index}
                      className={cn('flex-1 p-4')}
                    >
                      <div className="h-4 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Body skeleton */}
            {[...Array(5)].map((_, rowIndex) => (
              <div key={rowIndex} className="border-b border-border last:border-b-0">
                <div className="flex">
                  {visibleColumns.map((column, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="flex-1 p-4"
                    >
                      <div className="h-4 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={cn(
        'bg-card rounded-md border border-border overflow-hidden',
        sizeClasses[size],
        className
      )} style={style}>
        {/* Filter Bar */}
        {enableFilters && Object.keys(filterOptions).length > 0 && (
          <TableFilterBar
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            onFiltersChange={onFiltersChange || (() => {})}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            searchPlaceholder={searchPlaceholder}
          />
        )}

        {/* Mobile and desktop responsive wrapper */}
        <div className="relative">
          <div className={cn(
            'overflow-x-auto',
            scroll?.y && 'max-h-96 overflow-y-auto'
          )}>
            <div className="flex min-w-full">
              {/* Main content area */}
              <div className="flex-1 min-w-0">
                <table className="w-full table-fixed md:table-auto">
                  {showHeader && (
                    <thead className="bg-muted/20 border-b border-border sticky top-0 z-10">
                      <tr>
                        {rowSelection && (
                          <th className={cn(
                            'w-12 text-left sticky left-0 bg-muted/20 z-20', 
                            paddingClasses[size],
                            'min-h-[48px] h-[48px]'
                          )}>
                            <div className="flex items-center justify-center h-full">
                              <input
                                type="checkbox"
                                checked={isAllSelected}
                                ref={(input) => {
                                  if (input) input.indeterminate = isSomeSelected;
                                }}
                                onChange={(e) => handleSelectAll(e.target.checked)}
                                className="w-4 h-4 rounded border-border bg-input-background focus:ring-2 focus:ring-ring accent-primary"
                              />
                            </div>
                          </th>
                        )}
                        {regularColumns.map((column, index) => (
                          <th
                            key={column.key || index}
                            className={cn(
                              'text-left text-h5 font-semibold text-foreground whitespace-nowrap',
                              paddingClasses[size],
                              column.align === 'center' && 'text-center',
                              column.align === 'right' && 'text-right',
                              bordered && 'border-r border-border last:border-r-0',
                              column.className,
                              'min-h-[48px] h-[48px] align-middle'
                            )}
                            style={{ 
                              width: column.width,
                              minWidth: column.width || 120
                            }}
                          >
                            <div className="flex items-center h-full">
                              {column.title}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {dataSource.length === 0 ? (
                      <tr>
                        <td 
                          colSpan={regularColumns.length + (rowSelection ? 1 : 0)}
                          className={cn('text-center text-muted-foreground', paddingClasses[size])}
                        >
                          {locale.emptyText}
                        </td>
                      </tr>
                    ) : (
                      dataSource.map((record, index) => {
                        const key = getRowKey(record, index);
                        const isSelected = selectedRowKeys.includes(key);
                        const rowProps = onRow ? onRow(record, index) : {};
                        
                        return (
                          <tr
                            key={key}
                            className={cn(
                              'border-b border-border last:border-b-0 hover:bg-muted/10 transition-colors',
                              'min-h-[48px] h-[48px]',
                              isSelected && 'bg-primary/5',
                              rowProps.onClick && 'cursor-pointer'
                            )}
                            {...rowProps}
                          >
                            {rowSelection && (
                              <td className={cn(
                                'sticky left-0 bg-card z-10',
                                paddingClasses[size], 
                                bordered && 'border-r border-border',
                                isSelected && 'bg-primary/5',
                                'min-h-[48px] h-[48px] align-middle'
                              )}>
                                <div className="flex items-center justify-center h-full">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => handleSelectRow(record, e.target.checked)}
                                    className="w-4 h-4 rounded border-border bg-input-background focus:ring-2 focus:ring-ring accent-primary"
                                  />
                                </div>
                              </td>
                            )}
                            {regularColumns.map((column, colIndex) => {
                              const value = record[column.dataIndex];
                              const content = column.render 
                                ? column.render(value, record, index)
                                : value;
                              
                              return (
                                <td
                                  key={column.key || colIndex}
                                  className={cn(
                                    'text-base text-foreground align-top',
                                    paddingClasses[size],
                                    column.align === 'center' && 'text-center',
                                    column.align === 'right' && 'text-right',
                                    column.ellipsis && 'truncate max-w-40',
                                    bordered && 'border-r border-border last:border-r-0',
                                    column.className,
                                    'min-h-[48px] h-[48px]'
                                  )}
                                >
                                  <div className="flex items-start h-full">
                                    {content}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Sticky right column for actions */}
              {fixedRightColumns.length > 0 && (
                <div className="flex-shrink-0 border-l border-border bg-card">
                  <table className="w-full">
                    {showHeader && (
                      <thead className="bg-muted/20 border-b border-border sticky top-0 z-10">
                        <tr>
                          {fixedRightColumns.map((column, index) => (
                            <th
                              key={column.key || index}
                              className={cn(
                                'text-left text-h5 font-semibold text-foreground whitespace-nowrap bg-muted/20',
                                paddingClasses[size],
                                column.align === 'center' && 'text-center',
                                column.align === 'right' && 'text-right',
                                'min-h-[48px] h-[48px] align-middle'
                              )}
                              style={{ 
                                width: column.width || 100,
                                minWidth: column.width || 100
                              }}
                            >
                              <div className="flex items-center justify-center h-full">
                                {column.title}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {dataSource.length === 0 ? (
                        <tr>
                          <td 
                            colSpan={fixedRightColumns.length}
                            className={cn('text-center text-muted-foreground', paddingClasses[size])}
                          >
                            {/* Empty space to match main table */}
                          </td>
                        </tr>
                      ) : (
                        dataSource.map((record, index) => {
                          const key = getRowKey(record, index);
                          const isSelected = selectedRowKeys.includes(key);
                          
                          return (
                            <tr
                              key={key}
                              className={cn(
                                'border-b border-border last:border-b-0 hover:bg-muted/10 transition-colors',
                                'min-h-[48px] h-[48px]',
                                isSelected && 'bg-primary/5'
                              )}
                            >
                              {fixedRightColumns.map((column, colIndex) => {
                                const value = record[column.dataIndex];
                                const content = column.render 
                                  ? column.render(value, record, index)
                                  : value;
                                
                                return (
                                  <td
                                    key={column.key || colIndex}
                                    className={cn(
                                      'text-base text-foreground align-middle',
                                      paddingClasses[size],
                                      column.align === 'center' && 'text-center',
                                      column.align === 'right' && 'text-right',
                                      column.ellipsis && 'truncate',
                                      column.className,
                                      'min-h-[48px] h-[48px]'
                                    )}
                                  >
                                    {content}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;