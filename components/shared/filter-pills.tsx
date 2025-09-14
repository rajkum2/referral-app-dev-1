'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterPill {
  id: string;
  label: string;
  value: string;
}

interface FilterPillsProps {
  filters: FilterPill[];
  onRemove: (id: string) => void;
  onClearAll?: () => void;
}

export default function FilterPills({ filters, onRemove, onClearAll }: FilterPillsProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap p-4 bg-muted/30 rounded-lg">
      {filters.map((filter) => (
        <Badge key={filter.id} variant="secondary" className="gap-1">
          <span className="text-xs">{filter.label}: {filter.value}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(filter.id)}
            className="h-4 w-4 p-0 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      {onClearAll && filters.length > 1 && (
        <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs">
          Clear all
        </Button>
      )}
    </div>
  );
}