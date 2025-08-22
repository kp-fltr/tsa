import { useState, forwardRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "./ui/utils";
import { format, parse, isValid } from "date-fns";

interface DateInputProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
}

// Utility function to format date as DD/MM/YYYY
export function formatDateDDMMYYYY(date: Date | string | undefined): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(dateObj)) return '';
  
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
}

// Utility function to parse DD/MM/YYYY string to Date
function parseDateDDMMYYYY(dateString: string): Date | null {
  if (!dateString) return null;
  
  // Remove any extra whitespace
  const cleanDate = dateString.trim();
  
  // Check if it matches DD/MM/YYYY pattern
  const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = cleanDate.match(dateRegex);
  
  if (!match) return null;
  
  const [, day, month, year] = match;
  const parsedDate = parse(cleanDate, 'dd/MM/yyyy', new Date());
  
  // Validate the parsed date
  if (!isValid(parsedDate)) return null;
  
  // Additional validation to ensure the date components are reasonable
  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);
  
  if (dayNum < 1 || dayNum > 31) return null;
  if (monthNum < 1 || monthNum > 12) return null;
  if (yearNum < 1900 || yearNum > 2100) return null;
  
  return parsedDate;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, onChange, placeholder = "DD/MM/YYYY", disabled, className, disableFuture, disablePast }, ref) => {
    const [inputValue, setInputValue] = useState(() => 
      value ? formatDateDDMMYYYY(value) : ''
    );
    const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // Try to parse the date as user types
      const parsedDate = parseDateDDMMYYYY(newValue);
      if (parsedDate) {
        onChange?.(parsedDate);
      } else if (newValue === '') {
        onChange?.(undefined);
      }
    };

    const handleInputBlur = () => {
      // On blur, try to parse and reformat the input
      const parsedDate = parseDateDDMMYYYY(inputValue);
      if (parsedDate) {
        const formattedDate = formatDateDDMMYYYY(parsedDate);
        setInputValue(formattedDate);
        onChange?.(parsedDate);
      } else if (inputValue === '') {
        onChange?.(undefined);
      } else {
        // If invalid, reset to the current value or clear
        setInputValue(value ? formatDateDDMMYYYY(value) : '');
      }
    };

    const handleCalendarSelect = (date: Date | undefined) => {
      onChange?.(date);
      setInputValue(date ? formatDateDDMMYYYY(date) : '');
      setIsOpen(false);
    };

    const isDisabledDate = (date: Date) => {
      if (disableFuture && date > new Date()) return true;
      if (disablePast && date < new Date()) return true;
      return false;
    };

    return (
      <div className="relative">
        <div className="relative">
          <Input
            ref={ref}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn("pr-10", className)}
          />
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                disabled={disabled}
              >
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value}
                onSelect={handleCalendarSelect}
                disabled={isDisabledDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  }
);

DateInput.displayName = "DateInput";

export default DateInput;