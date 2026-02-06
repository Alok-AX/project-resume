import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import { getToken, clearAuthData } from '../utils/auth';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      // Check if we're already on login page to prevent redirect loop
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      if (!currentPath.includes('/login')) {
        clearAuthData();
        // Use setTimeout to prevent redirect during render
        setTimeout(() => {
          window.location.href = '/login';
        }, 0);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
