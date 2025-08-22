import { useState, useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Steps } from "./Steps";
import { DatePicker } from "./DatePicker";
import { 
  UNIFIED_CLIENT_REGISTRY,
  getAllClientsSorted, 
  UnifiedClientRecord,
  formatDateForDisplay,
  SUSTAINABILITY_STATUS_OPTIONS,
  SUSTAINABILITY_APPETITE_OPTIONS,
  SUSTAINABILITY_PROFILE_OPTIONS
} from "../data/unifiedClientRegistry";
import { 
  TablePreset, 
  TableHeader, 
  TableRow, 
  TableCell, 
  StatusTag, 
  TableCheckbox
} from "./ui/enhanced-table-preset";
import { TableEmptyState, TableSkeleton } from "./ui/table-preset";
import { HeaderFilter, MobileColumnFilters } from './ui/header-filter';
import { useColumnFilters } from '../hooks/useColumnFilters';
import { 
  Search, 
  Filter,
  ArrowLeft,
  Target,
  ChevronRight,
  AlertCircle,
  Info,
  Clock,
  Send,
  Eye,
  MoreHorizontal,
  Users
} from "lucide-react";

interface TestDistributionProps {
  onBack: () => void;
  onGoToControlCenter: () => void;
  onNext: (testData: TestData) => void;
}

interface TestData {
  name: string;
  selectedClients: number;
  scheduleType: string;
  scheduledDate?: string;
  scheduledTime?: string;
}

