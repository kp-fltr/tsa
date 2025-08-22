import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ViewType, CampaignData, EmailData, NavigationHandlers, AppState } from "../types/app";

export function useAppNavigation(): [AppState, NavigationHandlers] {
  const { signOut } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [emailData, setEmailData] = useState<EmailData | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const handleNavigate = (view: string) => {
    console.log('useAppNavigation - handleNavigate called:', { from: currentView, to: view });
    
    // Validate the view type
    const validViews: ViewType[] = ["dashboard", "client-management", "client-directory", "analytics", "reports", "campaign-distribution", "prepare-email", "review-deploy"];
    
    if (!validViews.includes(view as ViewType)) {
      console.warn(`Invalid view type: ${view}. Defaulting to dashboard.`);
      setCurrentView("dashboard");
      return;
    }
    
    setCurrentView(view as ViewType);
    
    // Reset campaign flow data when navigating to main sections
    if (view !== "campaign-distribution" && view !== "prepare-email" && view !== "review-deploy") {
      setCampaignData(null);
      setEmailData(null);
    }
    
    console.log('useAppNavigation - Navigation completed:', { currentView: view });
  };

  const handleCreateCampaign = () => {
    console.log('useAppNavigation - handleCreateCampaign called');
    setCurrentView("campaign-distribution");
  };

  const handleBackToDashboard = () => {
    console.log('useAppNavigation - handleBackToDashboard called');
    setCurrentView("dashboard");
    setCampaignData(null);
    setEmailData(null);
  };

  const handleGoToControlCenter = () => {
    console.log('useAppNavigation - handleGoToControlCenter called');
    setCurrentView("client-management");
  };

  const handleCampaignSetupComplete = (data: CampaignData) => {
    console.log('useAppNavigation - handleCampaignSetupComplete called:', data);
    setCampaignData(data);
    setCurrentView("prepare-email");
  };

  const handleEmailComplete = (data: EmailData) => {
    console.log('useAppNavigation - handleEmailComplete called:', data);
    setEmailData(data);
    setCurrentView("review-deploy");
  };

  const handleBackToCampaignSetup = () => {
    console.log('useAppNavigation - handleBackToCampaignSetup called');
    setCurrentView("campaign-distribution");
  };

  const handleBackToPrepareEmail = () => {
    console.log('useAppNavigation - handleBackToPrepareEmail called');
    setCurrentView("prepare-email");
  };

  const handleDeployComplete = () => {
    console.log('useAppNavigation - handleDeployComplete called');
    // This will be handled by the ReviewDeploy component's success screen
    // which includes navigation to Control Center
  };

  const handleLogout = async () => {
    console.log('useAppNavigation - handleLogout called');
    try {
      await signOut();
      setCurrentView("dashboard");
      setCampaignData(null);
      setEmailData(null);
      setIsAiChatOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Additional handlers that might be needed by components
  const handleUpdateCampaignData = (data: CampaignData) => {
    console.log('useAppNavigation - handleUpdateCampaignData called:', data);
    setCampaignData(data);
  };

  const handleUpdateEmailData = (data: EmailData) => {
    console.log('useAppNavigation - handleUpdateEmailData called:', data);
    setEmailData(data);
  };

  const appState: AppState = {
    currentView,
    campaignData,
    emailData,
    isAiChatOpen
  };

  const handlers: NavigationHandlers & {
    handleUpdateCampaignData: (data: CampaignData) => void;
    handleUpdateEmailData: (data: EmailData) => void;
  } = {
    handleNavigate,
    handleCreateCampaign,
    handleBackToDashboard,
    handleGoToControlCenter,
    handleCampaignSetupComplete,
    handleEmailComplete,
    handleBackToCampaignSetup,
    handleBackToPrepareEmail,
    handleDeployComplete,
    handleLogout,
    setIsAiChatOpen,
    handleUpdateCampaignData,
    handleUpdateEmailData
  };

  // Debug logging for current state
  if (process.env.NODE_ENV === 'development') {
    console.log('useAppNavigation - Current state:', { currentView, campaignData: !!campaignData, emailData: !!emailData, isAiChatOpen });
  }

  return [appState, handlers];
}