import React, { useState, useEffect, useRef } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Checkbox } from './checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export interface HeaderFilterProps {
  columnName: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
  className?: string;
  disabled?: boolean;
}

export const HeaderFilter: React.FC<HeaderFilterProps> = ({
  columnName,
  options,
  selectedOptions,
  onChange,
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const selectedCount = selectedOptions.length;
  const isActive = selectedCount > 0;
  const allSelected = selectedOptions.length === options.length;

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => Math.min(prev + 1, options.length));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 1, -1));
          break;
        case 'Enter':
        case ' ':
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            e.preventDefault();
            handleOptionToggle(options[focusedIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, options]);

  const handleOptionToggle = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    if (isSelected) {
      onChange(selectedOptions.filter(item => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange([...options]);
    }
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const getFilterIcon = () => {
    if (isActive) {
      return (
        <div className="relative">
          <Filter className="w-3 h-3 text-chart-1" />
          {selectedCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center bg-chart-1 text-white text-xs border-0"
            >
              {selectedCount}
            </Badge>
          )}
        </div>
      );
    }
    return <Filter className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />;
  };

  const getSelectedChips = () => {
    if (selectedOptions.length === 0) return null;
    if (selectedOptions.length > 3) {
      return (
        <div className="flex items-center gap-1 mb-2">
          <Badge variant="outline" className="text-xs px-1 py-0.5">
            {selectedOptions.slice(0, 2).join(', ')}
          </Badge>
          <Badge variant="outline" className="text-xs px-1 py-0.5">
            +{selectedOptions.length - 2} more
          </Badge>
        </div>
      );
    }
    return (
      <div className="flex flex-wrap gap-1 mb-2">
        {selectedOptions.map(option => (
          <Badge
            key={option}
            variant="outline"
            className="text-xs px-1 py-0.5 bg-chart-1/10 border-chart-1/20 text-chart-1"
          >
            {option}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOptionToggle(option);
              }}
              className="ml-1 hover:bg-chart-1/20 rounded-full p-0.5 -mr-1 transition-colors"
            >
              <X className="w-2 h-2" />
            </button>
          </Badge>
        ))}
      </div>
    );
  };

  if (disabled) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                ref={triggerRef}
                variant="ghost"
                size="sm"
                className={`
                  group
                  h-8 w-8 p-0 
                  hover:bg-chart-1/8
                  focus:ring-2 focus:ring-chart-1/20 focus:ring-offset-1
                  transition-colors duration-200
                  ${isActive ? 'bg-chart-1/10 hover:bg-chart-1/15' : ''}
                  ${className}
                `}
                aria-label={`Filter ${columnName}`}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
              >
                {getFilterIcon()}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Filter by {columnName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent
        ref={contentRef}
        className="w-72 p-0"
        align="start"
        sideOffset={4}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          setFocusedIndex(-1);
        }}
      >
              <div className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-card-foreground">
                    Filter {columnName}
                  </h4>
                  {selectedCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAll}
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear
                    </Button>
                  )}
                </div>

                {/* Selected Options Chips */}
                {getSelectedChips()}

                {/* Select All/None */}
                <div className="flex items-center space-x-2 py-1">
                  <Checkbox
                    id={`select-all-${columnName}`}
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                    className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                  />
                  <label
                    htmlFor={`select-all-${columnName}`}
                    className="text-sm font-medium text-card-foreground cursor-pointer"
                  >
                    {allSelected ? 'Deselect All' : 'Select All'}
                  </label>
                </div>

                {/* Options List */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {options.map((option, index) => {
                    const isSelected = selectedOptions.includes(option);
                    const isFocused = index === focusedIndex;
                    return (
                      <div
                        key={option}
                        className={`
                          flex items-center space-x-2 p-2 rounded transition-colors duration-150
                          cursor-pointer hover:bg-chart-1/5
                          ${isFocused ? 'bg-chart-1/8 outline-2 outline-chart-1' : ''}
                        `}
                        onClick={() => handleOptionToggle(option)}
                      >
                        <Checkbox
                          id={`filter-${columnName}-${option}`}
                          checked={isSelected}
                          onCheckedChange={() => handleOptionToggle(option)}
                          className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                        />
                        <label
                          htmlFor={`filter-${columnName}-${option}`}
                          className="text-sm text-muted-foreground cursor-pointer flex-1 hover:text-card-foreground transition-colors"
                        >
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>

                {/* Summary */}
                {selectedCount > 0 && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      {selectedCount} of {options.length} selected
                    </p>
                  </div>
                )}
              </div>
            </PopoverContent>
    </Popover>
  );
};

// Mobile filter menu component for responsive design
export interface MobileColumnFiltersProps {
  filters: {
    columnName: string;
    options: string[];
    selectedOptions: string[];
    onChange: (selectedOptions: string[]) => void;
  }[];
  onClearAll: () => void;
}

export const MobileColumnFilters: React.FC<MobileColumnFiltersProps> = ({
  filters,
  onClearAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const totalActiveFilters = filters.reduce(
    (sum, filter) => sum + filter.selectedOptions.length, 
    0
  );

  return (
    <div className="md:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 border-2 border-border hover:bg-chart-1/5 hover:border-chart-1/30 relative transition-colors duration-200"
          >
            <Filter className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Filters</span>
            {totalActiveFilters > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-chart-1 text-white text-xs"
              >
                {totalActiveFilters}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-card-foreground">Column Filters</h4>
              {totalActiveFilters > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearAll}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear All
                </Button>
              )}
            </div>

            {filters.map(({ columnName, options, selectedOptions, onChange }) => (
              <div key={columnName} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-card-foreground">{columnName}</label>
                  {selectedOptions.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {selectedOptions.length}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-${columnName}-${option}`}
                        checked={selectedOptions.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onChange([...selectedOptions, option]);
                          } else {
                            onChange(selectedOptions.filter(item => item !== option));
                          }
                        }}
                        className="data-[state=checked]:bg-chart-1 data-[state=checked]:border-chart-1"
                      />
                      <label
                        htmlFor={`mobile-${columnName}-${option}`}
                        className="text-sm text-muted-foreground cursor-pointer hover:text-card-foreground transition-colors"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};