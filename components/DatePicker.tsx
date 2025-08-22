import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import svgPaths from "../imports/svg-qhvsi1k5zs";

interface DatePickerProps {
  value?: string;
  onChange?: (date: string, time: string) => void;
  placeholder?: string;
}

function TablerIconCalendar() {
  return (
    <div className="relative shrink-0 size-4" data-name="tabler icon / calendar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="tabler icon / calendar">
          <path
            d={svgPaths.p102d9d00}
            id="Vector"
            stroke="var(--stroke-0, #D4D4D8)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </g>
      </svg>
    </div>
  );
}

function TablerIconChevronLeft() {
  return (
    <div className="relative size-4" data-name="tabler icon / chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="tabler icon / chevron-left">
          <path
            d="M10 4L6 8L10 12"
            id="Vector"
            stroke="var(--stroke-0, #717179)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </g>
      </svg>
    </div>
  );
}

function TablerIconChevronsLeft() {
  return (
    <div className="relative size-4" data-name="tabler icon / chevrons-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="tabler icon / chevrons-left">
          <path
            d={svgPaths.p25c18f00}
            id="Vector"
            stroke="var(--stroke-0, #717179)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </g>
      </svg>
    </div>
  );
}

function TablerIconChevronRight() {
  return (
    <div className="relative size-4" data-name="tabler icon / chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="tabler icon / chevron-right">
          <path
            d="M6 4L10 8L6 12"
            id="Vector"
            stroke="var(--stroke-0, #717179)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </g>
      </svg>
    </div>
  );
}

function TablerIconChevronsRight() {
  return (
    <div className="relative size-4" data-name="tabler icon / chevrons-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="tabler icon / chevrons-right">
          <path
            d={svgPaths.p3d733be0}
            id="Vector"
            stroke="var(--stroke-0, #717179)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </g>
      </svg>
    </div>
  );
}

