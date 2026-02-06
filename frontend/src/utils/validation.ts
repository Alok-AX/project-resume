/**
 * Common validation utilities
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate LinkedIn URL
 */
export const isValidLinkedInUrl = (url: string): boolean => {
  if (!url) return true; // Optional field
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/;
  return linkedinRegex.test(url);
};

/**
 * Validate password strength
 */
export const isStrongPassword = (password: string): boolean => {
  // At least 6 characters
  return password.length >= 6;
};

/**
 * Validate file size
 */
export const isValidFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Validate file type
 */
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some(type => file.type.startsWith(type));
};

/**
 * Validate image file
 */
export const isValidImage = (file: File, maxSizeMB: number = 2): {
  valid: boolean;
  error?: string;
} => {
  if (!isValidFileType(file, ['image/'])) {
    return { valid: false, error: 'Please upload an image file' };
  }

  if (!isValidFileSize(file, maxSizeMB)) {
    return { valid: false, error: `Image size should be less than ${maxSizeMB}MB` };
  }

  return { valid: true };
};

/**
 * Validate text length
 */
export const isValidLength = (text: string, minLength: number = 0, maxLength?: number): boolean => {
  if (text.length < minLength) return false;
  if (maxLength && text.length > maxLength) return false;
  return true;
};

/**
 * Validate required field
 */
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};
