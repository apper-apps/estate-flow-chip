import React from "react";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";

const BedroomBathroomFilter = ({ bedrooms, bathrooms, onBedroomsChange, onBathroomsChange }) => {
  const bedroomOptions = [
    { value: "", label: "Any bedrooms" },
    { value: "1", label: "1+ bedroom" },
    { value: "2", label: "2+ bedrooms" },
    { value: "3", label: "3+ bedrooms" },
    { value: "4", label: "4+ bedrooms" },
    { value: "5", label: "5+ bedrooms" }
  ];

  const bathroomOptions = [
    { value: "", label: "Any bathrooms" },
    { value: "1", label: "1+ bathroom" },
    { value: "2", label: "2+ bathrooms" },
    { value: "3", label: "3+ bathrooms" },
    { value: "4", label: "4+ bathrooms" }
  ];

  return (
    <div className="space-y-4">
      <div>
        <Label>Bedrooms</Label>
        <Select
          value={bedrooms || ""}
          onChange={(e) => onBedroomsChange(e.target.value ? parseInt(e.target.value) : "")}
        >
          {bedroomOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Bathrooms</Label>
        <Select
          value={bathrooms || ""}
          onChange={(e) => onBathroomsChange(e.target.value ? parseInt(e.target.value) : "")}
        >
          {bathroomOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default BedroomBathroomFilter;