export function DatePicker({ value = "", onChange, placeholder = "Select date" }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value ? new Date(value) : new Date());
  const [selectedTime, setSelectedTime] = useState({ hour: 9, minute: 0, second: 0 });

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month's trailing days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonth.getDate() - i)
      });
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day)
      });
    }
    
    // Next month's leading days
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day)
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next' | 'prevYear' | 'nextYear') => {
    const newDate = new Date(selectedDate);
    switch (direction) {
      case 'prev':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'next':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'prevYear':
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
      case 'nextYear':
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
    }
    setSelectedDate(newDate);
  };

  const selectDate = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(selectedTime.hour, selectedTime.minute, selectedTime.second);
    setSelectedDate(newDate);
    
    const dateStr = newDate.toISOString().split('T')[0];
    const timeStr = `${selectedTime.hour.toString().padStart(2, '0')}:${selectedTime.minute.toString().padStart(2, '0')}`;
    onChange?.(dateStr, timeStr);
  };

  const handleTimeChange = (type: 'hour' | 'minute' | 'second', value: number) => {
    const newTime = { ...selectedTime, [type]: value };
    setSelectedTime(newTime);
    
    const newDate = new Date(selectedDate);
    newDate.setHours(newTime.hour, newTime.minute, newTime.second);
    
    const dateStr = newDate.toISOString().split('T')[0];
    const timeStr = `${newTime.hour.toString().padStart(2, '0')}:${newTime.minute.toString().padStart(2, '0')}`;
    onChange?.(dateStr, timeStr);
  };

  const handleNow = () => {
    const now = new Date();
    setSelectedDate(now);
    
    // Round minutes to nearest 15-minute interval
    const currentMinutes = now.getMinutes();
    const roundedMinutes = Math.round(currentMinutes / 15) * 15;
    
    setSelectedTime({
      hour: now.getHours(),
      minute: roundedMinutes === 60 ? 0 : roundedMinutes,
      second: 0
    });
    
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${(roundedMinutes === 60 ? 0 : roundedMinutes).toString().padStart(2, '0')}`;
    onChange?.(dateStr, timeStr);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const days = getDaysInMonth(selectedDate);
  const today = new Date();
  
  const formatDisplayValue = () => {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleDateString();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="bg-[#ffffff] h-9 relative rounded-md shrink-0 w-full" data-name="_DatePicker / DatePicker Input / Outlined">
          <div className="absolute border border-solid border-zinc-300 inset-0 pointer-events-none rounded-md" />
          <div className="flex flex-row items-center relative size-full">
            <div className="box-border content-stretch flex flex-row gap-1 h-9 items-center justify-start px-3 py-0 relative w-full cursor-pointer">
              <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow h-[22px] leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
                <p className="[text-overflow:inherit] [text-wrap-mode:inherit] [white-space-collapse:inherit] block leading-[22px] overflow-inherit">
                  {formatDisplayValue() || placeholder}
                </p>
              </div>
              <TablerIconCalendar />
            </div>
          </div>
        </div>
      </PopoverTrigger>
      
      <PopoverContent className="w-auto p-0" align="start">
        <div className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 rounded-md shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08),0px_3px_6px_-4px_rgba(0,0,0,0.12),0px_9px_28px_8px_rgba(0,0,0,0.05)]">
          {/* Calendar Section */}
          <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-[280px]">
            {/* Header */}
            <div className="relative shrink-0 w-full">
              <div className="absolute border-[0px_0px_1px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none" />
              <div className="flex flex-row items-center relative size-full">
                <div className="box-border content-stretch flex flex-row items-center justify-between leading-[0] px-2 py-[9px] relative w-full">
                  {/* Left Navigation */}
                  <div className="flex flex-row gap-1">
                    <button onClick={() => navigateMonth('prevYear')} className="p-1 hover:bg-muted rounded">
                      <TablerIconChevronsLeft />
                    </button>
                    <button onClick={() => navigateMonth('prev')} className="p-1 hover:bg-muted rounded">
                      <TablerIconChevronLeft />
                    </button>
                  </div>
                  
                  {/* Month/Year Display */}
                  <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
                    <p className="block leading-[22px] whitespace-pre">
                      {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                    </p>
                  </div>
                  
                  {/* Right Navigation */}
                  <div className="flex flex-row gap-1">
                    <button onClick={() => navigateMonth('next')} className="p-1 hover:bg-muted rounded">
                      <TablerIconChevronRight />
                    </button>
                    <button onClick={() => navigateMonth('nextYear')} className="p-1 hover:bg-muted rounded">
                      <TablerIconChevronsRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Content */}
            <div className="relative shrink-0 w-full">
              <div className="flex flex-col items-center relative size-full">
                <div className="box-border content-stretch flex flex-col items-center justify-start px-[18px] py-2 relative w-full">
                  {/* Week Days Header */}
                  <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0">
                    {weekDays.map((day) => (
                      <div key={day} className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9">
                        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8">
                          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center text-zinc-900 w-6">
                            <p className="block leading-[22px]">{day}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Days */}
                  {Array.from({ length: 6 }, (_, weekIndex) => (
                    <div key={weekIndex} className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0">
                      {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((dayInfo, dayIndex) => {
                        const isToday = dayInfo.date.toDateString() === today.toDateString();
                        const isSelected = dayInfo.date.toDateString() === selectedDate.toDateString();
                        
                        return (
                          <div key={`${weekIndex}-${dayIndex}`} className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center px-1.5 py-[3px] relative shrink-0 w-9">
                            <button
                              onClick={() => selectDate(dayInfo.date)}
                              className={`box-border content-stretch flex flex-col gap-2.5 items-center justify-center min-w-8 px-[3px] py-0 relative rounded-md shrink-0 size-8 hover:bg-muted ${isSelected ? 'border border-solid border-zinc-900' : ''}`}
                            >
                              <div className={`font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-center w-6 ${
                                dayInfo.isCurrentMonth ? 'text-zinc-900' : 'text-zinc-300'
                              }`}>
                                <p className="block leading-[22px]">{dayInfo.day}</p>
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Time Picker Section */}
          <div className="w-[320px] relative">
            <div className="flex flex-col items-center justify-start">
              {/* Column Headers */}
              <div className="flex flex-row items-center justify-center gap-4 mb-3 w-full">
                <div className="flex flex-col items-center justify-center flex-1">
                  <Label className="text-sm font-semibold text-muted-foreground">Hours</Label>
                </div>
                <div className="flex flex-col items-center justify-center flex-1">
                  <Label className="text-sm font-semibold text-muted-foreground">Minutes</Label>
                </div>
              </div>
              
              {/* Time Picker Columns */}
              <div className="flex flex-row gap-4 w-full">
                {/* Hours Column */}
                <div className="flex-1 max-h-[180px] overflow-y-auto border border-border rounded-lg bg-background">
                  <div className="flex flex-col">
                    {Array.from({ length: 24 }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => handleTimeChange('hour', i)}
                        className={`flex items-center justify-center h-10 px-3 py-2 text-base hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 ${
                          selectedTime.hour === i ? 'bg-chart-1/10 text-chart-1 font-semibold' : 'text-foreground'
                        }`}
                      >
                        {i.toString().padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Minutes Column */}
                <div className="flex-1 max-h-[180px] overflow-y-auto border border-border rounded-lg bg-background">
                  <div className="flex flex-col">
                    {[0, 15, 30, 45].map((minute) => (
                      <button
                        key={minute}
                        onClick={() => handleTimeChange('minute', minute)}
                        className={`flex items-center justify-center h-10 px-3 py-2 text-base hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 ${
                          selectedTime.minute === minute ? 'bg-chart-1/10 text-chart-1 font-semibold' : 'text-foreground'
                        }`}
                      >
                        {minute.toString().padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="box-border content-stretch flex flex-row items-center justify-between px-3 py-2 relative shrink-0 w-full">
            <div className="absolute border-[1px_0px_0px] border-[rgba(24,24,27,0)] border-solid inset-0 pointer-events-none" />
            <button
              onClick={handleNow}
              className="box-border content-stretch flex flex-col gap-2 items-center justify-center px-[11px] py-0 relative rounded shrink-0 hover:bg-muted"
            >
              <div className="box-border content-stretch flex flex-row gap-2 h-8 items-center justify-center p-0 relative shrink-0">
                <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900">
                  <p className="block leading-[22px] whitespace-pre">Now</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={handleOk}
              className="bg-zinc-900 box-border content-stretch flex flex-col gap-2 items-center justify-center px-[11px] py-0 relative rounded shadow-[0px_1px_2px_0px_rgba(24,24,27,0.1)] shrink-0 hover:bg-zinc-800"
            >
              <div className="box-border content-stretch flex flex-row gap-2 h-8 items-center justify-center p-0 relative shrink-0">
                <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
                  <p className="block leading-[22px] whitespace-pre">Ok</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}