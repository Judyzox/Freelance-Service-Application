import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5262/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const registerUser = (userData) => api.post('/Auth/Register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Job endpoints
export const getAllJobs = () => api.get('/jobs');
export const getJobDetails = (jobId) => api.get(`/jobs/${jobId}`);
export const createJob = (jobData) => api.post('/jobs', jobData);
export const updateJob = (jobId, jobData) => api.put(`/jobs/${jobId}`, jobData);
export const deleteJob = (jobId) => api.delete(`/jobs/${jobId}`);

// Client-specific endpoints
export const getClientJobs = () => api.get('/jobs/client');
export const getClientApplications = () => api.get('/applications/client');

// Application endpoints
export const applyForJob = (jobId, proposal) => api.post(`/jobs/${jobId}/apply`, { proposal });
export const getFreelancerApplications = () => api.get('/applications/freelancer');
export const updateApplicationStatus = (applicationId, status) =>
  api.put(`/applications/${applicationId}/status`, { status });

// Profile endpoints
export const updateFreelancerProfile = (profileData) => api.put('/profile/freelancer', profileData);
export const updateClientProfile = (profileData) => api.put('/profile/client', profileData);
export const getProfile = () => api.get('/profile');

// Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getUserData = async () => {
  const response = await api.get('/profile');
  return response.data;
};

export default api; 