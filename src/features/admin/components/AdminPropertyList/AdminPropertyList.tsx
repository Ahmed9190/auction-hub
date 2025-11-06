import React, { useState } from 'react';
import { Button } from '../../../../components/atoms/Button/Button';
import { Icon } from '../../../../components/atoms/Icon/Icon';
import { Spinner } from '../../../../components/atoms/Spinner/Spinner';
import { logger } from '../../../../utils/logger';
import styles from './AdminPropertyList.module.css';

interface Property {
  id: string;
  title: string;
  price: number;
  status: string;
  bedrooms: number;
  area: number;
  views: number;
  featured: boolean;
}

interface AdminPropertyListProps {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  limit?: number;
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'فيلا فاخرة بحي النخيل',
    price: 2500000,
    status: 'for-sale',
    bedrooms: 4,
    area: 500,
    views: 1250,
    featured: true,
  },
  {
    id: '2',
    title: 'شقة عصرية بالدمام',
    price: 850000,
    status: 'for-sale',
    bedrooms: 3,
    area: 200,
    views: 580,
    featured: false,
  },
  {
    id: '3',
    title: 'عمارة سكنية جدة',
    price: 5000000,
    status: 'coming-soon',
    bedrooms: 6,
    area: 800,
    views: 920,
    featured: true,
  },
];

export const AdminPropertyList: React.FC<AdminPropertyListProps> = ({
  onEdit,
  onDelete,
  limit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const properties = limit ? MOCK_PROPERTIES.slice(0, limit) : MOCK_PROPERTIES;

  const handleDelete = (id: string, title: string) => {
    if (confirm(`هل تأكد من حذف العقار: ${title}؟`)) {
      try {
        onDelete?.(id);
        logger.info('Property deleted successfully', { propertyId: id });
      } catch (error) {
        logger.error('Failed to delete property', { error, propertyId: id });
      }
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <Spinner size="large" />
        </div>
      ) : properties.length === 0 ? (
        <div className={styles.empty}>
          <p>لا توجد عقارات</p>
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.cell}>العنوان</div>
            <div className={styles.cell}>السعر</div>
            <div className={styles.cell}>الحالة</div>
            <div className={styles.cell}>الغرف</div>
            <div className={styles.cell}>المساحة</div>
            <div className={styles.cell}>المشاهدات</div>
            <div className={styles.cell}>الإجراءات</div>
          </div>

          {properties.map((property) => (
            <div key={property.id} className={styles.row}>
              <div className={styles.cell}>
                <span className={styles.title}>{property.title}</span>
                {property.featured && <span className={styles.featured}>مميز</span>}
              </div>
              <div className={styles.cell}>
                {new Intl.NumberFormat('ar-SA').format(property.price)} ر.س
              </div>
              <div className={styles.cell}>
                <span className={`${styles.status} ${styles[`status-${property.status}`]}`}>
                  {property.status === 'for-sale' && 'للبيع'}
                  {property.status === 'rented' && 'للإيجار'}
                  {property.status === 'coming-soon' && 'قريباً'}
                  {property.status === 'sold' && 'تم البيع'}
                </span>
              </div>
              <div className={styles.cell}>{property.bedrooms}</div>
              <div className={styles.cell}>{property.area} م²</div>
              <div className={styles.cell}>{property.views}</div>
              <div className={styles.cell}>
                <div className={styles.actions}>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => onEdit?.(property.id)}
                    icon={<Icon name="edit" size="small" />}
                    aria-label="تعديل"
                    title="تعديل"
                  />
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => handleDelete(property.id, property.title)}
                    icon={<Icon name="trash" size="small" />}
                    aria-label="حذف"
                    title="حذف"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPropertyList;