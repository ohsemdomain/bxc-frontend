//src\features\pricing\components\ListHeader.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, ArrowUpDown, Plus, Calendar } from 'lucide-react';

interface PricingListHeaderProps { // Interface name
    onSearch: (searchTerm: string) => void;
    onCreate: () => void;
    onArchiveSelected: () => void;
    onSortChange: (sortBy: 'createdDate' | 'modifiedDate' | 'status') => void;
    onDateRangeSelect: () => void;
}

export const PricingListHeader: React.FC<PricingListHeaderProps> = ({ // Component name
    onSearch,
    onCreate,
    onArchiveSelected,
    onSortChange,
    onDateRangeSelect
}) => {
    return (
        <div className="space-y-4">
            {/* Search and Create Section */}
            <div className="flex gap-2">
                <div className="flex-1">
                    <Input
                        placeholder="Search pricings..."
                        className="w-full"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                <Button
                    onClick={onCreate}
                    className="sm:min-w-[12rem] px-6"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New
                </Button>
            </div>

            {/* Filters Section */}
            <div className="flex gap-2">
                {/* Actions Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-10 w-10 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[180px] bg-white">
                        <DropdownMenuItem onClick={onArchiveSelected}>
                            Archive Selected
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-10 w-10 p-0">
                            <ArrowUpDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[180px]">
                        <DropdownMenuItem disabled className="font-semibold border-b">
                            Sort by
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSortChange('createdDate')}>
                            Created Date
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSortChange('modifiedDate')}>
                            Modified Date
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSortChange('status')}>
                            Status
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Date Range Selector */}
                <div className="flex-1">
                    <Button
                        variant="outline"
                        className="w-full flex items-center gap-2 text-gray-500 justify-start px-4"
                        onClick={onDateRangeSelect}
                    >
                        <Calendar className="h-4 w-4" />
                        Pick a dates range
                    </Button>
                </div>
            </div>
        </div>
    );
};