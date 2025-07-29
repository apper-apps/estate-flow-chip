import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import PropertyCard from "@/components/molecules/PropertyCard";

const PropertyGrid = ({ properties, view = "grid", className }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(
        view === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
          : "space-y-4",
        className
      )}
    >
      {properties.map((property) => (
        <motion.div key={property.Id} variants={item}>
          <PropertyCard 
            property={property} 
            className={view === "list" ? "max-w-none" : ""}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PropertyGrid;