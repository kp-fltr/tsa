import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  FileText,
  Download,
  Settings,
  Calendar,
  Filter,
  Plus,
  Eye,
  Share,
  PieChart,
  BarChart,
  Users,
  Building
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Mock data for Financial Advisor's clients
const faClientData = {
  sustainabilityProfile: [
    { profile: "A", count: 12, percentage: 15.4 },
    { profile: "B", count: 23, percentage: 29.5 },
    { profile: "C", count: 28, percentage: 35.9 },
    { profile: "D", count: 11, percentage: 14.1 },
    { profile: "E", count: 4, percentage: 5.1 }
  ],
  sustainabilityAppetite: [
    { appetite: "High", count: 18, percentage: 23.1 },
    { appetite: "Medium-High", count: 25, percentage: 32.1 },
    { appetite: "Medium", count: 22, percentage: 28.2 },
    { appetite: "Low", count: 10, percentage: 12.8 },
    { appetite: "N/A", count: 3, percentage: 3.8 }
  ]
};

// Mock data for Overall TSA population
const overallPopulationData = {
  sustainabilityProfile: [
    { profile: "A", count: 1240, percentage: 12.4 },
    { profile: "B", count: 2850, percentage: 28.5 },
    { profile: "C", count: 3920, percentage: 39.2 },
    { profile: "D", count: 1480, percentage: 14.8 },
    { profile: "E", count: 510, percentage: 5.1 }
  ],
  sustainabilityAppetite: [
    { appetite: "High", count: 2100, percentage: 21.0 },
    { appetite: "Medium-High", count: 3200, percentage: 32.0 },
    { appetite: "Medium", count: 2950, percentage: 29.5 },
    { appetite: "Low", count: 1250, percentage: 12.5 },
    { appetite: "N/A", count: 500, percentage: 5.0 }
  ]
};

const reportTemplates = [
  {
    id: 1,
    name: "Client Sustainability Overview",
    description: "Comprehensive sustainability assessment overview for all clients",
    frequency: "Monthly",
    lastGenerated: "Dec 15, 2024",
    clients: "All Active",
    type: "overview"
  },
  {
    id: 2,
    name: "Portfolio ESG Analysis",
    description: "Detailed ESG performance analysis and recommendations",
    frequency: "Quarterly",
    lastGenerated: "Dec 10, 2024",
    clients: "Premium Tier",
    type: "analysis"
  },
  {
    id: 3,
    name: "Risk Assessment Report",
    description: "Climate and sustainability risk assessment across portfolios",
    frequency: "Bi-annual",
    lastGenerated: "Dec 5, 2024",
    clients: "High-Risk",
    type: "risk"
  },
  {
    id: 4,
    name: "Impact Measurement",
    description: "Social and environmental impact measurement report",
    frequency: "Annual",
    lastGenerated: "Nov 30, 2024",
    clients: "Impact Focus",
    type: "impact"
  }
];

// Chart color schemes
const CHART_COLORS = {
  sustainabilityProfile: {
    A: "#16a34a", // Green
    B: "#22c55e", // Light green
    C: "#fbbf24", // Yellow
    D: "#f97316", // Orange
    E: "#dc2626"  // Red
  },
  sustainabilityAppetite: {
    High: "#16a34a",
    "Medium-High": "#22c55e",
    Medium: "#fbbf24",
    Low: "#f97316",
    "N/A": "#6b7280"
  }
};

