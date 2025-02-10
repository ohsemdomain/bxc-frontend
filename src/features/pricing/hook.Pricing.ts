//src\features\pricing\hook.Pricing.ts
import { useState, useEffect } from 'react';
import { PricingTypes as PricingItem, BillingCycle, SupportLevel } from './types.pricing';
import { PricingStorageService } from './services.pricing';

export const usePricing = () => {
  const [items, setItems] = useState<PricingItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PricingItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await PricingStorageService.getItems();
        setItems(storedItems);
        if (storedItems.length > 0) {
          setSelectedItem(storedItems[0]);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load items');
        console.error('Failed to load items:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  const createItem = async (title: string, amount: number) => {
    try {
      const newItem: Omit<PricingItem, 'id'> = {
        title,
        amount,
        isPopular: false,
        billingCycle: BillingCycle.Monthly,
        supportLevel: SupportLevel.Basic,
        features: [
          {
            name: 'Basic Features',
            included: true,
            limit: 1
          }
        ],
        limits: {
          maxUsers: 1,
          storageGB: 1,
          concurrentConnections: 1
        },
        discounts: [],
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1,
          isPublic: true,
          tags: ['new']
        }
      };
      const createdItem = await PricingStorageService.addItem(newItem as PricingItem);
      setItems([...items, createdItem]);
      setSelectedItem(createdItem);
      return createdItem;
    } catch (err: any) {
      setError(err.message || 'Failed to create item');
      console.error('Failed to create item:', err);
      throw err;
    }
  };

  const updateItem = async (id: string, title: string, amount: number) => {
    try {
      const existingItem = items.find(item => item.id === id);
      if (!existingItem) {
        throw new Error('Item not found');
      }

      const updatedItem = {
        ...existingItem,
        title,
        amount,
        metadata: {
          ...existingItem.metadata,
          updatedAt: new Date(),
          version: existingItem.metadata.version + 1
        }
      };

      const result = await PricingStorageService.updateItem(id, updatedItem);
      setItems(items.map((item) => (item.id === id ? result : item)));

      if (selectedItem?.id === id) {
        setSelectedItem(result);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update item');
      console.error('Failed to update item:', err);
      throw err;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await PricingStorageService.deleteItem(id);
      setItems(items.filter(item => item.id !== id));
      if (selectedItem?.id === id) {
        setSelectedItem(items.length === 1 ? null : items[0]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete item');
      console.error('Failed to delete item:', err);
      throw err;
    }
  };

  return {
    items,
    selectedItem,
    isLoading,
    error,
    setSelectedItem,
    createItem,
    updateItem,
    deleteItem,
  };
};