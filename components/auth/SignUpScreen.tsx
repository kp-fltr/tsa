import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Eye, EyeOff, User, Mail, Lock, Building, AlertCircle, ArrowLeft } from "lucide-react";
import { AuthScreen } from "../AuthSystem";
import { useAuth } from "../../contexts/AuthContext";
import svgPaths from "../../imports/svg-4ia94l7ewr";

interface SignUpScreenProps {
  onNavigate: (screen: AuthScreen, email?: string) => void;
}

export function SignUpScreen({ onNavigate }: SignUpScreenProps) {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      await signUp(formData.email, formData.password, fullName);
      
      // Success - user will be automatically logged in and redirected
      // The AuthContext will handle the state update
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-2xl sm:text-3xl text-card-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground text-sm">Join TSA Advisor to manage your sustainability programs</p>
        </div>

        {error && (
          <Alert className="mb-6 border-destructive/50 bg-destructive/5">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="h-11"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 h-11"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="company"
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="pl-10 h-11"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financial-advisor">Financial Advisor</SelectItem>
                <SelectItem value="investment-manager">Investment Manager</SelectItem>
                <SelectItem value="portfolio-manager">Portfolio Manager</SelectItem>
                <SelectItem value="wealth-manager">Wealth Manager</SelectItem>
                <SelectItem value="relationship-manager">Relationship Manager</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-10 h-11"
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="pl-10 pr-10 h-11"
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
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