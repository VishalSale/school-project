import axios from 'axios';

// Base API URL - Replace with your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Check if we're in production without backend
const IS_STATIC_MODE = import.meta.env.VITE_STATIC_MODE === 'true' || import.meta.env.MODE === 'production';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
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

// Add response interceptor to handle errors gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (IS_STATIC_MODE || !navigator.onLine || error.code === 'ERR_NETWORK') {
      console.warn('API call failed, using static mode:', error.message);
      // Return empty response for static mode
      return Promise.resolve({ data: null, isStatic: true });
    }
    return Promise.reject(error);
  }
);

// Helper function to handle static mode responses
const handleStaticMode = async (apiCall, fallbackData = null) => {
  if (IS_STATIC_MODE) {
    console.log('Static mode: Returning fallback data');
    return Promise.resolve({ data: fallbackData, isStatic: true });
  }
  
  try {
    const response = await apiCall();
    return response;
  } catch (error) {
    console.warn('API call failed, returning fallback:', error.message);
    return { data: fallbackData, isStatic: true };
  }
};

// API Service Functions

// Authentication
export const authAPI = {
  login: async (credentials) => {
    if (IS_STATIC_MODE) {
      // Demo login for static mode
      if (credentials.email === 'admin@school.com' && credentials.password === 'admin123') {
        return { 
          data: { 
            token: 'demo-token', 
            user: { email: credentials.email, name: 'Admin User' } 
          },
          isStatic: true 
        };
      }
      throw new Error('Invalid credentials');
    }
    return api.post('/auth/login', credentials);
  },
  register: (userData) => handleStaticMode(() => api.post('/auth/register', userData), { message: 'Registration successful' }),
  logout: () => handleStaticMode(() => api.post('/auth/logout'), { message: 'Logged out' }),
};

// Admissions
export const admissionsAPI = {
  submit: (formData) => handleStaticMode(() => api.post('/admissions', formData), { message: 'Application submitted successfully', id: Date.now() }),
  getAll: () => handleStaticMode(() => api.get('/admissions'), []),
  getById: (id) => handleStaticMode(() => api.get(`/admissions/${id}`), null),
  update: (id, data) => handleStaticMode(() => api.put(`/admissions/${id}`, data), { message: 'Updated successfully' }),
  delete: (id) => handleStaticMode(() => api.delete(`/admissions/${id}`), { message: 'Deleted successfully' }),
};

// Announcements
export const announcementsAPI = {
  getAll: () => handleStaticMode(() => api.get('/announcements'), []),
  getById: (id) => handleStaticMode(() => api.get(`/announcements/${id}`), null),
  create: (data) => handleStaticMode(() => api.post('/announcements', data), { ...data, id: Date.now() }),
  update: (id, data) => handleStaticMode(() => api.put(`/announcements/${id}`, data), { message: 'Updated successfully' }),
  delete: (id) => handleStaticMode(() => api.delete(`/announcements/${id}`), { message: 'Deleted successfully' }),
};

// Contact
export const contactAPI = {
  submit: (formData) => handleStaticMode(() => api.post('/contact', formData), { message: 'Message sent successfully', id: Date.now() }),
  getAll: () => handleStaticMode(() => api.get('/contact'), []),
};

// News
export const newsAPI = {
  getAll: () => handleStaticMode(() => api.get('/news'), []),
  getById: (id) => handleStaticMode(() => api.get(`/news/${id}`), null),
  create: (data) => handleStaticMode(() => api.post('/news', data), { ...data, id: Date.now() }),
  update: (id, data) => handleStaticMode(() => api.put(`/news/${id}`, data), { message: 'Updated successfully' }),
  delete: (id) => handleStaticMode(() => api.delete(`/news/${id}`), { message: 'Deleted successfully' }),
};

// Gallery
export const galleryAPI = {
  getAll: () => handleStaticMode(() => api.get('/gallery'), []),
  upload: (formData) => handleStaticMode(() => api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }), { message: 'Image uploaded successfully', id: Date.now() }),
  delete: (id) => handleStaticMode(() => api.delete(`/gallery/${id}`), { message: 'Deleted successfully' }),
};

export default api;
