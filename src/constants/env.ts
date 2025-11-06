export const ENV = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://api.example.com" : "http://localhost:3000/api"),
  API_TIMEOUT: 30000,

  // App Configuration
  APP_NAME: "عقارات - Real Estate Platform",
  APP_VERSION: "1.0.0",
  ENVIRONMENT: (import.meta.env.MODE as "development" | "staging" | "production") || "development",
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,

  // Feature Flags
  FEATURES: {
    ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
    ENABLE_ERROR_REPORTING: import.meta.env.VITE_ENABLE_ERROR_REPORTING === "true",
    ENABLE_DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === "true",
  },

  // Third-party Services
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_KEY || "",
  WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER || "+966501234567",

  // Cache Configuration
  CACHE_DURATION: 5 * 60 * 1000,
  SESSION_TIMEOUT: 30 * 60 * 1000,

  // Analytics
  GTAG_ID: import.meta.env.VITE_GTAG_ID || "",
} as const;

export const validateEnvironment = () => {
  const required = import.meta.env.PROD ? ["VITE_API_URL"] : [];
  const missing = required.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    console.warn("Missing environment variables:", missing);
  }
};
