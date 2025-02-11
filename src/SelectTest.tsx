// src/components/SelectTest.tsx (Create this new file)
import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

function SelectTest() {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <Select onValueChange={setValue} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectTest;