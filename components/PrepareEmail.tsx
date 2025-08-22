import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription } from "./ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Steps } from "./Steps";
import svgPaths from "../imports/svg-syjcfv4lwj";
import { 
  ArrowLeft,
  Mail,
  Sparkles,
  Monitor,
  Smartphone,
  ChevronRight,
  AlertCircle,
  Info,
  Upload,
  Wand2
} from "lucide-react";

interface PrepareEmailProps {
  onBack: () => void;
  onNext: (emailData: EmailData) => void;
  campaignData: {
    name: string;
    selectedClients: number;
  };
}

interface EmailData {
  subject: string;
  greeting: string;
  body: string;
  brandColor: string;
  footerText: string;
  logoUrl?: string;
}

const emailTemplates = [
  {
    id: "welcome",
    name: "Welcome Assessment",
    subject: "Your Sustainability Assessment is Ready",
    body: "Dear {Client Name},\n\nWe've prepared a personalised sustainability assessment for {Company}. Please take 10-15 minutes to complete it.\n\nBest regards,\nYour Advisory Team"
  },
  {
    id: "follow-up",
    name: "Assessment Reminder",
    subject: "Reminder: Complete Your Assessment",
    body: "Dear {Client Name},\n\nThis is a friendly reminder to complete your sustainability assessment. Your input is valuable for creating a tailored roadmap.\n\nBest regards,\nYour Advisory Team"
  },
  {
    id: "quarterly",
    name: "Quarterly Review",
    subject: "Quarterly Sustainability Review",
    body: "Dear {Client Name},\n\nIt's time for your quarterly sustainability review. Let's assess your progress and identify new opportunities.\n\nBest regards,\nYour Advisory Team"
  }
];

