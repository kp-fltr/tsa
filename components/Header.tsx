import { Search, Bell, ChevronDown, User, LogOut } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import TsaSymbol from "../imports/TsaSymbol";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { shouldUseDemoMode } from "../services/demoModeService";

interface HeaderProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
  onLogout?: () => void;
  isAiChatOpen?: boolean;
  setIsAiChatOpen?: (isOpen: boolean) => void;
}

export function Header({ onNavigate, currentView, onLogout, isAiChatOpen, setIsAiChatOpen }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();
  const isDemoMode = shouldUseDemoMode();
  
  // Check if we're in the campaign flow to hide AI button
  const isInCampaignFlow = currentView === 'campaign-distribution' || 
                          currentView === 'prepare-email' || 
                          currentView === 'review-deploy';

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Get user display name
  const displayName = user?.user_metadata?.name || 'User';

  return (
    <>
    {/* Responsive header with proper height and spacing */}
    <div className="bg-white/50 backdrop-blur-md h-16 sm:h-[72px] border-b border-border px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-[rgba(255,255,255,0.15)]">
      {/* Left section with sidebar trigger */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-[300px] sm:max-w-[540px]">
        <SidebarTrigger className="-ml-1" />
        
        {/* Search - Always visible */}
        <div className="relative flex-1">
          <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full h-9 sm:h-10 pl-11 pr-4 border-2 border-border rounded-md placeholder-muted-foreground bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
        </div>
      </div>

      {/* Demo mode indicator */}
      {isDemoMode && (
        <div className="hidden sm:flex items-center px-2 py-0.5 bg-muted border border-border rounded-full">
          <span className="text-xs text-muted-foreground font-regular">DEMO MODE</span>
        </div>
      )}

      {/* User section - Responsive layout */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Desktop AI button - Hidden on mobile and during campaign flow */}
        {!isMobile && !isInCampaignFlow && setIsAiChatOpen && (
          <button 
            onClick={() => setIsAiChatOpen(true)}
            className="bg-chart-1/20 backdrop-blur-sm border-2 border-chart-1 hover:bg-chart-1/30 text-chart-1 px-3 sm:px-4 py-2 rounded-[99px] flex items-center gap-2 transition-all min-h-[44px] touch-manipulation"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6">
              <TsaSymbol />
            </div>
            <span className="text-sm sm:text-base hidden lg:inline">Ask AI</span>
          </button>
        )}
        
        {/* Notification button */}
        <button className="p-2 hover:bg-muted rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
          <Bell className="w-4 h-4 text-foreground" />
        </button>
        
        {/* User profile dropdown - Responsive display */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 sm:gap-3 hover:bg-muted/50 p-1 rounded-lg transition-colors">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted bg-cover bg-center shrink-0" 
                   style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face')" }}>
              </div>
              
              {/* Name and chevron - Hidden on small screens */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-foreground text-sm lg:text-base">{displayName}</span>
                <ChevronDown className="w-4 h-4 text-foreground" />
              </div>
              
              {/* Mobile-only chevron */}
              <ChevronDown className="w-4 h-4 text-foreground sm:hidden" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    </>
  );
}