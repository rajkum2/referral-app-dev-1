import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StageBadgeProps {
  stage: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

const stageColors = {
  'new': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  'contacted': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  'qualified': 'bg-green-100 text-green-800 hover:bg-green-200',
  'proposal': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  'closed': 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  'lost': 'bg-red-100 text-red-800 hover:bg-red-200',
};

export default function StageBadge({ stage, variant = 'default', className }: StageBadgeProps) {
  const stageKey = stage.toLowerCase() as keyof typeof stageColors;
  const colorClass = stageColors[stageKey] || stageColors['new'];

  return (
    <Badge 
      variant={variant} 
      className={cn(
        variant === 'default' && colorClass,
        "capitalize",
        className
      )}
    >
      {stage}
    </Badge>
  );
}