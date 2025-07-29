import propertiesData from "@/services/mockData/properties.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PropertyService {
  constructor() {
    this.properties = [...propertiesData];
  }

  async getAll(filters = {}, searchTerm = "") {
    await delay(300);
    
    let filteredProperties = [...this.properties];

    // Apply search term
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filteredProperties = filteredProperties.filter(property =>
        property.title.toLowerCase().includes(term) ||
        property.address.toLowerCase().includes(term) ||
        property.city.toLowerCase().includes(term) ||
        property.state.toLowerCase().includes(term) ||
        property.description.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.priceMin) {
      filteredProperties = filteredProperties.filter(p => p.price >= filters.priceMin);
    }

    if (filters.priceMax) {
      filteredProperties = filteredProperties.filter(p => p.price <= filters.priceMax);
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      filteredProperties = filteredProperties.filter(p => 
        filters.propertyType.includes(p.type)
      );
    }

    if (filters.bedroomsMin) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms >= filters.bedroomsMin);
    }

    if (filters.bathroomsMin) {
      filteredProperties = filteredProperties.filter(p => p.bathrooms >= filters.bathroomsMin);
    }

    if (filters.squareFeetMin) {
      filteredProperties = filteredProperties.filter(p => p.squareFeet >= filters.squareFeetMin);
    }

    if (filters.squareFeetMax) {
      filteredProperties = filteredProperties.filter(p => p.squareFeet <= filters.squareFeetMax);
    }

    return filteredProperties.map(property => ({ ...property }));
  }

  async getById(id) {
    await delay(200);
    
    const property = this.properties.find(p => p.Id === parseInt(id));
    if (!property) {
      throw new Error("Property not found");
    }
    
    return { ...property };
  }

  async getSavedProperties(savedPropertyIds) {
    await delay(250);
    
    const savedProperties = this.properties.filter(property => 
      savedPropertyIds.some(saved => saved.propertyId === property.Id.toString())
    );
    
    return savedProperties.map(property => ({ ...property }));
  }

  async getRelatedProperties(propertyId, limit = 3) {
    await delay(200);
    
    const currentProperty = this.properties.find(p => p.Id === parseInt(propertyId));
    if (!currentProperty) {
      return [];
    }

    // Find properties in similar price range and same type
    const priceRange = currentProperty.price * 0.3;
    const related = this.properties.filter(p => 
      p.Id !== parseInt(propertyId) &&
      Math.abs(p.price - currentProperty.price) <= priceRange &&
      (p.type === currentProperty.type || p.city === currentProperty.city)
    );

return related.slice(0, limit).map(property => ({ ...property }));
  }

  async getPropertiesWithCoordinates(filters = {}, searchTerm = "") {
    const properties = await this.getAll(filters, searchTerm);
    
    // Add mock coordinates based on property location
    // In a real app, this would use a geocoding service
    return properties.map(property => ({
      ...property,
      coordinates: this.getCoordinatesForProperty(property)
    }));
  }

  getCoordinatesForProperty(property) {
    // Mock coordinates for California cities
    const cityCoordinates = {
      'Westfield': [34.0522, -118.2437],
      'San Francisco': [37.7749, -122.4194],
      'Los Angeles': [34.0522, -118.2437],
      'Sacramento': [38.5816, -121.4944],
      'Malibu': [34.0259, -118.7798],
      'Beverly Hills': [34.0736, -118.4004],
      'Santa Barbara': [34.4208, -119.6982],
      'Palo Alto': [37.4419, -122.1430],
      'San Diego': [32.7157, -117.1611],
      'Fresno': [36.7378, -119.7871],
      'Lake Tahoe': [39.0968, -120.0324]
    };

    const baseCoords = cityCoordinates[property.city] || [34.0522, -118.2437];
    
    // Add small random offset to spread properties within city
    const offset = 0.01;
    return [
      baseCoords[0] + (Math.random() - 0.5) * offset,
      baseCoords[1] + (Math.random() - 0.5) * offset
    ];
  }
}

export default new PropertyService();