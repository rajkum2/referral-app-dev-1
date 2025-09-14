'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Target, 
  Building, 
  ArrowRightLeft, 
  Menu 
} from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
  { id: 'students', label: 'Students', icon: Users, href: '/dashboard/students' },
  { id: 'matches', label: 'Matches', icon: Target, href: '/dashboard/matches' },
  { id: 'partners', label: 'Partners', icon: Building, href: '/dashboard/partners' },
  { id: 'referrals', label: 'Referrals', icon: ArrowRightLeft, href: '/dashboard/referrals' },
  { id: 'more', label: 'More', icon: Menu, href: '/dashboard/settings' },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t border-border">
      <div className="safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-1">
          {tabs.map((tab) => {
            const isTabActive = isActive(tab.href);
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center justify-center min-h-[44px] px-2 py-1 rounded-lg transition-colors",
                  "hover:bg-accent focus:bg-accent focus:outline-none",
                  isTabActive 
                    ? "text-primary bg-accent" 
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}