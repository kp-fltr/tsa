import { AlertCircle, Clock, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ClientProfileDrawer } from "./ClientProfileDrawer";
import { 
  UNIFIED_CLIENT_REGISTRY,
  getClientsRequiringAction, 
  UnifiedClientRecord,
  formatDateForDisplay
} from "../data/unifiedClientRegistry";
import { useState, useMemo } from "react";

interface ClientActionsWidgetProps {
  onNavigate?: (view: string) => void;
}

export function ClientActionsWidget({ onNavigate }: ClientActionsWidgetProps) {
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  
  // Use unified client registry as single source of truth
  const clientsNeedingAction = useMemo(() => {
    const actionClients = getClientsRequiringAction() // Filter: status === 'Outstanding' OR 'Overdue'
      .map(client => {
        const now = new Date();
        const nextAssessment = new Date(client.next_assessment_date);
        const daysOverdue = nextAssessment < now 
          ? Math.floor((now.getTime() - nextAssessment.getTime()) / (1000 * 60 * 60 * 24))
          : 0;
        
        return {
          ...client,
          daysOverdue,
          urgency: client.sustainability_assessment_status === 'Overdue' ? 'critical' as const : 
                  daysOverdue > 7 ? 'high' as const : 'medium' as const,
          statusType: client.sustainability_assessment_status === 'Overdue' ? 'Assessment Overdue' :
                     client.sustainability_assessment_status === 'Outstanding' ? 'Assessment Outstanding' :
                     'Follow-up Required'
        };
      })
      .slice(0, 5); // Show top 5 most urgent (already sorted by urgency)

    return actionClients;
  }, []); // No dependencies - uses unified static dataset

  const handleViewProfile = (clientId: string) => {
    setSelectedClientId(clientId);
    setProfileDrawerOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileDrawerOpen(false);
    setSelectedClientId(null);
  };

  // Use unified date formatting for consistency across all components

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-chart-4/10 text-chart-4';
      case 'high':
        return 'bg-chart-3/10 text-chart-3';
      default:
        return 'bg-chart-2/10 text-chart-2';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    if (urgency === 'critical') return AlertCircle;
    return Clock;
  };

  const totalRequiringAction = UNIFIED_CLIENT_REGISTRY.filter(c => 
    c.sustainability_assessment_status === 'Outstanding' || 
    c.sustainability_assessment_status === 'Overdue'
  ).length;

  return (
    <TooltipProvider>
      <div className="bg-card rounded-lg border-2 border-border p-4 sm:p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
            <User className="w-5 h-5 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-card-foreground">Clients Requiring Action</h3>
            <p className="text-muted-foreground text-sm">
              {clientsNeedingAction.length} of {totalRequiringAction} clients need your attention
            </p>
          </div>
        </div>

        {/* Data Source Info */}
        <div className="mb-4 p-3 bg-muted/30 rounded-lg">

        </div>

        {/* Client Actions List */}
        <div className="space-y-3">
          {clientsNeedingAction.map((client) => {
            const UrgencyIcon = getUrgencyIcon(client.urgency);
            
            return (
              <div 
                key={client.id} 
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleViewProfile(client.id.toString())}
              >
                {/* Urgency Indicator */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getUrgencyColor(client.urgency)}`}>
                  <UrgencyIcon className="w-4 h-4" />
                </div>
                
                {/* Client Info */}
                <div className="flex-1 min-w-0">
                  <h5 className="text-card-foreground font-medium truncate">{client.name}</h5>
                  <p className="text-muted-foreground text-sm truncate">{client.statusType}</p>
                </div>
                
                {/* Action Details */}
                <div className="text-right shrink-0">
                  {client.sustainability_assessment_status === 'Overdue' && client.daysOverdue > 0 ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-chart-4 text-sm font-medium">
                          {client.daysOverdue}d overdue
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Assessment was due {client.daysOverdue} days ago</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      Due {formatDateForDisplay(client.next_assessment_date)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* View All Link */}
        <div className="mt-4 pt-3 border-t border-border">
          <button 
            onClick={() => onNavigate?.('client-directory')}
            className="text-chart-1 text-sm font-medium hover:opacity-80 transition-opacity"
          >
            View All Clients →
          </button>
        </div>
        
        {/* Empty State */}
        {clientsNeedingAction.length === 0 && (
          <div className="text-center py-6">
            <User className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">All clients are up to date!</p>
          </div>
        )}

        {/* Profile Drawer */}
        <ClientProfileDrawer
          open={profileDrawerOpen}
          clientId={selectedClientId}
          onClose={handleCloseProfile}
        />
      </div>
    </TooltipProvider>
  );
}