/**
 * Common form handling utilities
 */

import { ChangeEvent } from 'react';

/**
 * Generic form change handler
 * Updates form state based on input name and value
 */
export const handleFormChange = <T extends Record<string, any>>(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFormData: React.Dispatch<React.SetStateAction<T>>
): void => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

/**
 * Create a form change handler bound to specific state setter
 */
export const createFormChangeHandler = <T extends Record<string, any>>(
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleFormChange(e, setFormData);
  };
};

/**
 * Reset form to initial values
 */
export const resetForm = <T extends Record<string, any>>(
  initialValues: T,
  setFormData: React.Dispatch<React.SetStateAction<T>>
): void => {
  setFormData(initialValues);
};

/**
 * Check if form has changes compared to initial values
 */
export const hasFormChanges = <T extends Record<string, any>>(
  currentValues: T,
  initialValues: T
): boolean => {
  return JSON.stringify(currentValues) !== JSON.stringify(initialValues);
};