// Help icon component from Figma import
function TablerIconHelpCircle() {
  return (
    <div className="relative shrink-0 size-4">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="tabler icon / help-circle">
          <path
            d={svgPaths.p9daa100}
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

export function PrepareEmail({ onBack, onNext, campaignData }: PrepareEmailProps) {
  const [emailSubject, setEmailSubject] = useState("");
  const [personalizedGreeting, setPersonalizedGreeting] = useState("Dear {Client Name},");
  const [emailBody, setEmailBody] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [aiTone, setAiTone] = useState("formal");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // White-label customization
  const [brandColor, setBrandColor] = useState("#1677ff");
  const [footerText, setFooterText] = useState("Powered by Your Advisory Firm");
  const [logoUrl, setLogoUrl] = useState<string>("");

  // Validation states
  const [canProceed, setCanProceed] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // useEffect to update validation when fields change
  useEffect(() => {
    const errors: string[] = [];
    
    if (emailSubject.trim() === "") {
      errors.push("Email subject line is required");
    }
    
    if (emailBody.trim() === "") {
      errors.push("Email body content is required");
    }

    setValidationErrors(errors);
    setCanProceed(errors.length === 0);
    
    // Hide error message when validation passes
    if (errors.length === 0) {
      setShowValidationError(false);
    }
  }, [emailSubject, emailBody]);

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setEmailSubject(template.subject);
      setEmailBody(template.body);
    }
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const toneMap = {
        formal: "We are pleased to inform you",
        friendly: "Hope you're doing well!",
        concise: "Quick update:"
      };
      
      const generatedSubject = `${campaignData.name}: Sustainability Assessment`;
      const generatedBody = `${toneMap[aiTone as keyof typeof toneMap]} {Client Name},\n\nBased on your request: "${aiPrompt}"\n\nWe've prepared a customized sustainability assessment for {Company}.\n\nBest regards,\nYour Advisory Team`;
      
      setEmailSubject(generatedSubject);
      setEmailBody(generatedBody);
      setIsGenerating(false);
    }, 2000);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImproveWriting = async (field: 'subject' | 'body') => {
    setIsGenerating(true);
    
    // Simulate AI improvement
    setTimeout(() => {
      if (field === 'subject') {
        setEmailSubject(prev => prev ? `${prev} - Enhanced for Better Engagement` : "Your Sustainability Assessment - Action Required");
      } else {
        setEmailBody(prev => prev ? 
          `${prev}\n\nP.S. This assessment will help you identify key opportunities for sustainable growth and cost savings.` :
          "Dear {Client Name},\n\nI hope this message finds you well. We've prepared a comprehensive sustainability assessment specifically tailored for {Company}.\n\nThis assessment will help you:\n• Identify cost-saving opportunities\n• Understand your environmental impact\n• Develop actionable sustainability strategies\n\nPlease take 10-15 minutes to complete it at your earliest convenience.\n\nBest regards,\nYour Advisory Team"
        );
      }
      setIsGenerating(false);
    }, 1500);
  };

  const handleNext = () => {
    if (!canProceed) {
      setShowValidationError(true);
      return;
    }

    const emailData: EmailData = {
      subject: emailSubject,
      greeting: personalizedGreeting,
      body: emailBody,
      brandColor,
      footerText,
      logoUrl
    };
    onNext(emailData);
  };



  return (
    <TooltipProvider>
      <div className="h-full flex flex-col">
        {/* Header with Progress Tracker - Mobile Optimized */}
        <div className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 min-h-[44px] touch-manipulation">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Setup</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-chart-1/10 shrink-0">
              <Mail className="w-6 h-6 text-chart-1" />
            </div>
            <div className="min-w-0">
              <h1 className="text-card-foreground mb-2 text-xl sm:text-2xl lg:text-3xl">Prepare Email</h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Design your campaign email with AI assistance
              </p>
            </div>
          </div>

          {/* Progress Tracker */}
          <Steps currentStep={2} />
        </div>

        {/* Main Content - Mobile Optimized Layout */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 overflow-hidden">
          {showValidationError && validationErrors.length > 0 && (
            <Alert className="mb-4 sm:mb-6 border-destructive bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive text-sm">
                Please complete the following required fields:
                <ul className="list-disc list-inside mt-2">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 h-full min-h-0">
            {/* Email Composer - Full width on mobile, 2 cols on desktop */}
            <div className="lg:col-span-2 order-first flex flex-col min-h-0">
              <Card className="flex flex-col h-full">
                <CardHeader className="pb-4 shrink-0">
                  <CardTitle className="text-lg sm:text-xl">Email Composer</CardTitle>
                  <CardDescription className="text-sm">Design your campaign email content</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4 sm:space-y-6 overflow-y-auto min-h-0">
                  {/* Campaign Info */}
                  <Card className="bg-muted/20">

                  </Card>

                  {/* Template Selection */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label className="text-sm">Choose Template</Label>
                      <TablerIconHelpCircle />
                      <span className="text-muted-foreground text-sm">(optional)</span>
                    </div>
                    <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                      <SelectTrigger className="min-h-[44px] touch-manipulation border-2 border-border focus:border-chart-1 focus:ring-2 focus:ring-chart-1/20">
                        <SelectValue placeholder="Select a template..." />
                      </SelectTrigger>
                      <SelectContent>
                        {emailTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject Line with Improve Writing */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label className="text-sm">Subject Line</Label>
                      <span className="text-destructive text-sm">*</span>
                      <TablerIconHelpCircle />
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Enter email subject..."
                        className={`flex-1 min-h-[44px] touch-manipulation border-2 border-border focus:border-chart-1 focus:ring-2 focus:ring-chart-1/20 ${emailSubject.trim() === "" && showValidationError ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                      />
                      <Button
                        onClick={() => handleImproveWriting('subject')}
                        disabled={isGenerating}
                        variant="outline"
                        size="sm"
                        className="min-h-[44px] touch-manipulation whitespace-nowrap"
                      >
                        {isGenerating ? (
                          <Sparkles className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Wand2 className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Improve</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Personalized Greeting */}


                  {/* Email Body with Improve Writing */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label className="text-sm">Email Body</Label>
                      <span className="text-destructive text-sm">*</span>
                      <TablerIconHelpCircle />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        placeholder="Write your email content..."
                        className={`h-32 sm:h-40 min-h-[120px] border-2 border-border focus:border-chart-1 focus:ring-2 focus:ring-chart-1/20 ${emailBody.trim() === "" && showValidationError ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                      />
                      <Button
                        onClick={() => handleImproveWriting('body')}
                        disabled={isGenerating}
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto min-h-[44px] touch-manipulation"
                      >
                        {isGenerating ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                            Improving writing...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-4 h-4 mr-2" />
                            Improve writing with AI
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Variables */}
                  <Card className="bg-muted/20">
                    <CardContent className="pt-4">
                      <Label className="text-sm mb-2 block">Available Variables</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="font-mono text-xs">
                          {"{Client Name}"}
                        </Badge>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {"{Company}"}
                        </Badge>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {"{Link}"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* White-label Customization */}
                  <div className="space-y-4">
                    <h5 className="text-base sm:text-lg">White-label Customization</h5>
                    
                    {/* Logo Upload */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Label className="text-sm">Upload Logo</Label>
                        <TablerIconHelpCircle />
                        <span className="text-muted-foreground text-sm">(optional)</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          className="min-h-[44px] touch-manipulation"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Logo
                        </Button>
                        {logoUrl && (
                          <div className="flex items-center gap-2 p-2 border rounded-md">
                            <img src={logoUrl} alt="Logo preview" className="w-8 h-8 object-contain" />
                            <span className="text-sm text-muted-foreground">Logo uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Brand Color */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Label className="text-sm">Brand Color</Label>
                        <TablerIconHelpCircle />
                        <span className="text-muted-foreground text-sm">(optional)</span>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={brandColor}
                          onChange={(e) => setBrandColor(e.target.value)}
                          className="w-12 h-12 sm:w-14 sm:h-14 p-1 border-2 border-border"
                        />
                        <Input
                          value={brandColor}
                          onChange={(e) => setBrandColor(e.target.value)}
                          placeholder="#1677ff"
                          className="flex-1 min-h-[44px] touch-manipulation border-2 border-border focus:border-chart-1 focus:ring-2 focus:ring-chart-1/20"
                        />
                      </div>
                    </div>

                    {/* Footer Text */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Label className="text-sm">Footer Text</Label>
                        <TablerIconHelpCircle />
                        <span className="text-muted-foreground text-sm">(optional)</span>
                      </div>
                      <Input
                        value={footerText}
                        onChange={(e) => setFooterText(e.target.value)}
                        placeholder="Powered by Your Advisory Firm"
                        className="min-h-[44px] touch-manipulation border-2 border-border focus:border-chart-1 focus:ring-2 focus:ring-chart-1/20"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Preview - Shown second on mobile, takes remaining space on desktop */}
            <div className="lg:col-span-2 order-last flex flex-col min-h-0">
              <Card className="flex flex-col h-full min-h-0">
                <CardHeader className="pb-4 shrink-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg sm:text-xl">Live Preview</CardTitle>
                      <CardDescription className="text-sm">How your email will look</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={previewDevice === "desktop" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreviewDevice("desktop")}
                        className="min-h-[40px] touch-manipulation"
                      >
                        <Monitor className="w-4 h-4" />
                        <span className="hidden sm:inline ml-1">Desktop</span>
                      </Button>
                      <Button
                        variant={previewDevice === "mobile" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreviewDevice("mobile")}
                        className="min-h-[40px] touch-manipulation"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span className="hidden sm:inline ml-1">Mobile</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto min-h-0">
                  <div className={`border-2 rounded-lg overflow-hidden mx-auto ${previewDevice === "mobile" ? "max-w-[320px]" : "max-w-full"}`}>
                    <div className="bg-white relative">
                      {/* Logo header if uploaded */}
                      {logoUrl && (
                        <div className="p-4 border-b bg-gray-50">
                          <img src={logoUrl} alt="Brand logo" className="h-8 object-contain" />
                        </div>
                      )}
                      
                      {/* Email header with brand color */}
                      <div className="h-2" style={{ backgroundColor: brandColor }} />
                      
                      <div className="p-4 space-y-4">
                        {/* Email meta info */}
                        <div className="text-sm text-gray-600 space-y-1">
                          <div><strong>To:</strong> james.wellington@email.com</div>
                          <div><strong>Subject:</strong> {emailSubject || "Your email subject"}</div>
                        </div>
                        
                        <Separator />
                        
                        {/* Email content */}
                        <div className="space-y-3">
                          <p className="text-sm">
                            {personalizedGreeting.replace("{Client Name}", "James Wellington")}
                          </p>
                          
                          <div className="text-sm whitespace-pre-wrap leading-relaxed">
                            {emailBody
                              .replace(/\{Client Name\}/g, "James Wellington")
                              .replace(/\{Company\}/g, "Wellington Partners")
                              .replace(/\{Link\}/g, "assessment-link")
                              || "Your email content will appear here..."
                            }
                          </div>
                          
                          {emailBody && (
                            <>
                              <Separator />
                              <Button 
                                size="sm" 
                                className="text-white"
                                style={{ backgroundColor: brandColor }}
                              >
                                Start Assessment
                              </Button>
                            </>
                          )}
                        </div>
                        
                        <Separator />
                        
                        {/* Footer */}
                        <div className="text-xs text-gray-500 text-center">
                          {footerText}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Fixed Navigation Footer - Responsive to sidebar state */}
        <div className="fixed bottom-0 right-0 left-0 md:left-[var(--sidebar-width-icon)] lg:left-[var(--sidebar-width)] z-[60] border-t bg-card px-4 sm:px-6 lg:px-8 py-4 sm:py-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {!canProceed && (
                <span className="text-muted-foreground hidden sm:inline">
                  Complete all required fields to continue
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onBack} className="min-h-[44px] touch-manipulation">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Back</span>
                <span className="sm:hidden">Back</span>
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!canProceed}
                className={`min-h-[44px] touch-manipulation font-semibold transition-all duration-200 ${
                  canProceed 
                    ? "bg-chart-1 hover:bg-chart-1/90 text-white" 
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                <span className="hidden sm:inline">Next: Review & Deploy</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}