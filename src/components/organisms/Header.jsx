import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ViewToggle from "@/components/molecules/ViewToggle";
import ApperIcon from "@/components/ApperIcon";
import { useSavedProperties } from "@/hooks/useSavedProperties";

const Header = ({ onSearch, view, onViewChange, onMobileFilterToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { savedProperties } = useSavedProperties();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";
  const isSavedPage = location.pathname === "/saved";

  const handleSearch = (searchTerm) => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    if (!isHomePage) {
      navigate("/");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg group-hover:shadow-md transition-all duration-200">
              <ApperIcon name="Home" className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-display font-semibold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              Estate Flow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-1">
              <Link
                to="/"
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isHomePage
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                )}
              >
                Browse
              </Link>
              <Link
                to="/saved"
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center",
                  isSavedPage
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                )}
              >
                Saved Properties
                {savedProperties.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-error text-white text-xs rounded-full">
                    {savedProperties.length}
                  </span>
                )}
              </Link>
            </nav>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {isHomePage && (
              <>
                {view && onViewChange && (
                  <ViewToggle view={view} onViewChange={onViewChange} />
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {isHomePage && onMobileFilterToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMobileFilterToggle}
                className="p-2"
              >
                <ApperIcon name="Filter" className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar - Full Width Below Header */}
        {isHomePage && (
          <div className="pb-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0, 
          height: mobileMenuOpen ? "auto" : 0 
        }}
        transition={{ duration: 0.2 }}
        className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
      >
        <div className="px-4 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isHomePage
                ? "bg-primary-100 text-primary-700"
                : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
            )}
          >
            Browse Properties
          </Link>
          <Link
            to="/saved"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "block px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between",
              isSavedPage
                ? "bg-primary-100 text-primary-700"
                : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
            )}
          >
            <span>Saved Properties</span>
            {savedProperties.length > 0 && (
              <span className="px-2 py-0.5 bg-error text-white text-xs rounded-full">
                {savedProperties.length}
              </span>
            )}
          </Link>
          
          {/* Mobile View Toggle */}
          {isHomePage && view && onViewChange && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">View</p>
              <ViewToggle view={view} onViewChange={onViewChange} />
            </div>
          )}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;