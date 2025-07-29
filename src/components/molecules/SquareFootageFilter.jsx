import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import { formatSquareFeet } from "@/utils/formatters";

const SquareFootageFilter = ({ minSqft, maxSqft, onMinChange, onMaxChange }) => {
  const handleMinChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value) || 0;
    onMinChange(value);
  };

  const handleMaxChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value) || 0;
    onMaxChange(value);
  };

  return (
    <div className="space-y-3">
      <Label>Square Footage</Label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-gray-600 mb-1">Min Sq Ft</Label>
          <Input
            type="number"
            placeholder="0"
            value={minSqft || ""}
            onChange={handleMinChange}
            className="text-sm"
          />
          {minSqft && (
            <p className="text-xs text-gray-500 mt-1">{formatSquareFeet(minSqft)} sq ft</p>
          )}
        </div>
        <div>
          <Label className="text-xs text-gray-600 mb-1">Max Sq Ft</Label>
          <Input
            type="number"
            placeholder="No max"
            value={maxSqft || ""}
            onChange={handleMaxChange}
            className="text-sm"
          />
          {maxSqft && (
            <p className="text-xs text-gray-500 mt-1">{formatSquareFeet(maxSqft)} sq ft</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SquareFootageFilter;