import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { SidebarNav } from "./SidebarNav";
import { ScrollToTop } from "@/docs/components/ScrollToTop";
import { ThemeBuilderNav } from "@/docs/components/ThemeBuilderNav";
import { TokenMapModal } from "@/docs/components/TokenMapModal";
import { ThemeBuilderProvider } from "@/docs/context/ThemeBuilderContext";

/**
 * Check if there are unsaved theme overrides in localStorage
 */
function hasThemeOverrides(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem("wex-theme-overrides");
    if (!stored) return false;
    const parsed = JSON.parse(stored);
    return Object.keys(parsed.light || {}).length > 0 || Object.keys(parsed.dark || {}).length > 0;
  } catch {
    return false;
  }
}

/**
 * Main layout shell for docs site
 * - Header at top with theme toggle
 * - Fixed sidebar on left
 * - Scrollable main content area
 * - Theme Builder mode: replaces sidebar with ThemeBuilderNav
 */
export function DocsLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isThemeBuilder = location.pathname === "/theme-builder";
  
  // Token Map modal state
  const [tokenMapOpen, setTokenMapOpen] = React.useState(false);
  
  // Check for unsaved theme changes (for exit warning)
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  
  React.useEffect(() => {
    if (isThemeBuilder) {
      // Check periodically while in Theme Builder
      const checkChanges = () => setHasUnsavedChanges(hasThemeOverrides());
      checkChanges();
      const interval = setInterval(checkChanges, 500);
      return () => clearInterval(interval);
    }
  }, [isThemeBuilder]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ScrollToTop />
      
      {/* 
        Global Mesh Background - Only on Home Page
        Placed at the root to ensure it stays at the very bottom of the stack.
      */}
      {isHome && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Primary Blob - Subtle Blue */}
          <div className="animate-mesh absolute -left-[10%] -top-[10%] h-[1200px] w-[1200px] rounded-full bg-[#0052CC] opacity-[0.05] blur-[140px]" />
          {/* Accent Blob - Subtle Cyan */}
          <div className="animate-mesh-slow absolute -right-[15%] top-[5%] h-[1100px] w-[1100px] rounded-full bg-[#00B8D9] opacity-[0.04] blur-[160px]" />
          {/* Soft Middle Blob - Subtle Blue */}
          <div className="animate-mesh-delayed absolute left-[10%] top-[40%] h-[900px] w-[900px] rounded-full bg-[#0052CC] opacity-[0.03] blur-[140px]" />
        </div>
      )}

      <Header />
      
      {/* Sidebar - hidden on home page for full-bleed landing experience */}
      {/* Theme Builder gets wrapped in its own context provider */}
      {isThemeBuilder ? (
        <ThemeBuilderProvider lastVisitedPage={undefined}>
          <Sidebar>
            <ThemeBuilderNav 
              onOpenTokenMap={() => setTokenMapOpen(true)} 
              hasUnsavedChanges={hasUnsavedChanges}
            />
          </Sidebar>
          
          {/* Token Map Modal */}
          <TokenMapModal open={tokenMapOpen} onOpenChange={setTokenMapOpen} />
          
          <main className="relative z-10 min-h-[calc(100vh-3.5rem)] overflow-x-hidden ml-64 p-0">
            <div className="">
              <Outlet />
            </div>
          </main>
        </ThemeBuilderProvider>
      ) : (
        <>
          {/* Regular pages */}
          {!isHome && (
            <Sidebar>
              <SidebarNav />
            </Sidebar>
          )}
          
          <main 
            className={`relative z-10 min-h-[calc(100vh-3.5rem)] overflow-x-hidden ${
              isHome ? "ml-0 p-8" : "ml-64 p-8"
            }`}
          >
            <div className={isHome ? "mx-auto max-w-6xl" : "mx-auto max-w-4xl"}>
              <Outlet />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

