import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { ENV } from '../../constants/env';
import { logger } from '../../utils/logger';
import { API_ENDPOINTS } from './endpoints';

export interface ApiResponse<T = any> {
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
      (error) => {
        logger.error('Request interceptor error', { error });
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
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.logout();
          logger.warn('Unauthorized - Logging out');
        }

        logger.error('API Error', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
        });

        return Promise.reject(error);
      }
    );
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
  async get<T = any>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  // Generic POST request
  async post<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  // Generic PUT request
  async put<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  // Generic DELETE request
  async delete<T = any>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  // Generic PATCH request
  async patch<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  }

  async register(data: Record<string, any>) {
    return this.post(API_ENDPOINTS.AUTH.REGISTER, data);
  }

  async getCurrentUser() {
    return this.get(API_ENDPOINTS.AUTH.ME);
  }

  // Properties endpoints
  async getProperties(params?: Record<string, any>) {
    return this.get(API_ENDPOINTS.PROPERTIES.LIST, { params });
  }

  async getProperty(id: string) {
    return this.get(API_ENDPOINTS.PROPERTIES.GET(id));
  }

  async createProperty(data: FormData) {
    return this.post(API_ENDPOINTS.PROPERTIES.CREATE, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async updateProperty(id: string, data: FormData) {
    return this.put(API_ENDPOINTS.PROPERTIES.UPDATE(id), data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async deleteProperty(id: string) {
    return this.delete(API_ENDPOINTS.PROPERTIES.DELETE(id));
  }

  // Contact endpoint
  async submitContact(data: Record<string, any>) {
    return this.post(API_ENDPOINTS.CONTACT, data);
  }
}

export const apiClient = new ApiClient();