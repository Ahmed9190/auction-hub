import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { apiClient } from '../../services/api/client';
import { logger } from '../../utils/logger';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User; token: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: Record<string, any>) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  token: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        token: action.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          apiClient.setToken(token);
          // Verify token with backend
          const response = await apiClient.get('/auth/me');
          dispatch({ type: 'SET_USER', payload: response.data.user, token });
        }
      } catch (error) {
        logger.warn('Failed to restore authentication session');
        localStorage.removeItem('authToken');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiClient.post('/auth/login', { email, password });
      const { user, token } = response.data;

      apiClient.setToken(token);
      localStorage.setItem('authToken', token);

      dispatch({ type: 'SET_USER', payload: user, token });
      logger.info('User logged in successfully', { userId: user.id });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: message });
      logger.error('Login failed', { error: message });
      throw error;
    }
  }, []);

  const register = useCallback(async (data: Record<string, any>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiClient.post('/auth/register', data);
      const { user, token } = response.data;

      apiClient.setToken(token);
      localStorage.setItem('authToken', token);

      dispatch({ type: 'SET_USER', payload: user, token });
      logger.info('User registered successfully', { userId: user.id });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'SET_ERROR', payload: message });
      logger.error('Registration failed', { error: message });
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    apiClient.logout();
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
    logger.info('User logged out');
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const updateUser = useCallback(async (data: Partial<User>) => {
    try {
      const response = await apiClient.put('/auth/profile', data);
      dispatch({ type: 'SET_USER', payload: response.data.user, token: state.token! });
      logger.info('User profile updated');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  }, [state.token]);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};