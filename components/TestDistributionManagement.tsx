import { useState, useEffect, useMemo } from "react";
import { Plus, Send, Target } from "lucide-react";
import { Button } from "./ui/button";
import { DataGrid } from "./DataGrid";
import { ClientProfileDrawer } from "./ClientProfileDrawer";
import { 
  getAllClientsSorted, 
  UnifiedClientRecord
} from "../data/unifiedClientRegistry";

interface TestDistributionManagementProps {
  onNavigate?: (view: string) => void;
  onCreateCampaign?: () => void;
}

// Convert client data to test distribution format
const convertToTestDistributionData = (clients: UnifiedClientRecord[]) => {
  return clients.map((client, index) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    status: ['Sent', 'Delivered', 'Opened', 'Completed', 'Bounced'][index % 5],
    sent: '✓',
    opened: index % 3 === 0 ? '✓' : '--',
    completed: index % 4 === 0 ? '✓' : '--',
    lastActivity: new Date(2024, 1, 1 + (index * 2))
  }));
};

export function TestDistributionManagement({
  onNavigate,
  onCreateCampaign,
}: TestDistributionManagementProps) {
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get all clients and convert to test distribution format
  const allClients = useMemo(() => getAllClientsSorted(), []);
  const testDistributionData = useMemo(() => convertToTestDistributionData(allClients), [allClients]);

  const handleViewProfile = (clientId: string) => {
    setSelectedClientId(clientId);
    setProfileDrawerOpen(true);
  };

  const handleCloseProfileDrawer = () => {
    setProfileDrawerOpen(false);
    setSelectedClientId(null);
  };

  const selectedClient = selectedClientId 
    ? allClients.find(client => client.id.toString() === selectedClientId)
    : null;

  return (
    <div className="page-layout">
      {/* Header Section - Fixed */}
      <div className="page-header bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-card-foreground mb-2">
              Test Distribution
            </h1>
            <p className="text-base text-muted-foreground content-width">
              Track campaign performance and client engagement
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {testDistributionData.length} recipient{testDistributionData.length !== 1 ? 's' : ''}
            </span>
            <Button 
              onClick={onCreateCampaign}
              className="bg-chart-1 hover:opacity-90 text-white min-h-[44px] touch-manipulation"
            >
              <Send className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="page-content">
        <div className="content-main px-4 lg:px-8 py-4">
          <div className="table-viewport-fit">
            <div className="table-content-fit">
              <div className="table-body-scroll">
                <DataGrid 
                  viewport={isMobile ? "mobile" : "desktop"}
                  paginationMode="paginate"
                  pageSize={50}
                  showFiltersSummary={true}
                  hasSelection={true}
                  hasActions={true}
                  rowDensity="compact"
                  columnsPreset="testDistribution"
                  searchEnabled={true}
                  filtersEnabled={true}
                  stickyActions={true}
                  data={testDistributionData}
                  onNavigate={onNavigate}
                  onViewProfile={handleViewProfile}
                  selectedIds={selectedClientIds}
                  onSelectionChange={setSelectedClientIds}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Profile Drawer */}
      <ClientProfileDrawer
        isOpen={profileDrawerOpen}
        onClose={handleCloseProfileDrawer}
        client={selectedClient}
        onNavigate={onNavigate}
      />
    </div>
  );
}