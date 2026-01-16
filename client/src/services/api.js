import axios from 'axios';

// Create separate instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Har request se pehle ye function chalega
api.interceptors.request.use(
  (config) => {
    // LocalStorage se token nikalo
    const token = localStorage.getItem('token');

    // Agar token hai, to header mein chipka do
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;