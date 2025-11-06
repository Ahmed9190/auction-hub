import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { ENV } from '../../constants/env';
import { logger } from '../../utils/logger';
import { API_ENDPOINTS } from './endpoints';

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

export class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: ENV.API_BASE_URL,
      timeout: ENV.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        logger.debug('API Request', {
          method: config.method?.toUpperCase(),
          url: config.url,
        });
        return config;
      },
      (error: unknown) => {
        if (error instanceof Error) {
          logger.error('Request interceptor error', { error: error.message });
        } else {
          logger.error('Unknown request interceptor error', { error });
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        logger.debug('API Response', {
          method: response.config.method?.toUpperCase(),
          url: response.config.url,
          status: response.status,
        });
        return response;
      },
      (error: unknown) => {
        this.handleRequestError(error);
      }
    );
  }

  private handleRequestError(error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.response?.status === 401) {
        this.logout();
        logger.warn('Unauthorized - Logging out');
      }

      logger.error('API Error', {
        status: axiosError.response?.status,
        url: axiosError.config?.url,
        message: axiosError.message,
      });
    } else if (error instanceof Error) {
      logger.error('API Error', { message: error.message });
    } else {
      logger.error('Unknown API Error', { error });
    }

    return Promise.reject(error);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('authToken');
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Generic GET request
  async get<T = unknown>(url: string, config?: Record<string, unknown>): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  async post<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    config?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  async put<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    config?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  async delete<T = unknown>(url: string, config?: Record<string, unknown>): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  async patch<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    config?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  }

  async register(data: Record<string, unknown>) {
    return this.post(API_ENDPOINTS.AUTH.REGISTER, data);
  }

  async getCurrentUser() {
    return this.get(API_ENDPOINTS.AUTH.ME);
  }

  // Properties endpoints
  async getProperties(params?: Record<string, unknown>) {
    return this.get(API_ENDPOINTS.PROPERTIES.LIST, { params });
  }

  async getProperty(id: string) {
    return this.get(API_ENDPOINTS.PROPERTIES.GET(id));
  }

  async createProperty(data: FormData) {
    return this.client.post(API_ENDPOINTS.PROPERTIES.CREATE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async updateProperty(id: string, data: FormData) {
    return this.client.put(`${API_ENDPOINTS.PROPERTIES.UPDATE}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async deleteProperty(id: string) {
    return this.delete(API_ENDPOINTS.PROPERTIES.DELETE(id));
  }

  // Contact endpoint
  async submitContact(data: Record<string, unknown>) {
    return this.post(API_ENDPOINTS.CONTACT, data);
  }
}

export const apiClient = new ApiClient();