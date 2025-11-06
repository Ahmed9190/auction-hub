import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../atoms/Input/Input';
import { Icon } from '../../atoms/Icon/Icon';
import styles from './SearchField.module.css';

interface SearchFieldProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  debounceMs?: number;
  initialValue?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  placeholder = 'ابحث عن العقارات...',
  onSearch,
  onClear,
  debounceMs = 300,
  initialValue = '',
}) => {
  const [query, setQuery] = useState(initialValue);
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, debounceMs);
  };

  const handleClear = () => {
    setQuery('');
    onClear?.();
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        icon={<Icon name="search" size="medium" />}
        iconPosition="left"
      />
      {query && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="مسح البحث"
          type="button"
        >
          <Icon name="close" size="small" />
        </button>
      )}
    </div>
  );
};