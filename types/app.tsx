export type ViewType = "dashboard" | "client-management" | "client-directory" | "analytics" | "reports" | "campaign-distribution" | "prepare-email" | "review-deploy";

export interface CampaignData {
  name: string;
  selectedClients: number;
  scheduleType: string;
  scheduledDate?: string;
  scheduledTime?: string;
}

export interface EmailData {
  subject: string;
  greeting: string;
  body: string;
  brandColor: string;
  footerText: string;
}

export interface NavigationHandlers {
  handleNavigate: (view: string) => void;
  handleCreateCampaign: () => void;
  handleBackToDashboard: () => void;
  handleGoToControlCenter: () => void;
  handleCampaignSetupComplete: (data: CampaignData) => void;
  handleEmailComplete: (data: EmailData) => void;
  handleBackToCampaignSetup: () => void;
  handleBackToPrepareEmail: () => void;
  handleDeployComplete: () => void;
  handleLogout: () => Promise<void>;
  setIsAiChatOpen: (isOpen: boolean) => void;
}

export interface AppState {
  currentView: ViewType;
  campaignData: CampaignData | null;
  emailData: EmailData | null;
  isAiChatOpen: boolean;
}