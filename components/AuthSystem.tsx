import { useState } from "react";
import { SignInScreen } from "./auth/SignInScreen";
import { SignUpScreen } from "./auth/SignUpScreen";
import { ForgotPasswordScreen } from "./auth/ForgotPasswordScreen";
import { ResetPasswordScreen } from "./auth/ResetPasswordScreen";
import { EmailVerificationScreen } from "./auth/EmailVerificationScreen";
import { OnboardingScreen } from "./auth/OnboardingScreen";

export type AuthScreen = "signin" | "signup" | "forgot-password" | "reset-password" | "email-verification" | "onboarding";

interface AuthSystemProps {}

export function AuthSystem({}: AuthSystemProps) {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>("signin");
  const [userEmail, setUserEmail] = useState<string>("");
  const [resetToken, setResetToken] = useState<string>("");

  const handleScreenChange = (screen: AuthScreen, email?: string, token?: string) => {
    setCurrentScreen(screen);
    if (email) setUserEmail(email);
    if (token) setResetToken(token);
  };

  const handleAuthComplete = () => {
    // Authentication completion is now handled by the AuthContext
    // No need for callback since context will automatically update
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "signin":
        return <SignInScreen onNavigate={handleScreenChange} onAuthComplete={handleAuthComplete} />;
      case "signup":
        return <SignUpScreen onNavigate={handleScreenChange} />;
      case "forgot-password":
        return <ForgotPasswordScreen onNavigate={handleScreenChange} />;
      case "reset-password":
        return <ResetPasswordScreen onNavigate={handleScreenChange} email={userEmail} token={resetToken} />;
      case "email-verification":
        return <EmailVerificationScreen onNavigate={handleScreenChange} email={userEmail} />;
      case "onboarding":
        return <OnboardingScreen onNavigate={handleScreenChange} onComplete={handleAuthComplete} />;
      default:
        return <SignInScreen onNavigate={handleScreenChange} onAuthComplete={handleAuthComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-[rgba(235,245,255,0.5)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderScreen()}
      </div>
    </div>
  );
}