'use client';

import { useNavigationStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import TopAppBar from '@/components/navigation/top-app-bar';
import SidebarNav from '@/components/navigation/sidebar-nav';
import BottomTabBar from '@/components/navigation/bottom-tab-bar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen } = useNavigationStore();

  return (
    <div className="min-h-screen bg-background">
      <TopAppBar />
      <SidebarNav />
      
      <main className={cn(
        "transition-all duration-300 pb-20 lg:pb-0",
        "lg:pt-20", // Account for top app bar
        sidebarOpen ? "lg:ml-64" : "lg:ml-16" // Account for sidebar
      )}>
        <div className="container mx-auto p-4 lg:p-6">
          {children}
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}