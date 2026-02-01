import axios from 'axios';

const mockApi = axios.create({
  baseURL: 'https://mockapi.io',
});

export const fetchTemplates = async () => {
  const response = await mockApi.get('/templates');
  return response.data;
};

export const uploadResume = async (resumeData: any) => {
  const response = await mockApi.post('/upload', resumeData);
  return response.data;
};

export default mockApi;