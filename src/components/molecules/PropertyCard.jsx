import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { formatPrice, formatBedsBaths, formatSquareFeet } from "@/utils/formatters";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { toast } from "react-toastify";

const PropertyCard = ({ property, className }) => {
  const navigate = useNavigate();
  const { isSaved, toggleSaved } = useSavedProperties();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSaveToggle = (e) => {
    e.stopPropagation();
    const wasSaved = toggleSaved(property.Id);
    if (wasSaved) {
      toast.success("Property saved to your collection!");
    } else {
      toast.info("Property removed from saved list");
    }
  };

  const handleCardClick = () => {
    navigate(`/property/${property.Id}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
      className={cn(
        "property-card group bg-white rounded-lg shadow-card hover:shadow-card-hover cursor-pointer overflow-hidden",
        "border border-gray-100 hover:border-gray-200",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 image-loading" />
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <ApperIcon name="ImageOff" className="h-12 w-12 text-gray-400" />
          </div>
        ) : (
          <img
            src={property.images[0]}
            alt={property.title}
            className={cn(
              "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
              !imageLoaded && "opacity-0"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        
        {/* Overlay Elements */}
        <div className="absolute top-3 left-3">
          <Badge variant="primary" size="sm" className="backdrop-blur-sm bg-opacity-90">
            {property.status}
          </Badge>
        </div>
        
        <button
          onClick={handleSaveToggle}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200",
            "hover:scale-110 active:scale-95",
            isSaved(property.Id)
              ? "bg-error text-white shadow-lg"
              : "bg-white/80 text-gray-600 hover:bg-white hover:text-error"
          )}
        >
          <ApperIcon 
            name={isSaved(property.Id) ? "Heart" : "Heart"} 
            className={cn(
              "h-4 w-4 transition-all duration-200",
              isSaved(property.Id) && "fill-current"
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Price */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display font-semibold text-primary-600 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
            {formatPrice(property.price)}
          </h3>
          <span className="text-sm text-gray-500">{property.type}</span>
        </div>

        {/* Title */}
        <h4 className="font-display text-lg font-medium text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {property.title}
        </h4>

        {/* Address */}
        <p className="text-sm text-gray-600 line-clamp-1 flex items-center">
          <ApperIcon name="MapPin" className="h-3 w-3 mr-1 flex-shrink-0" />
          {property.address}, {property.city}, {property.state}
        </p>

        {/* Property Details */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <ApperIcon name="Bed" className="h-4 w-4 mr-1" />
              {property.bedrooms}
            </span>
            <span className="flex items-center">
              <ApperIcon name="Bath" className="h-4 w-4 mr-1" />
              {property.bathrooms}
            </span>
            <span className="flex items-center">
              <ApperIcon name="Square" className="h-4 w-4 mr-1" />
              {formatSquareFeet(property.squareFeet)} sq ft
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Listed {new Date(property.listingDate).toLocaleDateString()}
          </span>
          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700">
            View Details
            <ApperIcon name="ArrowRight" className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;