export function AnalyticsReports() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [chartDataset, setChartDataset] = useState<"fa" | "population">("fa");
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");

  const getCurrentData = () => {
    return chartDataset === "fa" ? faClientData : overallPopulationData;
  };

  const getDatasetLabel = () => {
    return chartDataset === "fa" ? "Your Clients" : "Overall TSA Population";
  };

  const getDatasetStats = () => {
    const data = getCurrentData();
    const totalClients = data.sustainabilityProfile.reduce((sum, item) => sum + item.count, 0);
    return {
      totalClients,
      datasetType: chartDataset === "fa" ? "Financial Advisor Portfolio" : "TSA Platform Users"
    };
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{`${label}: ${payload[0].value}`}</p>
          <p className="text-sm text-muted-foreground">
            {`${payload[0].payload.percentage}% of total`}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderPieChart = (data: any[], dataKey: string) => (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="count"
          label={({ percentage }: any) => `${percentage}%`}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={CHART_COLORS[dataKey as keyof typeof CHART_COLORS][entry[dataKey === "sustainabilityProfile" ? "profile" : "appetite"] as keyof typeof CHART_COLORS.sustainabilityProfile]} 
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );

  const renderBarChart = (data: any[], dataKey: string) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis 
          dataKey={dataKey === "sustainabilityProfile" ? "profile" : "appetite"} 
          tick={{ fontSize: 12 }}
          stroke="var(--foreground)"
        />
        <YAxis tick={{ fontSize: 12 }} stroke="var(--foreground)" />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="count" 
          fill="var(--chart-1)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="bg-card border-b border-border px-4 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1>Analytics & Reports</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics and automated report generation
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              <span>Export Data</span>
            </Button>
            <Button className="bg-chart-1 hover:bg-chart-1/90">
              <Plus className="w-4 h-4 mr-2" />
              <span>New Report</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="h-full flex flex-col">
          {/* Custom Tabs Navigation */}
          <div className="box-border content-stretch flex flex-row gap-8 items-start justify-start p-0 relative shrink-0 w-full mb-6">
            <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-zinc-200 inset-0 pointer-events-none" />
            
            <button
              onClick={() => setSelectedTab("overview")}
              className={`box-border content-stretch flex flex-row gap-3 items-center justify-center px-0 py-3 relative shrink-0 ${
                selectedTab === "overview" ? "" : ""
              }`}
            >
              {selectedTab === "overview" && (
                <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-solid border-zinc-900 inset-0 pointer-events-none" />
              )}
              <div className={`leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900 ${
                selectedTab === "overview" ? "font-semibold" : "font-normal"
              }`}>
                <p className="block leading-[22px] whitespace-pre">Overview</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedTab("charts")}
              className={`box-border content-stretch flex flex-row gap-3 items-center justify-center px-0 py-3 relative shrink-0 ${
                selectedTab === "charts" ? "" : ""
              }`}
            >
              {selectedTab === "charts" && (
                <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-solid border-zinc-900 inset-0 pointer-events-none" />
              )}
              <div className={`leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900 ${
                selectedTab === "charts" ? "font-semibold" : "font-normal"
              }`}>
                <p className="block leading-[22px] whitespace-pre">Data Charts</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedTab("reports")}
              className={`box-border content-stretch flex flex-row gap-3 items-center justify-center px-0 py-3 relative shrink-0 ${
                selectedTab === "reports" ? "" : ""
              }`}
            >
              {selectedTab === "reports" && (
                <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-solid border-zinc-900 inset-0 pointer-events-none" />
              )}
              <div className={`leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-zinc-900 ${
                selectedTab === "reports" ? "font-semibold" : "font-normal"
              }`}>
                <p className="block leading-[22px] whitespace-pre">Reports</p>
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-0 py-4 relative shrink-0 w-full flex-1">
            {selectedTab === "overview" && (
              <div className="w-full space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Clients</p>
                      <p className="text-2xl font-bold">156</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Active Campaigns</p>
                      <p className="text-2xl font-bold">23</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Reports Generated</p>
                      <p className="text-2xl font-bold">47</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Avg. Score</p>
                      <p className="text-2xl font-bold">78%</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Latest generated reports and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportTemplates.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Generated: {report.lastGenerated} • {report.clients} clients
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
              </div>
            )}

            {selectedTab === "charts" && (
              <div className="space-y-6">
                {/* Data Charts Header & Controls */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3>Data Charts</h3>
                    <p className="text-muted-foreground">
                      Comparative sustainability data analysis between your client base and overall TSA population
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select value={chartDataset} onValueChange={(value: "fa" | "population") => setChartDataset(value)}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fa">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Your Clients</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="population">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            <span>TSA Population</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={chartType} onValueChange={(value: "bar" | "pie") => setChartType(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">
                          <div className="flex items-center gap-2">
                            <BarChart className="w-4 h-4" />
                            <span>Bar</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="pie">
                          <div className="flex items-center gap-2">
                            <PieChart className="w-4 h-4" />
                            <span>Pie</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Dataset Summary */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="mb-1">{getDatasetLabel()}</h4>
                        <p className="text-sm text-muted-foreground">{getDatasetStats().datasetType}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{getDatasetStats().totalClients.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total Investors</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sustainability Profile Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Sustainability Profile Distribution
                      </CardTitle>
                      <CardDescription>
                        Number of investors by sustainability profile (A to E)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {chartType === "bar" ? 
                        renderBarChart(getCurrentData().sustainabilityProfile, "sustainabilityProfile") :
                        renderPieChart(getCurrentData().sustainabilityProfile, "sustainabilityProfile")
                      }
                      <div className="mt-4 grid grid-cols-5 gap-2 text-center">
                        {getCurrentData().sustainabilityProfile.map((item) => (
                          <div key={item.profile} className="text-sm">
                            <div className="font-medium">{item.profile}</div>
                            <div className="text-muted-foreground">{item.count}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sustainability Appetite Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Sustainability Appetite Distribution
                      </CardTitle>
                      <CardDescription>
                        Number of investors by sustainability appetite level
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {chartType === "bar" ? 
                        renderBarChart(getCurrentData().sustainabilityAppetite, "sustainabilityAppetite") :
                        renderPieChart(getCurrentData().sustainabilityAppetite, "sustainabilityAppetite")
                      }
                      <div className="mt-4 space-y-1">
                        {getCurrentData().sustainabilityAppetite.map((item) => (
                          <div key={item.appetite} className="flex justify-between text-sm">
                            <span>{item.appetite}</span>
                            <span className="font-medium">{item.count} ({item.percentage}%)</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Comparative Analysis */}
                {chartDataset === "fa" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Comparative Analysis</CardTitle>
                      <CardDescription>
                        How your client base compares to the overall TSA population
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="mb-3">Sustainability Profile Comparison</h5>
                          <div className="space-y-2">
                            {faClientData.sustainabilityProfile.map((faItem, index) => {
                              const popItem = overallPopulationData.sustainabilityProfile[index];
                              const difference = faItem.percentage - popItem.percentage;
                              return (
                                <div key={faItem.profile} className="flex items-center justify-between text-sm">
                                  <span>Profile {faItem.profile}</span>
                                  <div className="flex items-center gap-2">
                                    <span>{faItem.percentage}%</span>
                                    <span className={`text-xs ${difference > 0 ? 'text-chart-2' : difference < 0 ? 'text-chart-4' : 'text-muted-foreground'}`}>
                                      {difference > 0 ? '+' : ''}{difference.toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <h5 className="mb-3">Appetite Level Comparison</h5>
                          <div className="space-y-2">
                            {faClientData.sustainabilityAppetite.map((faItem, index) => {
                              const popItem = overallPopulationData.sustainabilityAppetite[index];
                              const difference = faItem.percentage - popItem.percentage;
                              return (
                                <div key={faItem.appetite} className="flex items-center justify-between text-sm">
                                  <span>{faItem.appetite}</span>
                                  <div className="flex items-center gap-2">
                                    <span>{faItem.percentage}%</span>
                                    <span className={`text-xs ${difference > 0 ? 'text-chart-2' : difference < 0 ? 'text-chart-4' : 'text-muted-foreground'}`}>
                                      {difference > 0 ? '+' : ''}{difference.toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {selectedTab === "reports" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3>Report Templates</h3>
                    <p className="text-muted-foreground">Manage and generate automated reports</p>
                  </div>
                  <Button className="bg-chart-1 hover:bg-chart-1/90">
                    <Plus className="w-4 h-4 mr-2" />
                    <span>Create Template</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {reportTemplates.map((template) => (
                    <Card key={template.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge variant="outline">{template.frequency}</Badge>
                        </div>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Last Generated:</span>
                          <span>{template.lastGenerated}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Target Clients:</span>
                          <span>{template.clients}</span>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            <span>Preview</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            <span>Generate</span>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}