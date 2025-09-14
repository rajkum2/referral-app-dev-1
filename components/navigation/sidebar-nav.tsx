'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useNavigationStore } from '@/lib/store';
import { 
  Home, 
  Users, 
  Target, 
  Building, 
  ArrowRightLeft,
  DollarSign,
  BarChart3,
  Settings,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
  { id: 'students', label: 'Students', icon: Users, href: '/dashboard/students' },
  { id: 'matches', label: 'Matches', icon: Target, href: '/dashboard/matches' },
  { id: 'partners', label: 'Partners', icon: Building, href: '/dashboard/partners' },
  { id: 'referrals', label: 'Referrals', icon: ArrowRightLeft, href: '/dashboard/referrals' },
  { id: 'commissions', label: 'Commissions', icon: DollarSign, href: '/dashboard/commissions' },
  { id: 'reports', label: 'Reports', icon: BarChart3, href: '/dashboard/reports' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const { sidebarOpen } = useNavigationStore();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className={cn(
      "hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-background border-r border-border transition-all duration-300",
      sidebarOpen ? "w-64" : "w-16"
    )}>
      <div className="flex-1 pt-20 pb-4">
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const isItemActive = isActive(item.href);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                  "hover:bg-accent focus:bg-accent focus:outline-none min-h-[44px]",
                  isItemActive 
                    ? "bg-accent text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}