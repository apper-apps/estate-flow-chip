export const formatPrice = (price) => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}K`;
  } else {
    return `$${price.toLocaleString()}`;
  }
};

export const formatSquareFeet = (sqft) => {
  return sqft ? sqft.toLocaleString() : "N/A";
};

export const formatAddress = (address, city, state) => {
  return `${address}, ${city}, ${state}`;
};

export const formatListingDate = (date) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

export const formatBedsBaths = (beds, baths) => {
  const bedText = beds === 1 ? "bed" : "beds";
  const bathText = baths === 1 ? "bath" : "baths";
  return `${beds} ${bedText}, ${baths} ${bathText}`;
};