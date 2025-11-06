import React from 'react';
import styles from './StatusIndicator.module.css';

type PropertyStatus = 'for-sale' | 'sold' | 'coming-soon' | 'rented';

interface StatusIndicatorProps {
  status: PropertyStatus;
  showLabel?: boolean;
}

const statusConfig: Record<PropertyStatus, { label: string; color: string }> = {
  'for-sale': { label: 'للبيع', color: 'primary' },
  'sold': { label: 'تم البيع', color: 'success' },
  'coming-soon': { label: 'قريباً', color: 'warning' },
  'rented': { label: 'للإيجار', color: 'info' },
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showLabel = true,
}) => {
  const config = statusConfig[status];

  return (
    <div className={`${styles.indicator} ${styles[`status-${status}`]}`}>
      <span className={styles.dot} />
      {showLabel && <span className={styles.label}>{config.label}</span>}
    </div>
  );
};