/**
 * Centralized toast notification utilities
 */

import toast from 'react-hot-toast';

/**
 * Show success toast notification
 */
export const showSuccess = (message: string): void => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
  });
};

/**
 * Show error toast notification
 */
export const showError = (message: string): void => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
  });
};

/**
 * Show loading toast notification
 * Returns toast ID for later dismissal
 */
export const showLoading = (message: string): string => {
  return toast.loading(message, {
    position: 'top-right',
  });
};

/**
 * Dismiss a specific toast
 */
export const dismissToast = (toastId: string): void => {
  toast.dismiss(toastId);
};

/**
 * Show info toast notification
 */
export const showInfo = (message: string): void => {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    icon: 'ℹ️',
  });
};

/**
 * Extract error message from error object
 * Handles different error response structures
 */
export const extractErrorMessage = (
  error: any,
  defaultMessage: string = 'An error occurred'
): string => {
  // Handle error objects with message property
  if (error?.message) {
    return error.message;
  }

  // Handle error objects with errors array
  if (error?.errors && Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors[0];
  }

  // Handle axios error responses
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  // Handle axios error responses with errors array
  if (error?.response?.data?.errors && Array.isArray(error.response.data.errors)) {
    return error.response.data.errors[0];
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  return defaultMessage;
};

/**
 * Show error toast with automatic error message extraction
 */
export const showErrorFromException = (
  error: any,
  defaultMessage: string = 'An error occurred'
): void => {
  const message = extractErrorMessage(error, defaultMessage);
  showError(message);
};
