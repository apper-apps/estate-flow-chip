import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ViewToggle = ({ view, onViewChange, className }) => {
  return (
    <div className={cn("flex items-center space-x-1 bg-gray-100 rounded-lg p-1", className)}>
      <Button
        variant={view === "grid" ? "primary" : "ghost"}
        size="sm"
        onClick={() => onViewChange("grid")}
        className={cn(
          "px-3 py-2 rounded-md transition-all duration-200",
          view === "grid" 
            ? "bg-white shadow-sm text-primary-600" 
            : "text-gray-600 hover:text-primary-600 hover:bg-white/50"
        )}
      >
        <ApperIcon name="Grid3X3" className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "list" ? "primary" : "ghost"}
        size="sm"
        onClick={() => onViewChange("list")}
        className={cn(
          "px-3 py-2 rounded-md transition-all duration-200",
          view === "list" 
            ? "bg-white shadow-sm text-primary-600" 
            : "text-gray-600 hover:text-primary-600 hover:bg-white/50"
        )}
      >
        <ApperIcon name="List" className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ViewToggle;