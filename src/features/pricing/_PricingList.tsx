//src\features\pricing\_PricingList.tsx
import React, { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PricingListHeader } from './components/ListHeader';
import { PricingItem } from './components/ListItem';
import { PricingTypes as PricingItemType } from './types.pricing';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePricing } from './hook.Pricing';
import { PricingPreview } from './components/PreviewContent';

export const PricingList = () => {
  const {
    items,
    selectedItem,
    isLoading,
    error,
    setSelectedItem,
    createItem,
    deleteItem,
    updateItem
  } = usePricing();

  const [showFade, setShowFade] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'createdDate' | 'modifiedDate' | 'status'>('createdDate');
  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setShowFade(scrollTop > 10);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Implement search logic if needed
    console.log('Search term:', term);
  };

  const handleSortChange = (newSortBy: 'createdDate' | 'modifiedDate' | 'status') => {
    setSortBy(newSortBy);
    // Implement sort logic if needed
    console.log('Sort by:', newSortBy);
  };

  const handleArchiveSelected = () => {
    // Implement archive logic if needed
    console.log('Archive selected');
  };

  const handleDateRangeSelect = () => {
    // Implement date range logic if needed
    console.log('Date range selected');
  };

  const handleCreate = () => {
    // Create a new pricing item with default values
    createItem('New Pricing', 0);
  };

  const handleEdit = () => {
    if (selectedItem) {
      // For now just log, you can implement edit modal/form later
      console.log('Edit item:', selectedItem);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex fixed top-16 inset-x-0 bottom-0">
        {/* Left Panel */}
        <div className="w-full lg:w-[40%] h-full">
          <Card className="p-2 sm:p-6 relative h-full border-none">
            <div className="flex flex-col h-full">
              <div className="mb-4 pt-6 px-4 relative z-10">
                <PricingListHeader
                  onSearch={handleSearch}
                  onCreate={handleCreate}
                  onArchiveSelected={handleArchiveSelected}
                  onSortChange={handleSortChange}
                  onDateRangeSelect={handleDateRangeSelect}
                />
              </div>

              <div className="flex-1 min-h-0 relative">
                <div
                  className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-10 transition-opacity duration-200`}
                  style={{ opacity: showFade ? 1 : 0 }}
                />

                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="h-[calc(100vh-225px)] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  <div className="space-y-2 px-4 pb-[38px] sm:pb-[64px]">
                    {items.map((item) => (
                      <PricingItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItem?.id === item.id}
                        onSelect={setSelectedItem}
                        onDelete={deleteItem}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Card className="p-4 backdrop-blur-sm bg-white/30 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {items.length} of {items.length} item(s)
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" aria-label="Previous Page">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Next Page">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>

        {/* Right Panel - Only visible on large screens */}
        <div className="hidden lg:block w-[60%] pr-6 py-6 h-full">
          <Card className="relative h-full rounded-md bg-white/30 backdrop-blur-[1px]">
            <PricingPreview
              item={selectedItem}
              onEdit={handleEdit}
              className="h-full"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};