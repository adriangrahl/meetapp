import axios from 'axios';

const api = axios.create({
  // baseURL: `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`,
  baseURL: 'http://localhost:3333',
});

export default api;
