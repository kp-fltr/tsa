import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Mail, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { AuthScreen } from "../AuthSystem";
import svgPaths from "../../imports/svg-4ia94l7ewr";

interface EmailVerificationScreenProps {
  onNavigate: (screen: AuthScreen, email?: string) => void;
  email: string;
}

export function EmailVerificationScreen({ onNavigate, email }: EmailVerificationScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResendEmail = async () => {
    setResendLoading(true);
    setResendSuccess(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setResendSuccess(true);
    setResendLoading(false);
    setCanResend(false);
    setCountdown(60);

    // Hide success message after 5 seconds
    setTimeout(() => {
      setResendSuccess(false);
    }, 5000);
  };

  const handleVerifyLater = () => {
    // In a real app, this would allow user to continue with limited access
    onNavigate("onboarding");
  };

  const TsaLogo = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="w-[80px] h-[80px]">
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

  return (
    <Card className="w-full shadow-lg border-0 bg-card">
      <CardContent className="p-6 sm:p-8">
        <TsaLogo />
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-chart-1/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-chart-1" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl text-card-foreground mb-2">Verify Your Email</h1>
          <p className="text-muted-foreground text-sm">
            We've sent a verification link to <strong>{email}</strong>. Please check your email and click the link to activate your account.
          </p>
        </div>

        {resendSuccess && (
          <Alert className="mb-6 border-chart-2/50 bg-chart-2/5">
            <CheckCircle className="h-4 w-4 text-chart-2" />
            <AlertDescription className="text-chart-2">
              Verification email sent successfully! Please check your inbox.
            </AlertDescription>
          </Alert>
        )}

        <Alert className="mb-6 border-chart-3/50 bg-chart-3/5">
          <AlertCircle className="h-4 w-4 text-chart-3" />
          <AlertDescription className="text-chart-3">
            <strong>Important:</strong> Check your spam folder if you don't see the email in your inbox.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Button
            onClick={handleResendEmail}
            disabled={!canResend || resendLoading}
            variant="outline"
            className="w-full h-12 flex items-center gap-2"
          >
            {resendLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : canResend ? (
              <>
                <Mail className="w-4 h-4" />
                Resend Verification Email
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Resend in {countdown}s
              </>
            )}
          </Button>

          <Button
            onClick={handleVerifyLater}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Continue to Onboarding
          </Button>

          <Button
            onClick={() => onNavigate("signin")}
            variant="ghost"
            className="w-full h-12"
          >
            Back to Sign In
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Having trouble? Contact our support team at{" "}
            <a href="mailto:support@tsaadvisor.com" className="text-chart-1 hover:text-chart-1/80 underline">
              support@tsaadvisor.com
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}