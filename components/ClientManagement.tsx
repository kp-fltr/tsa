import { useState, useEffect, useMemo } from "react";
import { Plus, Users, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { DataGrid } from "./DataGrid";
import { ClientProfileDrawer } from "./ClientProfileDrawer";
import { 
  UNIFIED_CLIENT_REGISTRY,
  getAllClientsSorted, 
  UnifiedClientRecord,
  formatDateForDisplay,
  paginateClients
} from "../data/unifiedClientRegistry";

interface ClientManagementProps {
  onNavigate?: (view: string) => void;
  onCreateCampaign?: () => void;
}

interface ClientCardProps {
  client: UnifiedClientRecord;
  onViewProfile: (clientId: string) => void;
}

function ClientCard({ client, onViewProfile }: ClientCardProps) {
  return (
    <Card className="p-4 hover:bg-muted/20 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-h5 text-card-foreground mb-1 truncate">
            {client.name}
          </h4>
          <p className="text-sm text-muted-foreground truncate">
            {client.email}
          </p>
        </div>
        <Badge 
          variant={client.sustainability_assessment_status === 'Updated' ? 'default' : 'secondary'}
          className="flex-shrink-0"
        >
          {client.sustainability_assessment_status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <div className="space-y-1">
          <p className="text-muted-foreground">Appetite</p>
          <p className="font-semibold text-card-foreground">{client.sustainability_appetite_rating}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">Profile</p>
          <p className="font-semibold text-card-foreground">{client.sustainability_profile}</p>
        </div>
      </div>
      
      <div className="pt-2 border-t border-border">
        <p className="text-sm text-muted-foreground mb-3">
          Next Assessment: <span className="font-semibold text-card-foreground">{formatDateForDisplay(client.next_assessment_date)}</span>
        </p>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => onViewProfile(client.id.toString())}
          className="w-full min-h-[44px] touch-manipulation"
        >
          View Profile
        </Button>
      </div>
    </Card>
  );
}

export function ClientManagement({
  onNavigate,
  onCreateCampaign,
}: ClientManagementProps) {
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Use lg breakpoint for DataGrid
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get all clients from unified registry
  const allClients = useMemo(() => getAllClientsSorted(), []);

  // Filter clients based on search only - for mobile cards
  const filteredClients = useMemo(() => {
    return allClients.filter(client => {
      const matchesSearch = searchQuery.trim() === "" || 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [allClients, searchQuery]);

  // Get paginated data for mobile cards only
  const paginatedData = useMemo(() => {
    return paginateClients(filteredClients, currentPage, pageSize);
  }, [filteredClients, currentPage, pageSize]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
              Client Directory
            </h1>
            <p className="text-base text-muted-foreground content-width">
              Manage your client base and track assessment progress
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {allClients.length} client{allClients.length !== 1 ? 's' : ''}
            </span>
            <Button 
              onClick={onCreateCampaign}
              className="bg-chart-1 hover:opacity-90 text-white min-h-[44px] touch-manipulation"
            >
              <Plus className="w-4 h-4 mr-2" />
              Launch New Test
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Section - Only shown on mobile */}
      {isMobile && (
        <div className="content-section bg-card border-b border-border px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search clients by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Showing {filteredClients.length} of {allClients.length} clients
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area - Flexible with constrained height */}
      <div className="page-content">
        {/* Mobile view: Card layout with pagination */}
        {isMobile ? (
          <>
            {/* Scrollable cards container */}
            <div className="content-main">
              <div className="h-full overflow-y-auto px-4 py-4 space-y-4 main-scroll">
                {paginatedData.data.length > 0 ? (
                  paginatedData.data.map((client) => (
                    <ClientCard
                      key={client.id}
                      client={client}
                      onViewProfile={handleViewProfile}
                    />
                  ))
                ) : (
                  <Card className="p-8 text-center">
                    <div className="space-y-2">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto" />
                      <h3 className="text-h5">No clients found</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery.trim() 
                          ? 'Try adjusting your search terms.' 
                          : 'No clients found.'}
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
            
            {/* Mobile pagination - Fixed at bottom */}
            {paginatedData.totalPages > 1 && (
              <div className="content-section px-4 py-4 border-t border-border bg-card">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={!paginatedData.hasPrevPage}
                    className="min-h-[44px] touch-manipulation"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    Page {paginatedData.currentPage} of {paginatedData.totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(paginatedData.totalPages, prev + 1))}
                    disabled={!paginatedData.hasNextPage}
                    className="min-h-[44px] touch-manipulation"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Desktop view: DataGrid with integrated features */
          <div className="content-main px-4 lg:px-8 py-4">
            <div className="table-viewport-fit">
              <div className="table-content-fit">
                <div className="table-body-scroll">
                  <DataGrid 
                    viewport="desktop"
                    paginationMode="paginate"
                    pageSize={50}
                    showFiltersSummary={true}
                    hasSelection={true}
                    hasActions={true}
                    rowDensity="compact"
                    columnsPreset="clientDirectory"
                    searchEnabled={true}
                    filtersEnabled={true}
                    stickyActions={true}
                    data={allClients} // Pass all clients data
                    onNavigate={onNavigate} // Pass navigation handler
                    onViewProfile={handleViewProfile} // Handle view profile
                    selectedIds={selectedClientIds}
                    onSelectionChange={setSelectedClientIds}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
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