//src\features\pricing\services.pricing.ts
import { PricingTypes } from './types.pricing';
import { v4 as uuidv4 } from 'uuid';
import { mockD1 } from './mock_d1';

// Simulate network delay (in milliseconds)
const MOCK_API_DELAY = 500;

// Helper function to simulate an API call with a delay
const mockApiCall = <T>(result: T): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(result);
        }, MOCK_API_DELAY);
    });
};

export const PricingStorageService = {
    getItems: async (): Promise<PricingTypes[]> => {
        const result = await mockD1.prepare('SELECT * FROM pricing');
        const items = await result.all();
        return mockApiCall(items);
    },

    getItem: async (id: string): Promise<PricingTypes | undefined> => {
        const result = await mockD1.prepare('SELECT * FROM pricing');
        const items = await result.all();
        const item = items.find(item => item.id === id);
        return mockApiCall(item);
    },

    updateItem: async (id: string, updatedItem: PricingTypes): Promise<PricingTypes> => {
        await mockD1.run(
            'UPDATE pricing SET title = ?, amount = ? WHERE id = ?',
            [updatedItem.title, updatedItem.amount, id]
        );
        return mockApiCall(updatedItem);
    },

    deleteItem: async (id: string): Promise<void> => {
        await mockD1.delete('DELETE FROM pricing WHERE id = ?', [id]);
        return mockApiCall(undefined);
    },

    addItem: async (item: Omit<PricingTypes, 'id'>): Promise<PricingTypes> => {
        const id = uuidv4();
        const newItem: PricingTypes = { ...item, id };
        
        await mockD1.exec(
            'INSERT INTO pricing (id, title, amount) VALUES (?, ?, ?)',
            [id, item.title, item.amount]
        );
        
        return mockApiCall(newItem);
    },
};