// Client selection table component with enhanced filtering and resizing
function ClientSelectionTable({ 
  clients, 
  selectedClientIds, 
  onSelectionChange 
}: { 
  clients: UnifiedClientRecord[]; 
  selectedClientIds: string[]; 
  onSelectionChange: (selectedIds: string[]) => void; 
}) {
  // Column-specific filters configuration
  const filterConfigs = [
    {
      columnKey: 'status',
      options: Array.from(SUSTAINABILITY_STATUS_OPTIONS),
      dataField: 'sustainability_assessment_status',
    },
    {
      columnKey: 'rating',
      options: Array.from(SUSTAINABILITY_APPETITE_OPTIONS),
      dataField: 'sustainability_appetite_rating',
    },
    {
      columnKey: 'profile',
      options: Array.from(SUSTAINABILITY_PROFILE_OPTIONS),
      dataField: 'sustainability_profile',
    },
  ];

  // Enhanced filtering with column-specific filters
  const {
    filteredData: filteredClients,
    columnFilters,
    updateColumnFilter,
    clearAllFilters,
    getActiveFilterCount,
  } = useColumnFilters({
    tableId: 'test-distribution-client-selection',
    data: clients,
    filterConfigs,
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(filteredClients.map(client => client.id.toString()));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectClient = (clientId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedClientIds, clientId]);
    } else {
      onSelectionChange(selectedClientIds.filter(id => id !== clientId));
    }
  };

  const isAllSelected = filteredClients.length > 0 && 
    filteredClients.every(client => selectedClientIds.includes(client.id.toString()));
  const isIndeterminate = selectedClientIds.length > 0 && !isAllSelected;

  // Prepare mobile filters data
  const mobileFilters = filterConfigs.map(config => ({
    columnName: config.columnKey === 'status' ? 'Assessment' : 
                config.columnKey === 'rating' ? 'Appetite' : 'Profile',
    options: config.options,
    selectedOptions: columnFilters[config.columnKey] || [],
    onChange: (selectedOptions: string[]) => updateColumnFilter(config.columnKey, selectedOptions),
  }));

  // Show empty state if no clients
  if (clients.length === 0) {
    return (
      <TablePreset tableId="test-distribution-client-selection">
        <TableEmptyState
          icon={<Users className="w-8 h-8 text-zinc-400" />}
          title="No clients found"
          description="Try adjusting your search terms or filters."
        />
      </TablePreset>
    );
  }

  // Mobile card layout
  const mobileCardLayout = (
    <div className="space-y-3 md:hidden">
      {/* Mobile Header with Filters */}
      <div className="flex items-center justify-between">
        <h4 className="text-h5">Clients ({filteredClients.length})</h4>
        <MobileColumnFilters
          filters={mobileFilters}
          onClearAll={clearAllFilters}
        />
      </div>

      {/* Select All - Mobile */}
      <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
        <span className="font-medium">Select All ({filteredClients.length} clients)</span>
        <TableCheckbox
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          onChange={handleSelectAll}
        />
      </div>

      {filteredClients.map((client) => (
        <div key={client.id} className="bg-white border border-zinc-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 mb-1">
                <TableCheckbox
                  checked={selectedClientIds.includes(client.id.toString())}
                  onChange={(checked) => handleSelectClient(client.id.toString(), checked)}
                />
                <h4 className="font-medium truncate">{client.name}</h4>
              </div>
              <p className="text-sm text-zinc-600 truncate ml-7">
                {client.email}
              </p>
            </div>
            <StatusTag status={client.sustainability_assessment_status}>
              {client.sustainability_assessment_status}
            </StatusTag>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm ml-7">
            <div className="space-y-1">
              <p className="text-zinc-600">Appetite</p>
              <p className="font-medium">{client.sustainability_appetite_rating}</p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-600">Profile</p>
              <p className="font-medium">{client.sustainability_profile}</p>
            </div>
          </div>
          
          <div className="pt-2 border-t border-zinc-200 mt-3 ml-7">
            <p className="text-xs text-zinc-600">
              Next Assessment: <span className="font-medium">{formatDateForDisplay(client.next_assessment_date)}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  // Desktop table layout with column-specific filters
  const desktopTableLayout = (
    <div className="hidden md:block bg-white border border-zinc-200 rounded-lg overflow-hidden">
      {/* Global Clear All Filters */}
      {getActiveFilterCount() > 0 && (
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-200 flex items-center justify-between">
          <span className="text-sm text-blue-900">
            {getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} applied
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-7 px-2 text-xs text-blue-700 hover:text-blue-900 hover:bg-blue-100"
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Table Header with Column Filters */}
      <div className="bg-zinc-50 flex items-center min-h-[48px] h-[48px] border-b border-zinc-200 sticky top-0 z-10">
        {/* 1. Select Column */}
        <div className="flex items-center justify-center w-12 h-12 px-2">
          <TableCheckbox
            checked={isAllSelected}
            indeterminate={isIndeterminate}
            onChange={handleSelectAll}
          />
        </div>
        
        {/* 2. Name Column - Wide for full names */}
        <div className="flex items-center h-12 px-4" style={{ width: '220px', minWidth: '220px' }}>
          <span className="text-sm font-semibold text-zinc-900">Name</span>
        </div>
        
        {/* 3. Email Column - Moderate width */}
        <div className="flex items-center h-12 px-4" style={{ width: '200px', minWidth: '200px' }}>
          <span className="text-sm font-semibold text-zinc-900">Email</span>
        </div>
        
        {/* 4. Assessment Status Column - Compact with filter */}
        <div className="flex items-center justify-center h-12 px-4 gap-2" style={{ width: '160px', minWidth: '160px' }}>
          <span className="text-sm font-semibold text-zinc-900">Assessment</span>
          <HeaderFilter
            columnName="Assessment"
            options={filterConfigs[0].options}
            selectedOptions={columnFilters.status || []}
            onChange={(selectedOptions) => updateColumnFilter('status', selectedOptions)}
          />
        </div>
        
        {/* 5. Appetite Column - Compact center-aligned with filter */}
        <div className="flex items-center justify-center h-12 px-4 gap-2" style={{ width: '120px', minWidth: '120px' }}>
          <span className="text-sm font-semibold text-zinc-900">Appetite</span>
          <HeaderFilter
            columnName="Appetite"
            options={filterConfigs[1].options}
            selectedOptions={columnFilters.rating || []}
            onChange={(selectedOptions) => updateColumnFilter('rating', selectedOptions)}
          />
        </div>
        
        {/* 6. Profile Column - Compact center-aligned with filter */}
        <div className="flex items-center justify-center h-12 px-4 gap-2" style={{ width: '100px', minWidth: '100px' }}>
          <span className="text-sm font-semibold text-zinc-900">Profile</span>
          <HeaderFilter
            columnName="Profile"
            options={filterConfigs[2].options}
            selectedOptions={columnFilters.profile || []}
            onChange={(selectedOptions) => updateColumnFilter('profile', selectedOptions)}
          />
        </div>
        
        {/* 7. Latest Assessment Date - Equal width, right-aligned */}
        <div className="flex items-center justify-end h-12 px-4" style={{ width: '130px', minWidth: '130px' }}>
          <span className="text-sm font-semibold text-zinc-900">Latest</span>
        </div>
        
        {/* 8. Next Assessment Date - Equal width, right-aligned */}
        <div className="flex items-center justify-end h-12 px-4" style={{ width: '130px', minWidth: '130px' }}>
          <span className="text-sm font-semibold text-zinc-900">Next Due</span>
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-zinc-200">
        {filteredClients.map((client) => (
          <div 
            key={client.id}
            className={`flex items-center min-h-[48px] h-[48px] hover:bg-zinc-50 transition-colors duration-150 ${
              selectedClientIds.includes(client.id.toString()) ? 'bg-blue-50 border-blue-200' : 'bg-white'
            }`}
          >
            {/* 1. Selection Column */}
            <div className="flex items-center justify-center w-12 h-12 px-2">
              <TableCheckbox
                checked={selectedClientIds.includes(client.id.toString())}
                onChange={(checked) => handleSelectClient(client.id.toString(), checked)}
              />
            </div>

            {/* 2. Name - No truncation on desktop */}
            <div className="flex items-center h-12 px-4" style={{ width: '220px', minWidth: '220px' }}>
              <div className="font-medium text-zinc-900">
                {client.name}
              </div>
            </div>

            {/* 3. Email - With tooltip for full email */}
            <div className="flex items-center h-12 px-4" style={{ width: '200px', minWidth: '200px' }}>
              <div className="text-zinc-600 truncate">
                {client.email}
              </div>
            </div>

            {/* 4. Assessment Status - Center-aligned */}
            <div className="flex items-center justify-center h-12 px-4" style={{ width: '160px', minWidth: '160px' }}>
              <StatusTag status={client.sustainability_assessment_status}>
                {client.sustainability_assessment_status}
              </StatusTag>
            </div>

            {/* 5. Appetite Rating - Center-aligned */}
            <div className="flex items-center justify-center h-12 px-4" style={{ width: '120px', minWidth: '120px' }}>
              <span className="font-medium text-zinc-900">{client.sustainability_appetite_rating}</span>
            </div>

            {/* 6. Profile - Center-aligned */}
            <div className="flex items-center justify-center h-12 px-4" style={{ width: '100px', minWidth: '100px' }}>
              <span className="font-medium text-chart-1">{client.sustainability_profile}</span>
            </div>

            {/* 7. Latest Assessment Date - Right-aligned */}
            <div className="flex items-center justify-end h-12 px-4" style={{ width: '130px', minWidth: '130px' }}>
              <span className="text-sm text-zinc-700">
                {formatDateForDisplay(client.latest_assessment_date)}
              </span>
            </div>

            {/* 8. Next Assessment Date - Right-aligned */}
            <div className="flex items-center justify-end h-12 px-4" style={{ width: '130px', minWidth: '130px' }}>
              <span className="text-sm text-zinc-700">
                {formatDateForDisplay(client.next_assessment_date)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {mobileCardLayout}
      {desktopTableLayout}
    </>
  );
}

export function CampaignDistribution({ onBack, onGoToControlCenter, onNext }: TestDistributionProps) {
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [engagementFilter, setEngagementFilter] = useState("all");
  const [testName, setTestName] = useState("");
  const [isScheduleLater, setIsScheduleLater] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  
  // Validation states
  const [canProceedToStep2, setCanProceedToStep2] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Use unified client registry as single source of truth - same as Client Management
  const allClients = useMemo(() => {
    return getAllClientsSorted(); // Same function used by Client Management
  }, []);

  // Apply search and filters to client data - same filtering logic as Client Management
  const filteredClients = useMemo(() => {
    return allClients.filter(client => {
      const matchesSearch = searchTerm === "" || 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase());
        
      // Industry filter - simplified for test distribution (could be enhanced based on client data)
      const matchesSegment = segmentFilter === "all"; // For now, show all industries
        
      // Status filter - map to new field names
      const matchesEngagement = engagementFilter === "all" || 
        client.sustainability_assessment_status.toLowerCase() === engagementFilter.toLowerCase();
      
      return matchesSearch && matchesSegment && matchesEngagement;
    });
  }, [allClients, searchTerm, segmentFilter, engagementFilter]);

  // Autocomplete suggestions for search - same as Client Management
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const suggestions = new Set<string>();
    
    allClients.forEach(client => {
      // Add name suggestions
      if (client.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(client.name);
      }
      // Add email suggestions
      if (client.email.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(client.email);
      }
    });
    
    return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
  }, [searchTerm, allClients]);

  // Comprehensive validation logic
  useEffect(() => {
    const errors: string[] = [];
    
    // Test name validation
    if (!testName.trim()) {
      errors.push("Test name is required");
    } else if (testName.trim().length < 3) {
      errors.push("Test name must be at least 3 characters");
    }
    
    // Client selection validation
    if (selectedClientIds.length === 0) {
      errors.push("At least one client must be selected");
    }

    // Schedule validation when scheduling for later
    if (isScheduleLater) {
      if (!scheduledDate) {
        errors.push("Schedule date is required when scheduling for later");
      }
      if (!scheduledTime) {
        errors.push("Schedule time is required when scheduling for later");
      }
    }

    setValidationErrors(errors);
    setCanProceedToStep2(errors.length === 0);
    
    // Auto-hide validation error when all fields are valid
    if (errors.length === 0 && showValidationError) {
      setShowValidationError(false);
    }
  }, [selectedClientIds.length, testName, isScheduleLater, scheduledDate, scheduledTime, showValidationError]);

  const handleNext = () => {
    if (!canProceedToStep2) {
      setShowValidationError(true);
      return;
    }

    const testData: TestData = {
      name: testName.trim(),
      selectedClients: selectedClientIds.length,
      scheduleType: isScheduleLater ? 'later' : 'now',
      scheduledDate,
      scheduledTime
    };
    onNext(testData);
  };

  const handleScheduleChange = (value: string) => {
    setIsScheduleLater(value === 'later');
    // Reset schedule fields when switching to "Send Now"
    if (value === 'now') {
      setScheduledDate("");
      setScheduledTime("");
    }
  };

  const handleSearchSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowAutocomplete(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowAutocomplete(e.target.value.trim().length > 0);
  };

  const handleSearchFocus = () => {
    setShowAutocomplete(searchTerm.trim().length > 0);
  };

  const handleSearchBlur = () => {
    // Delay hiding to allow clicking on suggestions
    setTimeout(() => setShowAutocomplete(false), 150);
  };

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedClientIds(selectedIds);
  };

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="bg-card border-b border-border px-4 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={onBack} 
              className="flex items-center gap-2 min-h-[44px] touch-manipulation hover:bg-accent hover:text-accent-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-chart-1/10 shrink-0">
                <Target className="w-6 h-6 text-chart-1" />
              </div>
              <div className="space-y-1">
                <h1>Test Distribution</h1>
                <p className="text-base text-muted-foreground content-width">
                  Create and deploy sustainability assessments to your clients
                </p>
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          <Steps currentStep={1} />
        </div>

        {/* Step Content - Responsive Layout */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 overflow-hidden">
          {showValidationError && validationErrors.length > 0 && (
            <Alert className="mb-4 sm:mb-6 border-destructive bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                Please complete the following required fields:
                <ul className="list-disc list-inside mt-2">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 h-full">
            {/* Test Setup - Mobile First */}
            <div className="lg:col-span-1 order-first lg:order-first">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <h3>Test Setup</h3>
                  <p className="text-muted-foreground">Configure your test details</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Test Name */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="test-name" className="font-medium text-foreground truncate">Test Name</Label>
                      <span className="text-destructive">*</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3 h-3 text-muted-foreground cursor-help flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter a descriptive name for your test (required, minimum 3 characters)</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="test-name"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      placeholder="Q1 Sustainability Assessment"
                      className={`border-2 border-border focus:border-chart-1 focus:ring-2 focus:ring-chart-1/20 min-h-[44px] touch-manipulation ${
                        (testName.trim() === "" || testName.trim().length < 3) && showValidationError 
                          ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
                          : ""
                      }`}
                    />
                  </div>

                  {/* Schedule Select */}
                  <div className="space-y-6">
                    {/* Section Header */}
                    <div>
                      <h4 className="text-foreground mb-1">Schedule</h4>
                      <p className="text-sm text-muted-foreground">Choose when to send the assessment to selected clients</p>
                    </div>
                    
                    {/* Schedule Options */}
                    <div className="space-y-4">
                      <Select
                        value={isScheduleLater ? 'later' : 'now'}
                        onValueChange={handleScheduleChange}
                      >
                        <SelectTrigger className="min-h-[48px] touch-manipulation border-2 border-border focus:border-chart-1 focus:ring-2 focus:ring-chart-1/20 transition-colors">
                          <SelectValue placeholder="Select schedule option" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectItem value="now" className="py-4 cursor-pointer focus:bg-muted">
                            <div className="flex items-start gap-3 w-full">
                              <div className="flex-shrink-0 p-2 bg-chart-2/10 rounded-lg mt-1">
                                <Send className="h-4 w-4 text-chart-2" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-base font-semibold text-foreground mb-1">Send Now</div>
                                <p className="text-sm text-muted-foreground leading-relaxed">Send immediately when test is deployed</p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="later" className="py-4 cursor-pointer focus:bg-muted">
                            <div className="flex items-start gap-3 w-full">
                              <div className="flex-shrink-0 p-2 bg-chart-3/10 rounded-lg mt-1">
                                <Clock className="h-4 w-4 text-chart-3" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-base font-semibold text-foreground mb-1">Schedule for Later</div>
                                <p className="text-sm text-muted-foreground leading-relaxed">Choose a specific date and time for delivery</p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Date & Time Picker - Shows when scheduling for later */}
                      {isScheduleLater && (
                        <div className="space-y-4 pt-2 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="schedule-datetime" className="text-sm font-semibold text-foreground">Schedule Date & Time</Label>
                            <span className="text-destructive text-sm">*</span>
                          </div>
                          <DatePicker
                            value={scheduledDate}
                            onChange={(date, time) => {
                              setScheduledDate(date);
                              setScheduledTime(time);
                            }}
                            placeholder="Select date and time"
                            className={`transition-colors ${
                              (!scheduledDate || !scheduledTime) && showValidationError && isScheduleLater
                                ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
                                : ""
                            }`}
                          />
                          {(!scheduledDate || !scheduledTime) && showValidationError && isScheduleLater && (
                            <p className="text-sm text-destructive flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 flex-shrink-0" />
                              Please select both date and time for scheduled delivery
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary Card */}
                  <Card className="bg-muted/20 border-border">
                    <CardHeader className="pb-3">
                      <h4>Summary</h4>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground truncate">Selected Clients:</span>
                        <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20 flex-shrink-0">
                          {selectedClientIds.length}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground truncate">Schedule:</span>
                        <span className="font-semibold text-foreground text-right flex-shrink-0">
                          {!isScheduleLater ? "Immediate" : scheduledDate ? `${scheduledDate} ${scheduledTime}` : "Not set"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground truncate">Status:</span>
                        <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-chart-3/20 flex-shrink-0">
                          Draft
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>

            {/* Client Selection - Responsive */}
            <div className="lg:col-span-3 order-last lg:order-last">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div>
                        <h3>Client Selection</h3>
                        <p className="text-muted-foreground">Choose clients for this test</p>
                      </div>
                      <span className="text-destructive">*</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-muted-foreground cursor-help flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select at least one client to receive the test (required)</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Badge variant="secondary" className="bg-chart-2/10 text-chart-2 border-chart-2/20 flex-shrink-0">
                      {selectedClientIds.length} selected
                    </Badge>
                  </div>

                  {/* Data Source Info */}

                  
                  {/* Search and Filters - Responsive */}
                  <div className="flex flex-col lg:flex-row gap-3 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        placeholder="Search clients by name or email..."
                        autoComplete="off"
                        className={`pl-10 min-h-[44px] touch-manipulation border-2 border-border focus:border-chart-1 focus:ring-2 focus:ring-chart-1/20 focus:outline-none ${
                          selectedClientIds.length === 0 && showValidationError 
                            ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
                            : ""
                        }`}
                      />
                      
                      {/* Autocomplete Dropdown */}
                      {showAutocomplete && searchSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                          {searchSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none truncate"
                              onClick={() => handleSearchSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row lg:flex-row gap-3 lg:w-auto">
                      <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                        <SelectTrigger className="min-h-[44px] touch-manipulation lg:w-[160px]">
                          <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            <SelectValue placeholder="Industry" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Industries</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="energy">Energy</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={engagementFilter} onValueChange={setEngagementFilter}>
                        <SelectTrigger className="min-h-[44px] touch-manipulation lg:w-[160px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="updated">Updated</SelectItem>
                          <SelectItem value="outstanding">Outstanding</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">
                        {selectedClientIds.length} of {filteredClients.length} selected
                      </span>
                    </div>
                  </div>

                  <ClientSelectionTable
                    clients={allClients}
                    selectedClientIds={selectedClientIds}
                    onSelectionChange={handleSelectionChange}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Fixed Navigation Footer - Responsive to sidebar state */}
        <div className="fixed bottom-0 right-0 left-0 md:left-[var(--sidebar-width-icon)] lg:left-[var(--sidebar-width)] z-40 border-t bg-card px-4 sm:px-6 lg:px-8 py-4 sm:py-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {!canProceedToStep2 && (
                <span className="text-muted-foreground hidden sm:inline">
                  Complete all required fields to continue
                </span>
              )}
            </div>
            
            <Button 
              onClick={handleNext}
              disabled={!canProceedToStep2}
              className={`min-h-[44px] touch-manipulation font-semibold transition-all duration-200 ${
                canProceedToStep2 
                  ? "bg-chart-1 hover:bg-chart-1/90 text-white" 
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <span className="hidden sm:inline">Next: Prepare Email</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}