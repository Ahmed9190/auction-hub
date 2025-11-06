/**
 * Application routes
 * Centralized route definitions for type-safe navigation
 */

export const ROUTES = {
  // Public Routes
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: '/properties/:id',
  ABOUT: '/about',
  CONTACT: '/contact',

  // Authentication Routes
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password/:token',

  // Admin Routes
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PROPERTIES: '/admin/properties',
  ADMIN_PROPERTIES_CREATE: '/admin/properties/create',
  ADMIN_PROPERTIES_EDIT: '/admin/properties/:id/edit',
  ADMIN_CAMPAIGNS: '/admin/campaigns',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings',

  // User Routes
  USER_PROFILE: '/profile',
  USER_FAVORITES: '/favorites',

  // Error Routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  SERVER_ERROR: '/500',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * Helper function to check if route requires authentication
 */
export const isProtectedRoute = (route: string): boolean => {
  const protectedPaths = ['/admin', '/profile', '/favorites'];
  return protectedPaths.some((path) => route.startsWith(path));
};

/**
 * Helper function to check if route requires admin role
 */
export const isAdminRoute = (route: string): boolean => {
  return route.startsWith('/admin');
};