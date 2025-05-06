import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'NOT_FOUND',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
