import { useEffect, useState, useCallback } from 'react';
import { apiClient } from '../../../services/api/client';

interface Property {
  id: string;
  title: string;
  price: number;
  [key: string]: any;
}

export const useProperties = (filters?: Record<string, any>) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getProperties(filters);
      setProperties(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, isLoading, error, refetch: fetchProperties };
};