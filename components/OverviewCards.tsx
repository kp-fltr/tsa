import { FileText, Users, TrendingUp, MoreHorizontal, Target, CheckCircle, UserCheck, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useClientKpis } from "../hooks/useClientRegistry";
import { Skeleton } from "./ui/skeleton";

export function OverviewCards() {
  const { kpis, loading, error } = useClientKpis();

  // Create metrics array from KPI data
  const metrics = [
    {
      title: "Outstanding Assessments",
      value: kpis.outstandingCount.toString(),
      change: "+12%", // Could be calculated from historical data
      changeType: "increase",
      icon: Target,
      iconColor: "text-foreground",
      bgColor: "bg-white",
      tooltip: "Number of sustainability assessments that clients have not yet completed"
    },
    {
      title: "Updated Assessments", 
      value: kpis.updatedCount.toString(),
      change: "+5%",
      changeType: "increase",
      icon: CheckCircle,
      iconColor: "text-foreground",
      bgColor: "bg-white",
      tooltip: "Number of client assessments that are up to date"
    },
    {
      title: "Overdue Assessments",
      value: kpis.overdueCount.toString(), 
      change: "+8%",
      changeType: "increase",
      icon: UserCheck,
      iconColor: "text-foreground",
      bgColor: "bg-white",
      tooltip: "Number of assessments that are past their scheduled completion date"
    },
    {
      title: "Due in Next 30 Days",
      value: kpis.upcoming30d.toString(),
      change: "-2%",
      changeType: "decrease",
      icon: Clock,
      iconColor: "text-foreground",
      bgColor: "bg-white",
      tooltip: "Number of assessments scheduled for completion in the next 30 days"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg border-2 border-border p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
              <Skeleton className="w-6 h-6" />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <Skeleton className="h-4 w-32" />
              <div className="flex items-end justify-between gap-3">
                <Skeleton className="h-12 w-16" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="col-span-full bg-card rounded-lg border-2 border-destructive/20 p-6 sm:p-8">
          <p className="text-destructive">Failed to load metrics: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      {/* Responsive grid: single column on mobile, 2 cols on tablet, 4 cols on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="bg-card rounded-lg border-2 border-border p-6 sm:p-8 relative shadow-sm hover:shadow-md transition-shadow">
              {/* Header - Better proportioned spacing and sizing */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full ${metric.bgColor} shadow-sm`}>
                  <Icon className={`w-5 h-5 sm:w-7 sm:h-7 ${metric.iconColor}`} />
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* Touch-friendly button (44px minimum) */}
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View details</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Content - Improved typography hierarchy and spacing */}
              <div className="space-y-4 sm:space-y-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h4 className="text-muted-foreground cursor-help font-medium">{metric.title}</h4>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="content-width">{metric.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* Value and change indicator - Enhanced layout and bigger numbers */}
                <div className="flex items-end justify-between gap-3">
                  {/* Much larger, more prominent metric value */}
                  <div className="flex-1">
                    <span className="text-card-foreground font-bold leading-none block text-h1 sm:text-[48px] lg:text-[56px] tracking-tight">
                      {metric.value}
                    </span>
                  </div>
                  
                  {/* Change indicator with better visual balance */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-chart-2/10 border border-chart-2/20 shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-chart-2" />
                    <span className="text-chart-2 font-semibold text-sm leading-none">{metric.change}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}