import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import propertyService from "@/services/api/propertyService";
import { toast } from "react-toastify";

const SavedProperties = () => {
  const navigate = useNavigate();
  const { savedProperties: savedIds, unsaveProperty } = useSavedProperties();
  
  // State
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("grid");

  // Load saved properties
  const loadSavedProperties = async () => {
    try {
      setLoading(true);
      setError("");
      
      if (savedIds.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      const data = await propertyService.getSavedProperties(savedIds);
      setProperties(data);
    } catch (err) {
      setError(err.message || "Failed to load saved properties");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedProperties();
  }, [savedIds]);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all saved properties?")) {
      savedIds.forEach(saved => {
        unsaveProperty(saved.propertyId);
      });
      toast.success("All saved properties have been removed");
    }
  };

  const handleBrowseProperties = () => {
    navigate("/");
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
          </div>
          <Loading count={3} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error 
            title="Failed to Load Saved Properties"
            message={error}
            onRetry={loadSavedProperties}
          />
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Saved Properties
            </h1>
            <p className="text-gray-600">
              Your collection of favorite properties
            </p>
          </div>
          
          <Empty
            title="No Saved Properties Yet"
            message="Start building your collection by saving properties you're interested in. Click the heart icon on any property to add it to your saved list."
            actionLabel="Browse Properties"
            onAction={handleBrowseProperties}
            icon="Heart"
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                Saved Properties
              </h1>
              <p className="text-gray-600">
                {properties.length} {properties.length === 1 ? "property" : "properties"} in your collection
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleViewChange("grid")}
                  className={`px-3 py-2 rounded-md transition-all duration-200 ${
                    view === "grid" 
                      ? "bg-white shadow-sm text-primary-600" 
                      : "text-gray-600 hover:text-primary-600 hover:bg-white/50"
                  }`}
                >
                  <ApperIcon name="Grid3X3" className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleViewChange("list")}
                  className={`px-3 py-2 rounded-md transition-all duration-200 ${
                    view === "list" 
                      ? "bg-white shadow-sm text-primary-600" 
                      : "text-gray-600 hover:text-primary-600 hover:bg-white/50"
                  }`}
                >
                  <ApperIcon name="List" className="h-4 w-4" />
                </button>
              </div>
              
              {/* Clear All Button */}
              <Button 
                variant="outline" 
                onClick={handleClearAll}
                className="text-error border-error hover:bg-error hover:text-white"
              >
                <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-card p-4">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-lg mr-3">
                  <ApperIcon name="Heart" className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{properties.length}</div>
                  <div className="text-sm text-gray-600">Saved Properties</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-card p-4">
              <div className="flex items-center">
                <div className="p-2 bg-secondary-100 rounded-lg mr-3">
                  <ApperIcon name="DollarSign" className="h-5 w-5 text-secondary-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length / 1000)}K
                  </div>
                  <div className="text-sm text-gray-600">Avg. Price</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-card p-4">
              <div className="flex items-center">
                <div className="p-2 bg-accent-100 rounded-lg mr-3">
                  <ApperIcon name="MapPin" className="h-5 w-5 text-accent-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Set(properties.map(p => p.city)).size}
                  </div>
                  <div className="text-sm text-gray-600">Cities</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <PropertyGrid properties={properties} view={view} />

        {/* Additional Actions */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-card p-8">
            <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
              Ready to explore more properties?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Continue browsing our extensive collection of properties to find your perfect match. 
              Save more properties to compare and make the best decision.
            </p>
            <Button onClick={handleBrowseProperties} size="lg" className="shadow-lg hover:shadow-xl">
              <ApperIcon name="Search" className="h-5 w-5 mr-2" />
              Browse More Properties
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SavedProperties;