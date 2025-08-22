import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { Steps } from "./Steps";
import { 
  ArrowLeft,
  BarChart3,
  Send,
  Eye,
  CheckCircle,
  Users,
  Mail,
  Calendar,
  Palette,
  AlertCircle,
  ExternalLink
} from "lucide-react";

interface ReviewDeployProps {
  onBack: () => void;
  onComplete: () => void;
  onGoToControlCenter: () => void;
  campaignData: {
    name: string;
    selectedClients: number;
    scheduleType: string;
    scheduledDate?: string;
    scheduledTime?: string;
  };
  emailData: {
    subject: string;
    greeting: string;
    body: string;
    brandColor: string;
    footerText: string;
  };
}

const expectedProgress = [
  { label: "Sent", count: 156, percentage: 100, icon: Send },
  { label: "Opened", count: 124, percentage: 79, icon: Eye },
  { label: "Completed", count: 87, percentage: 56, icon: CheckCircle }
];

export function ReviewDeploy({ onBack, onComplete, onGoToControlCenter, campaignData, emailData }: ReviewDeployProps) {
  const [checklist, setChecklist] = useState({
    campaignReviewed: false,
    emailContentVerified: false,
    recipientsConfirmed: false,
    brandingApproved: false,
    scheduleConfirmed: false
  });
  
  const [showDeployConfirmation, setShowDeployConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const allItemsChecked = Object.values(checklist).every(Boolean);

  const handleChecklistChange = (key: keyof typeof checklist, checked: boolean) => {
    setChecklist(prev => ({ ...prev, [key]: checked }));
  };

  const handleDeploy = () => {
    if (!allItemsChecked) return;
    setShowDeployConfirmation(true);
  };

  const confirmDeploy = () => {
    setShowDeployConfirmation(false);
    setShowSuccess(true);
  };



  // Success Screen
  if (showSuccess) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border px-4 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-chart-2/10">
              <CheckCircle className="w-6 h-6 text-chart-2" />
            </div>
            <div>
              <h1 style={{ fontFamily: 'Nunito, sans-serif' }}>Campaign Deployed Successfully!</h1>
              <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your campaign "{campaignData.name}" has been sent to {campaignData.selectedClients} clients
              </p>
            </div>
          </div>
        </div>

        {/* Success Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="w-full max-w-2xl text-center">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 rounded-full bg-chart-2/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-chart-2" />
              </div>
              <h3 className="mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>Campaign Successfully Deployed</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your sustainability assessment campaign has been sent to {campaignData.selectedClients} clients. 
                You can track responses and engagement in the Control Center.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>Back to Dashboard</span>
                </Button>
                <Button onClick={onGoToControlCenter} className="bg-chart-1 hover:bg-chart-1/90 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>Go to Control Center</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Deploy Confirmation Modal
  if (showDeployConfirmation) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-chart-3/10">
                <AlertCircle className="w-5 h-5 text-chart-3" />
              </div>
              Confirm Deployment
            </CardTitle>
            <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>
              Review and confirm your campaign deployment details
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-card-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                Deploy <strong>"{campaignData.name}"</strong> to {campaignData.selectedClients} clients?
              </p>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Campaign:</span>
                      <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{campaignData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Recipients:</span>
                      <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{campaignData.selectedClients} clients</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Subject:</span>
                      <span className="font-medium truncate ml-4" style={{ fontFamily: 'Inter, sans-serif' }}>{emailData.subject}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                Once deployed, the campaign cannot be modified.
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowDeployConfirmation(false)}>
                <span style={{ fontFamily: 'Inter, sans-serif' }}>Cancel</span>
              </Button>
              <Button onClick={confirmDeploy} className="bg-chart-1 hover:bg-chart-1/90">
                <Send className="w-4 h-4 mr-2" />
                <span style={{ fontFamily: 'Inter, sans-serif' }}>Deploy Campaign</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with Progress Tracker - Mobile Optimized */}
      <div className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 min-h-[44px] touch-manipulation">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Email</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-chart-1/10 shrink-0">
            <BarChart3 className="w-6 h-6 text-chart-1" />
          </div>
          <div className="min-w-0">
            <h1 className="text-card-foreground mb-2 text-xl sm:text-2xl lg:text-3xl">Review & Deploy</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Review your campaign details and deploy to selected clients
            </p>
          </div>
        </div>

        {/* Progress Tracker */}
        <Steps currentStep={3} />
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
          {/* Left: Campaign Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Nunito, sans-serif' }}>Campaign Summary</CardTitle>
                <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>Review your campaign configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-chart-1/10">
                      <Mail className="w-4 h-4 text-chart-1" />
                    </div>
                    <div>
                      <p className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{campaignData.name}</p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Campaign Name</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-chart-2/10">
                      <Users className="w-4 h-4 text-chart-2" />
                    </div>
                    <div>
                      <p className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{campaignData.selectedClients} clients</p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Recipients</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-chart-3/10">
                      <Calendar className="w-4 h-4 text-chart-3" />
                    </div>
                    <div>
                      <p className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {campaignData.scheduleType === "now" 
                          ? "Send Immediately" 
                          : `${campaignData.scheduledDate} at ${campaignData.scheduledTime}`
                        }
                      </p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Schedule</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-chart-4/10">
                      <Palette className="w-4 h-4 text-chart-4" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: emailData.brandColor }}></div>
                      <p className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{emailData.brandColor}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pre-deployment Checklist */}
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Nunito, sans-serif' }}>Pre-deployment Checklist</CardTitle>
                <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>Confirm all items before deploying</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={checklist.campaignReviewed}
                      onCheckedChange={(checked) => handleChecklistChange('campaignReviewed', !!checked)}
                    />
                    <div>
                      <p className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Campaign details reviewed</p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Name, schedule, and settings verified</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={checklist.emailContentVerified}
                      onCheckedChange={(checked) => handleChecklistChange('emailContentVerified', !!checked)}
                    />
                    <div>
                      <p className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Email content verified</p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Subject line and message approved</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={checklist.recipientsConfirmed}
                      onCheckedChange={(checked) => handleChecklistChange('recipientsConfirmed', !!checked)}
                    />
                    <div>
                      <p className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Recipients confirmed</p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Client list is accurate and complete</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={checklist.brandingApproved}
                      onCheckedChange={(checked) => handleChecklistChange('brandingApproved', !!checked)}
                    />
                    <div>
                      <p className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Branding approved</p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Colors and footer text finalized</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={checklist.scheduleConfirmed}
                      onCheckedChange={(checked) => handleChecklistChange('scheduleConfirmed', !!checked)}
                    />
                    <div>
                      <p className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Schedule confirmed</p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Deployment timing is correct</p>
                    </div>
                  </div>
                </div>

                {!allItemsChecked && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                      Complete all checklist items to enable deployment.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Center: Email Preview */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Nunito, sans-serif' }}>Email Preview</CardTitle>
                <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>Final email appearance</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="border-2 rounded-lg overflow-hidden h-[600px] overflow-y-auto">
                  <div className="bg-white p-6" style={{ borderTopColor: emailData.brandColor, borderTopWidth: "4px" }}>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <div><strong>To:</strong> james.wellington@email.com</div>
                        <div><strong>Subject:</strong> {emailData.subject}</div>
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {emailData.greeting.replace("{Client Name}", "James Wellington")}
                        </p>
                        <div className="text-sm whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {emailData.body
                            .replace("{Client Name}", "James Wellington")
                            .replace("{Company}", "Wellington Partners")
                            .replace("{Link}", "[Assessment Link]")
                          }
                        </div>
                        <Separator />
                        <Button size="sm" style={{ backgroundColor: emailData.brandColor, fontFamily: 'Inter, sans-serif' }}>
                          Start Assessment
                        </Button>
                      </div>
                      <Separator />
                      <div className="text-xs text-gray-500 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {emailData.footerText}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Expected Results */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Nunito, sans-serif' }}>Expected Results</CardTitle>
                <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>Projected campaign performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {expectedProgress.map((item) => {
                  const Icon = item.icon;
                  const projectedCount = Math.round(campaignData.selectedClients * item.percentage / 100);
                  return (
                    <div key={item.label} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                          <span className="text-base" style={{ fontFamily: 'Inter, sans-serif' }}>{item.label}</span>
                        </div>
                        <span className="font-medium text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>{projectedCount}</span>
                      </div>
                      <Progress value={item.percentage} className="h-3" />
                      <p className="text-muted-foreground text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {item.percentage}% completion rate
                      </p>
                    </div>
                  );
                })}
                
                <Separator />
                
                <div className="space-y-3">
                  <h6 className="font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>Engagement Summary</h6>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-chart-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {Math.round(campaignData.selectedClients * 0.79)}
                      </div>
                      <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Expected Opens</p>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-chart-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {Math.round(campaignData.selectedClients * 0.56)}
                      </div>
                      <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Expected Completions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation Footer - Mobile Optimized */}
      <div className="border-t bg-card px-4 sm:px-6 lg:px-8 py-4 sm:py-6 shrink-0">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={onBack} className="min-h-[44px] touch-manipulation">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Back</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <Button 
            onClick={handleDeploy}
            disabled={!allItemsChecked}
            className="bg-chart-1 hover:bg-chart-1/90 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
          >
            <Send className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Deploy Campaign</span>
            <span className="sm:hidden">Deploy</span>
          </Button>
        </div>
      </div>
    </div>
  );
}