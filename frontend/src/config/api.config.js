// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001ss',
  TIMEOUT: 30000,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    SIGNUP: '/api/auth/signup',
    LOGIN: '/api/auth/login',
    ME: '/api/auth/me',
    LOGOUT: '/api/auth/logout',
  },
  
  // Profile endpoints
  PROFILE: {
    GET: '/api/profile',
    UPDATE: '/api/profile',
  },
  
  // Resume endpoints
  RESUME: {
    GET_ALL: '/api/resumes',
    GET_ONE: (id) => `/api/resumes/${id}`,
    CREATE: '/api/resumes',
    UPDATE: (id) => `/api/resumes/${id}`,
    DELETE: (id) => `/api/resumes/${id}`,
    DUPLICATE: (id) => `/api/resumes/${id}/duplicate`,
  },
  
  // Template endpoints (future)
  TEMPLATES: {
    GET_ALL: '/api/templates',
    GET_ONE: '/api/templates/:id',
  },
};

export default API_CONFIG;
