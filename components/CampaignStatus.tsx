import { MoreHorizontal, Zap, TrendingUp, Play, Pause, CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const mockCampaigns = [
  {
    id: 1,
    name: "Q4 ESG Assessment",
    status: "Active",
    progress: 75,
    participants: 156,
    dueDate: "Dec 15, 2024",
    type: "assessment"
  },
  {
    id: 2,
    name: "Carbon Footprint Survey",
    status: "Active", 
    progress: 45,
    participants: 89,
    dueDate: "Jan 10, 2025",
    type: "survey"
  },
  {
    id: 3,
    name: "Sustainable Investment Check",
    status: "Paused",
    progress: 30,
    participants: 67,
    dueDate: "Dec 20, 2024",
    type: "review"
  },
  {
    id: 4,
    name: "Green Finance Training",
    status: "Completed",
    progress: 100,
    participants: 234,
    dueDate: "Nov 30, 2024",
    type: "training"
  }
];

export function CampaignStatus() {
  return (
    <TooltipProvider>
      <div className="bg-card rounded-lg border-2 border-border p-4 sm:p-6 shadow-sm">
        {/* Header - Responsive layout */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
              <Zap className="w-5 h-5 text-foreground" />
            </div>
            <h2 className="text-card-foreground text-lg sm:text-xl">Campaign Status</h2>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              {/* Touch-friendly button */}
              <button className="p-2 hover:bg-muted rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
                <MoreHorizontal className="w-4 h-4 text-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View all campaigns</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Campaign List - Responsive cards */}
        <div className="space-y-3 sm:space-y-4">
          {mockCampaigns.map((campaign) => (
            <div key={campaign.id} className="relative p-3 sm:p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
              {/* Status Badge - Positioned top right */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                campaign.status === 'Active' ? 'bg-chart-2/10 text-chart-2' :
                campaign.status === 'Paused' ? 'bg-chart-3/10 text-chart-3' :
                'bg-chart-1/10 text-chart-1'
              }`}>
                {campaign.status}
              </div>
              
              {/* Campaign Header - Simplified layout */}
              <div className="flex items-center gap-3 pr-16 sm:pr-20">
                <div className={`p-1.5 rounded-full shrink-0 ${
                  campaign.status === 'Active' ? 'bg-chart-2/10' :
                  campaign.status === 'Paused' ? 'bg-chart-3/10' :
                  'bg-chart-1/10'
                }`}>
                  {campaign.status === 'Active' ? (
                    <Play className={`w-3 h-3 ${campaign.status === 'Active' ? 'text-chart-2' : 'text-chart-3'}`} />
                  ) : campaign.status === 'Paused' ? (
                    <Pause className="w-3 h-3 text-chart-3" />
                  ) : (
                    <CheckCircle className="w-3 h-3 text-chart-1" />
                  )}
                </div>
                
                <div className="min-w-0 flex-1">
                  <h4 className="text-card-foreground font-medium text-sm sm:text-base truncate">{campaign.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}