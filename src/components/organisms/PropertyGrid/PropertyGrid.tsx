import React, { useState, useCallback } from 'react';
import { PropertyCard } from '../../molecules/PropertyCard/PropertyCard';
import { Spinner } from '../../atoms/Spinner/Spinner';
import styles from './PropertyGrid.module.css';

interface Property {
  id: string;
  title: string;
  price: number;
  image: string;
  status: 'for-sale' | 'sold' | 'coming-soon' | 'rented';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  location: string;
  featured?: boolean;
}

interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
  onPropertyClick?: (id: string) => void;
  onFavoriteClick?: (id: string) => void;
  favoriteIds?: Set<string>;
  columns?: number;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  isLoading = false,
  onPropertyClick,
  onFavoriteClick,
  favoriteIds = new Set(),
  columns = 3,
}) => {
  const handlePropertyClick = useCallback(
    (id: string) => {
      onPropertyClick?.(id);
    },
    [onPropertyClick]
  );

  const handleFavoriteClick = useCallback(
    (id: string) => {
      onFavoriteClick?.(id);
    },
    [onFavoriteClick]
  );

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" />
        <p>جاري تحميل العقارات...</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>لا توجد عقارات متاحة</p>
      </div>
    );
  }

  return (
    <div
      className={styles.grid}
      style={{ '--grid-columns': columns } as React.CSSProperties}
    >
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          {...property}
          onClick={() => handlePropertyClick(property.id)}
          onFavorite={() => handleFavoriteClick(property.id)}
          isFavorited={favoriteIds.has(property.id)}
        />
      ))}
    </div>
  );
};