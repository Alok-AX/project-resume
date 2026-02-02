// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001',
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
  
  // Resume endpoints (future)
  RESUME: {
    GET_ALL: '/api/resumes',
    GET_ONE: '/api/resumes/:id',
    CREATE: '/api/resumes',
    UPDATE: '/api/resumes/:id',
    DELETE: '/api/resumes/:id',
  },
  
  // Template endpoints (future)
  TEMPLATES: {
    GET_ALL: '/api/templates',
    GET_ONE: '/api/templates/:id',
  },
};

export default API_CONFIG;
