import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { logger } from "./utils/logger";

// Performance monitoring
if (import.meta.env.PROD) {
  // Web Vitals monitoring - using static import
  import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  }).catch((error) => {
    console.warn('Failed to load web-vitals:', error);
  });
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  logger.info("Application mounted successfully");
} catch (error) {
  logger.error("Failed to mount application", {
    error: error instanceof Error ? error.message : String(error),
  });

  // Fallback error UI
  rootElement.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: system-ui, -apple-system, sans-serif;
      color: white;
    ">
      <div style="text-align: center;">
        <h1>🔴 خطأ في التطبيق</h1>
        <p>عذراً، فشل تحميل التطبيق. يرجى تحديث الصفحة.</p>
      </div>
    </div>
  `;
}

// Hot Module Replacement (HMR) for development
if (import.meta.hot) {
  import.meta.hot.accept();
}
