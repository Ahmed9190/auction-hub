import React from 'react';
import { Card } from '../../atoms/Card/Card';
import { Badge } from '../../atoms/Badge/Badge';
import { StatusIndicator } from '../../atoms/StatusIndicator/StatusIndicator';
import { Icon } from '../../atoms/Icon/Icon';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  currency?: 'SAR' | 'USD';
  image: string;
  status: 'for-sale' | 'sold' | 'coming-soon' | 'rented';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  location: string;
  featured?: boolean;
  onClick?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  price,
  currency = 'SAR',
  image,
  status,
  bedrooms,
  bathrooms,
  area,
  location,
  featured = false,
  onClick,
  onFavorite,
  isFavorited = false,
}) => {
  const formattedPrice = new Intl.NumberFormat('ar-SA').format(price);

  return (
    <Card
      className={styles.card}
      hoverable
      onClick={onClick}
      elevation="md"
      padding="none"
    >
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        {featured && (
          <Badge variant="secondary" className={styles.featuredBadge}>
            مميز
          </Badge>
        )}
        <StatusIndicator status={status} showLabel={true} />
        <button
          className={`${styles.favoriteButton} ${isFavorited ? styles.favorited : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.();
          }}
          aria-label={isFavorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        >
          <Icon name="heart" size="medium" />
        </button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.priceRow}>
          <span className={styles.price}>
            {formattedPrice} {currency}
          </span>
        </div>

        <p className={styles.location}>
          <Icon name="location" size="small" />
          {location}
        </p>

        <div className={styles.specs}>
          {bedrooms && (
            <div className={styles.spec}>
              <Icon name="home" size="small" />
              <span>{bedrooms} غرفة</span>
            </div>
          )}
          {bathrooms && (
            <div className={styles.spec}>
              <Icon name="water" size="small" />
              <span>{bathrooms} حمام</span>
            </div>
          )}
          <div className={styles.spec}>
            <Icon name="square" size="small" />
            <span>{area} م²</span>
          </div>
        </div>
      </div>
    </Card>
  );
};