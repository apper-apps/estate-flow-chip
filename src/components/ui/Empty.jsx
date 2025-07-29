import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No properties found", 
  message = "We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.",
  actionLabel = "Clear Filters",
  onAction,
  showAction = true,
  icon = "Home",
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-full mb-6">
        <ApperIcon name={icon} className="h-16 w-16 text-primary-400" />
      </div>
      
      <h2 className="text-2xl font-display font-semibold text-gray-900 mb-3">
        {title}
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      {showAction && onAction && (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onAction}
            className="shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
            {actionLabel}
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = "/"}
            className="hover:bg-primary-50"
          >
            <ApperIcon name="Home" className="h-4 w-4 mr-2" />
            Browse All Properties
          </Button>
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="mt-12 grid grid-cols-3 gap-4 opacity-20">
        <div className="h-2 bg-gradient-to-r from-primary-300 to-secondary-300 rounded-full"></div>
        <div className="h-2 bg-gradient-to-r from-secondary-300 to-accent-300 rounded-full"></div>
        <div className="h-2 bg-gradient-to-r from-accent-300 to-primary-300 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default Empty;