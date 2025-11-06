import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './design-system/context/ThemeProvider';
import { AuthProvider } from './design-system/context/AuthProvider';
import { ErrorBoundary } from './components/templates/ErrorBoundary/ErrorBoundary';
import { routes } from './config/routes';
import { validateEnvironment } from './constants/env';
import { logger } from './utils/logger';
import './design-system/styles/globals.css';

// Initialize app
try {
  validateEnvironment();
} catch (error) {
  logger.error('Failed to validate environment', {
    error: error instanceof Error ? error.message : String(error),
  });
  throw error;
}

const router = createBrowserRouter(routes, {
  basename: '/',
});

const App: React.FC = () => {
  useEffect(() => {
    logger.info('Application initialized', {
      environment: import.meta.env.MODE,
      timestamp: new Date().toISOString(),
    });

    /**
     * Handle unhandled promise rejections
     */
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      logger.error('Unhandled promise rejection', {
        reason: event.reason instanceof Error ? event.reason.message : String(event.reason),
      });
    };

    /**
     * Handle global errors - safely serialize error information
     */
    const handleError = (event: ErrorEvent) => {
      try {
        logger.error('Global error', {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        });
      } catch (logError) {
        console.error('Failed to log global error:', event.message);
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" defaultDirection="rtl">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;