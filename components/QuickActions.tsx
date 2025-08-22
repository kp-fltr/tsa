import { Plus, Share, BarChart3, MoreHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const actions = [
  {
    title: "Start New Assessment",
    icon: Plus,
    isPrimary: true,
    tooltip: "Begin a new sustainability assessment for a client"
  },
  {
    title: "Distribute Tests", 
    icon: Share,
    isPrimary: false,
    tooltip: "Send assessments to multiple clients at once"
  },
  {
    title: "View Analytics",
    icon: BarChart3, 
    isPrimary: false,
    tooltip: "Access detailed performance metrics and insights"
  }
];

export function QuickActions() {
  return (
    <TooltipProvider>
      <div className="bg-card rounded-lg border-2 border-border p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-card-foreground">Quick Actions</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <MoreHorizontal className="w-3.5 h-4 text-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More options</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Tooltip key={action.title}>
                <TooltipTrigger asChild>
                  <button
                    className={`w-full flex items-center justify-center gap-6 px-6 py-4 rounded-md border-2 border-border transition-colors shadow-sm ${
                      action.isPrimary
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{action.title}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}