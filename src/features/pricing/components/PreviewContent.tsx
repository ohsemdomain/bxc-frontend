//src\features\pricing\components\PreviewContent.tsx
import { PricingTypes as PricingItem } from '../types.pricing';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PricingPreviewHeader } from '../components/PreviewHeader';
import { Badge } from '@/components/ui/badge';

interface PricingPreviewProps {
    item: PricingItem | null;
    onEdit: () => void;
    className?: string;
}

export const PricingPreview = ({
    item,
    onEdit,
    className = ""
}: PricingPreviewProps) => {
    return (
        <div className={className}>
            <PricingPreviewHeader
                onEdit={onEdit}
                onCopy={() => console.log('Copy clicked')}
                onShare={() => console.log('Share clicked')}
                onArchive={() => console.log('Archive clicked')}
            />
            <ScrollArea className="h-[calc(100vh-60px)] lg:h-[calc(100vh-175px)] overflow-y-auto">
                {item ? (
                    <div className="space-y-8 px-6 pt-8 pb-16 lg:pb-0">
                        {/* Basic Info Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-semibold">{item.title}</h2>
                                {item.isPopular && (
                                    <Badge variant="secondary">Popular</Badge>
                                )}
                            </div>
                            <div className="text-3xl font-bold">
                                ${item.amount.toFixed(2)}
                                <span className="text-sm font-normal text-muted-foreground">
                                    /{item.billingCycle.toLowerCase()}
                                </span>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Features</h3>
                            <div className="grid gap-2">
                                {item.features.map((feature, index) => (
                                    <div key={index} className="flex items-center justify-between py-2 border-b">
                                        <span>{feature.name}</span>
                                        <span className="text-muted-foreground">
                                            {feature.included ? (
                                                feature.customValue || feature.limit || '✓'
                                            ) : '✗'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Usage Limits Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Usage Limits</h3>
                            <div className="grid gap-2">
                                <div className="flex justify-between">
                                    <span>Max Users</span>
                                    <span>{item.limits.maxUsers.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Storage</span>
                                    <span>{item.limits.storageGB.toLocaleString()} GB</span>
                                </div>
                                {item.limits.apiCallsPerMonth && (
                                    <div className="flex justify-between">
                                        <span>API Calls</span>
                                        <span>{item.limits.apiCallsPerMonth.toLocaleString()}/month</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Concurrent Connections</span>
                                    <span>{item.limits.concurrentConnections}</span>
                                </div>
                            </div>
                        </div>

                        {/* Discounts Section */}
                        {item.discounts.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Volume Discounts</h3>
                                <div className="grid gap-2">
                                    {item.discounts.map((discount, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span>{discount.minQuantity}+ units</span>
                                            <span>{discount.percentage}% off</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Support Level */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Support Level</h3>
                            <div className="p-4 bg-secondary/50 rounded-lg">
                                {item.supportLevel}
                            </div>
                        </div>

                        {/* Metadata Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Additional Information</h3>
                            <div className="text-sm text-muted-foreground space-y-2">
                                <div>Version: {item.metadata.version}</div>
                                <div>Created: {item.metadata.createdAt.toLocaleDateString()}</div>
                                <div>Updated: {item.metadata.updatedAt.toLocaleDateString()}</div>
                                <div className="flex gap-2 flex-wrap">
                                    {item.metadata.tags.map((tag, index) => (
                                        <Badge key={index} variant="outline">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[calc(100vh-250px)] text-muted-foreground">
                        Select a pricing plan to view details
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};