import axios from 'axios';

// Base API URL - Replace with your actual backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const { token } = JSON.parse(user);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Service Functions

// Authentication
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Admissions
export const admissionsAPI = {
  submit: (formData) => api.post('/admissions', formData),
  getAll: () => api.get('/admissions'),
  getById: (id) => api.get(`/admissions/${id}`),
  update: (id, data) => api.put(`/admissions/${id}`, data),
  delete: (id) => api.delete(`/admissions/${id}`),
};

// Announcements
export const announcementsAPI = {
  getAll: () => api.get('/announcements'),
  getById: (id) => api.get(`/announcements/${id}`),
  create: (data) => api.post('/announcements', data),
  update: (id, data) => api.put(`/announcements/${id}`, data),
  delete: (id) => api.delete(`/announcements/${id}`),
};

// Contact
export const contactAPI = {
  submit: (formData) => api.post('/contact', formData),
  getAll: () => api.get('/contact'),
};

// News
export const newsAPI = {
  getAll: () => api.get('/news'),
  getById: (id) => api.get(`/news/${id}`),
  create: (data) => api.post('/news', data),
  update: (id, data) => api.put(`/news/${id}`, data),
  delete: (id) => api.delete(`/news/${id}`),
};

// Gallery
export const galleryAPI = {
  getAll: () => api.get('/gallery'),
  upload: (formData) => api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/gallery/${id}`),
};

export default api;
