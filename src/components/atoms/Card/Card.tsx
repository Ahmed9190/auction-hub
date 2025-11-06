import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  elevation = 'md',
  padding = 'md',
  hoverable = false,
  onClick,
}) => {
  const classNames = [
    styles.card,
    styles[`elevation-${elevation}`],
    styles[`padding-${padding}`],
    hoverable && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
};