import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('paradise_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses globally (token expired / invalid)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('paradise_token');
      localStorage.removeItem('paradise_user');
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ——— Auth ———
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// ——— Menu (Public) ———
export const fetchMenuItems = (params) => API.get('/menu', { params });
export const fetchMenuItemById = (id) => API.get(`/menu/${id}`);

// ——— Menu (Admin) ———
export const createMenuItem = (data) => API.post('/menu', data);
export const updateMenuItem = (id, data) => API.put(`/menu/${id}`, data);
export const deleteMenuItem = (id) => API.delete(`/menu/${id}`);

// ——— Reservations ———
export const createReservation = (data) => API.post('/reservations', data);
export const fetchReservations = () => API.get('/reservations');
export const updateReservation = (id, data) => API.patch(`/reservations/${id}`, data);
export const deleteReservation = (id) => API.delete(`/reservations/${id}`);

// ——— Contact ———
export const submitContactMessage = (data) => API.post('/contact', data);
export const fetchContactMessages = () => API.get('/contact');
export const deleteContactMessage = (id) => API.delete(`/contact/${id}`);

export default API;
