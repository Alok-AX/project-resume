import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import { clearAuthData } from '../utils/auth';

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
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return response;
    } catch (error) {
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
    clearAuthData();
  },
};

export default authService;
