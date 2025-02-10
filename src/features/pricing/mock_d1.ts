//src\features\pricing\mock_d1.ts
import { PricingTypes, BillingCycle, SupportLevel } from './types.pricing';

// Mock initial data
const initialPricings: PricingTypes[] = [
  {
    id: '1',
    title: 'Basic Plan',
    amount: 9.99,
    isPopular: false,
    billingCycle: BillingCycle.Monthly,
    supportLevel: SupportLevel.Basic,
    features: [
      {
        name: 'Storage',
        included: true,
        limit: 10,
        customValue: '10GB'
      },
      {
        name: 'Users',
        included: true,
        limit: 5
      },
      {
        name: 'API Access',
        included: false
      }
    ],
    limits: {
      maxUsers: 5,
      storageGB: 10,
      concurrentConnections: 3
    },
    discounts: [
      {
        minQuantity: 10,
        percentage: 10,
        validUntil: new Date('2024-12-31')
      }
    ],
    metadata: {
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      version: 1,
      isPublic: true,
      tags: ['starter', 'basic']
    }
  },
  {
    id: '2',
    title: 'Pro Plan',
    amount: 19.99,
    isPopular: true,
    billingCycle: BillingCycle.Monthly,
    supportLevel: SupportLevel.Priority,
    features: [
      {
        name: 'Storage',
        included: true,
        limit: 50,
        customValue: '50GB'
      },
      {
        name: 'Users',
        included: true,
        limit: 10
      },
      {
        name: 'API Access',
        included: true,
        limit: 1000
      }
    ],
    limits: {
      maxUsers: 10,
      storageGB: 50,
      apiCallsPerMonth: 1000,
      concurrentConnections: 10
    },
    discounts: [
      {
        minQuantity: 5,
        percentage: 15,
        validUntil: new Date('2024-12-31')
      }
    ],
    metadata: {
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      version: 1,
      isPublic: true,
      tags: ['professional', 'popular']
    }
  },
  {
    id: '3',
    title: 'Enterprise Plan',
    amount: 49.99,
    isPopular: false,
    billingCycle: BillingCycle.Yearly,
    supportLevel: SupportLevel.Enterprise,
    features: [
      {
        name: 'Storage',
        included: true,
        customValue: 'Unlimited'
      },
      {
        name: 'Users',
        included: true,
        customValue: 'Unlimited'
      },
      {
        name: 'API Access',
        included: true,
        customValue: 'Unlimited'
      },
      {
        name: 'Custom Integration',
        included: true
      }
    ],
    limits: {
      maxUsers: 999999,
      storageGB: 999999,
      apiCallsPerMonth: 999999,
      concurrentConnections: 100
    },
    discounts: [
      {
        minQuantity: 20,
        percentage: 25,
        validUntil: new Date('2024-12-31')
      }
    ],
    metadata: {
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      version: 1,
      isPublic: true,
      tags: ['enterprise', 'unlimited']
    }
  },
  {
    id: '4',
    title: 'Startup Plan',
    amount: 14.99,
    isPopular: false,
    billingCycle: BillingCycle.Monthly,
    supportLevel: SupportLevel.Standard,
    features: [
      {
        name: 'Storage',
        included: true,
        limit: 25,
        customValue: '25GB'
      },
      {
        name: 'Users',
        included: true,
        limit: 7
      },
      {
        name: 'API Access',
        included: true,
        limit: 500
      }
    ],
    limits: {
      maxUsers: 7,
      storageGB: 25,
      apiCallsPerMonth: 500,
      concurrentConnections: 5
    },
    discounts: [],
    metadata: {
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
      version: 1,
      isPublic: true,
      tags: ['startup', 'standard']
    }
  },
  {
    id: '5',
    title: 'Team Plan',
    amount: 29.99,
    isPopular: true,
    billingCycle: BillingCycle.Monthly,
    supportLevel: SupportLevel.Priority,
    features: [
      {
        name: 'Storage',
        included: true,
        limit: 100,
        customValue: '100GB'
      },
      {
        name: 'Users',
        included: true,
        limit: 20
      },
      {
        name: 'API Access',
        included: true,
        limit: 2000
      },
      {
        name: 'Reporting',
        included: true
      }
    ],
    limits: {
      maxUsers: 20,
      storageGB: 100,
      apiCallsPerMonth: 2000,
      concurrentConnections: 20
    },
    discounts: [
      {
        minQuantity: 10,
        percentage: 12.5,
        validUntil: new Date('2024-12-31')
      }
    ],
    metadata: {
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
      version: 1,
      isPublic: true,
      tags: ['team', 'collaboration']
    }
  },
  {
    id: '6',
    title: 'Agency Plan',
    amount: 79.99,
    isPopular: false,
    billingCycle: BillingCycle.Monthly,
    supportLevel: SupportLevel.Enterprise,
    features: [
      {
        name: 'Storage',
        included: true,
        limit: 250,
        customValue: '250GB'
      },
      {
        name: 'Users',
        included: true,
        limit: 50
      },
      {
        name: 'API Access',
        included: true,
        limit: 5000
      },
      {
        name: 'White Labeling',
        included: true
      },
      {
        name: 'Priority Support',
        included: true
      }
    ],
    limits: {
      maxUsers: 50,
      storageGB: 250,
      apiCallsPerMonth: 5000,
      concurrentConnections: 50
    },
    discounts: [
      {
        minQuantity: 5,
        percentage: 5,
        validUntil: new Date('2024-12-31')
      }
    ],
    metadata: {
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      version: 1,
      isPublic: true,
      tags: ['agency', 'reseller']
    }
  },
  {
    id: '7',
    title: 'Free Trial',
    amount: 0.00,
    isPopular: false,
    billingCycle: BillingCycle.Monthly,
    supportLevel: SupportLevel.Basic,
    features: [
      {
        name: 'Storage',
        included: true,
        limit: 5,
        customValue: '5GB'
      },
      {
        name: 'Users',
        included: true,
        limit: 2
      },
      {
        name: 'API Access',
        included: false
      }
    ],
    limits: {
      maxUsers: 2,
      storageGB: 5,
      concurrentConnections: 1
    },
    discounts: [],
    metadata: {
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      version: 1,
      isPublic: true,
      tags: ['free', 'trial']
    }
  },
  {
    id: '8',
    title: 'Premium Plan',
    amount: 39.99,
    isPopular: true,
    billingCycle: BillingCycle.Monthly,
    supportLevel: SupportLevel.Priority,
    features: [
      {
        name: 'Storage',
        included: true,
        limit: 150,
        customValue: '150GB'
      },
      {
        name: 'Users',
        included: true,
        limit: 30
      },
      {
        name: 'API Access',
        included: true,
        limit: 3000
      },
      {
        name: 'Advanced Analytics',
        included: true
      }
    ],
    limits: {
      maxUsers: 30,
      storageGB: 150,
      apiCallsPerMonth: 3000,
      concurrentConnections: 30
    },
    discounts: [
      {
        minQuantity: 8,
        percentage: 10,
        validUntil: new Date('2024-12-31')
      }
    ],
    metadata: {
      createdAt: new Date('2024-02-05'),
      updatedAt: new Date('2024-02-05'),
      version: 1,
      isPublic: true,
      tags: ['premium', 'advanced']
    }
  },
  {
    id: '9',
    title: 'Ultimate Plan',
    amount: 99.99,
    isPopular: false,
    billingCycle: BillingCycle.Yearly,
    supportLevel: SupportLevel.Enterprise,
    features: [
      {
        name: 'Storage',
        included: true,
        customValue: 'Unlimited'
      },
      {
        name: 'Users',
        included: true,
        customValue: 'Unlimited'
      },
      {
        name: 'API Access',
        included: true,
        customValue: 'Unlimited'
      },
      {
        name: 'Dedicated Support',
        included: true
      },
      {
        name: 'Custom Branding',
        included: true
      }
    ],
    limits: {
      maxUsers: 999999,
      storageGB: 999999,
      apiCallsPerMonth: 999999,
      concurrentConnections: 200
    },
    discounts: [
      {
        minQuantity: 15,
        percentage: 20,
        validUntil: new Date('2024-12-31')
      }
    ],
    metadata: {
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10'),
      version: 1,
      isPublic: true,
      tags: ['ultimate', 'custom']
    }
  },
  {
    id: '10',
    title: 'Developer Plan',
    amount: 24.99,
    isPopular: false,
    billingCycle: BillingCycle.Monthly,
    supportLevel: SupportLevel.Standard,
    features: [
      {
        name: 'Storage',
        included: true,
        limit: 30,
        customValue: '30GB'
      },
      {
        name: 'Users',
        included: true,
        limit: 3
      },
      {
        name: 'API Access',
        included: true,
        limit: 5000
      },
      {
        name: 'CLI Tools',
        included: true
      }
    ],
    limits: {
      maxUsers: 3,
      storageGB: 30,
      apiCallsPerMonth: 5000,
      concurrentConnections: 5
    },
    discounts: [],
    metadata: {
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15'),
      version: 1,
      isPublic: true,
      tags: ['developer', 'api']
    }
  },
  {
    id: '11',
    title: 'Community Plan',
    amount: 7.99,
    isPopular: false,
    billingCycle: BillingCycle.Monthly,
    supportLevel: SupportLevel.Basic,
    features: [
      {
        name: 'Storage',
        included: true,
        limit: 8,
        customValue: '8GB'
      },
      {
        name: 'Users',
        included: true,
        limit: 3
      },
      {
        name: 'API Access',
        included: false
      },
      {
        name: 'Forum Access',
        included: true
      }
    ],
    limits: {
      maxUsers: 3,
      storageGB: 8,
      concurrentConnections: 2
    },
    discounts: [],
    metadata: {
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-01'),
      version: 1,
      isPublic: true,
      tags: ['community', 'social']
    }
  },
  {
    id: '12',
    title: 'Education Plan',
    amount: 12.99,
    isPopular: false,
    billingCycle: BillingCycle.Monthly,
    supportLevel: SupportLevel.Standard,
    features: [
      {
        name: 'Storage',
        included: true,
        limit: 20,
        customValue: '20GB'
      },
      {
        name: 'Users',
        included: true,
        limit: 15
      },
      {
        name: 'API Access',
        included: true,
        limit: 200
      },
      {
        name: 'Tutorials',
        included: true
      }
    ],
    limits: {
      maxUsers: 15,
      storageGB: 20,
      apiCallsPerMonth: 200,
      concurrentConnections: 8
    },
    discounts: [
      {
        minQuantity: 20,
        percentage: 5,
        validUntil: new Date('2024-12-31')
      }
    ],
    metadata: {
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date('2024-03-05'),
      version: 1,
      isPublic: true,
      tags: ['education', 'academic']
    }
  },
  {
    id: '13',
    title: 'Business Plan',
    amount: 59.99,
    isPopular: true,
    billingCycle: BillingCycle.Monthly,
    supportLevel: SupportLevel.Priority,
    features: [
      {
        name: 'Storage',
        included: true,
        limit: 200,
        customValue: '200GB'
      },
      {
        name: 'Users',
        included: true,
        limit: 40
      },
      {
        name: 'API Access',
        included: true,
        limit: 4000
      },
      {
        name: 'CRM Integration',
        included: true
      }
    ],
    limits: {
      maxUsers: 40,
      storageGB: 200,
      apiCallsPerMonth: 4000,
      concurrentConnections: 40
    },
    discounts: [
      {
        minQuantity: 12,
        percentage: 7.5,
        validUntil: new Date('2024-12-31')
      }
    ],
    metadata: {
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10'),
      version: 1,
      isPublic: true,
      tags: ['business', 'corporate']
    }
  }
];

