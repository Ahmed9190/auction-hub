import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  direction: 'ltr' | 'rtl';
  setTheme: (theme: 'light' | 'dark') => void;
  setDirection: (dir: 'ltr' | 'rtl') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
  defaultDirection?: 'ltr' | 'rtl';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  defaultDirection = 'ltr',
}) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>(defaultTheme);
  const [direction, setDirectionState] = useState<'ltr' | 'rtl'>(defaultDirection);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
  }, [direction]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        direction,
        setTheme: setThemeState,
        setDirection: setDirectionState,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};