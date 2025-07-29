import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import { formatPrice } from "@/utils/formatters";

const PriceRange = ({ minPrice, maxPrice, onMinChange, onMaxChange }) => {
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
      <Label>Price Range</Label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-gray-600 mb-1">Min Price</Label>
          <Input
            type="number"
            placeholder="0"
            value={minPrice || ""}
            onChange={handleMinChange}
            className="text-sm"
          />
          {minPrice && (
            <p className="text-xs text-gray-500 mt-1">{formatPrice(minPrice)}</p>
          )}
        </div>
        <div>
          <Label className="text-xs text-gray-600 mb-1">Max Price</Label>
          <Input
            type="number"
            placeholder="No max"
            value={maxPrice || ""}
            onChange={handleMaxChange}
            className="text-sm"
          />
          {maxPrice && (
            <p className="text-xs text-gray-500 mt-1">{formatPrice(maxPrice)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceRange;