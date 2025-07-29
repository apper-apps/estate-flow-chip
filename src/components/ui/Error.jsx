import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading the properties. Please try again.", 
  onRetry,
  showRetry = true,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      <div className="bg-gradient-to-br from-error/10 to-red-100 p-6 rounded-full mb-6">
        <ApperIcon name="AlertTriangle" className="h-12 w-12 text-error" />
      </div>
      
      <h2 className="text-2xl font-display font-semibold text-gray-900 mb-3">
        {title}
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onRetry} className="shadow-lg hover:shadow-xl">
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="hover:bg-gray-50"
          >
            <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
            Refresh Page
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default Error;