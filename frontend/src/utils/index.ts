/**
 * Central exports for all utility functions
 */

// Auth utilities
export {
  saveAuthData,
  getToken,
  getUser,
  isAuthenticated,
  clearAuthData,
  getAuthHeader,
  type User,
} from './auth';

// Form utilities
export {
  handleFormChange,
  createFormChangeHandler,
  resetForm,
  hasFormChanges,
} from './form';

// Toast utilities
export {
  showSuccess,
  showError,
  showLoading,
  dismissToast,
  showInfo,
  extractErrorMessage,
  showErrorFromException,
} from './toast';

// Validation utilities
export {
  isValidEmail,
  isValidUrl,
  isValidLinkedInUrl,
  isStrongPassword,
  isValidFileSize,
  isValidFileType,
  isValidImage,
  isValidLength,
  isRequired,
} from './validation';

// Storage utilities
export { sessionStorage } from './storage';

// File upload utilities
export { validatePdfFile, handlePdfUpload, readFileAsDataURL } from './fileUpload';
