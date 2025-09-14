import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'list' | 'text';
}

export default function LoadingSkeleton({ className, variant = 'default' }: LoadingSkeletonProps) {
  const baseClass = "animate-pulse bg-muted rounded";
  
  switch (variant) {
    case 'card':
      return (
        <div className={cn("p-4 border rounded-lg space-y-3", className)}>
          <div className={cn(baseClass, "h-4 w-3/4")} />
          <div className={cn(baseClass, "h-3 w-1/2")} />
          <div className={cn(baseClass, "h-3 w-full")} />
        </div>
      );
    
    case 'list':
      return (
        <div className={cn("flex items-center space-x-3 p-3", className)}>
          <div className={cn(baseClass, "h-10 w-10 rounded-full")} />
          <div className="flex-1 space-y-2">
            <div className={cn(baseClass, "h-3 w-3/4")} />
            <div className={cn(baseClass, "h-2 w-1/2")} />
          </div>
        </div>
      );
    
    case 'text':
      return (
        <div className={cn("space-y-2", className)}>
          <div className={cn(baseClass, "h-3 w-full")} />
          <div className={cn(baseClass, "h-3 w-4/5")} />
          <div className={cn(baseClass, "h-3 w-3/5")} />
        </div>
      );
    
    default:
      return <div className={cn(baseClass, "h-4 w-full", className)} />;
  }
}