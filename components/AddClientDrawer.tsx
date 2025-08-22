import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "./ui/drawer";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner@2.0.3";
import { DateInput, formatDateDDMMYYYY } from "./DateInput";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar as CalendarIcon,
  Building, 
  Tag, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  X,
  AlertCircle,
  Loader2,
  DollarSign,
  TrendingUp,
  Leaf,
  Star,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "./ui/utils";
import { apiService } from "../services/api";

// Enhanced Step indicator component with labels and green completion states
function StepIndicator({ currentStep, totalSteps, stepLabels, isStepComplete }: { 
  currentStep: number; 
  totalSteps: number;
  stepLabels: string[];
  isStepComplete: (step: number) => boolean;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = step < currentStep || isStepComplete(step);
          const isActive = step === currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {/* Step circle */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 relative z-10",
                    isCompleted 
                      ? "bg-chart-2 text-white" // Green for completed
                      : isActive 
                        ? "bg-chart-1 text-white border-2 border-chart-1" // Blue for active
                        : "bg-muted text-muted-foreground border-2 border-muted"
                  )}
                >
                  {isCompleted && step < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step
                  )}
                </div>
                
                {/* Connecting line */}
                {step < totalSteps && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-4 transition-colors duration-200",
                      isCompleted ? "bg-chart-2" : "bg-muted"
                    )}
                  />
                )}
              </div>
              
              {/* Step label */}
              <div className="mt-3 text-center">
                <p className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isCompleted 
                    ? "text-chart-2" 
                    : isActive 
                      ? "text-chart-1" 
                      : "text-muted-foreground"
                )}>
                  {stepLabels[step - 1]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface AddClientDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClientAdded: () => void;
}

interface ClientFormData {
  // Step 1: Basic Information
  name: string;
  email: string;
  company: string;
  industry: string;
  status: 'active' | 'inactive' | 'pending';
  
  // Step 2: Investment & ESG Details
  total_investments: string;
  esg_score: string;
  assessment_status: 'updated' | 'outstanding' | 'overdue';
  sustainability_appetite: 'high' | 'medium' | 'low' | 'n/a';
  sustainability_profile: 'A' | 'B' | 'C' | 'D' | 'E';
  
  // Step 3: Assessment Timeline
  latest_assessment: Date | undefined;
  next_assessment: Date | undefined;
  
  // Step 4: Additional Information
  notes: string;
  tags: string[];
}

const AVAILABLE_TAGS = [
  "ESG Interest",
  "New Lead", 
  "Legacy Client",
  "High Priority",
  "Sustainable Investing",
  "Carbon Neutral",
  "Regular Contact",
  "Annual Review Due",
  "High Net Worth",
  "Growing Portfolio",
  "Risk Averse",
  "Impact Focused"
];

const INDUSTRIES = [
  "Financial Services",
  "Technology", 
  "Healthcare",
  "Manufacturing",
  "Real Estate",
  "Energy",
  "Retail",
  "Consulting",
  "Transportation",
  "Education",
  "Government",
  "Non-Profit",
  "Other"
];

const STEP_LABELS = [
  "Basic Information",
  "Investment & ESG",
  "Assessment Timeline",
  "Review & Confirm"
];

