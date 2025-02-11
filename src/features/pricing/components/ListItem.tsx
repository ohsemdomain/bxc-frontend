//src\features\pricing\components\ListItem.tsx
import { Trash2 } from 'lucide-react';
import { PricingTypes } from '../types.pricing';

interface PricingItemProps {
    item: PricingTypes;
    isSelected: boolean;
    onSelect: (item: PricingTypes) => void;
    onDelete: (id: string) => void;
}

export const PricingItem = ({
    item,
    isSelected,
    onSelect,
    onDelete
}: PricingItemProps) => (
    <div
        onClick={() => onSelect(item)}
        className={`
      p-3 rounded-md border cursor-pointer transition-all duration-200 
      hover:bg-primary/5
      ${isSelected ? 'border-primary/50 bg-primary/5' : 'border-line-1 bg-white'}      
    `}
    >
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.title}</span>
                <span className="text-sm text-muted-foreground">${item.amount}</span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                    }}
                    className="p-2 hover:bg-destructive/10 rounded-md transition-colors group"
                >
                    <Trash2
                        className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors"
                        strokeWidth={1.5}
                    />
                </button>
            </div>
        </div>
    </div>
);