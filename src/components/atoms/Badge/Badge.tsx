import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'medium',
  icon,
  children,
  className,
}) => {
  const classNames = [styles.badge, styles[`variant-${variant}`], styles[`size-${size}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
};