/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GOOGLE_MAPS_KEY: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_ERROR_REPORTING: string;
  readonly VITE_DEBUG_MODE: string;
  readonly VITE_GTAG_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}