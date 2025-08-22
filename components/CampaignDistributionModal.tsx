import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Search, 
  Filter, 
  Copy, 
  Share, 
  Send,
  Users,
  CheckCircle,
  Eye,
  AlertCircle,
  X,
  Target,
  Mail,
  BarChart3
} from "lucide-react";

interface CampaignDistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockClients = [
  { id: 1, name: "James Wellington", email: "james.wellington@email.com", volume: "£2.4M", status: "Active", type: "renewal", company: "Wellington Partners" },
  { id: 2, name: "Charlotte Pemberton", email: "charlotte.pemberton@email.com", volume: "£1.8M", status: "Active", type: "campaign", company: "Pemberton & Co" },
  { id: 3, name: "Oliver Fitzpatrick", email: "oliver.fitzpatrick@email.com", volume: "£3.1M", status: "Active", type: "volume", company: "Fitzpatrick Holdings" },
  { id: 4, name: "Emily Ashworth", email: "emily.ashworth@email.com", volume: "£1.5M", status: "Active", type: "renewal", company: "Ashworth Financial" },
  { id: 5, name: "William Thornbury", email: "william.thornbury@email.com", volume: "£2.7M", status: "Active", type: "campaign", company: "Thornbury Capital" },
  { id: 6, name: "Sophie Blackwood", email: "sophie.blackwood@email.com", volume: "£1.9M", status: "Active", type: "volume", company: "Blackwood Investments" },
  { id: 7, name: "Henry Worthington", email: "henry.worthington@email.com", volume: "£2.1M", status: "Active", type: "renewal", company: "Worthington Group" },
  { id: 8, name: "Isabella Fairfax", email: "isabella.fairfax@email.com", volume: "£1.6M", status: "Active", type: "campaign", company: "Fairfax Associates" }
];

const campaignProgress = [
  { label: "Sent", count: 156, percentage: 100, icon: Send },
  { label: "Opened", count: 124, percentage: 79, icon: Eye },
  { label: "Completed", count: 87, percentage: 56, icon: CheckCircle }
];

