import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  ArrowLeft,
  BarChart3,
  Users,
  Send,
  Eye,
  CheckCircle,
  Clock,
  TrendingUp,
  Mail,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

interface ControlCenterProps {
  onBack: () => void;
}

const activeCampaigns = [
  {
    id: 1,
    name: "Q1 Sustainability Review",
    status: "active",
    dateCreated: "2024-01-15",
    recipients: 24,
    sent: 24,
    opened: 19,
    completed: 12,
    openRate: 79,
    completionRate: 50,
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Annual ESG Assessment",
    status: "active",
    dateCreated: "2024-01-10",
    recipients: 35,
    sent: 35,
    opened: 28,
    completed: 22,
    openRate: 80,
    completionRate: 63,
    lastActivity: "1 day ago"
  },
  {
    id: 3,
    name: "Quarterly Check-in",
    status: "completed",
    dateCreated: "2023-12-20",
    recipients: 18,
    sent: 18,
    opened: 16,
    completed: 15,
    openRate: 89,
    completionRate: 83,
    lastActivity: "3 days ago"
  }
];

const recentResponses = [
  {
    id: 1,
    clientName: "James Wellington",
    company: "Wellington Partners",
    campaign: "Q1 Sustainability Review",
    status: "completed",
    completedAt: "2024-01-16 14:30",
    score: 85
  },
  {
    id: 2,
    clientName: "Charlotte Pemberton",
    company: "Pemberton & Co",
    campaign: "Annual ESG Assessment",
    status: "in-progress",
    startedAt: "2024-01-16 09:15",
    progress: 65
  },
  {
    id: 3,
    clientName: "Oliver Fitzpatrick",
    company: "Fitzpatrick Holdings",
    campaign: "Q1 Sustainability Review",
    status: "completed",
    completedAt: "2024-01-15 16:45",
    score: 92
  },
  {
    id: 4,
    clientName: "Emily Ashworth",
    company: "Ashworth Financial",
    campaign: "Annual ESG Assessment",
    status: "opened",
    openedAt: "2024-01-16 11:20",
    progress: 0
  }
];

const performanceMetrics = [
  {
    label: "Total Campaigns",
    value: "12",
    change: "+2 this month",
    trend: "up",
    icon: BarChart3
  },
  {
    label: "Active Recipients",
    value: "156",
    change: "+24 this week",
    trend: "up",
    icon: Users
  },
  {
    label: "Avg. Open Rate",
    value: "82%",
    change: "+5% vs last month",
    trend: "up",
    icon: Eye
  },
  {
    label: "Avg. Completion Rate",
    value: "67%",
    change: "+8% vs last month",
    trend: "up",
    icon: CheckCircle
  }
];

