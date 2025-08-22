import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { 
  Search,
  Mail,
  Clock,
  Sparkles,
  Copy,
  FileText,
  Edit,
  Check,
  Star,
  Calendar
} from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preview: string;
  content: string;
  category: string;
  lastUsed?: string;
  isStarred?: boolean;
  usage: number;
}

interface ClientData {
  id: number;
  name: string;
  email: string;
  volume: string;
  status: string;
  type: string;
  company: string;
}

interface EmailTemplateSelectionProps {
  onTemplateSelect: (subject: string, content: string) => void;
  selectedClients: number;
  campaignName?: string;
  selectedClientData?: ClientData[];
}

const mockTemplates: EmailTemplate[] = [
  {
    id: "welcome",
    name: "Welcome & Assessment Invitation",
    subject: "Your Sustainability Assessment is Ready",
    preview: "Welcome to your sustainability journey. We've prepared a personalised assessment...",
    content: "Dear {Name},\n\nWelcome to your sustainability journey! We've prepared a personalised sustainability assessment specifically for {Company}.\n\nThis comprehensive assessment will help us understand your current sustainability practices and identify opportunities for improvement.\n\nPlease take 10-15 minutes to complete the assessment by clicking the link below.\n\nBest regards,\nYour Advisory Team",
    category: "Welcome",
    lastUsed: "2 days ago",
    isStarred: true,
    usage: 24
  },
  {
    id: "follow-up",
    name: "Assessment Follow-up",
    subject: "Reminder: Complete Your Sustainability Assessment",
    preview: "Just a friendly reminder to complete your sustainability assessment...",
    content: "Dear {Name},\n\nI hope this email finds you well. This is a friendly reminder that your sustainability assessment for {Company} is still pending completion.\n\nYour input is valuable to us and will help create a tailored sustainability roadmap for your organization.\n\nThe assessment takes approximately 10-15 minutes to complete.\n\nIf you have any questions, please don't hesitate to reach out.\n\nBest regards,\nYour Advisory Team",
    category: "Follow-up",
    lastUsed: "1 week ago",
    isStarred: false,
    usage: 18
  },
  {
    id: "quarterly",
    name: "Quarterly Review Invitation",
    subject: "Quarterly Sustainability Review - Action Required",
    preview: "It's time for your quarterly sustainability review. Let's assess your progress...",
    content: "Dear {Name},\n\nAs we approach the end of the quarter, it's time for your regular sustainability review.\n\nThis quarterly assessment will help us track your progress, celebrate achievements, and identify areas for continued improvement.\n\nThe review includes:\n- Progress against your sustainability goals\n- New opportunities for impact\n- Updated recommendations\n\nPlease complete the assessment at your earliest convenience.\n\nThank you for your continued commitment to sustainability.\n\nBest regards,\nYour Advisory Team",
    category: "Review",
    lastUsed: "3 weeks ago",
    isStarred: true,
    usage: 12
  },
  {
    id: "urgent",
    name: "Urgent Assessment Required",
    subject: "Urgent: Sustainability Compliance Assessment Required",
    preview: "We need your immediate attention for a compliance-related sustainability assessment...",
    content: "Dear {Name},\n\nWe require your immediate attention for a compliance-related sustainability assessment.\n\nDue to recent regulatory changes, we need to update your sustainability profile to ensure continued compliance.\n\nThis is a priority assessment and should be completed within 48 hours.\n\nThe assessment covers:\n- Updated compliance requirements\n- Risk assessment\n- Immediate action items\n\nPlease prioritize this assessment to avoid any compliance issues.\n\nFor urgent queries, please contact us immediately.\n\nBest regards,\nYour Advisory Team",
    category: "Urgent",
    lastUsed: "1 month ago",
    isStarred: false,
    usage: 8
  }
];

const mockRecentTemplates: EmailTemplate[] = [
  {
    id: "recent-1",
    name: "Last Week's Campaign",
    subject: "Q4 Sustainability Review",
    preview: "Thank you for your participation in our Q4 sustainability initiatives...",
    content: "Dear {Name},\n\nThank you for your participation in our Q4 sustainability initiatives.\n\nWe're now ready to conduct your year-end sustainability assessment to review progress and set goals for the coming year.\n\nBest regards,\nYour Advisory Team",
    category: "Recent",
    lastUsed: "Last week",
    usage: 15
  },
  {
    id: "recent-2",
    name: "ESG Reporting Campaign",
    subject: "ESG Reporting Assessment",
    preview: "Help us prepare your ESG report with this comprehensive assessment...",
    content: "Dear {Name},\n\nAs we prepare for ESG reporting season, we need your input on key sustainability metrics.\n\nThis assessment will gather the necessary data for your annual ESG report.\n\nBest regards,\nYour Advisory Team",
    category: "Recent",
    lastUsed: "2 weeks ago",
    usage: 9
  }
];

