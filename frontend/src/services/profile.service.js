import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

// Profile Service
export const profileService = {
  // Get profile
  getProfile: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PROFILE.GET);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.PROFILE.UPDATE, profileData);
      return response;
    } catch (error) {
      // Throw the complete error object for better handling
      throw error.response?.data || { message: error.message };
    }
  },
};

export default profileService;
