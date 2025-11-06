export const colors = {
  // Brand Colors - Saudi Market Professional
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0891b2',
    600: '#0e7490',
    700: '#155e75',
    900: '#164e63',
  },
  secondary: {
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Neutral Palette
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Surfaces
  surface: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
    inverse: '#1f2937',
  },

  // Text Colors
  text: {
    primary: '#111827',
    secondary: '#4b5563',
    tertiary: '#9ca3af',
    inverse: '#ffffff',
  },
};

export const darkMode = {
  primary: { ...colors.primary },
  secondary: { ...colors.secondary },
  gray: {
    50: '#111827',
    100: '#1f2937',
    200: '#374151',
    300: '#4b5563',
    400: '#6b7280',
    500: '#9ca3af',
    600: '#d1d5db',
    700: '#e5e7eb',
    800: '#f3f4f6',
    900: '#f9fafb',
  },
  surface: {
    primary: '#1f2937',
    secondary: '#111827',
    tertiary: '#0f172a',
    inverse: '#ffffff',
  },
  text: {
    primary: '#f9fafb',
    secondary: '#d1d5db',
    tertiary: '#9ca3af',
    inverse: '#111827',
  },
};