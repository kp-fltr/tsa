import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { CheckCircle, ArrowRight, Users, TrendingUp, Shield, Zap } from "lucide-react";
import { AuthScreen } from "../AuthSystem";
import svgPaths from "../../imports/svg-4ia94l7ewr";

interface OnboardingScreenProps {
  onNavigate: (screen: AuthScreen) => void;
  onComplete: () => void;
}

export function OnboardingScreen({ onNavigate, onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to TSA Advisor",
      description: "Your comprehensive platform for managing client sustainability assessments and campaigns.",
      icon: <CheckCircle className="w-12 h-12 text-chart-1" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-chart-1" />
              <h4 className="font-semibold text-sm">Client Management</h4>
              <p className="text-xs text-muted-foreground">Organize and track your clients</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-chart-2" />
              <h4 className="font-semibold text-sm">Analytics</h4>
              <p className="text-xs text-muted-foreground">Insights and reporting</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-chart-3" />
              <h4 className="font-semibold text-sm">Security</h4>
              <p className="text-xs text-muted-foreground">Bank-level security</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-chart-4" />
              <h4 className="font-semibold text-sm">Automation</h4>
              <p className="text-xs text-muted-foreground">Streamlined workflows</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Key Features",
      description: "Discover the powerful tools at your disposal for sustainability advisory.",
      icon: <TrendingUp className="w-12 h-12 text-chart-2" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-chart-1 rounded-full flex items-center justify-center mt-0.5">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Campaign Management</h4>
                <p className="text-xs text-muted-foreground">Create and distribute sustainability assessments to your clients</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-chart-2 rounded-full flex items-center justify-center mt-0.5">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Client Directory</h4>
                <p className="text-xs text-muted-foreground">Comprehensive client database with advanced filtering</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-chart-3 rounded-full flex items-center justify-center mt-0.5">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">AI Assistant</h4>
                <p className="text-xs text-muted-foreground">Smart insights and recommendations powered by AI</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-chart-4 rounded-full flex items-center justify-center mt-0.5">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Analytics & Reporting</h4>
                <p className="text-xs text-muted-foreground">Detailed insights and customizable reports</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "You're All Set!",
      description: "Your account is ready. Start exploring your sustainability advisory dashboard.",
      icon: <CheckCircle className="w-12 h-12 text-chart-2" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-chart-1/10 to-chart-2/10 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary" className="bg-chart-1/20 text-chart-1">New</Badge>
              <h4 className="font-semibold text-sm">Quick Start Tips</h4>
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>• Use the AI Assistant for instant insights and recommendations</li>
              <li>• Create your first campaign from the dashboard</li>
              <li>• Import your existing client data via CSV</li>
              <li>• Explore the analytics section for performance metrics</li>
            </ul>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">
              Need help getting started?
            </p>
            <Button variant="outline" size="sm" className="text-xs">
              View Tutorial
            </Button>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const TsaLogo = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="w-[60px] h-[60px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 110 109"
        >
          <g>
            <g>
              <path d={svgPaths.p783e900} fill="var(--foreground)" />
              <path d={svgPaths.p39805e00} fill="var(--foreground)" />
              <path d={svgPaths.p34c88c00} fill="var(--foreground)" />
              <path d={svgPaths.p217ffd80} fill="var(--foreground)" />
              <path d={svgPaths.p338bc00} fill="var(--foreground)" />
              <path d={svgPaths.pc230170} fill="var(--foreground)" />
              <path d={svgPaths.p198ebc00} fill="var(--foreground)" />
              <path d={svgPaths.p21805e00} fill="var(--foreground)" />
              <path d={svgPaths.p2dcdb580} fill="var(--foreground)" />
              <path d={svgPaths.p30ec7500} fill="var(--foreground)" />
              <path d={svgPaths.p2e9a4080} fill="var(--foreground)" />
              <path d={svgPaths.p321977c0} fill="var(--foreground)" />
              <path d={svgPaths.p10258180} fill="var(--foreground)" />
              <path d={svgPaths.p4052400} fill="var(--foreground)" />
              <path d={svgPaths.p39f2b500} fill="var(--foreground)" />
            </g>
            <path
              clipRule="evenodd"
              d={svgPaths.p244f6a00}
              fill="var(--chart-1)"
              fillRule="evenodd"
            />
          </g>
        </svg>
      </div>
    </div>
  );

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-card">
      <CardContent className="p-6 sm:p-8">
        <TsaLogo />
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-xs text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            {currentStepData.icon}
          </div>
          <h1 className="text-2xl text-card-foreground mb-2">{currentStepData.title}</h1>
          <p className="text-muted-foreground text-sm">{currentStepData.description}</p>
        </div>

        <div className="mb-8">
          {currentStepData.content}
        </div>

        <div className="flex gap-3">
          {currentStep < steps.length - 1 ? (
            <>
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex-1 h-12"
              >
                Skip
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Questions? Visit our{" "}
            <a href="#" className="text-chart-1 hover:text-chart-1/80 underline">
              Help Center
            </a>
            {" "}or contact{" "}
            <a href="mailto:support@tsaadvisor.com" className="text-chart-1 hover:text-chart-1/80 underline">
              support
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}