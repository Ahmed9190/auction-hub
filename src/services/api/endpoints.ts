/**
 * API Endpoints
 * Centralized API endpoint definitions
 */

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Properties
  PROPERTIES: {
    LIST: '/properties',
    CREATE: '/properties',
    GET: (id: string) => `/properties/${id}`,
    UPDATE: (id: string) => `/properties/${id}`,
    DELETE: (id: string) => `/properties/${id}`,
    UPLOAD_IMAGES: (id: string) => `/properties/${id}/images`,
    SEARCH: '/properties/search',
  },

  // Campaigns
  CAMPAIGNS: {
    LIST: '/campaigns',
    CREATE: '/campaigns',
    GET: (id: string) => `/campaigns/${id}`,
    UPDATE: (id: string) => `/campaigns/${id}`,
    DELETE: (id: string) => `/campaigns/${id}`,
    TRACK: '/campaigns/track',
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    PROPERTY_VIEWS: (id: string) => `/analytics/properties/${id}/views`,
    CAMPAIGN_METRICS: (id: string) => `/analytics/campaigns/${id}`,
  },

  // Contact
  CONTACT: '/contact',

  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    FAVORITES: '/user/favorites',
    ADD_FAVORITE: '/user/favorites',
    REMOVE_FAVORITE: (id: string) => `/user/favorites/${id}`,
  },
} as const;