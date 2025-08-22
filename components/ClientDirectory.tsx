import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { ClientTable } from "./ClientTable";
import { AddClientDrawer } from "./AddClientDrawer";
import { ClientProfileDrawer } from "./ClientProfileDrawer";
import { formatDateDDMMYYYY } from "./DateInput";
import { apiService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { 
  Search, 
  Filter,
  Plus,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  FileText,
  MoreHorizontal,
  Grid,
  List,
  Loader2,
  Eye
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const mockClients = [
  { 
    id: 1, 
    name: "James Wellington", 
    email: "james.wellington@email.com", 
    phone: "+44 20 7123 4567",
    company: "Wellington Partners", 
    volume: "£2.4M", 
    status: "Active", 
    segment: "High-Value",
    location: "London, UK",
    lastContact: "2 days ago",
    nextReview: "15/03/2024",
    sustainabilityScore: 85,
    completedAssessments: 12,
    industry: "Financial Services",
    engagement: "engaged",
    assessmentStatus: "Updated" as const,
    sustainabilityAppetite: "High" as const,
    sustainabilityProfile: "A" as const,
    latestAssessmentDate: "15/12/2023",
    nextAssessmentDate: "15/03/2024"
  },
  { 
    id: 2, 
    name: "Charlotte Pemberton", 
    email: "charlotte.pemberton@email.com", 
    phone: "+44 20 7234 5678",
    company: "Pemberton & Co", 
    volume: "£1.8M", 
    status: "Active", 
    segment: "Mid-Tier",
    location: "Manchester, UK",
    lastContact: "1 week ago",
    nextReview: "22/03/2024",
    sustainabilityScore: 72,
    completedAssessments: 8,
    industry: "Manufacturing",
    engagement: "active",
    assessmentStatus: "Outstanding" as const,
    sustainabilityAppetite: "Medium" as const,
    sustainabilityProfile: "B" as const,
    latestAssessmentDate: "28/11/2023",
    nextAssessmentDate: "28/02/2024"
  },
  { 
    id: 3, 
    name: "Oliver Fitzpatrick", 
    email: "oliver.fitzpatrick@email.com", 
    phone: "+44 20 7345 6789",
    company: "Fitzpatrick Holdings", 
    volume: "£3.1M", 
    status: "Active", 
    segment: "High-Value",
    location: "Edinburgh, UK",
    lastContact: "3 days ago",
    nextReview: "10/04/2024",
    sustainabilityScore: 91,
    completedAssessments: 15,
    industry: "Real Estate",
    engagement: "engaged",
    assessmentStatus: "Updated" as const,
    sustainabilityAppetite: "High" as const,
    sustainabilityProfile: "A" as const,
    latestAssessmentDate: "08/01/2024",
    nextAssessmentDate: "08/04/2024"
  },
  { 
    id: 4, 
    name: "Emily Ashworth", 
    email: "emily.ashworth@email.com", 
    phone: "+44 20 7456 7890",
    company: "Ashworth Financial", 
    volume: "£1.5M", 
    status: "Inactive", 
    segment: "Growing",
    location: "Birmingham, UK",
    lastContact: "3 weeks ago",
    nextReview: "05/05/2024",
    sustainabilityScore: 58,
    completedAssessments: 4,
    industry: "Technology",
    engagement: "inactive",
    assessmentStatus: "Overdue" as const,
    sustainabilityAppetite: "Low" as const,
    sustainabilityProfile: "D" as const,
    latestAssessmentDate: "12/10/2023",
    nextAssessmentDate: "12/01/2024"
  },
  { 
    id: 5, 
    name: "William Thornbury", 
    email: "william.thornbury@email.com", 
    phone: "+44 20 7567 8901",
    company: "Thornbury Capital", 
    volume: "£2.7M", 
    status: "Active", 
    segment: "High-Value",
    location: "Bristol, UK",
    lastContact: "5 days ago",
    nextReview: "18/03/2024",
    sustainabilityScore: 78,
    completedAssessments: 10,
    industry: "Energy",
    engagement: "active",
    assessmentStatus: "Outstanding" as const,
    sustainabilityAppetite: "Medium" as const,
    sustainabilityProfile: "B" as const,
    latestAssessmentDate: "01/12/2023",
    nextAssessmentDate: "01/03/2024"
  },
  { 
    id: 6, 
    name: "Sophie Blackwood", 
    email: "sophie.blackwood@email.com", 
    phone: "+44 20 7678 9012",
    company: "Blackwood Investments", 
    volume: "£1.9M", 
    status: "Active", 
    segment: "Mid-Tier",
    location: "Leeds, UK",
    lastContact: "1 day ago",
    nextReview: "25/03/2024",
    sustainabilityScore: 83,
    completedAssessments: 11,
    industry: "Healthcare",
    engagement: "engaged",
    assessmentStatus: "Updated" as const,
    sustainabilityAppetite: "High" as const,
    sustainabilityProfile: "A" as const,
    latestAssessmentDate: "22/12/2023",
    nextAssessmentDate: "22/03/2024"
  }
];

interface ClientDirectoryProps {
  onNavigate?: (view: string) => void;
  onCreateCampaign?: () => void;
}

export function ClientDirectory({ onNavigate, onCreateCampaign }: ClientDirectoryProps = {}) {
  const { isAuthenticated, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [assessmentStatusFilter, setAssessmentStatusFilter] = useState("all");
  const [sustainabilityAppetiteFilter, setSustainabilityAppetiteFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"card" | "list">("list");
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [clients, setClients] = useState(mockClients);
  const [isLoading, setIsLoading] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Load clients from API only when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadClients();
    }
  }, [isAuthenticated, user]);

  const loadClients = async () => {
    // Don't attempt to load if not authenticated
    if (!isAuthenticated || !user) {
      console.warn('Attempted to load clients without authentication');
      setClients(mockClients);
      return;
    }

    try {
      setIsLoading(true);
      console.log('Loading clients for user:', user.email);
      
      const response = await apiService.getClients();
      console.log('API response:', response);
      
      // Validate response structure
      if (!response || !response.clients || !Array.isArray(response.clients)) {
        console.warn('Invalid response structure from getClients:', response);
        setClients(mockClients);
        return;
      }

      // If no clients, just use mock data
      if (response.clients.length === 0) {
        console.log('No clients found in API, using mock data only');
        setClients(mockClients);
        return;
      }

      // Filter out null/invalid clients and transform API data
      const transformedClients = response.clients
        .filter((client: any) => {
          if (!client || !client.id || !client.name || !client.email) {
            console.warn('Filtering out invalid client:', client);
            return false;
          }
          return true;
        })
        .map((client: any) => ({
          id: client.id,
          name: client.name,
          email: client.email,
          phone: client.phone || "N/A",
          company: client.company || "N/A",
          volume: client.volume || "£0",
          status: client.status || "Active",
          segment: client.segment || "Mid-Tier",
          location: client.location || "N/A",
          lastContact: "N/A", // API doesn't provide this yet
          nextReview: "N/A", // API doesn't provide this yet
          sustainabilityScore: client.sustainability_score || 0,
          completedAssessments: client.completed_assessments || 0,
          industry: client.industry || "N/A",
          engagement: client.engagement || "new",
          assessmentStatus: client.assessment_status || "outstanding",
          sustainabilityAppetite: client.sustainability_appetite || "n/a",
          sustainabilityProfile: client.sustainability_profile || "E",
          latestAssessmentDate: client.latest_assessment 
            ? formatDateDDMMYYYY(client.latest_assessment)
            : "N/A",
          nextAssessmentDate: client.next_assessment 
            ? formatDateDDMMYYYY(client.next_assessment)
            : "N/A"
        }));

      console.log('Transformed clients:', transformedClients);

      // Combine with mock data for now (avoid duplicates based on email)
      const existingEmails = new Set(mockClients.map(c => c.email));
      const uniqueTransformedClients = transformedClients.filter(
        (client: any) => !existingEmails.has(client.email)
      );
      
      setClients([...mockClients, ...uniqueTransformedClients]);
      console.log('Final clients state:', [...mockClients, ...uniqueTransformedClients]);
    } catch (error) {
      console.error('Error loading clients:', error);
      // Fallback to mock data if API fails
      setClients(mockClients);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClientAdded = () => {
    // Reload clients when a new one is added
    loadClients();
  };

  // Ensure clients is always an array
  const safeClients = Array.isArray(clients) ? clients : mockClients;
  
  const filteredClients = safeClients.filter(client => {
    // Safety check to ensure client object is valid
    if (!client || !client.name || !client.email) {
      console.warn('Invalid client object:', client);
      return false;
    }

    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAssessmentStatus = assessmentStatusFilter === "all" || (client.assessmentStatus && client.assessmentStatus === assessmentStatusFilter);
    const matchesAppetite = sustainabilityAppetiteFilter === "all" || (client.sustainabilityAppetite && client.sustainabilityAppetite === sustainabilityAppetiteFilter);
    return matchesSearch && matchesAssessmentStatus && matchesAppetite;
  });

  const handleSelectClient = (clientId: number) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    if (selectedClients.length === filteredClients.length && filteredClients.length > 0) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(client => client.id));
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-chart-2";
    if (score >= 60) return "text-chart-3";
    return "text-chart-4";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const handleRemoveClient = async (clientId: number) => {
    try {
      // If authenticated, try to remove from API
      if (isAuthenticated && user) {
        await apiService.removeClient(clientId);
      }
      
      // Remove from local state regardless of API call success
      setClients(prev => prev.filter(client => client.id !== clientId));
      setSelectedClients(prev => prev.filter(id => id !== clientId));
      
      console.log(`Client ${clientId} removed successfully`);
    } catch (error) {
      console.error('Error removing client:', error);
      // Still remove from local state even if API call fails
      setClients(prev => prev.filter(client => client.id !== clientId));
      setSelectedClients(prev => prev.filter(id => id !== clientId));
    }
  };

  const handleViewProfile = (clientId: number) => {
    setSelectedClientId(clientId.toString());
    setProfileDrawerOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileDrawerOpen(false);
    setSelectedClientId(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 style={{ fontFamily: 'Nunito, sans-serif' }}>Client Directory</h1>
            <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
              Manage client information, profiles, and sustainability tracking
            </p>
          </div>
          <Button 
            onClick={() => setIsAddClientOpen(true)}
            className="bg-chart-1 hover:bg-chart-1/90 flex items-center gap-2 lg:shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>Add New Client</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="h-full flex flex-col">
            {/* Filters and View Toggle */}
            <div className="flex flex-row items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search clients..."
                  className="pl-10"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              
              {/* View Toggle */}
              <div className="flex border border-border rounded-md">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-r-none"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "card" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("card")}
                  className="rounded-l-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Selection Counter for List View */}
            {viewMode === "list" && (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                </div>
              </div>
            )}

            {/* Client Content */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-chart-1" />
                  <p className="text-sm text-muted-foreground">Loading clients...</p>
                </div>
              </div>
            ) : viewMode === "list" ? (
              /* List View - Using ClientTable */
              <div className="overflow-x-auto">
                <ClientTable
                  clients={filteredClients}
                  selectedClients={selectedClients}
                  onClientSelect={handleSelectClient}
                  onSelectAll={handleSelectAll}
                  assessmentStatusFilter={assessmentStatusFilter}
                  sustainabilityAppetiteFilter={sustainabilityAppetiteFilter}
                  onAssessmentStatusFilterChange={setAssessmentStatusFilter}
                  onSustainabilityAppetiteFilterChange={setSustainabilityAppetiteFilter}
                  onNavigate={onNavigate}
                  onCreateCampaign={onCreateCampaign}
                  onRemoveClient={handleRemoveClient}
                />
              </div>
            ) : (
              /* Card View */
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredClients.map((client) => (
                  <Card key={client.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-chart-1/10 text-chart-1">
                              <span style={{ fontFamily: 'Inter, sans-serif' }}>{client.name.charAt(0)}</span>
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base" style={{ fontFamily: 'Nunito, sans-serif' }}>
                              {client.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {client.company}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProfile(client.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>Schedule Assessment</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Portfolio Value</p>
                          <p className="font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{client.volume}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Sustainability Score</p>
                          <p className={`font-semibold ${getScoreColor(client.sustainabilityScore)}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                            {client.sustainabilityScore}%
                          </p>
                        </div>
                      </div>

                      {/* Status and Segment */}
                      <div className="flex items-center justify-between">
                        <Badge variant={client.status === "Active" ? "default" : "secondary"}>
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>{client.status}</span>
                        </Badge>
                        <Badge variant="outline">
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>{client.segment}</span>
                        </Badge>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>{client.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>Next review: {client.nextReview}</span>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="w-3 h-3 mr-1" />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>Contact</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <FileText className="w-3 h-3 mr-1" />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>Report</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* Add Client Drawer */}
      <AddClientDrawer 
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onClientAdded={handleClientAdded}
      />

      {/* Profile Drawer */}
      <ClientProfileDrawer
        open={profileDrawerOpen}
        clientId={selectedClientId}
        onClose={handleCloseProfile}
      />
    </div>
  );
}