import { MoreHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const insights = [
  {
    title: "ESG Score Improvement",
    description: "Average client ESG scores increased this quarter",
    change: "+15%",
    changeType: "positive",
    tooltip: "Environmental, Social, and Governance performance metrics"
  },
  {
    title: "Carbon Footprint", 
    description: "Portfolio carbon intensity decreased significantly",
    change: "-8%",
    changeType: "positive",
    tooltip: "Total carbon emissions across client portfolios"
  },
  {
    title: "Green Investments",
    description: "Sustainable investment allocation growing",
    change: "+23%", 
    changeType: "positive",
    tooltip: "Percentage of assets in sustainable investment vehicles"
  }
];

export function TopInsights() {
  return (
    <TooltipProvider>
      <div className="bg-card rounded-lg border-2 border-border p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-card-foreground">Top Insights</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <MoreHorizontal className="w-3.5 h-4 text-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View all insights</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Insights */}
        <div className="space-y-4">
          {insights.map((insight) => (
            <Tooltip key={insight.title}>
              <TooltipTrigger asChild>
                <div className="bg-muted border border-border rounded-md p-4 cursor-help hover:bg-accent transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-card-foreground" style={{ fontWeight: 'var(--font-weight-semibold)' }}>{insight.title}</h4>
                    <span className={`px-2 py-1 rounded text-card border border-border ${
                      insight.changeType === 'positive' 
                        ? insight.change.includes('-') 
                          ? "bg-chart-3 text-card"
                          : "bg-chart-2 text-card"
                        : "bg-destructive text-destructive-foreground"
                    }`} style={{ fontSize: 'var(--text-sm)' }}>
                      {insight.change}
                    </span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{insight.description}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{insight.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}