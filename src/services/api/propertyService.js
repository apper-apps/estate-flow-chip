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
}

export default new PropertyService();