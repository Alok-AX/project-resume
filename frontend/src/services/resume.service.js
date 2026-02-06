import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

// Resume Service
export const resumeService = {
  // Create new resume
  createResume: async (resumeData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RESUME.CREATE, resumeData);
      return response;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Get all user's resumes
  getResumes: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = queryParams ? `${API_ENDPOINTS.RESUME.GET_ALL}?${queryParams}` : API_ENDPOINTS.RESUME.GET_ALL;
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Get single resume by ID
  getResumeById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.RESUME.GET_ONE(id));
      return response;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Update resume
  updateResume: async (id, resumeData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.RESUME.UPDATE(id), resumeData);
      return response;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Delete resume
  deleteResume: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.RESUME.DELETE(id));
      return response;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Duplicate resume
  duplicateResume: async (id) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RESUME.DUPLICATE(id));
      return response;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },
};

export default resumeService;
