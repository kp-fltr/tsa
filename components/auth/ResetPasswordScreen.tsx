import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { AuthScreen } from "../AuthSystem";
import svgPaths from "../../imports/svg-4ia94l7ewr";

interface ResetPasswordScreenProps {
  onNavigate: (screen: AuthScreen, email?: string) => void;
  email: string;
  token: string;
}

export function ResetPasswordScreen({ onNavigate, email, token }: ResetPasswordScreenProps) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSuccess(true);
    
    // Auto-redirect to sign in after 3 seconds
    setTimeout(() => {
      onNavigate("signin");
    }, 3000);
    
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
            <h1 className="text-2xl sm:text-3xl text-card-foreground mb-2">Password Reset</h1>
            <p className="text-muted-foreground text-sm">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
          </div>

          <Alert className="mb-6 border-chart-2/50 bg-chart-2/5">
            <CheckCircle className="h-4 w-4 text-chart-2" />
            <AlertDescription className="text-chart-2">
              You will be redirected to the sign-in page in a few seconds...
            </AlertDescription>
          </Alert>

          <Button
            onClick={() => onNavigate("signin")}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Continue to Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg border-0 bg-card">
      <CardContent className="p-6 sm:p-8">
        <TsaLogo />
        
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl text-card-foreground mb-2">Create New Password</h1>
          <p className="text-muted-foreground text-sm">
            Enter a new password for <strong>{email}</strong>
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
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-10 h-12 text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="pl-10 pr-10 h-12 text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading ? "Updating Password..." : "Update Password"}
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