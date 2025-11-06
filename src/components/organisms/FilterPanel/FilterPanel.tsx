import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';
import styles from './FilterPanel.module.css';
import type { FilterState } from '../../../features/properties/hooks/useFilterViewModel';

interface FilterPanelProps {
  filters: FilterState;
  onPriceChange: (min: number, max: number) => void;
  onStatusToggle: (status: string) => void;
  onBedroomToggle: (count: number) => void;
  onBathroomToggle: (count: number) => void;
  onAreaChange: (min: number, max: number) => void;
  onReset: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const statusOptions = [
  { value: 'for-sale', label: 'للبيع' },
  { value: 'rented', label: 'للإيجار' },
  { value: 'coming-soon', label: 'قريباً' },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onPriceChange,
  onStatusToggle,
  onBedroomToggle,
  onBathroomToggle,
  onAreaChange,
  onReset,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  return (
    <div className={`${styles.panel} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>الفلترات</h3>
        {onToggleCollapse && (
          <button
            className={styles.collapseButton}
            onClick={onToggleCollapse}
            aria-label="تبديل الفلترات"
          >
            ⌄
          </button>
        )}
      </div>

      {!isCollapsed && (
        <>
          <div className={styles.section}>
            <label className={styles.sectionTitle}>النوع</label>
            <div className={styles.options}>
              {statusOptions.map((option) => (
                <label key={option.value} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={filters.status.has(option.value)}
                    onChange={() => onStatusToggle(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.sectionTitle}>السعر (ريال)</label>
            <div className={styles.rangeInputs}>
              <input
                type="number"
                value={filters.priceMin}
                onChange={(e) => onPriceChange(Number(e.target.value), filters.priceMax)}
                placeholder="من"
                className={styles.rangeInput}
              />
              <input
                type="number"
                value={filters.priceMax}
                onChange={(e) => onPriceChange(filters.priceMin, Number(e.target.value))}
                placeholder="إلى"
                className={styles.rangeInput}
              />
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.sectionTitle}>عدد الغرف</label>
            <div className={styles.badges}>
              {[1, 2, 3, 4, 5].map((count) => (
                <Badge
                  key={count}
                  variant={filters.bedrooms.has(count) ? 'primary' : 'info'}
                  size="small"
                  onClick={() => onBedroomToggle(count)}
                  className={styles.badge}
                >
                  {count}
                </Badge>
              ))}
            </div>
          </div>

          <Button variant="outline" fullWidth onClick={onReset}>
            إعادة تعيين
          </Button>
        </>
      )}
    </div>
  );
};