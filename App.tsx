import React from 'react';
import { AppSidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AiChat } from './components/AiChat';
import { AuthSystem } from './components/AuthSystem';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SidebarProvider, SidebarInset } from './components/ui/sidebar';
import { ViewRenderer } from './components/ViewRenderer';
import { Loading } from './components/Loading';
import { useAppNavigation } from './hooks/useAppNavigation';
import { Toaster } from './components/ui/sonner';
import { demoModeService } from './services/demoModeService';
import { ClientTablePreview } from './components/ClientTablePreview';
import { SelectPreview } from './components/SelectPreview';
import { CheckboxPreview } from './components/CheckboxPreview';

function DashboardApp() {
  const { loading, isAuthenticated, user } = useAuth();
  const [appState, handlers] = useAppNavigation();
  const [showPreview, setShowPreview] = React.useState(false);

  // Debug logging for app state (development only)
  React.useEffect(() => {
    // Import config safely for client-side usage
    import('./lib/config').then(({ CONFIG }) => {
      if (CONFIG.IS_DEVELOPMENT) {
        console.log('DashboardApp - App state changed:', {
          currentView: appState.currentView,
          isAuthenticated,
          userId: user?.id,
          handlersAvailable: !!handlers?.handleNavigate,
        });
      }
    }).catch(() => {
      // Silently ignore if config is not available
    });
  }, [appState.currentView, isAuthenticated, user?.id, handlers?.handleNavigate]);

  // Check URL for preview mode
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const previewTypes = ['client-table', 'select', 'checkbox'];
    if (previewTypes.includes(urlParams.get('preview') || '')) {
      setShowPreview(true);
    }
  }, []);

  // Show preview if requested
  if (showPreview) {
    const urlParams = new URLSearchParams(window.location.search);
    const previewType = urlParams.get('preview');
    
    return (
      <div className="min-h-[100dvh] bg-background">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
          >
            Exit Preview
          </button>
        </div>
        <main className="p-8 main-scroll">
          {previewType === 'client-table' && <ClientTablePreview />}
          {previewType === 'select' && <SelectPreview />}
          {previewType === 'checkbox' && <CheckboxPreview />}
        </main>
        <Toaster />
      </div>
    );
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-background">
        <Loading />
        <Toaster />
      </div>
    );
  }

  // Show authentication system if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[100dvh] bg-background">
        <AuthSystem />
        <Toaster />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-[100dvh] flex w-full bg-background">
        {/* Sidebar - Handles mobile/desktop automatically */}
        <AppSidebar currentView={appState.currentView} onNavigate={handlers.handleNavigate} />

        {/* Main Content Area */}
        <SidebarInset className="flex flex-col min-h-[100dvh] w-full">
          {/* Header - Fixed at top, responsive */}
          <header className="sticky top-0 z-40 h-14 sm:h-16 bg-white border-b border-border">
            <Header
              onNavigate={handlers.handleNavigate}
              currentView={appState.currentView}
              onLogout={handlers.handleLogout}
              isAiChatOpen={appState.isAiChatOpen}
              setIsAiChatOpen={handlers.setIsAiChatOpen}
            />
          </header>

          {/* Content Area - Enhanced scroll container with custom scrollbar */}
          <main className="flex-1 min-h-0 main-scroll bg-background">
            {/* Page Content Container - Ensures proper spacing and scroll behavior */}
            <div className="min-h-full">
              <ViewRenderer 
                currentView={appState.currentView}
                campaignData={appState.campaignData}
                emailData={appState.emailData}
                handlers={handlers}
              />

              {/* Mobile Footer - Only on small screens */}
              <div className="lg:hidden border-t border-border bg-white">
                <Footer
                  currentView={appState.currentView}
                  isAiChatOpen={appState.isAiChatOpen}
                  setIsAiChatOpen={handlers.setIsAiChatOpen}
                />
              </div>
            </div>
          </main>
        </SidebarInset>

        {/* AI Chat Component - Responsive positioning */}
        <AiChat
          isOpen={appState.isAiChatOpen}
          onClose={() => handlers.setIsAiChatOpen(false)}
          onNavigate={handlers.handleNavigate}
          data-testid="ai-chat"
        />
      </div>
      <Toaster />
    </SidebarProvider>
  );
}

export default function App() {
  // Initialize demo mode check once on app startup
  React.useEffect(() => {
    let mounted = true;

    // Auto-enable demo mode if needed (non-blocking)
    const initializeDemoMode = async () => {
      try {
        if (mounted) {
          demoModeService.autoEnableDemoModeIfNeeded();
        }
      } catch (error) {
        console.warn('Failed to initialize demo mode:', error);
      }
    };

    initializeDemoMode();

    return () => {
      mounted = false;
    };
  }, []);

  React.useEffect(() => {
    // Validate environment on app start
    try {
      // @ts-expect-error - Importing for validation side effects
      import('./lib/config');
    } catch (error) {
      console.error('Configuration validation failed:', error);
    }
  }, []);

  return (
    <AuthProvider>
      <DashboardApp />
    </AuthProvider>
  );
}