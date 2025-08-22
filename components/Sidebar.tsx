import TsaLogoHorizontal1 from "../imports/TsaLogoHorizontal1";
import TsaSymbol from "../imports/TsaSymbol";
import { Home, Users, BarChart3, HelpCircle, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "./ui/sidebar";

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const navigationItems = [
  { 
    name: "Dashboard", 
    icon: Home, 
    view: "dashboard",
    description: "Overview and key metrics"
  },
  { 
    name: "Client Management", 
    icon: Users, 
    view: "client-directory",
    description: "Client information and profiles"
  },
  { 
    name: "Analytics", 
    icon: BarChart3, 
    view: "analytics",
    description: "Performance analytics and insights"
  },
];

const bottomItems = [
  { name: "Support", icon: HelpCircle },
  { name: "Settings", icon: Settings },
];

export function AppSidebar({ currentView, onNavigate }: SidebarProps) {
  const { setOpenMobile } = useSidebar();
  
  const handleNavigation = (view: string) => {
    console.log('Sidebar navigation:', { from: currentView, to: view });
    onNavigate(view);
    // Automatically close the sidebar on mobile after navigation
    setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon" role="navigation" aria-label="Main navigation">
      {/* Logo & Brand Area */}
      <SidebarHeader className="p-0 h-16 min-h-16 border-b border-sidebar-border/50">
        <div className="flex items-center h-full px-4 group-data-[collapsible=icon]:px-3 group-data-[collapsible=icon]:justify-center sidebar-logo-transition">
          {/* Expanded logo */}
          <div className="group-data-[collapsible=icon]:hidden flex items-center w-full sidebar-logo-expanded">
            <div className="w-28 h-auto flex-shrink-0" role="img" aria-label="TSA Logo">
              <TsaLogoHorizontal1 />
            </div>
          </div>
          {/* Collapsed symbol */}
          <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-8 h-8 flex-shrink-0 sidebar-logo-collapsed">
            <div className="w-6 h-6" role="img" aria-label="TSA">
              <TsaSymbol />
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="px-2 py-6 flex-1">
        <SidebarGroup className="px-0 py-0">
          <SidebarGroupContent className="space-y-2">
            <SidebarMenu className="space-y-2" role="list">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.view;
                return (
                  <SidebarMenuItem key={item.name} role="listitem">
                    <SidebarMenuButton
                      onClick={() => handleNavigation(item.view)}
                      isActive={isActive}
                      tooltip={item.description}
                      size="lg"
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={`Navigate to ${item.name}. ${item.description}`}
                      className={`
                        w-full min-h-[44px] px-3 py-3 
                        text-sidebar-foreground 
                        hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                        data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-semibold
                        group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2
                        transition-all duration-200 ease-in-out
                        focus-visible:ring-2 focus-visible:ring-chart-1 focus-visible:ring-offset-2
                        rounded-lg
                        relative
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      <span className="flex-1 text-left text-sm font-medium group-data-[collapsible=icon]:sr-only truncate">
                        {item.name}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Spacer to push footer to bottom */}
        <div className="flex-1" />

        {/* Separator between main nav and footer */}

      </SidebarContent>

      {/* Footer Items */}
      <SidebarFooter className="px-2 pb-4 border-t border-sidebar-border/50">
        <SidebarGroup className="px-0 py-0">
          <SidebarGroupContent className="space-y-2 pt-4">
            <SidebarMenu className="space-y-2" role="list">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.name} role="listitem">
                    <SidebarMenuButton
                      tooltip={item.name}
                      size="lg"
                      aria-label={`Access ${item.name}`}
                      className={`
                        w-full min-h-[44px] px-3 py-3
                        text-sidebar-foreground
                        hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                        group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2
                        transition-all duration-200 ease-in-out
                        focus-visible:ring-2 focus-visible:ring-chart-1 focus-visible:ring-offset-2
                        rounded-lg
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      <span className="flex-1 text-left text-sm font-medium group-data-[collapsible=icon]:sr-only truncate">
                        {item.name}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

// Keep the old Sidebar export for compatibility but mark it as deprecated
export { AppSidebar as Sidebar };