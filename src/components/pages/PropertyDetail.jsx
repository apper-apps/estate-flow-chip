import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import PropertyGallery from "@/components/organisms/PropertyGallery";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { formatPrice, formatBedsBaths, formatSquareFeet, formatListingDate } from "@/utils/formatters";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import propertyService from "@/services/api/propertyService";
import { toast } from "react-toastify";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSaved, toggleSaved } = useSavedProperties();
  
  // State
  const [property, setProperty] = useState(null);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [error, setError] = useState("");

  // Load property details
  const loadProperty = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await propertyService.getById(id);
      setProperty(data);
      
      // Load related properties
      setRelatedLoading(true);
      const related = await propertyService.getRelatedProperties(id);
      setRelatedProperties(related);
    } catch (err) {
      setError(err.message || "Failed to load property details");
      setProperty(null);
    } finally {
      setLoading(false);
      setRelatedLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadProperty();
    }
  }, [id]);

  const handleSaveToggle = () => {
    const wasSaved = toggleSaved(property.Id);
    if (wasSaved) {
      toast.success("Property saved to your collection!");
    } else {
      toast.info("Property removed from saved list");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContact = () => {
    toast.success("Contact information sent! An agent will reach out to you soon.");
  };

  const handleScheduleTour = () => {
    toast.success("Tour request submitted! We'll contact you to confirm the date and time.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            {/* Back button skeleton */}
            <div className="h-10 w-24 bg-gray-200 rounded-lg" />
            
            {/* Gallery skeleton */}
            <div className="h-96 bg-gray-200 rounded-lg" />
            
            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-32 bg-gray-200 rounded" />
              </div>
              <div className="space-y-4">
                <div className="h-48 bg-gray-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="ghost" onClick={handleBack} className="mb-6">
            <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
          <Error 
            title="Property Not Found"
            message={error || "The property you're looking for could not be found."}
            onRetry={loadProperty}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={handleBack} className="mb-6 hover:bg-primary-50">
          <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
          Back to Browse
        </Button>

        {/* Property Gallery */}
        <PropertyGallery 
          images={property.images} 
          title={property.title}
          className="mb-8 h-96"
        />

        {/* Property Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <p className="text-gray-600 flex items-center">
                    <ApperIcon name="MapPin" className="h-4 w-4 mr-1" />
                    {property.address}, {property.city}, {property.state} {property.zipCode}
                  </p>
                </div>
                <Button
                  variant={isSaved(property.Id) ? "danger" : "outline"}
                  onClick={handleSaveToggle}
                  size="sm"
                  className="flex-shrink-0"
                >
                  <ApperIcon 
                    name="Heart" 
                    className={`h-4 w-4 mr-2 ${isSaved(property.Id) ? "fill-current" : ""}`} 
                  />
                  {isSaved(property.Id) ? "Saved" : "Save"}
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <Badge variant="primary">{property.status}</Badge>
                <span className="text-sm text-gray-500 capitalize">{property.type}</span>
                <span className="text-sm text-gray-500">Built in {property.yearBuilt}</span>
                <span className="text-sm text-gray-500">Listed {formatListingDate(property.listingDate)}</span>
              </div>
            </div>

            {/* Price and Details */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <div className="text-4xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    ${Math.round(property.price / property.squareFeet)} per sq ft
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <ApperIcon name="Bed" className="h-5 w-5 mr-1" />
                      <span className="text-lg font-semibold">{property.bedrooms}</span>
                    </div>
                    <div className="text-sm">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <ApperIcon name="Bath" className="h-5 w-5 mr-1" />
                      <span className="text-lg font-semibold">{property.bathrooms}</span>
                    </div>
                    <div className="text-sm">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <ApperIcon name="Square" className="h-5 w-5 mr-1" />
                      <span className="text-lg font-semibold">{formatSquareFeet(property.squareFeet)}</span>
                    </div>
                    <div className="text-sm">Sq Ft</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
                About This Property
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-card p-6">
                <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
                  Property Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <ApperIcon name="Check" className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-6">
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                Interested in this property?
              </h3>
              <div className="space-y-3">
                <Button onClick={handleScheduleTour} className="w-full" size="lg">
                  <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
                  Schedule a Tour
                </Button>
                <Button variant="outline" onClick={handleContact} className="w-full" size="lg">
                  <ApperIcon name="Phone" className="h-4 w-4 mr-2" />
                  Contact Agent
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Property ID:</span>
                    <span className="font-medium">#{property.Id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Listed:</span>
                    <span className="font-medium">{formatListingDate(property.listingDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property Type:</span>
                    <span className="font-medium capitalize">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year Built:</span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
              Similar Properties
            </h2>
            {relatedLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-card overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <PropertyGrid properties={relatedProperties} view="grid" />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyDetail;