import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Trash, MinusCircle, PlusCircle, Pencil } from 'lucide-react'; // Import Icons

const PricingGenerator = () => {
    // Basic Info State, Specifications State, Charges State, Urgent Production State - remain the same
    const [pricingNumber, setPricingNumber] = useState('');
    const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
    const [specifications, setSpecifications] = useState({
        dieType: 'Tuck End Lock',
        material: '300gsm Artcard',
        lamination: 'Matte film',
        printColor: '4C Full Color',
        printSide: '1 side outer',
        gluing: '1 part'
    });
    const [charges, setCharges] = useState({
        blockDie: 150,
        designFee: 58,
        urgentFee: 100,
        deposit: 70
    });
    const [urgentProduction, setUrgentProduction] = useState(false);

    // Dynamic Timelines State - Array of timeline objects
    const [timelines, setTimelines] = useState([
        {
            id: 1,
            name: 'Standard Production TIMELINE', // Or "Timeline 1", can be dynamic
            workingDays: 23, // Default working days for Standard
            pricingData: [
                { qty: 300, costPerUnit: '', totalCost: '', retailPerUnit: '', totalRetail: '', margin: '', marginPercent: '' },
                { qty: 500, costPerUnit: '', totalCost: '', retailPerUnit: '', totalRetail: '', margin: '', marginPercent: '' },
                { qty: 1000, costPerUnit: '', totalCost: '', retailPerUnit: '', totalRetail: '', margin: '', marginPercent: '' }
            ],
            calculationModes: { // Calculation modes for each quantity in this timeline
                300: { mode: 'unit', autoCalculate: true },
                500: { mode: 'unit', autoCalculate: true },
                1000: { mode: 'unit', autoCalculate: true }
            }
        },
        {
            id: 2,
            name: 'Mass Production TIMELINE', // Or "Timeline 2", can be dynamic
            workingDays: 33, // Default working days for Mass
            pricingData: [
                { qty: 300, costPerUnit: '', totalCost: '', retailPerUnit: '', totalRetail: '', margin: '', marginPercent: '' },
                { qty: 500, costPerUnit: '', totalCost: '', retailPerUnit: '', totalRetail: '', margin: '', marginPercent: '' },
                { qty: 1000, costPerUnit: '', totalCost: '', retailPerUnit: '', totalRetail: '', margin: '', marginPercent: '' }
            ],
            calculationModes: { // Calculation modes for each quantity in this timeline
                300: { mode: 'unit', autoCalculate: true },
                500: { mode: 'unit', autoCalculate: true },
                1000: { mode: 'unit', autoCalculate: true }
            }
        }
    ]);


    useEffect(() => {
        const date = new Date();
        const number = `BX${date.getFullYear().toString().slice(-2)}${(date.getMonth() + 1).toString().padStart(2, '0')}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
        setPricingNumber(number);
    }, []);

    const handleCostChange = (timelineIndex, qtyIndex, value, type) => {
        const timeline = timelines[timelineIndex];
        const qtyData = timeline.pricingData[qtyIndex];
        const mode = timeline.calculationModes[qtyData.qty].mode;
        const qty = qtyData.qty;
        let newData = { ...qtyData };

        if (type === 'unit') {
            newData.costPerUnit = value;
            newData.totalCost = (value * qty).toFixed(2);
        } else {
            newData.totalCost = value;
            newData.costPerUnit = (value / qty).toFixed(2);
        }

        if (timeline.calculationModes[qtyData.qty].autoCalculate) {
            const retailValue = calculateRetail(newData.costPerUnit, qty, timeline.name); // Use timeline name for markup
            newData.retailPerUnit = retailValue;
            newData.totalRetail = (retailValue * qty).toFixed(2);
        }

        calculateMargins(newData);
        updatePricingData(timelineIndex, qtyIndex, newData);
    };

    const handleRetailChange = (timelineIndex, qtyIndex, value, type) => {
        const timeline = timelines[timelineIndex];
        const qtyData = timeline.pricingData[qtyIndex];
        const qty = qtyData.qty;
        let newData = { ...qtyData };

        if (type === 'unit') {
            newData.retailPerUnit = value;
            newData.totalRetail = (value * qty).toFixed(2);
        } else {
            newData.totalRetail = value;
            newData.retailPerUnit = (value / qty).toFixed(2);
        }

        calculateMargins(newData);
        updatePricingData(timelineIndex, qtyIndex, newData);
    };

    const updatePricingData = (timelineIndex, qtyIndex, newData) => {
        const updatedTimelines = [...timelines];
        updatedTimelines[timelineIndex].pricingData[qtyIndex] = newData;
        setTimelines(updatedTimelines);
    };

    const calculateMargins = (data) => {
        if (data.totalRetail && data.totalCost) {
            data.margin = (data.totalRetail - data.totalCost).toFixed(2);
            data.marginPercent = ((data.margin / data.totalCost) * 100).toFixed(2);
        }
    };

    const calculateRetail = (costPerUnit, quantity, timelineName) => {
        let markup = timelineName === 'Standard Production TIMELINE' ? 2.05 : 2.17; // Use timeline name

        // Volume discount
        if (quantity >= 1000) markup *= 0.85;
        else if (quantity >= 500) markup *= 0.92;

        return (costPerUnit * markup).toFixed(2);
    };

    const toggleMode = (timelineIndex, qtyIndex) => {
        const timeline = timelines[timelineIndex];
        const qty = timeline.pricingData[qtyIndex].qty;
        const updatedTimelines = [...timelines];
        updatedTimelines[timelineIndex].calculationModes[qty].mode = timeline.calculationModes[qty].mode === 'unit' ? 'total' : 'unit';
        setTimelines(updatedTimelines);
    };

    const toggleAutoCalculate = (timelineIndex, qtyIndex) => {
        const timeline = timelines[timelineIndex];
        const qty = timeline.pricingData[qtyIndex].qty;
        const updatedTimelines = [...timelines];
        updatedTimelines[timelineIndex].calculationModes[qty].autoCalculate = !timeline.calculationModes[qty].autoCalculate;
        setTimelines(updatedTimelines);
    };

    const handleAddQuantity = (timelineIndex) => {
        const newQty = prompt(`Enter quantity for ${timelines[timelineIndex].name}:`);
        if (newQty && !isNaN(parseInt(newQty))) {
            const newQuantityEntry = {
                qty: parseInt(newQty),
                costPerUnit: '',
                totalCost: '',
                retailPerUnit: '',
                totalRetail: '',
                margin: '',
                marginPercent: ''
            };
            const updatedTimelines = [...timelines];
            updatedTimelines[timelineIndex].pricingData = [...updatedTimelines[timelineIndex].pricingData, newQuantityEntry];
            updatedTimelines[timelineIndex].calculationModes[parseInt(newQty)] = { mode: 'unit', autoCalculate: true }; // Init calculation mode
            setTimelines(updatedTimelines);
        } else if (newQty !== null) {
            alert("Invalid quantity. Please enter a number.");
        }
    };

    const handleRemoveQuantity = (timelineIndex, qtyIndex) => {
        const timeline = timelines[timelineIndex];
        const qtyToRemove = timeline.pricingData[qtyIndex].qty;
        const confirmRemove = window.confirm(`Are you sure you want to remove quantity ${qtyToRemove} for ${timeline.name}?`);
        if (confirmRemove) {
            const updatedTimelines = [...timelines];
            updatedTimelines[timelineIndex].pricingData = updatedTimelines[timelineIndex].pricingData.filter((_, index) => index !== qtyIndex);
            delete updatedTimelines[timelineIndex].calculationModes[qtyToRemove]; // Remove from calculationModes
            setTimelines(updatedTimelines);
        }
    };

    const handleAddTimeline = () => {
        const newTimelineId = timelines.length + 1;
        const newTimelineName = `Timeline ${newTimelineId}`; // Or prompt for timeline name
        const newTimeline = {
            id: newTimelineId,
            name: newTimelineName,
            workingDays: 0, // Default working days
            pricingData: [], // Start with no quantities
            calculationModes: {} // Start with no calculation modes
        };
        setTimelines([...timelines, newTimeline]);
    };

    const handleRemoveTimeline = (timelineIndex) => {
        const confirmRemove = window.confirm(`Are you sure you want to remove ${timelines[timelineIndex].name}?`);
        if (confirmRemove) {
            const updatedTimelines = timelines.filter((_, index) => index !== timelineIndex);
            setTimelines(updatedTimelines);
        }
    };

    const handleWorkingDaysChange = (timelineIndex, value) => {
        const updatedTimelines = [...timelines];
        updatedTimelines[timelineIndex].workingDays = value;
        setTimelines(updatedTimelines);
    };


    const generateQuotation = () => {
        if (!dimensions.length || !dimensions.width || !dimensions.height) {
            return "Please fill in all dimensions";
        }

        let quotationText = `::PRICING LIST::\n\nPricing No.: ${pricingNumber}\nDimension size: ${dimensions.length}x${dimensions.width}x${dimensions.height}mm\nDie Type: ${specifications.dieType}\nMaterial: ${specifications.material}\nLamination: ${specifications.lamination}\nPrint Color: ${specifications.printColor}\nPrint Side: ${specifications.printSide}\nGluing: ${specifications.gluing}\n\nONE TIME CHARGE: Block Die RM${charges.blockDie}\n*The Block Die charge is one-time only. For next orders, only pay the printing cost as below:\n\n`;

        timelines.forEach(timeline => {
            quotationText += `${timeline.name} / ${timeline.workingDays} Workdays\n`;
            timeline.pricingData
                .filter(data => data.retailPerUnit)
                .forEach(data => {
                    quotationText += `${data.qty}'s ${data.retailPerUnit}/pc = RM${data.totalRetail}\n`;
                });
            quotationText += `\n`; // Add space between timelines
        });


        quotationText += `Design RM${charges.designFee} (If you hire us)\n\nDeposit: ${charges.deposit}% BEFORE proceeding\n\n`;
        if (urgentProduction) {
            quotationText += `Urgent: 9 working days (+) RM${charges.urgentFee}\n*Only can applied at Standard Production TIMELINE only\n\n`;
        }
        quotationText += `Quotation Valid 5 days`;
        return quotationText;
    };


    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            <Tabs defaultValue="specifications">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="specifications">Box Details</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="quotation">Quotation</TabsTrigger>
                </TabsList>

                <TabsContent value="specifications">
                    {/* ... (Box Specifications Card - remains the same) ... */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Box Specifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Dimensions */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Length (mm)</Label>
                                    <Input
                                        type="number"
                                        value={dimensions.length}
                                        onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Width (mm)</Label>
                                    <Input
                                        type="number"
                                        value={dimensions.width}
                                        onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Height (mm)</Label>
                                    <Input
                                        type="number"
                                        value={dimensions.height}
                                        onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Specifications */}
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(specifications).map(([key, value]) => (
                                    <div key={key} className="space-y-2">
                                        <Label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Label>
                                        <Input
                                            value={value}
                                            onChange={(e) => setSpecifications({ ...specifications, [key]: e.target.value })}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Charges */}
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(charges).map(([key, value]) => (
                                    <div key={key} className="space-y-2">
                                        <Label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Label>
                                        <Input
                                            type="number"
                                            value={value}
                                            onChange={(e) => setCharges({ ...charges, [key]: e.target.value })}
                                        />
                                    </div>
                                ))}
                                <div className="space-y-2 col-span-2">
                                    <Label>Urgent Production</Label>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            checked={urgentProduction}
                                            onCheckedChange={setUrgentProduction}
                                        />
                                        <span>Enable 9-day urgent production (+RM{charges.urgentFee})</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pricing">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing Calculator</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {timelines.map((timeline, timelineIndex) => (
                                <Card key={timeline.id} className="border border-gray-200">
                                    <div className="p-3 border-b flex justify-between items-center">
                                        <h3 className="text-sm font-medium">{timeline.name}</h3>
                                        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleRemoveTimeline(timelineIndex)}>
                                            <MinusCircle className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="p-3 space-y-3">
                                        <div className="space-y-1">
                                            <Label className="text-sm">Working Days</Label>
                                            <Input
                                                type="number"
                                                className="h-9"
                                                value={timeline.workingDays}
                                                onChange={(e) => handleWorkingDaysChange(timelineIndex, e.target.value)}
                                            />
                                        </div>

                                        {/* Quantity Rows */}
                                        {timeline.pricingData.map((qtyData, qtyIndex) => (
                                            <div className="flex gap-2 items-end" key={`${timeline.id}-${qtyData.qty}`}>
                                                <div className="w-32 space-y-1">
                                                    <Label className="text-sm">Quantity</Label>
                                                    <Input
                                                        type="number"
                                                        className="h-9"
                                                        value={qtyData.qty}
                                                        readOnly // Quantity is not editable directly
                                                    />
                                                </div>
                                                <div className="w-40 space-y-1">
                                                    <Label className="text-sm">(RM)/Pcs</Label>
                                                    <Input
                                                        type="number"
                                                        className="h-9"
                                                        value={qtyData.costPerUnit}
                                                        onChange={(e) => handleCostChange(timelineIndex, qtyIndex, e.target.value, 'unit')}
                                                    />
                                                </div>
                                                <div className="w-40 space-y-1">
                                                    <Label className="text-sm">Total (RM)</Label>
                                                    <Input
                                                        type="number"
                                                        className="h-9"
                                                        value={qtyData.totalCost}
                                                        onChange={(e) => handleCostChange(timelineIndex, qtyIndex, e.target.value, 'total')}
                                                    />
                                                </div>
                                                <Button variant="ghost" size="sm" className="h-9 px-2" onClick={() => handleRemoveQuantity(timelineIndex, qtyIndex)}>
                                                    <MinusCircle className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}

                                        <Button variant="outline" size="sm" className="h-8 text-sm w-full" onClick={() => handleAddQuantity(timelineIndex)}>
                                            <PlusCircle className="h-4 w-4 mr-1" />
                                            Add Quantity
                                        </Button>
                                    </div>
                                </Card>
                            ))}


                            <Button variant="outline" size="sm" className="h-8 text-sm w-full" onClick={handleAddTimeline}>
                                <PlusCircle className="h-4 w-4 mr-1" />
                                Add Timeline
                            </Button>


                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="quotation">
                    <Card>
                        <CardHeader>
                            <CardTitle>Generated Quotation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert>
                                <AlertDescription className="whitespace-pre-line font-mono text-sm">
                                    {generateQuotation()}
                                </AlertDescription>
                            </Alert>

                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(generateQuotation());
                                }}
                                className="w-full"
                            >
                                Copy Quotation to Clipboard
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PricingGenerator;