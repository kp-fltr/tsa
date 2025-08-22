import { useState, useEffect, useCallback } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";
import { Send, Flame, BookOpen, TrendingUp, Users, Mail, FileText, Copy, ExternalLink, AlertTriangle, CheckCircle, Clock, Calendar as CalendarIcon, ChevronLeft, UserPlus, Rocket } from "lucide-react";
import Avatar from "../imports/Avatar-11-33170";
import svgPaths from "../imports/svg-slxkusfcc5";
import { fetchClients, createClient, ClientRegistryData } from "../services/clientRegistryApi";
import { fetchAssessmentVersions, fetchQuotaInfo, launchTest, validateEmail, LaunchTestParams, AssessmentVersion, QuotaInfo, LaunchTestResult } from "../services/testLaunchApi";
import { useClientRegistry } from "../hooks/useClientRegistry";
import { format } from "date-fns";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'insight' | 'action' | 'data' | 'chart' | 'launch_flow' | 'success';
  data?: any;
}

// Launch test flow types
interface LaunchFlowState {
  step: 'client' | 'version' | 'channel' | 'due_date' | 'lang' | 'notes' | 'confirm';
  slots: Partial<LaunchTestParams>;
  clients?: ClientRegistryData[];
  versions?: AssessmentVersion[];
  quota?: QuotaInfo;
  errors?: string[];
}

interface ConversationState {
  flow: 'normal' | 'launch_test';
  launchFlow?: LaunchFlowState;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: string;
}

interface AiChatProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (view: string) => void;
}

const quickActions: QuickAction[] = [
  { id: 'launch-test', label: 'Launch New Test', icon: <Rocket className="w-4 h-4" />, action: 'launch_new_test' },
  { id: 'summarize', label: 'Summarize Performance', icon: <TrendingUp className="w-4 h-4" />, action: 'summarize' },
  { id: 'draft-email', label: 'Draft Email', icon: <Mail className="w-4 h-4" />, action: 'draft' }
];

const quickPrompts = [
  { icon: Rocket, text: 'Launch new test', color: 'text-chart-1' },
  { icon: Flame, text: 'Generate a new Email', color: 'text-chart-1' },
  { icon: BookOpen, text: 'Review the last campaign status', color: 'text-chart-1' }
];

