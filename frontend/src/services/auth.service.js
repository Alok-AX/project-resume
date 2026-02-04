import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

// Auth Service
export const authService = {
  // Signup
  signup: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login
  login: async (credentials) => {
    try {
      console.log('Auth service: Sending login request...');
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      console.log('Auth service: Login response:', response.data);
      return response;
    } catch (error) {
      console.error('Auth service: Login error:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Get current user
  getMe: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;
