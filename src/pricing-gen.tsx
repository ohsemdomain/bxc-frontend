//src\pricing-gen.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, MinusCircle, PenSquare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const CurrencyInput = ({ label, value, onChange, disabled, onModeChange, modeType }) => (
    <div className="flex-1">
        <Label className="block text-xs font-semibold mb-1">{label}</Label>
        <div className="relative">
            <Input
                type="text"
                className={`
                    w-full h-10 px-3 rounded-sm border border-slate-200
                    ${!disabled
                        ? "bg-white hover:border-primary/50 active:bg-primary/5 focus:bg-primary/5 active:border-primary/50 focus:border-primary/50"
                        : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-200 cursor-not-allowed"
                    }
                  `}
                value={value}
                onChange={onChange}
                placeholder="RM 0.00"
                disabled={disabled}
            />
            {disabled && (
                <button
                    type="button"
                    onClick={() => onModeChange(modeType)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-300 hover:text-gray-500 transition-colors"
                >
                    <PenSquare className="h-4 w-4" />
                </button>
            )}
        </div>
    </div>
);

const PricingGeneratorForm = () => {
    const [timelines, setTimelines] = useState([{ id: 1, workingDays: '', quantities: [{ qty: '', pricePerUnit: 'RM 0.00', total: 'RM 0.00' }] }]);
    const [editMode, setEditMode] = useState(null);
    const [dieType, setDieType] = useState('');
    const [material, setMaterial] = useState('');
    const [lamination, setLamination] = useState('');
    const [printColor, setPrintColor] = useState('');
    const [printSide, setPrintSide] = useState('');
    const [gluing, setGluing] = useState('');
    const [addOns, setAddOns] = useState([{ id: Date.now(), label: 'Block Die Cost', cost: '' }]);


    // Add a new timeline
    const handleAddTimeline = () => {
        setTimelines([...timelines, { id: Date.now(), workingDays: '', quantities: [{ qty: '', pricePerUnit: 'RM 0.00', total: 'RM 0.00' }] }]);
    };

    // Remove a timeline
    const handleRemoveTimeline = (id) => {
        setTimelines(timelines.filter((timeline) => timeline.id !== id));
    };

    // Add a new quantity to a timeline
    const handleAddQuantity = (timelineId) => {
        const updatedTimelines = timelines.map((timeline) =>
            timeline.id === timelineId
                ? { ...timeline, quantities: [...timeline.quantities, { qty: '', pricePerUnit: 'RM 0.00', total: 'RM 0.00' }] }
                : timeline
        );
        setTimelines(updatedTimelines);
    };

    // Remove a quantity from a timeline
    const handleRemoveQuantity = (timelineId, index) => {
        const updatedTimelines = timelines.map((timeline) =>
            timeline.id === timelineId
                ? { ...timeline, quantities: timeline.quantities.filter((_, i) => i !== index) }
                : timeline
        );
        setTimelines(updatedTimelines);
    };

    // Update quantity or price fields
    const handleInputChange = (timelineId, index, field, value) => {
        const updatedTimelines = timelines.map((timeline) =>
            timeline.id === timelineId
                ? {
                    ...timeline,
                    quantities: timeline.quantities.map((quantity, i) =>
                        i === index ? { ...quantity, [field]: value } : quantity
                    ),
                }
                : timeline
        );
        setTimelines(updatedTimelines);
    };

    // Toggle edit mode for pricePerUnit or total
    const toggleEditMode = (modeType) => {
        setEditMode(modeType === editMode ? null : modeType);
    };

    // Add a new add-on
    const handleAddAddOn = () => {
        setAddOns([...addOns, { id: Date.now(), label: '', cost: '' }]);
    };

    // Remove an add-on
    const handleRemoveAddOn = (id) => {
        setAddOns(addOns.filter((addOn) => addOn.id !== id));
    };

    // Update add-on fields
    const handleAddOnInputChange = (id, field, value) => {
        const updatedAddOns = addOns.map((addOn) =>
            addOn.id === id ? { ...addOn, [field]: value } : addOn
        );
        setAddOns(updatedAddOns);
    };


    return (




        <div className="container mx-auto px-4 py-8">
            <div className="flex fixed top-16 inset-x-0 bottom-0">

                {/* LEFT PANEL (FORM) */}
                <div className="w-full lg:w-[70%] h-full">
                    <Card className="p-2 sm:p-6 relative h-full border-none">

                        <div className="overflow-auto h-full">
                            <div className="space-y-6">

                                <Card className="sticky top-0 z-40 p-4 rounded-md bg-white/70 backdrop-blur-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-col items-center">
                                            <h1 className="font-bold">Pricing Form</h1>
                                            <p className="text-destructive">Please double check all details before give the pricing to the customer.</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Button className="w-full min-w-48">
                                                <PlusCircle className="h-4 w-4" />
                                                Generate Pricing
                                            </Button>
                                        </div>
                                    </div>
                                </Card>

                                {/* Details Section */}
                                <Card className="rounded-md bg-white/30 backdrop-blur-[1px] overflow-hidden">
                                    <div className="flex items-center mb-4 py-4 px-6 bg-slate-50 border-b border-line-1">
                                        <h3 className="font-bold">Specifications</h3>
                                    </div>
                                    <div className="space-y-2 px-6">
                                        <Label className="text-sm font-medium text-gray-600">Dimension Size (MM)</Label>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                placeholder="Length (mm)"
                                            />
                                            <span className="text-slate-400 text-xl">×</span>
                                            <Input
                                                type="number"
                                                placeholder="Width (mm)"
                                            />
                                            <span className="text-slate-400 text-xl">×</span>
                                            <Input
                                                type="number"
                                                placeholder="Height (mm)"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4 pb-6 px-6">
                                        <div className="space-y-1">
                                            <Label className="text-sm font-medium text-gray-600">Die Type</Label>
                                            <Select onValueChange={setDieType} value={dieType}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select die type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Tuck End Lock">Tuck End Lock</SelectItem>
                                                    {/* Add other die type options here */}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-sm font-medium text-gray-600">Material</Label>
                                            <Select onValueChange={setMaterial} value={material}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select material" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="250gsm Art Card">250gsm Art Card</SelectItem>
                                                    <SelectItem value="300gsm Art Card">300gsm Art Card</SelectItem>
                                                    <SelectItem value="350gsm Art Card">350gsm Art Card</SelectItem>
                                                    <SelectItem value="400gsm Art Card">400gsm Art Card</SelectItem>
                                                    {/* Add other material options here */}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-sm font-medium text-gray-600">Lamination</Label>
                                            <Select onValueChange={setLamination} value={lamination}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select lamination" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Matte film">Matte film</SelectItem>
                                                    {/* Add other lamination options here */}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-sm font-medium text-gray-600">Print Color</Label>
                                            <Select onValueChange={setPrintColor} value={printColor}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select print color" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="4C Full Color">4C Full Color</SelectItem>
                                                    {/* Add other print color options here */}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-sm font-medium text-gray-600">Print Side</Label>
                                            <Select onValueChange={setPrintSide} value={printSide}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select print side" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1 side outer">1 side outer</SelectItem>
                                                    {/* Add other print side options here */}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-sm font-medium text-gray-600">Gluing</Label>
                                            <Select onValueChange={setGluing} value={gluing}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select gluing" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1 part">1 part</SelectItem>
                                                    {/* Add other gluing options here */}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </Card>

                                {/* Timeline Section */}
                                <Card className="mt-10 rounded-md bg-white/30 backdrop-blur-[1px] overflow-hidden">
                                    <div className="flex items-center mb-4 py-4 px-6 bg-slate-50 border-b border-line-1">
                                        <h3 className="font-bold">Timeline Pricing</h3>
                                    </div>
                                    <div className="px-6 pb-6">
                                        {timelines.map((timeline, timelineIndex) => (
                                            <Card key={timeline.id} className="border border-gray-200 rounded-md overflow-hidden mb-4">
                                                <div className="py-2 px-4 border-b border-line-1 flex justify-between items-center bg-slate-50/50">
                                                    <h3 className="text-sm font-semibold text-gray-700">Timeline {timelineIndex + 1}</h3>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => handleRemoveTimeline(timeline.id)}
                                                    >
                                                        <MinusCircle className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="p-4 space-y-4">
                                                    <div className="space-y-1">
                                                        <Label className="font-semibold">Working Days</Label>
                                                        <Input
                                                            type="number"
                                                            className=""
                                                            placeholder="Enter working days"
                                                            value={timeline.workingDays}
                                                            onChange={(e) => handleInputChange(timeline.id, null, 'workingDays', e.target.value)}
                                                        />
                                                    </div>
                                                    {timeline.quantities.map((quantity, index) => (
                                                        <div key={index} className="flex gap-3 items-end">
                                                            <div className="w-32 space-y-1">
                                                                <Label className="text-xs font-semibold">Quantity</Label>
                                                                <Input
                                                                    type="number"
                                                                    className=""
                                                                    placeholder="Enter quantity"
                                                                    value={quantity.qty}
                                                                    onChange={(e) => handleInputChange(timeline.id, index, 'qty', e.target.value)}
                                                                />
                                                            </div>
                                                            <CurrencyInput
                                                                label="(RM)/Pcs"
                                                                value={quantity.pricePerUnit}
                                                                onChange={(e) => handleInputChange(timeline.id, index, 'pricePerUnit', e.target.value)}
                                                                disabled={editMode !== `pricePerUnit-${timeline.id}-${index}`}
                                                                onModeChange={() => toggleEditMode(`pricePerUnit-${timeline.id}-${index}`)}
                                                                modeType={`pricePerUnit-${timeline.id}-${index}`}
                                                            />
                                                            <CurrencyInput
                                                                label="Total (RM)"
                                                                value={quantity.total}
                                                                onChange={(e) => handleInputChange(timeline.id, index, 'total', e.target.value)}
                                                                disabled={editMode !== `total-${timeline.id}-${index}`}
                                                                onModeChange={() => toggleEditMode(`total-${timeline.id}-${index}`)}
                                                                modeType={`total-${timeline.id}-${index}`}
                                                            />
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-red-500 hover:text-red-700"
                                                                onClick={() => handleRemoveQuantity(timeline.id, index)}
                                                            >
                                                                <MinusCircle className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        variant="outline"
                                                        className="min-w-28 h-8"
                                                        onClick={() => handleAddQuantity(timeline.id)}
                                                    >
                                                        <PlusCircle className="h-2 w-2" />
                                                        Quantity
                                                    </Button>
                                                </div>
                                            </Card>
                                        ))}

                                        <Button
                                            variant="outline"
                                            className="min-w-28 h-8"
                                            onClick={handleAddTimeline}
                                        >
                                            <PlusCircle className="h-2 w-2" />
                                            Timeline
                                        </Button>
                                    </div>
                                </Card>

                                {/* Add-Ons Section */}
                                <Card className="mt-10 rounded-md bg-white/30 backdrop-blur-[1px] overflow-hidden">
                                    <div className="flex items-center mb-4 py-4 px-6 bg-slate-50 border-b border-line-1">
                                        <h3 className="font-bold">Add-Ons</h3>
                                    </div>
                                    <div className="px-6 pb-6">
                                        {addOns.map((addOn, index) => (
                                            <div key={addOn.id} className="flex items-center gap-2 mb-2">
                                                <div className="flex-1 space-y-1">
                                                    <Label className="text-sm font-medium text-gray-600">
                                                        {addOn.label ? addOn.label : `Add-On ${index + 1}`}
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter label"
                                                        value={addOn.label}
                                                        onChange={(e) => handleAddOnInputChange(addOn.id, 'label', e.target.value)}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div className="w-32 space-y-1">
                                                    <Label className="text-sm font-medium text-gray-600">Cost (RM)</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter cost"
                                                        value={addOn.cost}
                                                        onChange={(e) => handleAddOnInputChange(addOn.id, 'cost', e.target.value)}
                                                    />
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-700 mt-4"
                                                    onClick={() => handleRemoveAddOn(addOn.id)}
                                                >
                                                    <MinusCircle className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            variant="outline"
                                            className="min-w-28 h-8 mt-2"
                                            onClick={handleAddAddOn}
                                        >
                                            <PlusCircle className="h-2 w-2" />
                                            Add-On
                                        </Button>
                                    </div>
                                </Card>

                            </div>
                        </div>

                    </Card>
                </div>

                {/* RIGHT PANEL (LIVE PREVIEW) */}
                <div className="hidden lg:block w-[30%] pr-6 py-6 h-full">
                    <Card className="relative h-full rounded-md bg-white/30 backdrop-blur-[1px]">
                    </Card>
                </div>

            </div>
        </div>

    );
};

export default PricingGeneratorForm;