// In-memory storage
let pricingTable = [...initialPricings];

// Mock D1 Database interface
export const mockD1 = {
  // Select all records
  async prepare(query: string) {
    return {
      all: async () => {
        if (query.toLowerCase().includes('select * from pricing')) {
          return pricingTable;
        }
        throw new Error('Query not supported');
      }
    };
  },

  // Insert a new record
  async exec(query: string, values: any[]) {
    if (query.toLowerCase().includes('insert into pricing')) {
      const [id, title, amount] = values;
      const newPricing: PricingTypes = {
        id,
        title,
        amount,
        isPopular: false,
        billingCycle: BillingCycle.Monthly,
        supportLevel: SupportLevel.Basic,
        features: [],
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
          tags: []
        }
      };
      pricingTable.push(newPricing);
      return { success: true };
    }
    throw new Error('Query not supported');
  },

  // Update a record
  async run(query: string, values: any[]) {
    if (query.toLowerCase().includes('update pricing')) {
      const [title, amount, id] = values;
      const index = pricingTable.findIndex(p => p.id === id);
      if (index !== -1) {
        pricingTable[index] = {
          ...pricingTable[index],
          title,
          amount,
          metadata: {
            ...pricingTable[index].metadata,
            updatedAt: new Date()
          }
        };
        return { success: true };
      }
      throw new Error('Record not found');
    }
    throw new Error('Query not supported');
  },

  // Delete a record
  async delete(query: string, values: any[]) {
    if (query.toLowerCase().includes('delete from pricing')) {
      const [id] = values;
      const initialLength = pricingTable.length;
      pricingTable = pricingTable.filter(p => p.id !== id);
      if (pricingTable.length === initialLength) {
        throw new Error('Record not found');
      }
      return { success: true };
    }
    throw new Error('Query not supported');
  }
};

// Helper to reset the database to initial state (useful for testing)
export const resetDatabase = () => {
  pricingTable = [...initialPricings];
};