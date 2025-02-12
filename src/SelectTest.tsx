import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, MinusCircle, PenSquare } from 'lucide-react';

// Types
type EditingState = {
  rowId: string;
  field: 'pricePerUnit' | 'total';
} | null;

type QuantityRow = {
  id: string;
  quantity: string;
  pricePerUnit: string;
  total: string;
};

type Timeline = {
  id: string;
  workingDays: string;
  quantities: QuantityRow[];
};

// Utilities
const calculateTotal = (quantity: string, pricePerUnit: string): string => {
  const qty = parseFloat(quantity) || 0;
  const price = parseFloat(pricePerUnit) || 0;
  return (qty * price).toFixed(2);
};

const calculatePricePerUnit = (quantity: string, total: string): string => {
  const qty = parseFloat(quantity) || 0;
  const totalAmount = parseFloat(total) || 0;
  return qty ? (totalAmount / qty).toFixed(2) : '0.00';
};

// Currency Input Component
interface CurrencyInputProps {
  label: string;
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value,
  isEditing,
  onEdit,
  onChange,
  disabled = false
}) => (
  <div className="flex-1">
    <Label className="block text-xs font-semibold mb-1">{label}</Label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
        RM
      </span>
      {!isEditing ? (
        <div className="relative">
          <Input
            readOnly
            value={parseFloat(value || '0').toFixed(2)}
            className="w-full h-10 pl-10 pr-3 rounded-sm border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
          />
          {!disabled && (
            <button
              type="button"
              onClick={onEdit}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <PenSquare className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 pl-10 pr-3 rounded-sm border border-slate-200 bg-white hover:border-primary/50 active:bg-primary/5 focus:bg-primary/5 active:border-primary/50 focus:border-primary/50"
          autoFocus
        />
      )}
    </div>
  </div>
);

// Main Component
const TimelineSection: React.FC = () => {
  const [timelines, setTimelines] = useState<Timeline[]>([{
    id: '1',
    workingDays: '',
    quantities: [{
      id: '1',
      quantity: '',
      pricePerUnit: '0.00',
      total: '0.00'
    }]
  }]);
  const [editingState, setEditingState] = useState<EditingState>(null);

  const handleQuantityChange = (timelineId: string, rowId: string, value: string) => {
    setTimelines(prev => prev.map(timeline => {
      if (timeline.id !== timelineId) return timeline;

      const updatedQuantities = timeline.quantities.map(row => {
        if (row.id !== rowId) return row;

        const newRow = { ...row, quantity: value };

        // Auto-calculate based on which field is being edited
        if (editingState?.rowId === rowId) {
          if (editingState.field === 'pricePerUnit') {
            newRow.total = calculateTotal(value, row.pricePerUnit);
          } else {
            newRow.pricePerUnit = calculatePricePerUnit(value, row.total);
          }
        }

        return newRow;
      });

      return { ...timeline, quantities: updatedQuantities };
    }));
  };

  const handlePriceChange = (timelineId: string, rowId: string, value: string) => {
    if (!editingState) return;

    setTimelines(prev => prev.map(timeline => {
      if (timeline.id !== timelineId) return timeline;

      return {
        ...timeline,
        quantities: timeline.quantities.map(row => {
          if (row.id !== rowId) return row;

          if (editingState.field === 'pricePerUnit') {
            return {
              ...row,
              pricePerUnit: value,
              total: calculateTotal(row.quantity, value)
            };
          } else {
            return {
              ...row,
              total: value,
              pricePerUnit: calculatePricePerUnit(row.quantity, value)
            };
          }
        })
      };
    }));
  };

  const handleEditMode = (rowId: string, field: 'pricePerUnit' | 'total') => {
    setEditingState(current =>
      current?.rowId === rowId && current.field === field ? null : { rowId, field }
    );
  };

  const addQuantityRow = (timelineId: string) => {
    setTimelines(prev => prev.map(timeline => {
      if (timeline.id !== timelineId) return timeline;

      return {
        ...timeline,
        quantities: [
          ...timeline.quantities,
          {
            id: Date.now().toString(),
            quantity: '',
            pricePerUnit: '0.00',
            total: '0.00'
          }
        ]
      };
    }));
  };

  const removeQuantityRow = (timelineId: string, rowId: string) => {
    setTimelines(prev => prev.map(timeline => {
      if (timeline.id !== timelineId) return timeline;

      return {
        ...timeline,
        quantities: timeline.quantities.filter(row => row.id !== rowId)
      };
    }));

    if (editingState?.rowId === rowId) {
      setEditingState(null);
    }
  };

  const addTimeline = () => {
    setTimelines(prev => [...prev, {
      id: Date.now().toString(),
      workingDays: '',
      quantities: [{
        id: Date.now().toString(),
        quantity: '',
        pricePerUnit: '0.00',
        total: '0.00'
      }]
    }]);
  };

  const removeTimeline = (timelineId: string) => {
    setTimelines(prev => prev.filter(timeline => timeline.id !== timelineId));
  };

  return (
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
                onClick={() => removeTimeline(timeline.id)}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <Label className="font-semibold">Working Days</Label>
                <Input
                  type="number"
                  placeholder="Enter working days"
                  value={timeline.workingDays}
                  onChange={(e) => setTimelines(prev => prev.map(t =>
                    t.id === timeline.id ? { ...t, workingDays: e.target.value } : t
                  ))}
                />
              </div>
              {timeline.quantities.map((row) => (
                <div key={row.id} className="flex gap-3 items-end">
                  <div className="w-32 space-y-1">
                    <Label className="text-xs font-semibold">Quantity</Label>
                    <Input
                      type="number"
                      value={row.quantity}
                      onChange={(e) => handleQuantityChange(timeline.id, row.id, e.target.value)}
                    />
                  </div>
                  <CurrencyInput
                    label="Per Unit Price"
                    value={row.pricePerUnit}
                    isEditing={editingState?.rowId === row.id && editingState?.field === 'pricePerUnit'}
                    onEdit={() => handleEditMode(row.id, 'pricePerUnit')}
                    onChange={(value) => handlePriceChange(timeline.id, row.id, value)}
                    disabled={!row.quantity}
                  />
                  <CurrencyInput
                    label="Total Price"
                    value={row.total}
                    isEditing={editingState?.rowId === row.id && editingState?.field === 'total'}
                    onEdit={() => handleEditMode(row.id, 'total')}
                    onChange={(value) => handlePriceChange(timeline.id, row.id, value)}
                    disabled={!row.quantity}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeQuantityRow(timeline.id, row.id)}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="min-w-28 h-8"
                onClick={() => addQuantityRow(timeline.id)}
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
          onClick={addTimeline}
        >
          <PlusCircle className="h-2 w-2" />
          Timeline
        </Button>
      </div>
    </Card>
  );
};

export default TimelineSection;