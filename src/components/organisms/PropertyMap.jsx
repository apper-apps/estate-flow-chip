import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button';
import { formatPrice, formatBedsBaths } from '@/utils/formatters';
import propertyService from '@/services/api/propertyService';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom property marker icon
const createPropertyIcon = (type, price) => {
  const color = price > 1000000 ? '#DC2626' : price > 500000 ? '#F59E0B' : '#22C55E';
  
  return L.divIcon({
    html: `
      <div class="property-marker" style="
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">
        ${type === 'house' ? '🏠' : type === 'condo' ? '🏢' : type === 'townhouse' ? '🏘️' : '🏠'}
      </div>
    `,
    className: 'custom-property-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

function PropertyMap({ properties, className = '' }) {
  const navigate = useNavigate();
  const [propertiesWithCoords, setPropertiesWithCoords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPropertiesWithCoordinates = async () => {
      try {
        setLoading(true);
        // Add coordinates to properties
        const propertiesWithCoordinates = properties.map(property => ({
          ...property,
          coordinates: propertyService.getCoordinatesForProperty(property)
        }));
        setPropertiesWithCoords(propertiesWithCoordinates);
      } catch (error) {
        console.error('Error loading property coordinates:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPropertiesWithCoordinates();
  }, [properties]);

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  if (loading) {
    return (
      <div className={`h-96 bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  // Calculate center point from all properties
  const center = propertiesWithCoords.length > 0 
    ? propertiesWithCoords.reduce(
        (acc, property) => [
          acc[0] + property.coordinates[0] / propertiesWithCoords.length,
          acc[1] + property.coordinates[1] / propertiesWithCoords.length
        ],
        [0, 0]
      )
    : [34.0522, -118.2437]; // Default to LA

  return (
    <div className={`h-96 lg:h-[600px] rounded-lg overflow-hidden shadow-card ${className}`}>
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MarkerClusterGroup
          chunkedLoading
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
          maxClusterRadius={50}
        >
          {propertiesWithCoords.map((property) => (
            <Marker
              key={property.Id}
              position={property.coordinates}
              icon={createPropertyIcon(property.type, property.price)}
            >
              <Popup
                closeButton={true}
                className="property-popup"
                maxWidth={320}
              >
                <div className="p-2 min-w-[280px]">
                  {/* Property Image */}
                  <div className="relative mb-3">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=200&fit=crop';
                      }}
                    />
                    <Badge
                      variant="secondary"
                      className="absolute top-2 left-2 bg-white/90 text-gray-800"
                    >
                      {property.type}
                    </Badge>
                  </div>

                  {/* Property Details */}
                  <div className="space-y-2">
                    <h3 className="font-display font-semibold text-lg text-gray-900 leading-tight">
                      {property.title}
                    </h3>
                    
                    <p className="text-2xl font-bold text-primary-600">
                      {formatPrice(property.price)}
                    </p>

                    <div className="flex items-center text-gray-600 text-sm">
                      <ApperIcon name="MapPin" size={14} className="mr-1" />
                      <span>{property.address}, {property.city}, {property.state}</span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <ApperIcon name="Bed" size={14} className="mr-1" />
                        <span>{formatBedsBaths(property.bedrooms, property.bathrooms)}</span>
                      </div>
                      <div className="flex items-center">
                        <ApperIcon name="Square" size={14} className="mr-1" />
                        <span>{property.squareFeet?.toLocaleString()} sq ft</span>
                      </div>
                    </div>

                    {/* Features */}
                    {property.features && property.features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {property.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {property.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      onClick={() => handlePropertyClick(property.Id)}
                      className="w-full mt-3"
                      size="sm"
                    >
                      View Details
                      <ApperIcon name="ArrowRight" size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default PropertyMap;