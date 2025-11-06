import { useCallback, useState } from 'react';

export interface FilterState {
  priceMin: number;
  priceMax: number;
  status: Set<string>;
  bedrooms: Set<number>;
  bathrooms: Set<number>;
  areaMin: number;
  areaMax: number;
  location: string;
}

export const useFilterViewModel = () => {
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 1000000,
    status: new Set(),
    bedrooms: new Set(),
    bathrooms: new Set(),
    areaMin: 0,
    areaMax: 1000,
    location: '',
  });

  const updatePriceRange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({ ...prev, priceMin: min, priceMax: max }));
  }, []);

  const toggleStatus = useCallback((status: string) => {
    setFilters((prev) => {
      const newSet = new Set(prev.status);
      if (newSet.has(status)) {
        newSet.delete(status);
      } else {
        newSet.add(status);
      }
      return { ...prev, status: newSet };
    });
  }, []);

  const toggleBedroom = useCallback((count: number) => {
    setFilters((prev) => {
      const newSet = new Set(prev.bedrooms);
      if (newSet.has(count)) {
        newSet.delete(count);
      } else {
        newSet.add(count);
      }
      return { ...prev, bedrooms: newSet };
    });
  }, []);

  const toggleBathroom = useCallback((count: number) => {
    setFilters((prev) => {
      const newSet = new Set(prev.bathrooms);
      if (newSet.has(count)) {
        newSet.delete(count);
      } else {
        newSet.add(count);
      }
      return { ...prev, bathrooms: newSet };
    });
  }, []);

  const updateAreaRange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({ ...prev, areaMin: min, areaMax: max }));
  }, []);

  const updateLocation = useCallback((location: string) => {
    setFilters((prev) => ({ ...prev, location }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      priceMin: 0,
      priceMax: 1000000,
      status: new Set(),
      bedrooms: new Set(),
      bathrooms: new Set(),
      areaMin: 0,
      areaMax: 1000,
      location: '',
    });
  }, []);

  return {
    filters,
    updatePriceRange,
    toggleStatus,
    toggleBedroom,
    toggleBathroom,
    updateAreaRange,
    updateLocation,
    resetFilters,
  };
};