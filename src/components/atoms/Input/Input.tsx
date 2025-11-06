import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: 'default' | 'error' | 'success';
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isRequired?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      status = 'default',
      helperText,
      icon,
      iconPosition = 'left',
      isRequired,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label}>
            {label}
            {isRequired && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputContainer}>
          {icon && iconPosition === 'left' && (
            <span className={styles.iconLeft}>{icon}</span>
          )}
          <input
            ref={ref}
            className={[styles.input, styles[`status-${status}`], className]
              .filter(Boolean)
              .join(' ')}
            aria-invalid={status === 'error'}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <span className={styles.iconRight}>{icon}</span>
          )}
        </div>
        {helperText && (
          <span className={[styles.helperText, styles[`status-${status}`]].join(' ')}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';