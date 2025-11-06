import React from 'react';
import { Input, type InputProps } from '../../atoms/Input/Input';
import styles from './FormField.module.css';

interface FormFieldProps extends Omit<InputProps, 'label'> {
  label: string;
  isRequired?: boolean;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { label, isRequired, error, hint, fullWidth, ...inputProps },
    ref
  ) => {
    const hasError = !!error;
    const status = hasError ? 'error' : inputProps.status || 'default';

    return (
      <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
        <div className={styles.labelRow}>
          <label className={styles.label}>
            {label}
            {isRequired && <span className={styles.required}>*</span>}
          </label>
          {hint && <span className={styles.hint}>{hint}</span>}
        </div>
        <Input
          ref={ref}
          status={status}
          isRequired={isRequired}
          helperText={error}
          {...inputProps}
        />
      </div>
    );
  }
);

FormField.displayName = 'FormField';