export function EmailTemplateSelection({ 
  onTemplateSelect, 
  selectedClients, 
  campaignName = "", 
  selectedClientData = [] 
}: EmailTemplateSelectionProps) {
  const [activeTab, setActiveTab] = useState("templates");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [customSubject, setCustomSubject] = useState("");
  const [customContent, setCustomContent] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredTemplates = mockTemplates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setCustomSubject(template.subject);
    setCustomContent(template.content);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      onTemplateSelect(customSubject, customContent);
    }
  };

  const handleUseCustom = () => {
    onTemplateSelect(customSubject, customContent);
  };

  const handleGenerateEmail = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with campaign context
    setTimeout(() => {
      const generatedSubject = campaignName 
        ? `${campaignName}: Your Sustainability Assessment`
        : "AI Generated: Sustainability Assessment Invitation";
      
      const generatedContent = `Dear {Name},\n\nBased on your requirements: "${aiPrompt}"\n\nWe've prepared a customized sustainability assessment for {Company} that addresses your specific needs and objectives.\n\nThis assessment has been tailored to focus on the areas most relevant to your organization's sustainability journey.\n\nPlease take a few minutes to complete this personalized assessment.\n\nBest regards,\nYour Advisory Team`;
      
      setCustomSubject(generatedSubject);
      setCustomContent(generatedContent);
      setIsGenerating(false);
      setActiveTab("custom");
    }, 2000);
  };

  const categories = ["All", "Welcome", "Follow-up", "Review", "Urgent"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryFilteredTemplates = selectedCategory === "All" 
    ? filteredTemplates 
    : filteredTemplates.filter(template => template.category === selectedCategory);

  // Get first client for preview
  const previewClient = selectedClientData.length > 0 ? selectedClientData[0] : {
    name: "James Wellington",
    email: "james.wellington@email.com",
    company: "Wellington Partners"
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h3>Email Template Selection</h3>
        <p className="text-muted-foreground mt-1">
          Choose a template, create a custom email, or generate content for {selectedClients} selected clients
          {campaignName && (
            <span> in campaign "<strong>{campaignName}</strong>"</span>
          )}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 h-12 mb-6">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI Generate
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Custom
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          {/* Template Library */}
          <TabsContent value="templates" className="h-full m-0">
            <div className="grid grid-cols-3 gap-6 h-full">
              {/* Template List */}
              <div className="col-span-2">
                <Card className="h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Template Library</CardTitle>
                        <CardDescription>Choose from pre-built email templates</CardDescription>
                      </div>
                      <Badge variant="secondary">{categoryFilteredTemplates.length} templates</Badge>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search templates..."
                          className="pl-10 h-10"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={selectedCategory === category ? "bg-chart-1 text-card" : ""}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 overflow-hidden">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-3">
                        {categoryFilteredTemplates.map((template) => (
                          <Card 
                            key={template.id} 
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              selectedTemplate?.id === template.id ? 'ring-2 ring-chart-1' : ''
                            }`}
                            onClick={() => handleTemplateSelect(template)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="font-medium">{template.name}</h5>
                                    {template.isStarred && <Star className="w-4 h-4 text-chart-3 fill-current" />}
                                  </div>
                                  <p className="text-muted-foreground text-sm mb-2">{template.subject}</p>
                                  <p className="text-muted-foreground text-sm line-clamp-2">{template.preview}</p>
                                </div>
                                {selectedTemplate?.id === template.id && (
                                  <Check className="w-5 h-5 text-chart-1 flex-shrink-0 ml-2" />
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <Badge variant="outline" className="text-xs">{template.category}</Badge>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {template.lastUsed}
                                  </span>
                                  <span>{template.usage} uses</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Template Preview */}
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Template Preview</CardTitle>
                    <CardDescription>Review and customize before use</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    {selectedTemplate ? (
                      <>
                        <div className="space-y-4 flex-1">
                          <div>
                            <Label>Subject Line</Label>
                            <Input 
                              value={customSubject} 
                              onChange={(e) => setCustomSubject(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <Label>Email Content</Label>
                            <Textarea 
                              value={customContent}
                              onChange={(e) => setCustomContent(e.target.value)}
                              className="mt-1 h-[250px] resize-none"
                            />
                          </div>

                          <Card className="bg-muted/30">
                            <CardContent className="pt-4">
                              <Label className="text-sm mb-2 block">Available Variables</Label>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="font-mono text-xs">{"{Name}"}</Badge>
                                <Badge variant="secondary" className="font-mono text-xs">{"{Email}"}</Badge>
                                <Badge variant="secondary" className="font-mono text-xs">{"{Company}"}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Button 
                          onClick={handleUseTemplate} 
                          className="bg-chart-1 hover:bg-chart-1/90 w-full mt-4"
                        >
                          Use This Template
                        </Button>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Select a template to preview</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Recent Templates */}
          <TabsContent value="recent" className="h-full m-0">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Recently Used Templates</CardTitle>
                <CardDescription>Quickly reuse templates from your recent campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {mockRecentTemplates.map((template) => (
                    <Card key={template.id} className="cursor-pointer hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h5 className="font-medium mb-1">{template.name}</h5>
                            <p className="text-muted-foreground text-sm">{template.subject}</p>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {template.lastUsed}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{template.preview}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{template.usage} uses</Badge>
                          <Button 
                            size="sm" 
                            onClick={() => {
                              setCustomSubject(template.subject);
                              setCustomContent(template.content);
                              setActiveTab("custom");
                            }}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Generate */}
          <TabsContent value="generate" className="h-full m-0">
            <div className="grid grid-cols-2 gap-6 h-full">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-chart-3" />
                    AI Email Generator
                  </CardTitle>
                  <CardDescription>Describe what you want and let AI create your email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Campaign Description</Label>
                    <Textarea 
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Describe your campaign goals, target audience, and key messages. For example: 'Create a professional email for quarterly sustainability review focusing on carbon reduction goals and ESG reporting requirements.'"
                      className="mt-2 h-32"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Campaign Context</Label>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 bg-muted/30 rounded">
                        <span className="font-medium">Campaign:</span>
                        <p className="text-muted-foreground">{campaignName || "Unnamed Campaign"}</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded">
                        <span className="font-medium">Recipients:</span>
                        <p className="text-muted-foreground">{selectedClients} clients</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded">
                        <span className="font-medium">Type:</span>
                        <p className="text-muted-foreground">Assessment Invitation</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded">
                        <span className="font-medium">Example Client:</span>
                        <p className="text-muted-foreground">{previewClient.company}</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerateEmail} 
                    disabled={!aiPrompt.trim() || isGenerating}
                    className="bg-chart-1 hover:bg-chart-1/90 w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Email
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generated Preview</CardTitle>
                  <CardDescription>AI-generated email content based on your requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <Sparkles className="w-8 h-8 mx-auto mb-4 animate-spin text-chart-3" />
                        <p className="text-muted-foreground">Generating your email content...</p>
                      </div>
                    </div>
                  ) : customSubject && customContent && activeTab === "generate" ? (
                    <div className="space-y-4">
                      <div>
                        <Label>Generated Subject</Label>
                        <p className="font-medium mt-1 p-2 bg-muted/30 rounded">{customSubject}</p>
                      </div>
                      
                      <div>
                        <Label>Generated Content</Label>
                        <div className="mt-1 p-3 bg-muted/30 rounded max-h-48 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-sm">{customContent}</pre>
                        </div>
                      </div>

                      <Button 
                        onClick={() => setActiveTab("custom")} 
                        className="bg-chart-1 hover:bg-chart-1/90 w-full"
                      >
                        Edit & Use This Email
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Generated content will appear here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Custom Email */}
          <TabsContent value="custom" className="h-full m-0">
            <div className="grid grid-cols-2 gap-6 h-full">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Email</CardTitle>
                  <CardDescription>Create your email from scratch or edit generated content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Subject Line *</Label>
                    <Input 
                      value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                      placeholder="Enter email subject..."
                      className="mt-2"
                    />
                  </div>

                  <div className="flex-1">
                    <Label>Email Content *</Label>
                    <Textarea 
                      value={customContent}
                      onChange={(e) => setCustomContent(e.target.value)}
                      placeholder="Write your email content..."
                      className="mt-2 h-64 resize-none"
                    />
                  </div>

                  <Card className="bg-muted/30">
                    <CardContent className="pt-4">
                      <Label className="text-sm mb-2 block">Available Variables</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="font-mono text-xs">{"{Name}"}</Badge>
                        <Badge variant="secondary" className="font-mono text-xs">{"{Email}"}</Badge>
                        <Badge variant="secondary" className="font-mono text-xs">{"{Company}"}</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Button 
                    onClick={handleUseCustom}
                    disabled={!customSubject.trim() || !customContent.trim()}
                    className="bg-chart-1 hover:bg-chart-1/90 w-full"
                  >
                    Use Custom Email
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Preview</CardTitle>
                  <CardDescription>How your email will appear to clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">To:</span>
                          <span>{previewClient.email}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">Subject:</span>
                          <span className="font-medium">{customSubject || "Your email subject"}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4">
                      <ScrollArea className="h-64">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {customContent
                            .replace('{Name}', previewClient.name)
                            .replace('{Email}', previewClient.email)
                            .replace('{Company}', previewClient.company)
                            || "Your email content will appear here..."
                          }
                        </div>
                      </ScrollArea>
                      {customContent && (
                        <>
                          <Separator className="my-4" />
                          <Button className="bg-chart-1 hover:bg-chart-1/90">
                            Start Assessment
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}