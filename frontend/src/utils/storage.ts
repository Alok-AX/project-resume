/**
 * Session storage utility for managing template and PDF data
 */

export const sessionStorage = {
  // Template management
  setSelectedTemplate: (template: any) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('selectedTemplate', JSON.stringify(template));
      window.sessionStorage.removeItem('uploadedPdfName');
      window.sessionStorage.removeItem('uploadedPdfDataUrl');
    }
  },

  getSelectedTemplate: () => {
    if (typeof window !== 'undefined') {
      const templateRaw = window.sessionStorage.getItem('selectedTemplate');
      if (templateRaw) {
        try {
          return JSON.parse(templateRaw);
        } catch (error) {
          console.error('Could not parse selectedTemplate', error);
          return null;
        }
      }
    }
    return null;
  },

  clearSelectedTemplate: () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('selectedTemplate');
    }
  },

  // PDF management
  setUploadedPdf: (fileName: string, dataUrl: string) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('uploadedPdfName', fileName);
      window.sessionStorage.setItem('uploadedPdfDataUrl', dataUrl);
      window.sessionStorage.removeItem('selectedTemplate');
    }
  },

  getUploadedPdf: () => {
    if (typeof window !== 'undefined') {
      return {
        name: window.sessionStorage.getItem('uploadedPdfName'),
        dataUrl: window.sessionStorage.getItem('uploadedPdfDataUrl'),
      };
    }
    return { name: null, dataUrl: null };
  },

  clearUploadedPdf: () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('uploadedPdfName');
      window.sessionStorage.removeItem('uploadedPdfDataUrl');
    }
  },

  clearAll: () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('selectedTemplate');
      window.sessionStorage.removeItem('uploadedPdfName');
      window.sessionStorage.removeItem('uploadedPdfDataUrl');
    }
  },
};
