import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`${styles.spinner} ${styles[`size-${size}`]} ${styles[`color-${color}`]}`}>
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
};