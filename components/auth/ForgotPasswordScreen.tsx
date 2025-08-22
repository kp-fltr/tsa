import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { AuthScreen } from "../AuthSystem";
import svgPaths from "../../imports/svg-4ia94l7ewr";

interface ForgotPasswordScreenProps {
  onNavigate: (screen: AuthScreen, email?: string) => void;
}

export function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email) {
      setSuccess(true);
      // Auto-redirect to reset password screen after 3 seconds
      setTimeout(() => {
        onNavigate("reset-password", email, "mock-token");
      }, 3000);
    } else {
      setError("Please enter a valid email address");
    }
    
    setIsLoading(false);
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

  if (success) {
    return (
      <Card className="w-full shadow-lg border-0 bg-card">
        <CardContent className="p-6 sm:p-8">
          <TsaLogo />
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-chart-2" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl text-card-foreground mb-2">Check Your Email</h1>
            <p className="text-muted-foreground text-sm">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>

          <Alert className="mb-6 border-chart-2/50 bg-chart-2/5">
            <CheckCircle className="h-4 w-4 text-chart-2" />
            <AlertDescription className="text-chart-2">
              If you don't see the email in your inbox, check your spam folder.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button
              onClick={() => onNavigate("signin")}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Back to Sign In
            </Button>
            
            <Button
              onClick={() => setSuccess(false)}
              variant="outline"
              className="w-full h-12"
            >
              Try Different Email
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg border-0 bg-card">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => onNavigate("signin")}
            className="mr-4 p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <TsaLogo />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl text-card-foreground mb-2">Reset Password</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {error && (
          <Alert className="mb-6 border-destructive/50 bg-destructive/5">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 text-base"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <button
              onClick={() => onNavigate("signin")}
              className="text-chart-1 hover:text-chart-1/80 transition-colors underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}