export function CampaignDistributionModal({ isOpen, onClose }: CampaignDistributionModalProps) {
  const [activeTab, setActiveTab] = useState("setup");
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientFilter, setClientFilter] = useState("all");
  const [campaignName, setCampaignName] = useState("");
  const [emailSubject, setEmailSubject] = useState("Your Sustainability Assessment is Ready");
  const [emailMessage, setEmailMessage] = useState("Dear {Name},\n\nWe've prepared a personalised sustainability assessment for you. Please take a few minutes to complete it.\n\nBest regards,\nYour Advisory Team");
  const [directLink] = useState("https://assessment.tsa.com/campaign/abc123");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = clientFilter === "all" || client.type === clientFilter;
    return matchesSearch && matchesFilter;
  });

  const handleClientToggle = (clientId: number) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(client => client.id));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDeploy = () => {
    setShowConfirmation(true);
  };

  const confirmDeploy = () => {
    setShowConfirmation(false);
    onClose();
  };

  const canProceedToTemplate = campaignName.trim() !== "" && selectedClients.length > 0;
  const canProceedToDeploy = canProceedToTemplate && emailSubject.trim() !== "" && emailMessage.trim() !== "";

  if (showConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md" aria-describedby="confirm-description">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-chart-3/10">
                <AlertCircle className="w-5 h-5 text-chart-3" />
              </div>
              Confirm Deployment
            </DialogTitle>
            <DialogDescription id="confirm-description">
              Review and confirm your campaign deployment details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-card-foreground">
                Deploy <strong>"{campaignName}"</strong> to {selectedClients.length} clients?
              </p>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Campaign:</span>
                      <span className="font-medium">{campaignName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recipients:</span>
                      <span className="font-medium">{selectedClients.length} clients</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subject:</span>
                      <span className="font-medium truncate ml-4">{emailSubject}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Once deployed, the campaign cannot be modified.
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                Cancel
              </Button>
              <Button onClick={confirmDeploy} className="bg-chart-1 hover:bg-chart-1/90">
                <Send className="w-4 h-4 mr-2" />
                Deploy Campaign
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1200px] h-[800px] max-w-none max-h-none p-0 overflow-hidden" aria-describedby="main-description">
        {/* Header */}
        <DialogHeader className="border-b px-8 py-6 flex-shrink-0">
          <DialogTitle className="text-2xl flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-chart-1/10">
              <Target className="w-6 h-6 text-chart-1" />
            </div>
            Campaign Distribution
          </DialogTitle>
          <DialogDescription id="main-description" className="text-base mt-1">
            Create and deploy sustainability assessments to your clients
          </DialogDescription>
          <Button variant="ghost" size="sm" onClick={onClose} className="absolute top-4 right-4">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 p-8 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="setup" className="flex items-center gap-2 text-base">
                <Users className="w-5 h-5" />
                Setup & Selection
              </TabsTrigger>
              <TabsTrigger value="template" disabled={!canProceedToTemplate} className="flex items-center gap-2 text-base">
                <Mail className="w-5 h-5" />
                Email Template
              </TabsTrigger>
              <TabsTrigger value="deploy" disabled={!canProceedToDeploy} className="flex items-center gap-2 text-base">
                <BarChart3 className="w-5 h-5" />
                Review & Deploy
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <div className="flex-1 mt-8 overflow-hidden">
              <TabsContent value="setup" className="h-full m-0">
                <div className="grid grid-cols-5 gap-8 h-full">
                  {/* Campaign Setup */}
                  <div className="col-span-2">
                    <Card className="h-full">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl">Campaign Setup</CardTitle>
                        <CardDescription className="text-base">Configure your campaign details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8">
                        <div className="space-y-3">
                          <Label htmlFor="campaign-name" className="text-base">Campaign Name *</Label>
                          <Input
                            id="campaign-name"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            placeholder="Enter campaign name..."
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="direct-link" className="text-base">Direct Link</Label>
                          <div className="flex gap-3">
                            <Input id="direct-link" value={directLink} readOnly className="flex-1 h-11" />
                            <Button variant="outline" onClick={() => copyToClipboard(directLink)} className="h-11 px-4">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" className="h-11 px-4">
                              <Share className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-6">
                          <Card>
                            <CardContent className="pt-8 text-center">
                              <div className="text-3xl font-bold text-chart-1">{filteredClients.length}</div>
                              <p className="text-muted-foreground text-base mt-1">Available</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-8 text-center">
                              <div className="text-3xl font-bold text-chart-2">{selectedClients.length}</div>
                              <p className="text-muted-foreground text-base mt-1">Selected</p>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Client Selection */}
                  <div className="col-span-3">
                    <Card className="h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">Client Selection</CardTitle>
                            <CardDescription className="text-base">Choose clients for this campaign</CardDescription>
                          </div>
                          <Badge variant="secondary" className="text-base px-3 py-1">{selectedClients.length} selected</Badge>
                        </div>
                        
                        <div className="flex gap-4 mt-4">
                          <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder="Search clients..."
                              className="pl-12 h-11"
                            />
                          </div>
                          <Select value={clientFilter} onValueChange={setClientFilter}>
                            <SelectTrigger className="w-56 h-11">
                              <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5" />
                                <SelectValue />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Clients</SelectItem>
                              <SelectItem value="volume">High Volume</SelectItem>
                              <SelectItem value="renewal">Renewal Cycle</SelectItem>
                              <SelectItem value="campaign">Campaign Ready</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id="select-all"
                              checked={selectedClients.length === filteredClients.length && filteredClients.length > 0}
                              onCheckedChange={handleSelectAll}
                              className="h-5 w-5"
                            />
                            <Label htmlFor="select-all" className="font-medium text-base">
                              Select all ({filteredClients.length})
                            </Label>
                          </div>
                        </div>

                        <ScrollArea className="h-[400px]">
                          <div className="space-y-4">
                            {filteredClients.map((client) => (
                              <div key={client.id} className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50">
                                <Checkbox
                                  checked={selectedClients.includes(client.id)}
                                  onCheckedChange={() => handleClientToggle(client.id)}
                                  className="h-5 w-5"
                                />
                                <div className="w-12 h-12 rounded-full bg-chart-1/10 flex items-center justify-center">
                                  <span className="text-chart-1 font-medium text-lg">
                                    {client.name.charAt(0)}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="grid grid-cols-3 gap-6">
                                    <div>
                                      <p className="font-medium text-base">{client.name}</p>
                                      <p className="text-muted-foreground truncate">{client.email}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium text-base">{client.company}</p>
                                      <Badge variant="outline">{client.type}</Badge>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium text-base">{client.volume}</p>
                                      <p className="text-muted-foreground">{client.status}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="template" className="h-full m-0">
                <div className="grid grid-cols-2 gap-8 h-full">
                  {/* Email Composer */}
                  <Card className="h-full">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">Email Template</CardTitle>
                      <CardDescription className="text-base">Customize your campaign email</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="email-subject" className="text-base">Subject Line *</Label>
                        <Input
                          id="email-subject"
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          placeholder="Enter email subject..."
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-3 flex-1 flex flex-col">
                        <Label htmlFor="email-message" className="text-base">Message *</Label>
                        <Textarea
                          id="email-message"
                          value={emailMessage}
                          onChange={(e) => setEmailMessage(e.target.value)}
                          placeholder="Enter email message..."
                          className="flex-1 resize-none min-h-[300px]"
                        />
                      </div>

                      <Card className="bg-muted/30">
                        <CardContent className="pt-6">
                          <Label className="mb-3 block text-base">Available Variables</Label>
                          <div className="flex flex-wrap gap-3">
                            {['{Name}', '{Email}', '{Company}'].map((variable) => (
                              <Badge key={variable} variant="secondary" className="font-mono text-base px-3 py-1">
                                {variable}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>

                  {/* Email Preview */}
                  <Card className="h-full">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">Email Preview</CardTitle>
                      <CardDescription className="text-base">How your email will appear to clients</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <Card className="flex-1">
                        <CardHeader className="pb-4">
                          <div className="space-y-2">
                            <div className="flex gap-3">
                              <span className="text-muted-foreground text-base">To:</span>
                              <span className="text-base">james.wellington@email.com</span>
                            </div>
                            <div className="flex gap-3">
                              <span className="text-muted-foreground text-base">Subject:</span>
                              <span className="font-medium text-base">{emailSubject}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-6 flex-1">
                          <ScrollArea className="h-[340px]">
                            <div className="whitespace-pre-wrap leading-relaxed text-base">
                              {emailMessage
                                .replace('{Name}', 'James Wellington')
                                .replace('{Email}', 'james.wellington@email.com')
                                .replace('{Company}', 'Wellington Partners')
                              }
                            </div>
                          </ScrollArea>
                          <Separator className="my-6" />
                          <Button className="bg-chart-1 hover:bg-chart-1/90 h-11 px-6">
                            Start Assessment
                          </Button>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="deploy" className="h-full m-0">
                <div className="grid grid-cols-3 gap-8 h-full">
                  {/* Campaign Summary */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">Campaign Summary</CardTitle>
                      <CardDescription className="text-base">Review your campaign details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="text-base">Campaign Name</Label>
                        <p className="font-medium mt-2 text-base">{campaignName || "Untitled Campaign"}</p>
                      </div>
                      <div>
                        <Label className="text-base">Recipients</Label>
                        <p className="font-medium mt-2 text-base">{selectedClients.length} clients</p>
                      </div>
                      <div>
                        <Label className="text-base">Email Subject</Label>
                        <p className="font-medium mt-2 text-base">{emailSubject}</p>
                      </div>
                      <div>
                        <Label className="text-base">Deployment</Label>
                        <p className="font-medium mt-2 text-base">Immediate</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Selected Clients */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">Recipients</CardTitle>
                      <CardDescription className="text-base">{selectedClients.length} clients selected</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[450px]">
                        <div className="space-y-4">
                          {mockClients
                            .filter(client => selectedClients.includes(client.id))
                            .map((client) => (
                              <div key={client.id} className="flex items-center justify-between p-3 rounded border">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-chart-1/10 flex items-center justify-center">
                                    <span className="text-chart-1 font-medium">
                                      {client.name.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-medium text-base truncate">{client.name}</p>
                                    <p className="text-muted-foreground truncate">{client.email}</p>
                                  </div>
                                </div>
                                <CheckCircle className="w-5 h-5 text-chart-2" />
                              </div>
                            ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Expected Progress */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">Expected Progress</CardTitle>
                      <CardDescription className="text-base">Projected campaign performance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {campaignProgress.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.label} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-muted-foreground" />
                                <span className="text-base">{item.label}</span>
                              </div>
                              <span className="font-medium text-lg">{item.count}</span>
                            </div>
                            <Progress value={item.percentage} className="h-3" />
                            <p className="text-muted-foreground text-base">{item.percentage}% completion rate</p>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="border-t px-8 py-6 flex justify-between items-center">
          <div>
            {activeTab !== "setup" && (
              <Button 
                variant="outline" 
                onClick={() => {
                  if (activeTab === "template") setActiveTab("setup");
                  if (activeTab === "deploy") setActiveTab("template");
                }}
                className="h-11 px-6"
              >
                Previous
              </Button>
            )}
          </div>
          
          <div>
            {activeTab === "setup" && (
              <Button 
                onClick={() => setActiveTab("template")}
                disabled={!canProceedToTemplate}
                className="bg-chart-1 hover:bg-chart-1/90 h-11 px-6"
              >
                Next: Email Template
              </Button>
            )}
            {activeTab === "template" && (
              <Button 
                onClick={() => setActiveTab("deploy")}
                disabled={!canProceedToDeploy}
                className="bg-chart-1 hover:bg-chart-1/90 h-11 px-6"
              >
                Next: Review & Deploy
              </Button>
            )}
            {activeTab === "deploy" && (
              <Button 
                onClick={handleDeploy}
                disabled={!canProceedToDeploy}
                className="bg-chart-1 hover:bg-chart-1/90 h-11 px-6"
              >
                <Send className="w-5 h-5 mr-2" />
                Deploy Campaign
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}