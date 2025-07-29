import { useLocalStorage } from "@/hooks/useLocalStorage";

export function useSavedProperties() {
  const [savedProperties, setSavedProperties] = useLocalStorage("savedProperties", []);

  const isSaved = (propertyId) => {
    return savedProperties.some(saved => saved.propertyId === propertyId);
  };

  const saveProperty = (propertyId) => {
    if (!isSaved(propertyId)) {
      const newSaved = {
        propertyId,
        savedDate: new Date().toISOString()
      };
      setSavedProperties(prev => [...prev, newSaved]);
      return true;
    }
    return false;
  };

  const unsaveProperty = (propertyId) => {
    setSavedProperties(prev => prev.filter(saved => saved.propertyId !== propertyId));
  };

  const toggleSaved = (propertyId) => {
    if (isSaved(propertyId)) {
      unsaveProperty(propertyId);
      return false;
    } else {
      saveProperty(propertyId);
      return true;
    }
  };

  return {
    savedProperties,
    isSaved,
    saveProperty,
    unsaveProperty,
    toggleSaved
  };
}