export function AddClientDrawer({ isOpen, onClose, onClientAdded }: AddClientDrawerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
    company: "",
    industry: "",
    status: "active",
    total_investments: "",
    esg_score: "",
    assessment_status: "outstanding",
    sustainability_appetite: "n/a",
    sustainability_profile: "E",
    latest_assessment: undefined,
    next_assessment: undefined,
    notes: "",
    tags: []
  });

  const updateFormData = (field: keyof ClientFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Client name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (step === 2) {
      if (formData.total_investments && isNaN(Number(formData.total_investments.replace(/[£,]/g, '')))) {
        newErrors.total_investments = "Please enter a valid investment amount";
      }
      if (formData.esg_score && (isNaN(Number(formData.esg_score)) || Number(formData.esg_score) < 0 || Number(formData.esg_score) > 100)) {
        newErrors.esg_score = "ESG score must be between 0 and 100";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isStepComplete = (step: number): boolean => {
    if (step === 1) {
      return formData.name.trim() !== "" && 
             formData.email.trim() !== "" && 
             /\S+@\S+\.\S+/.test(formData.email);
    }
    if (step === 2) {
      return currentStep > 2;
    }
    if (step === 3) {
      return currentStep > 3;
    }
    if (step === 4) {
      return false; // Review step is never "complete" until submitted
    }
    return false;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const formatCurrency = (value: string) => {
    // Remove any non-numeric characters except decimals
    const numericValue = value.replace(/[^0-9.]/g, '');
    if (!numericValue) return '';
    
    // Convert to number and format with commas
    const number = parseFloat(numericValue);
    if (isNaN(number)) return '';
    
    return `£${number.toLocaleString()}`;
  };

  const handleInvestmentChange = (value: string) => {
    const formatted = formatCurrency(value);
    updateFormData('total_investments', formatted);
  };

  const handleSubmit = async () => {
    // Validate all steps
    for (let step = 1; step <= 3; step++) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        return;
      }
    }

    setIsLoading(true);
    try {
      const clientData = {
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        industry: formData.industry || undefined,
        status: formData.status,
        total_investments: formData.total_investments 
          ? Number(formData.total_investments.replace(/[£,]/g, '')) 
          : undefined,
        esg_score: formData.esg_score ? Number(formData.esg_score) : undefined,
        assessment_status: formData.assessment_status,
        sustainability_appetite: formData.sustainability_appetite,
        sustainability_profile: formData.sustainability_profile,
        latest_assessment: formData.latest_assessment 
          ? format(formData.latest_assessment, 'yyyy-MM-dd') 
          : undefined,
        next_assessment: formData.next_assessment 
          ? format(formData.next_assessment, 'yyyy-MM-dd') 
          : undefined,
        // Additional fields for legacy compatibility
        notes: formData.notes || null,
        tags: formData.tags
      };

      await apiService.createClient(clientData);
      
      toast.success("Client added successfully!", {
        description: `${formData.name} has been added to your client directory.`
      });

      // Reset form and close
      resetForm();
      onClientAdded();
      onClose();
    } catch (error: any) {
      console.error('Error creating client:', error);
      toast.error("Failed to add client", {
        description: error.message || "Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      industry: "",
      status: "active",
      total_investments: "",
      esg_score: "",
      assessment_status: "outstanding",
      sustainability_appetite: "n/a",
      sustainability_profile: "E",
      latest_assessment: undefined,
      next_assessment: undefined,
      notes: "",
      tags: []
    });
    setCurrentStep(1);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3>Basic Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter the essential client details
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Client Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              placeholder="Enter client's full name"
              className={cn("pl-10", errors.name && "border-destructive")}
              autoFocus
            />
          </div>
          {errors.name && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              placeholder="client@example.com"
              className={cn("pl-10", errors.email && "border-destructive")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => updateFormData("company", e.target.value)}
              placeholder="Company name"
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Industry</Label>
            <Select 
              value={formData.industry} 
              onValueChange={(value) => updateFormData("industry", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: 'active' | 'inactive' | 'pending') => updateFormData("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3>Investment & ESG Details</h3>
        <p className="text-sm text-muted-foreground">
          Financial and sustainability information
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="total_investments">Total Investments</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="total_investments"
              value={formData.total_investments}
              onChange={(e) => handleInvestmentChange(e.target.value)}
              placeholder="£0"
              className={cn("pl-10", errors.total_investments && "border-destructive")}
            />
          </div>
          {errors.total_investments && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.total_investments}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Enter the total investment portfolio value
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="esg_score">ESG Score</Label>
          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="esg_score"
              type="number"
              min="0"
              max="100"
              value={formData.esg_score}
              onChange={(e) => updateFormData("esg_score", e.target.value)}
              placeholder="0-100"
              className={cn("pl-10", errors.esg_score && "border-destructive")}
            />
          </div>
          {errors.esg_score && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.esg_score}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Environmental, Social, and Governance score (0-100)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Assessment Status</Label>
            <Select 
              value={formData.assessment_status} 
              onValueChange={(value: 'updated' | 'outstanding' | 'overdue') => updateFormData("assessment_status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Updated</SelectItem>
                <SelectItem value="outstanding">Outstanding</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sustainability Appetite</Label>
            <Select 
              value={formData.sustainability_appetite} 
              onValueChange={(value: 'high' | 'medium' | 'low' | 'n/a') => updateFormData("sustainability_appetite", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="n/a">N/A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Sustainability Profile</Label>
          <Select 
            value={formData.sustainability_profile} 
            onValueChange={(value: 'A' | 'B' | 'C' | 'D' | 'E') => updateFormData("sustainability_profile", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A - Excellent</SelectItem>
              <SelectItem value="B">B - Good</SelectItem>
              <SelectItem value="C">C - Average</SelectItem>
              <SelectItem value="D">D - Below Average</SelectItem>
              <SelectItem value="E">E - Poor</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Overall sustainability profile rating
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3>Assessment Timeline</h3>
        <p className="text-sm text-muted-foreground">
          Assessment dates and additional information
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Latest Assessment</Label>
            <DateInput
              value={formData.latest_assessment}
              onChange={(date) => updateFormData("latest_assessment", date)}
              placeholder="DD/MM/YYYY"
              disableFuture={true}
            />
            <p className="text-xs text-muted-foreground">
              Enter date when last assessment was completed
            </p>
          </div>

          <div className="space-y-2">
            <Label>Next Assessment</Label>
            <DateInput
              value={formData.next_assessment}
              onChange={(date) => updateFormData("next_assessment", date)}
              placeholder="DD/MM/YYYY"
              disablePast={true}
            />
            <p className="text-xs text-muted-foreground">
              Enter date for next scheduled assessment
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Client Tags</Label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TAGS.map((tag) => (
              <Badge
                key={tag}
                variant={formData.tags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-chart-1/20 transition-colors"
                onClick={() => handleTagToggle(tag)}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          {formData.tags.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {formData.tags.length} tag{formData.tags.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => updateFormData("notes", e.target.value)}
            placeholder="Additional information about the client..."
            className="min-h-[80px] resize-none"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground text-right">
            {formData.notes.length}/500
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3>Review & Confirm</h3>
        <p className="text-sm text-muted-foreground">
          Review all information before adding the client
        </p>
      </div>

      <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs text-muted-foreground">Client Name</Label>
            <p className="font-medium">{formData.name}</p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Email</Label>
            <p className="font-medium">{formData.email}</p>
          </div>
          {formData.company && (
            <div>
              <Label className="text-xs text-muted-foreground">Company</Label>
              <p className="font-medium">{formData.company}</p>
            </div>
          )}
          {formData.industry && (
            <div>
              <Label className="text-xs text-muted-foreground">Industry</Label>
              <p className="font-medium">{formData.industry}</p>
            </div>
          )}
          <div>
            <Label className="text-xs text-muted-foreground">Status</Label>
            <Badge variant={formData.status === "active" ? "default" : "secondary"}>
              {formData.status}
            </Badge>
          </div>
          {formData.total_investments && (
            <div>
              <Label className="text-xs text-muted-foreground">Total Investments</Label>
              <p className="font-medium">{formData.total_investments}</p>
            </div>
          )}
          {formData.esg_score && (
            <div>
              <Label className="text-xs text-muted-foreground">ESG Score</Label>
              <p className="font-medium">{formData.esg_score}/100</p>
            </div>
          )}
          <div>
            <Label className="text-xs text-muted-foreground">Assessment Status</Label>
            <Badge variant="outline">{formData.assessment_status}</Badge>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Sustainability Appetite</Label>
            <Badge variant="outline">{formData.sustainability_appetite.toUpperCase()}</Badge>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Sustainability Profile</Label>
            <Badge variant="outline">Profile {formData.sustainability_profile}</Badge>
          </div>
          {formData.latest_assessment && (
            <div>
              <Label className="text-xs text-muted-foreground">Latest Assessment</Label>
              <p className="font-medium">{formatDateDDMMYYYY(formData.latest_assessment)}</p>
            </div>
          )}
          {formData.next_assessment && (
            <div>
              <Label className="text-xs text-muted-foreground">Next Assessment</Label>
              <p className="font-medium">{formatDateDDMMYYYY(formData.next_assessment)}</p>
            </div>
          )}
        </div>

        {formData.tags.length > 0 && (
          <div>
            <Label className="text-xs text-muted-foreground">Tags</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {formData.notes && (
          <div>
            <Label className="text-xs text-muted-foreground">Notes</Label>
            <p className="text-sm mt-1">{formData.notes}</p>
          </div>
        )}
      </div>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          This client will be added to your directory and will be available for campaigns and assessments.
        </AlertDescription>
      </Alert>
    </div>
  );

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] sm:max-h-[85vh]">
        <DrawerHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl">Add New Client</DrawerTitle>
              <DrawerDescription>
                Create a new client profile with comprehensive sustainability and investment information
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="p-6 overflow-y-auto">
          <StepIndicator 
            currentStep={currentStep} 
            totalSteps={4} 
            stepLabels={STEP_LABELS}
            isStepComplete={isStepComplete}
          />
          
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        <div className="border-t border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
            </div>

            <div className="flex gap-2">
              {currentStep < 4 ? (
                <Button onClick={handleNext} className="bg-chart-1 hover:bg-chart-1/90">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading}
                  className="bg-chart-1 hover:bg-chart-1/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding Client...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Add Client
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}