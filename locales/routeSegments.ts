// Maps canonical route keys to their localized slugs per language
export const routeSegmentMap = {
  aktuellt: {
    sv: "aktuellt",
    en: "current",
  },
  // Add more mappings as needed
};

// Reverse map: from localized slug to canonical key
export const reverseRouteSegmentMap = {
  sv: {
    aktuellt: "aktuellt",
  },
  en: {
    current: "aktuellt",
  },
};
