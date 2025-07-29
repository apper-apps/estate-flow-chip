import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className={cn(
          "peer h-5 w-5 shrink-0 rounded border border-gray-300 bg-white",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-0",
          "checked:bg-gradient-to-r checked:from-primary-500 checked:to-primary-600 checked:border-primary-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        checked={checked}
        {...props}
      />
      {checked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <ApperIcon name="Check" className="h-3 w-3 text-white" />
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;