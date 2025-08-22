import React from 'react';
import { Dashboard } from './Dashboard';
import { ClientManagement } from './ClientManagement';
import { CampaignDistribution } from './CampaignDistribution';
import { TestDistributionManagement } from './TestDistributionManagement';
import { Analytics } from './Analytics';
import { PrepareEmail } from './PrepareEmail';
import { ReviewDeploy } from './ReviewDeploy';
import { ControlCenter } from './ControlCenter';
import { DebugMockData } from './DebugMockData';
import { CampaignData, EmailData, NavigationHandlers } from '../types/app';

interface ViewRendererProps {
  currentView: string;
  campaignData?: CampaignData | null;
  emailData?: EmailData | null;
  handlers: NavigationHandlers & {
    handleUpdateCampaignData?: (data: CampaignData) => void;
    handleUpdateEmailData?: (data: EmailData) => void;
  };
}

export function ViewRenderer({ 
  currentView, 
  campaignData, 
  emailData, 
  handlers 
}: ViewRendererProps) {
  // Enhanced view routing with better error handling and backward compatibility
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            onNavigate={handlers.handleNavigate}
            onCreateCampaign={handlers.handleCreateCampaign}
          />
        );
      
      case 'client-directory':
      case 'client-management': // Backward compatibility
        return (
          <ClientManagement
            onNavigate={handlers.handleNavigate}
            onCreateCampaign={handlers.handleCreateCampaign}
          />
        );
      
      case 'campaign-distribution':
        return (
          <CampaignDistribution
            onNavigate={handlers.handleNavigate}
            campaignData={campaignData}
            onCampaignDataUpdate={handlers.handleUpdateCampaignData || (() => {})}
          />
        );
      
      case 'test-distribution':
        return (
          <TestDistributionManagement
            onNavigate={handlers.handleNavigate}
            onCreateCampaign={handlers.handleCreateCampaign}
          />
        );
      
      case 'analytics':
        return (
          <Analytics 
            onNavigate={handlers.handleNavigate}
          />
        );
      
      case 'prepare-email':
        return (
          <PrepareEmail
            onNavigate={handlers.handleNavigate}
            campaignData={campaignData}
            emailData={emailData}
            onEmailDataUpdate={handlers.handleUpdateEmailData || (() => {})}
          />
        );
      
      case 'review-deploy':
        return (
          <ReviewDeploy
            onNavigate={handlers.handleNavigate}
            campaignData={campaignData}
            emailData={emailData}
          />
        );
      
      case 'control-center':
        return (
          <ControlCenter 
            onNavigate={handlers.handleNavigate}
          />
        );
      
      case 'debug-mock-data':
        return (
          <DebugMockData 
            onNavigate={handlers.handleNavigate}
          />
        );
      
      default:
        console.warn(`Invalid view type: ${currentView}. Defaulting to dashboard.`);
        return (
          <Dashboard 
            onNavigate={handlers.handleNavigate}
            onCreateCampaign={handlers.handleCreateCampaign}
          />
        );
    }
  };

  return (
    <div className="h-full w-full">
      {renderView()}
    </div>
  );
}