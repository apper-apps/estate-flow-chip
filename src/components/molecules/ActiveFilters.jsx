import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { formatPrice } from "@/utils/formatters";

const ActiveFilters = ({ filters, onClearFilter, onClearAll }) => {
  const getActiveFilters = () => {
    const active = [];

    if (filters.priceMin) {
      active.push({
        key: "priceMin",
        label: `Min: ${formatPrice(filters.priceMin)}`,
        value: filters.priceMin
      });
    }

    if (filters.priceMax) {
      active.push({
        key: "priceMax",
        label: `Max: ${formatPrice(filters.priceMax)}`,
        value: filters.priceMax
      });
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      filters.propertyType.forEach(type => {
        active.push({
          key: "propertyType",
          label: type.charAt(0).toUpperCase() + type.slice(1),
          value: type
        });
      });
    }

    if (filters.bedroomsMin) {
      active.push({
        key: "bedroomsMin",
        label: `${filters.bedroomsMin}+ bed`,
        value: filters.bedroomsMin
      });
    }

    if (filters.bathroomsMin) {
      active.push({
        key: "bathroomsMin",
        label: `${filters.bathroomsMin}+ bath`,
        value: filters.bathroomsMin
      });
    }

    if (filters.squareFeetMin) {
      active.push({
        key: "squareFeetMin",
        label: `Min: ${filters.squareFeetMin.toLocaleString()} sq ft`,
        value: filters.squareFeetMin
      });
    }

    if (filters.squareFeetMax) {
      active.push({
        key: "squareFeetMax",
        label: `Max: ${filters.squareFeetMax.toLocaleString()} sq ft`,
        value: filters.squareFeetMax
      });
    }

    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 mb-4"
    >
      <span className="text-sm text-gray-600 mr-2">Active filters:</span>
      <AnimatePresence>
        {activeFilters.map((filter, index) => (
          <motion.div
            key={`${filter.key}-${filter.value}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Badge
              variant="outline"
              className="group cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onClearFilter(filter.key, filter.value)}
            >
              {filter.label}
              <ApperIcon name="X" className="h-3 w-3 ml-1 group-hover:text-error transition-colors" />
            </Badge>
          </motion.div>
        ))}
      </AnimatePresence>
      {activeFilters.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-error hover:text-error hover:bg-error/10 ml-2"
        >
          Clear All
        </Button>
      )}
    </motion.div>
  );
};

export default ActiveFilters;