import FloatButton from "../imports/FloatButton";
import { useState, useEffect } from "react";

interface FooterProps {
  currentView: string;
  isAiChatOpen?: boolean;
  setIsAiChatOpen?: (open: boolean) => void;
}

export function Footer({ currentView, isAiChatOpen, setIsAiChatOpen }: FooterProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if we're in campaign flow
  const isInCampaignFlow = currentView === 'campaign-distribution';

  // Only show footer on mobile and when not in campaign flow
  if (!isMobile || isInCampaignFlow) {
    return null;
  }

  return (
    <div className="bg-white/50 backdrop-blur-md h-16 px-4 flex items-center justify-center bg-[rgba(255,255,255,0.15)]">
      {/* Float Button */}
      <div 
        className="w-14 h-14 cursor-pointer"
        onClick={() => setIsAiChatOpen && setIsAiChatOpen(true)}
      >
        <FloatButton />
      </div>
    </div>
  );
}