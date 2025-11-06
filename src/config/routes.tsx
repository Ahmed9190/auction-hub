import React, { lazy, Suspense } from "react";
import { type RouteObject, Navigate } from "react-router-dom";
import { MainLayout } from "../components/templates/MainLayout/MainLayout";
import { ErrorBoundary } from "../components/templates/ErrorBoundary/ErrorBoundary";

// ⚠️ CRITICAL: NO .catch() or error handling in lazy imports
// The Chrome extension intercepts console.error and fails
const HomepageScreen = lazy(() => import("../features/homepage/screens/HomepageScreen"));

const PropertyDetailScreen = lazy(() => import("../features/properties/screens/PropertyDetailScreen"));

const ContactPageScreen = lazy(() => import("../features/contact/screens/ContactPageScreen"));

const AboutPageScreen = lazy(() => import("../features/about/screens/AboutPageScreen"));

const LoginScreen = lazy(() => import("../features/auth/screens/LoginScreen"));

const RegisterScreen = lazy(() => import("../features/auth/screens/RegisterScreen"));

const AdminDashboardScreen = lazy(() => import("../features/admin/screens/AdminDashboardScreen"));

const NotFoundScreen = lazy(() => import("../components/templates/NotFound/NotFoundScreen"));

/**
 * Loading fallback
 */
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-gray-100) 100%)",
      fontFamily: "var(--font-family-base)",
    }}
  >
    <div
      style={{
        display: "inline-block",
        width: "40px",
        height: "40px",
        border: "4px solid var(--color-gray-300)",
        borderTop: "4px solid var(--color-primary-600)",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginBottom: "16px",
      }}
    />
    <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>جاري التحميل...</p>

    <style>{`
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

/**
 * Routes configuration
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <HomepageScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "properties",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <PropertyDetailScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "properties/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <PropertyDetailScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <ContactPageScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <AboutPageScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <LoginScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <RegisterScreen />
            </ErrorBoundary>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary>
          <AdminDashboardScreen />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/404",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary>
          <NotFoundScreen />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];
