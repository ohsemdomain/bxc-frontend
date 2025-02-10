// src\features\pricing\types.pricing.ts

// Enum for billing cycle options
export enum BillingCycle {
    Monthly = 'monthly',
    Quarterly = 'quarterly',
    Yearly = 'yearly',
    Custom = 'custom'
}

// Enum for support levels
export enum SupportLevel {
    Basic = 'basic',
    Priority = 'priority',
    Premium = 'premium',
    Enterprise = 'enterprise'
}

// Interface for feature details
export interface FeatureDetail {
    name: string;
    included: boolean;
    limit?: number;
    customValue?: string | number;
}

// Interface for usage limits
export interface UsageLimits {
    maxUsers: number;
    storageGB: number;
    apiCallsPerMonth?: number;
    concurrentConnections: number;
}

// Interface for discount structure
export interface DiscountTier {
    minQuantity: number;
    percentage: number;
    validUntil?: Date;
}

// Main pricing interface
export interface PricingTypes {
    id: string;
    title: string;
    amount: number;
    isPopular: boolean;
    billingCycle: BillingCycle;
    supportLevel: SupportLevel;
    features: FeatureDetail[];
    limits: UsageLimits;
    discounts: DiscountTier[];
    metadata: {
        createdAt: Date;
        updatedAt: Date;
        version: number;
        isPublic: boolean;
        tags: string[];
    };
    customFields?: Record<string, unknown>;
}