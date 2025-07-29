import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Loading = ({ className, count = 6 }) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Search Bar Skeleton */}
      <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />
      
      {/* Property Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-card overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            
            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
              {/* Price and Type */}
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gradient-to-r from-primary-200 via-primary-100 to-primary-200 rounded w-24 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
              </div>
              
              {/* Title */}
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
              
              {/* Address */}
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              
              {/* Details */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <div className="h-4 bg-gray-200 rounded w-8 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-8 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                </div>
              </div>
              
              {/* Footer */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;