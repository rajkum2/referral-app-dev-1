'use client';

import { Button } from '@/components/ui/button';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useNavigationStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function TopAppBar() {
  const { toggleSidebar } = useNavigationStore();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="hidden lg:flex items-center justify-between px-6 py-4 bg-background border-b border-border">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar}
          className="p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">R</span>
          </div>
          <h1 className="text-xl font-semibold">ReferLoop</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleTheme}
          className="p-2"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
          <span className="text-sm font-medium">U</span>
        </div>
      </div>
    </header>
  );
}