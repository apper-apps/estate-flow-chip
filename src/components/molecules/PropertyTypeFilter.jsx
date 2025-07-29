import React from "react";
import Label from "@/components/atoms/Label";
import Checkbox from "@/components/atoms/Checkbox";

const PROPERTY_TYPES = [
  { value: "house", label: "House" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "apartment", label: "Apartment" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" }
];

const PropertyTypeFilter = ({ selectedTypes, onChange }) => {
  const handleTypeToggle = (type) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onChange(newTypes);
  };

  return (
    <div className="space-y-3">
      <Label>Property Type</Label>
      <div className="space-y-2">
        {PROPERTY_TYPES.map((type) => (
          <label key={type.value} className="flex items-center space-x-3 cursor-pointer">
            <Checkbox
              checked={selectedTypes.includes(type.value)}
              onChange={() => handleTypeToggle(type.value)}
            />
            <span className="text-sm text-gray-700">{type.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypeFilter;