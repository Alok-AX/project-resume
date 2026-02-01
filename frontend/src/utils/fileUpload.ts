/**
 * File upload utility functions
 */

export interface UploadResult {
  success: boolean;
  fileName?: string;
  dataUrl?: string;
  error?: string;
}

export const validatePdfFile = (file: File): { valid: boolean; error?: string } => {
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'Please upload a PDF file.' };
  }
  
  // Optional: Check file size (e.g., 10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File size should be less than 10MB.' };
  }
  
  return { valid: true };
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Could not read the file. Please try again.'));
    };
    reader.readAsDataURL(file);
  });
};

export const handlePdfUpload = async (file: File): Promise<UploadResult> => {
  const validation = validatePdfFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  try {
    const dataUrl = await readFileAsDataURL(file);
    return {
      success: true,
      fileName: file.name,
      dataUrl,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload file.',
    };
  }
};
