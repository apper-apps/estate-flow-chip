import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import PriceRange from "@/components/molecules/PriceRange";
import PropertyTypeFilter from "@/components/molecules/PropertyTypeFilter";
import BedroomBathroomFilter from "@/components/molecules/BedroomBathroomFilter";
import SquareFootageFilter from "@/components/molecules/SquareFootageFilter";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isOpen, 
  onClose,
  className 
}) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== "" && value !== null && value !== undefined;
    });
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className={cn("w-80 bg-white rounded-lg shadow-card p-6 h-fit sticky top-24", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-display font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters() && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-error hover:text-error hover:bg-error/10"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <PriceRange
          minPrice={filters.priceMin}
          maxPrice={filters.priceMax}
          onMinChange={(value) => handleFilterChange("priceMin", value)}
          onMaxChange={(value) => handleFilterChange("priceMax", value)}
        />

        <div className="border-t border-gray-200 pt-6">
          <PropertyTypeFilter
            selectedTypes={filters.propertyType || []}
            onChange={(types) => handleFilterChange("propertyType", types)}
          />
        </div>

        <div className="border-t border-gray-200 pt-6">
          <BedroomBathroomFilter
            bedrooms={filters.bedroomsMin}
            bathrooms={filters.bathroomsMin}
            onBedroomsChange={(value) => handleFilterChange("bedroomsMin", value)}
            onBathroomsChange={(value) => handleFilterChange("bathroomsMin", value)}
          />
        </div>

        <div className="border-t border-gray-200 pt-6">
          <SquareFootageFilter
            minSqft={filters.squareFeetMin}
            maxSqft={filters.squareFeetMax}
            onMinChange={(value) => handleFilterChange("squareFeetMin", value)}
            onMaxChange={(value) => handleFilterChange("squareFeetMax", value)}
          />
        </div>
      </div>
    </div>
  );

  // Mobile Overlay
  const MobileOverlay = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display font-semibold text-gray-900">Filters</h2>
                <div className="flex items-center space-x-2">
                  {hasActiveFilters() && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={onClearFilters}
                      className="text-error hover:text-error hover:bg-error/10"
                    >
                      Clear All
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <ApperIcon name="X" className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <PriceRange
                  minPrice={filters.priceMin}
                  maxPrice={filters.priceMax}
                  onMinChange={(value) => handleFilterChange("priceMin", value)}
                  onMaxChange={(value) => handleFilterChange("priceMax", value)}
                />

                <div className="border-t border-gray-200 pt-6">
                  <PropertyTypeFilter
                    selectedTypes={filters.propertyType || []}
                    onChange={(types) => handleFilterChange("propertyType", types)}
                  />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <BedroomBathroomFilter
                    bedrooms={filters.bedroomsMin}
                    bathrooms={filters.bathroomsMin}
                    onBedroomsChange={(value) => handleFilterChange("bedroomsMin", value)}
                    onBathroomsChange={(value) => handleFilterChange("bathroomsMin", value)}
                  />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <SquareFootageFilter
                    minSqft={filters.squareFeetMin}
                    maxSqft={filters.squareFeetMax}
                    onMinChange={(value) => handleFilterChange("squareFeetMin", value)}
                    onMaxChange={(value) => handleFilterChange("squareFeetMax", value)}
                  />
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="sticky bottom-0 bg-white pt-6 mt-6 border-t border-gray-200">
                <Button 
                  onClick={onClose} 
                  className="w-full"
                  size="lg"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>

      {/* Mobile Overlay */}
      <MobileOverlay />
    </>
  );
};

export default FilterSidebar;