import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_STORE_API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