export function ControlCenter({ onBack }: ControlCenterProps) {
  const [timeRange, setTimeRange] = useState("30d");
  const [campaignFilter, setCampaignFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-chart-2/10 text-chart-2 hover:bg-chart-2/20">Active</Badge>;
      case "completed":
        return <Badge className="bg-chart-1/10 text-chart-1 hover:bg-chart-1/20">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-chart-3/10 text-chart-3 hover:bg-chart-3/20">In Progress</Badge>;
      case "opened":
        return <Badge variant="outline">Opened</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 lg:px-8 py-6 flex-shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
              <BarChart3 className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h1 className="text-card-foreground mb-2">Control Center</h1>
              <p className="text-muted-foreground">
                Track campaign performance and monitor client engagement
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-auto border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center gap-2 px-3 py-2 h-9">
                <Calendar className="w-4 h-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 lg:p-8 overflow-hidden">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground mb-2">{metric.label}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-card-foreground">{metric.value}</span>
                        <div className="flex items-center gap-1 text-xs text-chart-2">
                          <TrendingUp className="w-3 h-3" />
                          {metric.change}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="campaigns" className="flex-1 flex flex-col">
          <div className="flex justify-end mb-6">
            <TabsList className="grid grid-cols-3 h-9">
              <TabsTrigger value="campaigns" className="flex items-center gap-1 px-3 text-sm">
                <Send className="w-3 h-3" />
                Active Campaigns
              </TabsTrigger>
              <TabsTrigger value="responses" className="flex items-center gap-1 px-3 text-sm">
                <Users className="w-3 h-3" />
                Recent Responses
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1 px-3 text-sm">
                <BarChart3 className="w-3 h-3" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            {/* Active Campaigns Tab */}
            <TabsContent value="campaigns" className="h-full m-0">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Campaign Performance</CardTitle>
                      <CardDescription>Monitor your active and recent campaigns</CardDescription>
                    </div>
                    <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                      <SelectTrigger className="w-[160px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Campaigns</SelectItem>
                        <SelectItem value="active">Active Only</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      {activeCampaigns
                        .filter(campaign => campaignFilter === "all" || campaign.status === campaignFilter)
                        .map((campaign) => (
                        <div key={campaign.id} className="border rounded-lg p-6 hover:bg-muted/20 transition-colors">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold">{campaign.name}</h4>
                                {getStatusBadge(campaign.status)}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Created: {new Date(campaign.dateCreated).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>Last activity: {campaign.lastActivity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-card-foreground">{campaign.recipients}</div>
                              <div className="text-sm text-muted-foreground">recipients</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Send className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">Sent</span>
                                </div>
                                <span className="font-medium">{campaign.sent}</span>
                              </div>
                              <Progress value={100} className="h-2" />
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Eye className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">Opened</span>
                                </div>
                                <span className="font-medium">{campaign.opened}</span>
                              </div>
                              <Progress value={campaign.openRate} className="h-2" />
                              <div className="text-xs text-muted-foreground">{campaign.openRate}% open rate</div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">Completed</span>
                                </div>
                                <span className="font-medium">{campaign.completed}</span>
                              </div>
                              <Progress value={campaign.completionRate} className="h-2" />
                              <div className="text-xs text-muted-foreground">{campaign.completionRate}% completion rate</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recent Responses Tab */}
            <TabsContent value="responses" className="h-full m-0">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recent Client Responses</CardTitle>
                  <CardDescription>Latest client activity and assessment progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      {recentResponses.map((response) => (
                        <div key={response.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-chart-1/10 flex items-center justify-center">
                              <span className="text-chart-1 font-medium text-lg">
                                {response.clientName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{response.clientName}</div>
                              <div className="text-sm text-muted-foreground">{response.company}</div>
                              <div className="text-sm text-muted-foreground mt-1">{response.campaign}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {response.status === "completed" && (
                              <div className="text-right">
                                <div className="text-2xl font-bold text-chart-2">{response.score}</div>
                                <div className="text-xs text-muted-foreground">Score</div>
                              </div>
                            )}
                            
                            {response.status === "in-progress" && (
                              <div className="text-right">
                                <div className="text-2xl font-bold text-chart-3">{response.progress}%</div>
                                <div className="text-xs text-muted-foreground">Progress</div>
                              </div>
                            )}
                            
                            <div className="text-right">
                              {getStatusBadge(response.status)}
                              <div className="text-xs text-muted-foreground mt-1">
                                {response.completedAt && new Date(response.completedAt).toLocaleString()}
                                {response.startedAt && new Date(response.startedAt).toLocaleString()}
                                {response.openedAt && new Date(response.openedAt).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="h-full m-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Trends</CardTitle>
                    <CardDescription>Campaign performance over time</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Chart visualization would be displayed here</p>
                      <p className="text-sm mt-2">Showing open rates, completion rates, and response times</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Client Segments</CardTitle>
                    <CardDescription>Performance by client category</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Segmentation analysis would be displayed here</p>
                      <p className="text-sm mt-2">High-value, Mid-tier, and Growing segments</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}