export function AiChat({ isOpen, onClose, onNavigate }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>({ flow: 'normal' });
  
  // Form states for launch flow - moved to top level to avoid conditional hooks
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [notes, setNotes] = useState('');
  
  // Client registry hook for cache invalidation
  const { refreshAll: refreshClientRegistry } = useClientRegistry();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    // Process intent and generate response
    setTimeout(() => {
      processUserInput(currentInput);
      setIsLoading(false);
      setIsTyping(false);
    }, 1000);
  }, [inputValue, isLoading]);

  const processUserInput = useCallback(async (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Intent detection
    if (lowerInput.includes('launch') && (lowerInput.includes('test') || lowerInput.includes('new'))) {
      await initiateLaunchFlow();
      return;
    }

    // Default AI response for other intents
    const aiMessage = generateAIResponse(input);
    setMessages(prev => [...prev, aiMessage]);
  }, []);

  const initiateLaunchFlow = useCallback(async () => {
    try {
      // Load initial data for launch flow
      const [clients, versions, quota] = await Promise.all([
        fetchClients({ pageSize: 100 }),
        fetchAssessmentVersions(),
        fetchQuotaInfo()
      ]);

      const launchFlowState: LaunchFlowState = {
        step: 'client',
        slots: {},
        clients: clients.data,
        versions,
        quota,
        errors: []
      };

      setConversationState({
        flow: 'launch_test',
        launchFlow: launchFlowState
      });

      const message: Message = {
        id: Date.now().toString(),
        text: "I'll help you launch a new test. Let's start by selecting a client.",
        isUser: false,
        timestamp: new Date(),
        type: 'launch_flow',
        data: { step: 'client', ...launchFlowState }
      };

      setMessages(prev => [...prev, message]);
    } catch (error) {
      console.error('Error initiating launch flow:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Sorry, I encountered an error setting up the test launch. Please try again.",
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  }, []);

  const generateAIResponse = (input: string): Message => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('campaign') && lowerInput.includes('completion')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "Here's your campaign completion analysis:",
        isUser: false,
        timestamp: new Date(),
        type: 'data',
        data: {
          campaigns: [
            { name: "Q4 ESG Assessment", completion: 78, status: "active", clients: 45 },
            { name: "Sustainability Review", completion: 34, status: "low", clients: 28 },
            { name: "Carbon Footprint Survey", completion: 91, status: "success", clients: 67 }
          ]
        }
      };
    }
    
    // Default response
    return {
      id: (Date.now() + 1).toString(),
      text: "I'm here to help you with sustainability insights, campaign management, and client engagement. Try asking me about campaign performance, client recommendations, or help drafting emails!",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    };
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleQuickAction = useCallback((action: string) => {
    if (action === 'launch_new_test') {
      initiateLaunchFlow();
      return;
    }

    const actionMessages: { [key: string]: string } = {
      'summarize': 'Show me a summary of campaign performance this month',
      'draft': 'Help me draft a follow-up email for inactive clients'
    };
    
    setInputValue(actionMessages[action] || '');
  }, [initiateLaunchFlow]);

  // Launch flow handlers
  const handleLaunchFlowStep = useCallback(async (stepData: any) => {
    if (!conversationState.launchFlow) return;

    const currentFlow = conversationState.launchFlow;
    const updatedSlots = { ...currentFlow.slots, ...stepData };
    
    // Determine next step
    let nextStep: LaunchFlowState['step'];
    switch (currentFlow.step) {
      case 'client':
        nextStep = 'version';
        break;
      case 'version':
        nextStep = 'channel';
        break;
      case 'channel':
        nextStep = 'due_date';
        break;
      case 'due_date':
        nextStep = 'lang';
        break;
      case 'lang':
        nextStep = 'notes';
        break;
      case 'notes':
        nextStep = 'confirm';
        break;
      default:
        nextStep = 'confirm';
    }

    const updatedFlow: LaunchFlowState = {
      ...currentFlow,
      step: nextStep,
      slots: updatedSlots
    };

    setConversationState({
      flow: 'launch_test',
      launchFlow: updatedFlow
    });

    // Add message for next step
    const stepMessage = getStepMessage(nextStep, updatedFlow);
    setMessages(prev => [...prev, stepMessage]);
  }, [conversationState.launchFlow]);

  const getStepMessage = useCallback((step: LaunchFlowState['step'], flowState: LaunchFlowState): Message => {
    const stepMessages = {
      client: "I'll help you launch a new test. Let's start by selecting a client.",
      version: "Great! Now choose an assessment version:",
      channel: "Perfect! How would you like to deliver the assessment?",
      due_date: "When should this assessment be completed?",
      lang: "What language should the assessment be in?",
      notes: "Any special notes for this test? (Optional - you can skip this step)",
      confirm: "Perfect! Here's a summary of your test. Ready to launch?"
    };

    return {
      id: Date.now().toString(),
      text: stepMessages[step],
      isUser: false,
      timestamp: new Date(),
      type: 'launch_flow',
      data: { step, ...flowState }
    };
  }, []);

  const handleCreateNewClient = useCallback(async (clientData: { name: string; email: string }) => {
    try {
      const newClient = await createClient({
        name: clientData.name,
        email: clientData.email,
        status: 'outstanding'
      });

      if (newClient && conversationState.launchFlow) {
        // Update clients list and select the new client
        const updatedClients = [...(conversationState.launchFlow.clients || []), newClient];
        const updatedFlow = {
          ...conversationState.launchFlow,
          clients: updatedClients,
          slots: { ...conversationState.launchFlow.slots, client_id: newClient.id }
        };

        await handleLaunchFlowStep({});
      }
    } catch (error) {
      console.error('Error creating client:', error);
      toast.error('Failed to create client. Please try again.');
    }
  }, [conversationState.launchFlow, handleLaunchFlowStep]);

  // Simple message rendering
  const renderMessage = (message: Message) => {
    if (message.isUser) {
      return (
        <div className="flex justify-end">
          <div className={`${isMobile ? "max-w-[85%]" : "max-w-[80%]"} rounded-lg px-3 sm:px-4 py-2 sm:py-3 bg-chart-1 text-white ml-4`}>
            <p className="text-sm">{message.text}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-start">
        <div className={`${isMobile ? "max-w-[90%]" : "max-w-[85%]"} mr-4`}>
          <div className="flex gap-2 sm:gap-3 mb-2">
            <div className="w-8 h-8 flex-shrink-0">
              <Avatar />
            </div>
            <div className="flex-1 min-w-0">
              <div className="backdrop-blur-[2.5px] backdrop-filter bg-white/90 rounded-lg px-4 py-3 mb-3">
                <p className="text-sm">{message.text}</p>
              </div>
              
              {message.type === 'launch_flow' && message.data && renderLaunchFlowStep(message.data)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Simplified launch flow rendering
  const renderLaunchFlowStep = (data: LaunchFlowState & { step: string }) => {
    const { step } = data;
    
    if (step === 'client') {
      return (
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Select Client</CardTitle>
            {data.quota && (
              <p className="text-sm text-muted-foreground">
                {data.quota.test_allowance_remaining} tests remaining
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {data.clients?.slice(0, 5).map((client) => (
                <button
                  key={client.id}
                  onClick={() => handleLaunchFlowStep({ client_id: client.id })}
                  className="w-full flex justify-between items-center p-3 bg-muted/30 hover:bg-muted/50 rounded-md transition-colors min-h-[44px] text-left"
                >
                  <div>
                    <p className="text-sm font-medium">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.email}</p>
                  </div>
                  <Badge variant="secondary">{client.status}</Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="border-border">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Launch flow step: {step}
          </p>
          <Button 
            onClick={() => handleLaunchFlowStep({})}
            className="mt-2 w-full"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right"
        className="w-full sm:w-[480px] md:w-[520px] p-0 bg-gradient-to-br from-blue-50/90 via-white/95 to-indigo-50/90 backdrop-blur-xl backdrop-filter border-l"
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* TSA Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="w-72 h-48">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 245 168"
              >
                <g>
                  <path
                    d={svgPaths.p58f6f80}
                    fill="var(--color-chart-1)"
                    fillOpacity="0.8"
                  />
                  <path
                    d={svgPaths.p32887b80}
                    fill="var(--color-chart-1)"
                    fillOpacity="0.8"
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* Header */}
          <SheetHeader className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-b relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-6">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 38 26"
                >
                  <g>
                    <path
                      d={svgPaths.p3d4d9a00}
                      fill="var(--color-chart-1)"
                    />
                    <path
                      d={svgPaths.p37ef2e00}
                      fill="var(--color-chart-1)"
                    />
                  </g>
                </svg>
              </div>
              <div>
                <SheetTitle className="text-lg">TSA AI Assistant</SheetTitle>
                <SheetDescription className="text-sm">
                  Get insights and manage your sustainability assessments
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 sm:p-6 relative z-10">
            <div className="space-y-4 sm:space-y-6">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <div className="backdrop-blur-[2.5px] backdrop-filter bg-white/90 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Hello! I'm your TSA AI assistant. How can I help you today?
                    </p>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground px-1">Quick Actions</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {quickActions.map((action) => (
                        <Button
                          key={action.id}
                          variant="outline"
                          onClick={() => handleQuickAction(action.action)}
                          className="justify-start h-auto p-3 bg-white/70 hover:bg-white/90 backdrop-blur-sm min-h-[44px] text-left"
                        >
                          <div className="flex items-center gap-3">
                            {action.icon}
                            <span className="text-sm">{action.label}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Prompts */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground px-1">Try asking...</h4>
                    <div className="space-y-2">
                      {quickPrompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handlePromptClick(prompt.text)}
                          className="w-full flex items-center gap-3 p-3 bg-white/70 hover:bg-white/90 backdrop-blur-sm rounded-lg transition-colors text-left min-h-[44px]"
                        >
                          <prompt.icon className={`w-4 h-4 ${prompt.color}`} />
                          <span className="text-sm">{prompt.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map(renderMessage)
              )}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] mr-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 flex-shrink-0">
                        <Avatar />
                      </div>
                      <div className="backdrop-blur-[2.5px] backdrop-filter bg-white/90 rounded-lg px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-t relative z-10">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about campaigns, clients, or need help..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                className="flex-1 min-h-[44px] bg-white/90"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="min-w-[44px] min-h-[44px] shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}