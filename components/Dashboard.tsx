import { Plus } from "lucide-react";
import { OverviewCards } from "./OverviewCards";
import { ClientActionsWidget } from "./ClientActionsWidget";

interface DashboardProps {
  onCreateCampaign: () => void;
  onNavigate?: (view: string) => void;
}

export function Dashboard({ onCreateCampaign, onNavigate }: DashboardProps) {
  return (
    <>
      {/* Hero section - Responsive with mobile-first approach */}
      <div className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Mobile Layout - Stack vertically */}
        <div className="flex flex-col gap-4 sm:hidden">
          {/* CTA Button - Priority position on mobile */}
          <div>
            <button 
              onClick={onCreateCampaign}
              className="w-full bg-chart-1 hover:opacity-90 text-card px-6 py-3 rounded-md border-2 border-border shadow-sm flex items-center justify-center gap-2 transition-all min-h-[44px] touch-manipulation"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Launch New Test</span>
            </button>
          </div>
          
          <div className="text-center hidden">
            <h1 className="text-card-foreground mb-2 text-2xl">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage client assessments, campaigns, and track sustainability insights
            </p>
          </div>
        </div>

        {/* Desktop Layout - Side by side with button aligned to h1 center */}
        <div className="hidden sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-card-foreground mb-2 text-3xl lg:text-4xl">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-base">
              Manage client assessments, campaigns, and track sustainability insights
            </p>
          </div>
          
          {/* CTA Button - Aligned with h1 center on desktop */}
          <div className="flex items-start h-full">
            <button 
              onClick={onCreateCampaign}
              className="bg-chart-1 hover:opacity-90 text-card px-6 py-4 rounded-md border-2 border-border shadow-sm flex items-center gap-2 transition-all min-h-[44px] touch-manipulation whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              <span className="text-base font-medium">Launch New Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard content - Mobile hierarchy: Client Management, Analytics */}
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8">

        {/* Client Actions Widget - First on mobile, second on desktop */}
        <div className="order-1 sm:order-2">
          <ClientActionsWidget onNavigate={onNavigate} />
        </div>

        {/* Analytics - Overview cards (second on mobile, first on desktop) */}
        <div className="order-2 sm:order-1">
          <OverviewCards />
        </div>
      </div>
    </>
  );
}