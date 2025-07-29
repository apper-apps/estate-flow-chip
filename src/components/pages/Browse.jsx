import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/organisms/Header";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import ActiveFilters from "@/components/molecules/ActiveFilters";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import propertyService from "@/services/api/propertyService";
import { toast } from "react-toastify";

const Browse = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [view, setView] = useState("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Filters state
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    propertyType: [],
    bedroomsMin: "",
    bathroomsMin: "",
    squareFeetMin: "",
    squareFeetMax: ""
  });

  // Load properties
  const loadProperties = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await propertyService.getAll(filters, searchTerm);
      setProperties(data);
      setFilteredProperties(data);
    } catch (err) {
      setError(err.message || "Failed to load properties");
      setProperties([]);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadProperties();
  }, []);

  // Apply filters and search
  useEffect(() => {
    loadProperties();
  }, [filters, searchTerm]);

  // Update URL with search params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("search", searchTerm);
    }
    setSearchParams(params);
  }, [searchTerm, setSearchParams]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      priceMin: "",
      priceMax: "",
      propertyType: [],
      bedroomsMin: "",
      bathroomsMin: "",
      squareFeetMin: "",
      squareFeetMax: ""
    });
    toast.info("All filters cleared");
  };

  const handleClearSingleFilter = (filterKey, filterValue) => {
    const newFilters = { ...filters };
    
    if (filterKey === "propertyType") {
      newFilters.propertyType = newFilters.propertyType.filter(type => type !== filterValue);
    } else {
      newFilters[filterKey] = "";
    }
    
    setFilters(newFilters);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleMobileFilterToggle = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  const handleMobileFilterClose = () => {
    setMobileFilterOpen(false);
  };

  const resultsCount = filteredProperties.length;
  const hasActiveFilters = Object.values(filters).some(value => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== "" && value !== null && value !== undefined;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onSearch={handleSearch}
          view={view}
          onViewChange={handleViewChange}
          onMobileFilterToggle={handleMobileFilterToggle}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onSearch={handleSearch}
          view={view}
          onViewChange={handleViewChange}
          onMobileFilterToggle={handleMobileFilterToggle}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error 
            title="Failed to Load Properties"
            message={error}
            onRetry={loadProperties}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={handleSearch}
        view={view}
        onViewChange={handleViewChange}
        onMobileFilterToggle={handleMobileFilterToggle}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            isOpen={mobileFilterOpen}
            onClose={handleMobileFilterClose}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-display font-semibold text-gray-900">
                    {searchTerm ? `Search Results for "${searchTerm}"` : "Browse Properties"}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {resultsCount === 0 
                      ? "No properties found" 
                      : `${resultsCount} ${resultsCount === 1 ? "property" : "properties"} found`
                    }
                  </p>
                </div>
                
                {/* Desktop View Toggle */}
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => handleViewChange("grid")}
                      className={`px-3 py-2 rounded-md transition-all duration-200 ${
                        view === "grid" 
                          ? "bg-white shadow-sm text-primary-600" 
                          : "text-gray-600 hover:text-primary-600 hover:bg-white/50"
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => handleViewChange("list")}
                      className={`px-3 py-2 rounded-md transition-all duration-200 ${
                        view === "list" 
                          ? "bg-white shadow-sm text-primary-600" 
                          : "text-gray-600 hover:text-primary-600 hover:bg-white/50"
                      }`}
                    >
                      List
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              <ActiveFilters
                filters={filters}
                onClearFilter={handleClearSingleFilter}
                onClearAll={handleClearFilters}
              />
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length === 0 ? (
              <Empty
                title={searchTerm ? "No properties found for your search" : "No properties match your filters"}
                message={
                  searchTerm 
                    ? `We couldn't find any properties for "${searchTerm}". Try a different search term or adjust your filters.`
                    : "Try adjusting your filter criteria to see more properties."
                }
                actionLabel={hasActiveFilters ? "Clear Filters" : "View All Properties"}
                onAction={hasActiveFilters ? handleClearFilters : () => navigate("/")}
                icon="Search"
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyGrid properties={filteredProperties} view={view} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;